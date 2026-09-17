#!/usr/bin/env node
/**
 * Pemeriksa mekanis anti-slop untuk teks bahasa Indonesia.
 *
 * Memeriksa apa yang lolos saat membaca cepat: frasa klise, kosakata slop, kata tidak
 * baku, em dash di luar rentang, koma sebelum konjungsi subordinatif, paralelisme
 * negatif, judul ber-Title Case, emoji hias, dan kalimat kepanjangan.
 *
 * Keluarannya bukan putusan akhir. Setiap temuan perlu dilihat manusia; sebagian pola
 * sah di konteks tertentu.
 *
 * Pemakaian:
 *   node scripts/check.mjs draf.md
 *   node scripts/check.mjs draf.md lain.txt --level=error
 *   cat draf.md | node scripts/check.mjs -
 *   node scripts/check.mjs draf.md --json
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const RULES_PATH = join(HERE, 'rules.json');

const USAGE = `Pemeriksa anti-slop teks bahasa Indonesia.

Pemakaian:
  node scripts/check.mjs <berkas...> [opsi]
  node scripts/check.mjs -            baca dari stdin

Opsi:
  --level=error|warn   hanya tampilkan temuan pada level ini ke atas (default: warn)
  --strict             keluar dengan kode 1 kalau ada peringatan juga
  --json               keluarkan hasil sebagai JSON
  --quiet              hanya tampilkan ringkasan
  --help               tampilkan bantuan ini

Keluar dengan kode 1 kalau ada temuan level error.`;

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(USAGE);
  process.exit(0);
}

const files = args.filter((a) => !a.startsWith('-') || a === '-');
const levelFlag = args.find((a) => a.startsWith('--level='));
const minLevel = levelFlag ? levelFlag.split('=')[1] : 'warn';
const strict = args.includes('--strict');
const asJson = args.includes('--json');
const quiet = args.includes('--quiet');

if (files.length === 0) {
  console.error(USAGE);
  process.exit(2);
}
if (!['error', 'warn'].includes(minLevel)) {
  console.error(`Level tidak dikenal: ${minLevel}. Pakai "error" atau "warn".`);
  process.exit(2);
}
if (!existsSync(RULES_PATH)) {
  console.error(`Berkas aturan tidak ditemukan: ${RULES_PATH}`);
  process.exit(2);
}

const RULES = JSON.parse(readFileSync(RULES_PATH, 'utf8'));
const LEVEL_ORDER = { error: 0, warn: 1 };

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Ratakan spasi supaya pesan tetap satu baris. */
const flat = (s) => s.replace(/\s+/g, ' ').trim();

/** Batas kata yang sadar aksara Latin + sufiks bahasa Indonesia. */
const bounded = (term) =>
  new RegExp(`(?<![\\p{L}${esc('-')}])${esc(term)}(?:nya|lah|kah|pun)?(?![\\p{L}])`, 'giu');

const TRANSITION_IDS = new Set([
  'L6.01', 'L6.02', 'L6.03', 'L6.04', 'L6.05', 'L6.06', 'L6.07', 'L6.09', 'L6.10',
]);

// Konjungsi subordinatif. "setelah" dan "sementara" dikecualikan bila diikuti "itu",
// karena bentuk itu penghubung antarkalimat yang koma di depannya memang benar.
const SUBORDINATORS = new RegExp(
  `,\\s+(karena|sebab|sehingga|bahwa|agar|supaya|ketika|setelah|sebelum|jika|bila|` +
    `meskipun|walaupun|apabila|asalkan)(?!\\s+itu)\\b`,
  'gi',
);

// Kata tugas. Menurut EYD V kaidah 21, kata tugas di tengah judul karya ditulis dengan
// huruf nonkapital. Kaidah itu yang dipakai di sini, bukan sekadar "hindari Title Case".
const KATA_TUGAS = new Set([
  'dan', 'atau', 'tetapi', 'tapi', 'namun', 'untuk', 'dengan', 'yang', 'di', 'ke', 'dari',
  'pada', 'dalam', 'oleh', 'bagi', 'sebagai', 'secara', 'ini', 'itu', 'agar', 'supaya',
  'karena', 'jika', 'bila', 'sampai', 'antara', 'tentang', 'tanpa', 'demi', 'guna', 'serta',
  'maupun', 'akan', 'telah', 'sudah', 'masih', 'tidak', 'bukan', 'juga', 'hanya', 'saja',
  'pun', 'per', 'via', 'ialah', 'adalah',
]);

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

