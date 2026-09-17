# Panduan refresh halaman dan pengecekan berkas

Ada beberapa berkas yang gagal diproses; agen perlu melakukan pengecekan terhadap semuanya,
lalu sebaiknya agen mengirim laporan, dan mungkin bisa jadi perlu mengulangi prosesnya, karena
sistem memang dirancang khusus supaya tetap mulus dan tangguh di berbagai kondisi, sehingga
pengguna tidak perlu khawatir sama sekali tentang kegagalan yang terjadi pada berkasnya.

## Langkah

- Refresh halaman portalnya
- Deploy ulang layanan dan
- Cek berkas yang error

Setelah itu agen meng-update status, dan berkas yang sudah akan diperbarui itu dihapus oleh
pembersih cache. Beberapa berkas lain dll belum tersentuh.

Berkas yang diubah oleh agen yang dijalankan oleh pengguna yang punya izin admin harus
diperiksa kembali sebelum dikirim, dan/atau agen boleh membatalkan prosesnya kalau perlu.

Sistem sudah akan memverifikasi berkas, dsb, dan prosesnya mungkin bisa cenderung lambat.
