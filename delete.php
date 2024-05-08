<?php
include 'connection.php';

$id = $_POST['id'];

$sql = "DELETE FROM pois WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Data berhasil dihapus";
} else {
    echo "Gagal menghapus data";
}

$stmt->close();
$conn->close();
?>