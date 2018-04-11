const passport = require('passport');

module.exports = (app, passport) => {


  // LOCAL LOGIN
  app.get('/login', (req, res) => {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/me',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // LOCAL SIGNUP
  app.get('/signup', (req, res) => {

    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/me',
    failureRedirect: '/signup',
    failureFlash: true
  }), (req, res) => {
    console.log(req)
  });


  // DISCORD OAUTH
  app.get('https://discordapp.com/api/oauth2/authorize?client_id=432635108583800832&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fme%2FdiscordId&response_type=code&scope=identify', isLoggedIn, passport.authenticate('discord'));

  app.get('/me/discordId', passport.authenticate('discord', {
    failureRedirect: '/me',
    failureFlash: true
  }), (req, res) => {
    res.redirect('/me')
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

// handy function for checking login state
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
