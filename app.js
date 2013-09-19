
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
//var sys = require('sys');
//var s = connect.createServer();
var passport = require('passport');
var util = require('util');



var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = "371573734026.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "3q9pFap6DnUiC0J3CaVJKrqW";
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// all environments
//app.engine('html', require('ejs').renderFile);
//app.engine('.html', require('jade').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views', __dirname + '/views/app');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// <---------------------------------->
//              REQUESTING
// <---------------------------------->

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/signup', function(req, res) {
  res.render('signup', {
    title: 'Sign-up'
  });
});

app.post('/signup', function(requests,response) {
  //note that it's called requests instead of request. this is
  //not to confuse it with the node 'request' library
  request({
    url: "http://api.eatable.at:3000/users.json",
    body: "{ \"user\": { \"email\": \""+requests.body.name+"\", \"provider\": \"webapp\", \"uid\": \"37397\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/thanks');
});

app.get('/thanks', function(req, res){
  res.render('thanks', {
    title: 'Thanks!'
  });
});

/* <------------------------------------>
              LOGGING IN AND OUT
   <------------------------------------>*/

// Google

/*
passport.use(new GoogleStrategy({
    clientID: "371573734026.apps.googleusercontent.com",
    clientSecret: "3q9pFap6DnUiC0J3CaVJKrqW",
    callbackURL: "http://api.eatable.at:3000/auth/google_oauth2/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email']}),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Facebook

passport.use(new FacebookStrategy({
    clientID: "165014317023090",
    clientSecret: "63a670889e2de94de1c867f459d3d196",
    callbackURL: "http://api.eatable.at:3000/auth/facebook_oauth2/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate(..., function(err, user) {
    User.findOrCreate(accessToken, refreshToken, profile, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
*/

/* <------------------------------->
          CHECKING OUT APIs
   <------------------------------->*/

// APP VIEWS
var res1atemp, res2atemp, res1btemp, res2btemp,
    res1ctemp, res2ctemp, res1dtemp, res2dtemp,
    res1etemp, res2etemp, res1ftemp, res2ftemp,
    res1gtemp, res2gtemp, res1htemp, res2htemp,
    res1itemp, res2itemp;
 // we'll eventually have the app
 // running without these

app.get('/app', function(req,res) {
  res.render('app', {
    title: 'The app'
  });
});

app.get('/app/attributes', function(req,res) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"attribute\":{\"name\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }


  // request 1
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    method: "GET"
  }, function (error, response, body) {
    res1atemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    method: "GET"
  }, function (error, response, body) {
    res2atemp = dejsoner(body);
  });
  //function checkEmpty() {
    //if(res1atemp && res2atemp) {
  res.render('app/attributes', {
    title: 'Attributes',
    data1: {
      response: JSON.stringify(res1atemp)
    },
    data2: {
      response: JSON.stringify(res2atemp)
    }
  });
    //}
    //else {
      //setTimeout('checkEmpty();',100);
      //return;
    //}
  //}
});

app.post('/app/attributes', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app');
});

app.post('/app/attributes/put', function(requests,response) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"city\":{\"name\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }


  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app');
});


app.get('/app/cities', function(req,res) {

  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"city\":{\"name\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }

  // request 1
  request({
    url: "http://api.eatable.at:3000/cities.json",
    method: "GET"
  }, function (error, response, body) {
    res1btemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/cities/8.json",
    method: "GET"
  }, function (error, response, body) {
    res2btemp = dejsoner(body);
    //callback(render);
  });
  res.render('app/cities', {
    title: 'Cities',
    data1: {
      response: JSON.stringify(res1btemp)
    },
    data2: {
      response: JSON.stringify(res2btemp)
    }
  });
});

app.post('/app/cities', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/cities.json",
    body: "{ \"city\": { \"name\": \""+requests.body.city+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/cities');
});

app.post('/app/cities/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/cities/8.json",
    body: "{ \"city\": { \"name\": \""+requests.body.city+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/cities');
});

