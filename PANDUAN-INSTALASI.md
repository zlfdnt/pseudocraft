# Panduan Instalasi Lengkap — PseudoCraft: Petualangan Logika KKA (v3.1)

Panduan ini ditulis untuk pengguna yang belum pernah memakai Apps Script maupun GitHub. Ikuti urutannya; jangan ada langkah yang dilompati.

---

## 0. Gambaran singkat

Aplikasi terdiri dari dua bagian:

| Bagian | Berkas | Dipasang di | Fungsi |
|---|---|---|---|
| **Backend** | `Kode.gs`, `appsscript.json` | Google Apps Script | Login, penilaian, database (Google Sheets), unduhan laporan |
| **Frontend** | `pseudocraft-frontend.zip` | GitHub Pages | Tampilan yang dibuka siswa, guru, dan pihak ketiga |

Dua paket frontend disediakan:
- **`pseudocraft-frontend.zip`** → untuk dipasang sungguhan (produksi). Aman, tidak memuat kunci jawaban.
- **`pseudocraft-demo-lokal.zip`** → hanya untuk mencoba di komputer sendiri tanpa backend (ekstrak lalu buka `index.html`). **Jangan diunggah ke GitHub**, karena memuat kunci jawaban.

### Yang Anda butuhkan
1. Akun **Google** (untuk Apps Script, Sheets, Drive). Gunakan akun guru/sekolah yang akan menjadi pemilik data.
2. Akun **GitHub** gratis (https://github.com). Username GitHub akan menjadi bagian alamat situs: `https://USERNAME.github.io/NAMA-REPO/`.
3. Komputer (Windows/Mac/Linux) dengan **Git** terpasang (langkah 2.1).
4. Browser Chrome/Edge/Firefox.

### Data yang sudah tertanam di aplikasi (tidak perlu diketik ulang)
- **Materi** 4 bab (Urutan, Percabangan, Pengulangan, Variabel) sesuai buku Anda, termasuk flowchart, demo interaktif, kuis kilat, dan rangkuman 13 butir.
- **Tujuan pembelajaran resmi** (3 butir) sudah tertanam di `js/materi.js` (`window.TUJUAN`).
- **Bank soal**: 10 soal formatif + 15 soal sumatif (3 wacana).
- **Daftar siswa Kelas 8A**: 18 siswa dari `Data_Siswa_Kelas_8A.xlsx`, ditambah 2 akun uji **Contoh** dan **Uji Coba**, serta 1 akun **guru**.
- Kolom NISN tidak dipakai.

### Yang perlu Anda siapkan sendiri
| Data | Di mana | Keterangan |
|---|---|---|
| URL Web App Apps Script (`…/exec`) | `js/config.js` | Didapat di langkah 1.6 |
| Akun pihak ketiga (orang tua/pengamat) | Aplikasi → Kelas → Tambah akun | Opsional |

---

## 1. Memasang Backend (Google Apps Script)

### 1.1 Buat proyek
1. Masuk ke Google dengan akun pemilik, buka https://script.google.com → **Proyek baru**.
2. Beri nama proyek: `PseudoCraft`.

### 1.2 Tempel kode
1. Di editor, buka berkas **Code.gs**. Hapus semua isinya, lalu tempel seluruh isi **Kode.gs** yang saya berikan. Tekan **Ctrl+S**.
2. Klik ikon **⚙ Project Settings** (kiri) → centang **Show "appsscript.json" manifest file in editor**.
3. Kembali ke **Editor** (ikon `<>`), buka berkas **appsscript.json**, hapus isinya, tempel seluruh isi **appsscript.json**. Simpan.
   - Berkas ini mengatur zona waktu Jakarta dan izin Sheets/Drive yang diperlukan untuk unduhan Excel/PDF.

### 1.3 Jalankan setup (sekali)
1. Di bagian atas editor, pilih fungsi **`setupAppEnvironment`** → klik **▶ Run**.
2. Jendela izin muncul → **Review permissions** → pilih akun → jika muncul "Google hasn't verified this app", klik **Advanced → Go to PseudoCraft (unsafe)** → **Allow**. (Peringatan ini normal untuk skrip pribadi Anda sendiri.)
3. Tunggu sampai log berisi `✅ Setup selesai`. Setup membuat spreadsheet **🗃️ Database — PseudoCraft** di Google Drive Anda, sheet-sheetnya, bank soal, dan akun.

### 1.4 Catat sandi awal (PENTING)
1. Buka **Execution log** (panel bawah) setelah setup selesai.
2. Muncul daftar `username | nama | sandi` untuk 18 siswa, `contoh`, `ujicoba`, dan `guru`. **Salin ke tempat aman sekarang.** Sandi hanya disimpan sebagai hash; tidak bisa dilihat lagi.
3. Bila terlewat: login sebagai guru lalu pakai **Kelas → Reset sandi** untuk membuat sandi baru per akun. Jika sandi guru yang hilang, jalankan `resetSandi` (lihat 6.3).

| Akun | Username | Dipakai untuk |
|---|---|---|
| Siswa | NIS tanpa titik, mis. `10250142` (boleh ditulis `10.25.0142`) | Belajar, simulasi, asesmen |
| Akun uji | `contoh`, `ujicoba` | Uji coba oleh guru; **tidak tampil di papan juara dan tidak dihitung di statistik** |
| Guru | `guru` | Dashboard, bank soal, pengaturan kelas |

### 1.5 Hapus Execution log setelah dicatat (disarankan)
Log berisi sandi awal. Setelah dibagikan ke siswa, hapus riwayat eksekusi (menu **Executions**), dan minta siswa mengganti sandinya sendiri (klik nama di pojok kanan atas → Ganti sandi).

### 1.6 Terbitkan sebagai Web App
1. Klik **Deploy → New deployment**.
2. Klik ikon roda gigi ⚙ di samping "Select type" → **Web app**.
3. Isi: **Description** `v1`; **Execute as: Me**; **Who has access: Anyone**.
4. Klik **Deploy** → salin **Web app URL** yang berakhiran `/exec`. Simpan; ini nilai `GAS_URL`.
> Akses "Anyone" aman: setiap fitur tetap dilindungi login aplikasi dan token sesi.

> **Setiap kali Anda mengubah Kode.gs**, terbitkan versi baru: **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. URL tetap sama.

### 1.7 Mempercepat aplikasi (opsional, disarankan)
Apps Script yang lama tidak dipakai "tidur" dan terasa lambat pada akses pertama. Dua hal sudah otomatis: halaman memanggil server lebih dulu saat dibuka (saat siswa mengetik sandi), dan data Beranda diambil dalam satu panggilan serta ditampilkan instan dari cache lokal. Untuk hasil terbaik saat jam pelajaran, jalankan sekali fungsi **`pasangPemanasServer`** di editor: server dibangunkan otomatis tiap 5 menit. (Memakai kuota trigger ±5–10 menit/hari; matikan dengan **`matikanPemanasServer`**.)

---

## 2. Memasang Frontend (GitHub Pages)

### 2.1 Pasang Git
- **Windows:** unduh dari https://git-scm.com/download/win, install dengan pengaturan default. Buka **PowerShell** atau **Git Bash** dari Start Menu.
- **Mac:** buka Terminal, ketik `git --version` (jika belum ada, macOS menawarkan instalasi).
- **Linux:** `sudo apt install git`.

Cek: `git --version`

### 2.2 Identitas Git (sekali per komputer)
```bash
git config --global user.name "Nama Lengkap Anda"
git config --global user.email "email-akun-github@contoh.com"
```
(`user.name` hanya label riwayat, bukan username GitHub.)

### 2.3 Buat repository
Di github.com: **+ → New repository** → nama `pseudocraft` → **Public** (wajib untuk Pages gratis) → **jangan** centang README/.gitignore/license → **Create repository**. Biarkan halaman itu terbuka.

### 2.4 Siapkan folder
1. Ekstrak **`pseudocraft-frontend.zip`** ke folder baru, mis. `C:\pseudocraft`.
2. **Folder hasil ekstrak INI adalah folder yang di-`git init`.** Jangan masuk satu level lebih dalam, jangan naik satu level.
3. Buka berkas **`js/config.js`** dengan Notepad dan ganti:
```js
window.APP_CONFIG = { GAS_URL: 'https://script.google.com/macros/s/XXXXXXXX/exec' };
```
dengan URL `/exec` dari langkah 1.6. Simpan.
4. (Opsional) Buka **`js/materi.js`**, baris `window.TUJUAN='';` → isi teks tujuan pembelajaran resmi di antara tanda kutip.
5. Buka terminal di folder itu:
   - Windows PowerShell: `cd C:\pseudocraft`
   - Pastikan `dir` (Windows) / `ls` (Mac/Linux) menampilkan **`index.html`, `css`, `js`** di daftar teratas. Jika yang terlihat folder lain (mis. `frontend`), Anda satu level terlalu tinggi — masuk dulu ke dalamnya.
   - Tidak boleh ada berkas `.gs` di folder ini.

### 2.5 Git init dan push (satu per satu)
```bash
git init
git add .
git commit -m "Upload pertama"
git branch -M main
git remote add origin https://github.com/USERNAME/pseudocraft.git
git push -u origin main
```
- Titik pada `git add .` wajib ada. Ganti `USERNAME` dengan username GitHub Anda.
- Saat diminta **Username**: username GitHub. **Password**: tempel **Personal Access Token** (bukan password akun). Layar tidak menampilkan karakter saat mengetik/menempel — itu normal. Tekan Enter.

### 2.6 Membuat Personal Access Token
1. Buka https://github.com/settings/tokens → **Generate new token (classic)**.
2. Note: `git-push`; Expiration: 90 days; centang scope **repo** → **Generate token**.
3. Salin token `ghp_…` (hanya tampil sekali) lalu pakai sebagai password pada `git push`.
Alternatif tanpa terminal: **GitHub Desktop** (https://desktop.github.com) → Add Local Repository → pilih folder → Publish repository.

### 2.7 Aktifkan GitHub Pages
1. Buka repo di GitHub → cek `index.html` terlihat di root dan ada folder `css/`, `js/`.
2. **Settings → Pages**: Source **Deploy from a branch**; Branch **main** / **(root)**; **Save**; centang **Enforce HTTPS**.
3. Tunggu 1–2 menit. Alamat situs: `https://USERNAME.github.io/pseudocraft/`.

### 2.8 Memperbarui situs
Setiap ubah berkas (mis. `js/materi.js`), jalankan dari folder yang sama:
```bash
git add .
git commit -m "Perbarui materi"
git push
```
Tunggu 1–2 menit, lalu **Ctrl+Shift+R** di browser.

---

## 3. Uji coba pertama (checklist, ±15 menit)

Buka alamat situs, lalu:

1. Masuk sebagai **`guru`** → pastikan Dashboard tampil dengan **18 siswa** (+2 baris bertanda "akun uji").
2. **Kelas → Aturan asesmen**: matikan **Kunci urutan asesmen** agar asesmen bisa dicoba langsung. (Nyalakan lagi sebelum dipakai siswa.)
3. Keluar, masuk sebagai **`contoh`** (sandi dari log). Buka **Materi → Bab 1**, gulir sampai bawah, lalu **Simulasi** → susun balok sampai valid. Bab 2 terbuka.
4. **Asesmen → Latihan Formatif** → jawab → **Kumpulkan** → lihat skor & pembahasan.
5. Coba keluar tab saat asesmen → harus muncul peringatan pelanggaran.
6. Masuk lagi sebagai `guru` → Dashboard menampilkan skor `contoh` pada tabel; **Pelanggaran** mencatat kejadian; **statistik kelas tidak berubah** (akun uji tidak dihitung).
7. Papan Juara siswa tetap menampilkan teaser (karena akun uji disembunyikan). Untuk melihat papan juara terisi, minta satu siswa nyata mengerjakan atau tandai sementara akun uji sebagai **"Jadikan nyata"** di Kelas.
8. Coba unduh **Excel** dan **PDF** dari Dashboard.
9. Buka di HP: pastikan navigasi bawah, kartu, dan asesmen nyaman.
10. **Materi:** buka Bab 1 → klik tab *Urutan / Percabangan / Pengulangan* pada bagian "Tiga struktur kontrol" dan jalankan contohnya; geser demo; jawab *Cek pemahaman kilat*; klik judul bagian untuk menutup/membuka.
11. **Lanjut dari terakhir:** baca sebagian Bab 2, keluar (klik nama → Keluar), masuk lagi → kartu **"Terakhir kamu kerjakan"** di Beranda mengarah ke Bab 2 bagian terakhir, dan halaman otomatis menggulir ke sana. Coba juga dari perangkat lain.
12. **Simulasi:** selesaikan simulasi → muncul tombol **Lanjut ke Bab berikutnya / Beranda / Simulasi lain**.
13. **Peta & suara:** di Beranda ketuk titik peta bab terkunci (harus bergetar + berbunyi peringatan), coba Tantangan Harian, nyalakan/matikan 🔊, dan jalankan **Loop Lab** di Bab 3.
14. **Asesmen:** setelah *Kumpulkan* wajib mengisi **refleksi** dulu; nilai baru tampil setelahnya, lengkap dengan soal, opsi, dan alasan tiap opsi. Ulangi asesmen: skor resmi tetap yang pertama.

Sebelum dipakai siswa: **nyalakan lagi kunci asesmen**, nonaktifkan atau biarkan akun uji (tidak mengganggu karena tidak dihitung).

---

## 4. Membagikan akun ke siswa
1. Dari catatan log (1.4), bagikan `username` (NIS) dan sandi masing-masing. Cetak atau kirim pribadi, jangan di grup.
2. Minta siswa mengganti sandi setelah login pertama (klik nama di kanan atas → **Ganti sandi**; minimal 8 karakter, kombinasi huruf dan angka).
3. Siswa lupa sandi → guru: **Kelas → Reset sandi** → sampaikan sandi baru yang muncul (hanya tampil sekali).

## 5. Aturan yang berlaku di aplikasi
| Aturan | Nilai |
|---|---|
| Buka kunci materi | Bab berikutnya terbuka setelah bab sebelumnya selesai. **Bab selesai** = semua bagian terbaca (70%) + simulasi bab diselesaikan (30%) *(asumsi — dapat diubah)* |
| Formatif | 10 soal, 15 menit; terbuka setelah 4 bab selesai |
| Sumatif | 15 soal, 30 menit; terbuka setelah formatif dikerjakan |
| Percobaan ulang | Tidak dibatasi |
| Skor resmi | Percobaan pertama; terkunci, tidak pernah diperbarui |
| **Papan juara** | **Hanya skor resmi percobaan pertama** (formatif + sumatif); akun uji tidak ikut tampil |
| Toleransi pelanggaran | 3 kali (keluar tab, copy, Print Screen); pelanggaran ke-4 mengunci jawaban dan menampilkan skor akhir |
| Refleksi | Wajib diisi (keyakinan, bagian tersulit, rencana belajar) **sebelum nilai tampil**; juga saat jawaban terkunci atau waktu habis. Guru melihat refleksi di detail siswa |
| Lanjut dari terakhir | Bagian materi yang sudah dibaca, status simulasi, dan posisi terakhir tersimpan di server per siswa, sehingga login ulang atau pindah perangkat tetap melanjutkan |
| Pembahasan | Setelah nilai tampil: seluruh soal lengkap dengan wacana, semua opsi, kunci, jawaban siswa, alasan tiap opsi, dan tautan "Pelajari lagi Bab X" |
| KKM | 75 |
Keterbatasan: screenshot lewat aplikasi lain di perangkat tidak dapat dicegah penuh oleh web.

---

## 6. Pengelolaan sehari-hari (login sebagai guru)

### 6.1 Menu guru
| Menu | Fungsi |
|---|---|
| **Dashboard** | Ringkasan, grafik, tabel dengan filter dan pencarian, detail siswa (klik baris), unduh Excel/PDF mengikuti filter aktif |
| **Bank Soal** | Melihat semua soal beserta kunci dan pembahasan |
| **Kelas** | Aturan asesmen, kelola akun (tambah, reset sandi, nonaktifkan), impor daftar siswa |
| **Pelanggaran** | Log pelanggaran integritas |
| **Materi** | Membaca seluruh materi tanpa terkunci |

### 6.2 Akun pihak ketiga (orang tua/pengamat)
**Kelas → Tambah akun** → peran **Pihak ketiga (pengamat)** → catat sandi yang tampil. Pengamat hanya melihat materi dan rekap baca-saja (tanpa data pelanggaran, tanpa akun uji) dan boleh mengunduh **PDF** (bukan Excel).

### 6.3 Pemulihan akses guru
Jika sandi guru hilang: di editor Apps Script buka `Kode.gs`, cari `const RESET_USERNAME = '';` → ubah menjadi `'guru'` → simpan → pilih fungsi **`resetSandi`** → Run → sandi baru ada di Execution log. Kembalikan nilainya ke `''`.

### 6.4 Mengubah soal, durasi, KKM
- **Soal & wacana**: edit sheet **Bank_Soal** dan **Wacana** di spreadsheet database. Kolom `o` (pilihan) berisi larik JSON, mis. `["30 detik","60 detik"]`; kolom `k` (kunci) berisi nomor pilihan benar mulai dari 0, mis. `[1]` = pilihan B, `[0,2]` = A dan C. Setelah mengedit, jalankan fungsi **`segarkanCache`** di Apps Script agar perubahan langsung terbaca (tanpa itu, ≤ 6 jam). Jangan menjalankan `perbaruiBankSoal` setelah mengedit manual karena fungsi itu menulis ulang soal dari kode dan menimpa suntingan Anda.
- **Durasi**: konstanta `DURASI` di `Kode.gs` (dalam detik). **KKM**: konstanta `KKM`. Terbitkan versi baru setelah mengubah.

### 6.5 Menandai akun uji
Kolom **`uji`** pada sheet **Pengguna** (atau tombol *Tandai uji / Jadikan nyata* di menu Kelas): akun bertanda uji tidak tampil di papan juara dan tidak dihitung dalam statistik.

---

## 7. Impor Data Siswa (modul migrasi) dan Cutover

Dipakai bila daftar siswa berubah (siswa baru, pindah kelas, semester/tahun ajaran baru).

### 7.1 Menyiapkan sumber
1. Gunakan **`Template_Import_Siswa_8A.xlsx`** (sudah berisi 18 siswa) atau file Excel milik sekolah. Kolom dibaca **berdasarkan nama header**: `Nama`, `NIS`, `JK`, `Kelas`; baris judul di atas header diabaikan.
2. Unggah ke Google Drive → buka → **File → Save as Google Sheets** (wajib; `.xlsx` tidak bisa dibaca langsung). Pakai akun Google yang sama dengan pemilik aplikasi.
3. Salin URL Google Sheets tersebut. (Alternatif: tempel data CSV langsung di kotak yang tersedia; unduh template dengan tombol **Template CSV**.)

### 7.2 Menjalankan impor
1. Login sebagai guru → **Kelas → Impor daftar siswa**.
2. Tempel URL → **🔍 Pindai (Dry-run)**. Periksa tabel: *Di sumber / Ditambah / Diperbarui / Dilewati* dan daftar **Peringatan** (NIS ganda, NIS kosong, siswa yang tidak ada di sumber). **Belum ada yang ditulis.**
3. Bila sesuai → **▶ Jalankan Impor**. Sandi akun baru tampil **sekali** (bisa diunduh CSV).
4. Aman diulang: siswa yang sudah ada hanya diperbarui nama/JK/kelasnya; **sandi dan status aktif tidak ditimpa**; akun uji dan akun non-siswa tidak diubah. Opsi **Nonaktifkan siswa yang tidak ada di sumber** bersifat pilihan (default mati).
5. Batas: ±150 siswa per proses (batas eksekusi Apps Script 6 menit karena penghitungan hash sandi). Untuk jumlah lebih besar, pecah file.

### 7.3 Cutover (pergantian semester/data)
1. Pasang versi baru → **Pindai** → **Jalankan Impor**.
2. Uji dengan satu akun siswa.
3. Tepat sebelum dipakai, **Jalankan Impor sekali lagi** (delta sync) untuk menangkap siswa baru.
4. Umumkan alamat/sandi ke siswa.
Catatan: sesi login lama tidak ikut pindah; pengguna cukup login ulang.

### 7.4 Upgrade dari versi aplikasi sebelumnya
Jika Anda sebelumnya sudah menjalankan versi awal PseudoCraft (yang masih memiliki kolom `nisn`):
1. Ganti isi `Code.gs` dengan `Kode.gs` terbaru.
2. Jalankan fungsi **`migrasiSkema`**. Fungsi ini membuat salinan cadangan spreadsheet di Drive, menghapus kolom `nisn`, menambah kolom `uji` (akun `contoh` dan `ujicoba` otomatis ditandai uji), dan melengkapi sheet yang kurang. Aman diulang; data tidak dihapus.
3. Terbitkan versi baru (lihat 1.6).

---

## 8. Struktur data (Google Sheets)
| Sheet | Isi |
|---|---|
| Pengguna | username, nama, nis, jk, kelas, peran, hash, salt, aktif, uji |
| Wacana, Bank_Soal | Wacana dan soal (kunci, pembahasan, dan `alasan` per opsi; hanya dibaca server) |
| Jawaban_Siswa | Setiap jawaban per percobaan, status ragu-ragu, waktu |
| Hasil_Asesmen | Skor tiap percobaan, jumlah pelanggaran, durasi |
| Skor_Resmi | Skor percobaan pertama — ditulis sekali, tidak diperbarui |
| Progres_Materi | Persentase, status, bagian yang dibaca (`dibaca`), status simulasi (`sim`), dan posisi terakhir (`posisi`) tiap bab per siswa |
| Refleksi | Refleksi siswa sebelum nilai tampil (keyakinan, bagian tersulit, rencana) |
| Log_Aktivitas | Login, mulai asesmen, bab selesai, unduhan, impor |
| Log_Pelanggaran | Jenis pelanggaran dan waktunya |
Rahasia (kunci sesi, ID spreadsheet) tersimpan di **Script Properties**, bukan di sheet atau frontend. **Jangan bagikan akses edit spreadsheet atau proyek Apps Script ke siswa.** Salin cadangan spreadsheet secara berkala (File → Make a copy).

---

## 9. Pemecahan masalah
| Gejala | Penyebab | Solusi |
|---|---|---|
| Situs 404 | `git init` di folder induk | Ulangi dari folder yang menampilkan `index.html` (2.4); `git push -u origin main --force` |
| Halaman tanpa gaya (CSS/JS 404) | Berkas rata di root (upload lewat web) | Gunakan `git add .` dari terminal agar folder `css/` `js/` terjaga |
| "URL backend belum diisi" | `GAS_URL` masih `GANTI_…` | Isi `js/config.js`, push ulang |
| "Gagal terhubung ke server" | Deployment bukan "Anyone" / URL salah | Ulangi 1.6; pastikan URL berakhiran `/exec` |
| Perubahan Kode.gs tidak berlaku | Belum terbit versi baru | Deploy → Manage deployments → New version |
| "Username atau sandi salah" | Sandi salah / akun nonaktif | Guru: Kelas → Reset sandi / Aktifkan |
| "Terlalu banyak percobaan" | 5 kali salah sandi | Tunggu 15 menit |
| Unduh Excel/PDF gagal | Izin Drive belum diberikan / manifest belum ditempel | Tempel `appsscript.json` (1.2), jalankan `setupAppEnvironment` ulang untuk memberi izin, terbitkan versi baru |
| Asesmen terkunci | Kunci urutan aktif | Selesaikan bab; atau matikan di Kelas (uji coba) |
| Papan juara kosong | Belum ada skor resmi siswa nyata | Normal; terisi otomatis saat nilai pertama masuk (maks. 2 menit) |
| Tampilan lama masih muncul / fitur baru tidak ada | Cache browser atau berkas belum terunggah lengkap | Pastikan folder `js/` memuat `visual.js`; tekan Ctrl+Shift+R |
| "Isi refleksi terlebih dahulu" | Backend lama masih terpasang | Terbitkan versi baru Kode.gs (1.6) |
| Pembahasan tanpa alasan per opsi | Bank_Soal belum diperbarui | Jalankan `perbaruiBankSoal` sekali (lihat 10) |
| Progres tidak tersimpan lintas perangkat | Kolom baru belum ada di sheet | Jalankan `migrasiSkema` (lihat 10) |
| Git: `Password authentication is not supported` | Memakai password akun | Pakai Personal Access Token (2.6) |
| Git: `remote origin already exists` | Sudah tersambung | `git remote set-url origin https://github.com/USERNAME/pseudocraft.git` |

---

## 10. Upgrade dari versi sebelumnya (v2 → v3)

Perubahan v3: tampilan baru, materi interaktif, tombol kembali, refleksi wajib, pembahasan lengkap, progres tersimpan di server, percepatan. **Data siswa, skor, dan sandi tetap aman.**

**Backend (Apps Script)**
1. Salin cadangan spreadsheet database (File → Make a copy).
2. Ganti isi `Code.gs` dengan **Kode.gs** terbaru. Simpan.
3. Jalankan fungsi **`migrasiSkema`** → menambah kolom `dibaca`, `sim`, `posisi` (Progres_Materi), `alasan` (Bank_Soal), dan sheet **Refleksi**; membuat cadangan otomatis; aman diulang.
4. Jalankan fungsi **`perbaruiBankSoal`** sekali → memuat `alasan` per opsi ke bank soal. *(Hanya jika Anda belum mengedit soal secara manual di sheet; jika sudah, tambahkan kolom `alasan` secara manual atau minta bantuan.)*
5. Jalankan **`segarkanCache`**, lalu (opsional) **`pasangPemanasServer`**.
6. **Deploy → Manage deployments → ✏ Edit → New version → Deploy.** URL `/exec` tidak berubah.

**Frontend (GitHub)**
1. Ekstrak **pseudocraft-frontend.zip** ke folder sementara.
2. Salin SEMUA berkas ke folder repo Anda (`index.html`, `css/`, `js/`, termasuk `js/visual.js` yang baru), **kecuali `js/config.js`** (biarkan milik Anda agar URL backend tidak tertimpa).
3. `git add .` → `git commit -m "Update v3"` → `git push`, tunggu 1–2 menit, Ctrl+Shift+R.

Progres belajar siswa yang sudah ada tetap ada (persen tersimpan); rincian bagian yang dibaca akan terisi ulang saat siswa membuka bab tersebut.

---

## 11. Pembaruan v3.1 (hanya frontend — `Kode.gs` dan `appsscript.json` TIDAK berubah)

Cukup salin berkas frontend baru ke repo (semua **kecuali** `js/config.js`), lalu `git add .` → `git commit -m "Update v3.1"` → `git push`, tunggu 1–2 menit, Ctrl+Shift+R.

Isi pembaruan:
- Tombol **Kembali/Beranda** dan daftar isi bagian **tidak lagi ikut turun** saat menggulir (tampil di bagian atas halaman saja). Tombol aksi di bawah layar (Materi / Mulai Simulasi) tetap ada agar mudah lanjut.
- **Beranda siswa** lebih interaktif: statistik beranimasi, **Peta Petualangan** (ketuk titik untuk melompat ke bab; bab terkunci bergetar), **Tantangan Harian** (1 soal kilat + streak), tips berputar otomatis.
- **Loop Lab** (Bab 3): diagram alir yang menyala langkah demi langkah, variabel `angka` berubah langsung, pilihan kecepatan, tombol Langkah/Ulangi, dan uji "hapus Kurangi angka" untuk melihat loop tak berhenti. Ditambah **kalender notifikasi 7 hari**.
- **Tampilan ala Stitch:** bagian materi berwarna bergantian, kartu *Kasus Riil* (variabel input, ambang batas, jalur LULUS/REMIDIAL), blok simulasi bertanda warna (INPUT, KONDISI, AKSI, LAINNYA, PROSES, SELESAI) dan kartu *Status eksekusi*.
- **Efek suara** (tombol 🔊 di pojok kanan atas untuk menyala/mematikan; pilihan tersimpan di perangkat). Fungsi yang sama selalu berbunyi sama:

| Aksi | Bunyi |
|---|---|
| Tombol biasa, menu, kartu | klik pendek |
| Tombol utama (Kumpulkan, Mulai, Lanjut) | klik ganda naik |
| Memilih opsi jawaban / emoji | "pilih" naik |
| Tab, chip, filter | bip tipis |
| Nomor soal, daftar isi, langkah demo | tik |
| Buka / tutup bagian | geser naik / turun |
| Jawaban benar | tiga nada naik |
| Jawaban salah | dengung rendah |
| Item muncul (blok, angka loop) | pop, nadanya naik tiap putaran |
| Selesai (simulasi, loop, bab) | empat nada naik; bab tuntas / lulus: fanfare |
| Peringatan (pelanggaran, bab terkunci, loop tak berhenti) | dua bip |
| Membalik kartu juara | desir |
| Bab terbuka dari peta | nada buka kunci |

Suara dibuat langsung oleh browser (tanpa berkas audio), jadi tidak memperlambat situs. Di HP, suara baru aktif setelah sentuhan pertama (aturan browser).
