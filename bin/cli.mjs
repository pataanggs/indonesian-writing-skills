#!/usr/bin/env node
/**
 * Pemasang skill bahasa Indonesia.
 *
 * Menyalin folder di dalam `skills/` ke direktori skill agen. Tanpa dependensi.
 *
 *   npx github:pataanggs/indonesian-writing-skill
 *   npx indonesian-writing-skills install --local
 *   npx indonesian-writing-skills list
 *
 * Pemakaian:
 *   install [opsi]   salin skill ke direktori tujuan (bawaan)
 *   list             tampilkan skill yang tersedia di paket ini
 *
 * Opsi:
 *   --target <dir>   direktori tujuan eksplisit
 *   --local, -l      pasang untuk proyek ini (./.commandcode/skills)
 *   --skill <nama>   hanya skill tertentu, boleh dipisah koma
 *   --dry-run, -n    tampilkan rencananya saja, jangan menulis apa pun
 *   --help, -h       tampilkan bantuan
 *   --version, -v    tampilkan versi
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SINI = dirname(fileURLToPath(import.meta.url));
const AKAR = resolve(SINI, '..');
const SUMBER = join(AKAR, 'skills');

function bacaVersi() {
  try {
    return JSON.parse(readFileSync(join(AKAR, 'package.json'), 'utf8')).version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

const VERSI = bacaVersi();

// --- Daftar skill yang tersedia ---------------------------------------------

/** Baca nama dan deskripsi tiap skill dari frontmatter SKILL.md. */
function daftarSkill() {
  if (!existsSync(SUMBER)) return [];
  return readdirSync(SUMBER)
    .filter((nama) => existsSync(join(SUMBER, nama, 'SKILL.md')))
    .sort()
    .map((nama) => {
      const isi = readFileSync(join(SUMBER, nama, 'SKILL.md'), 'utf8');
      const fm = isi.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const desc = fm ? (fm[1].match(/^description:\s*"([\s\S]*?)"\s*$/m) || [])[1] ?? '' : '';
      return { nama, deskripsi: desc };
    });
}

/** Hitung berkas di dalam satu folder, untuk laporan. */
function hitungBerkas(dir) {
  let n = 0;
  for (const isi of readdirSync(dir, { withFileTypes: true })) {
    n += isi.isDirectory() ? hitungBerkas(join(dir, isi.name)) : 1;
  }
  return n;
}

// --- Argumen ----------------------------------------------------------------

const argv = process.argv.slice(2);
const opsi = {
  target: null,
  local: false,
  dryRun: false,
  skill: null,
  help: false,
  version: false,
};
const perintah = [];

for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i];
  if (a === '--target') opsi.target = argv[++i];
  else if (a.startsWith('--target=')) opsi.target = a.slice('--target='.length);
  else if (a === '--skill') opsi.skill = argv[++i];
  else if (a.startsWith('--skill=')) opsi.skill = a.slice('--skill='.length);
  else if (a === '--local' || a === '-l') opsi.local = true;
  else if (a === '--dry-run' || a === '-n') opsi.dryRun = true;
  else if (a === '--help' || a === '-h') opsi.help = true;
  else if (a === '--version' || a === '-v') opsi.version = true;
  else if (!a.startsWith('-')) perintah.push(a);
}

const BANTUAN = `Pemasang skill bahasa Indonesia (v${VERSI})

Pemakaian:
  npx indonesian-writing-skills                 pasang semua skill
  npx indonesian-writing-skills list            lihat skill yang tersedia
  npx indonesian-writing-skills --local         pasang untuk proyek ini

Opsi:
  --target <dir>   direktori tujuan eksplisit
  --local, -l      pasang ke ./.commandcode/skills
  --skill <nama>   hanya skill tertentu, boleh dipisah koma
  --dry-run, -n    tampilkan rencana saja
  --help, -h       tampilkan bantuan ini
  --version, -v    tampilkan versi

Tujuan bawaan, dipilih yang pertama kali ada:
  ~/.commandcode/skills
  ~/.claude/skills
  ~/.agents/skills

Sesudah dipasang, mulai sesi agen baru supaya skill terbaca.`;

