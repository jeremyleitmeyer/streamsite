const bodyParser = require('body-parser');
const User = require('../models/user');
const request = require('request');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/stream', isLoggedIn, (req, res) => {
    res.render('stream.ejs', {
      user: req.user
    });
  });

  app.get('/me=:id/', isLoggedIn, (req, res) => {
    console.log(req.params.id)
    if (req.user.discordId) {
      request('https://discordapp.com/api/users/' + req.user.discordId, (err, response, body) => {
        console.log(body)
        res.render('me.ejs', {
          user: req.user,
          discord: body
        });
      })
    } else {
      res.render('me.ejs', {
        user: req.user
      });
    }
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}
