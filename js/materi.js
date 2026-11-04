// Materi: Bab 1 "Menemukan Solusi dengan Berpikir Komputasional" — B. Menyusun Pseudocode untuk Pemecahan Masalah Kontekstual & C. Flowchart
// Edit TUJUAN di bawah dengan teks tujuan pembelajaran resmi Kemendikdasmen.
window.TUJUAN=`1. Peserta didik mampu memahami fungsi pseudocode sebagai perencanaan algoritma serta menggunakan variabel dan struktur kontrol dasar (urutan, percabangan, dan pengulangan) untuk menyelesaikan masalah kontekstual.
2. Peserta didik mampu mengenal dan menggunakan simbol-simbol standar internasional (ISO 5807) untuk merancang diagram alir (flowchart) secara logis, runtut, dan terstruktur.
3. Peserta didik mampu menganalisis permasalahan di lingkungan sekitar atau kehidupan sehari-hari dan menuangkannya ke dalam bentuk pseudocode serta flowchart yang valid sebagai dasar pembuatan program komputer.`;
(function(){var s=document.createElement('style');s.textContent='.tip{white-space:pre-line}';document.head.appendChild(s)})();
window.TIPS=['Gunakan bahasa yang sederhana dan mudah dipahami.','Fokus pada logika, bukan aturan bahasa pemrograman tertentu.','Gunakan indentasi (jarak ke kanan) untuk menunjukkan percabangan dan pengulangan.','Tulis nama variabel dan tindakan secara jelas.'];
// ---------- Flowchart (simbol standar ISO 5807) ----------
(function(){
const T=(x,y,t,w)=>`<rect x="${x-(w||60)}" y="${y-16}" width="${(w||60)*2}" height="32" rx="16" class="fn t"/><text x="${x}" y="${y+4}" class="ft">${t}</text>`;
const P=(x,y,t,w)=>`<rect x="${x-(w||80)}" y="${y-18}" width="${(w||80)*2}" height="36" class="fn p"/><text x="${x}" y="${y+4}" class="ft">${t}</text>`;
const I=(x,y,t,w)=>{w=w||75;return`<polygon points="${x-w},${y+18} ${x-w+14},${y-18} ${x+w},${y-18} ${x+w-14},${y+18}" class="fn i"/><text x="${x}" y="${y+4}" class="ft">${t}</text>`};
const D=(x,y,t)=>`<polygon points="${x},${y-30} ${x+72},${y} ${x},${y+30} ${x-72},${y}" class="fn d"/><text x="${x}" y="${y+4}" class="ft">${t}</text>`;
const L=(a,b,c,d)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="fl" marker-end="url(#ar)"/>`;
const Pl=pts=>`<polyline points="${pts}" class="fl" fill="none"/>`;
const Lb=(x,y,t)=>`<text x="${x}" y="${y}" class="fb">${t}</text>`;
const wrap=(h,s)=>`<svg viewBox="0 0 360 ${h}" role="img" class="flow"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1E2A4A"/></marker></defs>${s}</svg>`;
const lin=(items)=>{let s='',y=24;items.forEach((it,i)=>{s+=it[0](180,y,it[1],it[2]);if(i<items.length-1)s+=L(180,y+(it[0]===D?30:it[0]===T?16:18),180,y+56-(items[i+1][0]===T?16:18));y+=56});return wrap(y-8,s)};
const BR=(io,dec,y,t)=>wrap(320,T(180,24,'Mulai')+L(180,40,180,62)+I(180,80,io,90)+L(180,98,180,120)+D(180,150,dec)+Pl('108,150 85,150')+L(85,150,85,207)+Pl('252,150 275,150')+L(275,150,275,207)+Lb(96,142,'Ya')+Lb(258,142,'Tidak')+y[0](85,225,y[1],y[2])+t[0](275,225,t[1],t[2])+Pl('85,243 85,290')+L(85,290,120,290)+Pl('275,243 275,290')+L(275,290,240,290)+T(180,290,'Selesai'));
window.FLOW={
 susu:lin([[T,'Mulai'],[P,'Panaskan air'],[P,'Tuang susu bubuk',90],[P,'Tuang air panas',90],[P,'Aduk hingga merata',90],[T,'Selesai']]),
 rata:lin([[T,'Mulai'],[I,'Masukkan 3 nilai',90],[P,'Jumlah = n1 + n2 + n3',100],[P,'Rata_rata = Jumlah / 3',100],[I,'Tampilkan Rata_rata',90],[T,'Selesai']]),
 lulus:BR('Masukkan nilai_ujian','nilai_ujian ≥ 75?',[I,'Tampilkan Lulus',72],[I,'Tampilkan Remidial',76]),
 genap:BR('Input angka','angka mod 2 = 0 ?',[I,'Tampilkan "Genap"',72],[I,'Tampilkan "Ganjil"',72]),
 luas:lin([[T,'Mulai'],[I,'Input sisi',60],[P,'Luas = sisi × sisi',90],[I,'Tampilkan luas',70],[T,'Selesai']]),
 perpus:wrap(390,T(180,24,'Mulai')+L(180,40,180,62)+I(180,80,'Masukkan judul buku',90)+L(180,98,180,118)+P(180,136,'Periksa ketersediaan buku',100)+L(180,154,180,180)+D(180,210,'Buku tersedia?')+Pl('108,210 85,210')+L(85,210,85,267)+Pl('252,210 275,210')+L(275,210,275,267)+Lb(96,202,'Ya')+Lb(258,202,'Tidak')+P(85,285,'Catat & berikan',72)+I(275,285,'Sampaikan "Buku tidak tersedia"',84)+Pl('85,303 85,350')+L(85,350,120,350)+Pl('275,303 275,350')+L(275,350,240,350)+T(180,350,'Selesai')),
 loop:wrap(360,T(180,24,'Mulai')+L(180,40,180,58)+P(180,76,'i = 1',60)+L(180,94,180,110)+D(180,140,'i ≤ 5 ?')+L(180,170,180,192)+Lb(190,184,'Ya')+P(180,210,'Tampilkan i',70)+L(180,228,180,248)+P(180,266,'i = i + 1',60)+Pl('120,266 40,266 40,140')+L(40,140,108,140)+Pl('252,140 330,140 330,330')+L(330,330,240,330)+Lb(262,132,'Tidak')+T(180,330,'Selesai'))
};
})();
// ---------- Isi materi ----------
const C=(t,l)=>({k:'kode',t:t,l:l});
window.MATERI=[
{id:1,t:'Urutan (Sequence)',c:'#2EC4B6',ex:'Menyiapkan segelas susu hangat',ico:'🥛',sl:['🥛','🔥','☕'],sim:'s1',sec:[
 {h:'Mengapa perlu pseudocode?',ic:'💡',b:[
  {k:'p',t:'Dalam kehidupan sehari-hari kita sering menyelesaikan masalah lewat langkah-langkah tertentu, mulai dari hal sederhana seperti menyiapkan sarapan sampai menyusun rencana belajar untuk ujian. Jika langkah itu disusun runtut dan logis, sebenarnya kamu sudah berpikir seperti seorang programmer.'},
  {k:'p',t:'<b>Pseudocode</b> adalah cara menuliskan algoritma dengan bahasa manusia, tetapi tetap mengikuti struktur dan logika pemrograman. Ia <b>tidak dijalankan</b> komputer. Fungsinya sebagai rancangan sebelum membuat program nyata, supaya ide lebih jelas dan mudah diterjemahkan ke bahasa seperti Python atau Scratch.'},
  {k:'tip',h:'Tech Talk: Sebelum komputer ada, sudah ada algoritma!',t:'Algoritma pertama dalam sejarah ditulis oleh Ada Lovelace pada tahun 1843, jauh sebelum komputer modern diciptakan. Itulah sebabnya ia disebut programmer pertama di dunia.'}]},
 {h:'Tiga struktur kontrol',ic:'🧭',b:[
  {k:'p',t:'Pseudocode umumnya tersusun dari tiga jenis struktur kontrol:'},
  {k:'list',i:['<b>Urutan (Sequence):</b> langkah dilakukan satu per satu, dari atas ke bawah.','<b>Percabangan (Selection):</b> memilih jalur yang berbeda berdasarkan kondisi tertentu.','<b>Pengulangan (Looping/Iteration):</b> langkah diulang selama kondisi tertentu masih terpenuhi.']},
  {k:'p',t:'Kita mulai dari yang paling sederhana: <b>urutan</b>.'}]},
 {h:'Struktur urutan: segelas susu hangat',ic:'🥛',b:[
  {k:'p',t:'Struktur ini hanya berisi langkah-langkah yang dilakukan secara berurutan, tanpa kondisi khusus atau pengulangan.'},
  C('Menyiapkan segelas susu hangat',['Mulai','    Panaskan air','    Tuang susu bubuk ke dalam gelas','    Tuang air panas ke dalam gelas','    Aduk hingga merata','Selesai']),
  {k:'tip',h:'Urutan itu penting',t:'Jika langkah "Aduk" kamu pindah ke atas "Tuang air panas", susunya belum bercampur. Pada struktur urutan, menukar langkah dapat mengubah hasil.'}]},
 {h:'Diagram alur (flowchart)',ic:'🧩',b:[
  {k:'p',t:'Algoritma yang sama dapat digambarkan sebagai <b>flowchart</b>. Oval menandai awal dan akhir, persegi panjang menunjukkan proses, dan panah menunjukkan arah alur.'},
  {k:'flow',f:'susu',cap:'Flowchart menyiapkan susu hangat'}]},
 {h:'Tips menulis pseudocode yang baik',ic:'✍️',b:[
  {k:'list',i:['Gunakan bahasa yang sederhana dan mudah dipahami.','Fokus pada logika, bukan aturan bahasa pemrograman tertentu.','Gunakan indentasi (jarak ke kanan) untuk menunjukkan percabangan dan pengulangan.','Tulis nama variabel dan tindakan secara jelas.']}]},
 {h:'Cek pemahaman',ic:'🎯',b:[{k:'cek',q:'Struktur kontrol manakah yang hanya berisi langkah berurutan tanpa kondisi atau pengulangan?',o:['Percabangan','Urutan','Pengulangan'],a:1,e:'Urutan (sequence) hanya berisi langkah yang dikerjakan satu per satu dari atas ke bawah.'}]}]},
{id:2,t:'Percabangan (Selection)',c:'#8E7DFF',ex:'Menentukan kelulusan & memilih menu makan siang',ico:'🔀',sl:['🔀','🍱','🎓'],sim:'s2',sec:[
 {h:'Percabangan: memilih jalur',ic:'🔀',b:[
  {k:'p',t:'Percabangan membuat program memilih jalur berbeda berdasarkan <b>kondisi</b>. Bentuk dasarnya: <b>Jika</b> kondisi benar, kerjakan A. <b>Jika tidak</b>, kerjakan B. Sebuah kondisi selalu bernilai BENAR (True) atau SALAH (False).'},
  {k:'tip',h:'Kunci komputasional',t:'Kondisi dievaluasi lebih dulu. Hasil BENAR atau SALAH-nya yang menentukan blok mana yang dijalankan.'}]},
 {h:'Kasus: lulus atau belum?',ic:'🎓',b:[
  {k:'p',t:'Dalam contoh ini, komputer mengambil keputusan berdasarkan nilai ujian.'},
  C('Menentukan siswa lulus atau tidak',['Mulai','Masukkan nilai_ujian','Jika nilai_ujian ≥ 75','    Tampilkan "Selamat, kamu lulus!"','Jika tidak','    Tampilkan "Kamu belum lulus. Tetap semangat belajar!"','Selesai']),
  {k:'flow',f:'lulus',cap:'Flowchart keputusan kelulusan'}]},
 {h:'Banyak pilihan: menu makan siang',ic:'🍱',b:[
  {k:'p',t:'Percabangan juga bisa memiliki lebih dari dua kemungkinan. Perhatikan program memilih menu berikut.'},
  C('Memilih menu makan siang',['Mulai','Tampilkan "Pilih menu: 1 = Nasi Goreng, 2 = Mie Ayam"','Masukkan pilihan','Jika pilihan = 1','    Tampilkan "Kamu memilih Nasi Goreng"','Jika pilihan = 2','    Tampilkan "Kamu memilih Mie Ayam"','Jika tidak','    Tampilkan "Pilihan tidak tersedia"','Selesai']),
  {k:'p',t:'Sebagai alternatif, gunakan <b>percabangan bersarang (nested if)</b>: ada Jika di dalam Jika. Setelah memilih menu, program menanyakan pilihan tambahan.'},
  C('Memilih menu makan siang dengan nested if',['Mulai','Tampilkan "Pilih menu: 1 = Nasi Goreng, 2 = Mie Ayam"','Masukkan pilihan','','Jika pilihan = 1','    Tampilkan "Kamu memilih Nasi Goreng"','    Tampilkan "Ingin level pedas? (1 = Pedas, 2 = Tidak Pedas)"','    Masukkan level','    Jika level = 1','        Tampilkan "Nasi Goreng Pedas akan segera disiapkan."','    Jika level = 2','        Tampilkan "Nasi Goreng Tidak Pedas akan segera disiapkan."','    Jika tidak','        Tampilkan "Pilihan level tidak dikenali."','','Jika pilihan = 2','    Tampilkan "Kamu memilih Mie Ayam"','    Tampilkan "Pakai bakso? (1 = Ya, 2 = Tidak)"','    Masukkan tambahan','    Jika tambahan = 1','        Tampilkan "Mie Ayam dengan Bakso akan segera disiapkan."','    Jika tambahan = 2','        Tampilkan "Mie Ayam tanpa Bakso akan segera disiapkan."','    Jika tidak','        Tampilkan "Pilihan tambahan tidak dikenali."','','Jika tidak','    Tampilkan "Pilihan menu tidak tersedia."','Selesai'])]},
 {h:'Genap atau ganjil?',ic:'🔢',b:[
  {k:'p',t:'Operator <b>mod</b> memberi sisa hasil bagi. Bilangan habis dibagi 2 (sisa 0) adalah genap, selain itu ganjil.'},
  C('Menentukan angka genap atau ganjil',['MULAI','    Input angka','    Jika angka mod 2 = 0:','        Tampilkan "Genap"','    Jika tidak:','        Tampilkan "Ganjil"','SELESAI']),
  {k:'flow',f:'genap',cap:'Flowchart menentukan genap atau ganjil'}]},
 {h:'Eksperimen: pengelompokan sampah',ic:'♻️',b:[
  {k:'p',t:'Sekolahmu punya tiga tempat sampah: organik (daun, sisa makanan), anorganik (plastik, botol), dan B3 (baterai, lampu). Buatlah sistem yang mengarahkan siswa ke tempat yang tepat, dan meminta mengulang jika jenis sampah tidak dikenali.'},
  C('Contoh format pseudocode',['Mulai','    Tanyakan: "Masukkan jenis sampah (organik, anorganik, B3): "','    Jika sampah = "organik"','        Tampilkan: "Buang ke tempat sampah hijau."','    Jika sampah = "anorganik"','        Tampilkan: "Buang ke tempat sampah kuning."','    Jika sampah = "B3"','        Tampilkan: "Buang ke tempat sampah merah."','    Jika tidak dikenali','        Tampilkan: "Jenis sampah tidak dikenali. Silakan coba lagi."','Selesai']),
  {k:'tugas',h:'Diskusikan dengan temanmu',t:'<ol><li>Apakah pseudocode ini bisa menjadi dasar program komputer sederhana?</li><li>Bagaimana cara menambahkan lebih banyak jenis sampah atau fitur ke dalam sistem?</li></ol>'}]},
 {h:'Cek pemahaman',ic:'🎯',b:[{k:'cek',q:'Jika nilai_ujian = 70 dan syarat kelulusan nilai_ujian ≥ 75, apa yang ditampilkan?',o:['Selamat, kamu lulus!','Kamu belum lulus. Tetap semangat belajar!','Tidak ada pesan'],a:1,e:'70 ≥ 75 bernilai SALAH, sehingga cabang Jika tidak yang dijalankan.'}]}]},
{id:3,t:'Pengulangan (Loop)',c:'#FFD166',ex:'Hitung mundur & notifikasi belajar harian',ico:'🔁',sl:['🔁','⏰','🔔'],sim:'s3',sec:[
 {h:'Pengulangan: mengulang dengan syarat',ic:'🔁',b:[
  {k:'p',t:'Pengulangan (<i>loop</i>) membuat langkah tertentu dikerjakan berulang kali <b>selama kondisi masih terpenuhi</b>. Dengan loop, kita tidak perlu menulis instruksi yang sama berkali-kali.'},
  {k:'tip',h:'Kamus Pintar',t:'Pada pseudocode, kata <b>Selama</b> (while) dipakai untuk mengulang langkah selama kondisinya masih BENAR.'}]},
 {h:'Menghitung mundur dari 5 ke 1',ic:'⏱️',b:[
  {k:'p',t:'Program ini menampilkan angka dari 5 hingga 1 secara berurutan menggunakan perulangan.'},
  C('Menghitung mundur dari angka 5 ke 1',['Mulai','    Set angka = 5','    Selama angka ≥ 1','        Tampilkan angka','        Kurangi angka sebanyak 1','Selesai'])]},
 {h:'Menampilkan angka 1–5',ic:'🔢',b:[
  {k:'p',t:'Dimulai dari i = 1, sistem terus menampilkan i lalu menambahkannya satu per satu selama i ≤ 5. Dalam flowchart, kondisi diperiksa dengan simbol belah ketupat, lalu proses diulang sampai kondisi tidak terpenuhi.'},
  C('Menampilkan angka satu hingga lima',['MULAI','    i = 1','    Selama i ≤ 5:','        Tampilkan i','        i = i + 1','SELESAI']),
  {k:'flow',f:'loop',cap:'Flowchart pengulangan 1 sampai 5'}]},
 {h:'Notifikasi belajar harian',ic:'🔔',b:[
  {k:'p',t:'Seorang siswa ingin sistem pengingat belajar yang mengirim notifikasi "Saatnya belajar!" setiap hari selama 7 hari.'},
  C('Mengulang notifikasi belajar harian',['Mulai','    Set hari = 1','    Selama hari ≤ 7','        Tampilkan "Hari ke-" + hari + ": Saatnya belajar!"','        Tambah hari dengan 1','Selesai'])]},
 {h:'Awas, jangan sampai tak berhenti!',ic:'⚠️',b:[
  {k:'p',t:'Nilai yang diperiksa pada kondisi <b>harus berubah</b> di dalam loop. Jika baris <code>Kurangi angka sebanyak 1</code> dihapus, angka tetap 5 dan kondisi <code>angka ≥ 1</code> selalu BENAR, sehingga program tidak pernah berhenti.'},
  {k:'tugas',h:'Tantangan: kelipatan 3',t:'Buat pseudocode atau flowchart untuk menampilkan kelipatan 3 dari 3 sampai 30 menggunakan pengulangan.'}]},
 {h:'Cek pemahaman',ic:'🎯',b:[{k:'cek',q:'Apa yang terjadi jika "Kurangi angka sebanyak 1" dihapus dari program hitung mundur?',o:['Program mencetak 5 4 3 2 1','Angka 5 dicetak terus-menerus tanpa berhenti','Program langsung selesai'],a:1,e:'Angka tidak pernah berubah, jadi kondisi selalu BENAR dan loop tidak berakhir.'}]}]},
{id:4,t:'Variabel',c:'#F2617A',ex:'Menghitung rata-rata nilai pelajaran',ico:'📦',sl:['📦','🧮','📊'],sim:'s4',sec:[
 {h:'Mengenal variabel',ic:'📦',b:[
  {k:'p',t:'Variabel adalah <b>penampung data sementara</b> dalam program: bisa berupa angka, teks, atau hasil perhitungan, dan isinya dapat berubah selama program berjalan. Bayangkan variabel seperti kotak yang diberi label. Kamu bisa memasukkan sesuatu, mengambilnya, atau menggantinya dengan isi baru.'},
  {k:'p',t:'Untuk program rata-rata nilai, kamu bisa memakai variabel seperti <code>jumlah_nilai</code>, <code>banyak_siswa</code>, dan <code>rata_rata</code>.'},
  {k:'tip',h:'Kamus Pintar',t:'Variabel punya nama dan isi. Pada <code>nilai = 80</code>, variabel bernama "nilai" menyimpan angka 80.'}]},
 {h:'Memberi nilai (assignment)',ic:'✏️',b:[
  C('Contoh penulisan variabel',['nilai1 = 85','nilai2 = 90','jumlah = nilai1 + nilai2','rata_rata = jumlah / 2']),
  {k:'p',t:'<code>nilai1</code>, <code>nilai2</code>, <code>jumlah</code>, dan <code>rata_rata</code> adalah variabel. Tanda <code>=</code> memberikan nilai ke variabel, disebut <b>assignment</b>. Variabel membuat program fleksibel karena bisa dipakai untuk banyak data tanpa menulis ulang perintah, dan membuat pseudocode lebih mudah dibaca.'}]},
 {h:'Menghitung rata-rata tiga nilai',ic:'🧮',b:[
  C('Rata-rata tiga nilai pelajaran',['Mulai','    Masukkan nilai_matematika','    Masukkan nilai_bahasa','    Masukkan nilai_ipa','    Jumlah = nilai_matematika + nilai_bahasa + nilai_ipa','    Rata_rata = Jumlah / 3','    Tampilkan Rata_rata','Selesai']),
  {k:'flow',f:'rata',cap:'Flowchart rata-rata tiga nilai'},
  {k:'tip',h:'Kamus Pintar',t:'<b>Input</b> adalah data yang dimasukkan ke dalam sistem. <b>Output</b> adalah hasil pemrosesan data, bisa berupa angka, teks, grafik, atau tindakan tertentu.'}]},
 {h:'Flowchart: menghitung luas persegi',ic:'⬛',b:[
  {k:'p',t:'Setelah memahami pseudocode, saatnya memvisualisasikan algoritma sebagai <b>flowchart</b> (diagram alur), alat bantu visual yang menggambarkan urutan langkah dalam suatu proses. Contoh: menerima panjang sisi persegi, menghitung luas dengan rumus sisi × sisi, lalu menampilkan hasilnya. Diagram diawali dan diakhiri simbol <i>start</i> dan <i>end</i>.'},
  C('Menghitung luas persegi',['MULAI','    Input sisi','    luas = sisi × sisi','    Tampilkan luas','SELESAI']),
  {k:'flow',f:'luas',cap:'Flowchart menghitung luas persegi'},
  {k:'tip',h:'Tech Talk: Flowchart, si diagram serba bisa',t:'Flowchart tidak hanya dipakai untuk menyusun algoritma komputer, tetapi juga rencana kerja, alur produksi pabrik, hingga prosedur evakuasi bencana.'}]},
 {h:'Simbol dan tips flowchart',ic:'🔷',b:[
  {k:'p',t:'ISO 5807 adalah standar internasional simbol flowchart agar diagram mudah dibaca dan konsisten.'},
  {k:'tabel',r:[['Simbol','Nama','Fungsi'],['⬭','Terminator','Elips: menandai awal (mulai) dan akhir (selesai)'],['▭','Proses','Persegi panjang: suatu tindakan atau proses'],['▱','Input/Output','Jajar genjang: masukan atau keluaran'],['◇','Decision','Belah ketupat: pengambilan keputusan (ya/tidak)'],['○','Connector','Lingkaran kecil: menyambungkan dua bagian yang berjauhan'],['→','Arrow','Panah: arah aliran dari satu langkah ke berikutnya']]},
  {k:'p',t:'<b>Tips membuat flowchart yang baik:</b>'},
  {k:'list',i:['<b>Ikuti standar simbol (ISO 5807):</b> oval untuk mulai/selesai, persegi panjang untuk proses, jajar genjang untuk input/output, belah ketupat untuk keputusan.','<b>Gunakan arah alur dari atas ke bawah</b> (atau kiri ke kanan) secara konsisten; hindari garis melengkung, menyilang, atau bercabang rumit.','<b>Satu langkah = satu aksi.</b> Jangan menggabungkan dua aksi dalam satu kotak; cukup tulis "Hitung luas", bukan rumus lengkapnya.','<b>Tulis teks singkat tetapi jelas.</b> "Input nilai" lebih baik daripada paragraf panjang. Jika terlalu kompleks, bagi menjadi dua flowchart.','<b>Cek ulang logika sebelum menggambar:</b> tidak ada langkah terlewat dan tidak ada alur buntu.']},
  {k:'tugas',h:'Percobaan: flowchart alur peminjaman buku di perpustakaan',t:'Siswa datang dan menyampaikan judul buku. Petugas memeriksa ketersediaan: jika tersedia, buku dicatat sebagai pinjaman dan diberikan; jika tidak, siswa diberi tahu bahwa buku sedang dipinjam orang lain. Gambarlah flowchart dengan simbol standar ISO 5807 menggunakan Microsoft Word (Insert → Shapes) atau Canva. Langkah panduan: mulai → input judul buku → proses periksa ketersediaan → keputusan (ya/tidak) → proses lanjutan → selesai.'},
  {k:'flow',f:'perpus',cap:'Contoh struktur flowchart peminjaman buku'},
  {k:'tugas',h:'Diskusikan',t:'<ol><li>Bagaimana jika sistem perlu diperluas untuk mencatat tanggal pengembalian?</li><li>Bagaimana struktur flowchart berubah jika lebih dari satu buku bisa dipinjam sekaligus?</li></ol>'}]},
 {h:'Tantangan logika',ic:'🧩',b:[
  {k:'tugas',h:'Puzzle Logika: sistem penilaian',t:'Nilai &lt; 50 = "Perlu Bimbingan", 50–74 = "Cukup", 75–89 = "Baik", ≥ 90 = "Sangat Baik". Tugasmu: (1) identifikasi input, proses, dan output; (2) buat pseudocode dengan percabangan bersarang; (3) tambahkan validasi: nilai &lt; 0 atau &gt; 100 menampilkan "Nilai tidak valid".'},
  {k:'tugas',h:'Algoritma ATM sederhana',t:'Menu: tampilkan saldo, tarik uang, setor uang, keluar. Syarat: gunakan pengulangan sampai pengguna memilih keluar, percabangan untuk tiap pilihan, validasi agar saldo tidak negatif, dan variabel <code>saldo</code> dengan nilai awal Rp1.000.000.'},
  {k:'tugas',h:'Tantangan Kode Mini: jadwal belajar',t:'Terima input nama hari dan tampilkan mata pelajaran utama hari itu. Jika Sabtu atau Minggu, tampilkan "Hari Libur". Tambahkan pengulangan agar siswa bisa memasukkan beberapa hari berturut-turut.'},
  {k:'tugas',h:'Aktivitas flowchart',t:'<ol><li>Rata-rata tiga nilai.</li><li>Boleh menonton film 17+ (usia ≥ 17)?</li><li>Kelipatan 3 dari 3 sampai 30 dengan pengulangan.</li><li>Nilai akhir dan predikat siswa berdasarkan skor ujian.</li></ol>'}]},
 {h:'Rangkuman',ic:'📝',b:[
  {k:'list',i:['<b>Berpikir komputasional</b> adalah cara berpikir sistematis untuk memecahkan masalah, dapat dipakai manusia maupun mesin. Prinsipnya: dekomposisi, pengenalan pola, abstraksi, dan algoritma.','<b>Dekomposisi:</b> memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah dipecahkan.','<b>Pengenalan pola:</b> mengenali kesamaan atau perulangan dalam masalah agar solusi dapat diulang atau diadaptasi.','<b>Abstraksi:</b> menyaring informasi penting dan mengabaikan hal yang tidak relevan agar fokus pada inti masalah.','<b>Algoritma:</b> langkah-langkah sistematis yang disusun berurutan untuk menyelesaikan suatu tugas atau masalah.','<b>Spreadsheet</b> dapat dipakai mengolah data dengan prinsip berpikir komputasional: menyaring data, menghitung nilai maksimum atau rata-rata, dan membuat keputusan berdasarkan data.','Fungsi umum spreadsheet: <code>SUM</code>, <code>AVERAGE</code>, <code>MAX</code>, <code>MIN</code>, dan <code>IF</code>, yang membantu mengotomatisasi pengolahan data.','<b>Pseudocode</b> adalah penulisan algoritma dengan bahasa yang menyerupai bahasa manusia. Ia tidak mengikuti aturan bahasa pemrograman tertentu, tetapi cukup jelas untuk diterjemahkan menjadi kode.','Struktur pseudocode: <b>urutan</b> (satu per satu), <b>percabangan</b> (jika…jika tidak), dan <b>pengulangan</b> (selama / ulangi).','<b>Variabel</b> menyimpan data sementara, seperti <code>nilai</code>, <code>jumlah</code>, atau <code>rata_rata</code>.','<b>Flowchart</b> adalah representasi grafis algoritma dengan simbol standar: terminator (oval), proses (persegi panjang), input/output (jajar genjang), dan keputusan (belah ketupat).','Flowchart membantu memahami alur proses secara visual dan dapat dipakai sebagai alat komunikasi sebelum implementasi kode.','Tips flowchart: susun alur dari atas ke bawah, gunakan simbol standar ISO 5807, hindari panah silang, dan pastikan logika mengalir dengan jelas.']},
  {k:'cek',q:'nilai1 = 85, nilai2 = 90, jumlah = nilai1 + nilai2, rata_rata = jumlah / 2. Berapa rata_rata?',o:['87','87,5','175'],a:1,e:'jumlah = 175, rata_rata = 175 / 2 = 87,5.'}]}]}
];
// ---------- Simulasi: susun balok logika ----------
// g = kelompok urutan (baris dengan g sama boleh bertukar tempat); i = indentasi
window.SIMS=[
{id:'s1',bab:1,t:'Susu Hangat',ico:'🥛',misi:'Misi 1.1',xp:100,d:'Susun langkah menyiapkan segelas susu hangat dengan urutan yang benar.',
 L:[['Mulai',0],['Panaskan air',1],['Tuang susu bubuk ke dalam gelas',1],['Tuang air panas ke dalam gelas',1],['Aduk hingga merata',1],['Selesai',0]],X:['Buang gelas ke tempat sampah'],
 tests:[{l:'Jalankan algoritma',o:'Susu hangat siap diminum 🥛'}]},
{id:'s2',bab:2,t:'Robot Pemilah Sampah',ico:'♻️',misi:'Misi 2.1',xp:150,d:'Arahkan sampah ke tempat yang tepat: organik, anorganik, atau B3.',
 L:[['Mulai',0],['Tanyakan jenis sampah',1],['Jika sampah = "organik"',1],['Tampilkan "Buang ke tempat sampah hijau."',2],['Jika sampah = "anorganik"',1],['Tampilkan "Buang ke tempat sampah kuning."',2],['Jika sampah = "B3"',1],['Tampilkan "Buang ke tempat sampah merah."',2],['Jika tidak dikenali',1],['Tampilkan "Jenis sampah tidak dikenali. Silakan coba lagi."',2],['Selesai',0]],X:['Hapus semua sampah'],
 tests:[{l:'organik',o:'🟢 Buang ke tempat sampah hijau.'},{l:'anorganik',o:'🟡 Buang ke tempat sampah kuning.'},{l:'B3',o:'🔴 Buang ke tempat sampah merah.'},{l:'kardus',o:'❓ Jenis sampah tidak dikenali. Silakan coba lagi.'}]},
{id:'s3',bab:3,t:'Hitung Mundur',ico:'⏱️',misi:'Misi 3.1',xp:150,d:'Susun pengulangan yang menghitung mundur dari 5 ke 1.',
 L:[['Mulai',0],['Set angka = 5',1],['Selama angka ≥ 1',1],['Tampilkan angka',2],['Kurangi angka sebanyak 1',2],['Selesai',0]],X:['Tambah angka dengan 1'],
 tests:[{l:'Jalankan algoritma',o:'5 → 4 → 3 → 2 → 1 🚀'}]},
{id:'s4',bab:4,t:'Rata-rata Tiga Nilai',ico:'🧮',misi:'Misi 4.1',xp:150,d:'Gunakan variabel untuk menghitung rata-rata nilai matematika, bahasa, dan IPA. Ketiga baris Masukkan boleh bertukar tempat.',
 L:[['Mulai',0,0],['Masukkan nilai_matematika',1,1],['Masukkan nilai_bahasa',1,1],['Masukkan nilai_ipa',1,1],['Jumlah = nilai_matematika + nilai_bahasa + nilai_ipa',1,2],['Rata_rata = Jumlah / 3',1,3],['Tampilkan Rata_rata',1,4],['Selesai',0,5]],X:['Jumlah = Jumlah / 0'],
 tests:[{l:'80 · 70 · 90',o:'Jumlah = 240 → Rata_rata = 80'},{l:'60 · 75 · 90',o:'Jumlah = 225 → Rata_rata = 75'}]},
{id:'s5',bab:4,bonus:1,t:'Algoritma ATM',ico:'🏧',misi:'Tantangan Bonus',xp:200,d:'Gabungkan variabel, pengulangan, dan percabangan dengan validasi saldo tidak negatif.',
 L:[['Mulai',0],['saldo = 1000000',1],['pilihan = 0',1],['Selama pilihan ≠ 4',1],['Masukkan pilihan',2],['Jika pilihan = 1',2],['Tampilkan saldo',3],['Jika pilihan = 2',2],['Masukkan jumlah',3],['Jika jumlah ≤ saldo',3],['saldo = saldo - jumlah',4],['Jika tidak',3],['Tampilkan "Saldo tidak cukup"',4],['Jika pilihan = 3',2],['Masukkan jumlah',3],['saldo = saldo + jumlah',3],['Selesai',0]],X:['saldo = 0'],
 tests:[{l:'Tarik 300.000',o:'Saldo: Rp700.000'},{l:'Tarik 2.000.000',o:'Saldo tidak cukup (saldo tetap Rp1.000.000)'},{l:'Setor 500.000',o:'Saldo: Rp1.500.000'}]}
];
