#!/usr/bin/env node
/**
 * Pemeriksa mekanis untuk kaidah struktural bahasa teknis terkendali Indonesia.
 *
 * Memeriksa apa yang lolos saat membaca cepat: titik koma, kalimat kepanjangan,
 * nominalisasi, singkatan kabur, dan/atau, imbuhan pada kata asing, penanda aspek
 * bertumpuk, klausa menggantung, pasif tanpa pelaku, tumpukan kata ragu, kuantitas
 * kabur, rujukan -nya, yang berlapis, dan rotasi sinonim.
 *
 * Sengaja TIDAK PERNAH menandai modalitas tunggal. Keraguan itu isi, bukan gaya.
 * Pemeriksa yang menekan keraguan akan mengubah klaim penulisnya. Lihat bagian
 * "Modalitas" di SKILL.md, dan uji "--selftest" yang memastikan itu.
 *
 * Pemakaian:
 *   node scripts/lint.mjs berkas.md
 *   node scripts/lint.mjs berkas.md --json
 *   node scripts/lint.mjs berkas.md --baseline 5
 *   node scripts/lint.mjs berkas.md --disable pasif-tanpa-pelaku
 *   cat berkas.md | node scripts/lint.mjs -
 *   node scripts/lint.mjs --selftest
 *
 * Keluar dengan kode 1 kalau temuan keras melebihi nilai --baseline (bawaan 0).
 * Temuan anjuran tidak pernah menggagalkan pemeriksaan.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

const USAGE = `Pemeriksa kaidah struktural bahasa teknis terkendali Indonesia.

Pemakaian:
  node scripts/lint.mjs <berkas...> [opsi]
  node scripts/lint.mjs -              baca dari stdin

Opsi:
  --json                 keluarkan hasil sebagai JSON
  --baseline <n>         toleransi n temuan keras (bawaan 0)
  --disable <a,b>        matikan aturan tertentu
  --quiet                hanya tampilkan ringkasan
  --selftest             jalankan uji bawaan lalu keluar
  --help                 tampilkan bantuan ini

Keluar dengan kode 1 kalau temuan keras melebihi baseline.`;

// --- Daftar rujukan ---------------------------------------------------------

/** Kata dan frasa yang mengklaim mutu tanpa mengukurnya. */
const KATA_SIFAT_PEMASARAN = [
  'mulus', 'tangguh', 'canggih', 'mutakhir', 'revolusioner', 'seamless',
  'powerful', 'robust', 'handal', 'game changer', 'terdepan', 'tanpa hambatan',
  'kelas dunia',
];

/** Singkatan yang cakupannya tidak bisa diperluas pembaca mesin. */
const SINGKATAN_KABUR = ['dll', 'dsb', 'dst', 'sda', 'dll.', 'dsb.', 'dst.', 'sda.'];

/** Kuantitas yang benar secara bahasa tetapi tidak memadai untuk pembaca mesin. */
const KUANTITAS_KABUR = [
  'beberapa', 'sejumlah', 'berbagai', 'sebagian besar', 'sebagian',
  'mayoritas', 'umumnya', 'biasanya', 'kurang lebih', 'sekitar',
];

/** Kata ragu. Satu saja tidak pernah ditandai. Dua atau lebih dalam satu kalimat ditandai. */
const KATA_RAGU = [
  'mungkin', 'bisa', 'dapat', 'cenderung', 'sepertinya', 'kemungkinan',
  'berpotensi', 'agaknya', 'kira-kira', 'barangkali', 'tampaknya', 'rupa-rupanya',
];

/** Penanda klausa. Dipakai menghitung jumlah klausa dalam satu kalimat. */
const PENANDA_KLAUSA = [
  'dan', 'atau', 'serta', 'tetapi', 'namun', 'sedangkan', 'melainkan',
  'karena', 'sebab', 'sehingga', 'agar', 'supaya', 'jika', 'bila', 'kalau',
  'ketika', 'setelah', 'sebelum', 'meskipun', 'walaupun', 'bahwa', 'lalu',
  'kemudian', 'sementara', 'yang',
];

/** Kata berawalan `di` yang bukan verba pasif. */
const BUKAN_PASIF = new Set([
  'dia', 'diam', 'dinding', 'dinas', 'dini', 'diri', 'dunia', 'dinamis',
  'diskusi', 'digital', 'direktur', 'distrik', 'diagram', 'diameter', 'diploma',
  'dilema', 'dinasti', 'disiplin', 'diskon', 'diskursus', 'diversifikasi',
  'diksi', 'dimensi', 'diproklamasikan', 'diakses', // diakses tetap pasif, tapi sering wajar
]);

