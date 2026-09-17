/**
 * Uji pemasang skill.
 *
 *   node --test bin/cli.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SINI = dirname(fileURLToPath(import.meta.url));
const CLI = join(SINI, 'cli.mjs');

function jalankan(args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
}

/** Buat direktori tujuan sementara, lalu bersihkan otomatis. */
function tujuanSementara(t) {
  const dir = mkdtempSync(join(tmpdir(), 'iw-skills-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('--version menampilkan versi paket', () => {
  const r = jalankan(['--version']);
  assert.equal(r.status, 0);
  const pkg = JSON.parse(readFileSync(join(SINI, '..', 'package.json'), 'utf8'));
  assert.equal(r.stdout.trim(), pkg.version);
});

test('--help menampilkan bantuan', () => {
  const r = jalankan(['--help']);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Pemakaian/);
  assert.match(r.stdout, /--target/);
});

test('tanpa argumen memasang, bukan menampilkan bantuan', (t) => {
  const tujuan = tujuanSementara(t);
  const r = jalankan(['--target', tujuan]);
  assert.equal(r.status, 0);
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'SKILL.md')));
});

test('list menampilkan kedua skill', () => {
  const r = jalankan(['list']);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /indonesian-writing/);
  assert.match(r.stdout, /bahasa-teknis-terkendali/);
});

test('install menyalin seluruh berkas skill', (t) => {
  const tujuan = tujuanSementara(t);
  const r = jalankan(['install', '--target', tujuan]);
  assert.equal(r.status, 0);
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'SKILL.md')));
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'references', 'serapan.md')));
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'scripts', 'check.mjs')));
  assert.ok(existsSync(join(tujuan, 'bahasa-teknis-terkendali', 'SKILL.md')));
  assert.ok(existsSync(join(tujuan, 'bahasa-teknis-terkendali', 'scripts', 'lint.mjs')));
});

test('berkas di dalam paket ikut tersalin utuh', (t) => {
  const tujuan = tujuanSementara(t);
  jalankan(['install', '--target', tujuan]);
  const asal = join(SINI, '..', 'skills', 'indonesian-writing', 'SKILL.md');
  const salinan = join(tujuan, 'indonesian-writing', 'SKILL.md');
  assert.equal(readFileSync(salinan, 'utf8'), readFileSync(asal, 'utf8'));
});

test('--dry-run tidak menulis apa pun', (t) => {
  const tujuan = tujuanSementara(t);
  const r = jalankan(['install', '--target', tujuan, '--dry-run']);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Mode uji/);
  assert.deepEqual(readdirSync(tujuan), []);
});

test('--skill hanya memasang skill yang diminta', (t) => {
  const tujuan = tujuanSementara(t);
  const r = jalankan(['install', '--target', tujuan, '--skill', 'bahasa-teknis-terkendali']);
  assert.equal(r.status, 0);
  assert.ok(existsSync(join(tujuan, 'bahasa-teknis-terkendali', 'SKILL.md')));
  assert.equal(existsSync(join(tujuan, 'indonesian-writing')), false);
});

test('--skill menerima beberapa nama dipisah koma', (t) => {
  const tujuan = tujuanSementara(t);
  const r = jalankan([
    'install', '--target', tujuan,
    '--skill', 'indonesian-writing,bahasa-teknis-terkendali',
  ]);
  assert.equal(r.status, 0);
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'SKILL.md')));
  assert.ok(existsSync(join(tujuan, 'bahasa-teknis-terkendali', 'SKILL.md')));
});

test('--skill dengan nama keliru keluar dengan kode 2', () => {
  const r = jalankan(['install', '--skill', 'tidak-ada']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /tidak ditemukan/i);
});

test('perintah tidak dikenal keluar dengan kode 2', () => {
  const r = jalankan(['hapus-semua']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /tidak dikenal/i);
});

test('memasang ulang menimpa salinan lama, tidak menumpuk', (t) => {
  const tujuan = tujuanSementara(t);
  jalankan(['install', '--target', tujuan]);
  const r = jalankan(['install', '--target', tujuan]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /diperbarui/);
  // Nama skill tetap satu, tidak menjadi indonesian-writing-2 atau sejenisnya.
  const isi = readdirSync(tujuan).sort();
  assert.deepEqual(isi, ['bahasa-teknis-terkendali', 'indonesian-writing']);
});

test('--target membuat direktori yang belum ada', (t) => {
  const dasar = tujuanSementara(t);
  const tujuan = join(dasar, 'belum', 'ada');
  const r = jalankan(['install', '--target', tujuan]);
  assert.equal(r.status, 0);
  assert.ok(existsSync(join(tujuan, 'indonesian-writing', 'SKILL.md')));
});

test('hasil pemasangan lolos pemeriksa skill', (t) => {
  const tujuan = tujuanSementara(t);
  jalankan(['install', '--target', tujuan]);
  const r = spawnSync(
    process.execPath,
    [join(tujuan, 'indonesian-writing', 'scripts', 'check.mjs'), '--help'],
    { encoding: 'utf8' },
  );
  assert.equal(r.status, 0);
});
