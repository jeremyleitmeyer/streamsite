const passport = require('passport');

module.exports = (app, passport) => {



  app.get('/login', (req, res) => {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/stream',
    failureRedirect: '/login',
    failureFlash: true
  }));


  app.get('/signup', (req, res) => {

    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/stream',
    failureRedirect: '/signup',
    failureFlash: true
  }), (req, res) => {
    console.log(req)
  });

  app.get('https://discordapp.com/api/oauth2/authorize?client_id=432635108583800832&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstream%2FdiscordId&response_type=code&scope=identify', isLoggedIn, passport.authenticate('discord'));

  app.get('/stream/discordId', passport.authenticate('discord', {
    failureRedirect: '/stream',
    failureFlash: true
  }), (req, res) => {
    res.redirect('/stream')
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
