/**
 * Uji regresi untuk pemeriksa anti-slop.
 *
 * Menjalankan CLI sungguhan lewat child process, jadi yang diuji adalah antarmuka yang
 * benar-benar dipakai pengguna, bukan fungsi internal.
 *
 *   node --test scripts/
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI = join(HERE, 'check.mjs');
const FIXTURES = join(HERE, 'fixtures');

function runCli(args, input) {
  return spawnSync(process.execPath, [CLI, ...args], {
    input,
    encoding: 'utf8',
    cwd: HERE,
  });
}

function analyze(text) {
  const result = runCli(['-', '--json'], text);
  assert.equal(result.status === 0 || result.status === 1, true, result.stderr);
  return JSON.parse(result.stdout);
}

function findings(text) {
  return analyze(text).results[0].findings;
}

function ids(text) {
  return findings(text).map((f) => f.id);
}

test('draf bersih tidak menghasilkan temuan', () => {
  const text = readFileSync(join(FIXTURES, 'bersih.md'), 'utf8');
  assert.deepEqual(findings(text), []);
});

test('draf slop menghasilkan banyak error', () => {
  const text = readFileSync(join(FIXTURES, 'slop.md'), 'utf8');
  const result = analyze(text);
  assert.ok(
    result.summary.errors >= 20,
    `diharapkan minimal 20 error, dapat ${result.summary.errors}`,
  );
});

test('"hiruk pikuk" selalu ditandai', () => {
  assert.ok(ids('Suasana di tengah hiruk pikuk kota.').includes('L5.01'));
});

test('"hiruk pikuk" tidak cocok di dalam kata lain', () => {
  assert.equal(ids('Hirukpikukan adalah kata buatan.').includes('L5.01'), false);
});

test('kata tidak baku diberi bentuk benarnya', () => {
  const found = findings('Silahkan duduk sebentar.');
  const baku = found.find((f) => f.id === 'BAKU');
  assert.ok(baku, 'temuan BAKU tidak muncul');
  assert.match(baku.message, /silakan/);
});

test('sufiks -nya tetap tertangkap', () => {
  assert.ok(ids('Resikonya terlalu besar.').includes('BAKU'));
});

test('sufiks tidak membuat kata sah ikut tertandai', () => {
  assert.equal(ids('Jumlah responden mencapai 200 orang.').includes('BAKU'), false);
});

test('rentang angka dengan tanda pisah tidak ditandai', () => {
  assert.equal(ids('Periode 2020—2025 menunjukkan kenaikan.').includes('DASH'), false);
});

test('rentang tempat dengan tanda pisah tidak ditandai', () => {
  assert.equal(ids('Rute Jakarta—Bandung dibuka kembali.').includes('DASH'), false);
});

test('tanda pisah sebagai tanda baca gaya ditandai', () => {
  assert.ok(ids('Dia datang terlambat — tanpa kabar apa pun.').includes('DASH'));
});

test('rentang tempat berspasi tetap ditandai', () => {
  assert.ok(ids('Rute Jakarta — Bandung dibuka kembali.').includes('DASH'));
});

test('koma sebelum konjungsi subordinatif ditandai', () => {
  assert.ok(ids('Menu ini digemari, karena bahannya segar.').includes('KOMA'));
});

test('anak kalimat di depan induk tidak ditandai', () => {
  assert.equal(ids('Karena bahannya segar, menu ini digemari.').includes('KOMA'), false);
});

test('koma sebelum konjungsi pertentangan tidak ditandai', () => {
  assert.equal(ids('Saya ingin datang, tetapi hari hujan.').includes('KOMA'), false);
});

test('koma sebelum konjungsi urutan tidak ditandai', () => {
  const text = 'Model dilatih dengan Keras, kemudian bobotnya dimuat ke NumPy.';
  assert.equal(ids(text).includes('KOMA'), false);
});

test('"setelah itu" sebagai penghubung antarkalimat tidak ditandai', () => {
  assert.equal(ids('Kami berangkat pagi. Setelah itu, hujan turun.').includes('KOMA'), false);
});

test('"di mana" sebagai penghubung ditandai', () => {
  assert.ok(ids('Rumah di mana saya tinggal akan dijual.').includes('MANA'));
});

test('kata transisi boleh sekali per teks', () => {
  assert.equal(ids('Selain itu, harga naik.').includes('L6.01'), false);
});

test('kata transisi ditandai pada kemunculan kedua', () => {
  assert.ok(ids('Selain itu, harga naik. Selain itu, stok menipis.').includes('L6.01'));
});

test('dua paragraf beruntun dibuka kata transisi ditandai', () => {
  const text = 'Selain itu, harga naik.\n\nOleh karena itu, stok menipis.';
  assert.ok(ids(text).includes('TRANSISI'));
});

test('paralelisme negatif ditandai', () => {
  assert.ok(ids('Ini bukan hanya soal harga, tetapi juga soal mutu.').includes('L3.01'));
});

test('emoji sebagai butir daftar ditandai', () => {
  assert.ok(ids('- 🚀 Cepat').includes('EMOJI'));
});

test('emoji di tengah kalimat tidak ditandai', () => {
  assert.equal(ids('Kirim sekarang, lalu tunggu konfirmasi.').includes('EMOJI'), false);
});

test('judul ber-Title Case ditandai', () => {
  assert.ok(ids('## Panduan Lengkap Memilih CMS Untuk Perusahaan').includes('JUDUL'));
});

test('judul gaya kalimat tidak ditandai', () => {
  assert.equal(ids('## Panduan lengkap memilih CMS untuk perusahaan').includes('JUDUL'), false);
});

test('judul karya dengan kata tugas kecil tidak ditandai', () => {
  // EYD V kaidah 21: kapital tiap kata kecuali kata tugas.
  assert.equal(ids('# Kata Baku dan Penulisan Kata').includes('JUDUL'), false);
});

test('kata tugas berkapital di tengah judul ditandai', () => {
  assert.ok(ids('## Cara Memilih CMS Untuk Perusahaan').includes('JUDUL'));
});

test('kata tugas di awal judul boleh berkapital', () => {
  assert.equal(ids('## Untuk perusahaan yang baru berdiri').includes('JUDUL'), false);
});

test('tanda pisah berpasangan mengapit keterangan tidak ditandai', () => {
  // EYD V kaidah 1 dan 2 membenarkan bentuk ini.
  assert.equal(ids('Pilihan itu—yang mahal—tetap diambil.').includes('DASH'), false);
});

test('tanda pisah tunggal tanpa spasi ditandai', () => {
  assert.ok(ids('Dia datang terlambat—tanpa kabar apa pun.').includes('DASH'));
});

test('tanda pisah berspasi dicatat sebagai penyimpangan konvensi', () => {
  const found = findings('Dia datang terlambat — tanpa kabar apa pun.');
  const dash = found.find((f) => f.id === 'DASH');
  assert.ok(dash);
  assert.match(dash.hint, /tanpa spasi/);
});

test('--level=error menyembunyikan peringatan', () => {
  const teksBermasalah = 'Rumah di mana saya tinggal akan dijual.';
  assert.ok(analyze(teksBermasalah).summary.warns > 0, 'prasyarat: ada peringatan');
  const result = runCli(['-', '--json', '--level=error'], teksBermasalah);
  assert.equal(JSON.parse(result.stdout).summary.warns, 0);
});

test('keluar dengan kode 1 kalau ada error', () => {
  assert.equal(runCli(['-'], 'Di era digital yang serba cepat ini, semua berubah.').status, 1);
});

test('keluar dengan kode 0 kalau bersih', () => {
  assert.equal(runCli(['-'], 'Harga naik 12 persen pada Maret.').status, 0);
});

test('--strict membuat peringatan menggagalkan pemeriksaan', () => {
  const teksHanyaPeringatan = 'Rumah di mana saya tinggal akan dijual.';
  assert.equal(runCli(['-'], teksHanyaPeringatan).status, 0);
  assert.equal(runCli(['-', '--strict'], teksHanyaPeringatan).status, 1);
});

test('tanpa berkas keluar dengan kode 2', () => {
  assert.equal(runCli([]).status, 2);
});

test('konjungsi di dalam rincian kata tidak ditandai', () => {
  const teks = 'Kata tugas yang dimaksud: dan, atau, tetapi, untuk, agar, supaya, karena, jika, bila.';
  assert.equal(ids(teks).includes('KOMA'), false);
});

test('tanda pisah di dalam tabel tidak ditandai', () => {
  assert.equal(ids('| Catatan — penting |').includes('DASH'), false);
});

test('bold di dalam tabel tidak dihitung sebagai slop format', () => {
  const baris = Array.from({ length: 12 }, (_, i) => `| **istilah${i}** | arti |`).join('\n');
  const teks = `Kalimat pengantar yang pendek.\n\n${baris}\n`;
  assert.equal(ids(teks).includes('BOLD'), false);
});

test('bold berlebihan di dalam prosa tetap ditandai', () => {
  const teks = `Kalimat pengantar yang cukup panjang untuk melewati ambang penghitungan kata
dan terus berjalan sampai lebih dari enam puluh kata supaya aturan ini benar-benar aktif
dan bisa diuji dengan hasil yang bisa dipercaya oleh siapa pun yang membaca berkas ini
nanti tanpa perlu menghitung sendiri secara manual.

${Array.from({ length: 10 }, (_, i) => `**tebal${i}**`).join(' dan ')}`;
  assert.ok(ids(teks).includes('BOLD'));
});
