"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { FaCertificate, FaLeaf, FaHandshake, FaIndustry } from "react-icons/fa";

const values = [
  { icon: <FaIndustry size={26} />, title: "Kendi Üretimimiz", desc: "Beyaz peynir ve sucuğumuzu kendi et ve sütümüzle en doğal şekilde üretiyoruz. " },
  { icon: <FaLeaf size={26} />, title: "Doğal & Katkısız", desc: "Hiçbir ürünümüzde yapay katkı maddesi, koruyucu veya renklendirici kullanılmaz. Sadece doğal hammadde." },
  { icon: <FaCertificate size={26} />, title: "Kalite Güvencesi", desc: "Her üretim partisi gıda güvenliği standartlarına uygundur. Kalitemizden ödün vermeyiz." },
  { icon: <FaHandshake size={26} />, title: "Doğrudan Satış", desc: "Üreticiden tüketiciye — aracısız satış sayesinde hem taze hem uygun fiyatlı ürünler kapınıza ulaşır." },
];

const milestones = [
  { year: "1990", text: "Biga'da peynircilik faaliyetlerine başlandı." },
  { year: "2000", text: "Sucuk üretimi kapsamımıza eklendi." },
  { year: "2019", text: "Yeni şarküteri dükkanımız açıldı." },
  { year: "2025", text: "Online sipariş ile Türkiye geneline kargo gönderimi başlatıldı." },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <div style={{ backgroundColor: "#1A1A1A", borderBottom: "2px solid #C9963F" }}>
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#C9963F" }}>Hakkımızda</span>
          </nav>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Hakkımızda</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{"30 yılı aşkın deneyimle Biga'nın köklü üreticisi"}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
          <ArrowLeft size={14} /> Ana Sayfaya Dön
        </Link>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-3 font-bold" style={{ color: "#C9963F" }}>Hikayemiz</p>
              <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>
                {"Üretiyoruz, Satıyoruz"}<br />
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                <p>
                  <strong style={{ color: "#1A1A1A" }}>Aktaş Peynircilik</strong>
                  {", 1990 yılından bu yana Çanakkale'nin Biga ilçesinde faaliyet gösteren köklü bir aile işletmesidir. Marketteki rafları dolduran bir aracı ya da distribütör değiliz; "}
                kendi doğal sütlerimizle ürettiğimiz doğal ve katkısız Ezine peynirimizi kendi dükkanımızda satıyoruz.
                </p>
                <p>
                  {"En temel ürünümüz olan "}
                 Ezine beyaz peynirini,
                  {" Çanakkale yöresinin taze inek sütünden, geleneksel yöntemlerle kendi üretim hattımızda işliyoruz.  "}
                     <br /> Özel baharatı ve taze katkısız etiyle ürettiğimiz doğal sucığumuz
                  {" da tamamen kendi firmamızın ürünüdür — içinde ne var, ne yok, hepsini biz kontrol ediyoruz."}
                </p>
                <p>{"Peynir, sucuk ve tereyağının yanı sıra Biga ve çevre yörelerden özenle temin ettiğimiz zeytinler, sızma zeytinyağları, çiçek ballarını da müşterilerimize sunuyoruz."}</p>
                <p>{"30 yılı aşan deneyimimizle kurduğumuz köklü müşteri ilişkisi en büyük referansımızdır. Artık Türkiye'nin her iline WhatsApp sipariş ve kargo seçeneğiyle ulaşıyoruz."}</p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
              <Image src="/assets/img/dukkan1.jpg" alt="Aktaş Peynircilik" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#C9963F" }}>{"Neden Aktaş?"}</p>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{"Farkımız Üretimden Geliyor"}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(201,150,63,0.15)", color: "#C9963F" }}>{icon}</div>
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F5F2EB" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#C9963F" }}>Tarihçe</p>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>{"30 Yılın Milad Taşları"}</h2>
          </div>
          <div className="flex flex-col gap-0">
            {milestones.map(({ year, text }, i) => (
              <div key={year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 text-white" style={{ backgroundColor: "#C9963F" }}>{year.slice(2)}</div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ backgroundColor: "#E5E0D5", minHeight: 32 }} />}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C9963F" }}>{year}</p>
                  <p className="text-sm" style={{ color: "#4B5563" }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>{"Üreticiden Sipariş Verin"}</h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>{"Aracısız, taze, doğal. Ürünlerimizi inceleyin veya doğrudan WhatsApp ile sipariş verin."}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/products" className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white" style={{ backgroundColor: "#2B4A1F" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3a14")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B4A1F")}>{"Ürünleri Keşfet"}</Link>
            <Link href="/contact" className="px-7 py-3.5 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#F5F2EB", color: "#1A1A1A", border: "1px solid #E5E0D5" }}>{"İletişime Geç"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
