const bodyParser = require('body-parser');
const User       = require('../models/user');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/stream', isLoggedIn, (req, res) => {
    res.render('stream.ejs', {
      user: req.user
    });
  });

  app.get('/me', isLoggedIn, (req, res) => {
    res.render('me.ejs', {
      user: req.user
    });
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}
