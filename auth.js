(() => {
  const config=window.FLIGHT_ARCHIVE_BACKEND || {};
  const gate=document.getElementById("authGate");
  const accountSettings=document.getElementById("accountSettings");
  const accountEmail=document.getElementById("accountEmail");
  const accountAvatar=document.getElementById("accountAvatar");
  const importLegacyButton=document.getElementById("importLegacyButton");
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

  let language="en";
  let mode="signin";
  let client=null;
  let session=null;

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
  const applyCopy=()=>{
    document.querySelectorAll("[data-auth-i18n]").forEach(element=>{
      const value=copy[language][element.dataset.authI18n];
      if(value)element.textContent=value;
    });
    title.textContent=text(mode==="signin"?"signIn":mode==="signup"?"createAccount":"resetPassword");
    subtitle.textContent=text(mode==="signin"?"signInHelp":mode==="signup"?"createAccountHelp":"resetPasswordHelp");
    submitButton.textContent=text(mode==="signin"?"signIn":mode==="signup"?"createAccount":"resetPassword");
    forgotButton.textContent=text(mode==="signin"?"forgotPassword":"sendResetLink");
    importLegacyButton.textContent=text("importExistingArchive");
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
  const syncSession=nextSession=>{
    session=nextSession;
    const authenticated=Boolean(session?.user);
    document.body.classList.toggle("auth-required",!authenticated);
    gate.hidden=authenticated;
    accountSettings.hidden=!authenticated;
    const ownerEmail=String(config.legacyOwnerEmail || "").trim().toLowerCase();
    importLegacyButton.hidden=!authenticated || String(session?.user?.email || "").trim().toLowerCase()!==ownerEmail;
    if(authenticated){
      const email=session.user.email || "";
      accountEmail.textContent=email;
      accountAvatar.textContent=(session.user.user_metadata?.display_name || email || "?").trim().charAt(0).toUpperCase();
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
    if(!client)return;
    setBusy(true);
    setMessage("");
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
        setMessage(text("signedIn"));
      }
    }catch(error){
      setMessage(error?.message || String(error),true);
    }finally{
      setBusy(false);
    }
  });
  document.getElementById("signOutButton").addEventListener("click",async()=>{
    if(client)await client.auth.signOut();
  });
  importLegacyButton.addEventListener("click",async()=>{
    if(!window.flightArchiveData || !window.confirm(text("importConfirm")))return;
    importLegacyButton.disabled=true;
    try{
      const count=await window.flightArchiveData.importLegacyArchive();
      window.alert(`${text("importComplete")} (${count})`);
      importLegacyButton.hidden=true;
    }catch(error){
      window.alert(error?.message || String(error));
    }finally{
      importLegacyButton.disabled=false;
    }
  });

  window.flightArchiveBackend={
    get client(){return client;},
    get session(){return session;},
    get user(){return session?.user || null;},
    get enabled(){return Boolean(client);},
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
          setMode("recovery");
          gate.hidden=false;
          accountSettings.hidden=true;
          document.body.classList.add("auth-required");
        }
      });
    }catch(error){
      setMessage(error?.message || String(error),true);
    }
  };

  start();
})();
