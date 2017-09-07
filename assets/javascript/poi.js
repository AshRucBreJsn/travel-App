
$("#find").on("click",function(){

var place = $("#place").val();
var queryURL = "https://api.sygictravelapi.com/1.0/en/places/list?query="+place+"&level=poi&limit=10"

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
        var newDiv = $("<div>");
        newDiv.addClass("new-display");


        var image = $("<img>");
        image.attr("src", places[i].thumbnail_url);
        newDiv.append(image);
         
        var descDiv = $("<h3>").html("Description: " + places[i].perex);
        
        newDiv.append(descDiv);
        
        $("#displayPoi").append(newDiv);

      }
      
    }
  });

});

