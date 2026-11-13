import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: {
    default: "Aktaş Peynircilik | Online Peynir, Zeytin, Zeytinyağı | Türkiye Geneli Kargo",
    template: "%s | Aktaş Peynircilik",
  },
  description:
    "Aktaş Peynircilik — 30 yıllık köklü peynirci, Biga Çanakkale'den Türkiye'nin 81 iline kargo. Online peynir, Ezine peyniri, zeytin, zeytinyağı, tereyağı ve şarküteri siparişi verin. Üreticiden kapınıza, katkısız ve taze.",
  keywords: [
    "online peynir satışı",
    "peynir online sipariş",
    "peynir kargo",
    "Ezine peyniri",
    "beyaz peynir",
    "tulum peyniri",
    "Mihaliç peyniri",
    "köy peyniri",
    "kelle peyniri",
    "doğal peynir",
    "katkısız peynir",
    "zeytin satın al",
    "zeytinyağı online",
    "sızma zeytinyağı",
    "naturel zeytinyağı",
    "tereyağı",
    "sucuk",
    "şarküteri",
    "biga",
    "çanakkale",
    "aktaş peynircilik",
    "aktaş peynir biga",
    "doğal gıda",
    "Türkiye geneli kargo",
    "81 ile kargo",
    "üreticiden peynir",
    "peynirci",
    "İstanbul peynir kargo",
    "Ankara peynir kargo",
    "İzmir peynir kargo",
  ],
  metadataBase: new URL("https://www.aktaspeynirbiga.com.tr"),
  alternates: {
    canonical: "https://www.aktaspeynirbiga.com.tr",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Aktaş Peynircilik | Online Peynir, Zeytin, Zeytinyağı",
    description:
      "30 yıllık köklü peynirci — Biga Çanakkale'den Türkiye'nin 81 iline kargo. Ezine peyniri, zeytin, zeytinyağı ve daha fazlası. Üreticiden sofranıza.",
    url: "https://www.aktaspeynirbiga.com.tr",
    siteName: "Aktaş Peynircilik",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/assets/img/heroalt.jpg",
        width: 1200,
        height: 630,
        alt: "Aktaş Peynircilik — Biga, Çanakkale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aktaş Peynircilik | Online Peynir, Zeytin, Zeytinyağı",
    description:
      "Biga Çanakkale'den Türkiye geneline kargo. Ezine peyniri, doğal zeytin, zeytinyağı ve şarküteri.",
    images: ["/assets/img/heroalt.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": "https://www.aktaspeynirbiga.com.tr/#organization",
  name: "Aktaş Peynircilik",
  alternateName: "Aktaş Peynir Biga",
  description:
    "30 yılı aşkın süredir Biga, Çanakkale'de faaliyet gösteren Aktaş Peynircilik; doğal peynir, zeytin, zeytinyağı, tereyağı ve şarküteri ürünlerini üreticiden Türkiye'nin her iline kargo ile ulaştırmaktadır.",
  url: "https://www.aktaspeynirbiga.com.tr",
  logo: "https://www.aktaspeynirbiga.com.tr/favicon.png",
  image: "https://www.aktaspeynirbiga.com.tr/assets/img/heroalt.jpg",
  telephone: "+902863169917",
  email: "info@aktaspeynirbiga.com.tr",
  foundingDate: "1990",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sakarya, Cengiz Topel Cd. No:45",
    addressLocality: "Biga",
    addressRegion: "Çanakkale",
    postalCode: "17200",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.2271,
    longitude: 27.2423,
  },
  areaServed: {
    "@type": "Country",
    name: "Turkey",
  },
  priceRange: "₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Kapıda ödeme, Havale/EFT",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Aktaş Peynircilik Ürünleri",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Peynir Çeşitleri" },
      { "@type": "OfferCatalog", name: "Zeytin Çeşitleri" },
      { "@type": "OfferCatalog", name: "Zeytinyağı" },
      { "@type": "OfferCatalog", name: "Tereyağı" },
      { "@type": "OfferCatalog", name: "Şarküteri" },
      { "@type": "OfferCatalog", name: "Kuru Gıda & Bal" },
    ],
  },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            {/* Navbar height offset */}
            <main className="pt-[102px] min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