/** Kata berakhiran `-nya` yang sudah menjadi keterangan, bukan rujukan. */
const NYA_KETERANGAN = new Set([
  'akhirnya', 'sebenarnya', 'sesungguhnya', 'sebaiknya', 'seharusnya',
  'secepatnya', 'selamanya', 'biasanya', 'umumnya', 'misalnya', 'contohnya',
  'seluruhnya', 'semuanya', 'satu-satunya', 'agaknya', 'rupanya', 'tampaknya',
  'kelihatannya', 'nantinya', 'rupanya', 'sebaliknya', 'selebihnya',
  'sebetulnya', 'sungguhnya', 'alangkahnya', 'sedangkan',
]);

/**
 * Kata asing yang sering diberi imbuhan Indonesia. Imbuhan pada kata asing tidak
 * punya bentuk baku, jadi setiap pembaca menebak sendiri.
 */
const KATA_ASING = [
  'refresh', 'deploy', 'update', 'install', 'uninstall', 'upload', 'download',
  'backup', 'restore', 'reset', 'restart', 'check', 'test', 'submit', 'post',
  'share', 'login', 'logout', 'cancel', 'save', 'delete', 'edit', 'apply',
  'commit', 'push', 'pull', 'merge', 'build', 'run', 'start', 'stop', 'log',
  'scan', 'render', 'cache', 'sync', 'load', 'parse', 'fetch', 'trigger',
  'schedule', 'queue', 'validate', 'verify', 'migrate', 'rollback', 'debug',
  'release', 'patch', 'monitor', 'track', 'setup', 'config',
];

/**
 * Kelompok sinonim yang diputar untuk tindakan yang sama.
 *
 * Bentuk permukaan ditulis eksplisit, karena imbuhan bahasa Indonesia mengubah huruf
 * pertama kata dasar: periksa menjadi memeriksa, bukan meperiksa. Yang dihitung adalah
 * jumlah LEKSEM yang berbeda, bukan jumlah bentuk. Satu verba yang dipakai dalam
 * bentuk imperatif dan bentuk aktif tetap satu leksem, jadi tidak dianggap rotasi.
 *
 * Hanya pasangan yang benar-benar bisa saling menggantikan yang masuk. Pasangan yang
 * maknanya berbeda, seperti kesalahan dan kegagalan, sengaja dibiarkan di luar.
 */
