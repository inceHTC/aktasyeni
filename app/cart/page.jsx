"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import citiesData from "@/lib/cities.json";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, shippingFee } = useCart();

  const [fullName, setFullName] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [building, setBuilding] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const districts = selectedCity
    ? citiesData.find((c) => c.name === selectedCity)?.districts || []
    : [];

  const handleOrder = () => {
    if (!fullName || !tcNo || !selectedCity || !selectedDistrict || !address) {
      setError("Lütfen tüm kargo bilgilerini doldurun!");
      return;
    }
    if (tcNo.length !== 11 || !/^\d+$/.test(tcNo)) {
      setError("Geçerli bir T.C. kimlik numarası girin (11 hane).");
      return;
    }
    if (address.length < 10) {
      setError("Adres bilgisi çok kısa.");
      return;
    }
    setError("");

    const now = new Date();
    const orderId = `SP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

    const rows = cart
      .map((item) => {
        const w = item.weight < 1 ? `${Math.round(item.weight * 1000)} gr` : `${item.weight} kg`;
        const price = item.isCampaign ? item.newPrice : item.price;
        return `${item.name}   ${item.quantity} x ${w} ${price * item.quantity} TL\n-------------------------`;
      })
      .join("\n");

    const fullAddress = [selectedCity, selectedDistrict, building, address].filter(Boolean).join(" / ");

    const message =
      `Merhaba, sipariş vermek istiyorum:\n\n` +
      `Sipariş No: ${orderId}\n\n` +
      `Ürün Adı              Adet           Fiyat\n` +
      `----------------------------------\n` +
      rows +
      `\n\n` +
      `Ürün Toplamı: ${totalPrice} TL\n` +
      `Kargo: ${shippingFee} TL\n` +
      `Genel Toplam: ${totalPrice + shippingFee} TL\n\n` +
      `Adı Soyadı: ${fullName}\n` +
      `TC No: ${tcNo}\n` +
      `Adres: ${fullAddress}`;

    window.open(`https://wa.me/905374835469?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: "60vh", backgroundColor: "#FAFAF8" }}
      >
        <ShoppingBag size={56} style={{ color: "#E5E0D5" }} className="mb-4" />
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sepetiniz boş
        </h2>
        <p className="text-sm mb-6" style={{ color: "#9CA3AF" }}>
          Alışverişe başlamak için ürünlerimizi inceleyin.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white uppercase tracking-wider"
          style={{ backgroundColor: "#2B4A1F" }}
        >
          Ürünlere Git
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <h1
          className="section-title text-3xl font-bold mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sepetim
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => {
              const price = item.isCampaign ? item.newPrice : item.price;
              const w = item.weight < 1 ? `${Math.round(item.weight * 1000)} gr` : `${item.weight} kg`;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4"
                  style={{ border: "1px solid #E5E0D5" }}
                >
                  <div
                    className="relative rounded-xl overflow-hidden flex-shrink-0"
                    style={{ width: 80, height: 80, backgroundColor: "#F5F2EB" }}
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm truncate"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{w}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                        style={{ border: "1px solid #E5E0D5", backgroundColor: "#F5F2EB" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                        style={{ border: "1px solid #E5E0D5", backgroundColor: "#F5F2EB" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-base" style={{ color: "#276227" }}>
                      ₺{price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg transition-colors duration-150"
                      style={{ color: "#9CA3AF" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#C0392B")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary + Form */}
          <div className="flex flex-col gap-5">
            {/* Summary */}
            <div
              className="bg-white rounded-2xl p-5"
              style={{ border: "1px solid #E5E0D5" }}
            >
              <h3
                className="font-semibold text-base mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sipariş Özeti
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#6B7280" }}>Ürün Toplamı</span>
                  <span className="font-medium">₺{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7280" }}>Kargo</span>
                  <span className="font-medium">₺{shippingFee}</span>
                </div>
                <div className="text-right">
                  <Link
                    href="/kargo"
                    className="text-xs underline"
                    style={{ color: "#C0392B" }}
                    target="_blank"
                  >
                    Güncel Kargo Tutarları
                  </Link>
                </div>
                <div
                  className="flex justify-between font-bold text-base pt-2 border-t"
                  style={{ borderColor: "#E5E0D5" }}
                >
                  <span>Toplam</span>
                  <span style={{ color: "#276227" }}>₺{totalPrice + shippingFee}</span>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <div
              className="bg-white rounded-2xl p-5 flex flex-col gap-3"
              style={{ border: "1px solid #E5E0D5" }}
            >
              <h3
                className="font-semibold text-base mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kargo Bilgileri
              </h3>

              {[
                { label: "Ad Soyad", value: fullName, onChange: setFullName, type: "text" },
                { label: "T.C. Kimlik No", value: tcNo, onChange: (v) => setTcNo(v.replace(/\D/g, "").slice(0, 11)), type: "text", placeholder: "Fatura için gereklidir" },
              ].map(({ label, value, onChange, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>İl</label>
                <select
                  value={selectedCity}
                  onChange={(e) => { setSelectedCity(e.target.value); setSelectedDistrict(""); }}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                >
                  <option value="">Seçiniz</option>
                  {citiesData.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>İlçe</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedCity}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none disabled:opacity-50"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                >
                  <option value="">Seçiniz</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Bina / Daire</label>
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="Apartman adı, daire no"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Açık Adres</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Mahalle, cadde, sokak..."
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                />
              </div>

              {error && <p className="text-xs font-medium" style={{ color: "#C0392B" }}>{error}</p>}

              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 mt-2"
                style={{ backgroundColor: "#25D366" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1da851")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
              >
                <FaWhatsapp size={18} />
                WhatsApp ile Sipariş Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
