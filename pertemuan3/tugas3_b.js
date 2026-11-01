// --- Data Produk (Soal 6) ---
const produk = [
  { nama: 'Pensil', harga: 2000, stok: 10 },
  { nama: 'Buku', harga: 8000, stok: 0 },
  { nama: 'Penghapus', harga: 1500, stok: 5 },
];

// bagian a
console.log('=== Soal 6a ===');
const produkTersedia = produk.filter(p => p.stok > 0).map(p => p.nama);
console.log(produkTersedia);

// bagian b
console.log('=== Soal 6b ===');
const cariPenghapus = produk.find(p => p.nama === 'Penghapus');
console.log(cariPenghapus);

// bagian c
console.log('=== Soal 6c ===');
produk.forEach(p => {
    console.log(`${p.nama} - Rp${p.harga}`);
});

// --- Soal 7: Asynchronous ---
// bagian a
const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// bagian b
async function urutanProses() {
    console.log('Mulai');
    await tunggu(1000);
    console.log('Langkah 1');
    await tunggu(1000);
    console.log('Selesai');
}
urutanProses();

// bagian c
const cekStock = (jumlah) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (jumlah > 0) resolve(`Stock Tersedia: ${jumlah}`);
        else reject('Stock Habis');
    }, 500);
});

async function ujiCekStock() {
    try {
        console.log(await cekStock(5));
        console.log(await cekStock(0));
    } catch (e) {
        console.log('Error:', e);
    }
}
ujiCekStock()

// --- Soal 8: Studi Kasus Toko Buku ---
const daftarBuku = [
  { judul: 'Laskar Pelangi', harga: 85000, stock: 5, kategori: 'Novel' },
  { judul: 'Filosofi Teras', harga: 98000, stock: 0, kategori: 'Self-Help' },
  { judul: 'Atomic Habits', harga: 120000, stock: 3, kategori: 'Self-Help' },
  { judul: 'Bumi Manusia', harga: 105000, stock: 2, kategori: 'Novel' }
];

// bagian a
const bukuTersedia = daftarBuku.filter(b => b.stock > 0).map(b => b.judul);
console.log('8a. Buku dengan stock tersedia:', bukuTersedia);

// bagian b
const totalHargaBuku = daftarBuku.reduce((total, b) => total + b.harga, 0);
console.log('8b. Total harga keseluruhan buku; Rp' + totalHargaBuku);

// bagian c
console.log('8c. Daftar Buku:');
daftarBuku.forEach(b => {
    console.log(`${b.judul} - Rp${b.harga} (Stock: ${b.stock})`);
});

// bagian d dan e
const prosesPembayaran = (judulBuku) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const buku = daftarBuku.find(b => b.judul.toLowerCase() === judulBuku.toLowerCase());
            if (buku && buku.stock > 0) {
                resolve(`Pembayaran berhasil untuk buku; ${buku.judul}`);
            } else {
                reject('Gagal: Buku tidak tersedia atau stok habis!');
            }
        }, 1500);
    });
};

// bagian f
async function transaksiToko() {
    try {
        console.log('Memproses; Atomic Habits...');
        const hasil1 = await prosesPembayaran('Atomic Habits');
        console.log(hasil1);

        console.log('Memproses: Filosofi Teras...');
        const hasil2 = await prosesPembayaran('Filosofi Teras');
        console.log(hasil2);
    } catch (err) {
        console.log(err);
    }
}

transaksiToko();