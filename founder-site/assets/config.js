/* Site configuration — the only file you need to edit for links & identity. */
window.FS = {
  name: "Zuhura Akiru", // [SWAP] display name
  domain: "https://YOUR-DOMAIN.COM", // [SWAP] used to resolve [DOMAIN] placeholders
  calendly: "https://calendly.com/YOUR-HANDLE/30min-intro", // [SWAP]
  email: "missakirubusiness@gmail.com",
  whatsapp: "https://wa.me/971500000000?text=Hi%20Zuhura Akiru%2C%20found%20you%20via%20the%20site", // [SWAP]
  github: "https://github.com/zarathebosslady18-dotcom/ai-tools-uae-stack/tree/main/cart402",
  // Soft gate passphrase (client-side only — cosmetic, not security).
  systemsPass: "change-me",
  // Optional Supabase lead capture. Leave url/key empty to use the
  // graceful fallback (prefilled WhatsApp/mailto) instead.
  supabase: {
    url: "",
    key: "",
    table: "leads",
  },
};
