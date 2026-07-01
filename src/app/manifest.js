export default function manifest() {
  return {
    name: "Zainab Clinic",
    short_name: "Zainab Clinic",
    description: "Zainab Clinic, run by Dr. Mohammad Shoeb Shaikh (B.A.M.S.), provides premium and compassionate healthcare services in Ambernath West. Book your consultation slot today.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a", // Dark slate to match the aesthetic theme
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
