
  //loop Through Trips options  
              for(var i=0;i<trip.tripOption.length; i++){
                var tripOptionDiv = $("<div>");
                console.log("========================");
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

               
              console.log("========================");


              }