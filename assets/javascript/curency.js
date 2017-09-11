$("#curency").on("click",function(){
  var from = 0;
  var to = 0;
  var queryURL = "http://apilayer.net/api/live?access_key=58df33d400a18349281f21d9d2781d1d"
  $.ajax({
      method: "GET",
      url: queryURL,
    })
    .done(function(response) {
        console.log(response);    
      });
})