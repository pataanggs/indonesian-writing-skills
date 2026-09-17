# Frasa dan Pola Terlarang

Berkas ini adalah mesin anti-slop skill. Memuat daftar frasa, pola kalimat, dan kebiasaan
format yang menandai tulisan mesin berbahasa Indonesia, beserta arah perbaikannya.

## Cara pakai

1. Sebelum menulis teks lebih dari dua paragraf, baca berkas ini.
2. Sesudah menulis, pindai draf terhadap semua tabel di bawah.
3. **Setiap temuan berarti tulis ulang kalimatnya.** Menghapus frasanya saja biasanya
   menyisakan kalimat yang tetap kosong. Kolom "arah perbaikan" menunjukkan di mana isi
   penggantinya harus datang, bukan teks yang ditempel bulat-bulat.

Untuk pemeriksaan otomatis, jalankan `node scripts/check.mjs draf.md`. Skrip itu memuat
sebagian besar pola di bawah; daftar di sini yang menuntut penilaian manusia.

## Dasar penyusunan

Daftar ini disusun dari tiga lapis sumber, dan keandalannya berbeda per lapis:

| Lapis | Sumber | Keandalan |
|---|---|---|
| Pola struktural | Wikipedia *Signs of AI writing*; kajian *excess vocabulary* Kobak dkk., *Science Advances* 2025 (15,1 juta abstrak PubMed; *delves* 28,0×, *underscores* 13,8×, *showcasing* 10,7× frekuensi normal) | Kuat |
| Kalke dari pola Inggris | Padanan Indonesia dari pola yang terkonfirmasi, misalnya *delve into* → *menyelami*, *plays an important role* → *memainkan peran penting* | Sedang |
| Penanda Indonesia | Pola keluaran model berbahasa Indonesia yang dikenali penutur, termasuk klise jurnalistik | Kualitatif; belum ada studi korpus untuk bahasa Indonesia |

**Prioritas tertinggi: "hiruk pikuk".** Ini satu-satunya penanda slop yang divalidasi
secara organik oleh penutur asli Indonesia ("kalau ada 'hiruk pikuk', pasti dari ChatGPT").
Jangan pernah pakai, dalam konteks apa pun.

**Peringatan soal false positive.** Jangan menjadikan "tulisan terlalu rapi", "tanpa salah
ketik", atau "pakai kata baku" sebagai bukti tulisan mesin. Penulis manusia yang teliti
kerap tertuduh. Yang diperiksa adalah **pola**, bukan kerapian.

---

## 1. Pembuka klise

Semua pembuka di bawah bisa menempel pada topik apa pun. Itulah buktinya mereka tidak
berkata apa-apa. Perbaikan umum: hapus, lalu mulai dari fakta, angka, atau adegan yang
spesifik untuk topik ini.

| Terlarang | Arah perbaikan |
|---|---|
| Di era digital yang serba cepat ini, … | Langsung ke subjek |
| Di era yang serba modern ini, … / Di zaman sekarang ini, … | Hapus |
| Seiring dengan perkembangan teknologi (yang semakin pesat), … | Sebut teknologinya + tahun/angka |
| Seiring berjalannya waktu, … | Sebut rentang waktunya |
| Dewasa ini, … / Belakangan ini, … (tanpa data) | Tanggal atau periode konkret |
| Tidak dapat dipungkiri bahwa … / Tak bisa dimungkiri, … | Nyatakan langsung |
| Tak pelak, … / Tak ayal, … | Hapus; kalau tak terhindarkan, jelaskan mekanismenya |
| Dalam dunia X yang terus berkembang, … | Hapus; "yang terus berkembang" selalu bisa dibuang |
| Di tengah hiruk pikuk … | Hapus total |
| Di tengah derasnya arus … / Di tengah gempuran … | Hapus; sebut peristiwanya |
| Seperti yang kita ketahui (bersama), … | Hapus; kalau semua tahu, tidak perlu ditulis |
| Penting untuk dipahami/diketahui bahwa … | Hapus; langsung isinya |
| Pernahkah Anda bertanya-tanya …? | Pertanyaan spesifik dengan detail nyata, atau hapus |
| Siapa yang tidak mengenal …? | Hapus |
| Mari kita menyelami/telusuri lebih dalam … | Hapus; langsung bahas |
| Sebelum membahas lebih lanjut, mari kita pahami dulu apa itu X | Definisikan X dalam satu kalimat langsung |
| Artikel ini akan membahas … / Dalam artikel ini, kita akan … | Hapus; pembuka adalah jawaban, bukan janji |
| Berikut adalah beberapa hal yang perlu Anda ketahui tentang … | Langsung ke butir pertama |
| X memainkan peran yang sangat penting dalam … | Katakan apa yang X *lakukan* |
| X menjadi sorotan / menuai perhatian publik | Sebut siapa yang menyoroti dan apa reaksinya |
| Dalam beberapa tahun terakhir, X mengalami pertumbuhan signifikan | Angka + sumber |
| Menjadi kunci utama dalam … | Hapus; sebut apa yang terbuka atau tertutup karenanya |
| Sejarah mencatat bahwa … / Menorehkan tinta emas … | Hapus; sebut tahun dan peristiwanya |

