"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { faqs } from "@/lib/data";
import { ChevronDown, ChevronUp, HelpCircle, FileText, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"faq" | "syarat">("faq");
  const { language } = useLanguage();

  const categories = language === "en"
    ? ["All", "General", "Booking", "Price", "Payment", "Policy", "Package", "Guarantee"]
    : ["Semua", "Umum", "Pemesanan", "Harga", "Pembayaran", "Kebijakan", "Paket", "Jaminan"];

  const categoryMap: Record<string, string> = {
    "All": "Semua", "General": "Umum", "Booking": "Pemesanan", "Price": "Harga",
    "Payment": "Pembayaran", "Policy": "Kebijakan", "Package": "Paket", "Guarantee": "Jaminan",
    "Semua": "Semua", "Umum": "Umum", "Pemesanan": "Pemesanan", "Harga": "Harga",
    "Pembayaran": "Pembayaran", "Kebijakan": "Kebijakan", "Paket": "Paket", "Jaminan": "Jaminan",
  };

  const activeCategoryId = activeCategory === "all" || activeCategory === "All" || activeCategory === "Semua"
    ? "all"
    : categoryMap[activeCategory] || activeCategory;

  const filteredFaqs = activeCategoryId === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategoryId);

  const syaratKetentuan = language === "en" ? [
    {
      title: "1. General Terms",
      content: [
        "By booking a tour package through Dzawani Tour, you are deemed to have read, understood, and agreed to all applicable terms and conditions.",
        "Dzawani Tour reserves the right to change these terms and conditions at any time without prior notice.",
        "Changes in prices, schedules, or itineraries may occur due to conditions beyond our control such as natural disasters, government policies, or force majeure.",
      ],
    },
    {
      title: "2. Booking and Confirmation",
      content: [
        "A booking is considered valid after a Down Payment (DP) of at least 30% of the total price has been received and confirmed by the Dzawani Tour team.",
        "Booking confirmation will be sent via WhatsApp or email within 1x24 hours after the DP payment is received.",
        "Participants must submit required documents (ID card, passport, etc.) no later than 14 days before departure.",
        "For international packages, the passport must be valid for at least 6 months from the departure date.",
      ],
    },
    {
      title: "3. Payment",
      content: [
        "Payment can be made via bank transfer to the official Dzawani Tour account or in cash at our office.",
        "A minimum DP of 30% must be paid upon booking confirmation.",
        "Full payment of 100% must be completed no later than 14 days before the departure date.",
        "Late payment may result in cancellation of the booking without refund of the DP.",
        "Proof of payment must be sent to the official Dzawani Tour WhatsApp number.",
      ],
    },
    {
      title: "4. Cancellation and Refund",
      content: [
        "Cancellation more than 30 days before departure: 80% refund of total payment.",
        "Cancellation 15–30 days before departure: 50% refund of total payment.",
        "Cancellation less than 15 days before departure: 25% refund of total payment.",
        "Cancellation on the day of departure or no-show: no refund.",
        "Cancellations due to force majeure (natural disasters, pandemic, government policy) will be considered on a case-by-case basis.",
        "Refund process is completed within 7–14 working days after the application is received.",
      ],
    },
    {
      title: "5. Schedule Changes",
      content: [
        "Participants may request a change of departure schedule no later than 21 days before the original departure date.",
        "Schedule changes are subject to an administrative fee of IDR 150,000 per person.",
        "Schedule changes depend on quota availability on the desired schedule.",
        "Dzawani Tour reserves the right to change the departure schedule with a minimum of 7 days' notice in case of an emergency.",
      ],
    },
    {
      title: "6. Participant Responsibilities",
      content: [
        "Participants are responsible for the completeness of travel documents (passport, visa, ID card, etc.).",
        "Participants must comply with the rules and laws applicable at the tourist destinations visited.",
        "Participants are responsible for their personal belongings during the trip.",
        "Participants must maintain order and not disturb other participants (for Open Trip).",
        "Dzawani Tour is not responsible for the loss of participants' personal belongings.",
      ],
    },
    {
      title: "7. Travel Insurance",
      content: [
        "All Dzawani Tour packages come with basic travel insurance.",
        "Insurance covers accidents, emergency illness, and flight delays.",
        "For more comprehensive protection, participants are advised to add premium insurance.",
        "Insurance claims must be reported within 24 hours of the incident with complete evidence.",
      ],
    },
    {
      title: "8. Data Privacy",
      content: [
        "Participants' personal data (name, phone number, email, passport number) is only used for travel purposes.",
        "Dzawani Tour is committed to maintaining the confidentiality of participants' personal data.",
        "Data will not be shared with third parties except for visa processing, ticketing, and accommodation purposes.",
        "Participants may request data deletion by contacting us in writing.",
      ],
    },
  ] : [
    {
      title: "1. Ketentuan Umum",
      content: [
        "Dengan memesan paket tour melalui Dzawani Tour, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.",
        "Dzawani Tour berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.",
        "Perubahan harga, jadwal, atau itinerary dapat terjadi akibat kondisi di luar kendali kami seperti bencana alam, kebijakan pemerintah, atau force majeure.",
      ],
    },
    {
      title: "2. Pemesanan dan Konfirmasi",
      content: [
        "Pemesanan dianggap sah setelah pembayaran DP (Down Payment) minimal 30% dari total harga diterima dan dikonfirmasi oleh tim Dzawani Tour.",
        "Konfirmasi pemesanan akan dikirimkan melalui WhatsApp atau email dalam 1x24 jam setelah pembayaran DP diterima.",
        "Peserta wajib menyerahkan dokumen yang diperlukan (KTP, paspor, dll) paling lambat 14 hari sebelum keberangkatan.",
        "Untuk paket internasional, paspor harus masih berlaku minimal 6 bulan dari tanggal keberangkatan.",
      ],
    },
    {
      title: "3. Pembayaran",
      content: [
        "Pembayaran dapat dilakukan melalui transfer bank ke rekening resmi Dzawani Tour atau tunai di kantor kami.",
        "DP minimal 30% wajib dibayarkan saat konfirmasi booking.",
        "Pelunasan 100% wajib diselesaikan paling lambat 14 hari sebelum tanggal keberangkatan.",
        "Keterlambatan pelunasan dapat mengakibatkan pembatalan pemesanan tanpa pengembalian DP.",
        "Bukti pembayaran wajib dikirimkan ke nomor WhatsApp resmi Dzawani Tour.",
      ],
    },
    {
      title: "4. Pembatalan dan Refund",
      content: [
        "Pembatalan lebih dari 30 hari sebelum keberangkatan: pengembalian dana sebesar 80% dari total pembayaran.",
        "Pembatalan 15–30 hari sebelum keberangkatan: pengembalian dana sebesar 50% dari total pembayaran.",
        "Pembatalan kurang dari 15 hari sebelum keberangkatan: pengembalian dana sebesar 25% dari total pembayaran.",
        "Pembatalan pada hari keberangkatan atau no-show: tidak ada pengembalian dana.",
        "Pembatalan akibat force majeure (bencana alam, pandemi, kebijakan pemerintah) akan dipertimbangkan secara khusus.",
        "Proses refund dilakukan dalam 7–14 hari kerja setelah pengajuan diterima.",
      ],
    },
    {
      title: "5. Perubahan Jadwal",
      content: [
        "Peserta dapat mengajukan perubahan jadwal keberangkatan paling lambat 21 hari sebelum tanggal awal keberangkatan.",
        "Perubahan jadwal dikenakan biaya administrasi sebesar Rp 150.000 per orang.",
        "Perubahan jadwal tergantung ketersediaan kuota pada jadwal yang diinginkan.",
        "Dzawani Tour berhak mengubah jadwal keberangkatan dengan pemberitahuan minimal 7 hari sebelumnya jika terjadi kondisi darurat.",
      ],
    },
    {
      title: "6. Tanggung Jawab Peserta",
      content: [
        "Peserta bertanggung jawab atas kelengkapan dokumen perjalanan (paspor, visa, KTP, dll).",
        "Peserta wajib mematuhi aturan dan hukum yang berlaku di destinasi wisata yang dikunjungi.",
        "Peserta bertanggung jawab atas barang bawaan pribadi selama perjalanan.",
        "Peserta wajib menjaga ketertiban dan tidak mengganggu peserta lain (untuk Open Trip).",
        "Dzawani Tour tidak bertanggung jawab atas kehilangan barang bawaan pribadi peserta.",
      ],
    },
    {
      title: "7. Asuransi Perjalanan",
      content: [
        "Semua paket tour Dzawani Tour sudah dilengkapi dengan asuransi perjalanan dasar.",
        "Asuransi mencakup kecelakaan, sakit darurat, dan keterlambatan penerbangan.",
        "Untuk perlindungan lebih komprehensif, peserta disarankan menambah asuransi premium.",
        "Klaim asuransi harus dilaporkan dalam 24 jam setelah kejadian dengan bukti yang lengkap.",
      ],
    },
    {
      title: "8. Privasi Data",
      content: [
        "Data pribadi peserta (nama, nomor telepon, email, nomor paspor) hanya digunakan untuk keperluan perjalanan.",
        "Dzawani Tour berkomitmen untuk menjaga kerahasiaan data pribadi peserta.",
        "Data tidak akan dibagikan kepada pihak ketiga kecuali untuk keperluan pemrosesan visa, tiket, dan akomodasi.",
        "Peserta dapat meminta penghapusan data dengan menghubungi kami secara tertulis.",
      ],
    },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            {language === "en" ? "FAQ & Terms and Conditions" : "FAQ & Syarat Ketentuan"}
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Find answers to your questions and learn the travel terms with Dzawani Tour"
              : "Temukan jawaban atas pertanyaan Anda dan pelajari ketentuan perjalanan bersama Dzawani Tour"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">

        {/* Section Toggle */}
        <div className="flex gap-3 mb-10 bg-gray-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveSection("faq")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold font-poppins text-sm transition-all duration-300 ${
              activeSection === "faq"
                ? "bg-white text-magenta shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            {language === "en" ? "Frequently Asked Questions (FAQ)" : "Pertanyaan Umum (FAQ)"}
          </button>
          <button
            onClick={() => setActiveSection("syarat")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold font-poppins text-sm transition-all duration-300 ${
              activeSection === "syarat"
                ? "bg-white text-magenta shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText className="w-4 h-4" />
            {language === "en" ? "Terms & Conditions" : "Syarat & Ketentuan"}
          </button>
        </div>

        {/* FAQ Section */}
        {activeSection === "faq" && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-inter ${
                    activeCategory === cat
                      ? "bg-magenta text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-magenta hover:text-magenta"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-6 h-6 bg-magenta-50 text-magenta rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-semibold text-gray-800 font-poppins text-sm pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-400 font-inter bg-gray-100 px-2 py-1 rounded-full hidden sm:block">
                        {faq.category}
                      </span>
                      {openFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-magenta" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-5">
                      <div className="pl-9">
                        <p className="text-gray-600 font-inter text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-10 bg-ocean-50 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-gray-800 font-poppins mb-2">
                {language === "en" ? "Still have questions?" : "Masih ada pertanyaan?"}
              </h3>
              <p className="text-gray-600 font-inter text-sm mb-4">
                {language === "en"
                  ? "Our team is ready to help you via WhatsApp every day."
                  : "Tim kami siap membantu Anda melalui WhatsApp setiap hari."}
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all font-poppins text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {language === "en" ? "Chat WhatsApp Now" : "Chat WhatsApp Sekarang"}
              </a>
            </div>
          </div>
        )}

        {/* Syarat & Ketentuan Section */}
        {activeSection === "syarat" && (
          <div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
              <FileText className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 font-poppins text-sm">
                  {language === "en" ? "Please Read Carefully" : "Harap Dibaca dengan Seksama"}
                </p>
                <p className="text-gray-600 font-inter text-sm mt-0.5">
                  {language === "en"
                    ? "By booking a tour package at Dzawani Tour, you are deemed to have read and agreed to all the following terms and conditions. Last updated: January 2025."
                    : "Dengan melakukan pemesanan paket tour di Dzawani Tour, Anda dianggap telah membaca dan menyetujui seluruh syarat dan ketentuan berikut. Terakhir diperbarui: Januari 2025."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {syaratKetentuan.map((section, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === `sk-${index}` ? null : `sk-${index}`)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-800 font-poppins text-sm">
                      {section.title}
                    </span>
                    {openFaq === `sk-${index}` ? (
                      <ChevronUp className="w-5 h-5 text-magenta flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === `sk-${index}` && (
                    <div className="px-6 pb-5">
                      <ul className="space-y-2">
                        {section.content.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-gray-600 font-inter text-sm leading-relaxed">
                            <span className="w-5 h-5 bg-magenta-50 text-magenta rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold font-poppins">
                              {i + 1}
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
              <p className="text-gray-600 font-inter text-sm">
                {language === "en"
                  ? "For further questions regarding terms and conditions, please contact us at "
                  : "Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan, silakan hubungi kami di "}
                <a href="mailto:info@dzawanitour.com" className="text-magenta font-semibold hover:underline">
                  info@dzawanitour.com
                </a>
                {language === "en" ? " or WhatsApp " : " atau WhatsApp "}
                <a href="https://wa.me/6281234567890" className="text-magenta font-semibold hover:underline">
                  +62 812-3456-7890
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