const KELOMPOK_SINONIM = [
  [
    ['periksa', ['periksa', 'memeriksa', 'diperiksa', 'pemeriksaan']],
    ['cek', ['cek', 'mengecek', 'dicek', 'pengecekan']],
    ['verifikasi', ['verifikasi', 'memverifikasi', 'diverifikasi']],
    ['validasi', ['validasi', 'memvalidasi', 'divalidasi']],
  ],
  [
    ['hapus', ['hapus', 'menghapus', 'dihapus', 'penghapusan']],
    ['buang', ['buang', 'membuang', 'dibuang']],
    ['singkirkan', ['singkirkan', 'menyingkirkan', 'disingkirkan']],
  ],
  [
    ['hentikan', ['hentikan', 'menghentikan', 'dihentikan']],
    ['matikan', ['matikan', 'mematikan', 'dimatikan']],
  ],
  [
    ['tampilkan', ['tampilkan', 'menampilkan', 'ditampilkan', 'tampilan']],
    ['tunjukkan', ['tunjukkan', 'menunjukkan', 'ditunjukkan']],
    ['perlihatkan', ['perlihatkan', 'memperlihatkan', 'diperlihatkan']],
  ],
  [
    ['pakai', ['pakai', 'memakai', 'dipakai', 'pemakaian']],
    ['gunakan', ['gunakan', 'menggunakan', 'digunakan', 'penggunaan']],
    ['manfaatkan', ['manfaatkan', 'memanfaatkan', 'dimanfaatkan', 'pemanfaatan']],
  ],
  [
    ['ubah', ['ubah', 'mengubah', 'diubah', 'perubahan']],
    ['ganti', ['ganti', 'mengganti', 'diganti', 'penggantian']],
    ['modifikasi', ['modifikasi', 'memodifikasi', 'dimodifikasi']],
  ],
  [
    ['kirim', ['kirim', 'mengirim', 'dikirim', 'pengiriman']],
    ['antar', ['antar', 'mengantar', 'diantar']],
    ['transmisikan', ['transmisikan', 'mentransmisikan']],
  ],
  [
    ['simpan', ['simpan', 'menyimpan', 'disimpan', 'penyimpanan']],
    ['rekam', ['rekam', 'merekam', 'direkam', 'rekaman']],
    ['catat', ['catat', 'mencatat', 'dicatat', 'pencatatan']],
  ],
  [
    ['ambil', ['ambil', 'mengambil', 'diambil', 'pengambilan']],
    ['dapatkan', ['dapatkan', 'mendapatkan', 'didapatkan']],
    ['peroleh', ['peroleh', 'memperoleh', 'diperoleh']],
  ],
  [
    ['buat', ['buat', 'membuat', 'dibuat', 'pembuatan']],
    ['bikin', ['bikin', 'membikin', 'dibikin']],
    ['ciptakan', ['ciptakan', 'menciptakan', 'diciptakan']],
    ['hasilkan', ['hasilkan', 'menghasilkan', 'dihasilkan']],
  ],
  [
    ['jalankan', ['jalankan', 'menjalankan', 'dijalankan']],
    ['eksekusi', ['eksekusi', 'mengeksekusi', 'dieksekusi']],
  ],
  [
    ['perbarui', ['perbarui', 'memperbarui', 'diperbarui', 'pembaruan']],
    ['mutakhirkan', ['mutakhirkan', 'memutakhirkan', 'dimutakhirkan']],
  ],
  [
    ['pulihkan', ['pulihkan', 'memulihkan', 'dipulihkan', 'pemulihan']],
    ['kembalikan', ['kembalikan', 'mengembalikan', 'dikembalikan']],
  ],
  [
    ['mulai', ['mulai', 'memulai', 'dimulai']],
    ['awali', ['awali', 'mengawali', 'diawali']],
  ],
];

const MAKS_KATA = 25; // batas deskripsi; batas perintah 20 tidak terdeteksi tanpa konteks
const MAKS_PENANDA_KLAUSA = 4;

// --- Argumen ----------------------------------------------------------------

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log(USAGE);
  process.exit(0);
}

const flagValue = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`${name}=`));
  if (hit) return hit.split('=').slice(1).join('=');
  const idx = argv.indexOf(name);
  if (idx !== -1 && argv[idx + 1] && !argv[idx + 1].startsWith('-')) return argv[idx + 1];
  return fallback;
};

const asJson = argv.includes('--json');
const quiet = argv.includes('--quiet');
const jalankanSelftest = argv.includes('--selftest');
const baseline = Number.parseInt(flagValue('--baseline', '0'), 10) || 0;
const disabled = new Set(
  flagValue('--disable', '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
);
// Nilai dari opsi ini bukan nama berkas. Lewati saat menyusun daftar berkas.
const OPSI_BERNILAI = new Set(['--baseline', '--disable']);
const files = [];
for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i];
  if (OPSI_BERNILAI.has(a)) {
    i += 1;
    continue;
  }
  if (a.startsWith('--') && a.includes('=')) continue;
  if (a.startsWith('-') && a !== '-') continue;
  files.push(a);
}

// --- Utilitas ---------------------------------------------------------------

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const flat = (s) => s.replace(/\s+/g, ' ').trim();
const words = (s) => s.match(/[\p{L}\p{N}]+/gu) || [];

/** Batas kata yang sadar aksara Latin dan sufiks bahasa Indonesia. */
const bounded = (term) =>
  new RegExp(`(?<![\\p{L}])${esc(term)}(?:nya|lah|kah|pun|kan)?(?![\\p{L}])`, 'giu');

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

function posOf(starts, index) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= index) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo + 1, col: index - starts[lo] + 1 };
}

/** Bagi teks menjadi kalimat, sambil menyimpan posisi tiap kalimat. */
function sentences(text) {
  const out = [];
  const re = /[^.!?\n]+[.!?]*/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[0].trim()) out.push({ text: m[0], index: m.index });
  }
  return out;
}

// --- Pemeriksaan ------------------------------------------------------------

