import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: "Ürün Detayı | Aktaş Peynircilik",
    description:
      "Aktaş Peynircilik'ten doğal ve katkısız ürün. Biga'dan direkt, üreticiden sofranıza.",
    alternates: {
      canonical: `https://www.aktaspeynirbiga.com.tr/products/${id}`,
    },
  };
}

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient params={params} />;
}
