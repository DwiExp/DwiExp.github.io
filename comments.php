<?php
$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * FROM comments ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div><strong>" . htmlspecialchars($row['name']) . "</strong><br>";
        echo "<p>" . htmlspecialchars($row['comment']) . "</p>";
        echo "<small>" . $row['created_at'] . "</small></div><hr>";
    }
} else {
    echo "Tidak ada komentar.";
}

$conn->close();
?>
