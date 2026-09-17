# Verifikasi Langsung

Sumber yang saya buka sendiri saat menyusun skill ini, dan apa yang ditemukan di dalamnya.
Berkas ini adalah lapis pertama: yang **sudah diperiksa**, bukan yang diwarisi dari paket lain.

## 1. Teks kaidah EYD Edisi V

### Rujukan resmi

- **Portal EYD V**: https://ejaan.kemendikdasmen.go.id/eyd/ [P]
  Rujukan akhir untuk semua kaidah ejaan. Setiap nomor kaidah yang disebut di
  `references/eyd-v.md` berasal dari portal ini.
- **KBBI Daring**: https://kbbi.kemdikbud.go.id [P]
  Rujukan akhir untuk setiap lema dan bentuk baku.
- **PASTI**: https://pasti.kemdikbud.go.id/istilah_list.php [P]
  Rujukan padanan istilah (170.532 istilah, 50 ranah).
- **SPAI**: https://spai.kemdikbud.go.id [P]
  Padanan istilah, ±12.000 entri.
- **Keputusan Kepala Badan Pengembangan dan Pembinaan Bahasa Nomor 0424/I/BS.00.01/2022**:
  dasar hukum EYD Edisi Kelima.

### Salinan teks kaidah yang dipakai untuk pemeriksaan

Karena portal resmi memuat teks panjang per halaman, pemeriksaan dilakukan terhadap salinan
berlisensi MIT dari repositori sumber, yang mencantumkan `source_url` dan `edition` per
berkas:

| Berkas salinan | Sumber asli | Dipakai untuk |
|---|---|---|
| `eyd-v/docs/01-penggunaan-huruf/huruf-kapital.md` | https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-huruf/huruf-kapital/ | Kaidah 1–23, termasuk kaidah 21 tentang judul |
| `eyd-v/docs/01-penggunaan-huruf/huruf-miring.md` | …/huruf-miring/ | Empat fungsi huruf miring |
| `eyd-v/docs/01-penggunaan-huruf/huruf-tebal.md` | …/huruf-tebal/ | Dua fungsi huruf tebal |
| `eyd-v/docs/03-penggunaan-tanda-baca/tanda-koma.md` | …/tanda-koma/ | Kaidah 1–8 dan 13 |
| `eyd-v/docs/03-penggunaan-tanda-baca/tanda-pisah.md` | …/tanda-pisah/ | Kaidah 1–3 tentang tanda pisah |