app.get('/app/countries', function(req,res) {
    function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"country\":{\"name\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }

    //request 1
  request({
    url: "http://api.eatable.at:3000/countries.json",
    method: "GET"
  }, function (error, response, body) {
    res1ctemp = dejsoner(body);

  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/countries/24.json",
    method: "GET"
  }, function (error, response, body) {
    res2ctemp = dejsoner(body);
  });

  res.render('app/countries', {
    title: 'Countries',
    data1: {
      response: JSON.stringify(res1ctemp)
    },
    data2: {
      response: JSON.stringify(res2ctemp)
    }
  });
});

app.post('/app/countries', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/countries.json",
    body: "{ \"country\": { \"name\": \""+requests.body.country+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
  });
  response.redirect('/app/countries');
});

app.post('/app/countries/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/countries/24.json",
    body: "{ \"country\": { \"name\": \""+requests.body.country+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/app/countries');
});

app.get('/app/days', function(req,res) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"day\":{\"day\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }


  // request 1
  request({
    url: "http://api.eatable.at:3000/days.json",
    method: "GET"
  }, function (error, response, body) {
    res1dtemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/days/58.json",
    method: "GET"
  }, function (error, response, body) {
    res2dtemp = dejsoner(body);
  });
  res.render('app/days', {
    title: 'Days',
    data1: {
      response: JSON.stringify(res1dtemp)
    },
    data2: {
      response: JSON.stringify(res2dtemp)
    }
  });
});

app.post('/app/days', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/days.json",
    body: "{ \"day\": { \"day\": \""+requests.body.day+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/days');
});

app.post('/app/days/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/days/58.json",
    body: "{ \"day\": { \"day\": \""+requests.body.day+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/days');
});

app.get('/app/foods', function(req,res) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"food\":{\"description\":\"","");
        json=json.replace("\"name\":\""," -- ");
        json=json.replace("\",","");
        json=json.replace("\"}}","");
      }
      //json=json.replace(" ","")
      return json;
    }


  // request 1
  request({
    url: "http://api.eatable.at:3000/foods.json",
    method: "GET"
  }, function (error, response, body) {
    res1etemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/foods/34.json",
    method: "GET"
  }, function (error, response, body) {
    res2etemp = dejsoner(body);
  });
  res.render('app/foods', {
    title: 'Foods',
    data1: {
      response: JSON.stringify(res1etemp)
    },
    data2: {
      response: JSON.stringify(res2etemp)
    }
  });
});

app.post('/app/foods', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/foods.json",
    body: "{ \"food\": { \"description\": \""+requests.body.description+"\",\"name\": \""+requests.body.food+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/foods');
});

app.post('/app/foods/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/foods/34.json",
    body: "{ \"food\": { \"description\": \""+requests.body.description+"\",\"name\": \""+requests.body.food+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/foods');
});

app.get('/app/months', function(req,res) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"month\":{\"month\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }

  // request 1
  request({
    url: "http://api.eatable.at:3000/months.json",
    method: "GET"
  }, function (error, response, body) {
    res1ftemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/months/60.json",
    method: "GET"
  }, function (error, response, body) {
    res2ftemp = dejsoner(body);
  });
  res.render('app/months', {
    title: 'Months',
    data1: {
      response: JSON.stringify(res1ftemp)
    },
    data2: {
      response: JSON.stringify(res2ftemp)
    }
  });
});

app.post('/app/months', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/months.json",
    body: "{ \"month\": { \"month\": \""+requests.body.month+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/months');
});

app.post('/app/months/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/months/60.json",
    body: "{ \"month\": { \"month\": \""+requests.body.month+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/months');
});

