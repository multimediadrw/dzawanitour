# 🎯 Dzawani Tour - Admin Panel Documentation

## 📋 Overview

Sistem admin panel lengkap untuk mengelola konten website Dzawani Tour dengan fitur authentication dan CRUD operations.

---

## 🗄️ Database Setup

### Database Information
- **Host**: 213.190.4.159
- **Port**: 5432
- **Database**: dzawanitour
- **Username**: berkomunitas
- **Password**: berkomunitas688

### Database Tables
1. **User** - Admin users dengan authentication
2. **TourPackage** - Paket tour (Open Trip & Private Trip)
3. **Destination** - Destinasi wisata
4. **Testimonial** - Testimoni pelanggan
5. **FAQ** - Frequently Asked Questions
6. **HeroSlide** - Gambar carousel hero section
7. **Setting** - Pengaturan website (kontak, email, alamat)
8. **Feature** - Fitur "Mengapa Dzawani Tour"
9. **Article** - Blog/artikel (optional)

---

## 🔐 Admin User Credentials

**Email**: multimediadrw@gmail.com  
**Password**: Rahasiakita.88!

---

## 🚀 Deployment Setup

### 1. Set Environment Variables di Vercel

Anda perlu menambahkan environment variables berikut di Vercel Dashboard:

1. Buka https://vercel.com/dashboard
2. Pilih project **dzawanitour**
3. Klik **Settings** → **Environment Variables**
4. Tambahkan variabel berikut:

```env
DATABASE_URL="postgresql://berkomunitas:berkomunitas688@213.190.4.159/dzawanitour"
JWT_SECRET="dzawanitour-secret-key-2024-very-secure-random-string"
```

5. Klik **Save**
6. **Redeploy** project agar environment variables ter-apply

### 2. Cara Redeploy

- Klik tab **Deployments**
- Klik titik tiga (...) pada deployment terakhir
- Pilih **Redeploy**

---

## 📱 Accessing Admin Panel

### Login Page
```
https://dzawanitour.vercel.app/admin/login
```

### Dashboard
```
https://dzawanitour.vercel.app/admin/dashboard
```

### Packages Management
```
https://dzawanitour.vercel.app/admin/dashboard/packages
```

---

## 🛠️ Features Implemented

### ✅ Phase 1 (Current)
- [x] Database schema dan migrasi
- [x] Admin authentication dengan JWT
- [x] Login page dengan form validation
- [x] Dashboard layout dengan sidebar navigation
- [x] Dashboard overview dengan statistics
- [x] Packages list dengan pagination dan search
- [x] Delete package functionality
- [x] API routes untuk CRUD operations

### 🚧 Phase 2 (Next Steps)
- [ ] Form create/edit paket tour dengan upload gambar
- [ ] CRUD untuk Destinasi
- [ ] CRUD untuk Testimoni
- [ ] CRUD untuk FAQ
- [ ] CRUD untuk Hero Slides
- [ ] CRUD untuk Settings
- [ ] CRUD untuk Features
- [ ] Image upload ke cloud storage (Cloudinary/S3)
- [ ] Rich text editor untuk deskripsi
- [ ] Bulk operations (delete, update status)
- [ ] Export data (CSV/Excel)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── dashboard/
│   │       ├── layout.tsx        # Admin layout dengan sidebar
│   │       ├── page.tsx          # Dashboard overview
│   │       └── packages/
│   │           └── page.tsx      # Packages management
│   └── api/
│       └── admin/
│           ├── auth/
│           │   └── login/
│           │       └── route.ts  # Login API
│           ├── stats/
│           │   └── route.ts      # Dashboard stats API
│           └── packages/
│               ├── route.ts      # GET all, POST create
│               └── [id]/
│                   └── route.ts  # GET, PUT, DELETE by ID
├── lib/
│   └── prisma.ts                 # Prisma Client instance
└── prisma/
    └── schema.prisma             # Database schema
```

---

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma v7 dengan adapter-pg
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Icons**: lucide-react

---

## 📝 API Endpoints

### Authentication
```
POST /api/admin/auth/login
Body: { email, password }
Response: { token, user }
```

### Dashboard Stats
```
GET /api/admin/stats
Headers: Authorization: Bearer <token>
Response: { totalPackages, totalDestinations, totalTestimonials, totalFAQs }
```

### Packages
```
GET /api/admin/packages
GET /api/admin/packages?search=bali&type=open_trip&category=domestik&page=1&limit=10
POST /api/admin/packages
GET /api/admin/packages/:id
PUT /api/admin/packages/:id
DELETE /api/admin/packages/:id
```

---

## 🔒 Security

- Passwords di-hash menggunakan bcryptjs dengan salt rounds 10
- JWT token untuk authentication dengan expiry 7 hari
- Environment variables tidak di-commit ke Git
- Database credentials hanya di .env (tidak di code)

---

## 🐛 Troubleshooting

### Build Error: Prisma Client
Jika ada error "PrismaClient needs to be constructed with adapter":
```bash
npx prisma generate
```

### Database Connection Error
Pastikan:
1. DATABASE_URL sudah di-set di environment variables
2. IP Vercel sudah di-whitelist di firewall database server
3. Database dzawanitour sudah dibuat

### JWT Error
Pastikan JWT_SECRET sudah di-set di environment variables Vercel

---

## 📞 Support

Jika ada masalah atau pertanyaan, hubungi:
- Email: multimediadrw@gmail.com
- WhatsApp: 08112222254

---

## 📅 Version History

### v1.0.0 (2024-02-24)
- Initial admin panel setup
- Authentication system
- Packages management (list & delete)
- Dashboard overview

---

**Last Updated**: 2024-02-24  
**Status**: ✅ Phase 1 Complete - Ready for Phase 2
