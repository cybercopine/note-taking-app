import {postData, getData} from '../../global-functions.js';

const email = document.getElementById('signup-email');
const signUpUsername = document.getElementById('signup-username');
const signUpPassword = document.getElementById('signup-password');
const signUpBtn = document.getElementById('sign-up-btn');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const checkBtn = document.getElementById('check-button');

function signUpHandler() {
    postData('http://localhost:3000/register', {
        username: signUpUsername.value,
        email: email.value,
        password: signUpPassword.value

    }, () => {
       checkBtn.checked = true;
    })
}

function loginHandler() {
    postData('http://localhost:3000/login', {
        username: loginUsername.value,
        password: loginPassword.value
    }, () => {
        window.location.href = "../home-page/home-page.html";
    })
};



loginBtn.addEventListener('click', () => loginHandler());
signUpBtn.addEventListener('click', () => signUpHandler());
