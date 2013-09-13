/*
passport.use(new GoogleStrategy({
    clientID: "371573734026.apps.googleusercontent.com",
    clientSecret: "3q9pFap6DnUiC0J3CaVJKrqW",
    callbackURL: "http://localhost:3000/auth/google"
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

app.get('http://localhost:3000/auth/google',
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
*/