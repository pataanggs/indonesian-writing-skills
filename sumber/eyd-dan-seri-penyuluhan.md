# Sumber: EYD dan Seri Penyuluhan

Dipakai untuk `references/eyd-v.md`, `references/serapan.md`, `references/kalimat.md`, dan
`references/pilihan-kata.md`.

## 1. EYD Edisi V

- **Portal resmi**: https://ejaan.kemendikdasmen.go.id/eyd/ [P]
- **Dasar hukum**: Keputusan Kepala Badan Pengembangan dan Pembinaan Bahasa, Kemendikdasmen RI,
  Nomor 0424/I/BS.00.01/2022.
- **Salinan teks kaidah per topik** yang dipakai untuk pemeriksaan: repositori
  [ardianryan/eyd-v](https://github.com/ardianryan/eyd-v) (MIT), yang mencantumkan `source_url`
  dan `edition` di tiap berkas. Rinciannya, termasuk tiga koreksi terhadap klaim paket bahan,
  ada di [verifikasi-langsung.md](verifikasi-langsung.md).

Topik yang bersumber dari sini dan masuk ke `eyd-v.md`: huruf abjad, huruf vokal dan konsonan,
gabungan huruf vokal dan konsonan, huruf kapital, huruf miring, huruf tebal, kata depan,
bentuk terikat, kata ganti, angka dan bilangan, tanda titik, tanda koma, tanda titik koma,
tanda titik dua, tanda hubung, tanda pisah, tanda petik, tanda elipsis, tanda kurung, tanda
garis miring, tanda apostrof, singkatan, akronim, gelar, dan pemenggalan kata.

Topik yang bersumber dari sini dan masuk ke `serapan.md`: seluruh 95 kaidah penyerapan umum,
4 kaidah penyerapan khusus, dan daftar serapan lazim yang tidak diubah.

## 2. Seri Penyuluhan Bahasa Indonesia

Buku terbitan **Badan Pengembangan dan Pembinaan Bahasa, Kemendikdasmen RI**. Ini bahan
penyuluhan resmi badan bahasa, jadi bobotnya setara dengan pedoman, bukan sekadar blog.

Tiga judul yang dipakai:

| Buku | Bagian yang dipakai | Masuk ke |
|---|---|---|
| **Ejaan** | Bagian V, Penulisan Unsur Serapan | `serapan.md` |
| **Kalimat** | Bagian IV (unsur kalimat), bagian VII (pengingkaran), bagian VIII (kalimat efektif) | `kalimat.md` |
| **Bentuk dan Pilihan Kata** | Bagian II (pembentukan kata), bagian III (pemilihan kata), terutama 3.5 | `pilihan-kata.md` |

Salinan ketiga buku itu ada di repositori
[fathurwithyou/indonesia-eyd-writing-skill](https://github.com/fathurwithyou/indonesia-eyd-writing-skill)
(MIT), di folder `references/seri-penyuluhan/`.

### Yang diambil dari buku Kalimat

- Unsur kalimat (subjek, predikat, objek, pelengkap, keterangan), bagian IV.
- Pola kalimat dasar, bagian IV.
- Kalimat taklengkap dan kapan penggunaannya sah, bagian 6.4.
- **Lima ciri kalimat efektif**: kelugasan, ketepatan, kejelasan, kehematan, kesejajaran,
  bagian 8.1. Ini yang jadi tulang `kalimat.md`.
- Kalimat partisipial, bagian 8.2.
- Pengingkaran, bagian VII.

### Yang diambil dari buku Bentuk dan Pilihan Kata

- Ketepatan: denotasi dan konotasi, sinonim, generik dan spesifik, konkret dan abstrak,
  eufemisme, bagian 3.1.
- Kecermatan: kata bermakna jamak, sinonim, kata bermakna 'saling', kata yang tidak sesuai
  konteks, bagian 3.2.
- **Sebelas panduan pemakaian kata**, bagian 3.5. Ini isi paling praktis dari seluruh buku,
  dan jadi bagian 3 di `pilihan-kata.md`:
  *saya/kita/kami*, *kebijakan/kebijaksanaan*, *mantan/bekas*, *jam/pukul*, *dari/daripada*,
  *yaitu/yakni*, *adalah/ialah*, *antara lain/misalnya*, *kepada/terhadap*, *dsb./dll./dst.*,
  *tetapi/akan tetapi/namun*.

## 3. Yang sengaja tidak dipakai

**Folder `highlights/`** di repositori yang sama memuat tiga berkas: *highlight-imbuhan.md*,
*hightlight-tanda-baca.md*, dan *highlight-ikhtisar.md*. Isinya adalah **ekstraksi konten
Instagram**, dengan kepala berkas "Ekstraksi Highlight Instagram", disertai "Contoh Soal PBM"
(soal latihan UTBK).

Tiga alasan tidak dipakai:

1. **Sumbernya tidak dapat diverifikasi.** Isinya salinan dari unggahan Instagram, tanpa
   penulis atau lembaga yang bisa dirujuk.
2. **Tujuannya berbeda.** Isinya disusun untuk latihan ujian, bukan untuk panduan menulis.
   Bagian "Contoh Soal PBM" tidak relevan untuk skill ini.
3. **Isinya tumpang tindih.** Topik yang dibahas (imbuhan, tanda baca, ikhtisar) sudah
   tercakup di `kata-baku.md`, `eyd-v.md`, dan `serapan.md` dengan sumber yang lebih kuat.

Kalau Anda ingin memakainya, pakai sebagai bahan latihan soal, bukan sebagai rujukan kaidah.

## 4. Material lain yang diperiksa

### 4.1 Salinan ganda di dalam paket plugin

`indonesia-eyd-writing-skill` memuat folder `references/eyd/` **dua kali**: sekali di akar
repositori, sekali lagi di dalam `skills/indonesia-eyd-writing-skill/references/eyd/`. Folder
kedua adalah salinan untuk bundel plugin.

Keduanya dibandingkan dengan hash MD5: **37 berkas, seluruhnya identik.** Tidak ada isi yang
hilang kalau hanya satu yang dipakai.

### 4.2 Empat sub-skill `eyd-v/skills/`

`ardianryan/eyd-v` memuat empat folder sub-skill: `eyd-v-ux`, `eyd-v-marketing`, `eyd-v-seo`,
dan `eyd-v-academic`.

**Berkas `SKILL.md` keempatnya kosong.** Isinya hanya frontmatter dan satu baris judul, tanpa
badan instruksi sama sekali:

> `# EYD V: Spesialis Karya Ilmiah & Riset Akademis`

Jadi tidak ada kaidah yang bisa diambil dari keempat berkas itu.

Yang **ada** isinya adalah folder `prompts/` dan `templates/` di dalamnya. Material itu
operasional, bukan kaidah baru, dan sudah diserap ke berkas domain:

| Berkas sumber | Yang diambil | Masuk ke |
|---|---|---|
| `eyd-v-ux/prompts/interview.md` | Empat pertanyaan sebelum menulis teks antarmuka; anggaran karakter tombol | `website-ux.md` |
| `eyd-v-ux/templates/error-and-cta.md` | Formula pesan galat; pola tombol verba + objek | `website-ux.md` |
| `eyd-v-seo/prompts/intent-analysis.md` | Jenis search intent; hierarki H1–H3 | sudah ada, tidak ditambah |
| `eyd-v-seo/templates/article-structure.md` | Panjang jawaban cepat 40–50 kata di dua kalimat pertama | `seo.md` |
| `eyd-v-marketing/prompts/brief-check.md` | Lembar periksa empat poin sebelum terbit | `marketing.md` |
| `eyd-v-marketing/templates/campaign-and-threads.md` | Formula utasan: pengait, masalah, solusi, aksi | `marketing.md` |
| `eyd-v-academic/prompts/academic-review.md` | Lembar tinjauan naskah: IMRaD, ragam, sitasi | `akademik.md` |
| `eyd-v-academic/templates/imrad-abstract.md` | Proporsi kalimat per unsur abstrak | `akademik.md` |

### 4.3 Tiga koreksi terhadap material itu

Material di atas disalin sebagai **kerangka**, bukan sebagai teks. Tiga hal diperbaiki:

1. **Contoh di `campaign-and-threads.md` memuat slop.** Kalimat pembukanya, "Di era kolaborasi
   cepat, ketidakkonsistenan istilah bikin dokumentasi terasa berantakan", adalah pembuka klise
   zaman, dan lanjutannya memuat tripel kata sifat. Contoh itu tidak dipakai. Yang diambil hanya
   kerangkanya: pengait, masalah, solusi, aksi.
2. **Contoh di `imrad-abstract.md` memuat angka karangan.** Abstrak contohnya menyebut
   "mereduksi kesalahan ortografi sebesar 94,2%". Angka itu tidak punya sumber, dan justru
   contoh dari aturan anti-halusinasi. Templatnya tidak dipakai; sebagai gantinya
   `akademik.md` memuat larangan mengarang angka untuk mengisi templat, dengan penanda
   `[ANGKA HASIL DIPERLUKAN]`.
3. **Batas panjang title tag ditulis terlalu keras.** `intent-analysis.md` menyatakan judul
   "wajib maksimal 60 karakter". `seo.md` tetap memakai rentang 50–60 karakter, karena itu yang
   lebih akurat: angka 60 adalah batas praktis tampilan, bukan ambang mutlak.

Selain itu, kata *krusial* dipakai di `brief-check.md` sebagai kata biasa. Kata itu ada di
daftar kosakata slop `frasa-terlarang.md`, jadi tidak dipakai di berkas skill.

## Catatan keandalan

1. **Buku-buku itu disalin, bukan dirujuk.** Salinan di repositori MIT mungkin berbeda dari
   cetakan resmi Badan Bahasa. Sebelum mengubah kaidah apa pun, verifikasi ke
   **ejaan.kemendikdasmen.go.id** atau **kbbi.kemdikbud.go.id**.
2. **Buku Seri Penyuluhan memakai penomoran contoh sendiri** (contoh 167, 168, dan seterusnya).
   Nomor itu tidak dipakai di berkas skill, karena tidak bermakna di luar bukunya.
3. **Sebagian isi buku bersifat penjelasan, bukan kaidah.** Yang diambil hanya bagian yang bisa
   diperiksa atau diterapkan. Taksonomi jenis kalimat misalnya tidak diambil, karena berguna
   untuk mengajar, bukan untuk menyunting.
4. **Dua kerangka "kalimat efektif" yang berbeda dipakai di repositori ini.** EYD dan
   `eyd-v.md` menyebut enam syarat: kelengkapan, keparalelan, kehematan, kelogisan,
   keterpaduan, kecermatan. Buku Seri Penyuluhan menyebut lima ciri: kelugasan, ketepatan,
   kejelasan, kehematan, kesejajaran. Keduanya benar dan keduanya baku. `kalimat.md` memakai
   kerangka Seri Penyuluhan karena lebih rinci; `eyd-v.md` mempertahankan kerangka EYD sebagai
   ringkasan. Perbedaannya dinyatakan terbuka di kedua berkas.
5. **Folder `highlights/` tidak dipakai**, dan alasannya dicatat di bagian 3 supaya keputusan
   itu tidak perlu ditelusuri lagi.