## 2. Transisi klise

Kuota: masing-masing maksimal **satu kali per teks**, dan jangan pernah dua paragraf
berturut-turut dibuka dengan kata transisi. Paragraf yang urutannya benar tersambung lewat
isi, bukan lewat lem.

| Terlarang (saat berulang atau jadi pembuka paragraf) | Arah perbaikan |
|---|---|
| Selain itu, / Tidak hanya itu, / Terlebih lagi, / Lebih lanjut, | Hapus; biarkan isi yang menyambung |
| Tak kalah penting, / Yang tidak kalah menarik, | Hapus |
| Namun demikian, | *Namun,* atau *Tapi* (ragam santai) |
| Oleh karena itu, / Dengan demikian, | *Jadi,*, atau gabungkan sebab-akibat dalam satu kalimat |
| Secara keseluruhan, / Pada akhirnya, | Hapus |
| Di sisi lain, (tanpa kontras nyata) | Hapus |
| Sementara itu, / Adapun, / Selanjutnya, / Dalam hal ini, | Hapus |
| Penting untuk dicatat bahwa … / Patut dicatat, … | Hapus seluruhnya |
| Perlu diingat bahwa … | Hapus |
| Seperti yang telah disebutkan sebelumnya, | Hapus; pembaca mengingat |
| Dengan kata lain, | Perbaiki kalimat pertamanya; versi kedua tidak diperlukan |
| Dalam konteks ini, … | Sebut konteksnya, atau hapus |

## 3. Penutup ritual

| Terlarang | Arah perbaikan |
|---|---|
| Sebagai kesimpulan, / Kesimpulannya, / Sebagai penutup, | Hapus labelnya; kalau butuh simpulan, tulis keputusannya |
| Nah, itulah tadi pembahasan tentang … / Demikianlah artikel … | Hapus |
| Semoga (artikel ini) bermanfaat! | Hapus |
| Selamat mencoba! | Hapus, atau ganti dengan langkah pertama yang konkret |
| Jadi, tunggu apa lagi? | Hapus |
| Yuk, mulai sekarang! / Mari bersama-sama … | CTA spesifik satu tindakan |
| Jangan ragu untuk … | Imperatif langsung: *Hubungi … kalau …* |
| Dengan memahami hal-hal di atas, Anda dapat … | Hapus |
| Ingatlah bahwa … / Pada akhirnya, semua kembali kepada Anda | Hapus |
| Bagaimana menurut Anda? Tulis di kolom komentar! | Pertanyaan spesifik yang betulan, atau hapus |
| Masa depan X terlihat (sangat) menjanjikan | Hapus; spekulasi kosong |
| Meski memiliki banyak tantangan, X tetap menjadi … | Hapus; ini rumus "despite its challenges" |
| Dengan segala kelebihan dan kekurangannya, … | Hapus |
| Bagian "Tantangan dan Arah Masa Depan" | Hapus seksi bila isinya generik |
| Itulah mengapa X hadir sebagai solusi … | Tulis apa yang diselesaikan, untuk siapa |

