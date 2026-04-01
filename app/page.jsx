"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { FaCheese, FaWineBottle, FaTruck, FaBoxOpen, FaCertificate, FaWhatsapp, FaStar } from "react-icons/fa";
import { GiOlive, GiMeal, GiSausage, GiButter, GiHoneyJar } from "react-icons/gi";
import { ShieldCheck, Leaf, Award, MapPin } from "lucide-react";

const categories = [
  { name: "Peynir Çeşitleri", icon: <FaCheese size={28} />, path: "/kategori/peynir" },
  { name: "Zeytin Çeşitleri", icon: <GiOlive size={28} />, path: "/kategori/zeytin" },
  { name: "Zeytinyağı", icon: <FaWineBottle size={28} />, path: "/kategori/zeytinyagi" },
  { name: "Tereyağı", icon: <GiButter size={28} />, path: "/kategori/tereyagi" },
  { name: "Şarküteri", icon: <GiSausage size={28} />, path: "/kategori/sarkuteri" },
  { name: "Kuru Gıda & Bal", icon: <GiMeal size={28} />, path: "/kategori/kuru-gida" },
];

const stats = [
  { value: "30+", label: "Yıllık Deneyim" },
  { value: "50+", label: "Ürün Çeşidi" },
  { value: "81", label: "İle Kargo" },
  { value: "100%", label: "Doğal İçerik" },
];

const promises = [
  {
    icon: <Leaf size={22} />,
    title: "Doğal & Katkısız",
    desc: "Hiçbir ürünümüzde yapay katkı maddesi bulunmaz.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Hijyenik Üretim",
    desc: "Gıda güvenliği standartlarına uygun ekipman ve süreçler.",
  },
  {
    icon: <Award size={22} />,
    title: "Kalite Güvencesi",
    desc: "Her parti ürün gönderilmeden önce kontrol edilir.",
  },
  {
    icon: <MapPin size={22} />,
    title: "Biga'dan Direkt",
    desc: "Üreticiden sofranıza, aracısız ve taze.",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const campaigns = products.filter((p) => p.isCampaign).slice(0, 4);

  return (
    <>
      {/* ── HERO – Split Layout ── */}
      <section
        className="relative flex flex-col lg:flex-row overflow-hidden"
        style={{ minHeight: "680px", backgroundColor: "#1A1A1A" }}
      >
        {/* Left – Content */}
        <div
          className="flex-1 flex flex-col justify-center px-8 md:px-16 py-20 lg:py-0 z-10"
          style={{ maxWidth: "640px" }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5 px-3 py-1 rounded-full w-fit"
            style={{ backgroundColor: "rgba(201,150,63,0.15)", color: "#C9963F", border: "1px solid rgba(201,150,63,0.3)" }}
          >
            Aktaş Lezzetleri
          </span>
          <h1
            className="font-bold text-white leading-[1.15] mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            }}
          >
            Doğanın En Saf<br />
            <span style={{ color: "#C9963F" }}>Lezzetleri</span> Kapınızda
          </h1>
          <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: "420px" }}>
            Çanakkale Biga&apos;dan özenle seçilmiş peynir, zeytin, zeytinyağı ve daha fazlası.
            Üreticiden sofranıza, taze ve katkısız.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white uppercase tracking-wider transition-all duration-200"
              style={{ backgroundColor: "#C9963F" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A87B2A")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9963F")}
            >
              Ürünleri Keşfet
            </Link>
            <Link
              href="/cart"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white uppercase tracking-wider flex items-center gap-2 transition-all duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
            >
              <FaWhatsapp size={16} />
              Sipariş Ver
            </Link>
          </div>
        </div>

        {/* Right – kiz image */}
        <div className="relative lg:w-[52%] aspect-square lg:aspect-auto flex-shrink-0 self-stretch">
          <Image
            src="/assets/img/kiz.jpg"
            alt="Aktaş Peynircilik"
            fill
            className="object-cover"
            style={{ objectPosition: "50% 20%" }}
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          {/* Gradient blend on left */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #1A1A1A 0%, transparent 30%)",
            }}
          />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ backgroundColor: "#C9963F" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-5 text-white"
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
                }}
              >
                <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </span>
                <span className="text-xs uppercase tracking-widest mt-0.5 opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="py-20" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#C9963F" }}>
             
            </p>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
            >
              Ürün Kategorileri
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.path} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Spotlight – dukkan/sunumtabak cinematic ── */}
      <section className="relative overflow-hidden" style={{ height: "420px" }}>
        <Image
          src="/assets/img/heroalt.jpg"
          alt="Aktaş Peynircilik Ürünleri"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 flex items-center"
          style={{ background: "linear-gradient(to right, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.55) 60%, transparent 100%)" }}
        >
          <div className="container mx-auto px-8 md:px-16">
            <div style={{ maxWidth: "480px" }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#C9963F" }}>
                30 Yıldır Aynı Tutku
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Biga&apos;nın Köklü<br />Peynircisi
              </h2>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "380px" }}>
                Çanakkale&apos;nin bereketli topraklarından gelen ürünleri, yılların birikimi ve
                ustalığıyla seçiyor; hijyenik koşullarda paketleyerek kapınıza gönderiyoruz.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider pb-1"
                style={{ color: "#C9963F", borderBottom: "1px solid #C9963F" }}
              >
                Hikayemizi Okuyun →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      {featured.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "#F5F2EB" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
             
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                >
                  Öne Çıkan Ürünler
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold hidden sm:block"
                style={{ color: "#1A1A1A", borderBottom: "1px solid #1A1A1A", paddingBottom: "2px" }}
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {featured.map((prod) => (
                <ProductCard key={prod.id} product={prod} showAddToCart={false} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/products"
                className="inline-block px-6 py-3 rounded-xl text-sm font-semibold border"
                style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
              >
                Tüm Ürünler →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Promise / Why Us ── */}
      <section className="py-20" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#C9963F" }}>
              Neden Aktaş?
            </p>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Farkımız Kalitemizden Gelir
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {promises.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(201,150,63,0.15)", color: "#C9963F" }}
                >
                  {icon}
                </div>
                <h3
                  className="font-semibold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campaigns ── */}
      {campaigns.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "#FAFAF8" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#C9963F" }}>
                  Sınırlı Süre
                </p>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                >
                  Kampanyalı Ürünler
                </h2>
              </div>
              <Link
                href="/kampanyalar"
                className="text-sm font-semibold hidden sm:block"
                style={{ color: "#C9963F", borderBottom: "1px solid #C9963F", paddingBottom: "2px" }}
              >
                Tüm Kampanyalar →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {campaigns.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WhatsApp CTA ── */}
      <section
        className="py-24 text-center text-white relative overflow-hidden"
        style={{ backgroundColor: "#2B4A1F" }}
      >
        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 600, height: 600, border: "1px solid rgba(255,255,255,0.04)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 400, height: 400, border: "1px solid rgba(255,255,255,0.06)" }}
        />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <FaWhatsapp size={32} style={{ color: "#25D366" }} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WhatsApp ile Sipariş Verin
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Sepetinizi oluşturun, tek tıkla bize gönderin. Siparişiniz özenle hazırlanarak
            Türkiye&apos;nin her köşesine güvenle ulaşır.
          </p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-wider transition-all duration-200"
            style={{ backgroundColor: "#25D366" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1da851")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
          >
            <FaWhatsapp size={20} />
            Sepete Git & Sipariş Ver
          </Link>
        </div>
      </section>
    </>
  );
}
