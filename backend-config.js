// The Supabase project URL and publishable key are safe to expose to the
// browser. Row Level Security is the actual data boundary.
// Never add a secret key or service_role key here.
window.FLIGHT_ARCHIVE_BACKEND = Object.freeze({
  enabled: false,
  supabaseUrl: "",
  publishableKey: "",
  legacyOwnerEmail: "lihaozhe041128@gmail.com"
});
