<?php
include "connection.php";

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$name = $_POST['name'];
$description = $_POST['description'];
$country = $_POST['country'];
$city = $_POST['city'];
$postal_code = $_POST['postal_code'];

$sql = "INSERT INTO pois (latitude, longitude, name, description, country, city, postal_code) 
        VALUES ('$latitude', '$longitude', '$name', '$description', '$country', '$city', '$postal_code')";

if ($conn->query($sql) === TRUE) {
    echo "<h1>New record created successfully </h1>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
