//validasi inputan form ketika kosong atau belum memenuhi suatu peraturan tertentu
function validasi_input(form) {
	var minchar = 8; //membuat minimal char dari inputan username
	pola_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
	//membuat pattern inputan email

	//validasi dimulai
	if (form.username.value == "") {
		alert("Username Harus Diisi!");
		form.username.focus();
		return false;
	} else if (form.username.value.length <= minchar) {
		alert("Username Harus Lebih dari 8 Karakter!");
		form.username.focus();
		return false;
	} else if (form.email.value == "") {
		alert("Email Harus Diisi!");
		form.username.focus();
		return false;
	} else if (!pola_email.test(form.email.value)) {
		alert("Penulisan Email tidak benar");
		form.email.focus();
		return false;
	} else if (form.password_1.value == "") {
		alert("Password Tidak Boleh kosong!");
		form.password.focus();
		return false;
	} else if (form.password_2.value == "") {
		alert("Password Tidak Boleh kosong!");
		form.password_ulangi.focus();
		return false;
	} else {
		return true;
	}
}

//membuat validasi password 1 dan password 2 (pencocokan)
function checkPass() {
	//mengambil object dan dimasukan ke variabel
	var pass_1 = document.getElementById("password_1");
	var pass_2 = document.getElementById("password_2");
	//mengambil object dan dimasukan ke variabel
	var message = document.getElementById("pesan");
	//inisialisasi warna didalam variabel
	var warnabenar = "#66cc66";
	var warnasalah = "#ff6666";
	//membandingkan 2 variabel
	if (pass_1.value == pass_2.value) {
		//ketika password benar
		//ubah menjadi warna jelek
		//memeberi peringatanya bahwa benar
		document.validasi_form.daftar_process.disabled = false;
		pass_2.style.backgroundColor = warnabenar;
		message.style.color = warnabenar;
		message.innerHTML = "";
	} else {
		//ini ketika password tidak cocok
		//ubah menjadi warna jelek
		//memeberi peringatanya bahwa salah dengan tanda seru
		document.validasi_form.daftar_process.disabled = true;
		alert("Password tidak Cocok!");
		pass_2.style.backgroundColor = warnasalah;
		message.style.color = warnasalah;
		message.innerHTML = "!";
	}
}
