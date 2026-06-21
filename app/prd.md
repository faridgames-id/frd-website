📄 Product Requirements Document (PRD): HD Interactive Layout Revamp

1. Objektif Proyek
   Fluid Responsiveness: Memastikan setiap elemen pas (fit-to-screen) di semua ukuran (Mobile, Tablet, Desktop monitor besar) tanpa mengubah model komponen dasar.

Premium Motion: Menerapkan transisi geser vertikal bergaya PPTX yang smooth menggunakan GSAP (ScrollSmoother & ScrollTrigger).

HD Visuals: Optimasi resolusi tinggi dan penggunaan vector assets agar web terlihat sangat tajam di layar Retina/OLED.

Thematic Sections: Memberikan identitas visual eksklusif berupa gradasi hitam bermotif pada setiap slide.

2. Spesifikasi Tema Visual (Gradasi Hitam & Motif Unik)
   Setiap section akan berfungsi sebagai slide layar penuh (100vh). Berikut adalah rancangan tema visual agar tidak membosankan:

Slide 1: Hero Section (Kesan Pertama & Hook)

Warna Latar: Gradasi Pure Black (#000000) ke Deep Charcoal (#1A1A1A).

Motif: Subtle Glowing Hexagon Mesh (menggambarkan struktur, brankas, dan teknologi gaming). Opasitas 3%.

Slide 2: Trust Badges & Keamanan

Warna Latar: Gradasi Midnight Black (#0B0C10) ke Dark Obsidian (#1F2833).

Motif: Faded Circuit Board (memberikan kesan keamanan siber dan perlindungan sistem). Opasitas 2%.

Slide 3: Katalog Layanan (Bento Grid)

Warna Latar: Gradasi Abyss Black (#050505) ke Dark Sapphire (#000B18).

Motif: Topographic Lines halus (memberikan kesan eksplorasi dunia game dan leveling up). Opasitas 4%.

Slide 4: Cara Kerja & Komunitas

Warna Latar: Gradasi Matte Black (#121212) ke Eerie Black (#1B1B1B).

Motif: Abstract Digital Noise / Dotted Grid tipis yang elegan agar antarmuka terlihat sangat modern.

3. Eksekusi "8 Pillars of Design" (Fokus Layout & Efek)
   Kita menerapkan pilar desain ini khusus untuk membungkus komponen yang sudah ada, tanpa merombak isi rumahnya:

Point of View (Sudut Pandang): Menjadikan layar sebagai "kanvas presentasi". Menggunakan teknik snap scrolling, pengguna akan dibawa ke slide berikutnya secara utuh, menjaga fokus pada satu pesan bisnis (misal: hanya fokus pada Katalog, lalu pindah ke Keamanan).

Color (Warna): Penggunaan kanvas gradasi hitam yang kaya (rich black) seperti spesifikasi di atas untuk menciptakan kedalaman 3D (depth).

Typography (Tipografi Fluid): Menggunakan fungsi clamp() pada CSS agar ukuran teks membesar dan mengecil secara otomatis mengikuti resolusi layar, memastikan ketajaman teks (HD) tanpa pernah terpotong.

Hierarchy (Hierarki Spasial): Mempertahankan struktur model data, namun dibungkus dalam kontainer berukuran max-w-7xl dengan padding adaptif agar isi web tidak pernah menabrak tepi layar ponsel dan tetap terpusat di monitor lebar.

Imagery (Aset Visual HD): Menerapkan standar resolusi ganda (@2x). Gambar akan dirender menggunakan WebP berkualitas tinggi, dan ikon wajib menggunakan SVG agar ujungnya tetap tajam meski di-zoom.

Motion (Interaksi & Parallax): Integrasi tingkat lanjut GSAP. Saat berpindah slide, latar belakang bermotif bergerak dengan kecepatan lebih lambat (efek Parallax ala PPTX Premium), sementara konten teks masuk perlahan dengan efek fade-up.

Mobile (Responsivitas Mutlak): Menerapkan unit Dynamic Viewport Height (dvh) pada slide utama agar tinggi halaman selalu akurat dan tidak terhalang oleh bilah navigasi browser mobile seperti Chrome/Safari.

The Invisible Stuff (Fondasi Gaib): Mengaktifkan Hardware Acceleration (will-change: transform) agar animasi transisi GSAP berjalan di atas GPU (60 FPS). Ini memastikan web terasa sangat ringan, mulus, dan tidak membuat ponsel pembeli menjadi panas atau lag.