## 4. Frasa pemasaran kosong

Kata kunci pembedanya: bisakah pesaing mana pun memakai kalimat ini tanpa terasa aneh?
Kalau ya, kalimat itu belum spesifik.

| Terlarang | Arah perbaikan |
|---|---|
| solusi terbaik untuk (segala) kebutuhan Anda | Masalah spesifik yang diselesaikan |
| solusi lengkap / terpercaya / all-in-one / jitu | Fitur dan angkanya |
| bawa X Anda ke level berikutnya | Hasil terukur ("dari … jadi …") |
| membuka / memaksimalkan potensi (penuh) | Apa yang jadi mungkin, konkret |
| dirancang khusus untuk memenuhi kebutuhan Anda | Untuk siapa persisnya |
| hasil (yang) maksimal / optimal | Angka |
| meningkatkan efisiensi dan produktivitas | Berapa persen, pada proses apa |
| kualitas terbaik dengan harga terjangkau | Sebut harganya |
| pilihan tepat bagi Anda / wajib dicoba / wajib diketahui | Hapus |
| pengalaman yang tak terlupakan | Deskripsi konkret pengalamannya |
| tanpa hambatan / mulus tanpa kendala / terintegrasi dengan mulus | Langkah yang dihapus; apa terhubung ke apa |
| revolusioner / terobosan baru / game changer / pengubah permainan | Apa persisnya yang baru |
| di garda terdepan | Hapus |
| sangat krusial / berperan vital / memegang peranan penting | *Penting* + konsekuensinya, atau hapus |
| mercusuar harapan / tonggak sejarah / pilar utama | Hapus |
| menjadi bukti nyata komitmen kami | Hapus; tunjukkan lewat fakta |
| sejalan dengan komitmen kami untuk … | Sebut tindakan yang sudah dilakukan |
| kami percaya bahwa kualitas adalah yang utama | Tunjukkan lewat kebijakan atau angka |

## 5. Pola kalimat mesin

**Paralelisme negatif.** Pola kalimat mesin nomor satu. Larang semua variannya:

- "bukan hanya X, tetapi juga Y" · "bukan sekadar X, melainkan Y" · "tidak hanya X, namun juga Y"
- "X bukan lagi (sebuah) pilihan, melainkan (sebuah) keharusan" ← varian paling membocorkan
- "lebih dari sekadar X" · "bukan tentang X, melainkan tentang Y"
- "Y adalah lebih dari sekadar X; ia adalah Z"
- **Perbaikan:** pilih sisi yang benar, tulis sisi itu saja. Kalau kedua sisi memang penting,
  pisahkan jadi dua kalimat biasa tanpa pola kontrasnya.

**Klausa ekor.** Potong di titik sebelum koma:

- "…, sehingga menjadikannya pilihan yang ideal."
- "…, yang menunjukkan/mencerminkan/menegaskan komitmen terhadap …"
- "…, menegaskan posisinya sebagai …"
- "…, menjadikannya salah satu yang paling …"
- **Perbaikan:** kalau klausa itu membawa informasi, jadikan kalimat sendiri dengan subjek
  yang jelas. Kalau tidak, buang.

**Menghindari kopula.** Kembalikan ke kata biasa:

- "berperan sebagai / hadir sebagai / berdiri sebagai / menjadi wadah bagi" → **adalah**
- "menawarkan / membanggakan / dilengkapi dengan" (untuk fakta kepemilikan) → **punya / memiliki**
- "X merupakan sebuah Y yang …" → **X adalah Y yang …**; buang *sebuah* dan *merupakan* yang
  berlebihan

**Atribusi kabur dan lindung nilai bertumpuk:**

- "para ahli menilai / sejumlah penelitian menunjukkan / menurut berbagai sumber / banyak orang percaya" → nama + tahun, atau hapus klaimnya
- "dapat dikatakan bahwa / cenderung / pada umumnya / relatif / cukup / cenderung" bertumpuk → satu penanda ketidakpastian sudah cukup
- "diyakini / diperkirakan / diduga" tanpa pelaku → sebut siapa yang meyakini
- "menurut pengamat" → pengamat mana

