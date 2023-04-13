const User = require('../users/model');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const moment = require('moment');

module.exports = {
   viewLogIn: async (req, res) => {
      try {
         res.render('login', {
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
      } catch (err) {
         console.log(err);
      }
   },

   actionLogIn: async (req, res, next) => {
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/auth/login",
			failureFlash: true,
		})(req, res, next);
	},
   
   viewSignUp: async (req, res) => {
      try {
         res.render('signup', {
            message: req.flash('alertMessage'),
            unameBlank: req.flash('unameMessage'),
            emailBlank: req.flash('emailMessage'),
            passBlank: req.flash('passMessage'),
            status: req.flash('alertStatus'),
            password2: req.flash('password2')
         });
      } catch (err) {
         console.log(err);
      }
   },

   actionSignUp: async(req, res, next) => {
      try {
         const { username, email, password, password2 } = req.body;
         if(username === "" || undefined) {
            req.flash('unameMessage', 'Username Harus Diisi!');
            req.flash('alertStatus', 'red');
            res.redirect('/auth/signup');
         } else if(email === "" || undefined) {
            req.flash('emailMessage', 'Email Harus Diisi!');
            req.flash('alertStatus', 'red');
            res.redirect('/auth/signup');
         } else if(password === "" || undefined) {
            req.flash('passMessage', 'Password Harus Diisi!');
            req.flash('alertStatus', 'red');
            res.redirect('/auth/signup');
         } else if(password !== password2) {
            req.flash('password2', "Passwords doesn't match");
            req.flash('alertStatus', 'red');
            res.redirect('/auth/signup');
         } else {
            User.findOne({ username: username }).then((user) => {
               if(user) {
                  req.flash('alertMessage', 'Username sudah digunakan!');
                  req.flash('alertStatus', 'red');
                  res.redirect('/auth/signup');
               } else {
                  let newUser = new User({
                     username : username,
                     email : email,
                     password : password,
                     time: moment(Date()).format("YYYY-MM-Do, H:mm:ss"),
                  });

                  // hash password
                  bcrypt.genSalt(10, (err, salt) => {
                     bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw(err);
                        // save pass to hash
                        newUser.password = hash;
                        // save user
                        newUser.save().then((value) => {
                           console.log(value);
                           // delete user._doc.password
                           req.flash('alertMessage', 'Berhasil membuat akun! Silahkan login kembali');
                           req.flash('alertStatus', 'green')
                           res.redirect('/auth/login');
                        })
                        .catch(value=> console.log(value));
                     });
                  });
               }
            })
         }
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'red');
         res.redirect('/auth/signup');
      }
   },

   actionLogOut: async (req, res) => {
      req.logout();
		req.flash("alertMessage", "Logout berhasil!");
		req.flash("alertStatus", "green");
		res.redirect("/auth/login");
   },
}