import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Aktaş Peynircilik | Biga, Çanakkale",
  description:
    "Aktaş Peynircilik — Biga'dan doğal ve taze peynir, zeytin, zeytinyağı, bal ve şarküteri ürünleri.",
  keywords:
    "peynir, zeytin, zeytinyağı, tereyağı, bal, şarküteri, biga, çanakkale, aktaş peynircilik",
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
