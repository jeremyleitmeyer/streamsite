const bodyParser = require('body-parser');
const User       = require('../models/user');
const Group      = require('../models/group');

module.exports = (app) => {

  app.get('/groups', (req, res) => {

  });

  app.post('/groups/new', (req, res) => {

  })

  app.get('/me/groups', (req, res) => {
    // users groups
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}
