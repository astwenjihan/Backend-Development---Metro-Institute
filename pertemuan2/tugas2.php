<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "akademik1";

$koneksi = mysqli_connect($host, $user, $password, $db);
if (!$koneksi) {
    die("Tidak bisa terkoneksi ke database.");
}

$nim = "";
$nama = "";
$fakultas = "";
$jurusan = "";
$sukses = "";
$error = "";
$op = "";
$id = "";

if (isset($_GET['op'])) {
    $op = $_GET['op'];
} else {
    $op = "";
}

if ($op == 'delete') {
    $id = $_GET['id'];
    $sql1 = "DELETE FROM mahasiswa WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    if ($q1) {
        $sukses = "Data berhasil dihapus.";
    } else {
        $error = "Data gagal dihapus.";
    }
}

if ($op == 'edit') {
    $id = $_GET['id'];
    $sql1 = "SELECT * FROM mahasiswa WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    $r1 = mysqli_fetch_array($q1);
    $nim = $r1['nim'];
    $nama = $r1['nama'];
    $fakultas = $r1['fakultas'];
    $jurusan = $r1['jurusan'];

    if ($nim == '') {
        $error = "Data tidak ditemukan";
    }
}

if (isset($_POST['simpan'])) {
    $nim = $_POST['nim'];
    $nama = $_POST['nama'];
    $fakultas = $_POST['fakultas'];
    $jurusan = $_POST['jurusan'];
    $op = $_POST['op'];
    $id = $_POST['id'];

    if ($nim && $nama && $fakultas && $jurusan) {
        if ($op == 'edit') {
            $sql1 = "UPDATE mahasiswa SET nim = '$nim', nama = '$nama', fakultas = '$fakultas', jurusan = '$jurusan' WHERE id = '$id'";
            $q1 = mysqli_query($koneksi, $sql1);
            if ($q1) {
                $sukses = "Data berhasil diubah.";
            } else {
                $error = "Data gagal diubah.";
            }
        } else {
            $sql1 = "INSERT INTO mahasiswa (nim, nama, fakultas, jurusan) VALUES ('$nim', '$nama', '$fakultas', '$jurusan')";
            $q1 = mysqli_query($koneksi, $sql1);
            if ($q1) {
                $sukses = "Berhasil memasukkan data!";
                // Reset form setelah simpan
                $nim = ""; $nama = ""; $fakultas = ""; $jurusan = "";
            } else {
                $error = "Gagal memasukkan data!";
            }
        }
    } else {
        $error = "Silakan isi semua data!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Mahasiswa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .mx-auto { width: 800px; }
        .card { margin-top: 10px; }
    </style>
</head>
<body>
<div class="mx-auto">
    <div class="card">
        <div class="card-header">Create / Edit Data</div>
        <div class="card-body">
            <?php if ($error) { ?>
                <div class="alert alert-danger" role="alert"><?php echo $error; ?></div>
            <?php } ?>
            <?php if ($sukses) { ?>
                <div class="alert alert-success" role="alert"><?php echo $sukses; ?></div>
            <?php } ?>
            <form action="" method="POST">
                <input type="hidden" name="op" value="<?php echo $op; ?>">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                
                <div class="mb-3 row">
                    <label for="nim" class="col-sm-2 col-form-label">NIM</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nim" name="nim" value="<?php echo $nim; ?>">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="nama" class="col-sm-2 col-form-label">Nama</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nama" name="nama" value="<?php echo $nama; ?>">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="fakultas" class="col-sm-2 col-form-label">Fakultas</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="fakultas" name="fakultas" value="<?php echo $fakultas; ?>">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="jurusan" class="col-sm-2 col-form-label">Jurusan</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="jurusan" name="jurusan" value="<?php echo $jurusan; ?>">
                    </div>
                </div>
                <div class="col-12">
                    <input type="submit" name="simpan" value="Simpan Data" class="btn btn-primary">
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header text-white bg-secondary">Data Mahasiswa</div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">NIM</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Fakultas</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql2 = "SELECT * FROM mahasiswa ORDER BY id DESC";
                    $q2 = mysqli_query($koneksi, $sql2);
                    $urut = 1;
                    while ($r2 = mysqli_fetch_array($q2)) {
                        $id = $r2['id'];
                        $nim = $r2['nim'];
                        $nama = $r2['nama'];
                        $fakultas = $r2['fakultas'];
                        $jurusan = $r2['jurusan'];
                    ?>
                        <tr>
                            <th scope="row"><?php echo $urut++; ?></th>
                            <td><?php echo $nim; ?></td>
                            <td><?php echo $nama; ?></td>
                            <td><?php echo $fakultas; ?></td>
                            <td><?php echo $jurusan; ?></td>
                            <td>
                                <a class="btn btn-warning btn-sm" href="tugas2.php?op=edit&amp;id=<?php echo urlencode((string) $id); ?>">Edit</a>
                                <a class="btn btn-danger btn-sm" href="tugas2.php?op=delete&amp;id=<?php echo urlencode((string) $id); ?>" onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')">Delete</a>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>