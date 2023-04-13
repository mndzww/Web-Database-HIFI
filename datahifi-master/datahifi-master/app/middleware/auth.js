module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("alertMessage", "Silahkan login terlebih dulu.");
      req.flash('alertStatus', 'red');
		res.redirect("/auth/login");
	},
	
	hasLogin: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect("/");
	},
};