app.get('/app/states', function(req,res) {
  function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("{\"state\":{\"name\":\""," ");
        json=json.replace("\"}}","");
      }
      json=json.replace(" ","")
      return json;
    }

  // request 1
  request({
    url: "http://api.eatable.at:3000/states.json",
    method: "GET"
  }, function (error, response, body) {
    res1gtemp = dejsoner(body);
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/states/10.json",
    method: "GET"
  }, function (error, response, body) {
    res2gtemp = dejsoner(body);
  });
  res.render('app/states', {
    title: 'States',
    data1: {
      response: JSON.stringify(res1gtemp)
    },
    data2: {
      response: JSON.stringify(res2gtemp)
    }
  });
});

app.post('/app/states', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/states.json",
    body: "{ \"state\": { \"name\": \""+requests.body.state+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/states');
});

app.post('/app/states/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/states/10.json",
    body: "{ \"state\": { \"name\": \""+requests.body.state+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/states');
});

// STREETS
app.get('/app/streets', function(req,res) {

function dejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("\"","");
	json=json.replace("street", "");
	json=json.replace("name", "");
	json=json.replace(": ", "");
	json=json.replace("{ ", "");
	json=json.replace(" }", "");
      }
      return json;
    }

function singleObjectDejsoner(json) {
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("\"","");
        json=json.replace("street", "");
        json=json.replace("name", "");
        json=json.replace(": ", "");
        json=json.replace("{ ", "");
        json=json.replace(" }", "");
	json=json.replace(":", "");
        json=json.replace("{", "");
        json=json.replace("}", "");
      }
      return json;
    }

  // request 1
  request({
    url: "http://eatable1.apiary.io/streets.json",
    method: "GET"
  }, function (error, response, body) {
    res1htemp = dejsoner(body);
  });

  // request 2
  request({
    url: "http://api.eatable.at:3000/streets/67.json",
    method: "GET"
  }, function (error, response, body) {
    res2htemp = singleObjectDejsoner(body);
  });

  res.render('app/streets', {
    title: 'Streets',
    data1: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res1htemp)
    },
    data2: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res2htemp)
    }
  });
});

app.post('/app/streets', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/streets.json",
    body: "{ \"street\": { \"name\": \""+requests.body.street+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/streets');
});

app.post('/app/streets/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/streets/67.json",
    body: "{ \"street\": { \"name\": \""+requests.body.street+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/streets');
});

// USERS
app.get('/app/users', function(req,res) {

function dejsoner(json) {
      if(!json){
	return json;
      }
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("\"","");
        json=json.replace("user", "");
        json=json.replace("name", "");
        json=json.replace(": ", "");
        json=json.replace("{ ", "");
        json=json.replace(" }", "");
      }
      return json;
    }

function singleObjectDejsoner(json) {
      if (!json){
	return json;
      }
      json=json.replace("[","");
      json=json.replace("]","");
      json=json.replace(" ]","");
      for (var i = 0; i<json.length-1;i++) {
        json=json.replace("\"","");
        json=json.replace("street", "");
        json=json.replace("name", "");
        json=json.replace(": ", "");
        json=json.replace("{ ", "");
        json=json.replace(" }", "");
        json=json.replace(":", "");
        json=json.replace("{", "");
        json=json.replace("}", "");
      }
      return json;
    }

  // request 1
  request({
    url: "http://eatable1.apiary.io/users.json",
    method: "GET"
  }, function (error, response, body) {
    res1itemp = dejsoner(body);
  });

  // request 2
  request({
    url: "http://api.eatable.at:3000/users/67.json",
    method: "GET"
  }, function (error, response, body) {
    res2itemp = singleObjectDejsoner(body);
  });

  res.render('app/users', {
    title: 'Users',
    data1: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res1itemp)
    },
    data2: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res2itemp)
    }
  });
});

app.post('/app/users', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/users.json",
    body: "{ \"user\": { \"name\": \""+requests.body.user+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
  });
  response.redirect('/app/users');
});

app.post('/app/users/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/users/67.json",
    body: "{ \"user\": { \"name\": \""+requests.body.user+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
  });
  response.redirect('/app/users');
});

