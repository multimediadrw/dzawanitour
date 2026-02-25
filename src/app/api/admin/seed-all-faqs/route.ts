import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Hapus FAQ yang sudah ada (optional, untuk re-seed)
    await prisma.fAQ.deleteMany({});

    // Seed 8 FAQ dari website
    const faqs = [
      {
        question: "Apa perbedaan Open Trip dan Private Trip?",
        answer: "Open Trip adalah paket wisata bersama dengan peserta lain (grup gabungan) dengan harga lebih terjangkau dan jadwal keberangkatan yang sudah ditentukan. Private Trip adalah paket wisata eksklusif khusus untuk Anda dan rombongan sendiri, dengan jadwal dan itinerary yang dapat disesuaikan.",
        category: "Umum",
      },
      {
        question: "Bagaimana cara memesan paket tour di Dzawani Tour?",
        answer: "Anda dapat memesan melalui: (1) Halaman website ini dengan klik tombol 'Pesan Sekarang', (2) WhatsApp kami di 08112222254, atau (3) Datang langsung ke kantor kami. Tim kami siap membantu proses pemesanan Anda.",
        category: "Pemesanan",
      },
      {
        question: "Berapa lama sebelumnya saya harus memesan?",
        answer: "Untuk Open Trip domestik: minimal 7-14 hari sebelum keberangkatan. Open Trip internasional: minimal 1 bulan. Private Trip: minimal 2 minggu untuk domestik, 1-2 bulan untuk internasional. Pemesanan lebih awal sangat disarankan karena kuota terbatas.",
        category: "Pemesanan",
      },
      {
        question: "Apakah harga sudah termasuk tiket pesawat?",
        answer: "Untuk paket internasional, harga sudah termasuk tiket pesawat PP (pulang-pergi). Untuk paket domestik, tiket pesawat tidak termasuk kecuali disebutkan secara khusus. Detail inclusi tercantum di setiap paket.",
        category: "Harga",
      },
      {
        question: "Bagaimana sistem pembayaran?",
        answer: "Pembayaran dapat dilakukan melalui transfer bank (BCA, Mandiri, BNI, BRI) atau tunai di kantor kami. Untuk konfirmasi booking, diperlukan DP minimal 30% dari total harga. Pelunasan dilakukan paling lambat 14 hari sebelum keberangkatan.",
        category: "Pembayaran",
      },
      {
        question: "Apa kebijakan pembatalan dan refund?",
        answer: "Pembatalan lebih dari 30 hari sebelum keberangkatan: refund 80%. Pembatalan 15-30 hari sebelumnya: refund 50%. Pembatalan kurang dari 15 hari: refund 25%. Pembatalan karena force majeure (bencana alam, pandemi) akan dipertimbangkan secara khusus.",
        category: "Kebijakan",
      },
      {
        question: "Apakah tersedia paket untuk grup atau keluarga?",
        answer: "Tentu! Private Trip sangat cocok untuk grup keluarga atau perusahaan. Untuk Open Trip grup (minimal 10 orang), kami menyediakan harga khusus dan dapat mengatur jadwal keberangkatan tersendiri. Hubungi kami untuk penawaran terbaik.",
        category: "Paket",
      },
      {
        question: "Apakah ada asuransi perjalanan?",
        answer: "Ya, semua paket tour Dzawani Tour sudah dilengkapi dengan asuransi perjalanan dasar. Untuk perlindungan lebih komprehensif, kami menyarankan penambahan asuransi premium yang dapat didiskusikan saat pemesanan.",
        category: "Jaminan",
      },
    ];

    // Insert all FAQs
    for (const faq of faqs) {
      await prisma.fAQ.create({
        data: faq,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${faqs.length} FAQs`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed FAQs" },
      { status: 500 }
    );
  }
}
