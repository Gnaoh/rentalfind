// //Google Maps Integration
// function initMap() {
// 	var accessToken = 'fc54b2a2ebacc3c920a63e2b016a215c';
// 	 lng = {};
// 	 lat = {};
// //Retsly API Integration
// 	$.ajax({
// 		url: "https://rets.io/api/v1/armls/listings?access_token=" + accessToken + "&limit=100&near=33.4500,-112.0667&radius=100mi",
// 	  type: 'GET',
// 	  dataType: 'json',
// 	  success: function (data) {
// 	   console.log(data);
// 			for (i = 0; i < data.bundle.length; i++) {
// 				lng = data.bundle[i].coordinates[0];
// 				lat = data.bundle[i].coordinates[1];
// 				console.log(lat, lng);
// // Create a marker and set its position.
// 				var marker = new google.maps.Marker({
// 	    		map: map,
// 	    		position: {lat, lng},
// 	  		});
// 	  	}
// 		}
// 	})
// //Google Maps Center
// 	var myLatLng = {lat: 33.4500, lng: -112.0667};
// // Create a map object and specify the DOM element for display.
// 	var map = new google.maps.Map(document.getElementById('map'), {
// 	  center: myLatLng,
// 	  scrollwheel: false,
// 	  zoom: 15
// 	});

// //Zillow API Integration
// 	var address = "2030+west+whisper+rock+trail"
// 	var citystatezip = "phoenix,arizona85085"
// 	var zillow_id = "X1-ZWz1a092wkhngr_ac8os"

//     $.ajax({
//         url: "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id="+zillow_id+"&address="+address+"&citystatezip="+citystatezip,
//         headers: { 'Access-Control-Allow-Origin': '*' },
//         crossDomain: true,
//         type: 'GET',
//         dataType: "json",
//         success: function parseXml(data) {
//         	console.log(data);
//         }
//     })
// };
$(document).ready(function(){
	ZWSID="X1-ZWz1f09lxzlhxn_agge7"
	//SWSID="X1-ZWz1f08y9m8u8b_9zlkj"
	var url="https://www.zillow.com/webservice/GetSearchResults.htm?zws-id="+ZWSID+"&address=2030+west+whisper+rock+trail&citystatezip=phoenix,arizona85085&rentzestimate=true";
	
	//url="https://raw.githubusercontent.com/Gnaoh/rentalfind/master/GetSearchResults.xml"
	console.log(url);
	
	function parseInput(inputdata){
		//var response=inputdata.getElementsByTagName("response");
		var results=inputdata.getElementsByTagName("results");
		var result=inputdata.getElementsByTagName("result");
		var i
		for(i=0;i<result.length;i++){
			//result[i] is each listing
			console.log(result[i].getElementsByTagName("zpid")[0].innerHTML); //display pid for each listing
			rentAmount=result[i].getElementsByTagName("rentzestimate")[0].getElementsByTagName("amount")[0].innerHTML;
			console.log("Rent: $"+rentAmount);
			//rentRange=result[i].getElementsByTagName("rentzestimate")[0].getElementByTagName("valuationRange")[0];
			//console.log("low: "+rentRange.getElementsByTagName("low")[0]);
			//console.log("high: "+rentRange.getElementsByTagName("high")[0]);
			//console.log(rentRange)
			//console.log(result[i]);
		}
		//getElementsByTagName
		//console.log(zpid[0].innerHTML)
		//var results=inputdata.getElementsByTagName("results")
	}
	
	var xmldata = new XMLHttpRequest();
	
	xmldata.onreadystatechange = function() {
		if (xmldata.readyState == 4) {
			parseInput(xmldata.responseXML);
		}
	}
	
	
    xmldata.overrideMimeType('text/xml');
	xmldata.open("GET", url, true);
	
	xmldata.send();
	console.log(xmldata)
	var xmlDoc
	
	/*xmlDoc = document.implementation.createDocument("", "", null);
	xmlDoc.onload = readXML;
	xmlDoc.load(url);
	xmlloaded = true;
	*/
})