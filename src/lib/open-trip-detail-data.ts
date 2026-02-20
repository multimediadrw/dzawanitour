export interface OpenTripDetail {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration: string;
  category: "domestic" | "international";
  type: "open-trip";
  image: string;
  badge?: string;
  price: {
    low_season: {
      dp: number;
      full: number;
    };
    high_season: {
      dp: number;
      full: number;
    };
  };
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    meals: string;
    description: string;
    hotel: string | null;
    activities: string[];
  }[];
  included: string[];
  excluded: string[];
  notes: string[];
  terms: {
    title: string;
    content: string;
  }[];
  additional_info: {
    title: string;
    content: string;
  }[];
  booking: {
    min_dp_low_season: number;
    min_dp_high_season: number;
    payment_deadline: string;
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
    category: "international",
    type: "open-trip",
    image: "/images/tours/malaysia-singapore.jpg",
    badge: "Hot Deal",
    price: {
      low_season: {
        dp: 3000000,
        full: 8500000,
      },
      high_season: {
        dp: 4500000,
        full: 12000000,
      },
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
        description:
          "Meeting Point bandara KLIA, Peserta berangkat dari masing-masing kota sesuai jadwal penerbangan dan bersiap menuju Kuala Lumpur, tiba di Kuala Lumpur peserta akan di jemput dengan Local guide malaysia dan diantarkan ke hotel di Kuala Lumpur untuk beristirahat (makan siang dan makan malam dilakukan sendiri oleh tamu di sekitar hotel), Acara bebas.",
        hotel: "Areena Star Hotel / setaraf *3 Kuala Lumpur",
        activities: [
          "Tiba di bandara KLIA",
          "Transfer ke hotel dengan local guide",
          "Check in hotel",
          "Free time",
        ],
      },
      {
        day: 2,
        title: "KUALA LUMPUR - GENTING HIGHLAND - PUTRAJAYA - JOHOR BAHRU",
        meals: "B, L, D",
        description:
          "Selesai makan pagi, perjalanan dilanjutkan menuju Genting Highland (photo stop) yang merupakan pusat hiburan keluarga dan arena bermain kasino dengan menggunakan Cable Car (free), makan siang dilokal restoran, mengunjungi Batu Cave Temple (photo stop) yang merupakan kuil India terbesar di Malaysia, berbelanja Makanan Lokal Produk Malaysia, lalu mengunjungi Istana Negara (photo stop) yang merupakan tempat kediaman yang dipertuan agung, menuju KLCC Petronas Twin Tower (photo Stop), mengunjungi Chocolate Factory, perjalanan dilanjutkan menuju Putrajaya (photo stop), Putrajaya adalah merupakan pusat pemerintahan Malaysia, lanjut Makan malam di lokal restoran, lanjut menuju Johor Bahru, check in hotel di Johor Bahru, Istirahat & Acara Bebas.",
        hotel: "Millesime Hotel / setaraf *3 Johor Bahru",
        activities: [
          "Genting Highland + Cable Car (free)",
          "Batu Cave Temple",
          "Istana Negara",
          "KLCC Petronas Twin Tower",
          "Chocolate Factory",
          "Putrajaya City Tour",
          "Transfer ke Johor Bahru",
        ],
      },
      {
        day: 3,
        title: "JOHOR BAHRU - SINGAPORE CITY TOUR - MELAKA",
        meals: "B, L, D",
        description:
          "Setelah makan pagi melanjutkan perjalanan ke Singapore menyebrang ke perbatasan, Tiba Singapore, langsung menuju Singapore Jewel Changi Airport (photo stop), lalu mengunjungi Merlion Park (photo stop), Makan Siang dilokal restoran, Lanjut Tour menuju Sentosa Island, Universal Studio (photo Stop), Photo Stop China Town Temple, lanjut Orchard Road, perjalanan dilanjutkan menuju Border keluar dari singapore dan selanjutnya menuju Melaka, makan malam dilokal restoran, Tiba di Melaka, check in hotel, Istirahat & Acara Bebas.",
        hotel: "Balik Pulau Hotel / setaraf *3 Melaka",
        activities: [
          "Singapore Jewel Changi Airport",
          "Merlion Park",
          "Sentosa Island",
          "Universal Studio (photo stop)",
          "China Town Temple",
          "Orchard Road",
          "Transfer ke Melaka",
        ],
      },
      {
        day: 4,
        title: "MELAKA - KUALA LUMPUR",
        meals: "B, L",
        description:
          "Setelah makan pagi, Tour Melaka (photo stop) mengunjungi Gedung Merah Melaka, Benteng Portugis, Jonker Street, dll. Lanjut perjalanan ke Kuala Lumpur, makan siang dilokal restoran, check in hotel, Istirahat & Acara Bebas.",
        hotel: "Alamis Hotel / setaraf *3 Kuala Lumpur",
        activities: [
          "Gedung Merah Melaka",
          "Benteng Portugis",
          "Jonker Street",
          "Transfer ke Kuala Lumpur",
          "Free time",
        ],
      },
      {
        day: 5,
        title: "TRANSFER OUT",
        meals: "B",
        description:
          "Free time sambil menunggu schedule keberangkatan ke masing-masing kota peserta. Acara Tour Selesai.",
        hotel: null,
        activities: ["Free time", "Transfer ke airport", "Penerbangan kembali"],
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
    excluded: [
      "Bagasi Pesawat PP",
      "Optional Tour",
      "Biaya Single Supplement (Bila mau 1 kamar sendiri)",
      "Tipping untuk pemandu wisata dan driver Rp 450.000",
      "Asuransi perjalanan cover covid-19 Rp 170.000/orang (Opsional)",
      "Makan dan minum diluar program",
      "Biaya pengeluaran pribadi selama tour berlangsung",
    ],
    notes: [
      "Program dan Harga Tour masih dapat berubah sewaktu-waktu",
      "Kebijakan karantina mengikuti regulasi pemerintah setempat",
      "Harga paket minimal pendaftaran 2 orang",
      "Pengaturan kamar akan dipertimbangkan jenis kelamin dan hubungan kekeluargaan",
      "Jika jumlah akhir ganjil akan sekemar bertiga (triple room)",
    ],
    terms: [
      {
        title: "Pembatalan",
        content:
          "DP & Pembayaran yang sudah masuk tidak dapat dibatalkan / dipindah tangankan / dipindahkan jadwal. Jika peserta membatalkan trip maka tidak ada pengembalian.",
      },
      {
        title: "Airlines Force Majeure",
        content:
          "Force majure seperti pembatalan / keterlambatan / perubahan peraturan bagasi / hambatan lain penerbangan yg disebabkan oleh pihak maskapai ataupun hal lain, hambatan transportasi lokal, kerusuhan & lain sebagainya, maka pihak travel agent tidak dapat dituntut & segala kerugian yg disebabkan hal tersebut jika ada maka menjadi tanggungan peserta tour.",
      },
      {
        title: "Visa",
        content:
          "Proses persetujuan visa adalah sepenuhnya wewenang kedutaan dan tidak dapat di Intervensi oleh pihak manapun. Apabila visa ditolak maka tidak ada pengembalian atas biaya visa, asuransi, DP tour, dan biaya lain yang sudah terbayarkan ke airlines/hotel/partner.",
      },
      {
        title: "Imigrasi",
        content:
          "Imigrasi negara yang dikunjungi memiliki hak untuk menerima dan menolak tamu untuk berkunjung. Apabila ditolak, pihak travel agent tidak bertanggung jawab akan hal ini.",
      },
      {
        title: "Local Force Majeure",
        content:
          "Dalam keadaan Force Majeure / terpaksa / tidak teratasi karena bencana alam, kerusuhan, suasana mencekam dan lain-lain, rencana perjalanan dapat dirubah baik susunan maupun jadwalnya tanpa pemberitahuan terlebih dahulu, hal ini demi kepentingan dan keamanan seluruh rombongan tour.",
      },
    ],
    additional_info: [
      {
        title: "Single Supplement",
        content: "IDR 1.500.000 (Low Season), IDR 2.250.000 (High Season)",
      },
      {
        title: "Passport Validity",
        content: "Minimal 8 bulan dari tanggal kedatangan kembali ke tanah air",
      },
      {
        title: "Kesehatan",
        content: "Peserta yang mengikuti tour harus dalam keadaan sehat jasmani dan rohani",
      },
    ],
    booking: {
      min_dp_low_season: 3000000,
      min_dp_high_season: 4500000,
      payment_deadline: "H-20 sebelum berangkat",
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