**Menjilat (khusus percakapan dan balasan):**

- "Pertanyaan yang (sangat) bagus!" · "Anda benar sekali!" · "Poin yang sangat penting." ·
  "Terima kasih sudah bertanya!" → hapus, langsung jawab.
- "Sebagai asisten AI, saya …" → hapus; langsung kerjakan.

**Tripel dan penggelembung:**

- Tiga kata sifat beruntun: "cepat, mudah, dan terjangkau" → pilih satu yang paling benar
- Kata sifat bertumpuk: "sangat penting sekali", "benar-benar sangat luar biasa" → satu penguat maksimal
- "berbagai macam / segudang / sederet / beragam" → sebut jumlahnya, atau dua contoh terbaiknya

## 6. Kosakata slop

Kata di kolom kiri melonjak frekuensinya karena mesin, bukan karena penutur. Boleh dipakai
hanya dalam makna harfiahnya (misalnya *lanskap* untuk bentang alam sungguhan, *menyelami*
untuk menyelam sungguhan, *mercusuar* untuk menara suar di tepi laut).

| Slop | Pakai ini |
|---|---|
| hiruk pikuk | (jangan pernah); sebut suasananya secara konkret |
| menyelami / menggali lebih dalam / mengupas tuntas / menyelami lebih dalam | membahas, melihat, memeriksa, menelaah |
| lanskap (digital/bisnis/industri) | dunia, bidang, pasar, atau hapus |
| ranah ("dalam ranah X") | di X |
| krusial / fundamental / esensial / vital | penting (+ akibat jika diabaikan) |
| menggarisbawahi / menyoroti / menegaskan (kiasan) | menunjukkan, menandakan, atau hapus |
| memanfaatkan / mendayagunakan / mengoptimalkan (kiasan bisnis) | memakai, menggunakan |
| memupuk / menumbuhkan / merawat (kiasan) | membuat, mendorong |
| tangguh / kokoh / andal (untuk perangkat lunak atau layanan) | sebut spesifikasinya |
| mulus / tanpa hambatan / seamless | sebut langkah yang hilang |
| menavigasi / mengarungi (kiasan) | menghadapi, mengurus |
| memberdayakan (kiasan pemasaran) | membantu X melakukan Y |
| merampingkan (kiasan) | memangkas; sebut apa yang dipotong |
| transformatif / mutakhir / tercanggih / canggih | sebut versinya atau apa yang berubah |
| holistik / sinergi / paradigma / ekosistem (kiasan) | hapus; tulis mekanismenya |
| semarak / dinamis / hidup (untuk komunitas atau kota) | deskripsi konkret |
| "yang terus berkembang" (ever-evolving) | hapus |
| bersemayam / terletak indah / tersembunyi (nestled) | di |
| memulai perjalanan (embark) | mulai |
| beresonansi / menggema / bergema (kiasan) | disukai, diterima, membekas |
| menjadi saksi / menyaksikan (untuk zaman) | sebut peristiwanya |
| menuai (kritik/pujian/apresiasi) | dikritik, dipuji; sebut siapa |
| gencar / kian / kian gencar / marak (jurnalistik) | sebut berapa kali, oleh siapa |
| sejatinya / sesungguhnya (sebagai pembuka argumen) | hapus |
| deretan / jajaran / segudang / belantika | sebut jumlah atau nama |
| eksistensi (untuk "keberadaan") | keberadaan, atau hapus |
| berkontribusi (untuk hal kecil) | membantu, menambah |
| dalam rangka (untuk tujuan biasa) | untuk |
| dimana / yang mana (sebagai penghubung) | tempat, yang, saat, atau pecah kalimatnya |
| perlu adanya / untuk dapat / agar supaya | perlu, untuk, agar |

## 7. Slop format

- **Kata tugas berkapital di judul**: menurut EYD V, judul karya mengapitalkan setiap kata
  kecuali kata tugas. "Cara Memilih CMS Untuk Perusahaan" menjadi "Cara Memilih CMS untuk
  Perusahaan". Untuk heading di dalam dokumen dan web, gaya kalimat lebih lazim dan lebih
  enak dibaca: "Cara memilih CMS untuk perusahaan". Pilih satu gaya, jangan mencampurnya.
