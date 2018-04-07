const passport = require('passport')

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

  // app.get('/auth/google', passport.authenticate('google', {
  //   scope: ['profile', 'email'],
  // }));

  // app.get('/auth/google/callback', passport.authenticate('google', {
  //   successRedirect: '/',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }), (req, res) => {
  //   console.log(req)
  // });

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
