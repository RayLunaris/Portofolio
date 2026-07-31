# Product Requirement Document (PRD)
## Website Portofolio Personal (Single-Page Landing Page)

---

## 1. Informasi Dokumen & Ringkasan Proyek

### 1.1 Informasi Dokumen
* **Judul Proyek:** Personal Portfolio Landing Page
* **Versi Dokumen:** 1.2.0
* **Tanggal:** 31 Juli 2026
* **Tim / Stakeholder:**
  * **Product Owner / Client:** Pemilik Portofolio (Luca)
  * **Product Manager:** Lead PM
  * **UI/UX Designer:** Lead Designer
  * **Frontend Developer:** HTML/CSS/JS Developer

### 1.2 Executive Summary
Website ini merupakan *single-page landing page* portofolio profesional yang dibangun murni menggunakan **HTML5, CSS3, dan Vanilla JavaScript (ES6+)**. Ditujukan untuk membangun *personal branding*, memamerkan keahlian teknis serta galeri proyek terbaik, menampilkan ulasan positif, dan memfasilitasi komunikasi langsung dengan calon klien maupun *recruiter*. Tampilan website mengusung tema *clean, minimalist, light mode* dengan aksen warna ungu sesuai referensi desain.

---

## 2. Latar Belakang & Tujuan (Goals & Metrics)

### 2.1 Problem Statement
* Belum tersedianya wadah terpusat yang profesional dan representatif untuk menampilkan karya, proyek, dan keahlian secara visual menarik.
* Perlunya media kontak langsung yang responsif dan dapat diakses dengan cepat dari berbagai perangkat tanpa membebankan pengguna dengan waktu muat (*page load*) yang lambat.

### 2.2 Business Goals
* Membangun reputasi dan *personal branding* yang profesional sebagai Frontend Developer.
* Menarik minat calon klien *freelance*, *hiring manager*, dan *recruiter*.
* Meningkatkan konversi pengunjung menjadi *lead* atau pesan masuk pekerjaan.

### 2.3 Success Metrics (KPI)
* **Page Load Speed:** Kurang dari 2 detik pada jaringan standar.
* **Google PageSpeed Insights Score:** > 90/100 (Desktop & Mobile).
* **Conversion Rate:** Minimal 5% pengunjung mengklik tombol CTA atau mengirim pesan melalui formulir kontak.
* **Responsivitas:** 100% tampilan presisi pada perangkat Mobile, Tablet, dan Desktop.

---

## 3. Target Pengguna (User Persona)

| Tipe Pengguna | Karakteristik | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Recruiter / HR** | Membutuhkan informasi cepat tentang latar belakang dan keahlian teknis kandidat. | Tampilan ringkas, mudah mengunduh CV/melihat proyek, dan akses kontak cepat. |
| **Engineering Manager** | Ingin melihat bukti kualitas kode, *tech stack*, dan proyek nyata yang pernah dikerjakan. | Link langsung ke *Live Demo* & repositori GitHub dengan visual proyek yang jelas. |
| **Calon Klien Freelance** | Mencari profesional yang terpercaya untuk menyelesaikan proyek *web development*. | Testimoni klien, galeri karya beresolusi tinggi, serta formulir kontak langsung. |

---

## 4. Spesifikasi Fungsional (Functional Requirements)

### 4.1 Header & Navigation Bar
* **Fitur & Komponen:**
  * **Brand Logo:** Teks logo tebal di pojok kiri atas (misal: `LucaDCZ.`).
  * **Navigasi Utama:** Tautan *smooth scroll* ke bagian `#home`, `#projects`, `#about`, `#skills`, `#testimonials`, dan `#contact`.
  * **Sticky Header:** Navigasi tetap berada di atas layar saat halaman di-*scroll* dengan efek *backdrop blur*.
  * **Mobile Nav:** Menu *hamburger* interaktif untuk tampilan layar kecil (Mobile).

### 4.2 Hero Section
* **Fitur & Komponen:**
  * **Greeting Badge:** Text badge dengan emoji (misal: `"Hey, I'm Luca 👋"`).
  * **Main Headline:** Judul profesi tebal (misal: `"Frontend Developer"`) dengan aksen warna ungu pada kata kunci.
  * **Sub-headline:** Deskripsi singkat 1–2 kalimat mengenai lokasi, spesialisasi, dan *value proposition*.
  * **Call-to-Action (CTA):**
    * Tombol Utama (Dark `#18181B`): `"Get In Touch"` (mengarahkan ke `#contact`).
    * Tombol Sekunder (Light Gray `#F3F4F6`): `"Browse Projects"` (mengarahkan ke `#projects`).
  * **Hero Image:** Foto profil lingkaran di sisi kanan dengan *border ring* bernuansa ungu halus.