- **Bold**: hanya untuk yang benar-benar harus ditemukan saat memindai, bukan setiap istilah.
- **Bullet**: hanya untuk daftar yang sejati (langkah, opsi, spesifikasi). Argumen dan cerita
  ditulis sebagai prosa.
- **Bullet "istilah tebal + titik dua + penjelasan" yang berulang-ulang**: tanda kerangka yang
  dipaksa jadi tulisan.
- **Emoji**: bukan butir daftar, bukan hiasan penutup kalimat. Di media sosial, maksimal dua
  sampai tiga per caption dan harus menambah nada.
- **Tanda pisah (—)**: yang dilarang adalah **tanda pisah tunggal** sebagai pengganti koma
  atau titik dua. EYD V membenarkan tanda pisah untuk mengapit keterangan (karena itu harus
  berpasangan dalam satu paragraf) dan untuk menyatakan rentang (2020—2025,
  Jakarta—Bandung); rentang selalu boleh ditulis "sampai". EYD V menulisnya tanpa spasi.
  Ketiadaan tanda pisah bukan bukti tulisan manusia karena model tertentu sudah bisa
  disuruh berhenti memakainya, tetapi pemakaian tunggalnya di luar rentang adalah penanda
  yang kuat.
- **Heading bertingkat untuk teks di bawah 300 kata**: buang; tulis prosa.
- **Garis pemisah (`---`) antar-seksi**: buang kecuali format medium menuntutnya.
- **Tanda kutip keriting (’ ”) bercampur kutip lurus (" ')**: seragamkan.
- **Jejak alat** (`contentReference`, `oaicite`, `[cite: 1]`, `【】`, `turn0search`, `citeturn`):
  hapus total; itu sisa mesin yang belum dibersihkan.
- **Tanda seru beruntun** ("Gratis!!!", "Buruan!"): satu tanda seru sudah keras.
- **Kapital berlebihan** ("PENAWARAN TERBATAS"): hindari kecuali benar-benar mendesak.

## 8. Penanda struktural

Selain frasa, bentuk tulisan mesin juga terlihat dari susunannya.

| Pola | Kenapa menandai mesin | Perbaikan |
|---|---|---|
| Ritme kalimat seragam (semua 15–20 kata) | Tidak ada penutur yang menulis begitu | Selingi kalimat 3–7 kata |
| Setiap paragraf punya panjang serupa | Susunan mekanis | Biarkan panjang mengikuti gagasan |
| Setiap bagian didahului daftar | Menghindari menulis prosa | Tulis prosa; daftar hanya untuk daftar sejati |
| Setiap klaim langsung diikuti contoh generik | Isi tanpa spesifik | Contohnya harus dari kasus nyata |
| Judul yang menjanjikan lebih dari isinya | Clickbait mesin | Judul menyebut apa yang benar-benar dijawab |
| Kesimpulan yang mengulang seluruh isi | Bergaya kerangka | Tulis keputusan atau langkah berikutnya |
| Pengulangan kata kunci yang janggal di tiap paragraf | Optimasi mesin | Baca nyaring; yang janggal itu buktinya |
| Semua seksi dibuka dengan kalimat topik seragam | Struktur sekolah, bukan tulisan | Mulai dari hal yang paling penting |

## Uji akhir

Sebelum menyerahkan draf, tanyakan lima hal:

1. Adakah kalimat yang bisa dipakai untuk topik lain tanpa diubah? Tulis ulang.
2. Adakah klaim tanpa angka, nama, atau contoh? Isi atau hapus.
3. Adakah kalimat yang tidak akan diucapkan manusia ke manusia? Tulis ulang.
4. Adakah paragraf yang bisa dihapus tanpa kehilangan informasi? Hapus.
5. Bisakah pesaing menempelkan nama produk mereka di teks ini tanpa terasa aneh? Kalau ya,
   belum cukup spesifik.