function contextSnippet(text, start, end, width = 32) {
  const from = Math.max(0, start - width);
  const to = Math.min(text.length, end + width);
  const body = text.slice(from, to).replace(/\s+/g, ' ').trim();
  return `${from > 0 ? '…' : ''}${body}${to < text.length ? '…' : ''}`;
}

function check(text, file) {
  const findings = [];
  const starts = lineStarts(text);

  // Rentang paragraf, dipakai pemeriksaan tanda pisah dan transisi.
  const paraRanges = [];
  {
    let cursor = 0;
    for (const block of text.split(/\n\s*\n/)) {
      const start = text.indexOf(block, cursor);
      if (start === -1) continue;
      paraRanges.push({ start, end: start + block.length });
      cursor = start + block.length;
    }
  }
  const paragraphOf = (index) =>
    paraRanges.find((p) => index >= p.start && index < p.end) || {
      start: 0,
      end: text.length,
    };

  // Zona yang bukan prosa: frontmatter YAML, blok kode, dan baris tabel. Aturan
  // yang menilai gaya tulisan berjalan tidak berlaku di dalamnya, karena isi tabel
  // dan blok kode memang dikutip, diringkas, atau memang bukan kalimat.
  const zones = [];
  {
    const fm = text.match(/^---\n[\s\S]*?\n---/);
    if (fm) zones.push({ start: 0, end: fm[0].length, kind: 'frontmatter' });
    let f;
    const fence = /^[ \t]*```[\s\S]*?^[ \t]*```/gm;
    while ((f = fence.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'code' });
    }
    const row = /^[ \t]*\|.*$/gm;
    while ((f = row.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'table' });
    }
    // Coretan dipakai untuk menandai contoh yang sengaja salah.
    const strike = /~~[^~\n]+~~/g;
    while ((f = strike.exec(text)) !== null) {
      zones.push({ start: f.index, end: f.index + f[0].length, kind: 'strike' });
    }
  }
  const inZone = (index, kind) =>
    zones.some((z) => z.kind === kind && index >= z.start && index < z.end);

  const push = (index, endIndex, level, id, category, message, hint, exempt) => {
    if (LEVEL_ORDER[level] > LEVEL_ORDER[minLevel]) return;
    if (exempt && exempt.some((kind) => inZone(index, kind))) return;
    const { line, col } = posOf(starts, index);
    findings.push({
      file,
      line,
      col,
      level,
      id,
      category,
      message,
      hint,
      snippet: contextSnippet(text, index, endIndex),
    });
  };

  // --- Aturan berbasis daftar frasa -----------------------------------------
  const transitionCounts = new Map();

  for (const rule of RULES.phrases) {
    let re;
    try {
      re = new RegExp(rule.pattern, 'gi');
    } catch (err) {
      console.error(`Pola tidak sah pada aturan ${rule.id}: ${err.message}`);
      continue;
    }
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) {
        re.lastIndex += 1;
        continue;
      }
      const isTransition = TRANSITION_IDS.has(rule.id) || rule.category === 'Transisi klise';
      if (isTransition) {
        const seen = (transitionCounts.get(rule.id) || 0) + 1;
        transitionCounts.set(rule.id, seen);
        if (seen === 1) continue; // kuota satu kali per teks
        push(
          m.index,
          m.index + m[0].length,
          rule.level,
          rule.id,
          rule.category,
          `Transisi klise dipakai lagi (kemunculan ke-${seen}): "${flat(m[0])}"`,
          rule.hint,
        );
        continue;
      }
      push(
        m.index,
        m.index + m[0].length,
        rule.level,
        rule.id,
        rule.category,
        `"${flat(m[0])}"`,
        rule.hint,
      );
    }
  }

  // --- Kosakata slop ---------------------------------------------------------
  for (const rule of RULES.words) {
    const re = bounded(rule.term);
    let m;
    while ((m = re.exec(text)) !== null) {
      push(m.index, m.index + m[0].length, rule.level, rule.id, rule.category, `"${m[0]}"`, rule.hint);
    }
  }

  // --- Kata tidak baku -------------------------------------------------------
  for (const rule of RULES.nonstandard) {
    const re = bounded(rule.wrong);
    let m;
    while ((m = re.exec(text)) !== null) {
      push(
        m.index,
        m.index + m[0].length,
        'error',
        'BAKU',
        'Kata tidak baku',
        `"${m[0]}" → "${rule.right}"`,
        'Bentuk baku menurut EYD V dan KBBI.',
      );
    }
  }

  // --- Pleonasme -------------------------------------------------------------
  for (const rule of RULES.pleonasm) {
    let re;
    try {
      re = new RegExp(rule.pattern, 'giu');
    } catch {
      continue;
    }
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) {
        re.lastIndex += 1;
        continue;
      }
      push(m.index, m.index + m[0].length, 'warn', 'MUBAZIR', 'Pleonasme', `"${m[0]}"`, rule.hint);
    }
  }

  // --- Tanda pisah -----------------------------------------------------------
  // Rentang angka, tanggal, dan tempat selalu sah (EYD V kaidah 3).
  // Selain itu, EYD V hanya membenarkan tanda pisah untuk MENGAPIT keterangan
  // (kaidah 1 dan 2), yang berarti harus berpasangan dalam satu paragraf. Tanda
  // pisah tunggal sebagai pengganti koma atau titik dua bukan kaidah EYD, dan
  // justru penanda tulisan mesin.
  const dashCandidates = [];
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch !== '—' && ch !== '–') continue;
    const spaced = /[ \t]/.test(text[i - 1] || '') || /[ \t]/.test(text[i + 1] || '');
    // Penanda format (bintang, garis bawah, kutip) dilepas supaya rentang tetap
    // dikenali walau katanya sedang dimiringkan atau ditebalkan.
    const wordBefore = (text.slice(0, i).match(/[^\s—–]*$/) || [''])[0].replace(/^[^\p{L}\p{N}]+/u, '');
    const wordAfter = (text.slice(i + 1).match(/^[^\s—–]*/) || [''])[0].replace(/[^\p{L}\p{N}]+$/u, '');
    const numericRange = /\d$/.test(wordBefore) && /^\d/.test(wordAfter);
    const placeRange = /^[A-Z]/.test(wordBefore) && /^[A-Z]/.test(wordAfter);
    if (numericRange) continue;
    if (placeRange && !spaced) continue;
    // Karakter yang sedang dibicarakan, bukan dipakai: (—) atau `—`.
    if (/[(`]/.test(text[i - 1] || '') && /[`)]/.test(text[i + 1] || '')) continue;
    dashCandidates.push({ i, spaced });
  }
  for (const { i, spaced } of dashCandidates) {
    const para = paragraphOf(i);
    const inParagraph = dashCandidates.filter((d) => d.i >= para.start && d.i < para.end).length;
    if (inParagraph === 2) continue; // mengapit keterangan: sah menurut EYD V
    push(
      i,
      i + 1,
      'warn',
      'DASH',
      'Tanda pisah',
      inParagraph === 1
        ? `Tanda pisah tunggal${spaced ? ', berspasi' : ''}`
        : `${inParagraph} tanda pisah dalam satu paragraf`,
      'EYD V membenarkan tanda pisah untuk mengapit keterangan (berpasangan) dan untuk rentang. Di luar itu, pertimbangkan koma, titik dua, atau pecah kalimatnya.' +
        (spaced ? ' EYD V menulis tanda pisah tanpa spasi.' : ''),
      ['table', 'frontmatter', 'strike'],
    );
  }

  // --- Koma sebelum konjungsi subordinatif ----------------------------------
  let m;
  while ((m = SUBORDINATORS.exec(text)) !== null) {
    // Lewati rincian kata ("dan, atau, tetapi, karena, jika") yang kebetulan memuat
    // konjungsi subordinatif. Pada daftar, kata setelah konjungsi diawali koma.
    const after = text.slice(m.index + m[0].length);
    if (/^[ \t]*[,;]/.test(after)) continue;
    // Rincian kata juga ditandai oleh banyak koma pada kalimat yang sama.
    const sentenceStart = Math.max(
      text.lastIndexOf('.', m.index),
      text.lastIndexOf('!', m.index),
      text.lastIndexOf('?', m.index),
      text.lastIndexOf('\n', m.index),
    );
    const commasBefore = (text.slice(sentenceStart + 1, m.index).match(/,/g) || []).length;
    if (commasBefore >= 3) continue;
    push(
      m.index,
      m.index + m[0].length,
      'warn',
      'KOMA',
      'Tanda koma',
      `Koma sebelum konjungsi subordinatif: "${flat(m[0])}"`,
      'Anak kalimat yang mengiringi induk kalimat tidak dipisahkan koma. Koma tetap wajib kalau anak kalimat mendahului induknya.',
      ['table', 'strike'],
    );
  }

  // --- "di mana" / "yang mana" sebagai penghubung ---------------------------
  const manaRe = /(?<![\p{L}])(di|yang) mana(?![\p{L}])/giu;
  while ((m = manaRe.exec(text)) !== null) {
    push(
      m.index,
      m.index + m[0].length,
      'warn',
      'MANA',
      '"di mana/yang mana"',
      `"${m[0]}"`,
      'Kalau bukan kalimat tanya, ganti dengan "tempat", "yang", "saat", atau pecah kalimatnya.',
      ['table', 'strike'],
    );
  }

  // --- Kata tugas berkapital di tengah judul ---------------------------------
  // EYD V kaidah 21: pada judul karya, huruf pertama setiap kata kapital KECUALI
  // kata tugas yang tidak berada di posisi awal. Jadi bukan "Title Case itu
  // salah", melainkan "kata tugas yang berkapital itu yang salah".
  const titleCaseRe = /^[ \t]*(#{1,6}[ \t]+.+|\*\*[^*]+\*\*)[ \t]*$/gm;
  while ((m = titleCaseRe.exec(text)) !== null) {
    const raw = m[1];
    const title = raw.replace(/^#{1,6}[ \t]+/, '').replace(/\*\*/g, '').trim();
    const words = title.split(/\s+/).map((w) => w.replace(/[^\p{L}-]/gu, '')).filter(Boolean);
    const offenders = words
      .slice(1)
      .filter((w) => /^[A-Z][a-z]+$/.test(w) && KATA_TUGAS.has(w.toLowerCase()));
    if (offenders.length === 0) continue;
    const at = m.index + (m[0].length - m[0].trimStart().length);
    push(
      at,
      at + raw.length,
      'warn',
      'JUDUL',
      'Kapitalisasi judul',
      `Kata tugas berkapital di tengah judul: ${offenders.join(', ')}`,
      'Kapitalkan setiap kata judul kecuali kata tugas (dan, untuk, yang, di, ke, dari, pada). Gaya kalimat juga lazim untuk heading web, tapi pilih satu dan konsisten.',
    );
  }

  // --- Emoji -----------------------------------------------------------------
  const emojiBulletRe = /^[ \t]*(?:[-*+]|\d+\.)?[ \t]*(\p{Extended_Pictographic})/gmu;
  while ((m = emojiBulletRe.exec(text)) !== null) {
    push(
      m.index,
      m.index + m[0].length,
      'error',
      'EMOJI',
      'Slop format',
      `Emoji "${m[1]}" dipakai sebagai butir atau pembuka baris`,
      'Emoji bukan butir daftar. Di media sosial, maksimal 2–3 per caption.',
    );
  }

  // --- Bold berlebihan -------------------------------------------------------
  // Dihitung hanya pada prosa. Tebal di dalam tabel itu struktural, bukan penekanan.
  const proseText = text
    .split('\n')
    .filter((line) => !/^[ \t]*\|/.test(line))
    .join('\n')
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/^[ \t]*```[\s\S]*?^[ \t]*```/gm, '');
  const boldSpans = (proseText.match(/\*\*[^*\n]+\*\*/g) || []).length;
  const proseWords = (proseText.match(/[\p{L}\p{N}]+/gu) || []).length;
  if (boldSpans > 8 && proseWords > 60) {
    push(
      0,
      0,
      'warn',
      'BOLD',
      'Slop format',
      `${boldSpans} bagian ditebalkan pada ${proseWords} kata prosa`,
      'Tebalkan hanya yang benar-benar harus ditemukan saat memindai.',
    );
  }

  // --- Kalimat kepanjangan ---------------------------------------------------
  const sentenceRe = /[^.!?\n]+[.!?]+/g;
  while ((m = sentenceRe.exec(text)) !== null) {
    const n = (m[0].match(/[\p{L}\p{N}]+/gu) || []).length;
    if (n > 45) {
      push(
        m.index,
        m.index + m[0].length,
        'warn',
        'PANJANG',
        'Panjang kalimat',
        `Kalimat ${n} kata`,
        'Pecah menjadi dua, atau lebih. Satu kalimat satu gagasan.',
        ['frontmatter', 'table', 'code'],
      );
    }
  }

  // --- Dua paragraf beruntun dibuka kata transisi ---------------------------
  const transitionOpener = new RegExp(
    '^[ \\t]*[-*+]?[ \\t]*(Adapun|Selain itu|Tidak hanya itu|Terlebih lagi|Lebih lanjut|' +
      'Namun demikian|Oleh karena itu|Dengan demikian|Secara keseluruhan|Pada akhirnya|' +
      'Di sisi lain|Sementara itu|Selanjutnya|Dalam hal ini|Dengan kata lain)\\b',
    'i',
  );
  let prevWasTransition = false;
  for (const para of paraRanges) {
    const isTransition = transitionOpener.test(text.slice(para.start, para.end));
    if (isTransition && prevWasTransition) {
      push(
        para.start,
        para.start + Math.min(para.end - para.start, 40),
        'warn',
        'TRANSISI',
        'Transisi klise',
        'Dua paragraf beruntun dibuka kata transisi',
        'Paragraf yang urutannya benar tersambung lewat isi, bukan lewat lem.',
      );
    }
    prevWasTransition = isTransition;
  }

  return findings.sort((a, b) => a.line - b.line || a.col - b.col);
}

