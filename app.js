
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

var functions = require('./public/javascripts/functions.js');
var requests = require('./public/javascripts/requests.js');
    //this is where all our functions are!

//PASSPORT VARIABLIES
var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = "371573734026.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "3q9pFap6DnUiC0J3CaVJKrqW";
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

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
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
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
//              GETTING PAGES
// <---------------------------------->

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
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
  //note that it's called requests instead of request. this is
  //not to confuse it with the node 'request' library
  request({
    url: "http://api.eatable.at:5000/cities.json",
    body: "{ \"name\": \"Tallahassee\" }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);

  });
  response.redirect('/');
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