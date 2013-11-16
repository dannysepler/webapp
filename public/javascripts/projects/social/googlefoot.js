var express = require('express');
var app = express();

app.use(express.cookieParser());
app.use(express.session());

/* accessible functions outside of file:

  checktoken -- returns true or false

  */

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    // document.getElementById('signinButton').setAttribute('style', 'display: none');
  
    // now print out the access code
    //print("<br>" + "<em>access_token:</em> " + authResult['access_token']);
    //printCookie();

    // populate the hidden form
    document.getElementById('googleinput').value+=authResult['access_token'];
    
    // submit the form
    document.getElementById('googleform').submit();

  } else if (authResult['error']) {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function signoutCallback() {
  gapi.auth.signOut();
  printCookie();
}

function checktoken() {
  if ( gapi.auth.getToken() ) { return true; }
  return false;
}

function printCookie() {
  // if ( gapi.auth.getToken() ) { print("Token"); }
  if ( gapi.auth.getToken() ) { print("Token: "+ gapi.auth.getToken() ); }
  else { print("No token"); }
}

function print( stuff ) {
  document.getElementById('results').innerHTML+=stuff+"<br>";
}





module.exports.checktoken = checktoken;