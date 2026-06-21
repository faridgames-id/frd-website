📄 PRD: Mobile UI/UX Polish & Responsiveness

1. Objektif Proyek
   Mobile-First Precision: Memperbaiki proporsi font, ikon, dan shape (bentuk/kartu) yang kebesaran atau tumpang tindih di layar HP.

Navigasi Intuitif: Merombak Top Bar agar tidak penuh sesak, dan merapikan bagian bawah (Footer & Bottom Action Bar).

Touch-Friendly: Memastikan area yang bisa diklik (touch target) sesuai standar kenyamanan jempol.

2. Standarisasi Skala (Icons, Shapes, Fonts)
   Typography (Font): Teks yang terlihat pas di PC sering kali raksasa di HP. Kita akan menyesuaikan fungsi clamp() atau memberikan spesifikasi ukuran khusus mobile (misal: judul utama di HP maksimal text-3xl atau text-4xl, deskripsi text-sm).

Icons: Menyeragamkan ukuran ikon di dalam Bento Cards agar tidak memakan tempat. Di HP, ikon cukup berukuran w-6 h-6 atau w-8 h-8.

Shapes / Kartu Layanan: \* Mengurangi padding (jarak dalam) kartu dari p-8 menjadi p-4 di layar mobile.

Merubah layout grid yang tadinya 4 kolom menyamping menjadi 1 atau maksimal 2 kolom di HP agar tidak gepeng.

3. Revamp Top Bar Navigation (Navigasi Atas)
   Masalah Saat Ini: Terlalu banyak teks menu (Komunitas, Layanan, Keamanan) yang dijejalkan di layar kecil sehingga desain pecah.

Solusi Mobile: \* Sembunyikan teks menu (Layanan, Cara Kerja, dll) di layar HP.

Ganti dengan ikon Hamburger Menu (ikon 3 garis) di pojok kanan.

Biarkan Logo "Farid Shop Game" tetap di kiri.

Pastikan Top Bar memiliki efek glassmorphism tipis dan menempel di atas (sticky) saat di-scroll.

4. Revamp Bagian Bawah & Footer
   Floating Bottom Action Bar (Kunci Konversi): Tambahkan bilah menu yang menempel statis di dasar layar HP. Isinya cukup 2 tombol utama: tombol "Katalog" (warna sekunder) dan "Chat WA Admin" (warna primer/glowing). Ini memastikan tombol beli selalu ada di dekat jempol pembeli.

Footer Stacking: Ubah susunan teks footer (hak cipta, link sosial media) yang menyamping menjadi tersusun ke bawah (stacking vertikal) dan pusatkan teksnya (text-center).

5. Lain-lain (Spacing & Touch Targets)
   Margin & Gap: Kurangi jarak antar section (gap dan margin) di versi mobile agar pengunjung tidak perlu melakukan scroll terlalu panjang untuk melihat konten berikutnya.

Standard Touch Target: Semua tombol, ikon media sosial, atau link yang bisa diklik wajib memiliki tinggi minimal 48px (aturan baku UI/UX) agar tidak salah pencet.
