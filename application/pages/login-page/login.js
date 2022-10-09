import {postData, getData} from '../../global-functions.js';

const email = document.getElementById('email');
const signUpUsername = document.getElementById('signup-username');
const signUpPassword = document.getElementById('signup-password');
const signUpBtn = document.getElementById('sign-up-btn');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

function redirect() {
    location.replace("../home-page/home-page.html", '_self');
}


function loginHandler() {
postData('http://localhost:8000/login', {
    username: loginUsername.value,
    password: loginPassword.value
}, redirect)
};



loginBtn.addEventListener('click', () => loginHandler());
signUpBtn.addEventListener('click', () => signUpHandler());
