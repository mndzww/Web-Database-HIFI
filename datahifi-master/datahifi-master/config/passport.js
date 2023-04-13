const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../app/users/model");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: "username" }, (uname, password, done) => {
			//match user
			User.findOne({ username: uname })
				.then((user) => {
					if (!user) {
						return done(null, false, {
							message: "Username tidak ditemukan",
						});
					}
					//match pass
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) {
							console.log(err)
						};

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {
								message: "Kata sandi salah!",
							});
						}
					});
				})
				.catch((err) => {
					console.log(err);
				});
		})
	);
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
