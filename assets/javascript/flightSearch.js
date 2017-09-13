
$( document ).ready(function() {



$("#flightSearch").on("click",function(){

$("#displayFlight").empty();
 $("#displayPoi").empty();

 var origin = $("#from").val();
 var destination = $("#to").val();
 var numberOfperson = $("#select option:selected").val();
=======
 var numberOfperson =  $("#select option:selected").val();
>>>>>>> b39168228b3c0b316f2a67b6be03e44ce45e0667
 var dateOfTravel= $("#date").val();


 var searchData="{'request':{'slice':[{'origin':'"+origin +
                  "','destination':'"+destination+"','date':'"+dateOfTravel+
                  "'}],'passengers':{'adultCount':"+numberOfperson+"},'refundable':false,'solutions':3}}";

var queryURL = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBj2HSobLVPo_ZGh3HUFnvgctXUOSdns1o";




$.ajax({
    method: "POST",
    url: queryURL,
    data: searchData,
    contentType: "application/json"
  })
  .done(function( response ) {    
     var trip = response.trips;
    console.log(response);

    var distinationCityName = getCityName(trip, destination);
    populatePOI(distinationCityName);

    $("#displayFlight").empty();
        
      //loop Through Trips options  
      for(var i=0;i<trip.tripOption.length; i++){
        var tripOptionDiv = $('<div class="panel panel-default" id="tripOptionDiv"><button type="button" class="btn btn-primary" id="trip-option-button">Click To Purchase Tickets</button></div>');
        var flightDiv = $('<div class="panel-heading" id="flightDiv">');

        var totalFlightDuration =trip.tripOption[i].slice[0].duration;

        var totalHours = Math.floor( totalFlightDuration / 60);          
        var totalMinutes = totalFlightDuration % 60;  


        flightDiv.html('<span id="ticket-cost-header">Total Ticket Cost: </span>' +trip.tripOption[i].saleTotal +" <br>" +
                        '<span id="flight-duration-header">Flight Duration: </span>' + totalHours + " Hrs " + totalMinutes + " Minutes");
        tripOptionDiv.append(flightDiv);
          //total tickets cost
        console.log("Total Ticket Costs : " +   trip.tripOption[i].saleTotal);
        // How long is the flight
        console.log("Flight Duration : " +trip.tripOption[i].slice[0].duration/60);

        //loop through the segments

        for(var j=0; j<trip.tripOption[i].slice[0].segment.length;j++){
           console.log("**********");
           var carrierCode= trip.tripOption[i].slice[0].segment[j].flight.carrier;
           var carrierName=getCarrierName(trip, carrierCode);
           console.log("Flight Carrier and Number: " + carrierCode+":"+carrierName+ ":" +trip.tripOption[i].slice[0].segment[j].flight.number);
           //get the carrier name 
         
          //loop through leg
          for(var k=0; k<trip.tripOption[i].slice[0].segment[j].leg.length; k++){
             var flightDetailDiv = $('<div class="panel panel-default" id="flightDetailDiv">');
             var flightDuration =trip.tripOption[i].slice[0].segment[j].leg[k].duration;

            var hours = Math.floor( flightDuration / 60);          
            var minutes = flightDuration % 60;  
            var arrivalDate= new Date(trip.tripOption[i].slice[0].segment[j].leg[k].arrivalTime);
            var departureDate= new Date(trip.tripOption[i].slice[0].segment[j].leg[k].departureTime);

<<<<<<< HEAD
             flightDetailDiv.html('<h4 id="flight-name-title">Flight Name </h4>' + carrierName+' <br> <h4 id="origin-title">Origin </h4>' +trip.tripOption[i].slice[0].segment[j].leg[k].origin +
                                ' <br> <h4 id="destination-title">Destination </h4>' +trip.tripOption[i].slice[0].segment[j].leg[k].destination +"<br>"+
                                ' <h4 id="departure-title">Departure Time </h4>' + departureDate.getFullYear()+ "-" + (departureDate.getMonth()+1) + "-"+departureDate.getDate()+ " " +
                                departureDate.getHours() + ":" + departureDate.getMinutes()+ 
                                ' <br> <h4 id="arrival-title">Arrival Time </h4>' + arrivalDate.getFullYear()+ "-" + (arrivalDate.getMonth()+1)+ "-"+arrivalDate.getDate()+ " " +
=======
             flightDetailDiv.html("Flight name  : " + carrierName+" <br> Origin  : " +trip.tripOption[i].slice[0].segment[j].leg[k].origin +
                                " <br> Destination  : " +trip.tripOption[i].slice[0].segment[j].leg[k].destination +"<br>"+
                                " DepartureTime  : " + departureDate.getFullYear()+ "-" + (departureDate.getMonth()+1)+ "-"+departureDate.getDate()+ " " +
                                departureDate.getHours() + ":" + departureDate.getMinutes()+ 
                                " <br> ArrivalTime  : " + arrivalDate.getFullYear()+ "-" + (arrivalDate.getMonth()+1)+ "-"+arrivalDate.getDate()+ " " +
>>>>>>> b39168228b3c0b316f2a67b6be03e44ce45e0667
                                arrivalDate.getHours() + ":" + arrivalDate.getMinutes() +
                                ' <br> <h4 id="duration-title">Duration </h4>' + hours + " Hrs " + minutes + " Minutes");
          tripOptionDiv.append(flightDetailDiv);
           console.log("--------------");
            console.log("Duration  : " +trip.tripOption[i].slice[0].segment[j].leg[k].duration );
            console.log("origin  : " +trip.tripOption[i].slice[0].segment[j].leg[k].origin );
            console.log("Destination  : " +trip.tripOption[i].slice[0].segment[j].leg[k].destination );
            console.log("arrivalTime  : " +trip.tripOption[i].slice[0].segment[j].leg[k].arrivalTime );
            console.log("departureTime  : " +trip.tripOption[i].slice[0].segment[j].leg[k].departureTime );
            console.log("--------------");
          }
            console.log("**********");
        }
        $("#displayFlight").append(tripOptionDiv);       
      console.log("========================");
      }              
  });
});

function getCarrierName(trip, carrierCode){
        var carrierName = '';
          for(var l=0; l<trip.data.carrier.length; l++){
              if(carrierCode===trip.data.carrier[l].code){
                 carrierName= trip.data.carrier[l].name;
              }
         }
         return carrierName;
};

function getCityName(trip, destinationAirportCode){

        var cityCode= '';

        var cityName = '';
        for(var l=0; l<trip.data.airport.length; l++){
              if(destinationAirportCode.toUpperCase()===trip.data.airport[l].code.toUpperCase()
                || destinationAirportCode.toUpperCase()===trip.data.airport[l].city.toUpperCase()){
                 cityCode= trip.data.airport[l].city;
              }
         }

          for(var l=0; l<trip.data.city.length; l++){
              if(cityCode.toUpperCase()===trip.data.city[l].code.toUpperCase()){
                 cityName= trip.data.city[l].name;
              }
         }
         console.log('city name '+ cityName);
         return cityName;
};

function populatePOI(distinationCityName){
 
var queryURL = "https://api.sygictravelapi.com/1.0/en/places/list?query="+distinationCityName+"&level=poi&limit=7"

$.ajax({
    method: "GET",
    url: queryURL,
    headers: {
        "x-api-key":"N8heiy7BHB7WXPkzfIj6CalObVtTTWiUDwGMPW08"
    }
  })
  .done(function( response ) {

    console.log(response);
    var places = response.data.places;
    $("#displayPoi").empty();
    for (var i = 0; i < places.length; i++){
     
      if(places[i].thumbnail_url != null && places[i].thumbnail_url !==''
        && places[i].perex != null && places[i].perex !=='' ){
        var newDiv = $('<div class="panel panel-default" id="poi-panel">');
        newDiv.addClass("new-display");


        // var image = $("<img>");
        // image.attr("src", places[i].thumbnail_url);
        // newDiv.append(image);

        var title = $('<div class="panel-heading">');
        title.addClass("nameDisplay");
        title.html(places[i].name);
        newDiv.append(title);
        $("#displayTitle").append(newDiv);
         
        var descDiv = $('<div class="panel-body">');
        descDiv.html(places[i].perex);
        newDiv.append(descDiv);
        $("#displayPoi").append(newDiv);
        
        var infoButton = $('<a target="_blank"><button type="button" class="btn btn-primary" id="moreInfoButton">Get More Info</button></a>');
        infoButton.attr('href', places[i].url);
        newDiv.append(infoButton);
        $("#displayButton").append(newDiv);

      }
      
    }
  });
};

});
