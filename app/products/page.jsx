"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import { Search, ChevronRight } from "lucide-react";

const CATEGORY_LABELS = {
  all: "Tümü",
  peynir: "Peynir",
  zeytin: "Zeytin",
  zeytinyagi: "Zeytinyağı",
  tereyagi: "Tereyağı",
  sarkuteri: "Şarküteri",
  bal: "Bal & Reçel",
  "kuru-gida": "Kuru Gıdalar",
};

const normalizeSlug = (s) => s?.replace(/-/g, "").toLowerCase();

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category === "all" || normalizeSlug(p.category) === normalizeSlug(category);
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1A1A1A", borderBottom: "2px solid #C9963F" }}>
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#C9963F" }}>Tüm Ürünler</span>
          </nav>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Tüm Ürünler
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Biga&apos;dan taze ve doğal lezzetler
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white outline-none"
              style={{ border: "1px solid #E5E0D5", color: "#1A1A1A" }}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: category === key ? "#2B4A1F" : "#FFFFFF",
                  color: category === key ? "#FFFFFF" : "#4B5563",
                  border: `1px solid ${category === key ? "#2B4A1F" : "#E5E0D5"}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white animate-pulse" style={{ height: "280px" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: "#9CA3AF" }}>Ürün bulunamadı.</p>
          </div>
        ) : (
          <>
            <p className="text-xs mb-5" style={{ color: "#9CA3AF" }}>{filtered.length} ürün listeleniyor</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filtered.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
