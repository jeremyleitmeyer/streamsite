const bodyParser = require('body-parser');
const User       = require('../models/user');
const Group      = require('../models/group');

module.exports = (app) => {

  app.get('/me/groups', (req, res) => {
    // users groups
  })

  app.post('/me/groups/new', (req, res) => {

  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}
