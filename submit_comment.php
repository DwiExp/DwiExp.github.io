<?php
$servername = "localhost";
$username = "root"; // ganti dengan username MySQL
$password = "Bpayp212$"; // ganti dengan password MySQL
$dbname = "blog";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari formulir
$name = $conn->real_escape_string($_POST['name']);
$email = $conn->real_escape_string($_POST['email']);
$comment = $conn->real_escape_string($_POST['comment']);

// Masukkan komentar ke database
$sql = "INSERT INTO comments (name, email, comment) VALUES ('$name', '$email', '$comment')";

if ($conn->query($sql) === TRUE) {
    echo "Komentar berhasil dikirim!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
