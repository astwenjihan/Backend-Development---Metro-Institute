const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server Pertemuan 4 Aktif');
});

// soal 1
// a)
app.get('/kali/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({pesan: 'Parameter a dan b harus berupa angka'});
    }

    const hasil = a * b;
    res.json({a, b, hasil});
});

//b)
app.get('/sapa', (req, res) => {
    const nama = req.query.nama || "Tamu";
    res.json({pesan: `Halo, ${nama}!` });
});

// c)
app.post('/hitung-rata', (req, res) => {
    const {nilai} = req.body || {};

    if (!Array.isArray(nilai) || nilai.length === 0) {
        return res.status(400).json({pesan: 'Nilai wajib berupa array dan tidak boleh kosong'});
    }

    const total = nilai.reduce((acc, curr) => acc + curr, 0);
    const rata = total / nilai.length;

    res.json({rata})
});

// soal 2
let daftarBuku = [
  { judul: 'Laskar Pelangi', harga: 85000, stock: 5, kategori: 'Novel' },
  { judul: 'Filosofi Teras', harga: 98000, stock: 0, kategori: 'Self-Help' },
  { judul: 'Atomic Habits', harga: 120000, stock: 3, kategori: 'Self-Help' },
  { judul: 'Bumi Manusia', harga: 105000, stock: 2, kategori: 'Novel' }
];

let idBukuBerikutnya = 5;

// b)
app.get('/buku', (req, res) => {
    let hasil = daftarBuku;
    const{kategori, tersedia} = req.query;

    if (kategori) {
        hasil = hasil.filter(b => b.kategori.toLowerCase() === kategori.toLocaleLowerCase());
    }
    if (tersedia === 'true') {
        hasil = hasil.filter(b => b.stock > 0);
    }
    res.json(hasil);
})

// h) (h dulu, karna dijalakan sesuai rute di mana GET /buku/:id dulu baru seterusnya)
app.get('/statistik', (req, res) => {
    const jumlahJudul = daftarBuku.length;
    const jumlahHarga = daftarBuku.reduce ((total, b) => total + b.harga, 0);
    const jumlahTersedia = daftarBuku.filter(b => b.stock > 0).length;

    res.json({jumlahJudul, jumlahHarga, jumlahTersedia});
});

// c)
app.get('/buku/:id', (req, res) => {
    const id = Number(req.params.id);
    const buku = daftarBuku.find(b => b.id === id);

    if (!buku) {
        return res.status(404).json({pesan:'Buku tidak ditemukan.' });
    }

    res.json(buku);
});

// d)
app.post('/buku', (req, res) => {
    const {judul, harga, stock, kategori} = req.body || {};

    if (
        typeof judul !== 'string' || judul.trim() === '' ||
        typeof harga !== 'number' || harga <= 0 ||
        typeof stock !== 'number' || stock < 0 ||
        typeof kategori !== 'string' || kategori.trim() === ''
    ) {
        return res.status(400).json({
            pesan: 'Validasi gagal; judul & kategori wajib berupa teks, harga >= 0, stock > 0'
        });
    }

    const bukuBaru = {
        id: idBukuBerikutnya++,
        judul: judul.trim(),
        harga,
        stock,
        kategori: kategori.trim()
    };

    daftarBuku.push(bukuBaru);
    res.status(201).json(bukuBaru);
});

// e)
app.put('/buku:id', (req, res) => {
    const id = Number(req.params.id);
    const buku = daftarBuku.find(b => b.id === id);

    if (!buku) {
        return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
    }

    const { judul, harga, stock, kategori } = req.body || {};

    if (harga !== undefined && (typeof harga !== 'number' || harga <= 0)) {
        return res.status(400).json({ pesan: 'Harga harus berupa angka lebih dari 0' });
    }
    if (stock !== undefined && (typeof stock !== 'number' || stok < 0)) {
        return res.status(400).json({ pesan: 'Stock harus berupa angka 0 atau lebih' });
    }

    if (judul !== undefined) buku.judul = judul;
    if (harga !== undefined) buku.harga = harga;
    if (stock !== undefined) buku.stock = stock;
    if (kategori !== undefined) buku.kategori = kategori;

    res.json(buku);
});

// f) 
app.delete('/buku/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = daftarBuku.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
    }

    const bukuDihapus = daftarBuku.splice(index, 1)[0];
    res.json({ pesan: 'Berhasil dihapus', data: bukuDihapus });
});

// g)
app.post('/buku/:id/beli', (req, res) => {
    const id = Number(req, params.id);
    const buku = daftarBuku.find(b => b.id == id);

    if (!buku) {
        return res.status(400).json({pesan: 'Buku tidak ditemukan' });
    }

    if (buku.stock <= 0) {
        return res.status(400).json({pesan: 'Gagal: Buku tidak tersedia/stock habis!' });
    }

    buku.stock -= 1;
    res.json({
        pesan: `Pembayaran berhasil: ${buku, judul}`,
        sisaStock: buku.stock
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});