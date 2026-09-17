# Kaidah Lengkap

Sembilan bagian kaidah bahasa teknis terkendali Indonesia. `SKILL.md` memuat versi ringkasnya
untuk dipakai sehari-hari. Berkas ini memuat rinciannya, alasan di baliknya, dan aturan
pemeriksa mana yang menjaganya.

## Cara membaca berkas ini

Setiap kaidah punya kolom **Diperiksa**. Isinya salah satu dari:

- **Nama aturan pemeriksa** — `lint.mjs` memeriksa ini secara mekanis.
- **Manual** — butuh pertimbangan, dan pemeriksa tidak bisa memutuskan sendiri.

Kolom **Jenis** berisi **S** untuk struktural dan **L** untuk leksikal.

---

## Bagian 1: Pilihan kata

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 1.1 | L | `rotasi-sinonim` | Satu istilah untuk satu konsep sepanjang dokumen |
| 1.2 | L | `nominalisasi` | Pakai verba untuk tindakan, bukan nomina turunannya |
| 1.3 | L | Manual | Satu kata memegang satu jenis kata |
| 1.4 | L | `kata-sifat-pemasaran` | Buang kata sifat yang mengklaim mutu tanpa mengukurnya |
| 1.5 | L | Manual | Pakai kata yang paling umum dan paling pendek di antara padanannya |
| 1.6 | L | `singkatan-kabur` | Jangan pakai singkatan yang cakupannya tidak jelas |

### Penjelasan

**1.1 Satu istilah untuk satu konsep.** Pembaca mesin menyimpulkan bahwa kata yang berbeda
menandakan konsep yang berbeda. Kalau "berkas", "dokumen", dan "file" dipakai bergantian,
pembaca akan mengira ada tiga hal. Pilih satu, pakai terus. Daftar pilihannya ada di
`istilah-terkendali.md`.

**1.2 Verba, bukan nomina tindakan.** "Lakukan pengecekan terhadap berkas" memuat tiga kata
lebih banyak daripada "Periksa berkas", dan pelakunya hilang. Bentuk yang harus dihindari:
"melakukan", "melaksanakan", "mengadakan", atau "memberikan" diikuti nomina berawalan `peng-`
atau berakhiran `-an`.

**1.3 Satu kata satu jenis kata.** Bahasa Indonesia mengizinkan satu kata berpindah jenis
tanpa perubahan bentuk. *Oli* bisa jadi nomina dan verba. *Unduh* bisa jadi nomina dan verba.
Untuk pembaca mesin, perpindahan itu menghapus penanda peran. Pilih satu peran per kata per
dokumen.

**1.4 Buang klaim mutu.** Kata seperti *mulus*, *tangguh*, *canggih*, *mutakhir*, dan
*revolusioner* mengklaim mutu tanpa angka yang menopangnya. Ganti dengan ukuran, atau hapus.

**1.5 Pilih kata yang paling umum.** Kalau dua kata sama-sama benar, pilih yang lebih pendek
dan lebih sering dipakai. *Pakai* mengalahkan *memanfaatkan*. *Cek* mengalahkan *memverifikasi*.

**1.6 Singkatan dengan cakupan kabur.** *dll*, *dsb*, *dst*, dan *sda* tidak menyebutkan
anggotanya. Pembaca mesin tidak bisa memperluasnya. Sebut anggotanya, atau tulis "semua".

---

## Bagian 2: Bentuk verba dan imbuhan

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 2.1 | S | Manual | Imperatif untuk perintah, tanpa kata pelembut |
| 2.2 | S | `aspek-bertumpuk` | Satu penanda waktu per klausa |
| 2.3 | L | Manual | Jangan mencampur bentuk berimbuhan dan bentuk dasar untuk konsep yang sama |
| 2.4 | S | `pasif-tanpa-pelaku` | Bedakan bentuk sengaja dan bentuk tidak sengaja |
| 2.5 | S | Manual | Jangan menyusun verba majemuk yang maknanya tidak bisa ditebak dari unsurnya |

### Penjelasan

**2.1 Imperatif untuk perintah.** Untuk perintah, imperatif mengalahkan saran. "Hapus berkas"
mengalahkan "Berkas sebaiknya dihapus" dan "Berkas dapat dihapus". Kata pelembut seperti
*sebaiknya*, *dapat*, dan *perlu* mengubah perintah menjadi pilihan, dan pembaca mesin tidak
tahu apakah perintahnya mengikat.

