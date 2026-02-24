# Admin Panel - Dzawani Tour

## 🔐 Login Credentials

**URL**: https://dzawanitour.vercel.app/admin/login

**Email/Username**: multimediadrw@gmail.com  
**Password**: Rahasiakita.88!

## 📊 Dashboard

**URL**: https://dzawanitour.vercel.app/admin/dashboard

### Fitur Yang Sudah Ada (Phase 1):

✅ **Authentication**
- Login dengan email atau username
- JWT token authentication
- Protected routes
- Logout functionality

✅ **Dashboard Overview**
- Statistics cards (Total Paket Tour, Destinasi, Testimoni, FAQ)
- Quick actions menu
- System information
- Database connection status

✅ **Sidebar Navigation**
- Dashboard
- Paket Tour
- Destinasi
- Testimoni
- FAQ
- Hero Slides
- Features
- Artikel
- Pengaturan

✅ **Database Schema**
- User (admin authentication)
- TourPackage
- Destination
- Testimonial
- FAQ
- HeroSlide
- Setting
- Feature
- Article

## 🚧 Fitur Yang Belum (Phase 2):

Untuk melengkapi admin panel, masih perlu:

- [ ] **CRUD Paket Tour**: Form create/edit dengan upload gambar
- [ ] **CRUD Destinasi**: Kelola destinasi wisata
- [ ] **CRUD Testimoni**: Kelola testimoni pelanggan
- [ ] **CRUD FAQ**: Kelola pertanyaan umum
- [ ] **CRUD Hero Slides**: Kelola gambar carousel homepage
- [ ] **CRUD Features**: Kelola keunggulan perusahaan
- [ ] **CRUD Artikel**: Kelola blog/artikel
- [ ] **Settings**: Edit kontak, alamat, email, sosial media
- [ ] **Image Upload**: Integrasi cloud storage (Cloudinary/S3)
- [ ] **Rich Text Editor**: Untuk deskripsi paket/artikel
- [ ] **Bulk Operations**: Delete/update multiple items

## 🗄️ Database Information

**Host**: 213.190.4.159  
**Port**: 5432  
**Database**: dzawanitour  
**Username**: berkomunitas  
**Password**: berkomunitas688

**Adminer URL**: http://213.190.4.159:8088/?pgsql=berkomunitas-postgres&username=berkomunitas&db=dzawanitour&ns=public

## 🔧 Environment Variables (Vercel)

Sudah di-set di Vercel Dashboard:

```env
DATABASE_URL="postgresql://berkomunitas:berkomunitas688@213.190.4.159/dzawanitour"
JWT_SECRET="dzawanitour-secret-key-2026"
```

## 📝 Notes

- Admin panel sudah **LIVE** dan bisa diakses
- Login berhasil dengan email atau username
- Dashboard menampilkan statistics dan quick actions
- Database connected dan berfungsi dengan baik
- Semua tabel sudah dibuat di database

## 🎯 Next Steps

1. Implementasi form CRUD untuk setiap modul
2. Tambahkan image upload functionality
3. Integrasi rich text editor
4. Tambahkan validation dan error handling yang lebih baik
5. Implementasi bulk operations
6. Tambahkan user management (jika perlu multiple admin)

---

**Created**: 24 February 2026  
**Version**: 1.0.0  
**Status**: ✅ Phase 1 Complete