// --- Jalankan ----------------------------------------------------------------

function readInput(file) {
  if (file === '-') return { name: '<stdin>', text: readFileSync(0, 'utf8') };
  return { name: file, text: readFileSync(file, 'utf8') };
}

const results = [];
for (const file of files) {
  let input;
  try {
    input = readInput(file);
  } catch (err) {
    console.error(`Tidak bisa membaca ${file}: ${err.message}`);
    process.exitCode = 2;
    continue;
  }
  const text = input.text.replace(/\r\n/g, '\n');
  results.push({ file: input.name, findings: check(text, input.name) });
}

const all = results.flatMap((r) => r.findings);
const errors = all.filter((f) => f.level === 'error').length;
const warns = all.filter((f) => f.level === 'warn').length;

if (asJson) {
  console.log(JSON.stringify({ results, summary: { errors, warns, total: all.length } }, null, 2));
} else if (quiet) {
  for (const r of results) {
    console.log(`${r.file}: ${r.findings.length} temuan`);
  }
} else {
  for (const r of results) {
    if (r.findings.length === 0) {
      console.log(`\n${r.file}\n  Bersih pada pemeriksaan mekanis.`);
      continue;
    }
    console.log(`\n${r.file}`);
    for (const f of r.findings) {
      const mark = f.level === 'error' ? 'error' : 'peringatan';
      console.log(`  ${f.line}:${f.col}  ${mark.padEnd(10)} ${f.id.padEnd(9)} ${f.message}`);
      if (f.hint) console.log(`  ${' '.repeat(String(f.line).length + 1)}  →  ${f.hint}`);
    }
  }
}

if (!asJson) {
  const filesWithFindings = results.filter((r) => r.findings.length > 0).length;
  console.log(
    `\nRingkasan: ${all.length} temuan di ${results.length} berkas ` +
      `(${errors} error, ${warns} peringatan)` +
      (filesWithFindings < results.length ? `; ${results.length - filesWithFindings} bersih` : ''),
  );
  if (all.length > 0) {
    console.log('Ini penyaring mekanis, bukan putusan akhir. Periksa konteksnya.');
  }
}

const failed = errors > 0 || (strict && warns > 0);
process.exitCode = failed ? 1 : process.exitCode || 0;