function check(text, file) {
  const findings = [];
  const starts = lineStarts(text);

  const push = (index, endIndex, severity, id, message, hint) => {
    if (disabled.has(id)) return;
    const { line, col } = posOf(starts, index);
    const from = Math.max(0, index - 30);
    const to = Math.min(text.length, (endIndex || index) + 30);
    findings.push({
      file,
      line,
      col,
      severity,
      id,
      message,
      hint,
      snippet: `${from > 0 ? '…' : ''}${flat(text.slice(from, to))}${to < text.length ? '…' : ''}`,
    });
  };

  // Zona yang bukan prosa: frontmatter, blok kode, tabel, dan coretan contoh salah.
  const zones = [];
  {
    const fm = text.match(/^---\n[\s\S]*?\n---/);
    if (fm) zones.push({ start: 0, end: fm[0].length, kind: 'frontmatter' });
    let f;
    const fence = /^[ \t]*```[\s\S]*?^[ \t]*```/gm;
    while ((f = fence.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'kode' });
    }
    const row = /^[ \t]*\|.*$/gm;
    while ((f = row.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'tabel' });
    }
    const strike = /~~[^~\n]+~~/g;
    while ((f = strike.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'coret' });
    }
    // Teks di dalam tanda petik adalah kata orang lain. Dipakai untuk mengecualikan
    // penilaian modalitas, karena penulis tidak sedang menyatakan keraguan itu.
    const petik = /"[^"\n]+"/g;
    while ((f = petik.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'petik' });
    }
  }
  const inZone = (index, kind) =>
    zones.some((z) => z.kind === kind && index >= z.start && index < z.end);
  const PROSA = ['frontmatter', 'kode', 'tabel', 'coret'];
  const lewatiProsa = (index) => PROSA.some((k) => inZone(index, k));

  // --- 1. Titik koma (keras) ---
  {
    const re = /;/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + 1, 'keras', 'titik-koma', 'Titik koma',
        'Titik koma menggabungkan dua gagasan tanpa menyatakan hubungannya. Pisahkan menjadi dua kalimat.');
    }
  }

  // --- 2. dan/atau (keras) ---
  {
    const re = /\bdan\s*\/\s*atau\b/gi;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'keras', 'dan-atau', `"${flat(m[0])}"`,
        'Cakupannya kabur. Tulis "dan", atau tulis "atau", atau tulis dua kalimat.');
    }
  }

  // --- 3. Singkatan kabur (keras) ---
  for (const s of SINGKATAN_KABUR) {
    const re = bounded(s);
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'keras', 'singkatan-kabur', `"${m[0]}"`,
        'Pembaca mesin tidak bisa memperluasnya. Sebut anggotanya, atau tulis "semua".');
    }
  }

  // --- 4. Nominalisasi (keras) ---
  {
    const re =
      /\b(melakukan|melaksanakan|mengadakan|memberikan|dilakukan|dilaksanakan|mengadakan)\s+((?:peng|pem|pen|per)\w+|\w+an)\b/gi;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'keras', 'nominalisasi', `"${flat(m[0])}"`,
        'Pakai verbanya. "Lakukan pengecekan" menjadi "Periksa".');
    }
  }

  // --- 5. Imbuhan pada kata asing (keras) ---
  {
    const alt = KATA_ASING.map(esc).join('|');
    const pola = [
      new RegExp(`\\bdi-?(?:${alt})\\b`, 'giu'),
      new RegExp(`\\b(?:me|meng|men|mem)-?(?:${alt})\\b`, 'giu'),
      new RegExp(`\\b(?:${alt})-(?:kan|nya|lah)\\b`, 'giu'),
      new RegExp(`\\b(?:${alt})\\s+ulang\\b`, 'giu'),
    ];
    for (const re of pola) {
      let m;
      while ((m = re.exec(text)) !== null) {
        if (lewatiProsa(m.index)) continue;
        push(m.index, m.index + m[0].length, 'keras', 'imbuhan-asing', `"${flat(m[0])}"`,
          'Imbuhan pada kata asing tidak punya bentuk baku. Pakai padanan Indonesia, atau kutip istilahnya sebagai literal tanpa imbuhan.');
      }
    }
    // Kata asing tanpa imbuhan: anjuran saja, karena nama API memang sering muncul.
    const telanjang = new RegExp(`\\b(?:${alt})\\b`, 'giu');
    let m;
    while ((m = telanjang.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'anjuran', 'kata-asing', `"${m[0]}"`,
        'Pertimbangkan padanan Indonesia. Kalau istilah ini nama API atau nama merek, biarkan dan kutip sebagai literal.');
    }
  }

  // --- 6. Penanda aspek bertumpuk (keras) ---
  {
    const re =
      /\b(?:sudah|telah|masih|sedang|akan)\s+(?:sudah|telah|masih|sedang|akan)\b/gi;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'keras', 'aspek-bertumpuk', `"${flat(m[0])}"`,
        'Bahasa Indonesia tidak punya kala. Penanda aspek yang bertumpuk membuat waktunya tidak bisa ditentukan.');
    }
  }

  // --- 7. Kata sifat pemasaran (keras) ---
  for (const s of KATA_SIFAT_PEMASARAN) {
    const re = bounded(s);
    let m;
    while ((m = re.exec(text)) !== null) {
      if (lewatiProsa(m.index)) continue;
      push(m.index, m.index + m[0].length, 'keras', 'kata-sifat-pemasaran', `"${m[0]}"`,
        'Klaim mutu tanpa ukuran. Ganti dengan angka, atau hapus.');
    }
  }

  // --- 8. Klausa menggantung di butir daftar (keras) ---
  // Butir yang teksnya melanjut ke baris berikutnya TIDAK dianggap menggantung.
  // Tanpa ini, butir yang dibungkus perata teks akan tertandai palsu.
  {
    const baris = text.split('\n');
    const offsetBaris = [];
    let akumulasi = 0;
    for (const b of baris) {
      offsetBaris.push(akumulasi);
      akumulasi += b.length + 1;
    }

    for (let i = 0; i < baris.length; i += 1) {
      const line = baris[i];
      if (/^[ \t]*\|/.test(line)) continue;
      const item = line.match(/^([ \t]*)(?:[-*+]|\d+[.)])[ \t]+(.*)$/);
      if (!item) continue;

      const indent = item[1].length;
      let badan = item[2].trim();

      // Kumpulkan baris lanjutan supaya yang diperiksa akhir butirnya, bukan akhir barisnya.
      let j = i + 1;
      while (j < baris.length) {
        const next = baris[j];
        if (!next.trim()) break;
        if (/^[ \t]*(?:[-*+]|\d+[.)])[ \t]/.test(next)) break;
        const indentNext = next.match(/^[ \t]*/)[0].length;
        if (indentNext <= indent) break;
        badan += ` ${next.trim()}`;
        j += 1;
      }

      if (badan && /\b(dan|atau|serta|maupun)\s*[.,]?\s*$/.test(badan)) {
        push(offsetBaris[i], offsetBaris[i] + line.length, 'keras', 'klausa-menggantung',
          `Butir berakhir dengan "${badan.split(/\s+/).slice(-3).join(' ')}"`,
          'Butir daftar yang menggantung membuat pembaca menunggu kelanjutan yang tidak ada.');
      }
      i = j - 1;
    }
  }

  // --- Pemeriksaan per kalimat ---
  for (const s of sentences(text)) {
    if (lewatiProsa(s.index)) continue;
    const kalimat = s.text;
    const at = s.index;
    const panjang = words(kalimat).length;

    // 9. Panjang kalimat (keras)
    if (panjang > MAKS_KATA) {
      push(at, at + kalimat.length, 'keras', 'panjang-kalimat', `Kalimat ${panjang} kata`,
        `Batas deskripsi ${MAKS_KATA} kata, batas perintah 20 kata. Pecah menjadi dua kalimat.`);
    }

    // 10. Klausa berlebih (anjuran)
    const penanda = PENANDA_KLAUSA.filter((k) =>
      new RegExp(`(?<![\\p{L}])${k}(?![\\p{L}])`, 'iu').test(kalimat),
    );
    if (penanda.length >= MAKS_PENANDA_KLAUSA) {
      push(at, at + kalimat.length, 'anjuran', 'klausa-berlebih',
        `${penanda.length} penanda klausa: ${penanda.slice(0, 5).join(', ')}`,
        'Maksimal dua klausa per kalimat. Batas klausa lebih menentukan daripada batas jumlah kata.');
    }

    // 11. Pasif tanpa pelaku (anjuran)
    {
      const kata = words(kalimat);
      const adaPasif = kata.some(
        (w) => /^di[a-z]{2,}$/i.test(w) && !BUKAN_PASIF.has(w.toLowerCase()),
      );
      if (adaPasif && !/\boleh\b/i.test(kalimat)) {
        const w = kata.find((x) => /^di[a-z]{2,}$/i.test(x) && !BUKAN_PASIF.has(x.toLowerCase()));
        push(at, at + kalimat.length, 'anjuran', 'pasif-tanpa-pelaku', `"${w}"`,
          'Bentuk pasif menyembunyikan pelaku. Sebut pelakunya, kecuali pelakunya memang tidak diketahui.');
      }
    }

    // 12. Kata ragu bertumpuk (anjuran) — satu kata ragu TIDAK PERNAH ditandai
    {
      const ditemukan = new Set();
      for (const k of KATA_RAGU) {
        const re = new RegExp(`(?<![\\p{L}])${esc(k)}(?![\\p{L}])`, 'giu');
        let m;
        while ((m = re.exec(kalimat)) !== null) {
          // Teks dalam tanda petik adalah kata orang lain, bukan klaim penulis.
          if (inZone(s.index + m.index, 'petik')) continue;
          // "tidak dapat" dan "tak bisa" menyatakan ketidakmampuan, bukan keraguan.
          const sebelum = kalimat.slice(Math.max(0, m.index - 8), m.index).toLowerCase();
          if (/(?:^|[^\p{L}])(?:tidak|tak|belum)\s*$/u.test(sebelum)) continue;
          ditemukan.add(k);
        }
      }
      if (ditemukan.size >= 2) {
        push(at, at + kalimat.length, 'anjuran', 'kata-ragu-bertumpuk',
          `${ditemukan.size} kata ragu: ${[...ditemukan].join(', ')}`,
          'Satu kata ragu menyimpan tingkat keyakinan penulis. Dua atau lebih menghapus informasi itu.');
      }
    }

    // 13. Kuantitas kabur (anjuran)
    for (const k of KUANTITAS_KABUR) {
      const re = new RegExp(`(?<![\\p{L}])${esc(k)}(?![\\p{L}])`, 'iu');
      const m = re.exec(kalimat);
      if (m) {
        push(at + m.index, at + m.index + k.length, 'anjuran', 'kuantitas-kabur', `"${k}"`,
          'Sebut jumlahnya, atau sebut anggotanya.');
      }
    }

    // 14. yang berlapis (anjuran)
    {
      const jumlah = (kalimat.match(/(?<![\p{L}])yang(?![\p{L}])/giu) || []).length;
      if (jumlah >= 2) {
        push(at, at + kalimat.length, 'anjuran', 'yang-berlapis', `${jumlah} kata "yang"`,
          'Satu "yang" per klausa. Klausa bertumpuk menciptakan beberapa kemungkinan acuan.');
      }
    }

    // 15. Rujukan -nya (anjuran)
    {
      const re = /(?<![\p{L}])[\p{L}]{3,}nya(?![\p{L}])/giu;
      let m;
      while ((m = re.exec(kalimat)) !== null) {
        if (NYA_KETERANGAN.has(m[0].toLowerCase())) continue;
        push(at + m.index, at + m.index + m[0].length, 'anjuran', 'kata-ganti-nya', `"${m[0]}"`,
          'Pastikan rujukannya sudah jelas. Kalau ada lebih dari satu kandidat, tulis nominanya.');
      }
    }
  }

  // --- 16. Rotasi sinonim (anjuran, per berkas) ---
  for (const keluarga of KELOMPOK_SINONIM) {
    const dipakai = keluarga
      .filter(([, bentuk]) =>
        bentuk.some((b) =>
          new RegExp(`(?<![\\p{L}])${esc(b)}(?:nya|lah)?(?![\\p{L}])`, 'iu').test(text),
        ),
      )
      .map(([leksem]) => leksem);
    if (dipakai.length >= 2) {
      push(0, 0, 'anjuran', 'rotasi-sinonim', `Sinonim diputar: ${dipakai.join(', ')}`,
        'Satu istilah untuk satu konsep. Pembaca mesin mengira kata yang berbeda menandakan konsep yang berbeda.');
    }
  }

  return findings.sort((a, b) => a.line - b.line || a.col - b.col);
}

