// Initialize Firebase
   var config = {
    apiKey: "AIzaSyDSbu2rFqoqZApgwWuwv5JmimdbPw6wb70",
    authDomain: "travel-app-7000b.firebaseapp.com",
    databaseURL: "https://travel-app-7000b.firebaseio.com",
    projectId: "travel-app-7000b",
    storageBucket: "travel-app-7000b.appspot.com",
    messagingSenderId: "900414593246"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

   $("#submit").on("click", function(event) {

    var userId =$("#userId").val().trim();
    var email =$("#email").val().trim();
    var name =  $("#name").val().trim(); 
    var password=$("#password").val().trim();
    
     /* database.ref().push({
          name:  $("#name").val().trim(),
          email:  $("#email").val().trim(),
          password: $("#password").val().trim()
        });
*/
      if(userId === null || userId.trim()==='' 
            || email === null || email.trim()==='' 
            || name === null || name.trim()==='' 
            || password === null || password.trim()==='' ){

        $("#validation").text("Please enter valid input for all fields.");

      }else {
         $("#validation").text("User Registered");
         window.location.href = "../html/login.html";
               firebase.database().ref('users/' + userId).set({
                email: email,
                name:  name,
                password: password
               });
      }
     
    
   });

    $("#login").on("click", function(event) {
      var userId =$("#loginUserId").val().trim();
      var password=$("#loginPassword").val().trim();
      

        if(userId === null || userId.trim()==='' 
              || password === null || password.trim()==='' ){

           $("#passwordResult").text("Please enter valid input for all fields.");

      }else {

          var userRef = firebase.database().ref('users/' + userId);
          userRef.on('value', function(snapshot) {
          if(snapshot.val() == null){
           $("#passwordResult").text("User Not Found. Please Signup.");
          } else if(snapshot.val().password === password){
              console.log(userId);
              window.location.href = "../html/home.html";
          }else{
             $("#passwordResult").text("Incorrect Password.");
          }
          
          });
       $(".panel-title").text(userId);
    }

   });