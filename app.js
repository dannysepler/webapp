
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
//app.engine('html', require('ejs').renderFile);
//app.engine('.html', require('jade').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
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




app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
  res.end('Hi there!')
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/signup', function(req, res){
  res.render('signup', {
    title: 'Sign-up'
  });
});

app.post('/signup', createUser);

function createUser(req, res){
  req({
    url: "http://api.eatable.at:3000/users.json",
    body: "{ \"user\": { \"name\": \"Connor Jacobsen\", \"email\": \"connor@eatable.at\", \"beta_key\": \"abc123\", \"in_beta\": \"true\", \"first_name\": \"Connor\", \"last_name\": \"Jacobsen\", \"provider\": \"facebook\", \"uid\": \"37397\", \"token\": \"kjk3u3l\", \"expires_at\": \"3838032\", \"expires\": \"true\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log("Status", res.statusCode);
    console.log("Headers", JSON.stringify(res.headers));
    console.log("Response received", body);
  });
}

app.get('/thanks', function(req, res){
  res.render('thanks', {
    title: 'Thanks!'
  });
});

app.get('/signin', function(req, res){
  res.render('signin', {
    title: 'Sign in'
  });
});