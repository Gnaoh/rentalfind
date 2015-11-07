//Google Maps Integration
function initMap() {
	var accessToken = 'fc54b2a2ebacc3c920a63e2b016a215c';
	 lng = {};
	 lat = {};
//Retsly API Integration
	$.ajax({
		url: "https://rets.io/api/v1/armls/listings?access_token=" + accessToken + "&limit=100&near=33.4500,-112.0667&radius=100mi",
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
	var myLatLng = {lat: 33.4500, lng: -112.0667};
// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  scrollwheel: false,
	  zoom: 15
	});

//Zillow API Integration

var zillow_id = 'X1-ZWz1f09a3sx62z_a80zd'; //the zillow web service ID that you got from your email

	var address = "2030+west+whisper+rock+trail"
	var citystatezip = "phoenix,arizona85085"

	var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id="+zillow_id+"&address="+address+"&citystatezip="+citystatezip;

	var jqxhr = $.ajax({
		url: url
		})
		.done(function(data) {
		console.log(data);
	});
}
