(() => {
  const config=window.FLIGHT_ARCHIVE_BACKEND || {};
  const gate=document.getElementById("authGate");
  const boardingGate=document.getElementById("boardingGate");
  const boardingTitle=document.getElementById("boardingTitle");
  const boardingSubtitle=document.getElementById("boardingSubtitle");
  const boardingRetryButton=document.getElementById("boardingRetryButton");
  const accountSettings=document.getElementById("accountSettings");
  const accountEmail=document.getElementById("accountEmail");
  const accountAvatar=document.getElementById("accountAvatar");
  const accountDisplayName=document.getElementById("accountDisplayName");
  const profileDisplayName=document.getElementById("profileDisplayName");
  const sidebarAccountSummary=document.getElementById("sidebarAccountSummary");
  const sidebarAccountAvatar=document.getElementById("sidebarAccountAvatar");
  const sidebarAccountName=document.getElementById("sidebarAccountName");
  const sidebarAccountEmail=document.getElementById("sidebarAccountEmail");
  const form=document.getElementById("authForm");
  const emailField=document.getElementById("authEmailField");
  const emailInput=document.getElementById("authEmail");
  const passwordInput=document.getElementById("authPassword");
  const nameField=document.getElementById("authNameField");
  const nameInput=document.getElementById("authDisplayName");
  const submitButton=document.getElementById("authSubmit");
  const forgotButton=document.getElementById("authForgot");
  const message=document.getElementById("authMessage");
  const title=document.getElementById("authTitle");
  const subtitle=document.getElementById("authSubtitle");
  const tabs=document.getElementById("authTabs");

  const copy={
    en:{
      privateArchive:"Your private flight archive",
      signIn:"Sign in",
      signInHelp:"Access your flights, statistics, and photos.",
      createAccount:"Create account",
      createAccountHelp:"Create a private archive for your own flight data.",
      displayName:"Display name",
      email:"Email",
      password:"Password",
      forgotPassword:"Forgot password?",
      sendResetLink:"Send reset link",
      resetPassword:"Set new password",
      resetPasswordHelp:"Choose a new password for your account.",
      saving:"Please wait…",
      checkEmail:"Check your email to confirm the new account.",
      resetEmailSent:"A password reset link has been sent.",
      signedIn:"Signed in.",
      passwordUpdated:"Password updated.",
      importExistingArchive:"Import existing archive",
      importConfirm:"Import the existing Flight Archive records into this account? This only works for an empty account.",
      importComplete:"Existing flight records imported.",
      configurationError:"The authentication service is not configured."
    },
    zh:{
      privateArchive:"你的私人飞行档案",
      signIn:"登录",
      signInHelp:"访问你的飞行记录、统计数据与照片。",
      createAccount:"注册账户",
      createAccountHelp:"为自己的飞行数据创建私人档案。",
      displayName:"显示名称",
      email:"邮箱",
      password:"密码",
      forgotPassword:"忘记密码？",
      sendResetLink:"发送重置链接",
      resetPassword:"设置新密码",
      resetPasswordHelp:"为账户设置一个新的密码。",
      saving:"请稍候…",
      checkEmail:"请检查邮箱并确认新账户。",
      resetEmailSent:"密码重置链接已发送。",
      signedIn:"已登录。",
      passwordUpdated:"密码已更新。",
      importExistingArchive:"导入现有档案",
      importConfirm:"将现有 Flight Archive 记录导入此账户吗？该操作仅适用于空账户。",
      importComplete:"现有飞行记录已导入。",
      configurationError:"身份验证服务尚未配置。"
    }
  };
  Object.assign(copy.en,{
    preparingBoarding:"Preparing for boarding",
    verifyingAccount:"Verifying your account and preparing your private archive.",
    loadingArchive:"Loading your flights, settings, and map.",
    takingLonger:"Your archive is still being prepared. This may take a few more seconds.",
    unableToPrepare:"Unable to prepare your archive",
    loadingTimeout:"The loading process timed out. Please return to sign in and try again.",
    returnToSignIn:"Return to sign in",
    serviceStillLoading:"The authentication service is still loading. Please try again in a moment."
  });
  Object.assign(copy.zh,{
    preparingBoarding:"正在准备登机",
    verifyingAccount:"正在验证账户并准备你的私人飞行档案。",
    loadingArchive:"正在载入航班、设置与地图数据。",
    takingLonger:"仍在准备你的飞行档案，可能还需要几秒钟。",
    unableToPrepare:"暂时无法准备飞行档案",
    loadingTimeout:"载入时间过长，请返回登录页面后重试。",
    returnToSignIn:"返回登录",
    serviceStillLoading:"身份验证服务仍在载入，请稍后再试。"
  });

  let language="en";
  let mode="signin";
  let client=null;
  let session=null;
  let boardingSlowTimer=null;
  let boardingTimeoutTimer=null;

  const text=key=>copy[language][key] || key;
  const redirectUrl=()=>`${window.location.origin}${window.location.pathname}`;
  const setMessage=(value,isError=false)=>{
    message.textContent=value || "";
    message.classList.toggle("error",Boolean(isError));
  };
  const setBusy=busy=>{
    submitButton.disabled=busy;
    submitButton.textContent=busy?text("saving"):text(mode==="signin"?"signIn":mode==="signup"?"createAccount":"resetPassword");
  };
  const clearBoardingTimers=()=>{
    clearTimeout(boardingSlowTimer);
    clearTimeout(boardingTimeoutTimer);
    boardingSlowTimer=null;
    boardingTimeoutTimer=null;
  };
  const showBoarding=(subtitleKey="verifyingAccount")=>{
    clearBoardingTimers();
    boardingGate.hidden=false;
    boardingGate.classList.remove("error");
    boardingRetryButton.hidden=true;
    boardingTitle.textContent=text("preparingBoarding");
    boardingSubtitle.textContent=text(subtitleKey);
    document.body.classList.add("auth-required");
    boardingSlowTimer=setTimeout(()=>{
      boardingSubtitle.textContent=text("takingLonger");
    },12000);
    boardingTimeoutTimer=setTimeout(()=>{
      showBoardingError(text("loadingTimeout"));
    },45000);
  };
  const hideBoarding=()=>{
    clearBoardingTimers();
    boardingGate.hidden=true;
    boardingGate.classList.remove("error");
    boardingRetryButton.hidden=true;
  };
  const showBoardingError=error=>{
    clearBoardingTimers();
    boardingGate.hidden=false;
    boardingGate.classList.add("error");
    boardingTitle.textContent=text("unableToPrepare");
    boardingSubtitle.textContent=error || text("loadingTimeout");
    boardingRetryButton.hidden=false;
    gate.hidden=true;
    document.body.classList.add("auth-required");
  };
  const applyCopy=()=>{
    document.querySelectorAll("[data-auth-i18n]").forEach(element=>{
      const value=copy[language][element.dataset.authI18n];
      if(value)element.textContent=value;
    });
    title.textContent=text(mode==="signin"?"signIn":mode==="signup"?"createAccount":"resetPassword");
    subtitle.textContent=text(mode==="signin"?"signInHelp":mode==="signup"?"createAccountHelp":"resetPasswordHelp");
    submitButton.textContent=text(mode==="signin"?"signIn":mode==="signup"?"createAccount":"resetPassword");
    forgotButton.textContent=text(mode==="signin"?"forgotPassword":"sendResetLink");
  };
  const setMode=nextMode=>{
    mode=nextMode;
    nameField.hidden=mode!=="signup";
    emailField.hidden=mode==="recovery";
    tabs.hidden=mode==="recovery";
    forgotButton.hidden=mode==="recovery";
    passwordInput.autocomplete=mode==="signin"?"current-password":"new-password";
    document.querySelectorAll("[data-auth-mode]").forEach(button=>button.classList.toggle("active",button.dataset.authMode===mode));
    setMessage("");
    applyCopy();
  };
  const avatarMarkup=(element,avatarUrl,fallback)=>{
    if(!element)return;
    element.innerHTML=avatarUrl?`<img src="${avatarUrl}" alt="" />`:"";
    if(!avatarUrl)element.textContent=fallback;
  };
  const renderAccount=(profile={})=>{
    if(!session?.user)return;
    const email=session.user.email || "";
    const displayName=(profile.display_name || session.user.user_metadata?.display_name || email.split("@")[0] || "Flight Archive").trim();
    const initial=displayName.charAt(0).toUpperCase() || "?";
    accountEmail.textContent=email;
    accountDisplayName.textContent=displayName;
    profileDisplayName.value=displayName;
    sidebarAccountName.textContent=displayName;
    sidebarAccountEmail.textContent=email;
    avatarMarkup(accountAvatar,profile.avatar_url,initial);
    avatarMarkup(sidebarAccountAvatar,profile.avatar_url,initial);
  };
  const syncSession=nextSession=>{
    const previousUserId=session?.user?.id || null;
    session=nextSession;
    const authenticated=Boolean(session?.user);
    accountSettings.hidden=!authenticated;
    sidebarAccountSummary.hidden=!authenticated;
    if(authenticated){
      gate.hidden=true;
      renderAccount();
      if(previousUserId!==session.user.id || document.body.classList.contains("auth-required")){
        showBoarding("loadingArchive");
      }
    }else{
      hideBoarding();
      gate.hidden=false;
      document.body.classList.add("auth-required");
    }
    window.dispatchEvent(new CustomEvent("flightarchive:session-changed",{detail:{session}}));
  };
  const loadSupabaseLibrary=()=>new Promise((resolve,reject)=>{
    if(window.supabase?.createClient){resolve(window.supabase);return;}
    const script=document.createElement("script");
    script.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js";
    script.crossOrigin="anonymous";
    script.onload=()=>resolve(window.supabase);
    script.onerror=()=>reject(new Error("Unable to load the Supabase client."));
    document.head.appendChild(script);
  });

  document.querySelectorAll("[data-auth-mode]").forEach(button=>button.addEventListener("click",()=>setMode(button.dataset.authMode)));
  forgotButton.addEventListener("click",async()=>{
    if(!client)return;
    const email=emailInput.value.trim();
    if(!email){emailInput.focus();return;}
    setBusy(true);
    const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:redirectUrl()});
    setBusy(false);
    setMessage(error?error.message:text("resetEmailSent"),Boolean(error));
  });
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!client){
      setMessage(text("serviceStillLoading"),true);
      return;
    }
    const showTransition=mode==="signin";
    if(showTransition)showBoarding("verifyingAccount");
    setBusy(true);
    setMessage("");
    let authenticatedRequest=false;
    try{
      if(mode==="signup"){
        const {data,error}=await client.auth.signUp({
          email:emailInput.value.trim(),
          password:passwordInput.value,
          options:{
            emailRedirectTo:redirectUrl(),
            data:{display_name:nameInput.value.trim()}
          }
        });
        if(error)throw error;
        setMessage(data.session?text("signedIn"):text("checkEmail"));
      }else if(mode==="recovery"){
        const {error}=await client.auth.updateUser({password:passwordInput.value});
        if(error)throw error;
        setMessage(text("passwordUpdated"));
        setMode("signin");
        syncSession(session);
      }else{
        const {error}=await client.auth.signInWithPassword({
          email:emailInput.value.trim(),
          password:passwordInput.value
        });
        if(error)throw error;
        authenticatedRequest=true;
        setMessage(text("signedIn"));
      }
    }catch(error){
      if(showTransition){
        hideBoarding();
        gate.hidden=false;
        document.body.classList.add("auth-required");
      }
      setMessage(error?.message || String(error),true);
    }finally{
      if(showTransition&&!authenticatedRequest)hideBoarding();
      setBusy(false);
    }
  });
  document.getElementById("signOutButton").addEventListener("click",async()=>{
    if(client)await client.auth.signOut();
  });
  boardingRetryButton.addEventListener("click",async()=>{
    hideBoarding();
    if(client && session)await client.auth.signOut();
    gate.hidden=false;
    document.body.classList.add("auth-required");
    setMessage("");
  });
  window.addEventListener("flightarchive:data-ready",event=>{
    if(!session?.user || event.detail?.userId!==session.user.id)return;
    hideBoarding();
    gate.hidden=true;
    document.body.classList.remove("auth-required");
  });
  window.addEventListener("flightarchive:data-error",event=>{
    if(!session?.user)return;
    showBoardingError(event.detail?.message || text("loadingTimeout"));
  });
  window.flightArchiveBackend={
    get client(){return client;},
    get session(){return session;},
    get user(){return session?.user || null;},
    get enabled(){return Boolean(client);},
    setProfile(profile){renderAccount(profile || {});},
    setLanguage(nextLanguage){
      language=nextLanguage==="zh"?"zh":"en";
      applyCopy();
    }
  };

  const start=async()=>{
    language=document.documentElement.lang.startsWith("zh")?"zh":"en";
    applyCopy();
    if(!config.enabled)return;
    if(!config.supabaseUrl || !config.publishableKey){
      gate.hidden=false;
      document.body.classList.add("auth-required");
      setMessage(text("configurationError"),true);
      return;
    }
    gate.hidden=false;
    document.body.classList.add("auth-required");
    try{
      const library=await loadSupabaseLibrary();
      client=library.createClient(config.supabaseUrl,config.publishableKey,{
        auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
      });
      const {data,error}=await client.auth.getSession();
      if(error)throw error;
      syncSession(data.session);
      client.auth.onAuthStateChange((event,nextSession)=>{
        syncSession(nextSession);
        if(event==="PASSWORD_RECOVERY"){
          hideBoarding();
          setMode("recovery");
          gate.hidden=false;
          accountSettings.hidden=true;
          document.body.classList.add("auth-required");
        }
      });
    }catch(error){
      hideBoarding();
      gate.hidden=false;
      document.body.classList.add("auth-required");
      setMessage(error?.message || String(error),true);
    }
  };

  start();
})();