// --- Uji bawaan -------------------------------------------------------------

function selftest() {
  const uji = [
    // Modalitas tunggal tidak boleh pernah ditandai. Ini janji utama linter ini.
    ['Permintaan mungkin gagal.', (f) => !f.some((x) => x.id === 'kata-ragu-bertumpuk')],
    ['Proses ini bisa lambat.', (f) => !f.some((x) => x.id === 'kata-ragu-bertumpuk')],
    ['Berkas mungkin tidak dapat diakses.', (f) => !f.some((x) => x.id === 'kata-ragu-bertumpuk')],
    // Keraguan bertumpuk ditandai.
    ['Prosesnya mungkin bisa cenderung lambat.', (f) => f.some((x) => x.id === 'kata-ragu-bertumpuk')],
    // Temuan keras.
    ['Agen memeriksa berkas; lalu agen menyimpannya.', (f) => f.some((x) => x.id === 'titik-koma')],
    ['Pilih dan/atau.', (f) => f.some((x) => x.id === 'dan-atau')],
    ['Berkas, gambar, dll.', (f) => f.some((x) => x.id === 'singkatan-kabur')],
    ['Agen melakukan pengecekan berkas.', (f) => f.some((x) => x.id === 'nominalisasi')],
    ['Halaman itu di-refresh otomatis.', (f) => f.some((x) => x.id === 'imbuhan-asing')],
    ['Berkas sudah akan dihapus.', (f) => f.some((x) => x.id === 'aspek-bertumpuk')],
    ['Antarmuka yang mulus dan tangguh.', (f) => f.some((x) => x.id === 'kata-sifat-pemasaran')],
    // Kalimat bersih.
    ['Agen menghapus berkas.', (f) => f.filter((x) => x.severity === 'keras').length === 0],
    ['Periksa berkas. Kirim laporan.', (f) => f.filter((x) => x.severity === 'keras').length === 0],
    // Tanda pisah bukan urusan linter ini.
    ['Rentang 2020—2025 tersedia.', (f) => f.length === 0],
  ];
  let gagal = 0;
  for (const [teks, cek] of uji) {
    const hasil = check(teks, '<selftest>');
    if (!cek(hasil)) {
      gagal += 1;
      console.error(`GAGAL: ${teks}`);
      for (const h of hasil) console.error(`   ${h.severity} ${h.id}: ${h.message}`);
    }
  }
  if (gagal) {
    console.error(`\n${gagal} dari ${uji.length} uji bawaan gagal.`);
    process.exit(1);
  }
  console.log(`Uji bawaan lulus: ${uji.length}/${uji.length}.`);
  process.exit(0);
}

