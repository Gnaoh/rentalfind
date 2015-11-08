//Google Maps Integration
function initMap(){
  var accessToken = 'fc54b2a2ebacc3c920a63e2b016a215c';
   lng = {};
   lat = {};
    first = Math.pow((1+0.004167), 360);
    //Retsly API Integration
 	 $.ajax({
   url: "https://rets.io/api/v1/armls/listings?access_token=" + accessToken + "&limit=100&near=33.4500,-112.0667&radius=100mi",
    type: 'GET',
    dataType: 'json',
    success: function (da) {

        
        // console.log(gon.result)
        data=gon.result
              console.log(data)

      for (i = 0; i < data.length; i++) {
        address = data[i].address;
        lng = data[i].coordinates[0];
        lat = data[i].coordinates[1];
        price = data[i].price;
        rent = data[i].rent[0];
        tax_annual = data[i].taxAnnual
        monthlyPayment = price * (0.004167* first /(first - 1))
        monthly_insurance = (((price / 1000) * 3) / 12)
        monthlyCost = monthlyPayment + (tax_annual/12) + monthly_insurance
        monthly_cash_flow = (rent - monthlyCost)
        description = data[i].publicRemarks;
        // console.log(lat, lng)
        zpid=data[i].zpid;
        // console.log(i)
        // console.log(data[i].media)
        if(data[i].media!=null){
          img=data[i].media[0].url;
        }else{
          img='http://www.jetcharters.com/bundles/jetcharterspublic/images/image-not-found.jpg';
        }

        cashflowpercentage = (((rent*12)/price) * 100).toFixed(2);
        console.log(cashflowpercentage)
        console.log(monthly_cash_flow)
         // if (monthly_cash_flow>-100) {
          if((cashflowpercentage)>8){
            iconurl='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }else{
            iconurl='http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
          console.log("BBB")

          var marker = new google.maps.Marker({
              icon:iconurl,
              map: map,
              position: {lat, lng},
              address: address,
              price: price,
              monthlyPayment: Math.round(monthlyPayment),
              monthly_tax: Math.round((tax_annual / 12)),
              description: description,
              rent: rent,
              monthly_cash_flow: Math.round(monthly_cash_flow),
              monthlyCost: monthlyCost,
              monthly_insurance: Math.round(monthly_insurance),
              monthly_tax: Math.round(tax_annual / 12),
              zpid: "http://www.zillow.com/app?chartDuration=1year&chartType=partner&height=150&page=webservice%2FGetChart&service=chart&showPercent=true&width=300&zpid="+zpid,
              img: img,
              cashflowpercentage: cashflowpercentage
            })
        // }
      
				// Create a marker and set its position.

          marker.addListener('click', function() {
            // alert(this.content)
						console.log("AAAAA")
            $('#myModal').modal('show')

            // ADDRESS
            $('#address').html('');
            $('#address').append(this.address);

            // PRICE
            $('#price').html('');
            $('#price').append("$" + this.price);

            // MONTHLY PROPERTY TAXES
            $('#taxes').html('');
            $('#taxes').append("$" + this.monthly_tax);

            // MONTHLY INSURANCE
            $('#insurance').html('');
            $('#insurance').append("$" + this.monthly_insurance);

            // MONTHLY MORTGAGE PAYMENT
            $('#mortgagePayment').html('');
            $('#mortgagePayment').append("$" + this.monthlyPayment);

            // MONTHLY RENTAL INCOME
            $('#rentalIncome').html('');
            $('#rentalIncome').append("$" + this.rent);

            // DESCRIPTION
            $('#description').html('');
            $('#description').append(this.description);

            // MONTHLY CASHFLOW
            $('#cashflow').html('');
            $('#cashflow').append("$" + this.monthly_cash_flow);

            // TOTAL CASHFLOW PERCENTAGE
            $('#cashflowpercentage').html('')
            if((this.cashflowpercentage)>8){
            $('#cashflowpercentage').append("Cash Flow: " + this.cashflowpercentage + "%").removeClass("red").addClass("green")
            }else{
            $('#cashflowpercentage').append("Cash Flow: " + this.cashflowpercentage + "%").removeClass("green").addClass("red")
            }

            // PRICE
            $('#graph').html('');
            $('#graph').append('<img src=' + this.zpid+'>');

            // Picture
            $('#property_image').html('');
            $('#property_image').append('<center><img width="300" src=' + this.img +' style="height:180px;width:240px;"></center>');
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


  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})


