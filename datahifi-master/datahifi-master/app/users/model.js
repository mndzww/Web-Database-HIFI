const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
	username: String,
	password: String,
	nama: String,
	npm: Number,
	ttl: String,
	tgl: String,
	agama: String,
	hp: String,
	goldar: String,
	email: String,
	rumah: String,
	kos: String,
	pendidikan: String,
	panitia: String,
	organisasi: String,
	pelatihan: String,
	prestasi: String,
	role: String,
	time: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
