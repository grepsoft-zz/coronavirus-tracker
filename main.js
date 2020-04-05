var confirmed = $(" #confirmed ");
var deaths = $(" #deaths ");
var recovered = $(" #recovered ");
var myCountry = "Canada";
var locationData = [];

var map;

function initMap() {

    map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 3,
            center: new google.maps.LatLng(51.2538, -85.3232)
        }
    );

    $.getJSON("data.json", function (data) {
        updateStats(data.latest);

        locationData = data.locations.filter(
            loc => loc.country.toLowerCase() === myCountry.toLowerCase()
        );

        for (var i = 0; i < locationData.length; i++) {
            var coords = locationData[i].coordinates;
            var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'orange',
                    fillOpacity: 0.2,
                    strokeColor: 'red',
                    strokeWeight: 0.8,
                    scale: Math.sqrt(locationData[i].latest.confirmed)
                }
            });
        }
    });
}

function updateStats(latest) {
    confirmed.text(latest.confirmed);
    deaths.text(latest.deaths);
    recovered.text(latest.recovered);
}