### 4.3 Tentang Saya (About Me)
* **Fitur & Komponen:**
  * Ringkasan narasi perjalanan karier, edukasi, dan minat di bidang pengembangan web.
  * *Metrics counter* singkat (misal: "3+ Tahun Pengalaman", "20+ Proyek Selesai", "10+ Klien Puas").

### 4.4 Keahlian & Alat (Skills & Tools)
* **Fitur & Komponen:**
  * Pengelompokan kategori teknis (Frontend, Design, Tools).
  * Kartu/Badge interaktif memuat ikon dan nama teknologi (HTML5, CSS3, JavaScript ES6+, Tailwind CSS, Figma, Git, GitHub).

### 4.5 Galeri Karya (Portfolio / Projects)
* **Fitur & Komponen:**
  * *Grid layout* berisi kartu proyek (*project cards*).
  * Gambar pratinjau proyek beresolusi tinggi dengan sudut tumpul (*rounded corners*).
  * Judul proyek, deskripsi masalah & solusi, serta *badges tech stack*.
  * Tombol tautan langsung ke **Live Demo** dan **Source Code (GitHub)**.

### 4.6 Testimoni Klien & Rekan Kerja
* **Fitur & Komponen:**
  * Kartu ulasan (*testimonial card*) berisi kutipan penilaian positif.
  * Foto profil pengulas, nama lengkap, jabatan, dan nama perusahaan/klien.

### 4.7 Formulir Kontak & Media Sosial
* **Fitur & Komponen:**
  * **Formulir Pesan:** Input Nama, Email, Subjek, dan Pesan dengan validasi JavaScript di sisi klien.
  * Tautan langsung ke Email (`mailto:`) dan WhatsApp.
  * **Tautan Media Sosial:** Ikon interaktif terhubung ke profil LinkedIn, GitHub, Instagram, dan Twitter/X.

> **Catatan Sistem:** Fitur Autentikasi (Login/Register) dan CMS Admin **tidak diterapkan** karena website ini bersifat *Static Single-Page Landing Page*.

---

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 5.1 Performa
* *Page load time* di bawah 2 detik.
* Gambar dioptimalkan menggunakan format modern (WebP/AVIF) dengan fitur *native lazy loading* (`loading="lazy"`).
* *Minification* file CSS dan JavaScript saat peluncuran.

### 5.2 Kompatibilitas & Responsivitas
* *Responsive Web Design* (RWD) menggunakan CSS Flexbox & CSS Grid.
* Kompatibel penuh dengan browser populer (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).

### 5.3 Keamanan & Privasi
* Wajib disajikan melalui protokol **HTTPS / SSL**.
* Validasi dan pembersihan (*sanitization*) input formulir kontak pada JavaScript untuk mencegah celah *Cross-Site Scripting* (XSS).

