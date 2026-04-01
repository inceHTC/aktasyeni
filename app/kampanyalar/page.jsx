"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import { Tag, ArrowLeft, ChevronRight } from "lucide-react";

export default function KampanyalarPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(all.filter((p) => p.isCampaign));
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="text-white text-center py-20 px-4"
        style={{ background: "linear-gradient(135deg, #C0392B 0%, #1A1A1A 100%)" }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <Tag size={28} />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Kampanyalar
        </h1>
        <p className="text-white/70">Özel indirimli ürünlerimizi keşfedin</p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
            <ArrowLeft size={14} /> Ana Sayfaya Dön
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white animate-pulse" style={{ height: "280px" }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "#9CA3AF" }}>Şu anda aktif kampanya bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
