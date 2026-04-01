"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

const menuItems = [
  { name: "Ana Sayfa", path: "/" },
  {
    name: "Ürünler",
    path: "/products",
    submenu: [
      { name: "Tüm Ürünler", path: "/products" },
      { name: "Peynir Çeşitleri", path: "/kategori/peynir" },
      { name: "Zeytin Çeşitleri", path: "/kategori/zeytin" },
      { name: "Zeytinyağı", path: "/kategori/zeytinyagi" },
      { name: "Tereyağı", path: "/kategori/tereyagi" },
      { name: "Şarküteri", path: "/kategori/sarkuteri" },
      { name: "Bal & Reçel", path: "/kategori/bal" },
      { name: "Kuru Gıdalar", path: "/kategori/kuru-gida" },
    ],
  },
  { name: "Kampanyalar", path: "/kampanyalar" },
  { name: "Hakkımızda", path: "/about" },
  { name: "İletişim", path: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#1A1A1A", borderBottom: "2px solid #C9963F" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-[100px] gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 h-full flex items-center">
            <Image
              src="/assets/img/logo1.png"
              alt="Aktaş Peynircilik"
              width={90}
              height={90}
              className="object-contain"
              style={{ maxHeight: "90px", width: "auto" }}
            />
          </Link>

          {/* Firma Banner */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/img/aktasbanner.png"
              alt="Aktaş Peynircilik"
              width={220}
              height={80}
              className="object-contain"
              style={{ maxHeight: "80px", width: "auto" }}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.path}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.85)", letterSpacing: "0.07em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9963F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={13} />}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div
                    className="absolute top-full left-0 min-w-[200px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    style={{
                      borderTop: "2px solid #C9963F",
                      transform: "translateY(4px)",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#C9963F] transition-colors duration-150"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* WhatsApp Order */}
            <Link
              href="/cart"
              className="ml-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200"
              style={{ backgroundColor: "#276227", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e4f1e")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#276227")}
            >
              WhatsApp Sipariş
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative ml-2 p-2.5 rounded-lg text-white transition-all duration-200"
              style={{ backgroundColor: "#C9963F" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A87B2A")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C9963F")}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ backgroundColor: "#C0392B" }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex items-center gap-3 ml-auto lg:hidden">
            <Link href="/cart" className="relative p-2 rounded-lg text-white" style={{ backgroundColor: "#C9963F" }}>
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ backgroundColor: "#C0392B", fontSize: "10px" }}>
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ backgroundColor: "rgba(26,26,26,0.98)", borderTop: "1px solid rgba(201,150,63,0.3)" }}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-medium uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        style={{
                          transform: openSubmenu === item.name ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.2s",
                          color: "#C9963F",
                        }}
                      />
                    </button>
                    {openSubmenu === item.name && (
                      <div className="pl-4 flex flex-col gap-1 pb-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            className="py-1.5 text-sm"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className="block py-2.5 text-sm font-medium uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: "rgba(201,150,63,0.3)" }}>
              <Link
                href="/cart"
                className="block w-full text-center py-3 rounded-lg text-sm font-semibold text-white uppercase tracking-wider"
                style={{ backgroundColor: "#276227" }}
                onClick={() => setMobileOpen(false)}
              >
                WhatsApp Sipariş
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
