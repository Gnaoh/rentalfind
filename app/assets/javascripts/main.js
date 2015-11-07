// //Google Maps with Markers
// 	var map;

// 	function initMap() {
// 	  var myLatLng = {lat: 37.7833, lng: -122.4167};

// 	  // Create a map object and specify the DOM element for display.
// 	  var map = new google.maps.Map(document.getElementById('map'), {
// 	    center: myLatLng,
// 	    scrollwheel: false,
// 	    zoom: 13
// 	  });

// 	  // Create a marker and set its position.
// 	  var marker = new google.maps.Marker({
// 	    map: map,
// 	    position: myLatLng,
// 	    title: 'Hello World!'
// 	  });
// 	}