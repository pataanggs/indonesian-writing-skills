# Sumber

Folder ini mencatat **seluruh rujukan yang dipakai menyusun skill ini** supaya setiap aturan
bisa dilacak asal-usulnya dan bisa diperbarui tanpa menebak lagi.

## Dua lapis sumber

Penting dibedakan karena bobotnya tidak sama.

**Lapis 1: diverifikasi langsung untuk skill ini.** Sumber yang saya buka sendiri saat
menyusun dan mengoreksi isi skill, termasuk teks kaidah EYD V yang dipakai untuk memeriksa
ulang aturan kapitalisasi judul dan tanda pisah. Daftarnya ada di
[verifikasi-langsung.md](verifikasi-langsung.md).

**Lapis 2: bibliografi turunan.** Skill ini disusun dari tiga paket sumber (lihat
`ATTRIBUTION.md`). Dua di antaranya MIT dan satu tanpa lisensi. Paket-paket itu mencantumkan
bibliografi risetnya sendiri, dan bibliografi itulah yang dicatat di empat berkas berikut.
Isinya saya rapikan dan tulis ulang sebagai daftar rujukan; **teks catatannya tidak disalin**
dari paket tanpa lisensi.

| Berkas | Isi | Dipakai di |
|---|---|---|
| [verifikasi-langsung.md](verifikasi-langsung.md) | Sumber yang diperiksa sendiri, termasuk koreksi kaidah EYD V | semua berkas |
| [ivan-lanin-dan-kaidah.md](ivan-lanin-dan-kaidah.md) | Kerangka ragam bahasa, padanan istilah, kata baku, EYD V, kesalahan struktur kalimat | `SKILL.md`, `kata-baku.md`, `padanan-istilah.md`, `eyd-v.md` |
| [ai-slop.md](ai-slop.md) | Ciri tulisan AI, kajian frekuensi kata, penanda format | `SKILL.md`, `frasa-terlarang.md` |
| [copywriting-ux-writing.md](copywriting-ux-writing.md) | UX writing praktisi Indonesia, sapaan dan register, konvensi platform, CTA, Etika Pariwara Indonesia, campur kode | `marketing.md`, `website-ux.md` |
| [seo-dan-akademik.md](seo-dan-akademik.md) | Perilaku pencarian Indonesia, on-page, pedoman Google, kalimat efektif akademik, kejujuran sitasi | `seo.md`, `akademik.md` |
| [ste-dan-bahasa-terkendali.md](ste-dan-bahasa-terkendali.md) | Gagasan bahasa terkendali, batas reproduksi ASD-STE100, preseden Indonesia, dan klaim kebahasaan yang menopang tiap kaidah | skill `bahasa-teknis-terkendali` |
| [eyd-dan-seri-penyuluhan.md](eyd-dan-seri-penyuluhan.md) | EYD Edisi V dan tiga buku Seri Penyuluhan Bahasa Indonesia, beserta alasan folder `highlights/` tidak dipakai | `eyd-v.md`, `serapan.md`, `kalimat.md`, `pilihan-kata.md` |

## Penanda mutu sumber

- **[P] Primer.** Dokumen resmi, atau tulisan pelaku langsung (Google Search Central, Medium
  tim Gojek dan tiket.com, tulisan Ivan Lanin sendiri, portal Badan Bahasa).
- **[A] Akademik.** Jurnal, prosiding, atau repositori kampus.
- **[S] Sekunder.** Blog agensi, media, atau tulisan populer. Mutunya campuran.

**Angka dari sumber [S] yang tidak punya sitasi primer tidak pernah dijadikan aturan keras.**
Kalau sebuah klaim hanya bersumber [S] dan angkanya tidak bisa dikonfirmasi, klaim itu dipakai
sebagai gambaran, bukan sebagai ambang.

## Aturan pemeliharaan

1. Sebelum mengubah aturan kebahasaan apa pun, verifikasi dulu ke
   **kbbi.kemdikbud.go.id** (lema), **ejaan.kemendikdasmen.go.id** (kaidah EYD V), atau
   **pasti.kemdikbud.go.id** (padanan istilah). Rujukan akhir selalu sumber resmi, bukan
   daftar di repositori ini.
2. Tiap berkas punya bagian **catatan keandalan**. Jangan dihapus; perbarui kalau ada bukti
   baru. Bagian itu yang mencegah aturan lemah naik jadi aturan keras.
3. Daftar frasa AI-slop berbahasa Indonesia sebagian besar bersifat kualitatif: belum ada
   studi korpus untuk bahasa Indonesia. Kalau kelak ada studi frekuensi kata untuk korpus
   Indonesia, jadikan dasar revisi `references/frasa-terlarang.md` dan `scripts/rules.json`.
4. Kalau menambah aturan baru ke `scripts/rules.json`, cantumkan sumbernya di salah satu
   berkas di folder ini. Aturan tanpa sumber akan dihapus saat pemeliharaan berikutnya.

## Menghubungi

Kalau Anda menemukan aturan yang keliru atau sumber yang lebih baik, buka *issue* di
repositori ini. Sertakan kaidah atau lema yang jadi rujukannya, bukan hanya pendapat.
