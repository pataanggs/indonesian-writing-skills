# Ambiguitas Bahasa Indonesia untuk Pembaca Mesin

Berkas ini menjelaskan **kenapa** setiap kaidah di `SKILL.md` ada. Setiap bagian memuat
sumber ambiguitasnya, contoh yang salah baca, dan kaidah yang menjawabnya.

Berkas ini penuh contoh yang **sengaja salah**. Contoh itu ditulis untuk diperiksa, bukan
untuk ditiru. Pemeriksa `lint.mjs` akan menandainya kalau Anda menjalankannya pada berkas ini.

## Bahasa Inggris bukan pembanding yang tepat

Standar bahasa terkendali yang ada disusun untuk bahasa Inggris. Empat kaidah utamanya tidak
punya sasaran di bahasa Indonesia:

| Kaidah bahasa Inggris | Kenapa tidak berlaku di bahasa Indonesia |
|---|---|
| Larangan *phrasal verb* | Bahasa Indonesia tidak punya *phrasal verb*. "Buka berkas" tidak berubah makna karena partikel. |
| Larangan kala sempurna (*present perfect*) | Bahasa Indonesia tidak punya kala. Waktu ditandai kata keterangan, bukan bentuk verba. |
| Larangan bentuk *-ing* sebagai verba | Bahasa Indonesia tidak punya bentuk *-ing*. |
| Batas panjang rantai nomina | Ada padanannya, tetapi wujudnya berbeda: bahasa Indonesia tidak punya artikel dan memakai urutan D-M, jadi ambiguitasnya berpindah tempat. |

Sebaliknya, bahasa Indonesia punya sumber ambiguitas yang tidak dimiliki bahasa Inggris:

| Ciri bahasa Indonesia | Akibat untuk pembaca mesin |
|---|---|
| Subjek dan predikat boleh hilang secara gramatikal | Pembaca tidak tahu apa yang dibicarakan |
| Imbuhan mengubah jenis kata dan peran | Satu kata dasar punya banyak bentuk dengan makna berbeda |
| Tidak ada artikel | Tidak ada penanda definit dan indefinit |
| `-nya` berfungsi tiga sekaligus | Rujukan jadi kabur |
| Lapisan kosakata dari Sanskerta, Arab, Belanda, dan Inggris | Sinonim melimpah, dan pemutarannya jadi kebiasaan |
| Campur kode sangat lazim di teks teknis | Satu kalimat bisa memuat dua bahasa |

Karena itu skill ini **tidak menerjemahkan** standar asing. Kaidahnya disusun dari sumber
ambiguitas yang benar-benar ada di bahasa Indonesia.

---

## 1. Subjek dan predikat boleh hilang

**Masalahnya.** Bahasa Indonesia mengizinkan penghilangan subjek kalau subjeknya dianggap
sudah diketahui. Dalam percakapan manusia, ini hemat dan wajar. Dalam teks yang dibaca mesin,
tidak ada yang "sudah diketahui".

| Salah baca | Kenapa gagal | Perbaikan |
|---|---|---|
| "Gagal." | Apa yang gagal? Permintaan, unggahan, atau koneksi? | "Permintaan gagal." |
| "Sudah diperbarui." | Apa yang diperbarui, dan oleh siapa? | "Agen memperbarui profil pengguna." |
| "Perlu ditinjau." | Siapa yang meninjau, dan apa yang ditinjau? | "Peninjau harus memeriksa tiga berkas ini." |
| "Kalau gagal, ulangi." | Kedua klausa kehilangan subjek. Ulangi apa? | "Kalau permintaan gagal, kirim ulang permintaan." |

**Bahayanya berlipat.** Kalimat pendek tanpa subjek justru terlihat seperti pesan galat yang
baik, jadi kebiasaan ini sering lolos dari pemeriksaan manusia.

**Kaidah yang menjawab.** Subjek dan predikat wajib ada. Ini kaidah terpenting di skill ini.

## 2. Imbuhan mengubah peran dan makna

**Masalahnya.** Satu kata dasar melahirkan banyak bentuk, dan perannya berbeda-beda.

| Bentuk | Peran | Contoh |
|---|---|---|
| `di-` | Pasif, pelaku disembunyikan | "Berkas **di**hapus." |
| `di` | Kata depan tempat | "Berkas ada **di** folder." |
| `meN-` | Aktif, pelaku muncul | "Agen **meng**hapus berkas." |
| `ter-` | Keadaan atau ketidaksengajaan | "Berkas **ter**hapus." |

