const loginUsername = document.getElementById('login-username');


const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('sign-up-btn');


function loginHandler() {
console.log("Hello world");
};

function signUpHandler() {
    location.replace("../home-page/home-page.html", '_self');

}

loginBtn.addEventListener('click', () => loginHandler(e));
signUpBtn.addEventListener('click', () => signUpHandler());