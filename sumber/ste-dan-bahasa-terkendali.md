# Sumber: STE dan Bahasa Terkendali

Dipakai untuk skill `bahasa-teknis-terkendali`. Berkas ini mencatat rujukan untuk gagasan
bahasa terkendali, dan untuk klaim kebahasaan bahasa Indonesia yang dipakai di skill itu.

## 1. ASD-STE100

- https://www.asd-ste100.org/ [P] · situs resmi. ASD-STE100 adalah bahasa alami terkendali
  milik ASD (AeroSpace and Defence Industries Association of Europe), Brussels.
- https://www.asd-ste100.org/about_STE.html [P] · penjelasan umum
- https://asd-ste100.org/STE_downloads.html [P] · unduhan resmi Issue 9. Ini formulir
  permintaan yang mengirim tautan lewat surel, bukan unduhan langsung.
- https://www.asd-europe.org/standards-specifications/simplified-technical-english/ [P]
- https://en.wikipedia.org/wiki/Simplified_Technical_English [S] · sejarah: dikembangkan
  tahun 1980-an oleh AECMA atas permintaan industri penerbangan Eropa

### Batas reproduksi

Issue 9 halaman 2 menyatakan bahwa tidak ada reproduksi atau publikasi, sebagian maupun
seluruhnya, yang boleh dilakukan tanpa wewenang tertulis dari pejabat ASD. Hak reproduksi
gratis hanya diberikan kepada delapan kategori yang didaftarkan, yaitu asosiasi anggota
ASD/AIA/AIAC beserta perusahaan dan pelanggannya, kementerian pertahanan negara anggota, A4A,
otoritas kelaikan udara, serta universitas dan lembaga riset untuk tujuan pendidikan.

**Proyek ini tidak termasuk kategori mana pun.** Karena itu tidak ada teks standar dan tidak
ada isi kamus ASD yang direproduksi di repositori ini.

### Jumlah kaidah

Bagian 1 standar memuat **53 kaidah penulisan dalam 9 bagian**. Angka itu tercantum di dua
cermin publik dari ringkasan struktur standar:

- https://github.com/nuelcyoung/asd-ste100/blob/main/references/writing-rules.md [S]
- https://github.com/fre-sch/skill-asd-ste100/blob/main/references/writing-rules.md [S]

**Koreksi terhadap angka yang beredar.** Sebagian blog menyebut "65 kaidah". Angka itu keliru
dan tidak dipakai di sini. Contohnya:
https://digitalnewsbreak.com/tech/asd-ste100-simplified-technical-english-documentation [S]

**Catatan keandalan.** Angka 53 dan 9 diperiksa dari cermin publik, bukan dari dokumen resmi,
karena dokumen resmi hanya bisa diperoleh lewat permintaan. Kalau Anda memegang salinan resmi
Issue 9, verifikasi angkanya di sana.

## 2. Skill yang strukturnya diadaptasi

- https://github.com/danyuchn/asd-ste100-skill [P] · MIT, Dustin Yuchen Teng

Yang diadaptasi adalah **strukturnya**, bukan isinya:

- Pemisahan kaidah struktural (bisa diperiksa tanpa kamus) dan kaidah leksikal (bergantung
  daftar istilah).
- Dua mode: ketat untuk teks prosedural, ringan untuk prosa penjelas.
- Format keluaran: teks hasil saja sebagai bawaan, tabel aturan atas permintaan.
- Gagasan linter yang **tidak pernah menandai modalitas**, karena keraguan itu isi.
- Kejujuran menyatakan batas: apa yang diperiksa, apa yang tidak, dan mengapa.

Kaidah untuk bahasa Indonesia disusun sendiri. Tidak ada aturan bahasa Inggris yang
diterjemahkan langsung. Lihat bagian 4 untuk alasannya.

## 3. Preseden bahasa terkendali Indonesia

- https://github.com/RamaAditya49/bahasa-jelas-terkendali [P] · Apache-2.0. Skill bahasa
  terkendali Indonesia yang menyasar **copy komersial, situs, dan iklan**. Repositori itu
  menyatakan sendiri bahwa ia tidak menerjemahkan standar teknis Inggris secara langsung, dan
  bahwa ia tidak berafiliasi dengan ASD maupun STEMG.