Bentuk `ter-` menandai perbuatan yang tidak disengaja atau keadaan. "Berkas terhapus" tidak
sama dengan "Agen menghapus berkas". Pembaca mesin yang memperlakukan keduanya sama akan
salah menyimpulkan tanggung jawab.

**Bahaya khusus: `di-` menyembunyikan pelaku.** "Berkas dihapus" tidak menjawab siapa yang
menghapus. Untuk teks prosedural, ini kegagalan informasi, bukan pilihan gaya.

**Kaidah yang menjawab.** Pelaku disebut. Bentuk pasif hanya dipakai kalau pelakunya memang
tidak diketahui atau tidak relevan, dan kalimatnya tetap jelas tanpa pelaku.

## 3. `-nya` berfungsi tiga sekaligus

**Masalahnya.** Akhiran `-nya` bisa berarti pemilik, penanda definit, atau keterangan.

| Contoh | Kemungkinan makna |
|---|---|
| "Berkasnya dihapus." | Berkas milik seseorang, atau berkas yang sedang dibicarakan |
| "Warnanya merah." | Warnanya (milik sesuatu), atau warnanya secara umum |
| "Akhirnya selesai." | Keterangan waktu, bukan rujukan apa pun |

Bentuk ketiga tidak berbahaya. Bentuk pertama dan kedua memaksa pembaca menebak siapa yang
dimaksud. Padanan bahasa Inggris punya pembedaan ini (*his file* versus *the file*), dan
bahasa Indonesia menghilangkannya.

**Kaidah yang menjawab.** Tulis nomina yang dimaksud. Jangan pakai `-nya` untuk rujukan yang
harus diurai pembaca.

## 4. Rantai pewatas dan urutan D-M

**Masalahnya.** Bahasa Indonesia meletakkan pewatas di belakang yang diterangkan, dan tidak
punya artikel atau tanda hubung yang membatasi kelompok kata.

| Contoh | Ambiguitasnya |
|---|---|
| "sistem pengelolaan data pengguna baru" | Pengguna baru, atau data baru? |
| "katup saluran masuk pompa bahan bakar bertekanan tinggi" | Apa yang bertekanan tinggi? Pompa, bahan bakar, atau katup? |
| "berkas laporan pemeriksaan keamanan" | Laporan tentang pemeriksaan keamanan, atau laporan pemeriksaan yang bersifat keamanan? |

Bahasa Inggris menutup ambiguitas ini sebagian dengan artikel dan tanda hubung. Bahasa
Indonesia tidak punya keduanya, jadi rantai yang panjang benar-benar terbuka bagi banyak
penafsiran.

**Kaidah yang menjawab.** Maksimal tiga kata untuk satu frasa nomina. Kalau lebih, pecah
menjadi klausa `yang` atau kalimat tersendiri.

## 5. `yang` berlapis

**Masalahnya.** Beberapa klausa `yang` dalam satu kalimat menciptakan beberapa kemungkinan
sarung.

> "Berkas yang diubah oleh agen yang dijalankan oleh pengguna yang punya izin admin."

Ada tiga calon acuan untuk setiap klausa. Pembaca mesin harus memilih satu penafsiran tanpa
dasar.

**Kaidah yang menjawab.** Satu `yang` per klausa. Pecah menjadi beberapa kalimat.

## 6. Negasi dan cakupannya

**Masalahnya.** Bahasa Indonesia punya empat bentuk negasi, dan salah memilih akan membalik
makna. Cakupan negasi juga kabur.

| Bentuk | Sasaran | Contoh |
|---|---|---|
| `tidak` | Predikat verba atau adjektiva | "Proses **tidak** berjalan." |
| `bukan` | Nomina atau frasa nomina | "Ini **bukan** berkas keluaran." |
| `jangan` | Larangan | "**Jangan** hapus berkas ini." |
| `belum` | Belum terjadi, mungkin terjadi nanti | "Proses **belum** selesai." |

Bahaya kedua adalah cakupan.

> "Semua berkas tidak dihapus."

Kalimat ini bisa berarti tidak ada satu berkas pun yang dihapus, atau tidak semua berkas
dihapus. Dua makna itu berlawanan.

**Kaidah yang menjawab.** Negasi menempel pada sasaran yang dinegasi. "Berkas ini tidak
dihapus." Untuk cakupan, perjelas: "Tidak ada berkas yang dihapus" atau "Sebagian berkas
tidak dihapus."

