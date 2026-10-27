/* ============================================================
   HIGHLIGHTER SEDERHANA
   ============================================================
   Fungsinya: cari pola tertentu (komentar, string, kata kunci,
   angka) di dalam setiap <pre>, lalu bungkus dengan <span>
   yang punya class warna.

   Kenapa tidak pakai library seperti Prism/highlight.js?
   Supaya file ini tetap jalan tanpa internet. Prinsipnya sama
   saja, hanya jauh lebih sederhana.
*/

// ------------------------------------------------------------
// 1. Daftar pola yang dicari.
//    Urutan alternatif PENTING: komentar harus dicek sebelum
//    string/kata kunci, supaya teks di dalam komentar tidak
//    ikut diwarnai.
//    Tiap ( ) = satu grup tangkapan = satu jenis token.
// ------------------------------------------------------------
const POLA = new RegExp(
    [
        /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/.source,                          // 1. komentar
        /(`(?:\\[\s\S]|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*')/.source, // 2. string
        /\b(let|const|var|function|return|if|else|for|while|new|typeof|try|catch|throw|class|of|in|delete)\b/.source, // 3. kata kunci
        /\b(true|false|null|undefined)\b/.source,                        // 4. nilai literal
        /\b(\d+(?:\.\d+)?)\b/.source,                                    // 5. angka
        /([{}()[\];,=+\-*\/<>!?.]+)/.source                              // 6. simbol
    ].join("|"),
    "g"
);

// nama class CSS untuk tiap grup, sesuai urutan di atas
const CLASS_TOKEN = ["c-komentar", "c-string", "c-kunci", "c-literal", "c-angka", "c-simbol"];

// ubah karakter yang bentrok dengan HTML jadi aman
function amankan(teks) {
    return teks
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// ------------------------------------------------------------
// 2. Proses satu blok kode jadi HTML berwarna
// ------------------------------------------------------------
function warnai(kode) {
    let hasil = "";
    let posisiAkhir = 0;

    // exec() berjalan maju terus di sepanjang string,
    // jadi tiap potongan hanya diperiksa sekali.
    POLA.lastIndex = 0;
    let cocok;

    while ((cocok = POLA.exec(kode)) !== null) {
        // potongan sebelum pola ini: teks biasa, biarkan apa adanya
        hasil += amankan(kode.slice(posisiAkhir, cocok.index));

        // cari grup mana yang kena, lalu pilih class-nya
        let kelas = "c-biasa";
        for (let i = 1; i < cocok.length; i++) {
            if (cocok[i] !== undefined) {
                kelas = CLASS_TOKEN[i - 1];
                break;
            }
        }

        hasil += `<span class="${kelas}">${amankan(cocok[0])}</span>`;
        posisiAkhir = cocok.index + cocok[0].length;
    }

    // sisa teks setelah pola terakhir
    hasil += amankan(kode.slice(posisiAkhir));
    return hasil;
}

// ------------------------------------------------------------
// 3. Jalankan ke semua <pre> di halaman
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach((blok) => {
        blok.innerHTML = warnai(blok.textContent);
    });
});