**2.2 Satu penanda waktu per klausa.** Bahasa Indonesia tidak punya kala. Waktu dan aspek
ditandai kata seperti *sudah*, *telah*, *sedang*, *akan*, *masih*, dan *baru saja*. Menumpuk
penanda ini menghasilkan kalimat yang tidak bisa ditentukan waktunya.

**2.3 Satu bentuk per konsep.** Jangan memakai *unduh* dan *mengunduh* untuk hal yang sama
tanpa alasan. Jangan juga memakai *unggah* di satu tempat dan *upload* di tempat lain.

**2.4 Bedakan sengaja dan tidak sengaja.** Bentuk `ter-` menandai keadaan atau perbuatan yang
tidak disengaja. "Berkas terhapus" tidak sama dengan "Agen menghapus berkas". Untuk teks
prosedural, bedakan keduanya secara eksplisit.

**2.5 Hindari verba majemuk yang tidak transparan.** Bahasa Indonesia punya bentuk seperti
"mengambil alih", "menindaklanjuti", dan "mempertanggungjawabkan". Sebagian masih bisa
ditebak, sebagian tidak. Kalau verba majemuk menyembunyikan siapa berbuat apa, pecah menjadi
kalimat biasa.

---

## Bagian 3: Diatesis

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 3.1 | S | `pasif-tanpa-pelaku` | Aktif untuk perintah dan prosedur |
| 3.2 | S | `pasif-tanpa-pelaku` | Pasif hanya kalau pelakunya tidak diketahui atau tidak relevan |
| 3.3 | S | Manual | Kalau pasif dipakai, pastikan kalimatnya tetap utuh tanpa pelaku |

### Penjelasan

**3.1 Aktif untuk perintah.** "Agen menghapus berkas" menyebut pelakunya. "Berkas dihapus"
tidak. Untuk prosedur, pelaku adalah informasi yang dibutuhkan.

**3.2 Kapan pasif boleh.** Pasif dibenarkan kalau pelakunya memang tidak diketahui, misalnya
"Berkas itu dibuat pada 2024" ketika pembuatnya tidak relevan, atau "Konfigurasi ini diwarisi
dari versi sebelumnya".

**3.3 Pasif yang aman.** Kalau pasif dipakai, kalimatnya harus tetap menjawab pertanyaan
pembaca. "Berkas dihapus" tidak menjawab apa-apa. "Berkas dihapus otomatis oleh pembersih
cache" menjawab.

**Catatan penting.** Di ragam akademik Indonesia, pasif justru konvensinya. Skill ini
mengubahnya karena sasarannya berbeda. Untuk naskah akademik, pakai skill `indonesian-writing`,
bukan skill ini.

---

## Bagian 4: Struktur kalimat

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 4.1 | S | `panjang-kalimat` | Maksimal 20 kata untuk perintah, 25 kata untuk deskripsi |
| 4.2 | S | `klausa-berlebih` | Maksimal dua klausa per kalimat |
| 4.3 | S | Manual | Subjek dan predikat tidak boleh hilang |
| 4.4 | S | `klausa-menggantung` | Jangan menggantungkan klausa di ujung kalimat atau butir |
| 4.5 | S | Manual | Maksimal tiga kata per frasa nomina |
| 4.6 | S | `yang-berlapis` | Satu `yang` per klausa |
| 4.7 | S | Manual | Satu gagasan per kalimat |

### Penjelasan

**4.1 Batas panjang.** Angka 20 dan 25 diambil dari standar bahasa terkendali yang berlaku
umum. Perlakukan angka itu sebagai sinyal pemeriksaan awal, bukan garis yang sakral. Satu
kalimat 27 kata yang jelas lebih baik daripada dua kalimat 13 kata yang saling menggantung.

**4.2 Batas klausa.** Batas ini lebih menentukan daripada batas jumlah kata. Imbuhan bahasa
Indonesia memadatkan banyak makna ke dalam sedikit kata, jadi kalimat bisa tetap di bawah 20
kata tetapi memuat empat gagasan. Untuk pembaca mesin, jumlah klausa lebih merusak daripada
jumlah kata.

**4.3 Jangan hilangkan unsur kalimat.** Ini kaidah paling penting di berkas ini. Lihat
`ambiguitas.md` bagian 1.

**4.4 Jangan menggantung klausa.** Butir daftar atau kalimat yang berakhir dengan *dan*,
*atau*, atau *serta* membuat pembaca menunggu kelanjutan yang tidak ada.

> Salah: "Agen memeriksa berkas dan"
> Benar: "Agen memeriksa berkas."

