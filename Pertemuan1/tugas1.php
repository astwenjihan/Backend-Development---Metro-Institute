<?php
$daftar_mahasiswa = [
    ["nama" => "Andi", "nilai" => 85],
    ["nama" => "Budi", "nilai" => 90],
    ["nama" => "Citra", "nilai" => 78],
    ["nama" => "Dewi", "nilai" => 92],
    ["nama" => "Eko", "nilai" => 88],
];

$harga_barang = [
    ["nama" => "Kaos", "harga" => 50000],
    ["nama" => "Kemeja", "harga" => 100000],
    ["nama" => "Sepatu", "harga" => 100000],
    ["nama" => "Celana", "harga" => 60000],
    ["nama" => "Jaket", "harga" => 60000],
];

echo "=== PROGRAM GRADING NILAI & DISKON BELANJA ===\n";

foreach ($daftar_mahasiswa as $index => $mhs) {
    $nama = $mhs["nama"];
    $nilai = $mhs["nilai"];

    $nama_barang = $harga_barang[$index]["nama"];
    $harga = $harga_barang[$index]["harga"];

    if ($nilai >= 85){
        $grade = "A";
        $diskon = 0.30; // 30% discount
    } else if ($nilai >= 70){
        $grade = "B";
        $diskon = 0.20; // 20% discount
    } else if ($nilai >= 60){
        $grade = "C";
        $diskon = 0.10; // 10% discount
    } else {
        $grade = "D";
        $diskon = 0.00; // No discount
    }

    $potongan = $harga * $diskon;
    $total_harga = $harga - $potongan;

    echo "Nama Mahasiswa: $nama\n";
    echo "Nilai: $nilai\n";
    echo "Grade: $grade\n";
    echo "Harga Barang: $harga\n";
    echo "Diskon: $diskon\n";
    echo "Potongan: $potongan\n";
    echo "Total Harga: $total_harga\n";
    echo "-------------------------\n";
}

?>