var single_dejsoner = function(json, name, first) {
  json=json.replace("[","");
  json=json.replace("]","");
  json=json.replace(" ]","");
  for (var i = 0; i<json.length-1;i++) {
    json=json.replace("{\""+name+"\":{\""+first+"\":\"","<li>");
    json=json.replace("\"}},","</li>");
  }
  json=json.replace("\"}}","</li>");
  json=json.replace(" ","")
  return json;
}

function double_dejsoner(json, name, first, second) {
  json=json.replace("[","");
  json=json.replace("]","");
  json=json.replace(" ]","");
  for (var i = 0; i<json.length-1;i++) {
    json=json.replace("{\""+name+"\":{\""+first+"\":\"","<li>");
    json=json.replace("\""+second+"\":\""," &clubs; ");
    json=json.replace("\",","");
    json=json.replace("\"}},","</li>");
  }
  json=json.replace("\"}}","");
  json=json.replace(" ","")
  return json;
}

function unlister(input) {
  input=input.replace("<li>","");
  input=input.replace("</li>","");
  return input;
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES!
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.single_dejsoner = single_dejsoner;
module.exports.double_dejsoner = double_dejsoner;
module.exports.unlister = unlister;



/* <---------------------------------------->
        LOGGING IN AND OUT (for reference)
   <---------------------------------------->*/

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
