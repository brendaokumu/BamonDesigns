function createDrivingDirectionsMap() {
    if (navigator.geolocation) {          //check if current browser has support for geolocation

        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,         //position options
            maximumAge: 1000,
            timeout: 500
        });
    }
    else {
        document.getElementById(map).innerHTML = "No support for geolocation, we can't find you :(";          //if no support, error message
    }
};

function OnSuccess(position) {
    showMap(
        position.coords.latitude,
        position.coords.longitude
    );
};

function OnError() {
    var mapDiv = document.getElementById("map");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mapDiv.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "An unknown error occurred."
            break;
    }
};


function showMap(lat, long) {         //the latitude and longitude

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var route = {
        origin: new google.maps.LatLng(lat, long),
        destination: "Umoja, Nairobi",
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(-1.28609, 36.90034),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //creating the actual map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("driving-directions"));         //take div driving-directions then paste into it the actual driving directions.
    directionsService.route(route, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });
}
