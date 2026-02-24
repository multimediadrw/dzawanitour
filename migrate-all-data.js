const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Data Destinations
const destinations = [
  {
    id: "dest-1",
    name: "Bali",
    nameEn: "Bali",
    slug: "bali",
    country: "Indonesia",
    countryEn: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    packageCount: 8,
    category: "Domestik",
    featured: true,
  },
  {
    id: "dest-2",
    name: "Labuan Bajo",
    nameEn: "Labuan Bajo",
    slug: "labuan-bajo",
    country: "Indonesia",
    countryEn: "Indonesia",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80",
    packageCount: 5,
    category: "Domestik",
    featured: true,
  },
  {
    id: "dest-3",
    name: "Turki",
    nameEn: "Turkey",
    slug: "turki",
    country: "Turki",
    countryEn: "Turkey",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80",
    packageCount: 6,
    category: "Internasional",
    featured: true,
  },
  {
    id: "dest-4",
    name: "Jepang",
    nameEn: "Japan",
    slug: "jepang",
    country: "Jepang",
    countryEn: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    packageCount: 7,
    category: "Internasional",
    featured: true,
  },
  {
    id: "dest-5",
    name: "Raja Ampat",
    nameEn: "Raja Ampat",
    slug: "raja-ampat",
    country: "Indonesia",
    countryEn: "Indonesia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    packageCount: 3,
    category: "Domestik",
    featured: true,
  },
];

// Data Testimonials
const testimonials = [
  {
    id: "test-1",
    name: "Siti Rahayu",
    location: "Jakarta",
    rating: 5,
    comment: "Pengalaman luar biasa! Pelayanan Dzawani Tour sangat profesional dan ramah. Tour ke Bali kemarin benar-benar tak terlupakan. Pasti akan booking lagi!",
    commentEn: "Amazing experience! Dzawani Tour service is very professional and friendly. The Bali tour was truly unforgettable. Will definitely book again!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    tourPackage: "Bali Paradise Escape",
    date: "Januari 2025",
    featured: true,
  },
  {
    id: "test-2",
    name: "Ahmad Fauzi",
    location: "Surabaya",
    rating: 5,
    comment: "Umrah bersama Dzawani Tour sangat berkesan. Hotel dekat Haram, pembimbing yang sabar dan berpengetahuan. Alhamdulillah, ibadah berjalan lancar.",
    commentEn: "Umrah with Dzawani Tour was very memorable. Hotel near Haram, patient and knowledgeable guide. Alhamdulillah, the worship went smoothly.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    tourPackage: "Open Trip Turki",
    date: "Maret 2025",
    featured: true,
  },
  {
    id: "test-3",
    name: "Dewi Kusuma",
    location: "Bandung",
    rating: 5,
    comment: "Turki sungguh indah! Hot air balloon di Cappadocia adalah momen yang tidak akan pernah saya lupakan. Terima kasih Dzawani Tour!",
    commentEn: "Turkey is truly beautiful! Hot air balloon in Cappadocia is a moment I will never forget. Thank you Dzawani Tour!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    tourPackage: "Open Trip Istanbul & Cappadocia",
    date: "April 2025",
    featured: true,
  },
  {
    id: "test-4",
    name: "Budi Santoso",
    location: "Yogyakarta",
    rating: 5,
    comment: "Private trip ke Labuan Bajo bersama keluarga sangat berkesan. Pelayanan personal dan fleksibel sesuai keinginan kami.",
    commentEn: "Private trip to Labuan Bajo with family was very memorable. Personal and flexible service according to our wishes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    tourPackage: "Private Trip Labuan Bajo",
    date: "Mei 2025",
    featured: true,
  },
  {
    id: "test-5",
    name: "Rina Marlina",
    location: "Medan",
    rating: 5,
    comment: "Jepang di musim sakura adalah impian saya sejak lama. Dzawani Tour membuat perjalanan ini sangat terorganisir dan menyenangkan. Highly recommended!",
    commentEn: "Japan in cherry blossom season has been my dream for a long time. Dzawani Tour made this trip very organized and enjoyable. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    tourPackage: "Open Trip Jepang Cherry Blossom",
    date: "April 2025",
    featured: true,
  },
];

