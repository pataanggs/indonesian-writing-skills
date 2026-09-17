---
name: bahasa-teknis-terkendali
description: "Menulis ulang teks teknis bahasa Indonesia supaya agen AI tidak bisa salah baca: deskripsi tool, pesan galat, instruksi antaragen, laporan status, prompt sistem, prosedur, dan dokumentasi yang dibaca mesin. Pakai skill ini ketika teks akan diurai mesin, diterjemahkan, atau dibaca penutur nonasli tanpa manusia yang bisa ditanya; atau ketika teks terasa padat, kabur, dan mudah salah tafsir. Pemicu: 'tulis ulang supaya agen tidak salah paham', 'rapikan pesan galat ini', 'jelaskan instruksi ini', 'pakai bahasa teknis terkendali', 'kurangi ambiguitas teks ini'. (Rewrites ambiguous Indonesian technical text into controlled Indonesian that an agent cannot misparse: tool descriptions, error messages, inter-agent instructions, status reports, system prompts. Not for creative, marketing, or persuasive copy.)"
license: MIT
metadata:
  version: 1.0.0
  language: id
  jenis: bahasa-terkendali
---

# Bahasa Teknis Terkendali

Bahasa Indonesia terkendali untuk teks yang dibaca mesin. Tujuannya satu: **menghapus
kemungkinan salah baca.** Dua sumber salah baca yang dihapus: kata yang punya lebih dari satu
makna, dan kalimat yang punya lebih dari satu kemungkinan struktur.

Aturan di sini disusun dari nol untuk bahasa Indonesia. Bahasa Indonesia tidak punya standar
bahasa terkendali resmi, jadi ini bukan terjemahan standar asing. Setiap kaidah menyasar
ambiguitas yang memang ada di bahasa Indonesia. Alasan di balik setiap kaidah ada di
`references/ambiguitas.md`.

Prinsip kerjanya satu kalimat: **pembaca di sini tidak bisa bertanya balik.**

## Kapan skill ini dipakai

Pakai skill ini ketika teks memenuhi dua syarat sekaligus.

**Syarat pertama, pembacanya mesin atau pembaca tanpa saluran balik.** Contohnya:

- Deskripsi tool, fungsi, atau parameter yang akan dibaca agen lain.
- Pesan galat, kode status, atau laporan hasil.
- Instruksi antaragen, prompt sistem, atau pesan yang dirutekan otomatis.
- Prosedur, teks keselamatan, atau syarat yang tidak boleh salah tafsir.
- Dokumentasi yang akan diterjemahkan mesin.

**Syarat kedua, salah baca punya biaya.** Kalau teksnya cuma karangan bebas, jangan pakai
skill ini. Bahasa terkendali itu datar dan harfiah pada dasarnya. Jangan terapkan pada teks
yang justru mengandalkan gaya, nada, atau daya bujuk.

Kalau teksnya untuk pembaca manusia yang bisa bertanya balik, pakai skill `indonesian-writing`
saja. Skill ini mengorbankan keindahan untuk menghapus ambiguitas. Skill itu mengejar
keduanya.

## Dua mode

Pilih mode sebelum menulis ulang. Kalau pengguna tidak menyebut mode, simpulkan dari jenis
teksnya dan sebutkan pilihan itu satu baris saja.

**Ketat.** Untuk prosedur, pesan galat, deskripsi tool, instruksi antaragen, laporan status,
dan teks keselamatan. Terapkan semua kaidah, termasuk batas panjang yang keras dan disiplin
satu istilah satu makna.

**Terkendali Ringan.** Untuk README, changelog, deskripsi pull request, dan dokumentasi
penjelas. Terapkan kaidah struktural sepenuhnya. Perlakukan kaidah leksikal sebagai anjuran
saja. Prosa butuh sedikit kelegaan. Tulis ulang yang terlalu ketat akan terasa seperti orang
asing, bukan seperti perbaikan.

Perbedaan dua mode ini sejalan dengan perbedaan dua jenis kaidah di bawah. Kaidah struktural
mengatur bentuk kalimat. Kaidah leksikal bergantung pada daftar istilah.

## Dua jenis kaidah, dan bedanya penting

**Kaidah struktural** mengatur bentuk kalimat. Kaidah ini bisa diperiksa tanpa daftar kata
apa pun. Terapkan dengan yakin, dan periksa dengan `scripts/lint.mjs`.

**Kaidah leksikal** bergantung pada pilihan istilah. Sebagian bisa diperiksa karena daftar
istilah terkendali di `references/istilah-terkendali.md` menetapkan satu istilah untuk satu
konsep. Sisanya tetap soal pertimbangan, dan itu harus dinyatakan begitu di keluaran Anda,
bukan diklaim sebagai kepatuhan standar.

