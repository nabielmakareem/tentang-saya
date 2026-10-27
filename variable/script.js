/* ============================================================
   BELAJAR VARIABEL JAVASCRIPT
   ============================================================
   Variabel itu "wadah" untuk menyimpan nilai supaya bisa dipakai
   berulang kali. Cara bikinnya: tulis kata kunci, nama, lalu nilai.
*/

// helper kecil supaya hasilnya tampil di halaman DAN di console.
// Kamu tidak perlu paham ini dulu, fokus ke bagian bawahnya.
function tampil(id, ...baris) {
    const el = document.getElementById(id);
    if (el) el.textContent += baris.join("\n") + "\n";
    baris.forEach(b => console.log(b));
}


/* ------------------------------------------------------------
   1. CARA DEKLARASI
   ------------------------------------------------------------ */

let umur = 20;        // let   -> nilainya bisa diubah nanti
const nama = "Budi";  // const -> nilainya TIDAK bisa diubah
var kota = "Jakarta"; // var   -> cara lama, sebaiknya tidak dipakai

tampil("out-1",
    "umur  = " + umur,
    "nama  = " + nama,
    "kota  = " + kota
);


/* ------------------------------------------------------------
   2. MENGUBAH NILAI (REASSIGN)
   ------------------------------------------------------------ */

let skor = 10;
tampil("out-2", "skor awal      : " + skor);

skor = 25;                    // tinggal tulis nama = nilai baru
tampil("out-2", "setelah skor=25: " + skor);

skor = skor + 5;              // pakai nilai lama untuk hitung nilai baru
tampil("out-2", "setelah +5     : " + skor);

skor += 10;                   // singkatan dari skor = skor + 10
tampil("out-2", "setelah +=10   : " + skor);


/* ------------------------------------------------------------
   3. CONST TIDAK BISA DIUBAH
   ------------------------------------------------------------ */

const PI = 3.14;
tampil("out-3", "PI = " + PI);

// Baris di bawah ini sengaja dibungkus try/catch supaya program
// tidak berhenti, tapi kamu tetap lihat errornya.
try {
    PI = 5;   // ini akan gagal
} catch (error) {
    tampil("out-3", "Gagal ubah PI -> " + error.message);
}

// Catatan penting: const tidak bisa di-REASSIGN, tapi kalau isinya
// objek/array, ISI-nya masih bisa diubah:
const daftar = ["apel", "jeruk"];
daftar.push("mangga");   // ini BOLEH
tampil("out-3", "daftar  = " + daftar.join(", "));
// daftar = ["lain"];    // ini TIDAK boleh (reassign)


/* ------------------------------------------------------------
   4. TIPE DATA DASAR
   ------------------------------------------------------------ */

let teks = "halo";        // string  (teks, pakai kutip)
let angka = 42;            // number  (angka bulat)
let desimal = 3.14;        // number  juga (JS tidak bedakan int/float)
let benar = true;          // boolean (true / false)
let kosong = null;         // null    (sengaja dikosongkan)
let belum;                 // undefined (dideklarasi tapi belum diisi)

tampil("out-4",
    "teks     = " + teks,
    "angka    = " + angka,
    "desimal  = " + desimal,
    "benar    = " + benar,
    "kosong   = " + kosong,
    "belum    = " + belum
);


/* ------------------------------------------------------------
   5. TYPEOF — CEK TIPE DATA
   ------------------------------------------------------------ */

tampil("out-5",
    "typeof teks    -> " + typeof teks,
    "typeof angka   -> " + typeof angka,
    "typeof benar   -> " + typeof benar,
    "typeof belum   -> " + typeof belum,
    "typeof kosong  -> " + typeof kosong,   // "object" (quirk JS, memang begitu)
    "typeof daftar  -> " + typeof daftar
);


/* ------------------------------------------------------------
   6. TEMPLATE LITERAL — GABUNG TEKS + VARIABEL
   ------------------------------------------------------------ */

let namaSaya = "Budi";
let umurSaya = 20;

// cara lama, pakai tanda +
tampil("out-6", "Cara lama: Halo " + namaSaya + ", umur kamu " + umurSaya + " tahun");

