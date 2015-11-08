//Google Maps Integration
function initMap() {
	var accessToken = 'fc54b2a2ebacc3c920a63e2b016a215c';
	 first = Math.pow((1+0.004167), 360);
//Retsly API Integration
	$.ajax({
		url: "https://rets.io/api/v1/armls/listings?access_token=" + accessToken + "&limit=100&near=33.4500,-112.0667&radius=100mi",
	  type: 'GET',
	  dataType: 'json',
	  success: function (data) {
	   // console.log(data);
			for (i = 0; i < data.bundle.length; i++) {
				lng = data.bundle[i].coordinates[0];
				lat = data.bundle[i].coordinates[1];
				address = data.bundle[i].address;
				tax_annual = data.bundle[i].taxAnnual;
				price = data.bundle[i].price;
				description = data.bundle[i].publicRemarks;
				square_footage = data.bundle[i].squareFootage;
				// console.log(square_footage)
				// price_per_sq_ft = (price / square_footage)
				// console.log(price_per_sq_ft)
				monthlyPayment = price * (0.004167* first /(first - 1));
					var marker = new google.maps.Marker({
	    				map: map,
	    				position: {lat, lng},
	    				address: address,
	    				price: price,
	    				monthlyPayment: Math.round(monthlyPayment),
	    				tax_annual: tax_annual,
	    				description: description
	  				});
				
// Create a marker and set its position.

	  			marker.addListener('click', function() {
	  				// alert(this.content)

    				$('#myModal').modal('show')

    				// ADDRESS
    				$('#myModalLabel').html('');
	    			$('#myModalLabel').append(this.address);

	    			// PRICE
	    			// $('#myModalLabel').html('');
	    			// $('#myModalLabel').append("$" + this.price);

	    			// MONTHLY PROPERTY TAXES
	    			$('#taxes').html('');
	    			$('#taxes').append("$" + this.tax_annual);

	    			// MONTHLY MORTGAGE PAYMENT
	    			$('#mortgagePayment').html('');
	    			$('#mortgagePayment').append("$" + this.monthlyPayment);

	    			// MONTHLY RENTAL INCOME
	    			// $('#rentalIncome').html('');
	    			// $('#rentalIncome').append(this...............);

	    			// DESCRIPTION
	    			$('#description').html('');
	    			$('#description').append(this.description);

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
	  zoom: 14
	});

// //Zillow API Integration
// 	var address = "2030+west+whisper+rock+trail"
// 	var citystatezip = "phoenix,arizona85085"
// 	var zillow_id = "X1-ZWz1a092wkhngr_ac8os"

//     $.ajax({
//         url: "http://cors.io/?u=http://www.zillow.com/webservice/GetSearchResults.htm?zws-id="+zillow_id+"&address="+address+"&citystatezip="+citystatezip,
//         type: 'GET',
//         dataType: "xml",
//         success: function (data) {
//         	console.log('ASD:', data);
//         },
//         then: function (then) {
//         	console.log(then);
//         },
//         error: function (err) {
//         	console.log('ERR', err); 
//         	err.then(function (resolvedPromise) {
//         		console.log('P', resolvedPromise); 
//         	});
//         }
//     })
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})