Preseden itu **tidak menutup ceruk yang diisi skill ini**, yaitu teks teknis yang dibaca agen.
Keduanya proyek independen. Tidak ada kode atau teks yang dipertukarkan.

Pencarian pada September 2026 tidak menemukan standar bahasa terkendali Indonesia yang resmi.
Karena itu skill `bahasa-teknis-terkendali` adalah adaptasi yang disusun sendiri, dan itu
dinyatakan terbuka di `SKILL.md` dan `ATTRIBUTION.md`.

## 4. Klaim kebahasaan bahasa Indonesia

Setiap kaidah di `references/ambiguitas.md` disandarkan pada fakta kebahasaan, bukan pada
terjemahan aturan Inggris. Rujukan utamanya:

- **EYD Edisi V** — https://ejaan.kemendikdasmen.go.id/eyd/. Kaidah imbuhan, tanda baca, dan
  bentuk baku. Teks kaidahnya diperiksa langsung; lihat
  [verifikasi-langsung.md](verifikasi-langsung.md).
- **KBBI Daring** — https://kbbi.kemdikbud.go.id. Bentuk baku setiap lema.
- **PASTI** — https://pasti.kemdikbud.go.id/istilah_list.php. Padanan istilah asing.
- **Tata bahasa baku bahasa Indonesia.** Rujukan untuk urutan D-M, tiga fungsi `-nya`,
  pembedaan negasi *tidak/bukan/jangan/belum*, dan penanda aspek *sudah/telah/sedang/akan*.
  Rujukan lengkap untuk kaidah ini ada di
  [ivan-lanin-dan-kaidah.md](ivan-lanin-dan-kaidah.md), terutama bagian hukum D-M dan
  kesalahan struktur kalimat.

Rujukan untuk ragam dan ejaan dipakai bersama dengan skill `indonesian-writing`. Berkas ini
tidak menduplikasinya.

## 5. Empat kaidah bahasa Inggris yang tidak punya sasaran

Ini alasan mengapa skill ini bukan terjemahan. Keempatnya adalah kaidah utama bahasa terkendali
bahasa Inggris, dan keempatnya tidak memeriksa apa pun di bahasa Indonesia:

| Kaidah Inggris | Status di bahasa Indonesia |
|---|---|
| Larangan *phrasal verb* | Tidak ada *phrasal verb* dalam bahasa Indonesia |
| Larangan kala sempurna | Bahasa Indonesia tidak punya kala |
| Larangan bentuk *-ing* sebagai verba | Bahasa Indonesia tidak punya bentuk *-ing* |
| Batas panjang rantai nomina | Ada padanannya, tetapi wujudnya berbeda karena bahasa Indonesia tidak punya artikel dan memakai urutan D-M |

Empat hal itu dinyatakan terbuka di `references/ambiguitas.md`, supaya pembaca tahu bahwa
skill ini tidak memeriksa hal yang tidak ada di bahasanya.

## Catatan keandalan

1. **Tidak ada standar bahasa terkendali Indonesia yang resmi.** Skill ini adaptasi yang
   disusun sendiri. Ia tidak boleh disebut sertifikasi, dan tidak mengklaim kepatuhan standar
   mana pun.
2. **Angka batas panjang, yaitu 20 dan 25 kata, serta batas dua klausa, adalah keputusan
   editorial skill ini.** Angka 20 dan 25 diambil dari standar yang berlaku umum. Batas klausa
   adalah tambahan yang disusun untuk bahasa Indonesia. Ketiganya bisa disesuaikan, dan
   dinyatakan sebagai titik awal, bukan hukum.
3. **Daftar istilah terkendali adalah karya editorial skill ini.** Ia bukan reproduksi kamus
   ASD, dan tidak diklaim sebagai standar. Daftar itu bisa ditambah, dan aturan penambahannya
   ada di `references/istilah-terkendali.md`.
4. **Daftar kata asing berimbuhan dan daftar kata berawalan `di` yang bukan verba adalah
   daftar terkurasi.** Keduanya tidak lengkap menurut desain, karena bahasa Indonesia
   menyerap kata asing terus-menerus. Tambahkan kalau menemukan yang lolos.
5. **Jumlah kaidah ASD-STE100 diperiksa dari cermin publik**, bukan dari dokumen resmi, karena
   dokumen resmi hanya bisa diperoleh lewat permintaan tertulis.
