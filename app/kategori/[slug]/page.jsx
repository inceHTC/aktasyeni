"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ChevronRight } from "lucide-react";

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

// kuru-gida <-> kurugida gibi tire farkını normalize et
const normalizeSlug = (s) => s?.replace(/-/g, "").toLowerCase();

export default function CategoryPage({ params }) {
  const { slug } = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      const all = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const slugNorm = normalizeSlug(slug);
      const merged = slugNorm === "kurugida"
        ? all.filter((p) => normalizeSlug(p.category) === "kurugida" || normalizeSlug(p.category) === "bal")
        : all.filter((p) => normalizeSlug(p.category) === slugNorm);
      setProducts(merged);
      setLoading(false);
    });
  }, [slug]);

  const title = LABELS[slug] ?? slug;
  const desc = DESCRIPTIONS[slug] ?? "";

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1A1A1A", borderBottom: "2px solid #C9963F" }}>
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-white transition-colors">Ürünler</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#C9963F" }}>{title}</span>
          </nav>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
          {desc && <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors duration-150"
          style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
        >
          <ArrowLeft size={14} /> Tüm Ürünlere Dön
        </Link>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white animate-pulse" style={{ height: "280px" }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-base mb-4" style={{ color: "#9CA3AF" }}>Bu kategoride henüz ürün bulunmuyor.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#2B4A1F" }}
            >
              Tüm Ürünlere Git
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs mb-6" style={{ color: "#9CA3AF" }}>{products.length} ürün listeleniyor</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
