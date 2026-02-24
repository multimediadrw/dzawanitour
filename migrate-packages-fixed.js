const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://berkomunitas:berkomunitas688@213.190.4.159/dzawanitour"
});

const packages = [
  {
    id: "pkg-1",
    title: "Bali Paradise Escape",
    slug: "bali-paradise-escape",
    destination: "Bali, Indonesia",
    duration: "5 Hari 4 Malam",
    price: 3500000,
    priceDiscount: 4200000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    category: "domestik",
    type: "private_trip",
    rating: 4.9,
    reviewCount: 248,
    highlights: ["Tanah Lot", "Ubud Rice Terrace", "Kuta Beach", "Uluwatu Temple"],
    highlightsEn: ["Tanah Lot", "Ubud Rice Terrace", "Kuta Beach", "Uluwatu Temple"],
    includes: ["Hotel Bintang 4", "Transportasi AC", "Guide Profesional", "Makan 3x Sehari"],
    includesEn: ["4-Star Hotel", "AC Transportation", "Professional Guide", "3 Meals Daily"],
    excludes: ["Tiket Pesawat", "Pengeluaran Pribadi"],
    excludesEn: ["Flight Tickets", "Personal Expenses"],
    description: "Nikmati keindahan Pulau Dewata dengan paket lengkap yang mencakup destinasi terbaik Bali.",
    badge: "Best Seller",
    featured: true,
    status: "active",
  },
  {
    id: "pkg-2",
    title: "Labuan Bajo & Komodo Adventure",
    slug: "labuan-bajo-komodo-adventure",
    destination: "Labuan Bajo, NTT",
    duration: "4 Hari 3 Malam",
    price: 4800000,
    priceDiscount: 5500000,
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    category: "domestik",
    type: "private_trip",
    rating: 4.8,
    reviewCount: 156,
    highlights: ["Pulau Komodo", "Pink Beach", "Padar Island", "Snorkeling"],
    highlightsEn: ["Komodo Island", "Pink Beach", "Padar Island", "Snorkeling"],
    includes: ["Kapal Phinisi", "Hotel Bintang 3", "Guide Lokal", "Makan Siang"],
    includesEn: ["Phinisi Boat", "3-Star Hotel", "Local Guide", "Lunch"],
    excludes: ["Tiket Pesawat", "Asuransi Perjalanan"],
    excludesEn: ["Flight Tickets", "Travel Insurance"],
    description: "Jelajahi keajaiban alam Labuan Bajo dan bertemu langsung dengan Komodo Dragon.",
    badge: "Hot Deal",
    featured: true,
    status: "active",
  },
  {
    id: "pkg-3",
    title: "Raja Ampat Underwater Paradise",
    slug: "raja-ampat-underwater-paradise",
    destination: "Raja Ampat, Papua Barat",
    duration: "6 Hari 5 Malam",
    price: 8500000,
    priceDiscount: null,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    category: "domestik",
    type: "private_trip",
    rating: 5.0,
    reviewCount: 89,
    highlights: ["Diving & Snorkeling", "Wayag Island", "Piaynemo", "Arborek Village"],
    highlightsEn: ["Diving & Snorkeling", "Wayag Island", "Piaynemo", "Arborek Village"],
    includes: ["Resort Tepi Pantai", "Perahu Speedboat", "Instruktur Diving", "Full Board"],
    includesEn: ["Beachfront Resort", "Speedboat", "Diving Instructor", "Full Board"],
    excludes: ["Tiket Pesawat", "Peralatan Diving"],
    excludesEn: ["Flight Tickets", "Diving Equipment"],
    description: "Surga bawah laut terbaik di dunia menanti Anda di Raja Ampat.",
    badge: "Premium",
    featured: true,
    status: "active",
  },
  {
    id: "pkg-4",
    title: "Istanbul & Cappadocia Discovery",
    slug: "istanbul-cappadocia-discovery",
    destination: "Turki",
    duration: "8 Hari 7 Malam",
    price: 18500000,
    priceDiscount: 22000000,
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    category: "internasional",
    type: "private_trip",
    rating: 4.9,
    reviewCount: 312,
    highlights: ["Hagia Sophia", "Hot Air Balloon", "Grand Bazaar", "Bosphorus Cruise"],
    highlightsEn: ["Hagia Sophia", "Hot Air Balloon", "Grand Bazaar", "Bosphorus Cruise"],
    includes: ["Hotel Bintang 4", "Tiket Pesawat PP", "Visa Turki", "Guide Berbahasa Indonesia"],
    includesEn: ["4-Star Hotel", "Round-trip Flight", "Turkey Visa", "Indonesian-speaking Guide"],
    excludes: ["Pengeluaran Pribadi", "Asuransi Perjalanan"],
    excludesEn: ["Personal Expenses", "Travel Insurance"],
    description: "Jelajahi keindahan Turki dari Istanbul yang megah hingga Cappadocia yang menakjubkan.",
    badge: "Most Popular",
    featured: true,
    status: "active",
  },
  {
    id: "pkg-5",
    title: "Jepang Cherry Blossom Tour",
    slug: "jepang-cherry-blossom-tour",
    destination: "Jepang",
    duration: "10 Hari 9 Malam",
    price: 28000000,
    priceDiscount: 32000000,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    category: "internasional",
    type: "private_trip",
    rating: 4.9,
    reviewCount: 445,
    highlights: ["Tokyo Disneyland", "Fuji Mountain", "Kyoto Temples", "Osaka Castle"],
    highlightsEn: ["Tokyo Disneyland", "Fuji Mountain", "Kyoto Temples", "Osaka Castle"],
    includes: ["Hotel Bintang 4", "JR Pass 7 Hari", "Tiket Pesawat PP", "Tour Manager"],
    includesEn: ["4-Star Hotel", "7-Day JR Pass", "Round-trip Flight", "Tour Manager"],
    excludes: ["Pengeluaran Pribadi", "Visa Jepang"],
    excludesEn: ["Personal Expenses", "Japan Visa"],
    description: "Saksikan keindahan bunga sakura yang memukau di berbagai kota bersejarah Jepang.",
    badge: "Seasonal Special",
    featured: true,
    status: "active",
  },
];

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('Starting migration...');
    
    for (const pkg of packages) {
      const query = `
        INSERT INTO "TourPackage" (
          id, title, slug, destination, duration, price, "priceDiscount",
          image, category, type, rating, "reviewCount", highlights, "highlightsEn",
          includes, "includesEn", excludes, "excludesEn",
          description, badge, featured, status,
          "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, NOW(), NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          destination = EXCLUDED.destination,
          duration = EXCLUDED.duration,
          price = EXCLUDED.price,
          "priceDiscount" = EXCLUDED."priceDiscount",
          image = EXCLUDED.image,
          category = EXCLUDED.category,
          type = EXCLUDED.type,
          rating = EXCLUDED.rating,
          "reviewCount" = EXCLUDED."reviewCount",
          highlights = EXCLUDED.highlights,
          "highlightsEn" = EXCLUDED."highlightsEn",
          includes = EXCLUDED.includes,
          "includesEn" = EXCLUDED."includesEn",
          excludes = EXCLUDED.excludes,
          "excludesEn" = EXCLUDED."excludesEn",
          description = EXCLUDED.description,
          badge = EXCLUDED.badge,
          featured = EXCLUDED.featured,
          status = EXCLUDED.status,
          "updatedAt" = NOW()
      `;
      
      const values = [
        pkg.id,
        pkg.title,
        pkg.slug,
        pkg.destination,
        pkg.duration,
        pkg.price,
        pkg.priceDiscount,
        pkg.image,
        pkg.category,
        pkg.type,
        pkg.rating,
        pkg.reviewCount,
        pkg.highlights,
        pkg.highlightsEn,
        pkg.includes,
        pkg.includesEn,
        pkg.excludes,
        pkg.excludesEn,
        pkg.description,
        pkg.badge,
        pkg.featured,
        pkg.status,
      ];
      
      await client.query(query, values);
      console.log(`✓ Migrated: ${pkg.title}`);
    }
    
    console.log('\n✅ Migration completed successfully!');
    console.log(`Total packages migrated: ${packages.length}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
