import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Aktaş Peynircilik | Biga, Çanakkale",
  description:
    "Aktaş Peynircilik — Biga'dan doğal ve taze peynir, zeytin, zeytinyağı, bal ve şarküteri ürünleri. Üreticiden kapınıza, katkısız ve taze.",
  keywords:
    "peynir, ezine peyniri, beyaz peynir, zeytin, zeytinyağı, tereyağı, bal, sucuk, şarküteri, biga, çanakkale, aktaş peynircilik, doğal ürünler, kargo",
  metadataBase: new URL("https://www.aktaspeynirbiga.com.tr"),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Aktaş Peynircilik | Biga, Çanakkale",
    description:
      "Üreticiden sofranıza — doğal peynir, zeytin, zeytinyağı ve şarküteri ürünleri. Türkiye geneline kargo.",
    url: "https://www.aktaspeynirbiga.com.tr",
    siteName: "Aktaş Peynircilik",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          {/* Navbar height offset */}
          <main className="pt-[102px] min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
