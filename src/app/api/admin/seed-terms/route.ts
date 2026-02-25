import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Hapus terms yang sudah ada (optional, untuk re-seed)
    await prisma.termsCondition.deleteMany({});

    // Seed 8 Syarat & Ketentuan dari website (Indonesian version)
    const terms = [
      {
        title: "1. Ketentuan Umum",
        content: [
          "Dengan memesan paket tour melalui Dzawani Tour, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.",
          "Dzawani Tour berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.",
          "Perubahan harga, jadwal, atau itinerary dapat terjadi akibat kondisi di luar kendali kami seperti bencana alam, kebijakan pemerintah, atau force majeure.",
        ],
        titleEn: "1. General Terms",
        contentEn: [
          "By booking a tour package through Dzawani Tour, you are deemed to have read, understood, and agreed to all applicable terms and conditions.",
          "Dzawani Tour reserves the right to change these terms and conditions at any time without prior notice.",
          "Changes in prices, schedules, or itineraries may occur due to conditions beyond our control such as natural disasters, government policies, or force majeure.",
        ],
        order: 1,
      },
      {
        title: "2. Pemesanan dan Konfirmasi",
        content: [
          "Pemesanan dianggap sah setelah pembayaran DP (Down Payment) minimal 30% dari total harga diterima dan dikonfirmasi oleh tim Dzawani Tour.",
          "Konfirmasi pemesanan akan dikirimkan melalui WhatsApp atau email dalam 1x24 jam setelah pembayaran DP diterima.",
          "Peserta wajib menyerahkan dokumen yang diperlukan (KTP, paspor, dll) paling lambat 14 hari sebelum keberangkatan.",
          "Untuk paket internasional, paspor harus masih berlaku minimal 6 bulan dari tanggal keberangkatan.",
        ],
        titleEn: "2. Booking and Confirmation",
        contentEn: [
          "A booking is considered valid after a Down Payment (DP) of at least 30% of the total price has been received and confirmed by the Dzawani Tour team.",
          "Booking confirmation will be sent via WhatsApp or email within 1x24 hours after the DP payment is received.",
          "Participants must submit required documents (ID card, passport, etc.) no later than 14 days before departure.",
          "For international packages, the passport must be valid for at least 6 months from the departure date.",
        ],
        order: 2,
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
        titleEn: "3. Payment",
        contentEn: [
          "Payment can be made via bank transfer to the official Dzawani Tour account or in cash at our office.",
          "A minimum DP of 30% must be paid upon booking confirmation.",
          "Full payment of 100% must be completed no later than 14 days before the departure date.",
          "Late payment may result in cancellation of the booking without refund of the DP.",
          "Proof of payment must be sent to the official Dzawani Tour WhatsApp number.",
        ],
        order: 3,
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
        titleEn: "4. Cancellation and Refund",
        contentEn: [
          "Cancellation more than 30 days before departure: 80% refund of total payment.",
          "Cancellation 15–30 days before departure: 50% refund of total payment.",
          "Cancellation less than 15 days before departure: 25% refund of total payment.",
          "Cancellation on the day of departure or no-show: no refund.",
          "Cancellations due to force majeure (natural disasters, pandemic, government policy) will be considered on a case-by-case basis.",
          "Refund process is completed within 7–14 working days after the application is received.",
        ],
        order: 4,
      },
      {
        title: "5. Perubahan Jadwal",
        content: [
          "Peserta dapat mengajukan perubahan jadwal keberangkatan paling lambat 21 hari sebelum tanggal awal keberangkatan.",
          "Perubahan jadwal dikenakan biaya administrasi sebesar Rp 150.000 per orang.",
          "Perubahan jadwal tergantung ketersediaan kuota pada jadwal yang diinginkan.",
          "Dzawani Tour berhak mengubah jadwal keberangkatan dengan pemberitahuan minimal 7 hari sebelumnya jika terjadi kondisi darurat.",
        ],
        titleEn: "5. Schedule Changes",
        contentEn: [
          "Participants may request a change of departure schedule no later than 21 days before the original departure date.",
          "Schedule changes are subject to an administrative fee of IDR 150,000 per person.",
          "Schedule changes depend on quota availability on the desired schedule.",
          "Dzawani Tour reserves the right to change the departure schedule with a minimum of 7 days' notice in case of an emergency.",
        ],
        order: 5,
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
        titleEn: "6. Participant Responsibilities",
        contentEn: [
          "Participants are responsible for the completeness of travel documents (passport, visa, ID card, etc.).",
          "Participants must comply with the rules and laws applicable at the tourist destinations visited.",
          "Participants are responsible for their personal belongings during the trip.",
          "Participants must maintain order and not disturb other participants (for Open Trip).",
          "Dzawani Tour is not responsible for the loss of participants' personal belongings.",
        ],
        order: 6,
      },
      {
        title: "7. Asuransi Perjalanan",
        content: [
          "Semua paket tour Dzawani Tour sudah dilengkapi dengan asuransi perjalanan dasar.",
          "Asuransi mencakup kecelakaan, sakit darurat, dan keterlambatan penerbangan.",
          "Untuk perlindungan lebih komprehensif, peserta disarankan menambah asuransi premium.",
          "Klaim asuransi harus dilaporkan dalam 24 jam setelah kejadian dengan bukti yang lengkap.",
        ],
        titleEn: "7. Travel Insurance",
        contentEn: [
          "All Dzawani Tour packages come with basic travel insurance.",
          "Insurance covers accidents, emergency illness, and flight delays.",
          "For more comprehensive protection, participants are advised to add premium insurance.",
          "Insurance claims must be reported within 24 hours of the incident with complete evidence.",
        ],
        order: 7,
      },
      {
        title: "8. Privasi Data",
        content: [
          "Data pribadi peserta (nama, nomor telepon, email, nomor paspor) hanya digunakan untuk keperluan perjalanan.",
          "Dzawani Tour berkomitmen untuk menjaga kerahasiaan data pribadi peserta.",
          "Data tidak akan dibagikan kepada pihak ketiga kecuali untuk keperluan pemrosesan visa, tiket, dan akomodasi.",
          "Peserta dapat meminta penghapusan data dengan menghubungi kami secara tertulis.",
        ],
        titleEn: "8. Data Privacy",
        contentEn: [
          "Participants' personal data (name, phone number, email, passport number) is only used for travel purposes.",
          "Dzawani Tour is committed to maintaining the confidentiality of participants' personal data.",
          "Data will not be shared with third parties except for visa processing, ticketing, and accommodation purposes.",
          "Participants may request data deletion by contacting us in writing.",
        ],
        order: 8,
      },
    ];

    // Insert all terms
    for (const term of terms) {
      await prisma.termsCondition.create({
        data: term,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${terms.length} Terms & Conditions`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed Terms & Conditions" },
      { status: 500 }
    );
  }
}
