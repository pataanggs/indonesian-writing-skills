# Sebelum dan Sesudah

Contoh per jenis teks. Semua contoh di sini **disusun untuk ilustrasi**, bukan keluaran sistem
tertentu.

Kolom ❌ menunjukkan pola yang dilarang beserta aturan yang dilanggarnya. Kolom ✅ menunjukkan
perbaikan yang bisa diperiksa.

Satu hal yang membuat versi ✅ lebih baik bukan pilihan katanya yang lebih bagus, melainkan
**informasinya yang lebih lengkap**. Hampir semua perbaikan di bawah bekerja dengan cara yang
sama: menambahkan pelaku, sasaran, jumlah, atau tenggat yang di versi ❌ hilang.

---

## 1. Deskripsi tool

> ❌ Menyinkronkan state ke berbagai backend yang sudah dikonfigurasi, dan kalau terdeteksi
> konflik maka mungkin akan diselesaikan otomatis tergantung strategi yang sudah di-set,
> atau kalau tidak maka konfliknya akan dimunculkan untuk ditinjau.

**Pelanggaran:** subjek hilang pada beberapa klausa, klausa berlebih (satu kalimat memuat
empat gagasan), kalimat kepanjangan, pasif tanpa pelaku ("diselesaikan", "dimunculkan"),
kata asing berimbuhan ("di-set"), kata ragu bertumpuk ("mungkin akan").

> ✅ Tool ini menyinkronkan status ke setiap backend yang sudah dikonfigurasi.
> Tool ini membaca strategi yang tersimpan saat menemukan konflik.
> Kalau strategi mengizinkan penyelesaian otomatis, tool ini mungkin menyelesaikan konflik
> tanpa pengguna.
> Kalau tool ini tidak menyelesaikan konflik, tool ini melaporkan konflik itu untuk ditinjau
> pengguna.

Yang berubah: setiap kalimat punya subjek. Setiap tindakan punya pelaku. Keraguan pada
kalimat ketiga dipertahankan.

## 2. Pesan galat

> ❌ Terjadi kesalahan. Sistem kami sedang mengalami kendala sehingga tidak dapat memproses
> permintaan Anda; silakan coba beberapa saat lagi, atau hubungi tim support kami kalau
> masalahnya berlanjut, dsb.

**Pelanggaran:** subjek hilang ("Terjadi kesalahan"), titik koma, singkatan kabur ("dsb"),
kuantitas kabur ("beberapa saat"), istilah asing ("support"), pelaku tidak disebut.

> ✅ Permintaan Anda gagal diproses.
> Penyebabnya kemungkinan besar format data yang tidak cocok dengan yang diharapkan server.
> Versi klien yang lama bisa menyebabkan ketidakcocokan ini.
> Periksa versi klien Anda. Kalau versinya terbaru, hubungi tim dukungan dengan menyertakan
> kode galat INV-402.

Yang berubah: kalimat pertama menyebut apa yang gagal. Penyebab disebut sebagai kemungkinan,
bukan sebagai kepastian. Ada satu tindakan berikutnya, dan ada kode yang bisa dilaporkan.

## 3. Laporan status

> ❌ Proses sudah akan selesai. Beberapa berkas berhasil, sebagian besar masih diproses,
> dan sisanya dll. Status berkasnya bisa dicek di dashboard.

**Pelanggaran:** penanda aspek bertumpuk ("sudah akan"), kuantitas kabur ("beberapa",
"sebagian besar"), singkatan kabur ("dll"), rujukan `-nya` tanpa anteseden jelas, istilah
asing berimbuhan ("dashboard" tanpa padanan).

> ✅ Proses selesai pada 14.32.
> Tiga berkas berhasil diproses.
> Empat berkas masih dalam antrean.
> Nol berkas gagal.
> Status lengkap tiap berkas tersedia di halaman dasbor.

Yang berubah: "sudah akan selesai" diganti waktu yang pasti. Setiap jumlah disebutkan
angkanya. "Sisanya" dipecah menjadi dua kelompok yang bisa dihitung.

## 4. Instruksi antaragen

> ❌ Kalau gagal, ulangi. Pastikan dulu berkas yang error sudah di-refresh supaya nanti bisa
> langsung deploy, dan jangan lupa cek juga konfigurasinya biar nggak ada masalah.

**Pelanggaran:** subjek hilang di hampir semua klausa ("Kalau gagal, ulangi"), kata asing
berimbuhan ("di-refresh"), kata asing tanpa padanan ("deploy", "error"), bahasa gaul di teks
teknis ("biar nggak"), lebih dari satu perintah dalam satu kalimat.

> ✅ Kalau permintaan gagal, agen mengirim ulang permintaan itu satu kali.
> Agen memuat ulang berkas yang gagal sebelum menjalankan ulang proses.
> Agen memeriksa berkas konfigurasi sebelum menjalankan proses.
> Kalau permintaan gagal dua kali, agen berhenti dan melaporkan kegagalan itu ke pengguna.

Yang berubah: setiap klausa punya subjek. Perintahnya berurutan dan bisa dihitung. Ada
batasnya yang jelas: satu kali kirim ulang, lalu berhenti.

