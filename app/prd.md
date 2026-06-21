📄 PRD Revisi: Strict Mobile Scaling & Proportions

1. Analisis Akar Masalah (Root Cause)
   Masalah Sebelumnya: Penggunaan clamp() atau utilitas bawaan yang gagal mendeteksi batas layar ponsel, menyebabkan teks dan shape over-scaling (kebesaran).

Solusi: Kita tinggalkan kalkulasi otomatis yang berisiko. Kita gunakan pendekatan Mobile-First absolut. Semua class dasar (tanpa awalan) wajib berukuran kecil, dan ukuran besar hanya boleh aktif jika layar di atas 768px (menggunakan awalan md:).

2. Aturan Ketat Tipografi (Font Scaling)
   Tidak ada lagi teks raksasa di layar HP.

Hero Headline Utama: Wajib text-3xl (30px) atau maksimal text-4xl (36px). Baru membesar menjadi md:text-6xl di desktop.

Judul Section (Keamanan, Layanan): Wajib text-2xl (24px) font-bold. Desktop: md:text-4xl.

Teks Body/Deskripsi: Wajib text-sm (14px) agar keterbacaan nyaman tanpa menghabiskan ruang. Desktop: md:text-base.

Line Height (Jarak Antar Baris): Gunakan leading-tight untuk judul agar tidak memakan ruang vertikal terlalu banyak.

3. Pengecilan Shape & Bento Grid (Kartu Layanan)
   Elemen box tidak boleh mendominasi layar.

Padding Kartu: Kurangi drastis dari p-8 menjadi p-4 (sekitar 16px) untuk versi mobile. Desktop baru md:p-8.

Ukuran Ikon: Wajib di-hardcode menjadi w-6 h-6 atau maksimal w-8 h-8 di dalam kartu.

Grid Layout: Wajib grid-cols-1 (1 kolom tersusun ke bawah) atau maksimal grid-cols-2 (jika isi kartunya hanya ikon dan teks sangat pendek). Jangan pernah memaksakan 3-4 kolom di HP.

4. Perampingan Top Bar & Bottom Bar
   Area navigasi harus menghemat ruang layar (Screen Real Estate).

Top Bar (Header):

Tinggi maksimal h-16 (64px).

Sembunyikan semua teks menu (hidden md:flex).

Hanya tampilkan Logo (ukurannya dikecilkan jadi h-8) dan ikon Hamburger Menu (w-6 h-6).

Bottom Action Bar (Mobile Only):

Wajib menempel di bawah (fixed bottom-0).

Tinggi proporsional, gunakan padding p-3.

Tombol "Chat Admin" di dalamnya harus penuh kiri-kanan (w-full) dengan tinggi ideal sentuhan jempol h-12.