### 5.4 SEO & Aksesibilitas (a11y)
* Struktur HTML5 Semantik (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Metadata SEO lengkap (Title Tag, Meta Description, Open Graph untuk pratinjau media sosial).
* Penerapan atribut `alt` pada semua gambar dan atribut `aria-label` untuk navigasi pembaca layar (*screen reader*).
* Kontras warna memenuhi standar WCAG 2.1 AA.

---

## 6. Desain & Alur Pengguna (UI/UX & User Flow)

### 6.1 Structure / Sitemap
```
Single Page Layout:
├── [Header] Logo & Navigation Bar
├── [Hero Section] Salam, Headline, CTA, & Profile Photo
├── [About Section] Biografi & Statistik
├── [Skills Section] Daftar Keahlian & Tools
├── [Projects Section] Galeri Proyek & Demo Links
├── [Testimonials Section] Testimoni & Review Klien
├── [Contact Section] Form Kontak & Informasi Email
└── [Footer] Hak Cipta & Tautan Media Sosial
```

### 6.2 User Flow
```
Pengunjung Masuk Landing Page
       │
       ├──► Membaca Hero Section & Klik CTA ("Browse Projects" / "Get In Touch")
       │
       ├──► Menerusur Section "About Me" & "Skills"
       │
       ├──► Melihat "Galeri Karya" (Mengklik Live Demo / Repositori GitHub)
       │
       ├──► Membaca "Testimoni Klien"
       │
       └──► Mengisi Formulir Kontak / Mengklik Ikon Social Media
```

### 6.3 Tautan Desain & Panduan Visual
* **Theme Concept:** Clean Light Theme.
* **Main Colors:**
  * Primary Background: White (`#FFFFFF`)
  * Secondary Background: Soft Light Gray (`#F9FAFB`)
  * Accent Purple: Violet (`#8B5CF6`)
  * Dark Button: Black Slate (`#18181B`)
* **Reference UI:** Sesuai *mockup design* terlampir.

---

## 7. Batasan Proyek (Out of Scope)

Untuk mencegah pembengkakan cakupan (*scope creep*), hal-hal berikut **TIDAK** termasuk dalam pengerjaan fase ini:
* **Penggunaan Framework JS/CSS:** Tidak menggunakan React, Vue, Next.js, Angular, maupun Tailwind/Bootstrap (murni Vanilla HTML, CSS, JS).
* **Backend Kustom & Database:** Tidak ada server kustom, database MySQL/PostgreSQL, atau pendaftaran akun pengguna.
* **CMS Dashboard:** Pengelolaan konten dilakukan langsung melalui pengeditan file HTML/JS statis.
* **Aplikasi Mobile Native:** Tidak membuat aplikasi iOS/Android.

---

## 8. Integrasi & Spesifikasi Teknis

### 8.1 Tech Stack Wajib
* **HTML:** HTML5 Semantik.
* **CSS:** CSS3 murni (menggunakan *CSS Custom Properties/Variables*, *Flexbox*, dan *CSS Grid*).
* **JavaScript:** Vanilla JavaScript (ES6+) untuk *smooth scroll*, interaksi menu mobile, dan validasi form.

### 8.2 Integrasi Pihak Ketiga (Third-Party APIs)
* **Form Submission Service:** Integrasi *serverless contact form* menggunakan **Formspree** atau **Web3Forms** (mengirim pesan form langsung ke email tanpa backend).
* **Font Family:** Google Fonts (`Plus Jakarta Sans` / `Inter`).
* **Icons:** FontAwesome CDN / Lucide Icons via SVG/CDN.
* **Hosting & Deployment:** GitHub Pages / Vercel / Netlify.

### 8.3 Struktur Folder Proyek (Project Directory Structure)
Berikut adalah susunan direktori file yang rapi dan terstandarisasi untuk proyek Vanilla HTML/CSS/JS ini:

```text
portfolio-website/
├── index.html               # File HTML utama (Single-Page Landing Page)
├── favicon.ico              # Ikon tab browser
├── README.md                # Dokumentasi petunjuk penggunaan dan setup
├── PRD_Web_Portofolio.md    # Dokumen PRD proyek
│
├── css/                     # Folder gaya CSS
│   ├── variables.css        # Deklarasi warna, font, shadow, dan variabel global
│   ├── style.css            # Styling utama (layout, hero, sections, footer)
│   └── responsive.css       # Media queries untuk tampilan mobile dan tablet
│
├── js/                      # Folder skrip JavaScript
│   ├── main.js              # Logika navigasi, sticky header, & mobile menu
│   └── form-validation.js   # Logika validasi dan pengiriman formulir kontak
│
└── assets/                  # Folder aset media
    ├── images/              # Gambar dan grafik
    │   ├── profile.webp     # Foto profil hero section
    │   └── projects/        # Gambar thumbnail galeri karya
    │       ├── project-1.webp
    │       ├── project-2.webp
    │       └── project-3.webp
    └── icons/               # Ikon kustom / SVG (jika ada)
```

---

## 9. Timeline & Milestone

| Fase | Durasi | Keterangan Aktivitas |
| :--- | :--- | :--- |
| **Fase 1: Desain & Struktur HTML** | Minggu 1 | Penyusunan struktur semantik HTML5, penyiapan aset gambar/ikon, dan penentuan CSS variables & folder structure. |
| **Fase 2: Styling CSS & Layouting** | Minggu 2 | Penerapan tema warna, *responsive layout* (Mobile/Tablet/Desktop), animasi transisi, dan efek UI. |
| **Fase 3: Interaktivitas JavaScript** | Minggu 3 | Pembuatan logika navigasi *sticky*, menu mobile, validasi form kontak, dan integrasi API form. |
| **Fase 4: QA, Optimization & Go-Live** | Minggu 4 | Pengujian *cross-browser*, validasi SEO & kecepatan (PageSpeed), serta *deployment* ke server hosting. |
