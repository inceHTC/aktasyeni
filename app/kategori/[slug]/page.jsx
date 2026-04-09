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
  peynir: "Ezine'den Mihaliç'e, köy peynirinden tulum peynirine — doğal ve katkısız peynir çeşitlerimiz.",
  zeytin: "Edremit'ten Gemlik'e, siyahtan yeşile — her damak zevkine uygun yöresel zeytinler.",
  zeytinyagi: "Soğuk sıkım, naturel sızma — Çanakkale zeytinlerinin en saf hali.",
  tereyagi: "Yöresel inek sütünden üretilen, katkısız doğal tereyağı.",
  sarkuteri: "Kendi üretimimiz olan doğal sucuk ve seçkin şarküteri ürünleri.",
  "kuru-gida": "Pirinç, mercimek, tarhana, erişte, Biga yöresinden süzme ballar ve mevsim reçelleri.",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = LABELS[slug] ?? slug;
  const desc = DESCRIPTIONS[slug] ?? "Aktaş Peynircilik ürün kategorisi.";
  return {
    title: `${title} | Aktaş Peynircilik`,
    description: desc,
    alternates: {
      canonical: `https://www.aktaspeynirbiga.com.tr/kategori/${slug}`,
    },
  };
}

export default function CategoryPage({ params }) {
  return <CategoryPageClient params={params} />;
}
