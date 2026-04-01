"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Ürünler", path: "/products" },
  { name: "Kampanyalar", path: "/kampanyalar" },
  { name: "Hakkımızda", path: "/about" },
  { name: "İletişim", path: "/contact" },
  { name: "Kargo Bilgisi", path: "/kargo" },
];

const featuredCategories = [
  { name: "Peynir", path: "/kategori/peynir", img: "/assets/img/ezine.jpg" },
  { name: "Zeytin", path: "/kategori/zeytin", img: "/assets/img/olive2.jpg" },
  { name: "Tereyağı", path: "/kategori/tereyagi", img: "/assets/img/tereyag.jpg" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A1A", color: "rgba(255,255,255,0.85)" }}>
      {/* Top Section */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1: Company */}
          <div>
            <h5
              className="text-base font-semibold mb-3"
              style={{ color: "#C9963F", fontFamily: "'Playfair Display', serif" }}
            >
              Aktaş Peynircilik
            </h5>
            <div className="w-9 h-0.5 mb-5 rounded" style={{ backgroundColor: "#C9963F" }} />

            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#C9963F" }} />
                Sakarya, Cengiz Topel Cd. No:45, 17200 Biga / Çanakkale
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#C9963F" }} />
                0286 316 99 17
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#C9963F" }} />
                info@aktaspeynirbiga.com.tr
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { href: "https://www.facebook.com", icon: <FaFacebook size={18} /> },
                { href: "https://www.instagram.com/aktaspeynir/", icon: <FaInstagram size={18} /> },
                { href: "https://twitter.com", icon: <FaXTwitter size={18} /> },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C9963F";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5
              className="text-base font-semibold mb-3"
              style={{ color: "#C9963F", fontFamily: "'Playfair Display', serif" }}
            >
              Hızlı Linkler
            </h5>
            <div className="w-9 h-0.5 mb-5 rounded" style={{ backgroundColor: "#C9963F" }} />
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm transition-all duration-150 hover:pl-1"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Products */}
          <div>
            <h5
              className="text-base font-semibold mb-3"
              style={{ color: "#C9963F", fontFamily: "'Playfair Display', serif" }}
            >
              Popüler Ürünler
            </h5>
            <div className="w-9 h-0.5 mb-5 rounded" style={{ backgroundColor: "#C9963F" }} />
            <div className="flex gap-4 flex-wrap">
              {featuredCategories.map(({ name, path, img }) => (
                <Link key={path} href={path} className="group flex flex-col items-center gap-1.5">
                  <div
                    className="w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                    style={{ borderColor: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9963F")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                  >
                    <Image
                      src={img}
                      alt={name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t py-5 text-center text-xs"
        style={{
          borderColor: "rgba(201,150,63,0.2)",
          backgroundColor: "#111",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        &copy; {new Date().getFullYear()} Aktaş Peynircilik. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
