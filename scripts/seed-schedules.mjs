// Seed TripSchedule and PrivateTripPricing data
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const openTripDomestik = [
  { id: "ot-d1", destinasi: "Bali", durasi: "5H 4M", tanggalBerangkat: "15 Maret 2025", harga: 3500000, kuota: 20, tersisa: 8, status: "Tersedia", includes: "Hotel, Transport, Guide, Makan", tripCategory: "domestik" },
  { id: "ot-d2", destinasi: "Labuan Bajo", durasi: "4H 3M", tanggalBerangkat: "22 Maret 2025", harga: 4800000, kuota: 15, tersisa: 5, status: "Hampir Penuh", includes: "Kapal Phinisi, Hotel, Guide, Makan", tripCategory: "domestik" },
  { id: "ot-d3", destinasi: "Raja Ampat", durasi: "6H 5M", tanggalBerangkat: "1 April 2025", harga: 8500000, kuota: 12, tersisa: 12, status: "Tersedia", includes: "Resort, Speedboat, Diving, Full Board", tripCategory: "domestik" },
  { id: "ot-d4", destinasi: "Lombok & Gili", durasi: "4H 3M", tanggalBerangkat: "10 April 2025", harga: 3200000, kuota: 20, tersisa: 14, status: "Tersedia", includes: "Hotel, Fast Boat, Guide, Makan", tripCategory: "domestik" },
  { id: "ot-d5", destinasi: "Yogyakarta", durasi: "3H 2M", tanggalBerangkat: "18 April 2025", harga: 1800000, kuota: 25, tersisa: 20, status: "Tersedia", includes: "Hotel, Transport, Guide", tripCategory: "domestik" },
  { id: "ot-d6", destinasi: "Bromo & Ijen", durasi: "3H 2M", tanggalBerangkat: "25 April 2025", harga: 2200000, kuota: 18, tersisa: 3, status: "Hampir Penuh", includes: "Jeep, Hotel, Guide, Makan Pagi", tripCategory: "domestik" },
];

const openTripInternasional = [
  { id: "ot-i1", destinasi: "Malaysia & Singapore", durasi: "5H 4M", tanggalBerangkat: "15 Maret 2025", harga: 8500000, kuota: 20, tersisa: 12, status: "Tersedia", includes: "Hotel, Pesawat PP, Guide, Meals", tripCategory: "internasional", slug: "malaysia-singapore-5d4n", hasDetail: true },
  { id: "ot-i2", destinasi: "Turki", durasi: "10H 9M", tanggalBerangkat: "1 April 2025", harga: 18500000, kuota: 25, tersisa: 5, status: "Hampir Penuh", includes: "Hotel, Pesawat PP, Visa, Guide", tripCategory: "internasional" },
  { id: "ot-i3", destinasi: "Jepang (Tokyo & Kyoto)", durasi: "10H 9M", tanggalBerangkat: "1 April 2025", harga: 28000000, kuota: 20, tersisa: 11, status: "Tersedia", includes: "Hotel, Pesawat PP, JR Pass, Guide", tripCategory: "internasional" },
  { id: "ot-i4", destinasi: "Korea Selatan", durasi: "7H 6M", tanggalBerangkat: "15 April 2025", harga: 22000000, kuota: 18, tersisa: 9, status: "Tersedia", includes: "Hotel, Pesawat PP, Visa, Guide", tripCategory: "internasional" },
  { id: "ot-i5", destinasi: "Eropa (Paris & Amsterdam)", durasi: "12H 11M", tanggalBerangkat: "5 Mei 2025", harga: 45000000, kuota: 15, tersisa: 7, status: "Tersedia", includes: "Hotel, Pesawat PP, Visa Schengen, Guide", tripCategory: "internasional" },
  { id: "ot-i6", destinasi: "Dubai & Abu Dhabi", durasi: "6H 5M", tanggalBerangkat: "20 Mei 2025", harga: 19500000, kuota: 20, tersisa: 15, status: "Tersedia", includes: "Hotel, Pesawat PP, Desert Safari, Guide", tripCategory: "internasional" },
];