if (jalankanSelftest) selftest();

// --- Jalankan ---------------------------------------------------------------

if (files.length === 0) {
  console.error(USAGE);
  process.exit(2);
}

const results = [];
for (const file of files) {
  let nama = file;
  let isi;
  try {
    if (file === '-') {
      nama = '<stdin>';
      isi = readFileSync(0, 'utf8');
    } else {
      isi = readFileSync(file, 'utf8');
    }
  } catch (err) {
    console.error(`Tidak bisa membaca ${file}: ${err.message}`);
    process.exitCode = 2;
    continue;
  }
  results.push({ file: nama, findings: check(isi.replace(/\r\n/g, '\n'), nama) });
}

const semua = results.flatMap((r) => r.findings);
const keras = semua.filter((f) => f.severity === 'keras').length;
const anjuran = semua.filter((f) => f.severity === 'anjuran').length;

if (asJson) {
  console.log(
    JSON.stringify(
      { results, summary: { keras, anjuran, total: semua.length, baseline } },
      null,
      2,
    ),
  );
} else if (quiet) {
  for (const r of results) console.log(`${r.file}: ${r.findings.length} temuan`);
} else {
  for (const r of results) {
    if (r.findings.length === 0) {
      console.log(`\n${r.file}\n  Bersih pada pemeriksaan mekanis.`);
      continue;
    }
    console.log(`\n${r.file}`);
    for (const f of r.findings) {
      console.log(`  ${f.line}:${f.col}  ${f.severity.padEnd(8)} ${f.id.padEnd(21)} ${f.message}`);
      if (f.hint) console.log(`  ${' '.repeat(String(f.line).length + 1)}  →  ${f.hint}`);
    }
  }
}

if (!asJson) {
  console.log(
    `\nRingkasan: ${semua.length} temuan di ${results.length} berkas ` +
      `(${keras} keras, ${anjuran} anjuran). Baseline: ${baseline}.`,
  );
  if (semua.length > 0) {
    console.log('Ini penyaring mekanis, bukan putusan akhir. Periksa konteksnya.');
  }
}

process.exitCode = keras > baseline ? 1 : process.exitCode || 0;