## 5. Prompt sistem

> ❌ Kamu adalah asisten yang helpful dan profesional. Kamu harus selalu berusaha memberikan
> jawaban terbaik untuk user, dan jangan pernah memberikan informasi yang salah, serta
> pastikan nada bicaramu sopan tapi santai, dll.

**Pelanggaran:** klaim mutu tanpa ukuran ("helpful", "profesional", "terbaik"), kata asing
tanpa padanan ("user"), singkatan kabur ("dll"), kata tugas asing berimbuhan, satu kalimat
memuat empat perintah yang saling bertumpuk.

> ✅ Tugas Anda menjawab pertanyaan pengguna.
> Jawab dengan bahasa Indonesia.
> Pakai register konsultatif: sapaan "Anda", kalimat pendek, tanpa emoji.
> Kalau Anda tidak tahu jawabannya, katakan tidak tahu. Jangan menebak.
> Kalau pertanyaan pengguna di luar cakupan, arahkan ke tim dukungan.

Yang berubah: "helpful" dan "profesional" diganti perilaku yang bisa diperiksa. Setiap aturan
berdiri sendiri dan tidak bisa ditafsirkan dua cara.

## 6. Prosedur

> ❌ Sebelum melakukan penghapusan terhadap berkas, pastikan bahwa berkas tersebut tidak
> sedang digunakan oleh proses lain, kemudian lakukan penghapusan dengan hati-hati.

**Pelanggaran:** nominalisasi ("melakukan penghapusan" dua kali), kata ganti kabur
("tersebut"), kalimat kepanjangan, klausa berlebih.

> ✅ Kalau berkas tidak sedang dipakai proses lain, hapus berkas itu.
> Kalau berkas sedang dipakai proses lain, tunggu sampai proses itu selesai.

Yang berubah: syarat mendahului perintah, jadi pembaca tidak menjalankan perintah lebih dulu
baru membaca pengecualiannya. Bentuk "dengan hati-hati" dihapus karena tidak bisa diukur.

---

## Kalimat tunggal: sebelum, sesudah, dan aturannya

| Sebelum | Sesudah | Aturan |
|---|---|---|
| Gagal diproses. | Permintaan gagal diproses. | Subjek hilang |
| Berkas dihapus. | Agen menghapus berkas. | Pasif tanpa pelaku |
| Lakukan pengecekan berkas. | Periksa berkas. | Nominalisasi |
| Beberapa berkas gagal. | Tiga berkas gagal. | Kuantitas kabur |
| Berkas, gambar, dll gagal. | Berkas dan gambar gagal. | Singkatan kabur |
| Pilih dan/atau hapus. | Pilih, lalu hapus. | `dan/atau` |
| Halaman di-refresh otomatis. | Halaman dimuat ulang secara otomatis. | Imbuhan pada kata asing |
| Berkas sudah akan dihapus. | Berkas akan dihapus pukul 14.00. | Penanda aspek bertumpuk |
| Berkas yang diubah agen yang dijalankan pengguna diperiksa. | Agen memeriksa berkas. Pengguna menjalankan agen itu. | `yang` berlapis |
| Berkasnya dihapus. | Agen menghapus berkas masukan. | Rujukan `-nya` |
| Prosesnya mungkin bisa cenderung lambat. | Prosesnya mungkin lambat. | Kata ragu bertumpuk |
| Sistem yang mulus dan tangguh. | Sistem ini selesai memproses 1.000 permintaan per detik. | Kata sifat pemasaran |

---

## Yang sengaja tidak diubah

Tulis ulang yang baik juga tahu kapan harus berhenti. Tiga contoh di bawah **tidak** boleh
disederhanakan, dan skill ini akan menandainya dengan baris `Dibiarkan: `.

**Keraguan yang menyimpan informasi.**

> "Permintaan mungkin gagal."

Jangan menjadi "Permintaan gagal". Keraguan itu menyatakan tingkat keyakinan penulis, dan
menghapusnya berarti mengubah klaimnya.

**Perbandingan yang butuh pembanding.**

> "Cara ini memakan 3 detik, sedangkan cara lama memakan 14 detik."

Kalau dipendekkan menjadi "Cara ini lebih cepat", pembandingnya hilang dan pembaca mesin
kehilangan dasar untuk memutuskan.

**Syarat keselamatan dan cakupan.**

> "Jangan hapus berkas ini kalau berkas ini sedang dipakai proses lain."

Kalau dipendekkan menjadi "Hapus berkas ini", syaratnya hilang. Untuk teks seperti ini,
panjang bukan masalah. Kehilangan syaratnya yang masalah.

---

## Cara memakai halaman ini

1. Sebelum menulis, tempelkan versi ❌ sebagai pengingat pola yang harus dihindari.
2. Sesudah menulis, jalankan `node scripts/lint.mjs draf.md` untuk menangkap pola mekanis.
3. Bandingkan draf Anda dengan kolom ✅: apakah versi Anda kehilangan pelaku, jumlah, atau
   tenggat yang sama?