// cara modern, pakai backtick ` dan ${ }
tampil("out-6", `Cara baru: Halo ${namaSaya}, umur kamu ${umurSaya} tahun`);

// bisa juga langsung hitung di dalam ${ }
tampil("out-6", `Tahun depan umur kamu ${umurSaya + 1} tahun`);


/* ------------------------------------------------------------
   7. SCOPE — DI MANA VARIABEL BISA DIAKSES
   ------------------------------------------------------------ */

let luar = "aku bisa diakses di mana saja";

if (true) {
    let dalam = "aku cuma hidup di dalam blok if ini";
    tampil("out-7",
        "di dalam blok -> luar  : " + luar,     // OK
        "di dalam blok -> dalam : " + dalam     // OK
    );
}

tampil("out-7", "di luar blok  -> luar  : " + luar);  // OK

// console.log(dalam);  // ERROR: dalam is not defined
//
// Variabel yang dibuat di dalam { } hanya hidup di dalam { } itu.
// Ini berlaku untuk let dan const.
// (var berbeda — dia "bocor" keluar blok, salah satu alasannya dihindari.)
try {
    console.log(dalam);
} catch (error) {
    tampil("out-7", "di luar blok  -> dalam : ERROR (" + error.message + ")");
}


/* ------------------------------------------------------------
   8. ATURAN PENAMAAN
   ------------------------------------------------------------
   BOLEH:
     - huruf, angka, _ , $
     - diawali huruf, _ atau $ (bukan angka)
     - camelCase untuk variabel biasa: namaLengkap, totalHarga
     - huruf besar semua untuk konstanta: PI, MAX_SIZE

   TIDAK BOLEH:
     - diawali angka          : 2umur
     - ada spasi              : nama lengkap
     - pakai kata kunci       : class, let, const, function, ...
------------------------------------------------------------ */

let namaLengkap = "Budi Santoso";
let _private = "boleh";
let $harga = 100;

tampil("out-8",
    "namaLengkap = " + namaLengkap,
    "_private    = " + _private,
    "$harga      = " + $harga,
    "",
    "Contoh error: 'let 2umur = 20;' -> SyntaxError (tidak boleh diawali angka)"
);


/* ------------------------------------------------------------
   9. ARRAY — DAFTAR NILAI BERURUTAN
   ------------------------------------------------------------
   Array itu seperti barisan kotak bernomor. Nomornya (index)
   selalu mulai dari 0, bukan 1.
------------------------------------------------------------ */

const buah = ["apel", "jeruk", "mangga"];

tampil("out-9",
    "isi array    : " + buah.join(", "),
    "buah[0]      : " + buah[0],        // index pertama = 0
    "buah[2]      : " + buah[2],        // index terakhir di sini
    "buah.length  : " + buah.length,    // jumlah isi
    "buah[9]      : " + buah[9],        // di luar jangkauan -> undefined
    ""
);

// --- tambah / hapus di AKHIR ---
buah.push("pisang");        // tambah di belakang
tampil("out-9", "push('pisang')    : " + buah.join(", "));

buah.pop();                 // buang yang paling belakang
tampil("out-9", "pop()             : " + buah.join(", "), "");

// --- tambah / hapus di DEPAN ---
buah.unshift("anggur");     // tambah di depan
tampil("out-9", "unshift('anggur') : " + buah.join(", "));

buah.shift();               // buang yang paling depan
tampil("out-9", "shift()           : " + buah.join(", "), "");

// --- mencari ---
tampil("out-9",
    "includes('jeruk') : " + buah.includes("jeruk"),   // true
    "includes('durian'): " + buah.includes("durian"),  // false
    "indexOf('mangga') : " + buah.indexOf("mangga"),   // 2
    "indexOf('durian') : " + buah.indexOf("durian"),   // -1 = tidak ada
    "",
    "join(' | ')       : " + buah.join(" | ")
);

// --- const + array: isi boleh diubah, array-nya tidak boleh diganti ---
buah.push("melon");       // BOLEH
// buah = ["lain"];       // TIDAK boleh (reassign)