## Kaidah struktural

Terapkan semuanya.

| Kaidah | Lakukan | Jangan |
|---|---|---|
| Satu perintah satu kalimat | "Buka berkas. Baca baris ketiga." | "Buka berkas dan baca baris ketiga, lalu periksa apakah isinya cocok." |
| Subjek dan predikat wajib ada | "Permintaan gagal diproses." | "Gagal diproses." Bahasa Indonesia boleh menghilangkan subjek secara gramatikal, dan pembaca mesin tidak punya cara menebaknya |
| Panjang kalimat | Maksimal 20 kata untuk perintah dan prosedur. Maksimal 25 kata untuk deskripsi. | Kalimat majemuk bertingkat yang panjang |
| Jumlah klausa | Maksimal dua klausa: satu induk, satu anak | Tiga klausa atau lebih dalam satu kalimat. Batas ini lebih menentukan daripada batas jumlah kata, karena imbuhan bahasa Indonesia memadatkan banyak makna ke dalam sedikit kata |
| Pelaku disebut | "Agen menghapus berkas." | "Berkas dihapus." Bentuk pasif `di-` menyembunyikan pelaku |
| Rantai pewatas | Maksimal tiga kata untuk satu frasa nomina | "katup saluran masuk pompa bahan bakar bertekanan tinggi" |
| `yang` tidak berlapis | Satu `yang` per klausa | "berkas yang diubah oleh agen yang dijalankan oleh pengguna" |
| Negasi menempel pada sasaran | "Berkas ini tidak dihapus." | "Semua berkas tidak dihapus." Pembaca tidak tahu apakah cakupannya semua atau sebagian |
| Satu penanda waktu per klausa | "Berkas sudah dihapus." | "Berkas sudah akan dihapus." Bahasa Indonesia tidak punya kala, jadi penanda aspek yang bertumpuk menyesatkan |
| Tanpa titik koma | Pisahkan menjadi kalimat tersendiri | Titik koma, dalam bentuk apa pun |
| Satu topik satu paragraf | Maksimal enam kalimat per paragraf | Paragraf yang memuat beberapa topik |
| Daftar untuk urutan | Pakai daftar bernomor atau berbutir untuk tiga langkah atau lebih | Menyisipkan urutan ke dalam satu kalimat prosa |
| Perintah tegas | "Hapus berkas." | "Berkas sebaiknya dihapus." Untuk perintah, imperatif mengalahkan saran |

## Kaidah leksikal

Terapkan sebagai arah, dan nyatakan tingkat kepastiannya.

| Kaidah | Lakukan | Jangan |
|---|---|---|
| Satu istilah satu makna | Pilih satu verba untuk satu tindakan, lalu pakai terus. Selalu "periksa", jangan bergantian dengan "cek", "verifikasi", dan "validasi". | Memutar sinonim untuk gagasan yang sama di sepanjang dokumen |
| Satu kata satu jenis kata | "Oleskan oli ke katup." dengan *oli* sebagai nomina | Memakai *oli* sebagai nomina di satu kalimat dan sebagai verba di kalimat lain |
| Verba, bukan nomina tindakan | "Periksa berkas." | "Lakukan pengecekan terhadap berkas." Bentuk nomina membuat kalimat lebih panjang dan menyembunyikan pelaku |
| Hindari singkatan kabur | Sebutkan anggotanya, atau tulis "semua" | *dll*, *dsb*, *dst*, *sda*. Pembaca mesin tidak bisa memperluasnya, dan cakupannya tidak jelas |
| Pilih satu, bukan `dan/atau` | Tulis *dan*, atau tulis *atau*, atau tulis dua kalimat | `dan/atau`. Cakupannya kabur, dan pembaca mesin akan menebak |
| Kuantitas eksplisit | "Tiga berkas gagal." atau "Semua berkas gagal." | "Beberapa berkas gagal." Pembaca mesin tidak tahu berapa |
| Istilah asing dijelaskan sekali | Beri padanan saat pertama muncul, lalu pakai satu bentuk itu terus | Memakai istilah teknis yang tidak umum tanpa definisi |
| Satu bahasa per kalimat | "Muat ulang halaman, lalu jalankan ulang prosesnya." | "Refresh halamannya, lalu deploy ulang." Pembaca mesin harus menebak dua bahasa sekaligus |

Daftar istilah terkendali memuat 163 pasangan kanonis dan terlarang, terbagi dalam tujuh
kelompok. Lihat `references/istilah-terkendali.md`.

