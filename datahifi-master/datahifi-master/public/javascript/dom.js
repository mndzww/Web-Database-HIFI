const inputPass = document.getElementById('password');
const seePass = document.getElementById('seePassButton');
const seePassIcon = document.getElementById('seePassIcon') ;
seePass.onclick = () => {
   if(inputPass.getAttribute('type') === 'password') {
      inputPass.setAttribute('type', 'text');
      seePassIcon.classList.remove('fa-eye');
      seePassIcon.classList.add('fa-eye-slash');
   } else {
      inputPass.setAttribute('type', 'password');
      seePassIcon.classList.remove('fa-eye-slash');
      seePassIcon.classList.add('fa-eye');
   }
}

// target element that will be dismissed
function dismiss() {
   var x = document.getElementById("alert-border-3");
   if (x.classList.contains("hide")) {
     x.classList.remove("hide");
   } else {
     x.classList.add("hide");
   }
}