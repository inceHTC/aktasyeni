"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { db, auth, storage } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  LogOut, Plus, Pencil, Trash2, Search, Package, Tag, Star, TrendingUp,
  X, Upload, Check, AlertTriangle, Eye, EyeOff, ChevronDown,
} from "lucide-react";

const CATEGORIES = [
  { value: "peynir", label: "Peynir" },
  { value: "zeytin", label: "Zeytin" },
  { value: "zeytinyagi", label: "Zeytinyağı" },
  { value: "tereyagi", label: "Tereyağı" },
  { value: "sarkuteri", label: "Şarküteri" },
  { value: "bal", label: "Bal & Reçel" },
  { value: "kuru-gida", label: "Kuru Gıda" },
];

const EMPTY_FORM = {
  name: "", description: "", price: "", newPrice: "",
  weight: "", unit: "kg", category: "", inStock: true,
  featured: false, isCampaign: false, image: null,
};

/* ─── Input bileşeni ─── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: "#C0392B" }}>{error}</p>}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="px-3 py-2.5 rounded-xl text-sm outline-none w-full"
      style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8", color: "#1A1A1A" }}
    />
  );
}

/* ─── Toggle bileşeni ─── */
function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        className="relative w-10 h-5 rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? "#2B4A1F" : "#D1D5DB" }}
        onClick={() => onChange(!checked)}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </div>
      <span className="text-sm" style={{ color: "#374151" }}>{label}</span>
    </label>
  );
}

