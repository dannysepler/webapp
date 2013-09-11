
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var connect = require('connect');
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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

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
    //url: "https://api-eatable-at:3000-orb71thzlrwl.runscope.net/users.json", // for heroku
    url: "https://api.eatable.at:3000/users.json", // for localhost
    body: "{ \"user\": { \"email\": \""+requests.body.name+"\", \"provider\": \"facebook\", \"uid\": \"37397\" } }",
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
    res1gtemp, res2gtemp;
 // we'll eventually have the app
 // running without these

app.get('/app', function(req,res) {
  res.render('app', {
    title: 'The app'
  });
});

app.get('/app/attributes', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1atemp = body;
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    res2atemp = body;
  });
  res.render('app/attributes', {
    title: 'Attributes',
    data1: {
      response: JSON.stringify(res1atemp)
    },
    data2: {
      response: JSON.stringify(res2atemp)
    }
  });
});

app.post('/app/attributes', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
  });
  response.redirect('/app');
});

app.post('/app/attributes/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/app');
});


app.get('/app/cities', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/cities.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1btemp = body;
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/cities/8.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    res2btemp = body;
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
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
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
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/app/cities');
});

app.get('/app/countries', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/countries.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1ctemp = body;
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/countries/24.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    res2ctemp = body;
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
  // request 1
  request({
    url: "http://api.eatable.at:3000/days.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1dtemp = body;
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/days/52.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    res2dtemp = body;
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
    body: "{ \"day\": { \"name\": \""+requests.body.day+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
  });
  response.redirect('/app/days');
});

app.post('/app/days/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/days/52.json",
    body: "{ \"day\": { \"name\": \""+requests.body.day+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/app/days');
});


app.get('/app/foods', function(req,res) {
  request({
    url: "http://eatable1.apiary.io/foods.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1etemp = body;
  });
  res.render('app/foods', {
    title: 'Foods',
    data: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res1etemp)
    }
  });
});

app.get('/app/months', function(req,res) {
  request({
    url: "http://eatable1.apiary.io/months.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1ftemp = body;
  });
  res.render('app/months', {
    title: 'Months',
    data: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res1ftemp)
    }
  });
});

app.get('/app/states', function(req,res) {
  request({
    url: "http://eatable1.apiary.io/states.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1gtemp = body;
  });
  res.render('app/states', {
    title: 'States',
    data: {
      status: res.statusCode,
      headers: JSON.stringify(res.headers),
      response: JSON.stringify(res1gtemp)
    }
  });
});