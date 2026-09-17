# Teks Situs dan UX Writing

Panduan microcopy antarmuka dan teks halaman web. Semua aturan di `SKILL.md` tetap berlaku.

Teks antarmuka berbeda dari artikel: dibaca sepintas, di tengah tugas, sering dalam keadaan
kesal. Standarnya empat: **jelas** (tidak multitafsir), **ringkas** (tidak berbelit),
**konsisten** (istilah dan nada sama di seluruh produk), **berguna** (memandu tindakan
berikutnya).

Kalau harus memilih: **jelas mengalahkan ringkas**, dan keduanya mengalahkan lucu.

## Tiga keputusan sebelum menulis

1. **Persona produk.** Bayangkan produk ini manusia. Teman? Asisten? Konsultan? Semua teks
   keluar dari satu mulut itu. Pesan galat dari "konsultan" terdengar berbeda dari pesan
   galat "teman".
2. **Sapaan.** *kamu* (aplikasi konsumen) atau *Anda* (keuangan, B2B, dokumen legal). Satu
   produk satu sapaan, **sampai ke pesan galat terdalam dan email transaksional**.
3. **Glosarium istilah.** Sebelum menulis banyak layar, tetapkan istilah untuk konsep yang
   berulang. Kalau produk sudah hidup, ikuti istilah yang ada; jangan memperkenalkan sinonim
   baru di tengah jalan.

## Glosarium istilah antarmuka

Tidak ada standar nasional untuk "Masuk" vs "Login". Yang mutlak adalah **konsistensi
internal**. Default panduan ini: padanan Indonesia.

| Konsep | Default | Catatan |
|---|---|---|
| Log in / Sign in | **Masuk** | |
| Sign up / Register | **Daftar** | |
| Log out | **Keluar** | |
| Password | **Kata sandi** | |
| Username | **Nama pengguna** | |
| Submit | **Kirim**, atau verba hasilnya (Simpan, Bayar) | Jangan "Submit" |
| Save / Cancel / Delete | **Simpan / Batal / Hapus** | |
| Next / Back | **Lanjut / Kembali** | |
| Retry | **Coba lagi** | |
| Search | **Cari** | |
| Settings | **Pengaturan** | |
| Upload / Download | **Unggah / Unduh** | |
| Edit | **Ubah** | "Edit" juga diterima; pilih satu |
| Sign in with Google | **Masuk dengan Google** | |
| Empty state | **Belum ada** | Jangan "Kosong" sendirian |
| Dashboard | **Dasbor** | |

**Kalau produk sudah telanjur memakai "Login", pakai "Login" di semua tempat.** Campuran
"Masuk" di satu layar dan "Login" di layar lain lebih buruk daripada pilihan mana pun.

## Anggaran ruang

Antarmuka itu tempat sempit. Tetapkan batas panjang sebelum menulis, bukan sesudah.

| Elemen | Batas | Catatan |
|---|---|---|
| Tombol | 1–3 kata, maksimal sekitar 25 karakter | Verba yang menyebut hasil aksi |
| Teks bantuan | 1 kalimat | Untuk format yang ketat |
| Pesan galat | 2 kalimat | Apa yang terjadi, lalu cara memperbaiki |
| Notifikasi | 1 kalimat | Kabar dulu, detail kemudian |
| Judul modal | Maksimal 5 kata | Sebut keputusannya |

Batas ini boleh dilanggar kalau kejelasan menuntutnya. Yang tidak boleh: melewatinya tanpa
alasan.

## Empat pertanyaan sebelum menulis

Jawab keempatnya sebelum kalimat pertama. Kalau ada yang tidak bisa dijawab, tanyakan ke
pengguna.

1. **Siapa pengguna, dan apa suasana hatinya?** Sedang terburu-buru, bingung, atau baru saja
   gagal bertransaksi? Nada pesan mengikuti jawabannya.
2. **Apa satu tindakan terpenting yang harus dia lakukan?** Sebut tindakan yang menyelesaikan
   masalahnya: "Coba lagi", "Ubah kata sandi", "Periksa koneksi".
3. **Berapa ruang yang tersedia?** Lihat tabel anggaran di atas.
4. **Sapaan mana yang dipakai merek?** *Anda* atau *kamu*. Satu produk satu sapaan, sampai ke
   pesan galat terdalam.

## Aturan per komponen

### Tombol

Verba yang menyebut hasil aksi, maksimal sekitar tiga kata: "Simpan perubahan", "Buat akun",
"Bayar Rp150.000".

- Jangan "Klik di sini", "OK", atau "Ya/Tidak" untuk aksi yang punya akibat.
- Register tombol sama dengan register teks di atasnya. Badan teks formal dengan tombol
  "Gaskeun" adalah cacat konsistensi.
- Tombol destruktif menyebut aksinya: "Hapus", bukan "Ya".

### Pesan galat

Polanya wajib: **apa yang terjadi (dalam bahasa awam) + cara memperbaikinya.** Tanpa
menyalahkan, tanpa jargon, tanpa kode telanjang.

> ❌ "Terjadi kesalahan. Silahkan coba lagi." (kosong, plus salah eja)
> ❌ "Error 422: Unprocessable Entity" (kode telanjang)
> ❌ "Karena Anda salah memasukkan data…" (menyalahkan)

> ✅ "Kata sandi salah. Coba lagi, atau atur ulang lewat 'Lupa kata sandi'."
> ✅ "Koneksi terputus. Cek Wi-Fi atau kuotamu, lalu coba lagi." + tombol "Coba lagi"
> ✅ "Fotonya kebesaran (maks. 5 MB). Kompres dulu, lalu unggah lagi."

Sertakan tombol tindakan di dekat pesan galat kalau ada tindakan yang bisa diambil.

### Empty state