### Kata ganti dan rujukan

Bahasa Indonesia menanggung ambiguitas rujukan yang tidak dimiliki bahasa Inggris. Terapkan
aturan tambahan ini.

- **Jangan pakai `-nya` untuk rujukan yang harus diurai pembaca.** `-nya` bisa berarti
  pemilik, penanda definit, atau keterangan. "Berkasnya dihapus" bisa berarti berkas milik
  seseorang, atau berkas yang sedang dibicarakan. Tulis nomina yang dimaksud.
- **Jangan pakai pronomina tanpa anteseden yang jelas.** `ia`, `dia`, `mereka`, `ini`, dan
  `itu` hanya boleh dipakai kalau nomina yang dirujuk muncul di kalimat sebelumnya dan tidak
  ada kandidat lain.
- **Jangan pakai `di mana` dan `yang mana` sebagai penghubung.** Keduanya kata tanya. Pakai
  *tempat*, *yang*, atau *saat*.

### Modalitas tetap dipertahankan

Modalitas menyimpan tingkat keyakinan penulis, dan tingkat keyakinan itu isi, bukan gaya.
Jangan pernah menaikkan keraguan menjadi kepastian.

- "Permintaan mungkin gagal." tetap "mungkin gagal". Jangan diubah menjadi "Permintaan gagal."
- "Kegagalan bisa disebabkan versi klien yang lama." tetap "bisa". Jangan diubah menjadi
  "Versi klien yang lama adalah penyebabnya."

Ini kesalahan yang paling sering terjadi pada tulis ulang yang niatnya baik. Batas panjang
kalimat justru menggoda Anda untuk memotong keraguan.

## Empat mode gagal

Ambiguitas di teks teknis bahasa Indonesia hampir selalu berasal dari empat kebiasaan ini.
Semuanya mekanis: Anda bisa menunjuk kata atau tanda baca yang melanggarnya.

1. **Subjek hilang.** "Gagal." / "Sudah diperbarui." / "Perlu ditinjau." Pembaca tidak tahu
   apa yang gagal, apa yang diperbarui, dan siapa yang meninjau. Perbaikan: tulis subjeknya.
2. **Nomina tindakan.** "Lakukan pengecekan", "memberikan penjelasan", "melaksanakan
   pengujian". Perbaikan: pakai verbanya. "Periksa", "jelaskan", "uji".
3. **Kabur kuantitas dan cakupan.** "Sebagian besar", "beberapa", "umumnya", "dll".
   Perbaikan: sebut jumlahnya, atau sebut anggotanya.
4. **Campur bahasa dan imbuhan asing.** "di-refresh", "meng-update", "deploy ulang". Imbuhan
   pada kata asing tidak punya bentuk baku, jadi setiap pembaca menebak sendiri. Perbaikan:
   pakai padanan Indonesia, atau kutip istilah asingnya sebagai literal tanpa imbuhan.

## Proses

1. **Pilih mode.** Ketat atau Terkendali Ringan. Sebutkan pilihan itu hanya kalau pengguna
   meminta tabel aturan.
2. **Baca teks masukan sekali untuk memahami maknanya.** Jangan mulai menulis ulang sebelum
   Anda tahu apa yang harus tetap tersampaikan sesudahnya.
3. **Telusuri kalimat per kalimat.** Pakai `scripts/lint.mjs` untuk memeriksa kaidah
   struktural lebih dulu:

   ```bash
   node scripts/lint.mjs berkas.md
   node scripts/lint.mjs berkas.md --json
   node scripts/lint.mjs berkas.md --baseline 5
   node scripts/lint.mjs berkas.md --disable pasif-tanpa-pelaku
   ```

   Pemeriksa itu menandai titik koma, kalimat kepanjangan, klausa berlebih, nominalisasi,
   singkatan kabur, `dan/atau`, pasif tanpa pelaku, imbuhan pada kata asing, penanda aspek
   bertumpuk, tumpukan kata ragu, kuantitas kabur, kata sifat pemasaran, rujukan `-nya` yang
   mencurigakan, `yang` berlapis, dan klausa menggantung di butir daftar. Pemeriksa itu
   **tidak pernah** menandai modalitas tunggal karena keraguan itu isi, bukan gaya.
4. **Tulis ulang setiap kalimat yang ditandai.** Pertahankan makna aslinya dengan tepat.
   Kalau tulis ulang akan menghilangkan presisi yang dibutuhkan, seperti syarat keselamatan,
   pembatas cakupan, atau angka, pertahankan bentuk yang lebih panjang dan tandai pilihan itu.
