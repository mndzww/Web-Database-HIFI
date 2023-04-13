const User = require("./model");
const bcrypt = require("bcryptjs");
const moment = require('moment');

module.exports={
   index: async (req, res) => {
      try {
         let role, nama
         if(req.isAuthenticated()){
            role = req.user.role;
            nama = req.user.nama;
         }
         res.render('home', {
            loggedIn: req.isAuthenticated(), 
            user: role, 
            nama: nama,
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
      } catch (err) {
         console.log(err);
      }
   },
   
   viewProfile: async (req, res) => {
      try {
         const user = req.user
         if(req.user.nama !== null){
            res.render('profile', {
               user, 
               message: req.flash('alertMessage'),
               status: req.flash('alertStatus'),
            });
         }
         else{
            res.redirect('/');
         }
      } catch (err) {
         console.log(err);
      }
   },

   actionProfile: async(req, res) => {
      try {
         const payload = {
            username: req.body.username,
            password: req.body.password,
            nama: req.body.nama,
            npm: req.body.npm,
            ttl: req.body.ttl,
            tgl: req.body.tgl,
            agama: req.body.agama,
            hp: req.body.hp,
            goldar: req.body.goldar,
            email: req.body.email,
            rumah: req.body.rumah,
            kos: req.body.kos,
            pendidikan: req.body.pendidikan,
            panitia: req.body.panitia,
            organisasi: req.body.organisasi,
            pelatihan: req.body.pelatihan,
            prestasi: req.body.prestasi,
            time: moment(Date()).utcOffset('+0700').format("YYYY-MM-Do, H:mm:ss"),
         };

         User.findOne({'username': payload.username}, (err, user) => {
            if (err) {
               console.log(err);
            } else {
               if(user) {
                  if(user.id === req.user.id) {
                     User.findById(req.user.id, function(err, foundUser){
                        if (err) {
                          console.log(err);
                        } else {
                           if (foundUser) {
                              foundUser.username = payload.username;
                              foundUser.nama = payload.nama;
                              foundUser.npm = payload.npm;
                              foundUser.ttl = payload.ttl;
                              foundUser.tgl = payload.tgl;
                              foundUser.agama = payload.agama;
                              foundUser.goldar = payload.goldar;
                              foundUser.hp = payload.hp;
                              foundUser.email = payload.email;
                              foundUser.rumah = payload.rumah;
                              foundUser.kos = payload.kos;
                              foundUser.pendidikan = payload.pendidikan;
                              foundUser.panitia = payload.panitia;
                              foundUser.organisasi = payload.organisasi;
                              foundUser.pelatihan = payload.pelatihan;
                              foundUser.prestasi = payload.prestasi;
                              foundUser.time = new moment(Date()).utcOffset('+0700').format("YYYY-MM-Do, H:mm:ss"),
                              
                              foundUser.save(function(){
                                 req.flash('alertMessage', 'Data Berhasil Diperbarui!');
                                 req.flash('alertStatus', 'green');
                                 res.redirect("/");
                              });
                           }
                        }
                      });
                  } else {
                     req.flash('alertMessage', 'username sudah digunakan, coba username lain!');
                     req.flash('alertStatus', 'red');
                     res.redirect('/profile');
                  }
               } else {
                  User.findById(req.user.id, function(err, foundUser){
                     if (err) {
                       console.log(err);
                     } else {
                        if (foundUser) {
                           foundUser.username = payload.username;
                           foundUser.nama = payload.nama;
                           foundUser.npm = payload.npm;
                           foundUser.ttl = payload.ttl;
                           foundUser.tgl = payload.tgl;
                           foundUser.agama = payload.agama;
                           foundUser.goldar = payload.goldar;
                           foundUser.hp = payload.hp;
                           foundUser.email = payload.email;
                           foundUser.rumah = payload.rumah;
                           foundUser.kos = payload.kos;
                           foundUser.pendidikan = payload.pendidikan;
                           foundUser.panitia = payload.panitia;
                           foundUser.organisasi = payload.organisasi;
                           foundUser.pelatihan = payload.pelatihan;
                           foundUser.prestasi = payload.prestasi;
                           foundUser.time = new moment(Date()).utcOffset('+0700').format("YYYY-MM-Do, H:mm:ss"),

                           foundUser.save(function(){
                              req.flash('alertMessage', 'Data Berhasil Diperbarui!');
                              req.flash('alertStatus', 'green');
                              res.redirect("/");
                           });
                        }
                     }
                  });
               }
            }
         })
   
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'red');
         res.redirect('/'); 
      }
   },
   
   viewForgot: async (req, res) => {
		try {
			res.render("forgot", {
            title: 'Ubah Password | Database HIFI',
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
		} catch (err) {
			console.log(err);
		}
	},

	actionForgot: async (req, res, next) => {
      try {
         const { username, email, password } = req.body;

         const user = await User.findOne({ username: username });

         if(user){
            if(user.email == email) {
               const updated = ({password})
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(updated.password, salt, (err, hash) => {
                     if(err) throw(err);
                     // save pass to hash
                     updated.password = hash;
                     User.findOneAndUpdate({username: username}, {password: updated.password}).then(() => {
                        console.log(user);
                        req.flash('alertMessage','Berhasil merubah password! Silahkan login kembali.');
                        req.flash('alertStatus', 'green');
                        res.redirect('/auth/login');
                     })
                  })
               })

            } else {
               req.flash('alertMessage','Email yang dimasukkan salah!');
               req.flash('alertStatus', 'red');
               res.redirect('/forgot');
            }
         }
         else{
            req.flash('alertMessage','Username tidak ditemukan!');
            req.flash('alertStatus', 'red');
            res.redirect('/forgot');
         }
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'red');
         res.redirect('/auth/login');
      }
	},
   
}