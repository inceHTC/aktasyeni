"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    const text = `Merhaba, ben ${name}.\n\n${message}\n\nE-posta: ${email}`;
    window.open(`https://wa.me/905374835469?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  const contactInfo = [
    { icon: <MapPin size={18} />, label: "Adres", value: "Sakarya, Cengiz Topel Cd. No:45, 17200 Biga / Çanakkale" },
    { icon: <Phone size={18} />, label: "Telefon", value: "0286 316 99 17" },
    { icon: <Mail size={18} />, label: "E-posta", value: "info@aktaspeynirbiga.com.tr" },
    { icon: <Clock size={18} />, label: "Çalışma Saatleri", value: "Pazartesi – Cumartesi: 08:00 – 19:00" },
  ];

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      {/* Hero */}
      <section
        className="text-white text-center py-20 px-4"
        style={{ background: "linear-gradient(135deg, #2B4A1F 0%, #1A1A1A 100%)" }}
      >
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#C9963F" }}>
          İletişim
        </h1>
        <p className="text-white/70 text-base">Sorularınız için bize ulaşın</p>
      </section>

      <div className="container mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
          <ArrowLeft size={14} /> Ana Sayfaya Dön
        </Link>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#000" }}>
                Bize Ulaşın
              </h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: "#9CA3AF" }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp direct */}
              <a
                href="https://wa.me/905374835469"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-8 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200"
                style={{ backgroundColor: "#25D366" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1da851")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
              >
                <FaWhatsapp size={20} />
                WhatsApp ile Yaz
              </a>
            </div>

            {/* Form */}
            <div
              className="bg-white rounded-2xl p-7"
              style={{ border: "1px solid #E5E0D5" }}
            >
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Mesajınız iletildi!
                  </h3>
                  <p className="text-sm" style={{ color: "#6B7280" }}>En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                  <h3 className="font-semibold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Mesaj Gönderin
                  </h3>
                  {[
                    { label: "Ad Soyad *", value: name, onChange: setName, type: "text" },
                    { label: "E-posta", value: email, onChange: setEmail, type: "email" },
                  ].map(({ label, value, onChange, type }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>{label}</label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                        style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Mesajınız *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    style={{ backgroundColor: "#2B4A1F" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3a14")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B4A1F")}
                  >
                    <FaWhatsapp size={16} />
                    WhatsApp ile Gönder
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
