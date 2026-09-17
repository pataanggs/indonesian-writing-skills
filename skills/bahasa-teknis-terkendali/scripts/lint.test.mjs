/**
 * Uji regresi untuk bahasa-teknis-terkendali.
 *
 * Menjalankan CLI sungguhan lewat child process, jadi yang diuji adalah antarmuka
 * yang benar-benar dipakai pengguna, bukan fungsi internal.
 *
 *   node --test scripts/lint.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI = join(HERE, 'lint.mjs');
const FIXTURES = join(HERE, 'fixtures');

function runCli(args, input) {
  return spawnSync(process.execPath, [CLI, ...args], { input, encoding: 'utf8', cwd: HERE });
}

function analyze(text) {
  const result = runCli(['-', '--json'], text);
  assert.ok(result.status === 0 || result.status === 1, result.stderr);
  return JSON.parse(result.stdout);
}

const findings = (text) => analyze(text).results[0].findings;
const ids = (text) => findings(text).map((f) => f.id);
const keras = (text) => findings(text).filter((f) => f.severity === 'keras');

// --- Janji utama linter: modalitas tunggal tidak pernah ditandai ------------

test('satu kata ragu tidak pernah ditandai', () => {
  for (const teks of [
    'Permintaan mungkin gagal.',
    'Proses ini bisa lambat.',
    'Berkas mungkin tidak dapat diakses.',
    'Agen dapat mencoba lagi.',
  ]) {
    assert.equal(ids(teks).includes('kata-ragu-bertumpuk'), false, teks);
  }
});

test('kata ragu yang bertumpuk ditandai', () => {
  assert.ok(ids('Prosesnya mungkin bisa cenderung lambat.').includes('kata-ragu-bertumpuk'));
});

test('kata ragu di dalam tanda petik tidak dihitung', () => {
  // Teks dalam tanda petik adalah kata orang lain, bukan klaim penulisnya.
  const teks = 'Jangan mengubah "mungkin gagal" menjadi "bisa gagal".';
  assert.equal(ids(teks).includes('kata-ragu-bertumpuk'), false);
});

// --- Aturan keras -----------------------------------------------------------

test('titik koma ditandai', () => {
  assert.ok(ids('Agen membaca berkas; agen menyimpannya.').includes('titik-koma'));
});

test('dan/atau ditandai', () => {
  assert.ok(ids('Agen menghapus dan/atau mengubah berkas.').includes('dan-atau'));
});

test('singkatan kabur ditandai', () => {
  assert.ok(ids('Berkas, gambar, dll gagal.').includes('singkatan-kabur'));
  assert.ok(ids('Berkas, gambar, dsb gagal.').includes('singkatan-kabur'));
});

test('nominalisasi ditandai', () => {
  assert.ok(ids('Agen melakukan pengecekan berkas.').includes('nominalisasi'));
  assert.ok(ids('Agen memberikan penjelasan singkat.').includes('nominalisasi'));
});

test('verba langsung tidak ditandai sebagai nominalisasi', () => {
  assert.equal(ids('Agen memeriksa berkas.').includes('nominalisasi'), false);
  assert.equal(ids('Agen menjelaskan prosesnya.').includes('nominalisasi'), false);
});

test('imbuhan pada kata asing ditandai', () => {
  assert.ok(ids('Halaman di-refresh otomatis.').includes('imbuhan-asing'));
  assert.ok(ids('Agen meng-update status.').includes('imbuhan-asing'));
  assert.ok(ids('Layanan itu deploy ulang tadi.').includes('imbuhan-asing'));
});

test('penanda aspek bertumpuk ditandai', () => {
  assert.ok(ids('Berkas sudah akan dihapus.').includes('aspek-bertumpuk'));
  assert.ok(ids('Sistem telah sedang diperbarui.').includes('aspek-bertumpuk'));
});

test('satu penanda aspek tidak ditandai', () => {
  assert.equal(ids('Berkas sudah dihapus.').includes('aspek-bertumpuk'), false);
  assert.equal(ids('Agen akan menghapus berkas.').includes('aspek-bertumpuk'), false);
});

test('kata sifat pemasaran ditandai', () => {
  assert.ok(ids('Antarmuka yang mulus dan tangguh.').includes('kata-sifat-pemasaran'));
  assert.ok(ids('Solusi canggih untuk tim.').includes('kata-sifat-pemasaran'));
});

test('butir daftar yang menggantung ditandai', () => {
  assert.ok(ids('- Refresh halaman dan').includes('klausa-menggantung'));
  assert.ok(ids('1. Hapus berkas atau').includes('klausa-menggantung'));
});

test('butir daftar yang utuh tidak ditandai', () => {
  assert.equal(ids('- Hapus berkas.').includes('klausa-menggantung'), false);
  assert.equal(ids('- Agen menghapus berkas dan gambar.').includes('klausa-menggantung'), false);
});

test('butir daftar yang dibungkus perata teks tidak dianggap menggantung', () => {
  const teks = '- Ini butir panjang yang dibungkus ke baris berikutnya dan\n'
    + '  berakhir dengan tanda titik.';
  assert.equal(ids(teks).includes('klausa-menggantung'), false);
});

test('butir daftar yang dibungkus tetapi tetap menggantung ditandai', () => {
  const teks = '- Ini butir panjang yang dibungkus ke baris berikutnya dan\n'
    + '  berakhir tanpa kelanjutan atau';
  assert.ok(ids(teks).includes('klausa-menggantung'));
});

test('kalimat kepanjangan ditandai', () => {
  const panjang = 'Agen membaca berkas masukan dari folder yang sudah ditentukan pemilik sistem '
    + 'lalu memeriksa setiap barisnya dengan cermat sebelum mengirim laporan lengkap kepada '
    + 'semua pengguna yang berhak menerimanya pada akhir setiap siklus pemrosesan harian.';
  assert.ok(ids(panjang).includes('panjang-kalimat'));
});

// --- Aturan anjuran ---------------------------------------------------------

test('pasif tanpa pelaku ditandai', () => {
  assert.ok(ids('Berkas dihapus tadi pagi.').includes('pasif-tanpa-pelaku'));
});

test('pasif dengan pelaku tidak ditandai', () => {
  assert.equal(ids('Berkas dihapus oleh agen tadi pagi.').includes('pasif-tanpa-pelaku'), false);
});

test('kata berawalan di yang bukan verba tidak ditandai', () => {
  assert.equal(ids('Dia membaca diskusi tentang dunia digital.').includes('pasif-tanpa-pelaku'), false);
});

test('kuantitas kabur ditandai', () => {
  assert.ok(ids('Beberapa berkas gagal.').includes('kuantitas-kabur'));
  assert.ok(ids('Sebagian besar proses selesai.').includes('kuantitas-kabur'));
});

test('kuantitas eksplisit tidak ditandai', () => {
  assert.equal(ids('Tiga berkas gagal.').includes('kuantitas-kabur'), false);
  assert.equal(ids('Semua berkas gagal.').includes('kuantitas-kabur'), false);
});

test('yang berlapis ditandai', () => {
  const teks = 'Berkas yang diubah oleh agen yang dijalankan pengguna harus diperiksa.';
  assert.ok(ids(teks).includes('yang-berlapis'));
});

test('satu yang tidak ditandai', () => {
  assert.equal(ids('Berkas yang gagal harus diperiksa.').includes('yang-berlapis'), false);
});

test('rujukan -nya ditandai', () => {
  assert.ok(ids('Berkasnya dihapus tadi.').includes('kata-ganti-nya'));
});

test('keterangan -nya yang lazim tidak ditandai', () => {
  assert.equal(ids('Akhirnya proses selesai.').includes('kata-ganti-nya'), false);
  assert.equal(ids('Biasanya agen mengirim laporan.').includes('kata-ganti-nya'), false);
});

test('rotasi sinonim ditandai', () => {
  assert.ok(ids('Agen memeriksa berkas. Agen juga cek antrean.').includes('rotasi-sinonim'));
});

test('satu istilah yang konsisten tidak ditandai', () => {
  assert.equal(ids('Agen memeriksa berkas. Agen memeriksa antrean.').includes('rotasi-sinonim'), false);
});

// --- Zona yang bukan prosa --------------------------------------------------

test('tabel tidak diperiksa sebagai prosa', () => {
  assert.equal(keras('| Aturan | Catatan |\n|---|---|\n| dan/atau | kabur; hindari |').length, 0);
});

test('blok kode tidak diperiksa sebagai prosa', () => {
  assert.equal(keras('```\nagen melakukan pengecekan berkas;\n```').length, 0);
});

test('coretan contoh salah tidak diperiksa', () => {
  assert.equal(keras('~~Berkas dihapus; agen melakukan pengecekan.~~').length, 0);
});

// --- Fixtures ---------------------------------------------------------------

test('fixture bersih tidak menghasilkan temuan keras', () => {
  const teks = readFileSync(join(FIXTURES, 'bersih.md'), 'utf8');
  assert.deepEqual(keras(teks), [], 'fixture bersih seharusnya bebas temuan keras');
});

test('fixture melanggar menghasilkan banyak temuan keras', () => {
  const teks = readFileSync(join(FIXTURES, 'melanggar.md'), 'utf8');
  assert.ok(keras(teks).length >= 10, `dapat ${keras(teks).length} temuan keras`);
});

// --- Antarmuka --------------------------------------------------------------

test('keluar dengan kode 1 kalau ada temuan keras', () => {
  assert.equal(runCli(['-'], 'Agen membaca berkas; agen menyimpannya.').status, 1);
});

test('keluar dengan kode 0 kalau bersih', () => {
  assert.equal(runCli(['-'], 'Agen menghapus berkas.').status, 0);
});

test('--baseline menoleransi temuan keras', () => {
  const teks = 'Agen membaca berkas; agen menyimpannya.';
  assert.equal(runCli(['-', '--baseline', '1'], teks).status, 0);
  assert.equal(runCli(['-', '--baseline', '0'], teks).status, 1);
});

test('--disable mematikan aturan tertentu', () => {
  const teks = 'Agen membaca berkas; agen menyimpannya.';
  assert.equal(runCli(['-', '--disable', 'titik-koma'], teks).status, 0);
});

test('--selftest lulus', () => {
  const result = runCli(['--selftest']);
  assert.equal(result.status, 0, result.stderr);
});

test('tanpa berkas keluar dengan kode 2', () => {
  assert.equal(runCli([]).status, 2);
});
