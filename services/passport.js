const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const keys = require('../config/keys');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then(user => {
			done(null, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, username, password, done) => {
		// User.findOne wont fire unless data is sent back
		process.nextTick(() => {
			User.findOne({
				'local.username': username
			}, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
				} else {
					var newUser = new User();

					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);
					console.log(newUser.local)
					newUser.save((err) => {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, username, password, done) => {

		User.findOne({
			'local.username': username
		}, (err, user) => {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));

			// checking if password is valid
			if (!validPassword(user, password))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

			return done(null, user);
		});

	}));

	passport.use(new DiscordStrategy({
		clientID: keys.CLIENT_ID,
		clientSecret: keys.CLIENT_SECRET,
		callbackURL: '/stream/discordId',
		passReqToCallback: true
	}, (req, accessToken, refreshToken, profile, cb, done) => {
		console.log(req)
		User.findOne({
			'local.username': req.user.local.username
		}, function (err, user) {
			user.discordId = cb.id
			user.save(function (err, user) {
				if (err) {
					console.log(err);
				} else {
					return done(null, user)
				}
			})
		})
	}));

	var validPassword = (user, password) => {
		return bcrypt.compareSync(password, user.local.password);
	};
}