// Data FAQs
const faqs = [
  {
    id: "faq-1",
    question: "Apa perbedaan Open Trip dan Private Trip?",
    questionEn: "What is the difference between Open Trip and Private Trip?",
    answer: "Open Trip adalah paket wisata bersama dengan peserta lain (grup gabungan) dengan harga lebih terjangkau dan jadwal keberangkatan yang sudah ditentukan. Private Trip adalah paket wisata eksklusif khusus untuk Anda dan rombongan sendiri, dengan jadwal dan itinerary yang dapat disesuaikan.",
    answerEn: "Open Trip is a tour package with other participants (joint group) with more affordable prices and predetermined departure schedules. Private Trip is an exclusive tour package specifically for you and your own group, with customizable schedules and itineraries.",
    category: "Umum",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Bagaimana cara memesan paket tour di Dzawani Tour?",
    questionEn: "How to book a tour package at Dzawani Tour?",
    answer: "Anda dapat memesan melalui: (1) Halaman website ini dengan klik tombol 'Pesan Sekarang', (2) WhatsApp kami di 08112222254, atau (3) Datang langsung ke kantor kami. Tim kami siap membantu proses pemesanan Anda.",
    answerEn: "You can book through: (1) This website page by clicking the 'Book Now' button, (2) Our WhatsApp at 08112222254, or (3) Come directly to our office. Our team is ready to help your booking process.",
    category: "Pemesanan",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Berapa lama sebelumnya saya harus memesan?",
    questionEn: "How long in advance should I book?",
    answer: "Untuk Open Trip domestik: minimal 7-14 hari sebelum keberangkatan. Open Trip internasional: minimal 1 bulan. Private Trip: minimal 2 minggu untuk domestik, 1-2 bulan untuk internasional. Pemesanan lebih awal sangat disarankan karena kuota terbatas.",
    answerEn: "For domestic Open Trip: at least 7-14 days before departure. International Open Trip: at least 1 month. Private Trip: at least 2 weeks for domestic, 1-2 months for international. Early booking is highly recommended due to limited quota.",
    category: "Pemesanan",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Apakah harga sudah termasuk tiket pesawat?",
    questionEn: "Does the price include flight tickets?",
    answer: "Untuk paket internasional, harga sudah termasuk tiket pesawat PP (pulang-pergi). Untuk paket domestik, tiket pesawat tidak termasuk kecuali disebutkan secara khusus. Detail inclusi tercantum di setiap paket.",
    answerEn: "For international packages, the price includes round-trip flight tickets. For domestic packages, flight tickets are not included unless specifically mentioned. Inclusion details are listed in each package.",
    category: "Harga",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Bagaimana sistem pembayaran?",
    questionEn: "How is the payment system?",
    answer: "Pembayaran dapat dilakukan melalui transfer bank (BCA, Mandiri, BNI, BRI) atau tunai di kantor kami. Untuk konfirmasi booking, diperlukan DP minimal 30% dari total harga. Pelunasan dilakukan paling lambat 14 hari sebelum keberangkatan.",
    answerEn: "Payment can be made via bank transfer (BCA, Mandiri, BNI, BRI) or cash at our office. For booking confirmation, a minimum down payment of 30% of the total price is required. Full payment must be made at least 14 days before departure.",
    category: "Pembayaran",
    order: 5,
  },
  {
    id: "faq-6",
    question: "Apa kebijakan pembatalan dan refund?",
    questionEn: "What is the cancellation and refund policy?",
    answer: "Pembatalan lebih dari 30 hari sebelum keberangkatan: refund 80%. Pembatalan 15-30 hari sebelumnya: refund 50%. Pembatalan kurang dari 15 hari: refund 25%. Pembatalan karena force majeure (bencana alam, pandemi) akan dipertimbangkan secara khusus.",
    answerEn: "Cancellation more than 30 days before departure: 80% refund. Cancellation 15-30 days before: 50% refund. Cancellation less than 15 days: 25% refund. Cancellation due to force majeure (natural disasters, pandemic) will be considered specially.",
    category: "Kebijakan",
    order: 6,
  },
  {
    id: "faq-7",
    question: "Apakah tersedia paket untuk grup atau keluarga?",
    questionEn: "Are there packages for groups or families?",
    answer: "Tentu! Private Trip sangat cocok untuk grup keluarga atau perusahaan. Untuk Open Trip grup (minimal 10 orang), kami menyediakan harga khusus dan dapat mengatur jadwal keberangkatan tersendiri. Hubungi kami untuk penawaran terbaik.",
    answerEn: "Of course! Private Trip is perfect for family or corporate groups. For group Open Trip (minimum 10 people), we provide special prices and can arrange separate departure schedules. Contact us for the best offer.",
    category: "Paket",
    order: 7,
  },
  {
    id: "faq-8",
    question: "Apakah ada asuransi perjalanan?",
    questionEn: "Is there travel insurance?",
    answer: "Ya, semua paket tour Dzawani Tour sudah dilengkapi dengan asuransi perjalanan dasar. Untuk perlindungan lebih komprehensif, kami menyarankan penambahan asuransi premium yang dapat didiskusikan saat pemesanan.",
    answerEn: "Yes, all Dzawani Tour packages are equipped with basic travel insurance. For more comprehensive protection, we recommend adding premium insurance which can be discussed during booking.",
    category: "Jaminan",
    order: 8,
  },
];

// Data Hero Slides
const heroSlides = [
  {
    id: "hero-1",
    title: "Bali Paradise",
    titleEn: "Bali Paradise",
    subtitle: "Pulau Dewata yang Memukau",
    subtitleEn: "The Enchanting Island of Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90",
    order: 1,
    active: true,
  },
  {
    id: "hero-2",
    title: "Istanbul & Cappadocia",
    titleEn: "Istanbul & Cappadocia",
    subtitle: "Keajaiban Dua Benua",
    subtitleEn: "The Wonder of Two Continents",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=90",
    order: 2,
    active: true,
  },
  {
    id: "hero-3",
    title: "Jepang Sakura",
    titleEn: "Japan Sakura",
    subtitle: "Negeri Bunga Sakura",
    subtitleEn: "Land of Cherry Blossoms",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=90",
    order: 3,
    active: true,
  },
];

