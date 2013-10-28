//var requests = require('./public/javascripts/requests.js');
  // careful with this line, it can prevent
  // the rest of the javascript from happening



window.fbAsyncInit = function() {
FB.init({
  appId      : '714985568530422',
  channelUrl : 'http://localhost:3000',
  status     : true, // check login status
  cookie     : true, // enable cookies to allow the server to access the session
  xfbml      : true  // parse XFBML
});

FB.Event.subscribe('auth.authResponseChange', function(response) {
  if (response.status === 'connected') {
      //document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";

        var sendVal="";
        sendInfo();
        /*FB.api('/me', function(response) {
          //sendVal+="{ \"name\": \""+response.name+"\", \"email\": \""+response.email+"\", \"provider\": \"facebook\", \"uid\": \""+response.id+"\" }";
        });*/
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
          sendInfo();
      } else 
      {
       console.log('User cancelled login or did not fully authorize.');
      }
   },{scope: 'email,user_photos,user_videos'});
}

function LoginwReturn() {
  FB.login(function(response) {
     if (response.authResponse) 
     {
          return sendInfowReturn();
      } else 
      {
       console.log('User cancelled login or did not fully authorize.');
      }
   },{scope: 'email,user_photos,user_videos'});
}

function LoginwHidden() {
  FB.login(function(response) {
     if (response.authResponse) 
     {
          sendInfo();
      } else 
      {
       console.log('User cancelled login or did not fully authorize.');
      }
   },{scope: 'email,user_photos,user_videos'});
}

function sendInfo() {
  FB.api('/me', function(response) {
      var body = "{ \"name\": \""+response.name+"\", \"uid\": \""+response.id+"\", \"email\": \""+response.email+"\", \"provider\": \"facebook\" }";
      
      if (document.getElementById("message").value == "") {
        // get rid of the login button
        var form = document.getElementById('fbform');
        var firstbutton = document.getElementById('firstbutton');
        form.removeChild(firstbutton);

        // create the submit button
        document.getElementById("message").value+=body;
        var submit = document.createElement("input");
        submit.type="submit";
        submit.className="btn"; // visuals (bootstrap)
        document.body.appendChild(submit);
        form.appendChild(submit);
        //document.fbform.appendChild(submit);
      }
  });
}

function sendInfowReturn() {
  FB.api('/me', function(response) {
      var str="{ \"name\": \""+response.name+"\", \"uid\": \""+response.id+"\", \"email\": \""+response.email+"\", \"provider\": \"facebook\" }";
      document.getElementById("message").innerHTML+=body;
      return str;
  });
}

// if user's credentials are added to the hidden field
document.getElementById('message').addEventListener('change', function() {

  // create a submit button
  var submit = document.createElement("input");
  submit.type="submit";
  submit.class="btn"; // visuals (bootstrap)
  document.body.appendChild(submit);
}, false);