5. **Keluarkan hasilnya.** Lihat bagian Format Keluaran.
6. **Kalau masukan sudah sesuai, katakan begitu.** Jangan paksakan perubahan pada teks yang
   sudah patuh.

## Format keluaran

**Bawaan: teks hasil tulis ulang saja.** Sebagian besar pemanggil ingin hasil yang bisa
langsung ditempel ke deskripsi tool, string galat, atau prompt. Cetak teksnya sendiri. Jangan
tambahkan pembuka, pengumuman mode, jumlah pelanggaran, ringkasan perubahan, atau tawaran
penjelasan.

Satu tambahan yang diizinkan: kalau langkah 4 sengaja mempertahankan bentuk yang lebih
panjang, tambahkan satu baris setelah teks, berawalan `Dibiarkan: `, yang menyebut frasanya
dan presisi yang akan hilang. Hapus baris itu kalau tidak ada yang perlu dilaporkan.

**Atas permintaan: tabel aturan.** Kalau pengguna minta melihat alasannya, seperti "tunjukkan
perbedaannya", "aturan mana yang dilanggar", atau "jelaskan perubahannya", keluarkan tabel
ini:

```markdown
| Aturan yang dilanggar | Asli | Hasil |
|---|---|---|
| Subjek hilang | "Gagal diproses." | "Permintaan gagal diproses." |
| Nominalisasi | "Lakukan pengecekan berkas." | "Periksa berkas." |
| Pasif tanpa pelaku | "Berkas dihapus." | "Agen menghapus berkas." |

Mode: Ketat. 7 pelanggaran ditemukan.
```

Ikuti tabel itu dengan satu baris catatan tentang hal yang sengaja **tidak** Anda sederhanakan,
beserta alasannya.

## Batas

**Bisa:**

- Menulis ulang teks teknis Indonesia yang kabur menjadi kalimat pendek, bermakna tunggal,
  dan bersubjek jelas.
- Mengembalikan teks hasil tulis ulang saja sebagai bawaan.
- Menyebut aturan yang dipakai kalau pengguna memintanya.
- Mempertahankan setiap fakta, syarat, dan pembatas cakupan dari teks asli.
- Mempertahankan kekuatan setiap keraguan, dan tidak menambah klaim yang tidak ada di sumber.
- Mengusulkan satu baris definisi untuk istilah domain yang harus dipertahankan.

**Tidak bisa:**

- Menjamin kepatuhan ASD-STE100 atau standar lain mana pun. Bahasa Indonesia tidak punya
  standar bahasa terkendali resmi. Skill ini adaptasi yang disusun sendiri, bukan sertifikasi.
- Menyederhanakan teks kreatif, pemasaran, atau persuasif. Di sana gaya dan nuansa justru
  jadi intinya.
- Menghilangkan syarat keselamatan, pengecualian, atau pembatas cakupan diam-diam hanya untuk
  memendekkan kalimat. Skill ini menandai trade-off itu.
- Mengubah "mungkin gagal" menjadi "gagal", atau "bisa disebabkan X" menjadi "X adalah
  penyebabnya". Keraguan yang hilang berarti klaimnya berubah.
- Membuat isi yang lemah menjadi benar atau berguna. Skill ini memperbaiki bentuk teks, bukan
  isinya. Paragraf kosong yang ditulis ulang di sini tetap kosong, hanya jadi lebih rapi.
- Memendekkan sampai kehilangan kejelasan. Sasaran skill ini menghapus ambiguitas, bukan
  memangkas kata. Berhenti saat kalimatnya sudah tidak ambigu, bukan saat kalimatnya paling
  pendek.
- Menggantikan pemeriksaan manusia untuk teks yang punya akibat hukum, keselamatan, atau
  keuangan.

## Sumber daya lain

- **`references/ambiguitas.md`**: kenapa bahasa Indonesia mudah salah dibaca mesin, lengkap
  dengan contoh per sumber ambiguitas. Ini dasar bagi setiap kaidah di halaman ini.
- **`references/kaidah-lengkap.md`**: sembilan bagian kaidah secara rinci, beserta rujukan ke
  tata bahasa baku Indonesia.
- **`references/istilah-terkendali.md`**: daftar istilah terkendali, satu istilah kanonis per
  konsep, beserta sinonim yang dilarang.
- **`examples/sebelum-sesudah.md`**: contoh nyata sebelum dan sesudah, per jenis teks.
- **`scripts/lint.mjs`**: pemeriksa mekanis untuk kaidah struktural. Tanpa dependensi, Node 18
  ke atas. Keluar dengan kode 1 kalau pelanggaran keras melebihi nilai `--baseline`.
