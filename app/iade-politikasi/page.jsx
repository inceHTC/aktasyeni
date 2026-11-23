import Link from "next/link";
import { ArrowLeft, ShieldCheck, RefreshCw, XCircle, Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "İade ve İptal Politikası | Aktaş Peynircilik",
  description:
    "Aktaş Peynircilik iade, değişim ve sipariş iptali koşulları. Kargo kaynaklı hasar, bozulma veya yanlış ürün gönderiminde iade ve değişim süreci hakkında bilgi alın.",
  alternates: {
    canonical: "https://www.aktaspeynirbiga.com.tr/iade-politikasi",
  },
};

const sections = [
  {
    title: "1. Genel Bilgi",
    body: [
      "Aktaş Peynircilik olarak müşteri memnuniyetini ön planda tutuyoruz. Bu sayfa, www.aktaspeynirbiga.com.tr üzerinden verilen siparişlere ilişkin iade, değişim ve iptal koşullarını açıklar.",
      "Satışa sunduğumuz ürünlerin büyük bölümü peynir, tereyağı, zeytin, şarküteri gibi gıda ürünleridir. 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca; çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler ile ambalajı açılmış gıda ürünlerinde cayma hakkı kullanılamaz.",
    ],
  },
  {
    title: "2. İade ve Değişim Koşulları",
    body: [
      "İade ve değişim yalnızca aşağıdaki durumlarda kabul edilir:",
    ],
    list: [
      "Kargo kaynaklı hasar: Ürünün kargo sırasında hasar görmüş, ezilmiş veya ambalajı zarar görmüş olarak teslim edilmesi",
      "Bozulma: Ürünün bozulmuş veya tüketime uygun olmayan şekilde teslim edilmesi",
      "Yanlış ürün gönderimi: Sipariş edilenden farklı bir ürünün gönderilmesi",
    ],
    after: [
      "Bu durumlarda ürünü teslim aldığınız tarihten itibaren en geç 3 gün içinde, ürünün ve ambalajın fotoğraflarıyla birlikte bizimle iletişime geçmeniz gerekmektedir. Kargo teslimatı sırasında hasarlı paketler için kargo görevlisine hasar tespit tutanağı tutturmanızı öneririz.",
      "Bu durumlardaki iadelerde kargo ücreti Aktaş Peynircilik tarafından karşılanır. Bunların dışında kalan hiçbir durumda iade veya değişim yapılmaz.",
    ],
  },
  {
    title: "3. Değişim",
    body: [
      "Kargo kaynaklı hasarlı, bozulmuş veya yanlış gönderilen ürünler için talebinize göre ürün değişimi yapılır. Değişim ürünü, iade edilen ürünün tarafımıza ulaşması veya durumun fotoğraflarla tespit edilmesinin ardından en kısa sürede kargoya verilir. Değişim sürecindeki kargo ücretleri tarafımızca karşılanır.",
    ],
  },
  {
    title: "4. İade Edilemeyen Ürünler",
    list: [
      "Sağlam ve doğru olarak teslim edilmiş ürünler (fikir değişikliği, beğenmeme vb. nedenlerle)",
      "Ambalajı açılmış veya tüketilmeye başlanmış gıda ürünleri",
      "Teslimattan sonra müşterinin hatalı saklama koşullarından kaynaklanan bozulmalar",
      "Teslimden itibaren 3 gün içinde bildirilmeyen hasar, bozulma veya yanlış ürün durumları",
    ],
  },
  {
    title: "5. Sipariş İptali",
    body: [
      "Henüz kargoya verilmemiş siparişlerinizi, WhatsApp hattımız (0537 483 54 69) üzerinden bize sipariş bilgilerinizle birlikte yazarak ücretsiz olarak iptal edebilirsiniz. Kargoya verilmiş siparişler, gıda ürünlerinin niteliği gereği iptal edilemez; ancak ürün kargo kaynaklı hasarlı, bozulmuş veya yanlış ulaşırsa yukarıdaki iade koşulları geçerlidir.",
    ],
  },
  {
    title: "6. Para İadesi",
    body: [
      "Onaylanan iade ve iptal taleplerinde ücret, onay tarihinden itibaren en geç 3 iş günü içinde müşteriye havale / EFT yoluyla iade edilir.",
    ],
  },
];

export default function IadePolitikasiPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="text-white text-center py-20 px-4"
        style={{ background: "linear-gradient(135deg, #2B4A1F 0%, #1A1A1A 100%)" }}
      >
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          İade ve İptal Politikası
        </h1>
        <p className="text-white/70">İade, değişim ve sipariş iptali koşulları</p>
      </section>

      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#C9963F] transition-colors"
        >
          <ArrowLeft size={14} /> Ana Sayfaya Dön
        </Link>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: <ShieldCheck size={24} />, title: "İade Koşulu", desc: "Kargo hasarı, bozulma, yanlış ürün" },
              { icon: <RefreshCw size={24} />, title: "Değişim", desc: "Kargo ücreti bizden" },
              { icon: <XCircle size={24} />, title: "İptal", desc: "Kargolanmadan önce, WhatsApp ile" },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 flex gap-4 items-start"
                style={{ border: "1px solid #E5E0D5" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F5F2EB", color: "#C9963F" }}
                >
                  {icon}
                </div>
                <div>
                  <h2 className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {title}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-8" style={{ border: "1px solid #E5E0D5" }}>
            {sections.map(({ title, body, list, after }) => (
              <div key={title}>
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                >
                  {title}
                </h2>
                <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                  {body?.map((p) => <p key={p}>{p}</p>)}
                  {list && (
                    <ul className="list-disc pl-5 flex flex-col gap-1.5">
                      {list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {after?.map((p) => <p key={p}>{p}</p>)}
                </div>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h2
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
              >
                7. İade ve İptal Talepleri İçin İletişim
              </h2>
              <div className="flex flex-col gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                <span className="flex items-center gap-2">
                  <FaWhatsapp size={14} style={{ color: "#25D366" }} />
                  <a
                    href="https://wa.me/905374835469"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9963F]"
                  >
                    WhatsApp: 0537 483 54 69
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={14} style={{ color: "#C9963F" }} />
                  <a href="tel:02863169917" className="hover:text-[#C9963F]">0286 316 99 17</a>
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={14} style={{ color: "#C9963F" }} />
                  <a href="mailto:info@aktaspeynirbiga.com.tr" className="hover:text-[#C9963F]">
                    info@aktaspeynirbiga.com.tr
                  </a>
                </span>
                <span className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#C9963F" }} />
                  Sakarya, Cengiz Topel Cd. No:45, 17200 Biga / Çanakkale
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "#9CA3AF" }}>
            Son güncelleme: Kasım 2026
          </p>
        </div>
      </section>
    </div>
  );
}
