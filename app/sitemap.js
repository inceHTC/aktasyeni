export default function sitemap() {
  const base = "https://www.aktaspeynirbiga.com.tr";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/products`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/kampanyalar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/kargo`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/kategori/peynir`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/zeytin`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/zeytinyagi`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/tereyagi`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/sarkuteri`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/bal`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/kategori/kuru-gida`, priority: 0.8, changeFrequency: "weekly" },
  ];

  return staticPages.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
