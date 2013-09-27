define(["locations", "mediator", "async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCTwsq-OMaGnqhpCy1p_jaResnCwaTtQt0&sensor=true&libraries=places"], function(locations, mediator){

  return function() {

    var locations = {
      fel_location : new google.maps.LatLng(51.529118, -0.106004),
      current_location : undefined
    };

    var current_destination;

    var start_point = locations.fel_location;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeoSuccess);
    }

    mediator.on('maps:change_location', function(id) {
      start_point = locations[id];
      mediator.trigger("maps:display_route", current_destination);
    });

    function onGeoSuccess(position) {
      start_point = locations.current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(start_point);
      mediator.trigger("geolocation:allowed");
    }

    var mapOptions = {
      center: start_point,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var display_route = function(destination){
      var request = {
        origin : start_point,
        destination : (current_destination = destination),
        travelMode : google.maps.DirectionsTravelMode.WALKING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    };

    mediator.on("maps:display_route", display_route);

  };

});

