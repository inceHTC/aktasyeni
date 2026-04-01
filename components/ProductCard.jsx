"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";

export default function ProductCard({ product, showAddToCart = true }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayWeight =
    product.weight < 1
      ? `${Math.round(product.weight * 1000)} gr`
      : `${product.weight} kg`;

  const price = product.isCampaign ? product.newPrice : product.price;

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      {/* Campaign Badge */}
      {product.isCampaign && (
        <div
          className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-xs font-bold text-white  tracking-wider"
          style={{ backgroundColor: "#C0392B" }}
        >
          indirim
        </div>
      )}

      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "100%", backgroundColor: "#E8E4DC" }}>
        {product.image && !imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="absolute object-cover transition-transform duration-400 group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl select-none">🧀</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3
          className="text-sm font-semibold text-center leading-snug line-clamp-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
        >
          {product.name}
        </h3>

        {product.weight && (
          <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
            {displayWeight}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mt-1">
          {product.isCampaign && (
            <span className="text-xs line-through" style={{ color: "#9CA3AF" }}>
              ₺{product.price}
            </span>
          )}
          <span
            className="font-bold text-base"
            style={{ color: product.isCampaign ? "#C0392B" : "#276227" }}
          >
            ₺{price}
          </span>
        </div>

        {/* Add to Cart */}
        {showAddToCart && (
          <div className="mt-auto pt-2">
            {product.inStock ? (
              <button
                onClick={handleAdd}
                className="w-full py-2 rounded-xl text-xs font-semibold text-white  tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200"
                style={{
                  backgroundColor: added ? "#276227" : "#2B4A1F",
                  transform: added ? "scale(1.03)" : "scale(1)",
                }}
                onMouseEnter={(e) => !added && (e.currentTarget.style.backgroundColor = "#1e3a14")}
                onMouseLeave={(e) => !added && (e.currentTarget.style.backgroundColor = "#2B4A1F")}
              >
                {added ? (
                  <>
                    <Check size={13} /> Eklendi
                  </>
                ) : (
                  <>
                    <ShoppingCart size={13} /> Sepete Ekle
                  </>
                )}
              </button>
            ) : (
              <p className="text-center text-xs italic" style={{ color: "#9CA3AF" }}>
                Yakında stoklarda
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