**4.5 Rantai pewatas.** Lihat `ambiguitas.md` bagian 4. Pemeriksa tidak memeriksa kaidah ini
karena butuh penandaan jenis kata. Tanpa itu, prosa yang baik seperti "permintaan pengguna
gagal diproses" akan ikut tertandai.

**4.6 `yang` tidak berlapis.** Lihat `ambiguitas.md` bagian 5.

**4.7 Satu gagasan per kalimat.** Uji sederhananya: kalau kalimat itu bisa dipecah menjadi dua
kalimat yang masing-masing tetap bermakna, pecah.

---

## Bagian 5: Kata ganti dan rujukan

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 5.1 | S | `kata-ganti-nya` | Jangan pakai `-nya` untuk rujukan yang harus diurai |
| 5.2 | S | Manual | Jangan pakai pronomina tanpa anteseden tunggal |
| 5.3 | S | Manual | Jangan pakai `di mana` dan `yang mana` sebagai penghubung |
| 5.4 | S | Manual | Ulangi nomina kalau ada lebih dari satu kandidat |

### Penjelasan

**5.1 `-nya`.** Lihat `ambiguitas.md` bagian 3. Pemeriksa menyaring kata keterangan yang
lazim seperti *akhirnya*, *sebenarnya*, dan *biasanya*, lalu menandai sisanya sebagai anjuran
saja. Pemeriksa tidak bisa tahu apakah rujukannya sudah diperkenalkan sebelumnya.

**5.2 Pronomina.** `ia`, `dia`, `mereka`, `ini`, `itu`, dan `tersebut` menuntut anteseden.

**5.3 `di mana` dan `yang mana`.** Keduanya kata tanya. Pakai *tempat*, *yang*, *saat*, atau
pecah kalimatnya. Kaidah ini sama dengan kaidah di skill `indonesian-writing`, karena
masalahnya memang masalah bahasa Indonesia, bukan masalah ragam.

**5.4 Ulangi nomina.** Kalau ada dua kandidat rujukan, kata ganti apa pun akan ambigu. Ulangi
nominanya, walaupun terdengar berulang.

---

## Bagian 6: Kuantitas, kepastian, dan waktu

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 6.1 | L | `kuantitas-kabur` | Sebut jumlah atau anggotanya |
| 6.2 | S | `kata-ragu-bertumpuk` | Jangan menumpuk kata ragu |
| 6.3 | S | Manual | Sebut pembanding pada setiap perbandingan |
| 6.4 | S | Manual | Pertahankan modalitas tunggal apa adanya |

### Penjelasan

**6.1 Kuantitas eksplisit.** Lihat `ambiguitas.md` bagian 10.

**6.2 Jangan menumpuk kata ragu.** Satu kata ragu menyampaikan tingkat keyakinan penulis. Dua
kata ragu atau lebih menghapus informasi itu.

> Salah: "Prosesnya mungkin bisa jadi cenderung lambat."
> Benar: "Prosesnya mungkin lambat."

**6.3 Sebut pembandingnya.** "Lebih cepat" tanpa pembanding tidak berarti apa-apa. Isi
angkanya: "Cara ini butuh 3 detik, cara lama butuh 14 detik."

**6.4 Pertahankan modalitas.** Jangan pernah menaikkan keraguan menjadi kepastian. Ini kaidah
yang paling sering dilanggar oleh tulis ulang yang niatnya baik. Pemeriksa sengaja **tidak
pernah** menandai modalitas tunggal, karena keraguan itu isi dan pemeriksa yang menekannya
akan mengubah klaim penulisnya.

---

## Bagian 7: Bahasa asing dan istilah teknis

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 7.1 | S | `imbuhan-asing` | Jangan memberi imbuhan Indonesia pada kata asing |
| 7.2 | L | Manual | Satu bahasa untuk satu kalimat |
| 7.3 | L | Manual | Beri padanan saat istilah asing pertama muncul |
| 7.4 | L | Manual | Jangan menerjemahkan nama merek, nama produk, dan nama API |

### Penjelasan

**7.1 Imbuhan pada kata asing.** Lihat `ambiguitas.md` bagian 11. Kaidah serapan bahasa
Indonesia dibangun untuk kata yang sudah terserap. Kata asing yang belum terserap tidak punya
bentuk berimbuhan yang baku.

**7.2 Satu bahasa per kalimat.** Kalau istilah asingnya harus dipakai, kutip sebagai literal
tanpa imbuhan: hapus berkas dari `` `staging` ``.

**7.3 Padanan saat pertama muncul.** "Beban kognitif (*cognitive load*)" untuk kemunculan
pertama, lalu pakai satu bentuk itu terus.

