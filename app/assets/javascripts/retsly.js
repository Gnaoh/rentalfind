//Google Maps Integration
function initMap() {
	var accessToken = 'fc54b2a2ebacc3c920a63e2b016a215c';
	 lng = {};
	 lat = {};

//Retsly API Integration
	$.ajax({
		url: "https://rets.io/api/v1/test/listings?access_token=" + accessToken + "&limit=50&near=37.7833,-122.4167&radius=25mi",
	  type: 'GET',
	  dataType: 'json',
	  success: function (data) {
	   console.log(data);
			for (i = 0; i < data.bundle.length; i++) {
				lng = data.bundle[i].coordinates[0];
				lat = data.bundle[i].coordinates[1];
				console.log(lat, lng);
// Create a marker and set its position.
				var marker = new google.maps.Marker({
	    		map: map,
	    		position: {lat, lng},
	  		});
	  	}
		}
	})
//Google Maps Center
	var myLatLng = {lat: 37.7833, lng: -122.4167};
// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  scrollwheel: false,
	  zoom: 10
	});
}
