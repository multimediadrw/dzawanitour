import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('🌱 Seeding website data...');

    // Seed Tour Packages
    const packages = [
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
        excludes: ['Tiket Pesawat', 'Peralatan Diving'],
        excludesEn: ['Flight Tickets', 'Diving Equipment'],
        description: 'Surga bawah laut terbaik di dunia menanti Anda di Raja Ampat.',
        descriptionEn: 'The best underwater paradise in the world awaits you in Raja Ampat.',
        badge: 'premium',
        featured: true,
        status: 'active',
      },
      {
        title: 'Istanbul & Cappadocia Discovery',
        titleEn: 'Istanbul & Cappadocia Discovery',
        slug: 'istanbul-cappadocia-discovery',
        type: 'private_trip',
        category: 'internasional',
        destination: 'Turki',
        destinationEn: 'Turkey',
        duration: '8 Hari 7 Malam',
        durationEn: '8 Days 7 Nights',
        price: 18500000,
        priceDiscount: 22000000,
        image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80',
        rating: 4.9,
        reviewCount: 312,
        highlights: ['Hagia Sophia', 'Hot Air Balloon', 'Grand Bazaar', 'Bosphorus Cruise'],
        highlightsEn: ['Hagia Sophia', 'Hot Air Balloon', 'Grand Bazaar', 'Bosphorus Cruise'],
        includes: ['Hotel Bintang 4', 'Tiket Pesawat PP', 'Visa Turki', 'Guide Berbahasa Indonesia'],
        includesEn: ['4-Star Hotel', 'Round-trip Flight', 'Turkey Visa', 'Indonesian-speaking Guide'],
        excludes: ['Pengeluaran Pribadi', 'Tips Guide'],
        excludesEn: ['Personal Expenses', 'Guide Tips'],
        description: 'Jelajahi keindahan Turki dari Istanbul yang megah hingga Cappadocia yang menakjubkan.',
        descriptionEn: 'Explore the beauty of Turkey from magnificent Istanbul to stunning Cappadocia.',
        badge: 'best_seller',
        featured: true,
        status: 'active',
      },
      {
        title: 'Jepang Cherry Blossom Tour',
        titleEn: 'Japan Cherry Blossom Tour',
        slug: 'japan-cherry-blossom-tour',
        type: 'private_trip',
        category: 'internasional',
        destination: 'Jepang',
        destinationEn: 'Japan',
        duration: '10 Hari 9 Malam',
        durationEn: '10 Days 9 Nights',
        price: 28000000,
        priceDiscount: 32000000,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
        rating: 4.9,
        reviewCount: 445,
        highlights: ['Tokyo Disneyland', 'Fuji Mountain', 'Kyoto Temples', 'Osaka Castle'],
        highlightsEn: ['Tokyo Disneyland', 'Fuji Mountain', 'Kyoto Temples', 'Osaka Castle'],
        includes: ['Hotel Bintang 4', 'JR Pass 7 Hari', 'Tiket Pesawat PP', 'Tour Manager'],
        includesEn: ['4-Star Hotel', '7-Day JR Pass', 'Round-trip Flight', 'Tour Manager'],
        excludes: ['Visa Jepang', 'Pengeluaran Pribadi'],
        excludesEn: ['Japan Visa', 'Personal Expenses'],
        description: 'Saksikan keindahan bunga sakura yang memukau di berbagai kota bersejarah Jepang.',
        descriptionEn: 'Witness the stunning beauty of cherry blossoms in various historic cities of Japan.',
        badge: 'premium',
        featured: true,
        status: 'active',
      },
    ];

    console.log('📦 Seeding tour packages...');
    for (const pkg of packages) {
      await prisma.tourPackage.upsert({
        where: { slug: pkg.slug },
        update: pkg,
        create: pkg,
      });
    }

    // Seed Testimonials
    const testimonials = [
      {
        name: 'Sarah Johnson',
        packageName: 'Bali Paradise Escape',
        location: 'Jakarta',
        rating: 5,
        comment: 'Pengalaman yang luar biasa! Tour guide sangat profesional dan destinasi yang dikunjungi sangat indah. Highly recommended!',
        commentEn: 'Amazing experience! Very professional tour guide and beautiful destinations. Highly recommended!',
        avatar: 'https://i.pravatar.cc/150?img=1',
        date: '2024-01-15',
        featured: true,
      },
      {
        name: 'Ahmad Rizki',
        packageName: 'Labuan Bajo & Komodo Adventure',
        location: 'Surabaya',
        rating: 5,
        comment: 'Perjalanan ke Labuan Bajo sangat berkesan. Pemandangan Pink Beach dan Pulau Padar benar-benar memukau!',
        commentEn: 'The trip to Labuan Bajo was very memorable. The views of Pink Beach and Padar Island were truly stunning!',
        avatar: 'https://i.pravatar.cc/150?img=12',
        date: '2024-02-20',
        featured: true,
      },
      {
        name: 'Lisa Permata',
        packageName: 'Raja Ampat Underwater Paradise',
        location: 'Bandung',
        rating: 5,
        comment: 'Raja Ampat adalah surga dunia! Snorkeling di sini seperti berada di akuarium raksasa. Terima kasih Dzawani Tour!',
        commentEn: 'Raja Ampat is paradise on earth! Snorkeling here is like being in a giant aquarium. Thank you Dzawani Tour!',
        avatar: 'https://i.pravatar.cc/150?img=5',
        date: '2024-03-10',
        featured: true,
      },
      {
        name: 'Michael Chen',
        packageName: 'Istanbul & Cappadocia Discovery',
        location: 'Singapore',
        rating: 5,
        comment: 'Best tour ever! The hot air balloon ride in Cappadocia was magical. Everything was well organized.',
        commentEn: 'Best tour ever! The hot air balloon ride in Cappadocia was magical. Everything was well organized.',
        avatar: 'https://i.pravatar.cc/150?img=8',
        date: '2024-04-05',
        featured: true,
      },
    ];

    console.log('💬 Seeding testimonials...');
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial,
      });
    }

    // Seed FAQs
    const faqs = [
      {
        question: 'Bagaimana cara melakukan pemesanan?',
        questionEn: 'How to make a booking?',
        answer: 'Anda dapat melakukan pemesanan melalui website kami dengan mengisi formulir pemesanan, atau menghubungi customer service kami via WhatsApp/telepon.',
        answerEn: 'You can make a booking through our website by filling out the booking form, or contact our customer service via WhatsApp/phone.',
        category: 'booking',
        order: 1,
      },
      {
        question: 'Apakah harga sudah termasuk tiket pesawat?',
        questionEn: 'Does the price include flight tickets?',
        answer: 'Untuk paket internasional, harga sudah termasuk tiket pesawat PP. Untuk paket domestik, silakan cek detail paket atau hubungi kami.',
        answerEn: 'For international packages, the price includes round-trip flight tickets. For domestic packages, please check package details or contact us.',
        category: 'pricing',
        order: 2,
      },
      {
        question: 'Bagaimana sistem pembayaran?',
        questionEn: 'What is the payment system?',
        answer: 'Kami menerima pembayaran melalui transfer bank, kartu kredit, dan cicilan 0%. Down payment minimal 30% dari total harga.',
        answerEn: 'We accept payment via bank transfer, credit card, and 0% installment. Minimum down payment is 30% of the total price.',
        category: 'payment',
        order: 3,
      },
      {
        question: 'Apakah ada kebijakan pembatalan?',
        questionEn: 'Is there a cancellation policy?',
        answer: 'Ya, kami memiliki kebijakan pembatalan. Pembatalan 30 hari sebelum keberangkatan akan dikenakan biaya administrasi 10%. Untuk detail lengkap, silakan hubungi kami.',
        answerEn: 'Yes, we have a cancellation policy. Cancellation 30 days before departure will be charged a 10% administration fee. For complete details, please contact us.',
        category: 'cancellation',
        order: 4,
      },
    ];

    console.log('❓ Seeding FAQs...');
    for (const faq of faqs) {
      await prisma.fAQ.create({
        data: faq,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Data seeded successfully',
      data: {
        packages: packages.length,
        testimonials: testimonials.length,
        faqs: faqs.length,
      },
    });
  } catch (error: any) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
