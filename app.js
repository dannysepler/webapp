
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// WHERE ARE ALL OUR FUNCTIONS ARE STORED

var functions = require('./public/javascripts/functions.js');
var carousel = require('./public/javascripts/carousel_req.js');
var googlefoot = require('./public/javascripts/projects/social/googlefoot.js')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views', __dirname + '/views/app');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.use(express.favicon());
app.use(express.logger('dev'));
  //app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

/* for the html files */
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: '12345'}));
  app.use(app.router);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*  This webapp uses tokens to store 
    whether a user is logged in. The 
    token is the user's name. The app 
    does not use that information as 
    of yet.

    The token can be found at 
    'req.session.token' */

// <---------------------------------->
//              USED PAGES
// <---------------------------------->

function checklogin( req, res ) {
  if ( !req.session.token ) res.redirect('/loginredirect');
}

app.get('/', function(req, res){
  res.render('templates/home1.html', {title: 'Eatable'});
});

app.get('/g', function(req, res){
  res.render('google', {title: 'Google'});
});

app.post('/googleform', function(req,res) {
    /* 
        info is posted from the 'google'
        page 
    */

  req.session.token=req.body.googleinfo;
  req.session.email=req.body.googleemail;
  //res.redirect('/checkemail');
  res.redirect('/socnetworkredirect');
});

app.get('/login', function(req, res){
  res.render('login', {title: 'Login'});
});

app.get('/loginredirect', function(req, res){
  res.render('loginredirect', {title: 'Please Login'});
});

app.get('/projects', function(req, res){
  checklogin(req, res);
  res.render('projects/index', {title: 'Projects'});
});

app.get('/socnetworkredirect', function(req,res) {
  if ( req.session.token ) res.redirect('/ui');
  else res.redirect('/incorrect_credentials');
});

app.get('/ui', function(req, res) {
  checklogin(req, res);  
  carousel.actual_food_carousel('recommendations/search', 'ui', req.session.userid, res);
});

app.post('/signout', function(req,res) {
  req.session.token=false;
  res.redirect('/');
});

app.get('/logout', function(req,res) {
  res.render('logout', {title: 'Log out'});
});

/*
      DESIGNS
                  */

app.get('/firsttemplate', function(req, res) {
    /* template for food stream. resembles current one
     pretty closely */
  res.render('templates/one');
});

app.get('/home', function(req, res) {
    /* ugly home page, used only in dev */
  res.render('home');
});

app.get('/template', function(req,res) {
    /* taken from template */
  res.render('templates/home1.html');
});

/* 
      PAGES FOR REFERENCE 
                            */

// ----
// MAPS
// ----

app.get('/projects/maps/full', function(req, res){
  res.render('projects/maps/full', {title: 'Map | Fullscreen'});
});

app.get('/projects/maps/simple', function(req, res){
  res.render('projects/maps/simple', {title: 'Map | Simple'});
});

app.get('/projects/maps/geo', function(req, res){
  res.render('projects/maps/geo', {title: 'Map | Current Location'});
});


app.get('/projects/maps/directions', function(req, res){
  res.render('projects/maps/directions', {title: 'Map | Directions with Options (Inputted)'});
});

app.get('/projects/maps/street_simple', function(req, res){
  res.render('projects/maps/street_simple', {title: 'Map | Street View'});
});

// ------
// SOCIAL
// ------

app.get('/projects/social/fb/picture', function(req, res){
  res.render('projects/social/fb/picture', {title: 'Social | Facebook Picture'});
});

app.get('/projects/social/fb/like', function(req, res){
  res.render('projects/social/fb/like', {title: 'Social | Like Button'});
});

app.get('/projects/social/fb/login', function(req, res){
  res.render('projects/social/fb/login', {title: 'Social | Login Test'});
});

app.get('/checkemail', function(req,res) {
  /* 
      this method checks to see if a user's email
      already exists in our database
  */

  request({
    url: "http://api.eatable.at:5000/users/search/email.json",
    body: "{ \"email\": \""+req.session.email+"\" }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    // console.log(body);
    var userobj = JSON.parse(body);
    req.session.fullname=userobj.name;
    req.session.userid=userobj.id;
    res.redirect('/socnetworkredirect');
  });
});

app.post('/deleteme?', function(requests,response) {
    /* 
        this post method deletes users. I use it
        when I'm testing the creation of new users
    */
  
  request({
    url: "http://api.eatable.at:5000/users/8474.json",
    headers: {"Content-Type": "application/json"},
    method: "DELETE"
  }, function (error, response, body) {});
  
  response.redirect('/projects');
});