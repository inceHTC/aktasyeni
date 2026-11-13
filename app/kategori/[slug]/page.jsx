import CategoryPageClient from "./CategoryPageClient";

const LABELS = {
  peynir: "Peynir Çeşitleri",
  zeytin: "Zeytin Çeşitleri",
  zeytinyagi: "Zeytinyağı",
  tereyagi: "Tereyağı",
  sarkuteri: "Şarküteri",
  "kuru-gida": "Kuru Gıda & Bal",
};

const DESCRIPTIONS = {
  peynir:
    "Online peynir satışı — Ezine peyniri, Mihaliç peyniri, tulum peyniri, köy peyniri, beyaz peynir çeşitleri. Aktaş Peynircilik, Biga Çanakkale'den Türkiye'nin 81 iline kargo.",
  zeytin:
    "Edremit'ten Gemlik'e siyah ve yeşil zeytin çeşitleri online sipariş. Aktaş Peynircilik'ten doğal, katkısız yöresel zeytinler. Türkiye geneline kargo.",
  zeytinyagi:
    "Soğuk sıkım naturel sızma zeytinyağı online satış. Çanakkale zeytinlerinden üretilen, katkısız sızma zeytinyağı. Aktaş Peynircilik, Türkiye geneline kargo.",
  tereyagi:
    "Doğal yöresel tereyağı online sipariş. Yöresel inek sütünden üretilen, katkısız tereyağı çeşitleri. Aktaş Peynircilik, Biga Çanakkale — Türkiye geneline kargo.",
  sarkuteri:
    "Doğal sucuk ve şarküteri online sipariş. Kendi üretimimiz, katkısız doğal sucuk ve seçkin şarküteri ürünleri. Aktaş Peynircilik'ten Türkiye geneline kargo.",
  "kuru-gida":
    "Yöresel kuru gıda ve bal online sipariş. Biga'dan süzme ballar, tarhana, erişte, pirinç, mercimek ve mevsim reçelleri. Aktaş Peynircilik — Türkiye geneline kargo.",
};

const KEYWORDS = {
  peynir: "online peynir satışı, peynir sipariş, Ezine peyniri, Mihaliç peyniri, tulum peyniri, köy peyniri, beyaz peynir, peynir kargo, doğal peynir",
  zeytin: "zeytin satın al, online zeytin sipariş, Edremit zeytini, Gemlik zeytini, siyah zeytin, yeşil zeytin, yöresel zeytin, zeytin kargo",
  zeytinyagi: "zeytinyağı online al, sızma zeytinyağı, naturel zeytinyağı, soğuk sıkım zeytinyağı, Çanakkale zeytinyağı, zeytinyağı sipariş",
  tereyagi: "tereyağı online al, doğal tereyağı, yöresel tereyağı, katkısız tereyağı, tereyağı sipariş",
  sarkuteri: "sucuk online al, doğal sucuk, şarküteri online sipariş, katkısız sucuk, el yapımı sucuk",
  "kuru-gida": "bal online al, süzme bal, tarhana, kuru gıda online sipariş, yöresel ürünler, Biga bal",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const label = LABELS[slug] ?? slug;
  const desc = DESCRIPTIONS[slug] ?? "Aktaş Peynircilik ürün kategorisi. Biga Çanakkale'den Türkiye geneline kargo.";
  const keywords = KEYWORDS[slug] ?? "";

  return {
    title: label,
    description: desc,
    keywords,
    alternates: {
      canonical: `https://www.aktaspeynirbiga.com.tr/kategori/${slug}`,
    },
    openGraph: {
      title: `${label} | Aktaş Peynircilik`,
      description: desc,
      url: `https://www.aktaspeynirbiga.com.tr/kategori/${slug}`,
      images: [{ url: "/assets/img/heroalt.jpg", alt: `${label} — Aktaş Peynircilik` }],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const label = LABELS[slug] ?? slug;
  const base = "https://www.aktaspeynirbiga.com.tr";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: base },
      { "@type": "ListItem", position: 2, name: "Ürünler", item: `${base}/products` },
      { "@type": "ListItem", position: 3, name: label, item: `${base}/kategori/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageClient params={params} />
    </>
  );
}
