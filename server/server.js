let User = require("./models/user.js");
let Note = require("./models/note.js");

let users = [];
let notes = [];

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
 

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

// setting up the server
const port = 3000;
app.listen(port, ()=>{console.log(`server is up and running on localhost: ${port}`)});

// app.get('/notes', function(req,res) {

// });

app.post('/register', function(req,res){
    let uname = req.body.username;
    let email = req.body.email;
    let pw = req.body.password;
    let cookie = crypto.randomBytes(10).toString('hex');
    

    for(let i=0; i<users.length; i++) {
        if(users[i].username === uname || users[i].email === email) {
            res.status(409).json({status: "username or email already taken"});
            return;
        }
    }
    res.status(201).json({status: "successfully created"});
    let user = new User(cookie, uname, email, pw);
    users.push(user);

});

app.post('/login', function(req,res) {
    let uname = req.body.username;
    let pw = req.body.password;
    
    for(let i=0; i<users.length; i++) {
        if(users[i].username === uname && users[i].password === pw) {
            res.cookie('AUTH', users[i].cookie);
            res.status(200).json({status: "Successful login"});
            return;
        }
    }
    res.status(401).json({status: "invalid attempt"});
});

app.post('/new-note', function(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    let note = new Note(title, description);
    notes.push(note);
    
    
});