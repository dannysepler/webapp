
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
var util = require('util');
var app = express();

var connect = require('connect'),
  flash = require('connect-flash');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// WHERE ARE ALL OUR FUNCTIONS ARE STORED

var functions = require('./public/javascripts/functions.js');
var requests = require('./public/javascripts/requests.js');
var googlefoot = require('./public/javascripts/projects/social/googlefoot.js')

//var login = require('./public/javascripts/projects/social/fb-pic-head.js');
  //var temp; // for use with login
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//PASSPORT VARIABLIES
var passport = require('passport')

//  , LocalStrategy = require('passport-local').Strategy

  , OpenIDStrategy = require('passport-openid').Strategy
      // OpenID is necessary for Google Authentication

  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , GoogleStrategy = require('passport-google').Strategy;

//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = "371573734026.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "3q9pFap6DnUiC0J3CaVJKrqW";
var FacebookStrategy = require('passport-facebook').Strategy;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views', __dirname + '/views/app');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.use(express.favicon());
app.use(express.logger('dev'));
  //app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(express.cookieParser());
app.use(express.session({secret: '12345'}));
app.use(app.router);
*/

/*app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
  app.use(express.cookieParser());
  app.use(express.session({secret: '12345'}));
  app.use(flash());
});*/

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: '12345'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
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

/* <---------------------------------->
              PASSPORT CONFIG
   <----------------------------------> */

// using OAUTH

passport.use('google', new OAuth2Strategy({
    authorizationURL: '/oauth2/authorize',
    tokenURL: '/oauth2/token',
    clientID: '371573734026.apps.googleusercontent.com',
    clientSecret: '3q9pFap6DnUiC0J3CaVJKrqW',
    callbackURL: '/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( 
      
        // do stuff
        console.log("test")
      
      , function(err, user) {
      done(err, user);
        // return error message
        // that first parameter has to be null to continue
    });
  }
));

passport.use(new GoogleStrategy({
  returnURL: '/auth/google/return',
  realm: '/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier}, function(err, user) {
      done(err, user);
    });
  }
));



// using OPENID

passport.use(new OpenIDStrategy({
  returnURL: "/auth/openid/return",
  realm: "/" /* ,
  profile: true 
    (for obtaining info about the user) */
  },
  function(identifier, done) {
    User.findOrCreate({ openId: idenfier }, function(err, user) {
      done(err, user);
        // return some error message
    });
  }
));


/* <---------------------------------->
          GETTING PASSPORT PAGES
   <----------------------------------> */

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: '/success',
                                      failureRedirect: '/failure' }));


app.post('/auth/openid', passport.authenticate('openid'));

app.get('/auth/openid/return', 
  passport.authenticate('openid', { successRedirect: '/success',
                                    failureRedirect: '/failure' }));

// <---------------------------------->
//              GETTING PAGES
// <---------------------------------->

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/g', function(req, res){
  res.render('google', {
    title: 'Google'
  });
});

app.get('/login', function(req, res){
  if ( token ) {
    // redirect to food stream page
    res.redirect('/ui');
  }

  else {
    // redirect to login page
    res.redirect('/g');
  }
});


app.get('/projects', function(req, res){
  res.render('projects/index', {
    title: 'Projects'
  });
});

// MAPS

app.get('/projects/maps/full', function(req, res){
  res.render('projects/maps/full', {
    title: 'Map | Fullscreen'
  });
});

app.get('/projects/maps/simple', function(req, res){
  res.render('projects/maps/simple', {
    title: 'Map | Simple'
  });
});

app.get('/projects/maps/geo', function(req, res){
  res.render('projects/maps/geo', {
    title: 'Map | Current Location'
  });
});


app.get('/projects/maps/directions', function(req, res){
  res.render('projects/maps/directions', {
    title: 'Map | Directions with Options (Inputted)'
  });
});

app.get('/projects/maps/street_simple', function(req, res){
  res.render('projects/maps/street_simple', {
    title: 'Map | Street View'
  });
});

// SOCIAL

app.get('/projects/social/fb/picture', function(req, res){
  res.render('projects/social/fb/picture', {
    title: 'Social | Facebook Picture'
  });
});

app.get('/projects/social/fb/like', function(req, res){
  res.render('projects/social/fb/like', {
    title: 'Social | Like Button'
  });
});

app.get('/projects/social/fb/login', function(req, res){
  res.render('projects/social/fb/login', {
    title: 'Social | Login Test'
  });
});

// CORS
app.get('/projects/cors/cities', function(req, res){
  res.render('projects/cors/cities', {
    title: 'CORS | Cities'
  });
});

app.post('/projects/cors/cities', function(requests,response) {
  request({
    url: "http://api.eatable.at:5000/cities.json",
    body: login.LoginwReturn(),
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);

  });
  response.redirect('/');
});

app.post('/login', function(requests,response) {
  if (requests.body.message == "")
    console.log("Hello");

  /*request({
    url: "http://api.eatable.at:5000/users.json",
    body: requests.body.userinfo.value,
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });*/


  response.redirect('/projects');
});

app.post('/fblogin', function(req, res) {
  request({
    url: "http://api.eatable.at:5000/users.json",
    body: req.body.stuff,
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });

  res.redirect("http://localhost:3000/projects/social/fb/login");
});

app.post('/deleteme?', function(requests,response) {
  request({
    url: "http://api.eatable.at:5000/users/8474.json",
    headers: {"Content-Type": "application/json"},
    method: "DELETE"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/projects');
});

/*    _____-------______-----_____-----
            Session page's stuff
      -----_______------_____-----_____ */

app.get('/one', function(req, res) {
  if(req.session.lastPage) {
    res.send('now on one. last page visited was ' + req.session.lastPage);
    req.session.lastPage='/one';
  }
  else {
    req.session.lastPage='/one';
    res.send('one');
  }
});

app.get('/two', function(req, res) {
  if(req.session.lastPage) {
    res.send('now on two. last page visited was ' + req.session.lastPage);
    req.session.lastPage='/two';
  }
  else {
    req.session.lastPage='/two';
    res.send('two');
  }
});

app.get('/three', function(req, res) {
  if(req.session.lastPage) {
    res.send('now on three. last page visited was '+req.session.lastPage);
    req.session.lastPage='/three';
  }
  else {
    req.session.lastPage='/three';
    res.send('three');
  }
});

/*    _____-------______-----_____-----___
            Experiment page's stuff
      -----_______------_____-----_____--- */

app.get('/experiments', function(req, res) {
  requests.apiary_post("foods/search/venue",54,"food","id",true,'experiments',res);
});

/*    _____-------______-----_____-----___
                UI Page's stuff
      -----_______------_____-----_____--- */

app.get('/ui', function(req, res) {
  requests.vert_carousel("foods/search/venue",54,"food","id",true,'ui',res);
});