/* ------------------------------------------------------------
   10. OBJECT — DATA BERPASANGAN KUNCI: NILAI
   ------------------------------------------------------------
   Bedanya dengan array:
     array  -> diakses pakai NOMOR  : buah[0]
     object -> diakses pakai NAMA   : user.nama
   Object dipakai kalau tiap nilai punya "label" yang jelas.
------------------------------------------------------------ */

const user = {
    nama: "Budi",       // sebelum titik dua = key, sesudahnya = value
    umur: 20,
    kota: "Jakarta"
};

// --- akses nilai ---
tampil("out-10",
    "user.nama       : " + user.nama,       // cara dot, paling sering dipakai
    "user['umur']    : " + user["umur"],    // cara bracket, untuk key dinamis
    ""
);

// --- ubah nilai yang sudah ada ---
user.umur = 21;
tampil("out-10", "setelah user.umur = 21 : " + user.umur);

// --- tambah properti baru ---
user.email = "budi@mail.com";
tampil("out-10", "tambah email          : " + user.email);

// --- hapus properti ---
delete user.kota;
tampil("out-10", "setelah delete kota   : user.kota = " + user.kota, "");

// --- lihat seluruh isinya ---
tampil("out-10",
    "Object.keys(user)   : " + Object.keys(user).join(", "),
    "Object.values(user) : " + Object.values(user).join(", ")
);

// --- object bisa berisi apa saja, termasuk array & object lain ---
const sekolah = {
    nama: "SMA Negeri 1",
    alamat: { jalan: "Jl. Merdeka 10", kota: "Jakarta" },  // object di dalam object
    jurusan: ["IPA", "IPS", "Bahasa"]                       // array di dalam object
};

tampil("out-10",
    "",
    "sekolah.alamat.kota    : " + sekolah.alamat.kota,       // masuk 2 tingkat
    "sekolah.jurusan[1]     : " + sekolah.jurusan[1]
);


/* ------------------------------------------------------------
   11. ARRAY OF OBJECT — KOMBINASI KEDUANYA
   ------------------------------------------------------------
   Bentuk data paling umum di dunia nyata. Hasil dari API
   (server) hampir selalu berupa array berisi object.
------------------------------------------------------------ */

const pengguna = [
    { nama: "Budi", umur: 20 },
    { nama: "Ani",  umur: 22 },
    { nama: "Cici", umur: 19 }
];

// akses: index dulu, baru key
tampil("out-11",
    "pengguna[0].nama : " + pengguna[0].nama,
    "pengguna[1].umur : " + pengguna[1].umur,
    ""
);

// --- loop biasa pakai forEach (lakukan sesuatu untuk tiap item) ---
tampil("out-11", "--- daftar pengguna ---");
pengguna.forEach((p) => {
    tampil("out-11", p.nama + " (" + p.umur + " tahun)");
});

// --- map: ubah tiap item jadi bentuk baru -> hasilnya array baru ---
const semuaNama = pengguna.map((p) => p.nama);
tampil("out-11", "", "map -> nama saja     : " + semuaNama.join(", "));

// --- filter: ambil item yang memenuhi syarat -> array baru ---
const dewasa = pengguna.filter((p) => p.umur >= 20);
tampil("out-11", "filter umur >= 20    : " + dewasa.map((p) => p.nama).join(", "));

// --- find: ambil SATU item pertama yang cocok ---
const cariAni = pengguna.find((p) => p.nama === "Ani");
tampil("out-11", "find nama 'Ani'      : " + cariAni.nama + ", " + cariAni.umur + " tahun");

// --- catatan: map & filter TIDAK mengubah array aslinya ---
tampil("out-11", "", "array asli tetap utuh : " + pengguna.length + " item");


/* ------------------------------------------------------------
   12. KESIMPULAN PRAKTIS
   ------------------------------------------------------------
   - Default pakai const. Ganti ke let hanya kalau nilainya
     memang harus berubah.
   - Jangan pakai var di kode baru.
   - Nama variabel harus jelas: "totalHarga" lebih baik dari "th".
   - Scope let/const terbatas pada blok { } tempat dia dibuat.
------------------------------------------------------------ */

console.log("%c--- Selesai! Buka tab Elements/Console di DevTools untuk eksplor ---",
    "color: green; font-weight: bold");