// Data Features
const features = [
  {
    id: "feat-1",
    icon: "Shield",
    title: "Terjamin & Terpercaya",
    titleEn: "Certified & Trusted",
    description: "Terdaftar resmi di ASITA, IATA, dan Kementerian Agama. Perjalanan Anda dijamin aman dan terpercaya.",
    descriptionEn: "Officially registered with ASITA, IATA, and Ministry of Religious Affairs. Your journey is guaranteed safe and trusted.",
    color: "text-ocean",
    order: 1,
    active: true,
  },
  {
    id: "feat-2",
    icon: "Award",
    title: "Penghargaan Terbaik",
    titleEn: "Best Awards",
    description: "Meraih lebih dari 25 penghargaan sebagai travel agency terbaik di Indonesia selama 10 tahun berturut-turut.",
    descriptionEn: "Won more than 25 awards as the best travel agency in Indonesia for 10 consecutive years.",
    color: "text-magenta",
    order: 2,
    active: true,
  },
  {
    id: "feat-3",
    icon: "Headphones",
    title: "Layanan 24/7",
    titleEn: "24/7 Service",
    description: "Tim customer service kami siap membantu Anda kapan saja, bahkan saat Anda sedang dalam perjalanan.",
    descriptionEn: "Our customer service team is ready to help you anytime, even while you are on your trip.",
    color: "text-purple",
    order: 3,
    active: true,
  },
  {
    id: "feat-4",
    icon: "Users",
    title: "Guide Profesional",
    titleEn: "Professional Guides",
    description: "Dipandu oleh guide berpengalaman yang menguasai bahasa lokal dan pengetahuan mendalam tentang destinasi.",
    descriptionEn: "Guided by experienced guides who master the local language and have deep knowledge of the destination.",
    color: "text-sunset",
    order: 4,
    active: true,
  },
  {
    id: "feat-5",
    icon: "MapPin",
    title: "Destinasi Lengkap",
    titleEn: "Complete Destinations",
    description: "Lebih dari 50 destinasi pilihan, dari wisata domestik terbaik hingga destinasi internasional impian Anda.",
    descriptionEn: "More than 50 destination choices, from the best domestic tours to your dream international destinations.",
    color: "text-mint",
    order: 5,
    active: true,
  },
  {
    id: "feat-6",
    icon: "CreditCard",
    title: "Harga Terbaik",
    titleEn: "Best Price",
    description: "Dapatkan harga terbaik dengan jaminan harga terendah. Cicilan 0% tersedia untuk semua paket tour.",
    descriptionEn: "Get the best price with a lowest price guarantee. 0% installment available for all tour packages.",
    color: "text-ocean",
    order: 6,
    active: true,
  },
];

async function main() {
  console.log('🚀 Starting data migration...\n');

  try {
    // Migrate Destinations
    console.log('📍 Migrating Destinations...');
    for (const dest of destinations) {
      await prisma.destination.upsert({
        where: { id: dest.id },
        update: dest,
        create: dest,
      });
      console.log(`  ✓ ${dest.name}`);
    }

    // Migrate Testimonials
    console.log('\n💬 Migrating Testimonials...');
    for (const test of testimonials) {
      await prisma.testimonial.upsert({
        where: { id: test.id },
        update: test,
        create: test,
      });
      console.log(`  ✓ ${test.name}`);
    }

    // Migrate FAQs
    console.log('\n❓ Migrating FAQs...');
    for (const faq of faqs) {
      await prisma.fAQ.upsert({
        where: { id: faq.id },
        update: faq,
        create: faq,
      });
      console.log(`  ✓ ${faq.question.substring(0, 50)}...`);
    }

    // Migrate Hero Slides
    console.log('\n🖼️  Migrating Hero Slides...');
    for (const slide of heroSlides) {
      await prisma.heroSlide.upsert({
        where: { id: slide.id },
        update: slide,
        create: slide,
      });
      console.log(`  ✓ ${slide.title}`);
    }

    // Migrate Features
    console.log('\n⭐ Migrating Features...');
    for (const feat of features) {
      await prisma.feature.upsert({
        where: { id: feat.id },
        update: feat,
        create: feat,
      });
      console.log(`  ✓ ${feat.title}`);
    }

    console.log('\n✅ All data migrated successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Destinations: ${destinations.length}`);
    console.log(`  - Testimonials: ${testimonials.length}`);
    console.log(`  - FAQs: ${faqs.length}`);
    console.log(`  - Hero Slides: ${heroSlides.length}`);
    console.log(`  - Features: ${features.length}`);
    console.log(`  - Total: ${destinations.length + testimonials.length + faqs.length + heroSlides.length + features.length} records\n`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
