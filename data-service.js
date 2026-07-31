(() => {
  const legacyArchive=window.FLIGHT_ARCHIVE_DATA || {};
  const clone=value=>JSON.parse(JSON.stringify(value));
  const legacyArchiveSnapshot={
    flights:clone(legacyArchive.flights || []),
    incomingFlights:clone(legacyArchive.incomingFlights || [])
  };
  let activeUserId=null;
  let loadingPromise=null;

  const backend=()=>window.flightArchiveBackend;
  const client=()=>backend()?.client || null;
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
  const legacyRowKey=row=>[
    row.record_status,
    row.flight_date,
    String(row.flight_number || "").toUpperCase(),
    row.departure_airport,
    row.arrival_airport
  ].join("|");
  const buildLegacyRows=()=>{
    const completed=legacyArchiveSnapshot.flights.map(flight=>rowFromFlight(flight,"completed"));
    const upcoming=legacyArchiveSnapshot.incomingFlights.map(flight=>rowFromFlight(flight,"upcoming"));
    return [...completed,...upcoming].map((row,index)=>({
      ...row,
      metadata:{...(row.metadata || {}),legacy_import:true,legacy_index:index+1}
    }));
  };
  const insertMissingLegacyRows=async(supabase,existingRows=[])=>{
    const rows=buildLegacyRows();
    const existingKeys=new Set(existingRows.map(legacyRowKey));
    const missingRows=rows.filter(row=>!existingKeys.has(legacyRowKey(row)));
    for(let index=0;index<missingRows.length;index+=100){
      const {error}=await supabase.from("flights").insert(missingRows.slice(index,index+100));
      if(error)throw error;
    }
    return rows.length;
  };
  const requireClient=()=>{
    const value=client();
    if(!value || !activeUserId)throw new Error("No authenticated Flight Archive session.");
    return value;
  };
  const notifyError=error=>{
    window.dispatchEvent(new CustomEvent("flightarchive:data-error",{detail:{message:error?.message || String(error)}}));
  };

  const loadUserData=async(userId,{autoRepair=true}={})=>{
    const supabase=client();
    if(!supabase || !userId)return;
    activeUserId=userId;
    const requests=await Promise.all([
      supabase.from("flights").select("*").order("flight_date",{ascending:false}),
      supabase.from("user_settings").select("*").maybeSingle(),
      supabase.from("user_hubs").select("*").order("sort_order",{ascending:true}),
      supabase.from("user_favourites").select("*")
    ]);
    const failure=requests.find(result=>result.error)?.error;
    if(failure)throw failure;
    const rows=requests[0].data || [];
    const ownerEmail=String(window.FLIGHT_ARCHIVE_BACKEND?.legacyOwnerEmail || "").trim().toLowerCase();
    const signedInEmail=String(backend()?.user?.email || "").trim().toLowerCase();
    const isPartialOwnerImport=
      autoRepair &&
      ownerEmail &&
      signedInEmail===ownerEmail &&
      legacyArchiveSnapshot.flights.length>0 &&
      !rows.some(row=>row.record_status==="completed") &&
      rows.every(row=>row.metadata?.legacy_import===true);
    if(isPartialOwnerImport){
      await insertMissingLegacyRows(supabase,rows);
      return loadUserData(userId,{autoRepair:false});
    }
    const settings=requests[1].data || null;
    const hubs=(requests[2].data || []).map(row=>row.airport_code);
    const favourites=Object.fromEntries((requests[3].data || []).map(row=>[row.category,row.value]));
    const completed=rows.filter(row=>row.record_status==="completed").map(flightFromRow);
    const upcoming=rows.filter(row=>row.record_status==="upcoming").map(flightFromRow);
    const payload={flights:completed,incomingFlights:upcoming,settings,hubs,favourites};
    if(window.flightArchiveApp?.hydrateUserData)window.flightArchiveApp.hydrateUserData(payload);
    else window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__=payload;
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
      window.flightArchiveApp.hydrateUserData(window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__);
      delete window.__FLIGHT_ARCHIVE_PENDING_USER_DATA__;
    }else if(backend()?.session){
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
        map_style:settings.mapStyle
      });
      if(error)throw error;
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
      if(!value){
        const {error}=await supabase.from("user_favourites").delete().eq("user_id",activeUserId).eq("category",category);
        if(error)throw error;
        return;
      }
      const {error}=await supabase.from("user_favourites").upsert({
        user_id:activeUserId,
        category,
        value
      });
      if(error)throw error;
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
    },
    async importLegacyArchive(){
      const supabase=requireClient();
      const ownerEmail=String(window.FLIGHT_ARCHIVE_BACKEND?.legacyOwnerEmail || "").trim().toLowerCase();
      const signedInEmail=String(backend()?.user?.email || "").trim().toLowerCase();
      if(!ownerEmail || signedInEmail!==ownerEmail)throw new Error("Legacy import is restricted to the archive owner.");
      const {data:existingRows,error:existingError}=await supabase
        .from("flights")
        .select("id,record_status,flight_date,flight_number,departure_airport,arrival_airport,metadata");
      if(existingError)throw existingError;
      if((existingRows || []).some(row=>row.metadata?.legacy_import!==true)){
        throw new Error("This account already contains flight records that were not created by the archive import.");
      }
      const total=await insertMissingLegacyRows(supabase,existingRows || []);
      await this.replaceHubs(["CAN","HKG"]);
      await this.reload();
      return total;
    }
  };
})();
