"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    {
      icon: MapPin,
      title: language === "en" ? "Office Address" : "Alamat Kantor",
      content: "Jl. Leuwisari Raya No.IV, RW.6, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
      color: "text-magenta",
      bg: "bg-magenta-50",
    },
    {
      icon: Phone,
      title: language === "en" ? "Phone" : "Telepon",
      content: "08112222254",
      color: "text-ocean",
      bg: "bg-ocean-50",
    },
    {
      icon: Mail,
      title: "Email",
      content: "dzawani.marketing@gmail.com",
      color: "text-purple",
      bg: "bg-purple-50",
    },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            {language === "en" ? "Contact Us" : "Hubungi Kami"}
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Our team is ready to help you plan your dream trip"
              : "Tim kami siap membantu Anda merencanakan perjalanan impian"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-2">
                {language === "en" ? "Contact Information" : "Informasi Kontak"}
              </h2>
              <p className="text-gray-500 font-inter">
                {language === "en"
                  ? "Don't hesitate to contact us. We are ready to serve you."
                  : "Jangan ragu untuk menghubungi kami. Kami siap melayani Anda."}
              </p>
            </div>

            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 font-poppins">{item.title}</p>
                    <p className="text-gray-500 text-sm font-inter whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/628112222254"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg font-poppins"
            >
              <MessageCircle className="w-6 h-6" />
              <div>
                <p className="text-sm">{language === "en" ? "Chat Directly via" : "Chat Langsung via"}</p>
                <p className="text-lg">WhatsApp</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 font-poppins mb-2">
                    {language === "en" ? "Message Sent!" : "Pesan Terkirim!"}
                  </h3>
                  <p className="text-gray-500 font-inter">
                    {language === "en"
                      ? "Thank you for contacting us. Our team will respond within 1x24 hours."
                      : "Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1x24 jam."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-primary"
                  >
                    {language === "en" ? "Send Another Message" : "Kirim Pesan Lain"}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-6">
                    {language === "en" ? "Send a Message" : "Kirim Pesan"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                          {language === "en" ? "Full Name *" : "Nama Lengkap *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={language === "en" ? "Enter your full name" : "Masukkan nama lengkap"}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                          {language === "en" ? "Phone Number" : "Nomor Telepon"}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+62 8xx-xxxx-xxxx"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                          {language === "en" ? "Subject *" : "Subjek *"}
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean bg-white"
                        >
                          <option value="">{language === "en" ? "Select subject" : "Pilih subjek"}</option>
                          <option value="paket-tour">{language === "en" ? "Tour Package Information" : "Informasi Paket Tour"}</option>
                          <option value="custom">{language === "en" ? "Custom Tour" : "Custom Tour"}</option>
                          <option value="grup">{language === "en" ? "Group Package" : "Paket Grup"}</option>
                          <option value="lainnya">{language === "en" ? "Others" : "Lainnya"}</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                        {language === "en" ? "Message *" : "Pesan *"}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={language === "en"
                          ? "Tell us about your travel plans..."
                          : "Ceritakan rencana perjalanan Anda..."}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 inline-flex items-center justify-center gap-2 text-base"
                    >
                      <Send className="w-5 h-5" />
                      {language === "en" ? "Send Message" : "Kirim Pesan"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
