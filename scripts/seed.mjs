import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.tourPackage.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data');

  // Seed Admin User
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.default.hash('dzawani2024', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@dzawanitour.com',
      password: hashedPassword,
      name: 'Admin Dzawani Tour',
      role: 'super_admin',
    },
  });
  console.log('✅ Admin user created');

  // Seed Tour Packages (Featured - for homepage)
  const tourPackages = [
    {
      title: 'Bali Paradise Escape',
      titleEn: 'Bali Paradise Escape',
      slug: 'bali-paradise-escape',
      type: 'private_trip',
      category: 'domestik',
      destination: 'Bali, Indonesia',
      destinationEn: 'Bali, Indonesia',
      duration: '5 Hari 4 Malam',
      durationEn: '5 Days 4 Nights',
      price: 3500000,
      priceDiscount: 4200000,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      rating: 4.9,
      reviewCount: 248,
      highlights: ['Tanah Lot', 'Ubud Rice Terrace', 'Kuta Beach', 'Uluwatu Temple'],
      highlightsEn: ['Tanah Lot', 'Ubud Rice Terrace', 'Kuta Beach', 'Uluwatu Temple'],
      includes: ['Hotel Bintang 4', 'Transportasi AC', 'Guide Profesional', 'Makan 3x Sehari'],
      includesEn: ['4-Star Hotel', 'AC Transportation', 'Professional Guide', '3 Meals Daily'],
      excludes: ['Tiket Pesawat', 'Pengeluaran Pribadi'],
      excludesEn: ['Flight Tickets', 'Personal Expenses'],
      description: 'Nikmati keindahan Pulau Dewata dengan paket lengkap yang mencakup destinasi terbaik Bali.',
      descriptionEn: 'Enjoy the beauty of the Island of the Gods with a complete package covering the best destinations in Bali.',
      badge: 'best_seller',
      featured: true,
      status: 'active',
    },
    {
      title: 'Labuan Bajo & Komodo Adventure',
      titleEn: 'Labuan Bajo & Komodo Adventure',
      slug: 'labuan-bajo-komodo-adventure',
      type: 'open_trip',
      category: 'domestik',
      destination: 'Labuan Bajo, NTT',
      destinationEn: 'Labuan Bajo, NTT',
      duration: '4 Hari 3 Malam',
      durationEn: '4 Days 3 Nights',
      price: 4800000,
      priceDiscount: 5500000,
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
      rating: 4.8,
      reviewCount: 156,
      highlights: ['Pulau Komodo', 'Pink Beach', 'Padar Island', 'Snorkeling'],
      highlightsEn: ['Komodo Island', 'Pink Beach', 'Padar Island', 'Snorkeling'],
      includes: ['Kapal Phinisi', 'Hotel Bintang 3', 'Guide Lokal', 'Makan Siang'],
      includesEn: ['Phinisi Boat', '3-Star Hotel', 'Local Guide', 'Lunch'],
      excludes: ['Tiket Pesawat', 'Asuransi'],
      excludesEn: ['Flight Tickets', 'Insurance'],
      description: 'Jelajahi keajaiban alam Labuan Bajo dan bertemu langsung dengan Komodo Dragon.',
      descriptionEn: 'Explore the natural wonders of Labuan Bajo and meet the Komodo Dragon directly.',
      badge: 'hot_deal',
      featured: true,
      status: 'active',
    },
    {
      title: 'Raja Ampat Underwater Paradise',
      titleEn: 'Raja Ampat Underwater Paradise',
      slug: 'raja-ampat-underwater-paradise',
      type: 'private_trip',
      category: 'domestik',
      destination: 'Raja Ampat, Papua Barat',
      destinationEn: 'Raja Ampat, West Papua',
      duration: '6 Hari 5 Malam',
      durationEn: '6 Days 5 Nights',
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      rating: 5.0,
      reviewCount: 89,
      highlights: ['Diving & Snorkeling', 'Wayag Island', 'Piaynemo', 'Arborek Village'],
      highlightsEn: ['Diving & Snorkeling', 'Wayag Island', 'Piaynemo', 'Arborek Village'],
      includes: ['Resort Tepi Pantai', 'Perahu Speedboat', 'Instruktur Diving', 'Full Board'],
      includesEn: ['Beachfront Resort', 'Speedboat', 'Diving Instructor', 'Full Board'],
      excludes: ['Tiket Pesawat', 'Peralatan Diving Pribadi'],
      excludesEn: ['Flight Tickets', 'Personal Diving Equipment'],
      description: 'Selami keindahan bawah laut Raja Ampat yang terkenal sebagai surga diving dunia.',
      descriptionEn: "Dive into the underwater beauty of Raja Ampat, known as the world's diving paradise.",
      badge: 'new',
      featured: true,
      status: 'active',
    },
    {
      title: 'Istanbul & Cappadocia Discovery',
      titleEn: 'Istanbul & Cappadocia Discovery',
      slug: 'istanbul-cappadocia-discovery',
      type: 'open_trip',
      category: 'internasional',
      destination: 'Turki',
      destinationEn: 'Turkey',
      duration: '9 Hari 8 Malam',
      durationEn: '9 Days 8 Nights',
      price: 28500000,
      priceDiscount: 32000000,
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
      rating: 4.9,
      reviewCount: 312,
      highlights: ['Hagia Sophia', 'Hot Air Balloon', 'Grand Bazaar', 'Bosphorus Cruise'],
      highlightsEn: ['Hagia Sophia', 'Hot Air Balloon', 'Grand Bazaar', 'Bosphorus Cruise'],
      includes: ['Tiket Pesawat PP', 'Hotel Bintang 4', 'Tour Leader', 'Makan Pagi'],
      includesEn: ['Round-Trip Flights', '4-Star Hotel', 'Tour Leader', 'Breakfast'],
      excludes: ['Pengeluaran Pribadi', 'Visa (diurus sendiri)'],
      excludesEn: ['Personal Expenses', 'Visa (self-arranged)'],
      description: 'Jelajahi keajaiban Turki dari Istanbul yang megah hingga Cappadocia yang menakjubkan.',
      descriptionEn: 'Explore the wonders of Turkey from magnificent Istanbul to breathtaking Cappadocia.',
      badge: 'best_seller',
      featured: true,
      status: 'active',
    },
    {
      title: 'Jepang Cherry Blossom Tour',
      titleEn: 'Japan Cherry Blossom Tour',
      slug: 'jepang-cherry-blossom-tour',
      type: 'open_trip',
      category: 'internasional',
      destination: 'Jepang',
      destinationEn: 'Japan',
      duration: '8 Hari 7 Malam',
      durationEn: '8 Days 7 Nights',
      price: 35000000,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      rating: 4.9,
      reviewCount: 178,
      highlights: ['Tokyo', 'Kyoto', 'Mount Fuji', 'Osaka'],
      highlightsEn: ['Tokyo', 'Kyoto', 'Mount Fuji', 'Osaka'],
      includes: ['Tiket Pesawat PP', 'Hotel Bintang 4', 'JR Pass', 'Tour Leader'],
      includesEn: ['Round-Trip Flights', '4-Star Hotel', 'JR Pass', 'Tour Leader'],
      excludes: ['Visa Jepang', 'Pengeluaran Pribadi'],
      excludesEn: ['Japan Visa', 'Personal Expenses'],
      description: 'Saksikan keindahan bunga sakura di Jepang dengan tur yang terorganisir dan berkesan.',
      descriptionEn: 'Witness the beauty of cherry blossoms in Japan with an organized and memorable tour.',
      badge: 'hot_deal',
      featured: true,
      status: 'active',
    },
    {
      title: 'Umrah Plus Turki',
      titleEn: 'Umrah Plus Turkey',
      slug: 'umrah-plus-turki',
      type: 'open_trip',
      category: 'internasional',
      destination: 'Arab Saudi & Turki',
      destinationEn: 'Saudi Arabia & Turkey',
      duration: '12 Hari 11 Malam',
      durationEn: '12 Days 11 Nights',
      price: 45000000,
      image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
      rating: 5.0,
      reviewCount: 234,
      highlights: ['Masjidil Haram', 'Masjid Nabawi', 'Hagia Sophia', 'Cappadocia'],
      highlightsEn: ['Masjidil Haram', 'Masjid Nabawi', 'Hagia Sophia', 'Cappadocia'],
      includes: ['Tiket Pesawat PP', 'Hotel Bintang 4 Dekat Haram', 'Pembimbing Ibadah', 'Makan 3x'],
      includesEn: ['Round-Trip Flights', '4-Star Hotel Near Haram', 'Religious Guide', '3 Meals'],
      excludes: ['Pengeluaran Pribadi', 'Oleh-oleh'],
      excludesEn: ['Personal Expenses', 'Souvenirs'],
      description: 'Paket Umrah plus wisata Turki dengan pembimbing berpengalaman dan fasilitas terbaik.',
      descriptionEn: 'Umrah package plus Turkey tour with experienced guide and best facilities.',
      badge: 'best_seller',
      featured: true,
      status: 'active',
    },
  ];

  for (const pkg of tourPackages) {
    await prisma.tourPackage.create({ data: pkg });
  }
  console.log(`✅ ${tourPackages.length} tour packages seeded`);

  // Seed Testimonials
  const testimonials = [
    {
      name: 'Siti Rahayu',
      location: 'Jakarta',
      packageName: 'Bali Paradise Escape',
      rating: 5,
      comment: 'Pengalaman luar biasa! Pelayanan Dzawani Tour sangat profesional dan ramah. Tour ke Bali kemarin benar-benar tak terlupakan. Pasti akan booking lagi!',
      commentEn: "An amazing experience! Dzawani Tour's service was very professional and friendly. The Bali trip was truly unforgettable. Will definitely book again!",
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      date: 'Januari 2025',
      status: 'active',
      featured: true,
    },
    {
      name: 'Ahmad Fauzi',
      location: 'Surabaya',
      packageName: 'Open Trip Turki',
      rating: 5,
      comment: 'Umrah bersama Dzawani Tour sangat berkesan. Hotel dekat Haram, pembimbing yang sabar dan berpengetahuan. Alhamdulillah, ibadah berjalan lancar.',
      commentEn: 'Umrah with Dzawani Tour was very memorable. Hotel near the Haram, patient and knowledgeable guide. Alhamdulillah, worship went smoothly.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      date: 'Maret 2025',
      status: 'active',
      featured: true,
    },
    {
      name: 'Dewi Kusuma',
      location: 'Bandung',
      packageName: 'Open Trip Istanbul & Cappadocia',
      rating: 5,
      comment: 'Turki sungguh indah! Hot air balloon di Cappadocia adalah momen yang tidak akan pernah saya lupakan. Terima kasih Dzawani Tour!',
      commentEn: 'Turkey is absolutely beautiful! The hot air balloon in Cappadocia is a moment I will never forget. Thank you Dzawani Tour!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      date: 'April 2025',
      status: 'active',
      featured: true,
    },
    {
      name: 'Budi Santoso',
      location: 'Yogyakarta',
      packageName: 'Private Trip Labuan Bajo',
      rating: 5,
      comment: 'Private trip ke Labuan Bajo bersama keluarga sangat berkesan. Pelayanan personal dan fleksibel sesuai keinginan kami.',
      commentEn: 'Private trip to Labuan Bajo with family was very memorable. Personal and flexible service tailored to our wishes.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      date: 'Mei 2025',
      status: 'active',
      featured: true,
    },
    {
      name: 'Rina Marlina',
      location: 'Medan',
      packageName: 'Open Trip Jepang Cherry Blossom',
      rating: 5,
      comment: 'Jepang di musim sakura adalah impian saya sejak lama. Dzawani Tour membuat perjalanan ini sangat terorganisir dan menyenangkan. Highly recommended!',
      commentEn: 'Japan during cherry blossom season has been my dream for a long time. Dzawani Tour made this trip very organized and enjoyable. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      date: 'April 2025',
      status: 'active',
      featured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // Seed FAQs
  const faqs = [
    {
      question: 'Apa perbedaan Open Trip dan Private Trip?',
      questionEn: 'What is the difference between Open Trip and Private Trip?',
      answer: 'Open Trip adalah paket wisata bersama peserta lain dengan jadwal keberangkatan yang sudah ditentukan. Private Trip adalah paket wisata eksklusif untuk Anda dan rombongan dengan jadwal dan itinerary yang bisa disesuaikan.',
      answerEn: 'Open Trip is a tour package shared with other participants with a predetermined departure schedule. Private Trip is an exclusive tour package for you and your group with a customizable schedule and itinerary.',
      category: 'Umum',
      order: 1,
      status: 'active',
    },
    {
      question: 'Bagaimana cara memesan paket tour di Dzawani Tour?',
      questionEn: 'How do I book a tour package at Dzawani Tour?',
      answer: "Anda dapat memesan melalui: (1) Halaman website ini dengan klik tombol 'Pesan Sekarang', (2) WhatsApp kami di 08112222254, atau (3) Datang langsung ke kantor kami.",
      answerEn: "You can book through: (1) This website by clicking the 'Book Now' button, (2) Our WhatsApp at 08112222254, or (3) Visit our office directly.",
      category: 'Pemesanan',
      order: 2,
      status: 'active',
    },
    {
      question: 'Berapa lama sebelumnya saya harus memesan?',
      questionEn: 'How far in advance should I book?',
      answer: 'Untuk Open Trip domestik: minimal 7-14 hari sebelum keberangkatan. Open Trip internasional: minimal 1 bulan. Private Trip: minimal 2 minggu untuk domestik, 1-2 bulan untuk internasional.',
      answerEn: 'For domestic Open Trip: minimum 7-14 days before departure. International Open Trip: minimum 1 month. Private Trip: minimum 2 weeks for domestic, 1-2 months for international.',
      category: 'Pemesanan',
      order: 3,
      status: 'active',
    },
    {
      question: 'Apakah harga sudah termasuk tiket pesawat?',
      questionEn: 'Does the price include flight tickets?',
      answer: 'Untuk paket internasional, harga sudah termasuk tiket pesawat PP. Untuk paket domestik, tiket pesawat tidak termasuk kecuali disebutkan secara khusus.',
      answerEn: 'For international packages, the price includes round-trip flight tickets. For domestic packages, flight tickets are not included unless specifically stated.',
      category: 'Harga',
      order: 4,
      status: 'active',
    },
    {
      question: 'Bagaimana sistem pembayaran?',
      questionEn: 'How does the payment system work?',
      answer: 'Pembayaran dapat dilakukan melalui transfer bank (BCA, Mandiri, BNI, BRI) atau tunai di kantor kami. Untuk konfirmasi booking, diperlukan DP minimal 30% dari total harga.',
      answerEn: 'Payment can be made via bank transfer (BCA, Mandiri, BNI, BRI) or cash at our office. For booking confirmation, a minimum down payment (DP) of 30% of the total price is required.',
      category: 'Pembayaran',
      order: 5,
      status: 'active',
    },
    {
      question: 'Apa kebijakan pembatalan dan refund?',
      questionEn: 'What is the cancellation and refund policy?',
      answer: 'Pembatalan lebih dari 30 hari sebelum keberangkatan: refund 80%. Pembatalan 15-30 hari sebelumnya: refund 50%. Pembatalan kurang dari 15 hari: refund 25%.',
      answerEn: 'Cancellation more than 30 days before departure: 80% refund. Cancellation 15-30 days before: 50% refund. Cancellation less than 15 days: 25% refund.',
      category: 'Kebijakan',
      order: 6,
      status: 'active',
    },
    {
      question: 'Apakah tersedia paket untuk grup atau keluarga?',
      questionEn: 'Are there packages available for groups or families?',
      answer: 'Tentu! Private Trip sangat cocok untuk grup keluarga atau perusahaan. Untuk Open Trip grup (minimal 10 orang), kami menyediakan harga khusus.',
      answerEn: 'Absolutely! Private Trip is perfect for family groups or companies. For group Open Trip (minimum 10 people), we offer special prices.',
      category: 'Paket',
      order: 7,
      status: 'active',
    },
    {
      question: 'Apakah ada asuransi perjalanan?',
      questionEn: 'Is there travel insurance?',
      answer: 'Ya, semua paket tour Dzawani Tour sudah dilengkapi dengan asuransi perjalanan dasar.',
      answerEn: 'Yes, all Dzawani Tour packages include basic travel insurance.',
      category: 'Jaminan',
      order: 8,
      status: 'active',
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log(`✅ ${faqs.length} FAQs seeded`);

  // Seed Hero Slides
  const heroSlides = [
    {
      title: 'Petualangan Tak Terlupakan Menanti Anda',
      titleEn: 'Unforgettable Adventures Await You',
      subtitle: 'Jelajahi keindahan dunia bersama Dzawani Tour',
      subtitleEn: 'Explore the beauty of the world with Dzawani Tour',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80',
      order: 1,
      status: 'active',
    },
    {
      title: 'Turki - Negeri Dua Benua',
      titleEn: 'Turkey - Land of Two Continents',
      subtitle: 'Hot air balloon Cappadocia yang memukau',
      subtitleEn: 'The breathtaking hot air balloon of Cappadocia',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80',
      order: 2,
      status: 'active',
    },
    {
      title: 'Jepang - Negeri Sakura',
      titleEn: 'Japan - Land of Cherry Blossoms',
      subtitle: 'Keindahan musim semi yang memesona',
      subtitleEn: 'The mesmerizing beauty of spring',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
      order: 3,
      status: 'active',
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log(`✅ ${heroSlides.length} hero slides seeded`);

  // Seed Destinations
  const destinations = [
    {
      slug: 'bali',
      name: 'Bali',
      nameEn: 'Bali',
      country: 'Indonesia',
      countryEn: 'Indonesia',
      category: 'domestik',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      description: 'Pulau Dewata yang penuh keindahan alam dan budaya',
      descriptionEn: 'The Island of the Gods full of natural beauty and culture',
      packageCount: 5,
      featured: true,
      status: 'active',
    },
    {
      slug: 'labuan-bajo',
      name: 'Labuan Bajo',
      nameEn: 'Labuan Bajo',
      country: 'Indonesia',
      countryEn: 'Indonesia',
      category: 'domestik',
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
      description: 'Surga tersembunyi di Nusa Tenggara Timur',
      descriptionEn: 'Hidden paradise in East Nusa Tenggara',
      packageCount: 3,
      featured: true,
      status: 'active',
    },
    {
      slug: 'raja-ampat',
      name: 'Raja Ampat',
      nameEn: 'Raja Ampat',
      country: 'Indonesia',
      countryEn: 'Indonesia',
      category: 'domestik',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      description: 'Surga diving terbaik di dunia',
      descriptionEn: 'The best diving paradise in the world',
      packageCount: 2,
      featured: true,
      status: 'active',
    },
    {
      slug: 'turki',
      name: 'Turki',
      nameEn: 'Turkey',
      country: 'Turki',
      countryEn: 'Turkey',
      category: 'internasional',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
      description: 'Negeri dua benua dengan sejarah dan budaya yang kaya',
      descriptionEn: 'Land of two continents with rich history and culture',
      packageCount: 4,
      featured: true,
      status: 'active',
    },
    {
      slug: 'jepang',
      name: 'Jepang',
      nameEn: 'Japan',
      country: 'Jepang',
      countryEn: 'Japan',
      category: 'internasional',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      description: 'Negeri sakura yang memadukan tradisi dan modernitas',
      descriptionEn: 'Land of cherry blossoms blending tradition and modernity',
      packageCount: 3,
      featured: true,
      status: 'active',
    },
    {
      slug: 'arab-saudi',
      name: 'Arab Saudi',
      nameEn: 'Saudi Arabia',
      country: 'Arab Saudi',
      countryEn: 'Saudi Arabia',
      category: 'internasional',
      image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
      description: 'Tanah suci untuk ibadah Umrah dan Haji',
      descriptionEn: 'Holy land for Umrah and Hajj pilgrimage',
      packageCount: 6,
      featured: true,
      status: 'active',
    },
  ];

  for (const dest of destinations) {
    await prisma.destination.create({ data: dest });
  }
  console.log(`✅ ${destinations.length} destinations seeded`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