## 7. Penanda aspek yang bertumpuk

**Masalahnya.** Bahasa Indonesia tidak punya kala, jadi waktu dan aspek ditandai kata
keterangan. Penanda itu bisa bertumpuk, baik secara sengaja maupun tidak.

| Contoh | Masalahnya |
|---|---|
| "Berkas sudah akan dihapus." | Sudah terjadi, atau akan terjadi? |
| "Sistem telah sedang diperbarui." | Selesai, atau masih berjalan? |
| "Proses masih akan berjalan." | Berjalan sekarang, atau nanti? |

Bahasa Inggris menutup banyak dari ini lewat bentuk verba. Bahasa Indonesia tidak, sehingga
perlu disiplin eksplisit.

**Kaidah yang menjawab.** Satu penanda waktu per klausa. Sebut waktu yang lain dengan
keterangan terpisah. "Berkas akan dihapus pukul 14.00."

## 8. Nomina tindakan

**Masalahnya.** Bahasa Indonesia sangat produktif membentuk nomina dari verba dengan `peng-`
dan `-an`. Teks teknis resmi penuh dengannya.

| Nomina tindakan | Verba yang sama |
|---|---|
| pengecekan | periksa |
| pelaksanaan | laksanakan |
| pengujian | uji |
| pengaturan | atur |
| pemrosesan | proses |
| penyimpanan | simpan |

Dua akibatnya. Kalimat jadi lebih panjang. Yang lebih penting untuk pembaca mesin: pelakunya
hilang. "Perlu dilakukan pengecekan" tidak menyebut siapa yang memeriksa.

**Kaidah yang menjawab.** Pakai verbanya. "Lakukan pengecekan" menjadi "Periksa".

## 9. Kata ganti dan anteseden

**Masalahnya.** `ia`, `dia`, `mereka`, `ini`, `itu`, dan `tersebut` menuntut anteseden yang
jelas. Bahasa Indonesia memakai kata ganti itu jauh lebih longgar daripada bahasa Inggris.

> "Agen mengirim permintaan ke layanan. Layanan itu menolaknya, sehingga ia mencoba lagi."

Siapa yang mencoba lagi? Agen, atau layanan? Kata `ia` bisa merujuk keduanya, dan `-nya` pada
`menolaknya` menambah satu kandidat lagi.

**Kaidah yang menjawab.** Pakai pronomina hanya kalau antesedennya muncul di kalimat
sebelumnya dan tidak ada kandidat lain. Kalau ragu, ulangi nominanya.

## 10. Kuantitas dan cakupan yang kabur

**Masalahnya.** Bahasa Indonesia punya banyak kata kuantitas yang tidak menyebut jumlah.
Manusia menerimanya sebagai perkiraan. Pembaca mesin tidak bisa berbuat apa-apa dengannya.

| Kata | Masalahnya |
|---|---|
| beberapa | Berapa? |
| sejumlah | Berapa? |
| berbagai | Yang mana saja? |
| sebagian besar | Berapa bagian? |
| umumnya | Ada pengecualian atau tidak? |
| dll, dsb, dst | Anggotanya apa saja? |
| sda | Sama dengan apa? |

**Kaidah yang menjawab.** Sebut jumlahnya, atau sebut anggotanya. Kalau cakupannya memang
tidak diketahui, katakan itu secara eksplisit: "Jumlah yang gagal belum diketahui."

## 11. Campur bahasa dan imbuhan asing

**Masalahnya.** Teks teknis Indonesia sangat sering mencampur bahasa Inggris. Yang lebih
merepotkan, kata asing itu sering diberi imbuhan Indonesia.

| Bentuk | Masalahnya |
|---|---|
| "di-refresh" | Imbuhan pada kata asing tidak punya bentuk baku |
| "meng-update" | Tanda hubungnya tidak konsisten dengan kaidah serapan |
| "refresh-kan" | Akhiran Indonesia pada kata Inggris |
| "deploy ulang" | Setengah Indonesia, setengah Inggris |

Kaidah serapan bahasa Indonesia dibangun untuk kata yang sudah terserap, seperti *unggah* dan
*unduh*. Kata asing yang belum terserap tidak punya bentuk berimbuhan yang baku, jadi setiap
pembaca menebak sendiri.

**Kaidah yang menjawab.** Satu bahasa per kalimat. Pakai padanan Indonesia. Kalau istilah
asingnya harus dipertahankan, misalnya nama API atau nama merek, kutip sebagai literal tanpa
imbuhan: `` `refresh` ``.

