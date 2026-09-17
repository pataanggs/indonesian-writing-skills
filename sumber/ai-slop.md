# Sumber: Ciri Tulisan AI (AI Slop)

Dipakai untuk: Sepuluh Larangan Keras di `SKILL.md` dan seluruh isi
`references/frasa-terlarang.md`, termasuk daftar frasa di `scripts/rules.json`.

## Temuan metodologis yang menentukan bentuk daftar ini

Saat riset Agustus 2026, **tidak ada daftar frasa AI berbahasa Indonesia yang terkurasi di
web**. Media Indonesia membahas ciri struktural secara umum, bukan daftar kata. Karena itu
daftar di skill ini disusun dari tiga lapis, dan keandalannya berbeda per lapis:

| Lapis | Sumber | Keandalan |
|---|---|---|
| Pola struktural | Wikipedia *Signs of AI writing*; kajian *excess vocabulary* Kobak dkk. (2025) | Kuat |
| Kalke dari pola Inggris | Padanan Indonesia dari pola yang terkonfirmasi: *delve into* → *menyelami*, *plays an important role* → *memainkan peran penting* | Sedang |
| Penanda Indonesia | Pola keluaran model berbahasa Indonesia yang dikenali penutur, termasuk klise jurnalistik | Kualitatif |

Pembagian tiga lapis itu **dinyatakan terbuka** di `references/frasa-terlarang.md` supaya
pembaca tahu mana yang berdasar dan mana yang kualitatif.

## Deteksi tulisan AI versi media Indonesia

- https://radvoice.id/blog/8-cara-mendeteksi-tulisan-yang-dibuat-ai/ [S]
- https://www.cnnindonesia.com/teknologi/20250711135904-185-1249601/cara-mendeteksi-tulisan-hasil-chatgpt-ini-ciri-cirinya [S]
- https://www.tempo.co/digital/4-ciri-tulisan-yang-dihasilkan-oleh-chatgpt-2025609 [S]
- https://www.detik.com/jateng/berita/d-7940641/5-cara-deteksi-tulisan-hasil-ai-dan-chatgpt-bisa-pakai-tools-ini [S]
- https://theconversation.com/mengapa-tulisan-asli-bisa-terdeteksi-buatan-ai-benarkah-deteksi-ai-tidak-akurat-pahami-cara-kerja-dan-tips-mengatasinya-248257 [P] · juga peringatan *false positive*: penulis manusia yang teliti ikut tertuduh
- https://idntimes.com/life/education/annisa-nur-fitriani-1/tulisan-terindikasi-ai-padahal-ditulis-manual-c1c2 [S]
- https://www.threads.com/@jalanbarengintrovert/post/DX8_Fx1FHLY/ [S] · validasi penutur asli untuk **"hiruk pikuk"** sebagai penanda ChatGPT; dasar larangan prioritas tertinggi

## Pola struktural (internasional, diadaptasi)

- https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing [P] · sumber utama: paralelisme negatif, *rule of three*, penghindaran kopula, klausa ekor, atribusi kabur, kesimpulan bergaya kerangka, Title Case, bold berlebihan, emoji sebagai butir, em dash, jejak alat
- https://www.forbes.com/sites/jodiecook/2025/09/08/the-10-giveaway-signs-of-ai-writing-wikipedia-reveals/ [S]
- https://www.makeuseof.com/wikipedia-best-ai-writing-detection-guide/ [S]
- https://flowingdata.com/2025/10/20/signs-of-ai-writing-on-wikipedia/ [S]
- https://alstonantony.com/ai-seo/avoid-chatgpt-words-phrases-seo/ [S] · 300+ kata dan frasa yang sering dipakai ChatGPT
- https://blog.atharvashah.com/p/the-ultimate-ai-slop-word-blacklist [S]
- https://www.oliviacal.com/post/ai-writing-tells [S]
- https://www.aicheckr.io/blog/ai-slop-examples [S]

## Kajian frekuensi kata

- https://www.science.org/doi/10.1126/sciadv.adt3813 [A] · Kobak dkk., "Delving into LLM-assisted writing in biomedical publications through excess vocabulary", *Science Advances* (2025). 15,1 juta abstrak PubMed; rasio kelebihan ekstrem *delves* 28,0×, *underscores* 13,8×, *showcasing* 10,7×; 379 *excess style words* (66% verba); estimasi minimal 13,5% abstrak 2024 diproses LLM
- https://arxiv.org/abs/2406.07016 [A] · pracetak studi yang sama
- https://pubmed.ncbi.nlm.nih.gov/40601754/ [A]
- https://pmejournal.org/articles/10.5334/pme.1929 [A] · studi pendamping tentang kosakata ber-AI di penulisan medis
- https://www.medrxiv.org/content/10.1101/2024.05.14.24307373.full.pdf [A]

## Tanda pisah sebagai penanda

- https://www.rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/ [S]
- https://news.fiu.edu/2026/why-does-ai-use-so-many-em-dashes-an-expert-explains [S]

## Catatan keandalan

1. **"Hiruk pikuk" adalah satu-satunya penanda yang divalidasi organik oleh penutur asli
   Indonesia.** Karena itu ia dijadikan larangan prioritas tertinggi. Penanda lain di daftar
   Indonesia bersifat kualitatif.
2. **Klise jurnalistik** (*menuai*, *gencar*, *kian*, *marak*, *sejatinya*) masuk daftar
   sebagai pola keluaran model, bukan karena ada studi frekuensi. Semuanya ditandai pada
   level *peringatan*, bukan *error* karena masih sah dalam pemakaian biasa.
3. **Em dash.** Model tertentu kini bisa disuruh berhenti memakainya, jadi ketiadaan em dash
   **bukan** bukti tulisan manusia. Yang ditandai di skill ini hanya tanda pisah **tunggal**
   sebagai pengganti koma atau titik dua; bentuk berpasangan sah menurut EYD V. Rinciannya di
   [verifikasi-langsung.md](verifikasi-langsung.md).
4. **Jangan pakai "tulisan terlalu rapi" sebagai penanda AI.** Menghukum penulis manusia yang
   teliti adalah *false positive* yang sudah dikeluhkan sejumlah sumber. Karena itu kerapian
   dan ketiadaan salah ketik tidak pernah dijadikan penanda di skill ini.
5. **Belum ada studi korpus untuk bahasa Indonesia** (Garuda, SINTA, korpus berita). Kalau
   kelak terbit, jadikan dasar revisi `references/frasa-terlarang.md` dan `scripts/rules.json`.
6. Beberapa penanda diambil dari blog [S] tanpa sitasi primer. Yang tidak bisa dikonfirmasi
   hanya dipakai sebagai gambaran, tidak sebagai ambang atau aturan keras.