Repositori: [ardianryan/eyd-v](https://github.com/ardianryan/eyd-v) (MIT).

### Tiga koreksi yang ditemukan

Paket sumber yang jadi bahan skill ini semuanya mengulang tiga klaim yang **tidak sesuai teks
EYD V**. Ketiganya dikoreksi di skill ini, dan koreksinya dijelaskan di
`references/eyd-v.md`.

**Koreksi 1: kapitalisasi judul.** Paket sumber menyatakan judul harus bergaya kalimat
("kapital hanya pada kata pertama dan nama diri") sebagai kaidah EYD. Teks resminya berbeda:

> **Kaidah 21.** Huruf kapital digunakan sebagai huruf pertama setiap kata (termasuk unsur
> bentuk ulang utuh) di dalam judul buku, karangan, artikel, dan makalah, serta nama media
> massa, kecuali kata tugas yang tidak terletak pada posisi awal.
>
> Misalnya: _Dari Ave Maria ke Jalan Lain ke Roma_ · _Bahasa dan Sastra_ ·
> _Penerapan Asas-Asas Hukum Perdata_

Jadi Title Case **bukan pelanggaran EYD**. Yang pelanggaran adalah **kata tugas yang ikut
dikapitalkan** (`Untuk`, `Yang`, `Dan` di tengah judul). Aturan di `scripts/check.mjs`
(`JUDUL`) menandai tepat itu, dan tidak menandai judul karya yang benar.

Gaya kalimat tetap dianjurkan untuk **heading di dalam dokumen dan web**, tetapi sebagai
konvensi keterbacaan, bukan sebagai kaidah EYD. Perbedaannya disebut eksplisit di skill.

**Koreksi 2: tanda pisah untuk mengapit keterangan.** Paket sumber melarang tanda pisah
sebagai pengganti kurung. Teks resminya justru membenarkannya:

> **Kaidah 1.** Tanda pisah dapat digunakan untuk mengapit keterangan atau penjelasan yang
> bukan bagian utama kalimat.
>
> Misalnya: _Kemerdekaan bangsa itu—saya yakin akan tercapai—diperjuangkan oleh bangsa itu
> sendiri._

Karena mengapit, jumlahnya **harus dua** dalam satu paragraf. Yang tidak dibenarkan EYD
adalah tanda pisah **tunggal** sebagai pengganti koma atau titik dua. Itu yang ditandai
sekarang, dan tanda pisah berpasangan dibiarkan lolos.

**Koreksi 3: spasi pada tanda pisah.** Contoh resmi EYD V menulis tanda pisah **tanpa
spasi** (`Kemerdekaan bangsa itu—saya yakin—`). Salinan ringkas di salah satu repositori
sumber menampilkannya berspasi dan memakai contoh yang tampak disusun sendiri. Skill ini
mengikuti teks resmi, dan menandai bentuk berspasi sebagai penyimpangan konvensi.

### Catatan keandalan salinan

- Berkas `indonesia-eyd-writing-skill/references/eyd/huruf-kapital.md` **tidak lengkap**:
  hanya memuat empat butir, dan **tidak memuat kaidah 21** sama sekali. Itulah sebabnya
  klaim keliru pada Koreksi 1 bisa lolos di paket sumber. Pemeriksaan akhirnya memakai salinan
  di repositori `eyd-v` yang memuat kaidah 1–23 lengkap.
- Berkas `indonesia-eyd-writing-skill/references/eyd/tanda-pisah.md` memuat contoh yang
  tampak tidak berasal dari teks resmi (berspasi, dan memuat butir "tanda pisah dalam daftar"
  yang tidak ada di EYD V). Tidak dipakai sebagai rujukan.
- Salinan berbasis repositori tetap salinan. Sebelum mengubah kaidah apa pun, konfirmasi ke
  portal resmi.

## 2. Pola tulisan AI

- **Wikipedia, *Signs of AI writing***:
  https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing [P]
  Sumber utama pola struktural: paralelisme negatif, *rule of three*, penghindaran kopula,
  klausa ekor, atribusi kabur, kesimpulan bergaya kerangka, Title Case, bold berlebihan,
  emoji sebagai butir, em dash, jejak alat. Yang dipakai adalah **daftar polanya sebagai
  fakta**; tidak ada teks dari halaman itu yang disalin.

- **Kobak dkk., "Delving into LLM-assisted writing in biomedical publications through excess
  vocabulary", *Science Advances* (2025)**:
  https://www.science.org/doi/10.1126/sciadv.adt3813 · pracetak: https://arxiv.org/abs/2406.07016 [A]
  Dasar kuantitatif untuk kosakata slop. 15,1 juta abstrak PubMed; rasio kelebihan ekstrem
  *delves* 28,0×, *underscores* 13,8×, *showcasing* 10,7×; 379 *excess style words*
  (66% verba); estimasi minimal 13,5% abstrak 2024 diproses LLM.

- **Pembahasan em dash sebagai penanda**:
  https://www.rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/ [S]
  · https://news.fiu.edu/2026/why-does-ai-use-so-many-em-dashes-an-expert-explains [S]

- **Peringatan false positive**: penulis manusia yang teliti kerap ikut tertuduh tulisan AI.
  Karena itu *"terlalu rapi"*, *"tanpa salah ketik"*, dan *"memakai kata baku"* **tidak**
  dijadikan penanda di skill ini. Rujukan:
  https://theconversation.com/mengapa-tulisan-asli-bisa-terdeteksi-buatan-ai-benarkah-deteksi-ai-tidak-akurat-pahami-cara-kerja-dan-tips-mengatasinya-248257 [P]

## 3. Empat repositori bahan

| Repositori | Lisensi | Peran |
|---|---|---|
| [ardianryan/eyd-v](https://github.com/ardianryan/eyd-v) | MIT | Sumber utama kerangka EYD V dan pemisahan domain profesional |
| [fathurwithyou/indonesia-eyd-writing-skill](https://github.com/fathurwithyou/indonesia-eyd-writing-skill) | MIT | Kaidah granular EYD V; sebagian berkasnya tidak lengkap (lihat catatan di atas) |
| [alvinindra/bahasa-skills](https://github.com/alvinindra/bahasa-skills) | **tanpa berkas lisensi** | Rujukan struktur saja: pola pemandu arah, pembagian kategori, protokol tiga langkah. Isi teksnya tidak disalin |

Rinciannya, termasuk alasan tidak menyalin isi paket tanpa lisensi, ada di `ATTRIBUTION.md`.

## Catatan keandalan

1. **Salinan bukan sumber primer.** Semua kaidah di `references/eyd-v.md` sudah dicocokkan
   dengan salinan resmi per kaidah, tetapi tetap perlu dikonfirmasi ke portal saat ada
   perubahan pedoman.
2. **Pemeriksaan hanya menyentuh kaidah yang dipakai skill.** Kaidah EYD V yang tidak muncul
   di `references/eyd-v.md` belum diperiksa satu per satu. Kalau Anda menambah kaidah baru,
   verifikasi dulu ke portal.
3. **Tidak ada satu pun kaidah di sini yang bersumber hanya dari blog.** Klaim yang tidak
   bisa disandarkan ke teks resmi ditandai sebagai konvensi atau preferensi gaya, bukan
   sebagai kaidah.
