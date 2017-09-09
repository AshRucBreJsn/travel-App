$("#flightSearch").on("click",function(){

 var origin = $("#from").val();
 var destination = $("#to").val();
 var numberOfperson = $(".option").val();
 var dateOfTravel= $("#date").val();


 var searchData="{'request':{'slice':[{'origin':'"+origin +
                  "','destination':'"+destination+"','date':'"+dateOfTravel+
                  "'}],'passengers':{'adultCount':"+numberOfperson+"},'refundable':false,'solutions':10}}";



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

    $("#displayFlight").empty();
        
      //loop Through Trips options  
      for(var i=0;i<trip.tripOption.length; i++){
        var tripOptionDiv = $("<div id='tripOptionDiv'>");
        var flightDiv = $("<div id='flightDiv'>");


        flightDiv.html("Total tickets cost : " +trip.tripOption[i].saleTotal +"<br>" +
                        "Flight Duration (Hrs) : " +trip.tripOption[i].slice[0].duration/60);
        tripOptionDiv.append(flightDiv);
          //total tickets cost
        console.log("total tickets cost : " +trip.tripOption[i].saleTotal);
        // How long is the flight
        console.log("Flight Duration : " +trip.tripOption[i].slice[0].duration/60);

        //loop through the segments

        for(var j=0; j<trip.tripOption[i].slice[0].segment.length;j++){
           console.log("**********");
           var carrierCode= trip.tripOption[i].slice[0].segment[j].flight.carrier;
           var carrierName=getCarrierName(trip, carrierCode);
           console.log("Flight Carrier and number  : " + carrierCode+":"+carrierName+ ":" +trip.tripOption[i].slice[0].segment[j].flight.number);
           //get the carrier name 
         
          //loop through leg
          for(var k=0; k<trip.tripOption[i].slice[0].segment[j].leg.length; k++){
             var flightDetailDiv = $("<div id='flightDetailDiv' >");

             flightDetailDiv.html("Flight name  : " + carrierName+" <br> Origin  : " +trip.tripOption[i].slice[0].segment[j].leg[k].origin +
                                " <br> Destination  : " +trip.tripOption[i].slice[0].segment[j].leg[k].destination +"<br>"+
                                " DepartureTime  : " +trip.tripOption[i].slice[0].segment[j].leg[k].departureTime +
                                " <br> ArrivalTime  : " +trip.tripOption[i].slice[0].segment[j].leg[k].arrivalTime +
                                " <br> Duration(Hrs)  : " +trip.tripOption[i].slice[0].segment[j].leg[k].duration/60
              );

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