## 12. Sinonim berlapis

**Masalahnya.** Kosakata bahasa Indonesia dibangun dari beberapa lapisan: Melayu, Sanskerta,
Arab, Belanda, dan Inggris. Akibatnya, satu tindakan punya banyak nama.

| Tindakan | Sinonim yang tersedia |
|---|---|
| memeriksa | periksa, cek, teliti, verifikasi, validasi, periksa ulang |
| memakai | pakai, gunakan, manfaatkan, terapkan, pergunakan, dayagunakan |
| menghapus | hapus, buang, singkirkan, hilangkan |
| memperlihatkan | tampilkan, tunjukkan, perlihatkan, tampakkan |
| mengubah | ubah, ganti, modifikasi, revisi |

Penulis manusia memutar sinonim supaya tulisannya tidak membosankan. Pembaca mesin
menyimpulkan bahwa kata yang berbeda menandakan konsep yang berbeda. Dua akibatnya bertolak
belakang, dan yang menang adalah pembaca mesin.

**Kaidah yang menjawab.** Satu istilah satu makna sepanjang dokumen. Daftar istilah
terkendali menetapkan pilihannya.

## 13. Perbandingan tanpa pembanding

**Masalahnya.** Bentuk komparatif sering muncul tanpa menyebut pembandingnya.

| Contoh | Ambiguitasnya |
|---|---|
| "Cara ini lebih cepat." | Lebih cepat daripada apa? |
| "Versi baru lebih stabil." | Diukur dengan apa? |
| "Prosesnya lebih murah." | Dibanding proses yang mana? |

**Kaidah yang menjawab.** Sebut pembandingnya, atau sebut angkanya. "Cara ini memakan 3 detik,
bukan 14 detik."

## 14. `di mana` dan `yang mana` sebagai penghubung

**Masalahnya.** Keduanya kata tanya, tetapi sering dipakai sebagai penghubung. Ini pola
terjemahan dari bahasa Inggris (*where* dan *which*).

> "Langkah di mana pengguna mengunggah berkas" — salah.
> "Langkah tempat pengguna mengunggah berkas" — benar.

Bentuk keliru ini membuat pembaca mesin memperlakukan klausa tanya di tengah kalimat
pernyataan.

**Kaidah yang menjawab.** Pakai *tempat*, *yang*, atau *saat*. Atau pecah kalimatnya.

---

## Ringkasan: sumber ambiguitas dan kaidahnya

| Sumber ambiguitas | Kaidah di `SKILL.md` |
|---|---|
| Subjek dan predikat hilang | Subjek dan predikat wajib ada |
| Imbuhan mengubah peran | Pelaku disebut |
| `-nya` tiga fungsi | Kata ganti dan rujukan |
| Rantai pewatas | Maksimal tiga kata per frasa nomina |
| `yang` berlapis | Satu `yang` per klausa |
| Negasi dan cakupannya | Negasi menempel pada sasaran |
| Penanda aspek bertumpuk | Satu penanda waktu per klausa |
| Nomina tindakan | Verba, bukan nomina tindakan |
| Kata ganti tanpa anteseden | Kata ganti dan rujukan |
| Kuantitas kabur | Kuantitas eksplisit |
| Campur bahasa | Satu bahasa per kalimat |
| Sinonim berlapis | Satu istilah satu makna |
| Perbandingan tanpa pembanding | Kuantitas eksplisit |
| `di mana` sebagai penghubung | Kata ganti dan rujukan |

## Rujukan

- **EYD Edisi V** — https://ejaan.kemendikdasmen.go.id/eyd/ Untuk kaidah ejaan, imbuhan,
  dan tanda baca yang dipakai di berkas ini.
- **KBBI Daring** — https://kbbi.kemdikbud.go.id Untuk memastikan bentuk baku setiap lema.
- **PASTI** — https://pasti.kemdikbud.go.id/istilah_list.php Untuk padanan istilah asing.
- Tata bahasa baku bahasa Indonesia untuk urutan D-M, fungsi `-nya`, dan bentuk negasi.
  Rincian rujukan ada di `../../../sumber/ste-dan-bahasa-terkendali.md`.

Untuk kaidah ejaan dan kata baku secara lengkap, pakai skill `indonesian-writing`. Skill itu
memuat `references/eyd-v.md` dan `references/kata-baku.md`.
