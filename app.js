
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

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: "371573734026.apps.googleusercontent.com",
    clientSecret: "3q9pFap6DnUiC0J3CaVJKrqW",
    callbackURL: "http://api.eatable.at:3000/auth/google"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'],
                                    successRedirect: '/app/attributs',
                                    failureRedirect: '/app'}),
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

app.post('/post',
  passport.authenticate('local', { successRedirect: '/app/attributes',
                                   failureRedirect: '/app'}),
                                   //successFlash: "Welcome!",
                                   //failureFlash: "Invalid credentials" }),
  function(req,res) {
    res.redirect('/app');
});












































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
  // request 1

  request({
    url: "http://api.eatable.at:3000/attributes.json",
    method: "GET"
  }, function (error, response, body) {
    res1atemp=functions.single_dejsoner(body,"attribute","name");
  });
  //res1atemp=requests.get_request('attribtes','attribute','name',res);
  //requests.get_request();
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    method: "GET"
  }, function (error, response, body) {
    res2atemp = functions.single_dejsoner(body, "attribute", "name");
    res2atemp = functions.unlister(res2atemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1atemp!=null) && (res2atemp!=null)) {
      render();
      clearInterval(interval);
    }
  }
  function render() {
    res.render('app/attributes', {
      title: 'Attributes',
      data1: {
        response: res1atemp
      },
      data2: {
        response: res2atemp
      }
    });
  }
});

app.post('/app/attributes', function(req,response) {
  requests.post_request('attributes','attribute','name', req.body.attribute,response);
});

app.post('/app/attributes/put', function(req,response) {
  requests.put_request('attributes', 43,'attribute','name', req.body.attribute,response);
});


app.get('/app/cities', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/cities.json",
    method: "GET"
  }, function (error, response, body) {
    res1btemp = functions.single_dejsoner(body, "city", "name");
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/cities/8.json",
    method: "GET"
  }, function (error, response, body) {
    res2btemp = functions.single_dejsoner(body,"city","name");
    res2btemp = functions.unlister(res2btemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1btemp!=null) && (res2btemp!=null)) {
      render();
      clearInterval(interval);
    }
  }

  function render() {
    res.render('app/cities', {
      title: 'Cities',
      data1: {
        response: res1btemp,
        test: "test"
      },
      data2: {
        response: res2btemp
      }
    });
  }
});

app.post('/app/cities', function(req,response) {
  requests.post_request('cities','city','name', req.body.city,response);
});

app.post('/app/cities/put', function(req,response) {
  requests.put_request('cities', 8,'city','name', req.body.city,response);
});

app.get('/app/countries', function(req,res) {
  //request 1
  request({
    url: "http://api.eatable.at:3000/countries.json",
    method: "GET"
  }, function (error, response, body) {
    res1ctemp = functions.single_dejsoner(body,"country","name");

  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/countries/24.json",
    method: "GET"
  }, function (error, response, body) {
    res2ctemp = functions.single_dejsoner(body,"country","name");
    res2ctemp = functions.unlister(res2ctemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1ctemp!=null) && (res2ctemp!=null)) {
      render();
      clearInterval(interval);
    }
  }

  function render() {
    res.render('app/countries', {
      title: 'Countries',
      data1: {
        response: res1ctemp
      },
      data2: {
        response: res2ctemp
      }
    });
  }
});

app.post('/app/countries', function(req,response) {
  requests.post_request('countries','country','name', req.body.country,response);
});

app.post('/app/countries/put', function(req,response) {
  requests.put_request('countries', 24,'country','name', req.body.country,response);
});

app.get('/app/days', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/days.json",
    method: "GET"
  }, function (error, response, body) {
    res1dtemp = functions.single_dejsoner(body,"day","day");
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/days/58.json",
    method: "GET"
  }, function (error, response, body) {
    res2dtemp = functions.single_dejsoner(body,"day","day");
    res2dtemp = functions.unlister(res2dtemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1dtemp!=null) && (res2dtemp!=null)) {
      render();
      clearInterval(interval);
    }
  }

  function render() {
    res.render('app/days', {
      title: 'Days',
      data1: {
        response: res1dtemp
      },
      data2: {
        response: res2dtemp
      }
    });
  }
});

app.post('/app/days', function(req,response) {
  requests.post_request('days','day','day',req.body.day,response);
});

app.post('/app/days/put', function(req,response) {
  requests.put_request('days', 58,'day','day', req.body.day,response);
});

app.get('/app/foods', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/foods.json",
    method: "GET"
  }, function (error, response, body) {
    res1etemp = functions.double_dejsoner(body, "food", "description", "name");
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/foods/34.json",
    method: "GET"
  }, function (error, response, body) {
    res2etemp = functions.double_dejsoner(body, "food", "description", "name");
    res2etemp = functions.unlister(res2etemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1etemp!=null) && (res2etemp!=null)) {
      render();
      clearInterval(interval);
    }
  }

  function render() {
    res.render('app/foods', {
      title: 'Foods',
      data1: {
        response: res1etemp
      },
      data2: {
        response: res2etemp
      }
    });
  }
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

app.post('/app/foods/put', function(req,response) {
  requests.post_request('foods','food','description', req.body.description,response);
});

app.get('/app/months', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/months.json",
    method: "GET"
  }, function (error, response, body) {
    res1ftemp = functions.single_dejsoner(body,"month","month");
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/months/60.json",
    method: "GET"
  }, function (error, response, body) {
    res2ftemp = functions.single_dejsoner(body,"month","month");
    res2ftemp = functions.unlister(res2ftemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1ftemp!=null) && (res2ftemp!=null)) {
      render();
      clearInterval(interval);
    }
  }
  function render() {
    res.render('app/months', {
      title: 'Months',
      data1: {
        response: res1ftemp
      },
      data2: {
        response: res2ftemp
      }
    });
  }
});

app.post('/app/months', function(req,response) {
  requests.post_request('months','month','month', req.body.month,response);
});

app.post('/app/months/put', function(req,response) {
  requests.put_request('months', 60,'month','month', req.body.month,response);
});

app.get('/app/states', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/states.json",
    method: "GET"
  }, function (error, response, body) {
    res1gtemp = functions.single_dejsoner(body,"state","name");
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/states/10.json",
    method: "GET"
  }, function (error, response, body) {
    res2gtemp = functions.single_dejsoner(body,"state","name");
    res2gtemp = functions.unlister(res2gtemp);
  });

  var interval = setInterval(check,40);
  function check() {
    if ((res1gtemp!=null) && (res2gtemp!=null)) {
      render();
      clearInterval(interval);
    }
  }

  function render() {
    res.render('app/states', {
      title: 'States',
      data1: {
        response: res1gtemp
      },
      data2: {
        response: res2gtemp
      }
    });
  }
});

app.post('/app/states', function(req,response) {
  requests.post_request('states','state','name', req.body.state,response);
});

app.post('/app/states/put', function(req,response) {
  requests.put_request('states', 10,'state','name', req.body.state,response);
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
    res1htemp = functions.single_dejsoner(body, "street", "name");
  });

  // request 2
  request({
    url: "http://api.eatable.at:3000/streets/67.json",
    method: "GET"
  }, function (error, response, body) {
    res2htemp = functions.single_dejsoner(body, "street", "name");
    res2htemp = functions.unlister(reshtemp);
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



/*    _____-------______-----_____-----___
            Experiment page's stuff
      -----_______------_____-----_____--- */

var postsamp;
app.get('/experiments', function(req, res) {
  requests.vert_carousel_render("foods/search/venue",54,"food","id",true,'experiments',res);
});