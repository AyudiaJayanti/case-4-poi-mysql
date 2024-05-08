<?php
// Include connection file
include 'connection.php';

// Mendapatkan POST data
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$country = $_POST['country'];
$city = $_POST['city'];
$postal_code = $_POST['postcode'];

// Update POI data in the database
$query = "UPDATE pois SET latitude='$latitude', longitude = '$longitude', name='$name', description='$description', country='$country', city='$city', postal_code='$postal_code' WHERE id='$id'";
if ($conn->query($query) === TRUE) {
    echo "POI data updated successfully";
} else {
    echo "Error updating POI data: " . $conn->error;
}

// Close connection
$conn->close();
?>
