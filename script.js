var map = L.map('map').setView([51.505, -0.09], 13);

var marker = "";
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng, {draggable: true}).addTo(map);
    
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    createAddPopup(marker);
    marker.on('dragend', function(event) {
        var latlng = event.target.getLatLng();
        setToForm(latlng.lat, latlng.lng)
    });
    setToForm(lat, lng);
});


function createAddPopup(marker) {
    var latlng = marker.getLatLng();

    var popupContent = `
        <div style="700px">
            <h3>Masukkan Data</h3>
            <input type="text" class="form-control" id="id" placeholder="" name="" hidden >
            <div class="mb-3 mt-3">
            <label for="email" class="form-label">Nama</label>
            <input type="text" class="form-control" id="name-add" placeholder="Nama">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Negara</label>
                <input type="text" class="form-control" id="country-add" placeholder="Negara" name="email">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Kota</label>
                <input type="text" class="form-control" id="city-add" placeholder="Kota" name="email">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Kode Pos</label>
                <input type="text" class="form-control" id="postal_code" placeholder="" name="email">
            </div>
            <div class="mb-3">
                <label for="comment">Deskripsi</label>
                <textarea class="form-control" rows="2" id="description-add" name="text"></textarea>
            </div>
            <button id="save" class="btn btn-primary">Submit</button>
        </div>
    `;

    var customOptions = {
        width: "1000", 
        maxHeight: "500" 
    };

    marker.bindPopup(popupContent, customOptions).openPopup();

    $('#save').on('click', function () {
        var name = $('#name-add').val();
        var description = $('#description-add').val();
        var country = $('#country-add').val();
        var city = $('#city-add').val();
        var postal_code = $('#postal_code').val();

        var newPoi = {
            latitude: latlng.lat,
            longitude: latlng.lng,
            name: name,
            description: description,
            country: country,
            city: city,
            postal_code: postal_code
        };

        addPOI(newPoi);
    });
}

function addPOI(poi) {
    $.ajax({
        url: 'insert.php',
        type: 'POST',
        data: poi,
        success: function (data) {
            console.log('New POI added successfully');
            marker.closePopup(); 
            readPOI(); 
        },
        error: function (xhr, status, error) {
            console.error('Error adding new POI:', error);
        }
    });
}

function setToForm(id, name, country, city, postalcode, lat, long, desc){
    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("country").value = country;
    document.getElementById("city").value = city;
    document.getElementById("postalcode").value = postalcode;
    document.getElementById("long").value = long;
    document.getElementById("lat").value = lat;
    document.getElementById("description").value = desc;
}


function updateData(){

    // var popupContent = `
    //     <div style="700px">
    //     <form id="myForm">
    //     <h1>Edit Map</h1>
    //     <input type="text" class="form-control" id="id" placeholder="" name="" hidden >
    //     <div class="mb-3 mt-3">
    //       <label for="email" class="form-label">Nama</label>
    //       <input type="text" class="form-control" id="name" value="`+name+`" placeholder="Nama">
    //     </div>
    //     <div class="mb-3">
    //         <label for="email" class="form-label">Negara</label>
    //         <input type="text" class="form-control" id="country" placeholder="Negara" value="`+country+`">
    //     </div>
    //     <div class="mb-3">
    //         <label for="email" class="form-label">Kota</label>
    //         <input type="text" class="form-control" id="city" placeholder="Kota" name="email">
    //     </div>
    //     <div class="mb-3">
    //         <label for="email" class="form-label">Kode Pos</label>
    //         <input type="text" class="form-control" id="postalcode" placeholder="" name="email">
    //     </div>
    //     <div class="mb-3">
    //         <label for="email" class="form-label">Latitude</label>
    //         <input type="text" class="form-control" id="lat" placeholder="" name="email">
    //     </div>
    //     <div class="mb-3">
    //         <label for="email" class="form-label">Longitude</label>
    //         <input type="text" class="form-control" id="long" placeholder="" name="email">
    //     </div>
    //     <div class="mb-3">
    //         <label for="comment">Deskripsi</label>
    //         <textarea class="form-control" rows="5" id="description" name="text"></textarea>
    //     </div>
    //     <button type="submit" class="btn btn-primary" id="updateData">Submit</button>
    //   </form>
    //     </div>
    // `;

    // var customOptions = {
    //     width: "1000", // Ubah ukuran maksimum lebar popup
    //     maxHeight: "500" // Ubah ukuran maksimum tinggi popup (opsional)
    // };

    $('#updateData').off('click').on('click', function () {
        console.log("hallo");
        var id = $('#id').val();
        var name = $('#name').val();
        var description = $('#description').val();
        var country = $('#country').val();
        var city = $('#city').val();
        var postalcode = $('#postalcode').val();
        var longitude = $('#long').val();
        var latitude = $('#lang').val();

        $.ajax({
            url: 'update.php',
            type: 'POST',
            data : {
                id: id,
                latitude: latitude,
                longitude: longitude,
                name: name,
                description: description,
                country: country,
                city: city,
                postalcode: postalcode
            },
            success: function (data) {
                console.log('New POI updated successfully');
                readPOI();
            },
            error: function (xhr, status, error) {
                console.error('Error updated new POI:', error);
            }
        });
    });

    // marker.bindPopup(popupContent, customOptions).openPopup();
    
}

function readPOI(){
    var popupContent;
    $.ajax({
        url: 'fetch.php',
        type: 'GET',
        success: function(data) {
            var pois = JSON.parse(data);

            pois.forEach(function(poi) {
                var marker = L.marker([poi.latitude, poi.longitude], { draggable: true }).addTo(map);

                popupContent  = '<table class="table table-hover"> <tr> <td>Nama</td> <td>'+poi.name+'</td></tr> <tr> <td>Deskripsi</td> <td>'+poi.description+'</td></tr> <tr> <td>Negara</td> <td>'+poi.country+'</td></tr><tr> <td>Kota</td> <td>'+poi.city+'</td></tr><tr> <td>Kode Pos</td>  '+poi.postal_code+'<td></tr><table><Button id="editBtn" class="editBtn btn btn-primary">Edit</Button>';
                                    
                $(document).on('click', '.editBtn', function () {
                    // updatePopUp(poi.id, poi.name, poi.country, poi.city, poi.postal_code, poi.latitude, poi.longitude, poi.description);
                    setToForm(poi.id, poi.name, poi.country, poi.city, poi.postal_code, poi.latitude, poi.longitude, poi.description);
                    $("#myModal").modal('show');
                    
                });
                marker.bindPopup(popupContent);
            });
        }
    });
}

readPOI();

function deletePOI(id) {
    $.ajax({
        url: 'delete.php', 
        type: 'POST',
        data: { id: id },
        success: function(response) {
            alert(response); 
            fetchPOIs(); 
        },
        error: function(xhr, status, error) {
            console.error(error); 
        }
    });
}


map.on('contextmenu', function(e) {
    var latlng = e.latlng;

    if (currentPopup !== null) {
        currentPopup.closePopup();
        currentPopup = null;
    }

    if (previousMarker !== null) {
        map.removeLayer(previousMarker);
    }

    var newMarker = L.marker(latlng).addTo(map)
        .bindPopup('Apakah Anda yakin ingin menghapus POI ini?<br><br><button id="confirm-delete">Hapus</button>')
        .openPopup();

    currentPopup = newMarker.getPopup();

    previousMarker = newMarker;

    $('#confirm-delete').on('click', function() {
        deletePOI(newMarker.id);
        map.removeLayer(newMarker);
        currentPopup.remove(); 
    });
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

