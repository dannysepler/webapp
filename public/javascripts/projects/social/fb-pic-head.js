window.fbAsyncInit = function() {
FB.init({
  appId      : '714985568530422', // Set YOUR APP ID
  channelUrl : 'http://localhost:3000', // Channel File
  status     : true, // check login status
  cookie     : true, // enable cookies to allow the server to access the session
  xfbml      : true  // parse XFBML
});

FB.Event.subscribe('auth.authResponseChange', function(response) {
  if (response.status === 'connected') {
      //document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";

        var sendVal="";
        getPhoto();
        FB.api('/me', function(response) {
          sendVal+="{ \"name\": \""+response.name+"\", \"email\": \""+response.email+"\", \"provider\": \"facebook\", \"uid\": \""+response.id+"\" }";
        });
    }    
  else if (response.status === 'not_authorized') {
    document.getElementById("message").innerHTML +=  "<br>Failed to Connect";

  } else {
    document.getElementById("message").innerHTML +=  "<br>Logged Out";

    }
  });  
};

function Login() {
  FB.login(function(response) {
     if (response.authResponse) 
     {
          getUserInfo();
      } else 
      {
       console.log('User cancelled login or did not fully authorize.');
      }
   },{scope: 'email,user_photos,user_videos'});
}

function getUserInfo() {
    FB.api('/me', function(response) {
      //var str="<b>Name</b> : "+response.name+"<br>";
      str +="<input type='button' value='You have to login' onclick='getPhoto();'/>";
      //str +="<input type='button' value='Logout' onclick='Logout();'/>";
      document.getElementById("message").innerHTML+=str;

});
}

function getPhoto() {
  FB.api('/me/picture?type=normal', function(response) {
      var str="<img src='"+response.data.url+"' />";
      document.getElementById("message").innerHTML+=str;

  });
}