/* ─── Modal ─── */
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full"
        style={{ maxWidth: 640, border: "1px solid #E5E0D5" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ANA COMPONENT
══════════════════════════════════════════════ */
export default function AdminPage() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileRef = useRef(null);

  /* Auth listener */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return unsub;
  }, []);

  /* Ürünleri yükle */
  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  /* Giriş */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError("E-posta veya şifre hatalı.");
    }
    setLoginLoading(false);
  };

  /* Form helpers */
  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreview("");
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p, image: p.image });
    setPreview(p.image || "");
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingId(null); };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.weight || !form.category) {
      setFormError("Ad, fiyat, ağırlık ve kategori zorunludur.");
      return;
    }
    setFormLoading(true);
    setFormError("");
    try {
      let imageUrl = typeof form.image === "string" ? form.image : "";
      if (form.image instanceof File) {
        const storageRef = ref(storage, `products/${Date.now()}_${form.image.name}`);
        await uploadBytes(storageRef, form.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const data = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        newPrice: form.newPrice ? Number(form.newPrice) : 0,
        weight: Number(form.weight),
        unit: form.unit,
        category: form.category,
        inStock: Boolean(form.inStock),
        featured: Boolean(form.featured),
        isCampaign: Boolean(form.isCampaign),
        image: imageUrl,
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), data);
        setSuccessMsg("Ürün güncellendi.");
      } else {
        await addDoc(collection(db, "products"), data);
        setSuccessMsg("Ürün eklendi.");
      }

      closeModal();
      await fetchProducts();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setFormError("Hata oluştu: " + err.message);
    }
    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    setSuccessMsg("Ürün silindi.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  /* Filtered products */
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
    const matchCat = !filterCat || p.category === filterCat;
    return matchSearch && matchCat;
  });

  /* Stats */
  const stats = [
    { label: "Toplam Ürün", value: products.length, icon: <Package size={20} />, color: "#2B4A1F" },
    { label: "Stokta", value: products.filter((p) => p.inStock).length, icon: <Check size={20} />, color: "#276227" },
    { label: "Kampanyalı", value: products.filter((p) => p.isCampaign).length, icon: <Tag size={20} />, color: "#C0392B" },
    { label: "Öne Çıkan", value: products.filter((p) => p.featured).length, icon: <Star size={20} />, color: "#C9963F" },
  ];

  /* ── Loading ── */
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#C9963F", borderTopColor: "transparent" }} />
      </div>
    );
  }

  /* ── Login ── */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(201,150,63,0.15)", border: "1px solid rgba(201,150,63,0.3)" }}>
              <Package size={28} style={{ color: "#C9963F" }} />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Paneli
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Aktaş Peynircilik</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>E-posta</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>Şifre</label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#9CA3AF" }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {loginError && (
              <p className="text-xs flex items-center gap-1.5" style={{ color: "#C0392B" }}>
                <AlertTriangle size={13} /> {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 mt-1"
              style={{ backgroundColor: loginLoading ? "#9CA3AF" : "#2B4A1F" }}
            >
              {loginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Admin Panel ── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F2EB" }}>

      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: "#1A1A1A", borderBottom: "2px solid #C9963F" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(201,150,63,0.15)" }}>
            <Package size={16} style={{ color: "#C9963F" }} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Admin Paneli</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Aktaş Peynircilik</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.45)" }}>{user.email}</p>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(192,57,43,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)")}
          >
            <LogOut size={14} /> Çıkış
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Success toast */}
        {successMsg && (
          <div
            className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white"
            style={{ backgroundColor: "#276227" }}
          >
            <Check size={15} /> {successMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: "1px solid #E5E0D5" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15", color }}>
                {icon}
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>{value}</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "1px solid #E5E0D5", backgroundColor: "#fff" }}
            />
          </div>
          <div className="relative">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="pl-3 pr-8 py-2.5 rounded-xl text-sm outline-none appearance-none"
              style={{ border: "1px solid #E5E0D5", backgroundColor: "#fff", color: "#1A1A1A", minWidth: 160 }}
            >
              <option value="">Tüm Kategoriler</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 whitespace-nowrap"
            style={{ backgroundColor: "#2B4A1F" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3a14")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B4A1F")}
          >
            <Plus size={16} /> Ürün Ekle
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E5E0D5" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#E5E0D5" }}>
            <h2 className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>
              Ürün Listesi
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F5F2EB", color: "#6B7280" }}>
              {filtered.length} ürün
            </span>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y" style={{ borderColor: "#F5F2EB" }}>
            {filtered.length === 0 && (
              <p className="text-sm text-center py-10" style={{ color: "#9CA3AF" }}>Ürün bulunamadı.</p>
            )}
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ backgroundColor: "#F5F2EB" }}>
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#1A1A1A" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{p.category} · ₺{p.price}</p>
                  <div className="flex gap-1.5 mt-1">
                    {p.inStock
                      ? <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ backgroundColor: "#F0FDF4", color: "#276227" }}>Stokta</span>
                      : <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}>Tükendi</span>
                    }
                    {p.isCampaign && <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}>Kampanya</span>}
                    {p.featured && <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ backgroundColor: "#FFF7ED", color: "#C9963F" }}>Öne Çıkan</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-lg transition-colors" style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteConfirm(p)} className="p-2 rounded-lg transition-colors" style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#FAFAF8", borderBottom: "1px solid #E5E0D5" }}>
                  {["Görsel", "Ürün Adı", "Kategori", "Fiyat", "Ağırlık", "Durum", "İşlem"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#F5F2EB" }}>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: "#9CA3AF" }}>Ürün bulunamadı.</td></tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden" style={{ backgroundColor: "#F5F2EB" }}>
                        {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[180px] truncate" style={{ color: "#1A1A1A" }}>{p.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium capitalize" style={{ backgroundColor: "#F5F2EB", color: "#6B7280" }}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#276227" }}>
                      ₺{p.price}
                      {p.isCampaign && p.newPrice > 0 && (
                        <span className="ml-1.5 text-xs line-through" style={{ color: "#9CA3AF" }}>→₺{p.newPrice}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#6B7280" }}>{p.weight} {p.unit}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {p.inStock
                          ? <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F0FDF4", color: "#276227" }}>Stokta</span>
                          : <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}>Tükendi</span>
                        }
                        {p.isCampaign && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}>K</span>}
                        {p.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C9963F" }}>★</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 rounded-lg transition-all"
                          style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDE8DE")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F5F2EB")}
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p)}
                          className="p-2 rounded-lg transition-all"
                          style={{ backgroundColor: "#FEF2F2", color: "#C0392B" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── Add/Edit Modal ── */}
      <Modal open={modalOpen} onClose={closeModal}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#E5E0D5" }}>
          <h3 className="font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>
            {editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h3>
          <button onClick={closeModal} className="p-1.5 rounded-lg" style={{ color: "#9CA3AF" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Ürün Adı *">
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ezine Beyaz Peynir" required />
              </Field>
            </div>
            <Field label="Kategori *">
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none appearance-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8", color: "#1A1A1A" }}
                  required
                >
                  <option value="">Seçiniz</option>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
              </div>
            </Field>
            <Field label="Normal Fiyat (₺) *">
              <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="250" required />
            </Field>
            <Field label="İndirimli Fiyat (₺)">
              <Input type="number" min="0" value={form.newPrice} onChange={(e) => setForm({ ...form, newPrice: e.target.value })} placeholder="200" />
            </Field>
            <Field label="Ağırlık *">
              <Input type="number" min="0" step="0.001" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="1" required />
            </Field>
            <Field label="Birim">
              <div className="relative">
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none appearance-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8", color: "#1A1A1A" }}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lt">lt</option>
                  <option value="adet">adet</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
              </div>
            </Field>
            <div className="col-span-2">
              <Field label="Açıklama">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Ürün hakkında kısa açıklama..."
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid #E5E0D5", backgroundColor: "#FAFAF8", color: "#1A1A1A" }}
                />
              </Field>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-5 py-1">
            <Toggle checked={form.inStock} onChange={(v) => setForm({ ...form, inStock: v })} label="Stokta" />
            <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Öne Çıkan" />
            <Toggle checked={form.isCampaign} onChange={(v) => setForm({ ...form, isCampaign: v })} label="Kampanyalı" />
          </div>

          {/* Image upload */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "#6B7280" }}>Görsel</label>
            <div
              className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors"
              style={{ borderColor: "#E5E0D5" }}
              onClick={() => fileRef.current?.click()}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9963F")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E0D5")}
            >
              {preview ? (
                <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: 200 }}>
                  <img src={preview} alt="Önizleme" className="w-full h-full object-contain rounded-lg" />
                </div>
              ) : (
                <>
                  <Upload size={24} style={{ color: "#C9963F" }} />
                  <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                    Görsel seçmek için tıklayın<br />
                    <span style={{ color: "#C9963F" }}>JPG, PNG, WEBP</span>
                  </p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {preview && (
              <button
                type="button"
                onClick={() => { setPreview(""); setForm((f) => ({ ...f, image: null })); if (fileRef.current) fileRef.current.value = ""; }}
                className="mt-1.5 text-xs underline"
                style={{ color: "#C0392B" }}
              >
                Görseli kaldır
              </button>
            )}
          </div>

          {formError && (
            <p className="text-xs flex items-center gap-1.5" style={{ color: "#C0392B" }}>
              <AlertTriangle size={13} /> {formError}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#F5F2EB", color: "#6B7280" }}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: formLoading ? "#9CA3AF" : "#2B4A1F" }}
            >
              {formLoading ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Delete Confirm ── */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#FEF2F2" }}>
            <Trash2 size={24} style={{ color: "#C0392B" }} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>
              Ürünü sil?
            </h3>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#1A1A1A" }}>{deleteConfirm?.name}</strong> kalıcı olarak silinecek.
              Bu işlem geri alınamaz.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#F5F2EB", color: "#6B7280" }}
            >
              Vazgeç
            </button>
            <button
              onClick={() => handleDelete(deleteConfirm.id)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#C0392B" }}
            >
              Evet, Sil
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