**7.4 Nama diri tidak diterjemahkan.** Google, WhatsApp, API, HTTP, dan JSON tetap begitu.
Pakai skill `indonesian-writing` untuk daftar padanan istilah yang lebih lengkap.

---

## Bagian 8: Tanda baca dan format

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 8.1 | S | `titik-koma` | Jangan pakai titik koma |
| 8.2 | S | `dan-atau` | Jangan pakai `dan/atau` |
| 8.3 | S | Manual | Satu perintah satu kalimat |
| 8.4 | S | Manual | Pakai daftar untuk urutan atau syarat tiga butir atau lebih |
| 8.5 | S | Manual | Jangan pakai tanda seru atau huruf kapital untuk menekankan |

### Penjelasan

**8.1 Titik koma.** Titik koma menggabungkan dua gagasan tanpa menyatakan hubungannya. Itu
justru yang harus dihindari. Pecah menjadi dua kalimat.

**8.2 `dan/atau`.** Cakupannya kabur: apakah *dan*, apakah *atau*, atau kedua-duanya
bergantung keadaan? Pilih satu, atau tulis dua kalimat yang memisahkan keduanya.

**8.3 Satu perintah satu kalimat.** "Buka berkas dan baca baris ketiga" memuat dua perintah.
Pembaca mesin bisa menjalankan keduanya, atau hanya yang pertama. Pisahkan.

**8.4 Daftar untuk urutan.** Urutan yang disisipkan ke prosa kehilangan batas butirnya.
Daftar bernomor menyatakan urutannya secara eksplisit.

**8.5 Tanpa penekanan tipografis.** Tanda seru dan huruf kapital penuh menyimpan tingkat
kemendesakan yang tidak bisa diukur. Kalau sesuatu memang wajib, tulis "wajib".

---

## Bagian 9: Struktur paragraf dan daftar

| # | Jenis | Diperiksa | Kaidah |
|---|---|---|---|
| 9.1 | S | Manual | Satu topik per paragraf |
| 9.2 | S | Manual | Maksimal enam kalimat per paragraf |
| 9.3 | S | Manual | Kalimat pertama paragraf menyebut topiknya |
| 9.4 | S | Manual | Syarat dan pengecualian ditulis sebelum perintahnya |

### Penjelasan

**9.1 Satu topik per paragraf.** Paragraf yang memuat beberapa topik menyulitkan pemotongan
teks dan perujukan bagian.

**9.2 Batas enam kalimat.** Batas ini menjaga paragraf tetap bisa dipindai dan dipotong.

**9.3 Kalimat pertama menyebut topik.** Pembaca mesin sering hanya memakai kalimat pertama
untuk mengklasifikasi bagian. Pastikan kalimat pertama sudah mewakili isinya.

**9.4 Syarat sebelum perintah.** Pengecualian yang diletakkan setelah perintah akan
dijalankan terlambat. Untuk teks keselamatan, urutan ini bukan soal gaya, melainkan soal
benar dan salah.

> Salah: "Hapus berkas. Jangan lakukan kalau berkasnya sedang dipakai."
> Benar: "Kalau berkasnya tidak sedang dipakai, hapus berkasnya."

---

## Dasar penyusunan

Berkas ini disusun dari tiga sumber, dan bobotnya berbeda.

**Tata bahasa baku bahasa Indonesia.** Urutan D-M, fungsi `-nya`, bentuk negasi
*tidak/bukan/jangan/belum*, dan bentuk aspek *sudah/telah/sedang/akan* adalah fakta
kebahasaan. Rincian rujukannya ada di `../../../sumber/ste-dan-bahasa-terkendali.md`.

**EYD Edisi V.** Kaidah tanda baca, imbuhan, dan bentuk baku mengikuti ejaan resmi. Untuk
rincian kaidah ejaan, pakai skill `indonesian-writing`.

**Prinsip bahasa terkendali.** Gagasan bahwa satu istilah memegang satu makna, bahwa kalimat
perintah dipisahkan, dan bahwa batas panjang kalimat menjaga keterbacaan berasal dari tradisi
bahasa terkendali yang dipelopori ASD-STE100. Struktur skill ini mengadaptasi
`asd-ste100` (MIT), tetapi kaidahnya disusun ulang untuk bahasa Indonesia.

**Yang tidak punya rujukan.** Sebagian kaidah, terutama angka batas panjang dan jumlah klausa,
adalah keputusan editorial skill ini. Angka itu diambil dari standar yang berlaku umum, dan
bisa disesuaikan. Perlakukan sebagai titik awal, bukan sebagai hukum.
