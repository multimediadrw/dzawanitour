export interface OpenTripDetail {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration: string;
  duration_en?: string;
  category: "domestic" | "international";
  type: "open-trip";
  image: string;
  badge?: string;
  price: {
    low_season: { dp: number; full: number };
    high_season: { dp: number; full: number };
  };
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    meals: string;
    description: string;
    description_en?: string;
    hotel: string | null;
    activities: string[];
    activities_en?: string[];
  }[];
  included: string[];
  included_en?: string[];
  excluded: string[];
  excluded_en?: string[];
  notes: string[];
  notes_en?: string[];
  terms: { title: string; title_en?: string; content: string; content_en?: string }[];
  additional_info: { title: string; title_en?: string; content: string; content_en?: string }[];
  booking: {
    min_dp_low_season: number;
    min_dp_high_season: number;
    payment_deadline: string;
    payment_deadline_en?: string;
    min_participants: number;
  };
}

export const openTripDetailData: OpenTripDetail[] = [
  {
    id: "malaysia-singapore-5d4n",
    title: "Tour 2 Negara Asia - Malaysia & Singapore",
    slug: "malaysia-singapore-5d4n",
    destination: "Malaysia & Singapore",
    duration: "5 Hari 4 Malam",
    duration_en: "5 Days 4 Nights",
    category: "international",
    type: "open-trip",
    image: "/images/tours/malaysia-singapore.jpg",
    badge: "Hot Deal",
    price: {
      low_season: { dp: 3000000, full: 8500000 },
      high_season: { dp: 4500000, full: 12000000 },
    },
    highlights: [
      "Genting Highland Cable Car",
      "Singapore Jewel Changi Airport",
      "Universal Studio Sentosa",
      "Petronas Twin Tower KLCC",
      "Merlion Park Singapore",
      "Putrajaya City Tour",
    ],
    itinerary: [
      {
        day: 1,
        title: "KUALA LUMPUR",
        meals: "No Meal",
        description: "Meeting Point bandara KLIA, Peserta berangkat dari masing-masing kota sesuai jadwal penerbangan dan bersiap menuju Kuala Lumpur, tiba di Kuala Lumpur peserta akan di jemput dengan Local guide malaysia dan diantarkan ke hotel di Kuala Lumpur untuk beristirahat (makan siang dan makan malam dilakukan sendiri oleh tamu di sekitar hotel), Acara bebas.",
        description_en: "Meeting Point at KLIA Airport. Participants depart from their respective cities according to their flight schedules and head to Kuala Lumpur. Upon arrival, participants will be picked up by the local Malaysian guide and taken to the hotel to rest (lunch and dinner at own expense near the hotel). Free time.",
        hotel: "Areena Star Hotel / setaraf *3 Kuala Lumpur",
        activities: ["Tiba di bandara KLIA", "Transfer ke hotel dengan local guide", "Check in hotel", "Free time"],
        activities_en: ["Arrive at KLIA Airport", "Transfer to hotel with local guide", "Hotel check-in", "Free time"],
      },
      {
        day: 2,
        title: "KUALA LUMPUR - GENTING HIGHLAND - PUTRAJAYA - JOHOR BAHRU",
        meals: "B, L, D",
        description: "Selesai makan pagi, perjalanan dilanjutkan menuju Genting Highland (photo stop) yang merupakan pusat hiburan keluarga dan arena bermain kasino dengan menggunakan Cable Car (free), makan siang dilokal restoran, mengunjungi Batu Cave Temple (photo stop) yang merupakan kuil India terbesar di Malaysia, berbelanja Makanan Lokal Produk Malaysia, lalu mengunjungi Istana Negara (photo stop), menuju KLCC Petronas Twin Tower (photo Stop), mengunjungi Chocolate Factory, perjalanan dilanjutkan menuju Putrajaya (photo stop), lanjut Makan malam di lokal restoran, lanjut menuju Johor Bahru, check in hotel di Johor Bahru, Istirahat & Acara Bebas.",
        description_en: "After breakfast, continue to Genting Highland (photo stop), a family entertainment and casino resort, using the Cable Car (free). Lunch at a local restaurant. Visit Batu Cave Temple (photo stop), the largest Hindu temple in Malaysia. Shop for local Malaysian products. Visit Istana Negara (photo stop). Head to KLCC Petronas Twin Tower (photo stop). Visit Chocolate Factory. Continue to Putrajaya (photo stop). Dinner at a local restaurant. Head to Johor Bahru, check in hotel. Rest and free time.",
        hotel: "Millesime Hotel / setaraf *3 Johor Bahru",
        activities: ["Genting Highland + Cable Car (free)", "Batu Cave Temple", "Istana Negara", "KLCC Petronas Twin Tower", "Chocolate Factory", "Putrajaya City Tour", "Transfer ke Johor Bahru"],
        activities_en: ["Genting Highland + Cable Car (free)", "Batu Cave Temple", "Istana Negara", "KLCC Petronas Twin Tower", "Chocolate Factory", "Putrajaya City Tour", "Transfer to Johor Bahru"],
      },
      {
        day: 3,
        title: "JOHOR BAHRU - SINGAPORE CITY TOUR - MELAKA",
        meals: "B, L, D",
        description: "Setelah makan pagi melanjutkan perjalanan ke Singapore menyebrang ke perbatasan, Tiba Singapore, langsung menuju Singapore Jewel Changi Airport (photo stop), lalu mengunjungi Merlion Park (photo stop), Makan Siang dilokal restoran, Lanjut Tour menuju Sentosa Island, Universal Studio (photo Stop), Photo Stop China Town Temple, lanjut Orchard Road, perjalanan dilanjutkan menuju Border keluar dari singapore dan selanjutnya menuju Melaka, makan malam dilokal restoran, Tiba di Melaka, check in hotel, Istirahat & Acara Bebas.",
        description_en: "After breakfast, continue to Singapore crossing the border. Upon arrival, head directly to Singapore Jewel Changi Airport (photo stop), then visit Merlion Park (photo stop). Lunch at a local restaurant. Continue to Sentosa Island, Universal Studio (photo stop). Photo stop at China Town Temple, then Orchard Road. Cross back to Malaysia and head to Melaka. Dinner at a local restaurant. Arrive in Melaka, check in hotel. Rest and free time.",
        hotel: "Balik Pulau Hotel / setaraf *3 Melaka",
        activities: ["Singapore Jewel Changi Airport", "Merlion Park", "Sentosa Island", "Universal Studio (photo stop)", "China Town Temple", "Orchard Road", "Transfer ke Melaka"],
        activities_en: ["Singapore Jewel Changi Airport", "Merlion Park", "Sentosa Island", "Universal Studio (photo stop)", "China Town Temple", "Orchard Road", "Transfer to Melaka"],
      },
      {
        day: 4,
        title: "MELAKA - KUALA LUMPUR",
        meals: "B, L",
        description: "Setelah makan pagi, Tour Melaka (photo stop) mengunjungi Gedung Merah Melaka, Benteng Portugis, Jonker Street, dll. Lanjut perjalanan ke Kuala Lumpur, makan siang dilokal restoran, check in hotel, Istirahat & Acara Bebas.",
        description_en: "After breakfast, Melaka City Tour (photo stop) visiting Stadthuys (Red Building), Portuguese Fortress, Jonker Street, etc. Continue to Kuala Lumpur, lunch at a local restaurant, check in hotel. Rest and free time.",
        hotel: "Alamis Hotel / setaraf *3 Kuala Lumpur",
        activities: ["Gedung Merah Melaka", "Benteng Portugis", "Jonker Street", "Transfer ke Kuala Lumpur", "Free time"],
        activities_en: ["Stadthuys (Red Building) Melaka", "Portuguese Fortress", "Jonker Street", "Transfer to Kuala Lumpur", "Free time"],
      },
      {
        day: 5,
        title: "TRANSFER OUT",
        meals: "B",
        description: "Free time sambil menunggu schedule keberangkatan ke masing-masing kota peserta. Acara Tour Selesai.",
        description_en: "Free time while waiting for departure schedules to respective home cities. Tour program ends.",
        hotel: null,
        activities: ["Free time", "Transfer ke airport", "Penerbangan kembali"],
        activities_en: ["Free time", "Transfer to airport", "Return flight"],
      },
    ],
    included: [
      "Tiket Pesawat JKT-KUL PP",
      "Bagasi Kabin 7 Kg",
      "Bus pariwisata AC",
      "4 malam hotel *3 setaraf sekamar berdua/bertiga (twin/triple)",
      "Makan pagi, siang dan malam sesuai dengan jadwal",
      "Tiket biaya masuk wisata yang tercantum",
      "Pemandu wisata yang ramah dan berpengalaman",
    ],
    included_en: [
      "Round-Trip Flight Ticket JKT-KUL",
      "7 Kg Cabin Baggage",
      "AC Tourism Bus",
      "4 nights *3 hotel (twin/triple sharing)",
      "Breakfast, lunch and dinner as per schedule",
      "Entrance tickets to listed attractions",
      "Friendly and experienced tour guide",
    ],
    excluded: [
      "Bagasi Pesawat PP",
      "Optional Tour",
      "Biaya Single Supplement (Bila mau 1 kamar sendiri)",
      "Tipping untuk pemandu wisata dan driver Rp 450.000",
      "Asuransi perjalanan cover covid-19 Rp 170.000/orang (Opsional)",
      "Makan dan minum diluar program",
      "Biaya pengeluaran pribadi selama tour berlangsung",
    ],
    excluded_en: [
      "Round-trip checked baggage",
      "Optional tours",
      "Single supplement fee (if single room is desired)",
      "Tips for tour guide and driver IDR 450,000",
      "Travel insurance with covid-19 coverage IDR 170,000/person (Optional)",
      "Meals and drinks outside the program",
      "Personal expenses during the tour",
    ],
    notes: [
      "Program dan Harga Tour masih dapat berubah sewaktu-waktu",
      "Kebijakan karantina mengikuti regulasi pemerintah setempat",
      "Harga paket minimal pendaftaran 2 orang",
      "Pengaturan kamar akan dipertimbangkan jenis kelamin dan hubungan kekeluargaan",
      "Jika jumlah akhir ganjil akan sekemar bertiga (triple room)",
    ],
    notes_en: [
      "Tour program and prices are subject to change at any time",
      "Quarantine policy follows local government regulations",
      "Minimum package registration is 2 persons",
      "Room arrangements will consider gender and family relationships",
      "If the final number is odd, participants will share a triple room",
    ],
    terms: [
      {
        title: "Pembatalan",
        title_en: "Cancellation",
        content: "DP & Pembayaran yang sudah masuk tidak dapat dibatalkan / dipindah tangankan / dipindahkan jadwal. Jika peserta membatalkan trip maka tidak ada pengembalian.",
        content_en: "DP & payments that have been made cannot be cancelled, transferred, or rescheduled. If a participant cancels the trip, there will be no refund.",
      },
      {
        title: "Airlines Force Majeure",
        title_en: "Airlines Force Majeure",
        content: "Force majure seperti pembatalan / keterlambatan / perubahan peraturan bagasi / hambatan lain penerbangan yg disebabkan oleh pihak maskapai ataupun hal lain, hambatan transportasi lokal, kerusuhan & lain sebagainya, maka pihak travel agent tidak dapat dituntut & segala kerugian yg disebabkan hal tersebut jika ada maka menjadi tanggungan peserta tour.",
        content_en: "Force majeure such as cancellation / delay / changes in baggage regulations / other flight disruptions caused by the airline or other factors, local transportation disruptions, riots, etc., the travel agent cannot be held liable and any losses shall be borne by the tour participants.",
      },
      {
        title: "Visa",
        title_en: "Visa",
        content: "Proses persetujuan visa adalah sepenuhnya wewenang kedutaan dan tidak dapat di Intervensi oleh pihak manapun. Apabila visa ditolak maka tidak ada pengembalian atas biaya visa, asuransi, DP tour, dan biaya lain yang sudah terbayarkan ke airlines/hotel/partner.",
        content_en: "The visa approval process is entirely at the discretion of the embassy and cannot be intervened by any party. If the visa is rejected, there will be no refund for visa fees, insurance, tour DP, and other costs already paid to airlines/hotels/partners.",
      },
      {
        title: "Imigrasi",
        title_en: "Immigration",
        content: "Imigrasi negara yang dikunjungi memiliki hak untuk menerima dan menolak tamu untuk berkunjung. Apabila ditolak, pihak travel agent tidak bertanggung jawab akan hal ini.",
        content_en: "The immigration authority of the visited country has the right to accept or deny entry to visitors. If denied entry, the travel agent is not responsible for this.",
      },
      {
        title: "Local Force Majeure",
        title_en: "Local Force Majeure",
        content: "Dalam keadaan Force Majeure / terpaksa / tidak teratasi karena bencana alam, kerusuhan, suasana mencekam dan lain-lain, rencana perjalanan dapat dirubah baik susunan maupun jadwalnya tanpa pemberitahuan terlebih dahulu, hal ini demi kepentingan dan keamanan seluruh rombongan tour.",
        content_en: "In the event of Force Majeure / unavoidable situations due to natural disasters, riots, tense situations, etc., the travel itinerary may be changed without prior notice, in the interest and safety of the entire tour group.",
      },
    ],
    additional_info: [
      {
        title: "Single Supplement",
        title_en: "Single Supplement",
        content: "IDR 1.500.000 (Low Season), IDR 2.250.000 (High Season)",
        content_en: "IDR 1,500,000 (Low Season), IDR 2,250,000 (High Season)",
      },
      {
        title: "Passport Validity",
        title_en: "Passport Validity",
        content: "Minimal 8 bulan dari tanggal kedatangan kembali ke tanah air",
        content_en: "Minimum 8 months from the return date to home country",
      },
      {
        title: "Kesehatan",
        title_en: "Health",
        content: "Peserta yang mengikuti tour harus dalam keadaan sehat jasmani dan rohani",
        content_en: "Participants joining the tour must be in good physical and mental health",
      },
    ],
    booking: {
      min_dp_low_season: 3000000,
      min_dp_high_season: 4500000,
      payment_deadline: "H-20 sebelum berangkat",
      payment_deadline_en: "20 days before departure",
      min_participants: 2,
    },
  },
];

export function getOpenTripBySlug(slug: string): OpenTripDetail | undefined {
  return openTripDetailData.find((trip) => trip.slug === slug);
}

export function getAllOpenTripSlugs(): string[] {
  return openTripDetailData.map((trip) => trip.slug);
}
