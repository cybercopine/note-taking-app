import {postData, getData} from '../../global-functions.js';

const email = document.getElementById('signup-email');
const signUpUsername = document.getElementById('signup-username');
const signUpPassword = document.getElementById('signup-password');
const signUpBtn = document.getElementById('sign-up-btn');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

function signUpHandler() {
    postData('http://localhost:3000/register', {
        username: signUpUsername.value,
        email: email.value,
        password: signUpPassword.value

    }, () => {
        console.log("Hello World");
    })
}

function loginHandler() {
    postData('http://localhost:3000/login', {
        username: loginUsername.value,
        password: loginPassword.value
    }, () => {
        location.replace("../home-page/home-page.html", '_self');
    })
};



loginBtn.addEventListener('click', () => loginHandler());
signUpBtn.addEventListener('click', () => signUpHandler());