Tiga tugas, semuanya wajib:

1. Katakan kondisinya kosong.
2. Katakan cara mengisinya.
3. Beri satu tombol untuk mulai.

> ✅ "Wishlist-mu masih kosong. Tekan ikon hati di produk untuk menyimpannya di sini." +
> tombol "Telusuri produk"

Jangan memakai empty state sebagai tempat menaruh slogan atau ucapan selamat.

### Formulir

- **Label selalu tampak.** Placeholder bukan pengganti label: ia hilang begitu pengguna
  mulai mengetik.
- **Pesan validasi spesifik per kesalahan.** "Email belum memakai @" mengalahkan "Input
  tidak valid".
- **Teks bantuan sebelum kesalahan terjadi**, untuk format yang ketat (kata sandi, NIK,
  nomor telepon).
- Tandai kolom opsional, bukan kolom wajib, kalau kolom wajibnya mayoritas.
- Jangan mengulang label di pesan galat: "Kata sandi salah" cukup, bukan "Kolom kata sandi
  yang Anda isi salah".

### Konfirmasi aksi destruktif

Sebut objek dan akibatnya; tombol menyebut aksinya.

> ❌ "Apakah Anda yakin?" [Ya] [Tidak]

> ✅ "Hapus 3 foto? Foto yang dihapus tidak bisa dikembalikan." [Batal] [Hapus]

### Notifikasi dan toast

Satu kalimat, kabar dulu baru detail: "Pesanan dikirim. Perkiraan tiba Kamis."

Jangan membuka notifikasi dengan "Selamat! 🎉" untuk hal rutin, dan jangan memakai
notifikasi untuk mengucapkan terima kasih.

### Keadaan memuat dan berhasil

- Memuat: sebut apa yang sedang dimuat dan berapa lama perkiraannya kalau lebih dari beberapa
  detik. "Menyiapkan laporan…" mengalahkan "Loading…".
- Berhasil: konfirmasi singkat + langkah berikutnya yang jelas. "Pembayaran berhasil. Struk
  dikirim ke emailmu." Jangan hanya "Sukses!".

### Onboarding

Satu layar satu ide. Manfaat dulu, baru cara memakainya. Jangan meminta izin yang belum
dibutuhkan (notifikasi, lokasi) sebelum pengguna melihat gunanya.

## Halaman web

### Landing page

- **Headline**: manfaat spesifik dalam sekitar 10 kata, bukan slogan. "Situs company profile
  tayang 14 hari, mulai Rp2 juta" mengalahkan "Solusi digital terbaik untuk bisnis Anda".
- **Subheadline**: menjelaskan mekanismenya atau untuk siapa. Boleh lebih panjang.
- **Bukti dekat klaim**: angka, logo klien, testimoni bernama: di layar yang sama dengan
  klaimnya, bukan tiga bagian di bawahnya.
- **Satu CTA primer** per halaman, diulang dengan label yang konsisten.

### Halaman produk

Sebutkan apa yang didapat, untuk siapa, dan berapa. Spesifikasi dalam daftar; manfaat dalam
prosa. Foto yang jujur tentang produk yang sebenarnya dikirim.

### Halaman harga

Tulis angka sebenarnya. "Hubungi kami untuk harga" menurunkan kepercayaan, dan hanya wajar
untuk layanan yang memang dirancang khusus per klien: itu pun sebutkan rentangnya.

### Tentang kami

Cerita spesifik: tahun berdiri, siapa pendirinya, kenapa mulai, angka yang relevan.
"Berkomitmen memberikan solusi terbaik dengan mengedepankan profesionalisme" bukan cerita,
itu kalimat yang bisa dipakai perusahaan mana pun.

### FAQ

Pertanyaan yang benar-benar ditanyakan pengguna, dijawab langsung di kalimat pertama. FAQ
bukan tempat menjejalkan kata kunci. Kalau pertanyaannya belum pernah ditanyakan siapa pun,
jangan dibuat-buat.

### 404

Akui halamannya tidak ada, beri jalan pulang (Cari, Beranda, atau tautan populer). Boleh
sedikit bermain kalau persona mendukung, tapi jalan keluarnya wajib ada.

## Contoh transformasi

> ❌ Tombol: "KLIK DISINI UNTUK INFORMASI SELENGKAPNYA!"
> ✅ "Lihat detail paket"

> ❌ Hero: "Selamat datang di website kami. Kami adalah perusahaan yang bergerak di bidang
> teknologi informasi yang berkomitmen memberikan solusi terbaik."
> ✅ "Aplikasi kasir untuk warung dan kafe kecil. Catat penjualan, stok, dan laba dari satu
> ponsel. Gratis untuk 1 outlet."

> ❌ Galat unggah: "Upload gagal. Silahkan ulangi kembali lagi."
> ✅ "Fotonya kebesaran (maks. 5 MB). Kompres dulu, lalu unggah lagi."

## Pemeriksaan tambahan

Setelah Pemeriksaan Wajib di `SKILL.md`:

1. Semua label untuk konsep yang sama identik di seluruh layar dan halaman?
2. Sapaan seragam sampai ke pesan galat dan email transaksional?
3. Setiap pesan galat menyebut cara keluar dari masalahnya?
4. Tombol menyebut hasil aksinya, bukan "OK" atau "Ya"?
5. Headline bisa dipahami dalam sekali baca oleh orang yang baru tiba?
6. Teks masih benar saat dipotong (tombol sempit, notifikasi satu baris, pratinjau email)?

## Referensi terkait

- `padanan-istilah.md`: memilih antara istilah asing dan padanannya
- `marketing.md`: bagian penawaran pada landing page yang menjual
- `kata-baku.md`: bentuk baku, termasuk peluluhan imbuhan pada label ("diubah", bukan
  "dirubah")
