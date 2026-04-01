export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/cart"],
    },
    sitemap: "https://www.aktaspeynirbiga.com.tr/sitemap.xml",
  };
}