const privateTripDomestik = [
  { id: "pt-d1", destinasi: "1 D - HAPPYLAND TOUR", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1250000, hargaPer4Pax: 1030000, hargaPer6Pax: 900000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d2", destinasi: "1 D - SKY VIEW LEMBANG", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1600000, hargaPer4Pax: 1105000, hargaPer6Pax: 705000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d3", destinasi: "1 D - BANDUNG STREET VIBES", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1100000, hargaPer4Pax: 885000, hargaPer6Pax: 835000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Refreshment, Parkir objek wisata, Tour Leader & Local Guide", tripCategory: "domestik" },
  { id: "pt-d4", destinasi: "1 D - MUSEUM & MONUMEN EXPLORER", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 900000, hargaPer4Pax: 650000, hargaPer6Pax: 480000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d5", destinasi: "1 D - NUANU & PURI EXPERIENCE", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 910000, hargaPer4Pax: 670000, hargaPer6Pax: 515000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d6", destinasi: "1 D - PURI HERITAGE TOUR", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 900000, hargaPer4Pax: 645000, hargaPer6Pax: 465000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d7", destinasi: "1 D - BALI SECRET ESCAPE", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1580000, hargaPer4Pax: 1335000, hargaPer6Pax: 1200000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d8", destinasi: "1 D - Soul Bali Trip", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1220000, hargaPer4Pax: 990000, hargaPer6Pax: 850000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d9", destinasi: "1 D - HIDDEN CULTURE TRIP", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1020000, hargaPer4Pax: 845000, hargaPer6Pax: 635000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d10", destinasi: "1 D - EXPLORE LEMBANG GREEN", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1900000, hargaPer4Pax: 1255000, hargaPer6Pax: 690000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d11", destinasi: "1 D - HARMONY OF HERITAGE", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1110000, hargaPer4Pax: 860000, hargaPer6Pax: 695000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Tiket Masuk objek wisata, Refreshment, Parkir objek wisata", tripCategory: "domestik" },
  { id: "pt-d12", destinasi: "1 D - CAFE & STREET TOUR", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 910000, hargaPer4Pax: 655000, hargaPer6Pax: 490000, status: "Tersedia", includes: "Transportasi Bus Pariwisata AC, Refreshment, Parkir objek wisata, Tour Leader & Local Guide", tripCategory: "domestik" },
  { id: "pt-d13", destinasi: "NAMA PEKET: TOUR 1 HARI BANDUNG - LEMBANG", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1400000, hargaPer4Pax: 1100000, hargaPer6Pax: 850000, status: "Tersedia", includes: "Hotel, Transportasi Private, Guide, Makan", tripCategory: "domestik" },
  { id: "pt-d14", destinasi: "NAMA PEKET: TOUR 1 HARI BANDUNG - PANGALENGAN", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1350000, hargaPer4Pax: 1050000, hargaPer6Pax: 800000, status: "Tersedia", includes: "Hotel, Transportasi Private, Guide, Makan", tripCategory: "domestik" },
  { id: "pt-d15", destinasi: "NAMA PEKET: TOUR 1 HARI BANDUNG SELATAN - CIWIDEY", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1300000, hargaPer4Pax: 1000000, hargaPer6Pax: 750000, status: "Tersedia", includes: "Hotel, Transportasi Private, Guide, Makan", tripCategory: "domestik" },
  { id: "pt-d16", destinasi: "1 D - JOGYA SIGNATURE TRIP", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 1500000, hargaPer4Pax: 1200000, hargaPer6Pax: 950000, status: "Tersedia", includes: "Hotel, Transportasi Private, Guide, Makan", tripCategory: "domestik" },
];

const privateTripInternasional = [
  { id: "pt-i1", destinasi: "Turki (Istanbul & Cappadocia)", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 28000000, hargaPer4Pax: 22000000, hargaPer6Pax: 19000000, status: "Tersedia", includes: "Hotel, Pesawat PP, Visa, Guide Private", tripCategory: "internasional" },
  { id: "pt-i2", destinasi: "Jepang", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 38000000, hargaPer4Pax: 32000000, hargaPer6Pax: 28000000, status: "Tersedia", includes: "Hotel, Pesawat PP, JR Pass, Guide Private", tripCategory: "internasional" },
  { id: "pt-i3", destinasi: "Korea Selatan", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 30000000, hargaPer4Pax: 25000000, hargaPer6Pax: 22000000, status: "Tersedia", includes: "Hotel, Pesawat PP, Visa, Guide Private", tripCategory: "internasional" },
  { id: "pt-i4", destinasi: "Eropa (Paris & Amsterdam)", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 65000000, hargaPer4Pax: 55000000, hargaPer6Pax: 48000000, status: "Tersedia", includes: "Hotel, Pesawat PP, Visa Schengen, Guide Private", tripCategory: "internasional" },
  { id: "pt-i5", destinasi: "Dubai & Abu Dhabi", durasi: "Fleksibel", minPax: 2, hargaPer2Pax: 28000000, hargaPer4Pax: 23000000, hargaPer6Pax: 20000000, status: "Tersedia", includes: "Hotel, Pesawat PP, Desert Safari Private, Guide", tripCategory: "internasional" },
];

async function main() {
  const client = await pool.connect();
  try {
    console.log('Seeding TripSchedule...');
    
    // Clear existing data
    await client.query('DELETE FROM "TripSchedule"');
    await client.query('DELETE FROM "PrivateTripPricing"');
    
    // Insert open trip domestik
    for (const item of openTripDomestik) {
      await client.query(
        `INSERT INTO "TripSchedule" (id, "packageId", destinasi, durasi, "tanggalBerangkat", harga, kuota, tersisa, status, includes, "tripCategory", slug, "hasDetail", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())`,
        [item.id, item.id, item.destinasi, item.durasi, item.tanggalBerangkat, item.harga, item.kuota, item.tersisa, item.status, item.includes, item.tripCategory, item.slug || null, item.hasDetail || false]
      );
    }
    console.log(`Inserted ${openTripDomestik.length} open trip domestik`);
    
    // Insert open trip internasional
    for (const item of openTripInternasional) {
      await client.query(
        `INSERT INTO "TripSchedule" (id, "packageId", destinasi, durasi, "tanggalBerangkat", harga, kuota, tersisa, status, includes, "tripCategory", slug, "hasDetail", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())`,
        [item.id, item.id, item.destinasi, item.durasi, item.tanggalBerangkat, item.harga, item.kuota, item.tersisa, item.status, item.includes, item.tripCategory, item.slug || null, item.hasDetail || false]
      );
    }
    console.log(`Inserted ${openTripInternasional.length} open trip internasional`);
    
    // Insert private trip domestik
    for (const item of privateTripDomestik) {
      // Insert as TripSchedule with type private
      await client.query(
        `INSERT INTO "TripSchedule" (id, "packageId", destinasi, durasi, "tanggalBerangkat", harga, kuota, tersisa, status, includes, "tripCategory", "hasDetail", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())`,
        [item.id, item.id, item.destinasi, item.durasi, 'Fleksibel', item.hargaPer2Pax, 999, 999, item.status, item.includes, 'private_' + item.tripCategory, false]
      );
      // Insert pricing tiers
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_2', item.id, 2, item.hargaPer2Pax]
      );
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_4', item.id, 4, item.hargaPer4Pax]
      );
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_6', item.id, 6, item.hargaPer6Pax]
      );
    }
    console.log(`Inserted ${privateTripDomestik.length} private trip domestik`);
    
    // Insert private trip internasional
    for (const item of privateTripInternasional) {
      await client.query(
        `INSERT INTO "TripSchedule" (id, "packageId", destinasi, durasi, "tanggalBerangkat", harga, kuota, tersisa, status, includes, "tripCategory", "hasDetail", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())`,
        [item.id, item.id, item.destinasi, item.durasi, 'Fleksibel', item.hargaPer2Pax, 999, 999, item.status, item.includes, 'private_internasional', false]
      );
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_2', item.id, 2, item.hargaPer2Pax]
      );
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_4', item.id, 4, item.hargaPer4Pax]
      );
      await client.query(
        `INSERT INTO "PrivateTripPricing" (id, "packageId", pax, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [item.id + '_6', item.id, 6, item.hargaPer6Pax]
      );
    }
    console.log(`Inserted ${privateTripInternasional.length} private trip internasional`);
    
    console.log('Seed completed!');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
