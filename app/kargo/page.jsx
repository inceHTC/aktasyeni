"use client";

import Link from "next/link";
import { Truck, Package, Clock, ArrowLeft } from "lucide-react";

const shippingRates = [
  { maxWeight: 3, price: 150 },
  { maxWeight: 5, price: 160 },
  { maxWeight: 10, price: 230 },
  { maxWeight: 15, price: 380 },
  { maxWeight: 20, price: 445 },
  { maxWeight: 25, price: 550 },
  { maxWeight: 30, price: 570 },
  { maxWeight: Infinity, price: 920 },
];

export default function KargoPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="text-white text-center py-20 px-4"
        style={{ background: "linear-gradient(135deg, #2B4A1F 0%, #1A1A1A 100%)" }}
      >
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Kargo Bilgisi
        </h1>
        <p className="text-white/70">Ağırlığa göre hesaplanan kargo ücretleri</p>
      </section>

      <div className="container mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
          <ArrowLeft size={14} /> Ana Sayfaya Dön
        </Link>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {[
              { icon: <Truck size={24} />, title: "Güvenli Kargo", desc: "Profesyonel kargo firmaları" },
              { icon: <Package size={24} />, title: "Özel Paketleme", desc: "Gıdaya uygun ambalaj" },
              { icon: <Clock size={24} />, title: "Hızlı Teslimat", desc: "1–5 iş günü içinde" },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 flex gap-4 items-start"
                style={{ border: "1px solid #E5E0D5" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Weight-based Table */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E5E0D5" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E5E0D5" }}>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ağırlığa Göre Kargo Ücretleri
              </h2>
              <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                Sepetinizdeki ürünlerin toplam ağırlığına göre otomatik hesaplanır
              </p>
            </div>
            <div className="divide-y" style={{ borderColor: "#E5E0D5" }}>
              {shippingRates.map((rate, idx) => {
                let label;
                if (rate.maxWeight === Infinity) {
                  label = "30 kg üzeri";
                } else if (idx === 0) {
                  label = `0 – ${rate.maxWeight} kg`;
                } else {
                  label = `${shippingRates[idx - 1].maxWeight} – ${rate.maxWeight} kg`;
                }
                return (
                  <div key={idx} className="flex items-center justify-between px-6 py-4">
                    <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{label}</p>
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-lg"
                      style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}
                    >
                      ₺{rate.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "#9CA3AF" }}>
            Kargo bedeli sipariş toplamına eklenir.
          </p>
        </div>
      </section>
    </div>
  );
}
