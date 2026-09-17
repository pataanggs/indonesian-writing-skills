<p align="center">
  <img src="assets/banner.svg" alt="Menulis bahasa Indonesia tanpa AI slop. Dua Agent Skill: indonesian-writing untuk pembaca manusia, bahasa-teknis-terkendali untuk pembaca mesin.">
</p>

# Indonesian Writing Skills

Dua Agent Skill bahasa Indonesia. Satu untuk tulisan yang dibaca manusia, satu untuk teks yang
dibaca mesin.

| Skill | Pembacanya | Isinya |
|---|---|---|
| **`indonesian-writing`** | Manusia | Diksi, kata baku, EYD V, pemilihan kata, kalimat, plus panduan marketing, UX, SEO, dan akademik. Bebas AI slop. |
| **`bahasa-teknis-terkendali`** | Mesin | Bahasa Indonesia terkendali: aturan struktural, daftar istilah, dan pemeriksa mekanis. Untuk deskripsi tool, pesan galat, instruksi antaragen. |

Keduanya bisa dipasang bersama. Pakai yang sesuai dengan pembaca teks Anda.

---

## Pasang

```bash
npx indonesian-writing-skills
```

Salinan terbaru langsung dari GitHub, tanpa perlu publikasi npm:

```bash
npx github:pataanggs/indonesian-writing-skill
```

Atau lewat direktori skill (untuk Claude Code, Cursor, dan perkakas lain):

```bash
npx skills add pataanggs/indonesian-writing-skill
```

### Pilihan

```bash
npx indonesian-writing-skills list                        # lihat skill yang tersedia
npx indonesian-writing-skills --local                     # pasang untuk proyek ini saja
npx indonesian-writing-skills --skill indonesian-writing  # pilih satu skill
npx indonesian-writing-skills --target ~/skills           # tentukan sendiri tujuannya
npx indonesian-writing-skills --dry-run                   # tampilkan rencananya saja
```

Sesudah dipasang, **mulai sesi agen baru** supaya skill terbaca.

### Pasang manual

Salin isi folder `skills/` ke direktori skill agen Anda, lalu mulai sesi baru.

| Agen | Direktori |
|---|---|
| Command Code | `~/.commandcode/skills/` |
| Claude Code | `~/.claude/skills/` |
| Perkakas lain | lokasi skill perkakas Anda, misalnya `~/.agents/skills/` |

```bash
git clone https://github.com/pataanggs/indonesian-writing-skill
cp -r indonesian-writing-skill/skills/* ~/.commandcode/skills/
```

---

## Pakai

Skill terpicu sendiri. Tidak perlu memanggil namanya. Cukup minta:

| Permintaan | Skill yang jalan |
|---|---|
| "Perbaiki tulisan ini" · "Bikin lebih natural" · "Cek AI slop-nya" · "Rapikan ejaannya" | `indonesian-writing` |
| "Tulis ulang supaya agen tidak salah paham" · "Rapikan pesan galat ini" · "Pakai bahasa teknis terkendali" | `bahasa-teknis-terkendali` |

---

## Pemeriksa

Tiap skill memuat pemeriksa mekanis tanpa dependensi (Node 18 ke atas) untuk menangkap pola
yang lolos saat membaca cepat.

```bash
node skills/indonesian-writing/scripts/check.mjs draf.md
node skills/bahasa-teknis-terkendali/scripts/lint.mjs draf.md
```

Keduanya keluar dengan kode 1 kalau ada temuan. Jalankan `--help` untuk melihat opsinya.

Keluarannya penyaring, bukan wasit. Sebagian pola sah di konteks tertentu, jadi temuan tetap
perlu dilihat manusia.

---

## Uji

```bash
npm test
```

79 uji: pemeriksa anti-slop, pemeriksa bahasa terkendali, dan pemasangnya.

---

## Struktur

```
indonesian-writing-skill/
├── skills/
│   ├── indonesian-writing/          # untuk pembaca manusia
│   └── bahasa-teknis-terkendali/    # untuk pembaca mesin
├── sumber/                          # seluruh rujukan, dengan catatan keandalan
├── assets/                          # banner
├── README.md · ATTRIBUTION.md · LICENSE
```

`skills/` adalah satu-satunya folder yang dipasang. `sumber/` berisi dokumentasi rujukan dan
tidak ikut dipasang.

---

## Yang perlu diketahui

- **Kaidah EYD V di sini sudah dikoreksi.** Tiga klaim yang beredar luas di paket lain ternyata
  tidak sesuai teks resmi: kapitalisasi judul, tanda pisah untuk mengapit keterangan, dan spasi
  pada tanda pisah. Dasar teksnya dikutip di [`sumber/verifikasi-langsung.md`](sumber/verifikasi-langsung.md).
- **`bahasa-teknis-terkendali` bukan ASD-STE100** dan tidak berafiliasi dengan ASD maupun STEMG.
  Standar itu milik ASD dan tidak direproduksi di sini.
- **Daftar penanda slop Indonesia bersifat kualitatif.** Belum ada studi korpus untuk bahasa
  Indonesia. Satu-satunya penanda yang tervalidasi penutur asli adalah "hiruk pikuk". Rincian
  ada di [`sumber/ai-slop.md`](sumber/ai-slop.md).
- **Setiap rujukan dicatat.** Semua sumber yang dipakai, beserta penanda mutunya, ada di
  [`sumber/`](sumber/).

## Lisensi

MIT. Lihat [LICENSE](LICENSE) dan [ATTRIBUTION.md](ATTRIBUTION.md).
