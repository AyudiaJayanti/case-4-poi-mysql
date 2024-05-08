<?php
include 'connection.php';

$result = $conn->query("SELECT * FROM pois");
$pois = array();
while ($row = $result->fetch_assoc()) {
    $pois[] = $row;
}

echo json_encode($pois);

$conn->close();
?>