import { getProduct } from "@/lib/firestore-server";
import ProductDetailClient from "./ProductDetailClient";

function weightText(w) {
  if (!w) return "";
  return w < 1 ? `${Math.round(w * 1000)} gr` : `${w} kg`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Ürün | Aktaş Peynircilik",
      description: "Aktaş Peynircilik'ten doğal ve katkısız ürün. Biga Çanakkale'den Türkiye geneline kargo.",
      alternates: { canonical: `https://www.aktaspeynirbiga.com.tr/products/${id}` },
    };
  }

  const price = product.isCampaign ? product.newPrice : product.price;
  const wt = weightText(product.weight);
  const description = product.description
    ? `${product.description}${wt ? ` — ${wt}` : ""}. ₺${price}. Aktaş Peynircilik, Biga Çanakkale'den Türkiye geneline kargo.`
    : `${product.name}${wt ? ` (${wt})` : ""} ₺${price} — Aktaş Peynircilik'ten doğal, katkısız. Biga'dan Türkiye'nin 81 iline kargo ile kapınıza.`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `https://www.aktaspeynirbiga.com.tr/products/${id}`,
    },
    openGraph: {
      title: `${product.name} | Aktaş Peynircilik`,
      description,
      url: `https://www.aktaspeynirbiga.com.tr/products/${id}`,
      images: product.image
        ? [{ url: product.image, alt: product.name }]
        : [{ url: "/assets/img/heroalt.jpg", alt: "Aktaş Peynircilik" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Aktaş Peynircilik`,
      description,
      images: product.image ? [product.image] : ["/assets/img/heroalt.jpg"],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  const productSchema = product
    ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.name,
        image: product.image || undefined,
        description:
          product.description ||
          `${product.name} — Aktaş Peynircilik'ten doğal ve katkısız. Biga Çanakkale.`,
        brand: { "@type": "Brand", name: "Aktaş Peynircilik" },
        offers: {
          "@type": "Offer",
          url: `https://www.aktaspeynirbiga.com.tr/products/${id}`,
          priceCurrency: "TRY",
          price: product.isCampaign ? product.newPrice : product.price,
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: { "@type": "Organization", name: "Aktaş Peynircilik" },
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailClient params={params} />
    </>
  );
}
