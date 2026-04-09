"use client";

import { use, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailClient({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "products", id));
      if (!docSnap.exists()) { setLoading(false); return; }
      const p = { id: docSnap.id, ...docSnap.data() };
      setProduct(p);

      // Related
      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRelated(all.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    toast.success("Ürün sepete eklendi!");
    setTimeout(() => setAdded(false), 1500);
  };

  const displayWeight =
    product?.weight < 1
      ? `${Math.round(product.weight * 1000)} gr`
      : `${product?.weight} kg`;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-gray-100 animate-pulse" style={{ aspectRatio: "1/1" }} />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-lg w-3/4" />
            <div className="h-4 bg-gray-100 animate-pulse rounded-lg w-1/4" />
            <div className="h-6 bg-gray-100 animate-pulse rounded-lg w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p style={{ color: "#9CA3AF" }}>Ürün bulunamadı.</p>
        <Link href="/products" className="mt-4 inline-block underline" style={{ color: "#C9963F" }}>
          Ürünlere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
          >
            <ArrowLeft size={14} /> Tüm Ürünler
          </Link>
          {product?.category && (
            <>
              <span style={{ color: "#E5E0D5" }}>›</span>
              <Link
                href={`/kategori/${product.category}`}
                className="text-sm transition-colors duration-150"
                style={{ color: "#9CA3AF" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              >
                {product.category}
              </Link>
            </>
          )}
        </div>

        {/* Main */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl p-8" style={{ border: "1px solid #E5E0D5" }}>
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "#F5F2EB" }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.isCampaign && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold text-white  tracking-wider"
                style={{ backgroundColor: "#C0392B" }}
              >
                indirim
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C9963F" }}>
                {product.category}
              </p>
              <h1
                className="text-3xl font-bold leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
              >
                {product.name}
              </h1>
              {product.weight && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#F5F2EB", color: "#6B7280" }}
                >
                  {displayWeight}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.isCampaign && (
                <span className="text-lg line-through" style={{ color: "#9CA3AF" }}>
                  ₺{product.price}
                </span>
              )}
              <span
                className="text-4xl font-bold"
                style={{ color: product.isCampaign ? "#C0392B" : "#276227" }}
              >
                ₺{product.isCampaign ? product.newPrice : product.price}
              </span>
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                {product.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {product.inStock ? (
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 rounded-2xl font-bold text-sm text-white  tracking-wider flex items-center justify-center gap-4 transition-all duration-200"
                  style={{ backgroundColor: added ? "#276227" : "#2B4A1F" }}
                  onMouseEnter={(e) => !added && (e.currentTarget.style.backgroundColor = "#1e3a14")}
                  onMouseLeave={(e) => !added && (e.currentTarget.style.backgroundColor = "#2B4A1F")}
                >
                  {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                  {added ? "Sepete Eklendi" : "Sepete Ekle"}
                </button>
              ) : (
                <div
                  className="flex-1 py-4 rounded-2xl text-center text-sm italic"
                  style={{ backgroundColor: "#F5F2EB", color: "#9CA3AF" }}
                >
                  Stokta yok — Yakında gelecek
                </div>
              )}
              <Link
                href="/cart"
                className="py-4 px-6 rounded-2xl font-semibold text-sm text-white text-center  tracking-wider transition-all duration-200"
                style={{ backgroundColor: "#C9963F" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A87B2A")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9963F")}
              >
                Sipariş Ver
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2
              className="section-title section-title-left text-xl font-semibold mb-8"
            >
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
