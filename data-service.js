(() => {
  let activeUserId=null;
  let loadingPromise=null;

  const backend=()=>window.flightArchiveBackend;
  const client=()=>backend()?.client || null;
  const favouriteToApp={
    aircraft:"aircraft",
    airline:"airlines",
    airport:"airports",
    country:"countries",
    city:"cities"
  };
  const favouriteToDatabase=Object.fromEntries(Object.entries(favouriteToApp).map(([databaseKey,appKey])=>[appKey,databaseKey]));
  const timeText=value=>String(value || "").slice(0,5);
  const durationText=minutes=>{
    const value=Number(minutes) || 0;
    if(value<60)return `${value}min`;
    return `${Math.floor(value/60)}h ${value%60}m`;
  };
  const flightFromRow=row=>({
    id:row.id,
    from:row.departure_airport,
    to:row.arrival_airport,
    date:row.flight_date,
    airline:row.airline,
    airlineShort:row.airline_code || "",
    flightNo:row.flight_number,
    aircraft:row.aircraft || "—",
    registration:row.registration || "—",
    depart:timeText(row.departure_time) || "—",
    arrive:timeText(row.arrival_time) || "—",
    duration:durationText(row.duration_minutes),
    durationMinutes:Number(row.duration_minutes) || 0,
    distance:Number(row.distance_km) || 0,
    terminalFrom:row.departure_terminal || "—",
    terminalTo:row.arrival_terminal || "—",
    seat:row.seat || "—",
    cabin:row.cabin || "Economy",
    fare:row.fare===null?null:Number(row.fare),
    fareCurrency:row.fare_currency || "CNY",
    fareRaw:row.fare_raw || null,
    fareGroup:row.fare_group || null,
    booking:row.booking_channel || "",
    gate:row.gate || "—",
    status:row.operational_status || "",
    note:row.notes || "",
    scope:row.flight_scope || "international",
    metadata:row.metadata || {},
    recordStatus:row.record_status
  });
  const rowFromFlight=(flight,recordStatus="completed")=>({
    user_id:activeUserId,
    record_status:recordStatus,
    flight_date:flight.date,
    flight_number:flight.flightNo,
    airline:flight.airline,
    airline_code:flight.airlineShort || null,
    aircraft:flight.aircraft==="—"?null:flight.aircraft || null,
    registration:flight.registration==="—"?null:flight.registration || null,
    departure_airport:flight.from,
    arrival_airport:flight.to,
    departure_terminal:flight.terminalFrom==="—"?null:flight.terminalFrom || null,
    arrival_terminal:flight.terminalTo==="—"?null:flight.terminalTo || null,
    departure_time:/^\d{1,2}:\d{2}/.test(flight.depart||"")?flight.depart:null,
    arrival_time:/^\d{1,2}:\d{2}/.test(flight.arrive||"")?flight.arrive:null,
    duration_minutes:Number(flight.durationMinutes) || null,
    distance_km:Number(flight.distance) || null,
    seat:["—","——"].includes(flight.seat)?null:flight.seat || null,
    cabin:flight.cabin || null,
    gate:flight.gate==="—"?null:flight.gate || null,
    fare:Number.isFinite(flight.fare)?flight.fare:null,
    fare_currency:flight.fareCurrency || "CNY",
    fare_raw:flight.fareRaw || null,
    fare_group:flight.fareGroup || null,
    booking_channel:flight.booking || null,
    flight_scope:flight.scope || null,
    operational_status:flight.status || null,
    notes:flight.note || null,
    metadata:flight.metadata || {}
  });
  const requireClient=()=>{
    const value=client();
    if(!value || !activeUserId)throw new Error("No authenticated Flight Archive session.");
    return value;
  };
  const enrichProfileAvatars=async profiles=>{
    const items=Array.isArray(profiles)?profiles:[];
    const ids=[...new Set(items.map(item=>item.user_id).filter(Boolean))];
    if(!ids.length)return items;
    const supabase=requireClient();
    const {data,error}=await supabase.rpc("get_flight_archive_profile_avatars",{profile_user_ids:ids});
    if(error)return items;
    const avatarPaths=new Map((data || []).map(row=>[row.user_id,row.avatar_path]));
    const signedEntries=await Promise.all(ids.map(async id=>{
      const path=avatarPaths.get(id);
      if(!path)return [id,null];
      const {data:signed}=await supabase.storage.from("flight-photos").createSignedUrl(path,3600);
      return [id,signed?.signedUrl || null];
    }));
    const signedUrls=new Map(signedEntries);
    return items.map(item=>({...item,avatar_url:signedUrls.get(item.user_id)||null}));
  };
  const notifyError=error=>{
    window.dispatchEvent(new CustomEvent("flightarchive:data-error",{detail:{message:error?.message || String(error)}}));
  };
  const notifyReady=userId=>{
    window.dispatchEvent(new CustomEvent("flightarchive:data-ready",{detail:{userId}}));
  };

  const loadUserData=async userId=>{
    const supabase=client();
    if(!supabase || !userId)return;
    activeUserId=userId;
    const requests=await Promise.all([
      supabase.from("flights").select("*").order("flight_date",{ascending:false}),
      supabase.from("user_settings").select("*").maybeSingle(),
      supabase.from("user_hubs").select("*").order("sort_order",{ascending:true}),
      supabase.from("user_favourites").select("*"),
      supabase.from("profiles").select("*").maybeSingle()
    ]);
    const failure=requests.find(result=>result.error)?.error;
    if(failure)throw failure;
    const rows=requests[0].data || [];
    const settings=requests[1].data || null;
    const hubs=(requests[2].data || []).map(row=>row.airport_code);
    const favourites=Object.fromEntries((requests[3].data || []).map(row=>[favouriteToApp[row.category]||row.category,row.value]));
    const profile={...(requests[4].data || {})};
    if(profile.avatar_path){
      const {data:signedAvatar}=await supabase.storage.from("flight-photos").createSignedUrl(profile.avatar_path,3600);
      profile.avatar_url=signedAvatar?.signedUrl || null;
    }
    const completed=rows.filter(row=>row.record_status==="completed").map(flightFromRow);
    const upcoming=rows.filter(row=>row.record_status==="upcoming").map(flightFromRow);
    const payload={flights:completed,incomingFlights:upcoming,settings,hubs,favourites,profile,userId};
    if(window.flightArchiveApp?.hydrateUserData){
      window.flightArchiveApp.hydrateUserData(payload);
      notifyReady(userId);
    }else window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__=payload;
  };
  const beginLoad=session=>{
    if(!session?.user){
      activeUserId=null;
      return Promise.resolve();
    }
    loadingPromise=loadUserData(session.user.id).catch(notifyError);
    return loadingPromise;
  };

  window.addEventListener("flightarchive:session-changed",event=>beginLoad(event.detail.session));
  window.addEventListener("flightarchive:app-ready",()=>{
    if(window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__){
      const payload=window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__;
      window.flightArchiveApp.hydrateUserData(payload);
      delete window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__;
      notifyReady(payload.userId);
    }else if(backend()?.session && !loadingPromise){
      beginLoad(backend().session);
    }
  });

  window.flightArchiveData={
    get enabled(){return Boolean(client());},
    get userId(){return activeUserId;},
    get loading(){return loadingPromise;},
    async reload(){
      if(activeUserId)return loadUserData(activeUserId);
    },
    async saveSettings(settings){
      const supabase=requireClient();
      const {error}=await supabase.from("user_settings").upsert({
        user_id:activeUserId,
        language:settings.language,
        region:settings.region,
        currency:settings.currency,
        map_style:settings.mapStyle,
        day_night:settings.dayNight!==false
      });
      if(error)throw error;
    },
    async saveProfile(profile){
      const supabase=requireClient();
      const values={user_id:activeUserId};
      if(typeof profile.displayName==="string")values.display_name=profile.displayName.trim() || null;
      if(typeof profile.username==="string"){
        const username=profile.username.trim();
        if(!username)throw new Error("Username cannot be empty.");
        values.username=username || null;
      }
      if(typeof profile.onboardingCompleted==="boolean")values.onboarding_completed=profile.onboardingCompleted;
      const {data,error}=await supabase.from("profiles").upsert(values).select().single();
      if(error)throw error;
      if(typeof profile.displayName==="string" || typeof profile.username==="string"){
        const {error:authError}=await supabase.auth.updateUser({data:{
          display_name:values.display_name || values.username || "",
          username:values.username || ""
        }});
        if(authError)throw authError;
      }
      return {...data,avatar_url:profile.avatarUrl || null};
    },
    async updatePassword(password){
      const supabase=requireClient();
      const {error}=await supabase.auth.updateUser({password});
      if(error)throw error;
    },
    async uploadAvatar(file){
      const supabase=requireClient();
      if(!file?.type?.startsWith("image/"))throw new Error("Choose an image file.");
      if(file.size>5*1024*1024)throw new Error("Avatar images must be 5 MB or smaller.");
      const storagePath=`${activeUserId}/profile/avatar`;
      const {error:uploadError}=await supabase.storage.from("flight-photos").upload(storagePath,file,{
        upsert:true,
        contentType:file.type,
        cacheControl:"3600"
      });
      if(uploadError)throw uploadError;
      const {data:profile,error:profileError}=await supabase.from("profiles").upsert({
        user_id:activeUserId,
        avatar_path:storagePath
      }).select().single();
      if(profileError)throw profileError;
      const {data:signedAvatar,error:signedError}=await supabase.storage.from("flight-photos").createSignedUrl(storagePath,3600);
      if(signedError)throw signedError;
      return {...profile,avatar_url:signedAvatar?.signedUrl || null};
    },
    async replaceHubs(codes){
      const supabase=requireClient();
      const {error:deleteError}=await supabase.from("user_hubs").delete().eq("user_id",activeUserId);
      if(deleteError)throw deleteError;
      if(!codes.length)return;
      const {error}=await supabase.from("user_hubs").insert(codes.map((airportCode,index)=>({
        user_id:activeUserId,
        airport_code:airportCode,
        sort_order:index
      })));
      if(error)throw error;
    },
    async saveFavourite(category,value){
      const supabase=requireClient();
      const databaseCategory=favouriteToDatabase[category] || category;
      if(!value){
        const {error}=await supabase.from("user_favourites").delete().eq("user_id",activeUserId).eq("category",databaseCategory);
        if(error)throw error;
        return;
      }
      const {error}=await supabase.from("user_favourites").upsert({
        user_id:activeUserId,
        category:databaseCategory,
        value
      });
      if(error)throw error;
    },
    async searchUsers(query){
      const supabase=requireClient();
      const {data,error}=await supabase.rpc("search_flight_archive_users",{search_text:query});
      if(error)throw error;
      return enrichProfileAvatars(data || []);
    },
    async listFriends(){
      const supabase=requireClient();
      const {data,error}=await supabase.rpc("list_flight_archive_friends");
      if(error)throw error;
      return enrichProfileAvatars(data || []);
    },
    async sendFriendRequest(targetUserId){
      const supabase=requireClient();
      const {error}=await supabase.rpc("send_flight_archive_friend_request",{target_user_id:targetUserId});
      if(error)throw error;
    },
    async respondFriendRequest(friendshipId,accept){
      const supabase=requireClient();
      const {error}=await supabase.rpc("respond_flight_archive_friend_request",{friendship_id:friendshipId,accept_request:Boolean(accept)});
      if(error)throw error;
    },
    async removeFriend(friendshipId){
      const supabase=requireClient();
      const {error}=await supabase.rpc("remove_flight_archive_friend",{friendship_id:friendshipId});
      if(error)throw error;
    },
    async getFriendFlights(friendUserId){
      const supabase=requireClient();
      const {data,error}=await supabase.rpc("get_flight_archive_friend_flights",{friend_user_id:friendUserId});
      if(error)throw error;
      return (data || []).map(flightFromRow);
    },
    async searchFlights(query){
      const supabase=requireClient();
      const {data,error}=await supabase.functions.invoke("flight-search",{body:query});
      if(error){
        let message=error.message || "Flight lookup failed.";
        let detail=null;
        try{
          detail=await error.context?.json();
          message=detail?.error || detail?.message || message;
        }catch{}
        const lookupError=new Error(message);
        lookupError.code=detail?.code || "LOOKUP_FAILED";
        lookupError.manualFallback=Boolean(detail?.manualFallback);
        lookupError.usage=detail?.usage || null;
        throw lookupError;
      }
      return {
        results:data?.results || [],
        cached:Boolean(data?.cached),
        provider:data?.provider || "",
        usage:data?.usage || null
      };
    },
    async saveFlight(flight,recordStatus=flight.recordStatus || "completed"){
      const supabase=requireClient();
      const values=rowFromFlight(flight,recordStatus);
      if(typeof flight.id==="string" && /^[0-9a-f-]{36}$/i.test(flight.id))values.id=flight.id;
      const {data,error}=await supabase.from("flights").upsert(values).select().single();
      if(error)throw error;
      return flightFromRow(data);
    },
    async deleteFlight(id){
      const supabase=requireClient();
      const {error}=await supabase.from("flights").delete().eq("id",id);
      if(error)throw error;
    }
  };
})();
