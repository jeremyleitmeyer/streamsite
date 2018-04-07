const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const auth = require('./config/keys');

// for the dev DB 
mongoose.connect(auth.MONGO_KEY, {
  useMongoClient: true
}); 
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error: %s', err);
});
mongoose.set('debug', true);

require('./services/passport')(passport);

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //temp *********

// required for passport
app.use(session({
  secret: 'testingstream',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/authRoutes.js')(app, passport);
require('./routes/genRoutes.js')(app)

var port = process.env.PORT || 3000;
app.listen(port);

console.log('listening on ' + port);
