
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
//              REQUESTING
// <---------------------------------->

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
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