// --- Tujuan -----------------------------------------------------------------

function tujuanBawaan() {
  if (opsi.local) return join(process.cwd(), '.commandcode', 'skills');
  if (opsi.target) return resolve(opsi.target);

  const kandidat = [
    join(homedir(), '.commandcode', 'skills'),
    join(homedir(), '.claude', 'skills'),
    join(homedir(), '.agents', 'skills'),
  ];
  return kandidat.find((p) => existsSync(p)) ?? kandidat[0];
}

/** Pilih skill yang akan dipasang, sekaligus validasi nama yang diminta. */
function pilihSkill(tersedia) {
  if (!opsi.skill) return tersedia;

  const diminta = opsi.skill.split(',').map((s) => s.trim()).filter(Boolean);
  const tidakAda = diminta.filter((n) => !tersedia.some((s) => s.nama === n));
  if (tidakAda.length) {
    console.error(`Skill tidak ditemukan: ${tidakAda.join(', ')}`);
    console.error(`Yang tersedia: ${tersedia.map((s) => s.nama).join(', ')}`);
    process.exit(2);
  }
  return tersedia.filter((s) => diminta.includes(s.nama));
}

// --- Perintah ---------------------------------------------------------------

function jalankanList(tersedia) {
  if (!tersedia.length) {
    console.error('Tidak ada skill di dalam paket ini.');
    process.exit(2);
  }
  console.log(`\nSkill yang tersedia (v${VERSI}):\n`);
  for (const s of tersedia) {
    const ringkas = s.deskripsi.length > 110 ? `${s.deskripsi.slice(0, 110)}…` : s.deskripsi;
    console.log(`  ${s.nama}`);
    console.log(`    ${ringkas}\n`);
  }
  console.log(`Pasang dengan: npx indonesian-writing-skills\n`);
}

function jalankanInstall(tersedia) {
  if (!tersedia.length) {
    console.error('Tidak ada skill di dalam paket ini.');
    process.exit(2);
  }

  const dipilih = pilihSkill(tersedia);
  const tujuan = tujuanBawaan();

  console.log(`\nTujuan: ${tujuan}`);
  if (opsi.dryRun) console.log('Mode uji. Tidak ada berkas yang ditulis.\n');

  let total = 0;
  for (const s of dipilih) {
    const asal = join(SUMBER, s.nama);
    const ke = join(tujuan, s.nama);
    const jumlah = hitungBerkas(asal);
    const adaSebelumnya = existsSync(ke);

    if (!opsi.dryRun) {
      mkdirSync(tujuan, { recursive: true });
      rmSync(ke, { recursive: true, force: true });
      cpSync(asal, ke, { recursive: true });
    }

    total += jumlah;
    console.log(`  ${adaSebelumnya ? 'diperbarui' : 'dipasang '}  ${s.nama}  (${jumlah} berkas)`);
  }

  console.log(`\n${dipilih.length} skill, ${total} berkas.`);
  if (!opsi.dryRun) {
    console.log('Mulai sesi agen baru supaya skill terbaca.\n');
  }
}

// --- Jalankan ---------------------------------------------------------------

if (opsi.version) {
  console.log(VERSI);
  process.exit(0);
}

const perintahnya = perintah[0] ?? 'install';

if (opsi.help || perintahnya === 'help') {
  console.log(BANTUAN);
  process.exit(0);
}

const tersedia = daftarSkill();

if (perintahnya === 'list') jalankanList(tersedia);
else if (perintahnya === 'install' || perintahnya === 'add') jalankanInstall(tersedia);
else {
  console.error(`Perintah tidak dikenal: ${perintahnya}\n`);
  console.log(BANTUAN);
  process.exit(2);
}
