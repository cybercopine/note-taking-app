let userModel = require("./models/user.js");
let noteModel = require("./models/note.js");

let users = [];
let notes = {};

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const { stringify } = require("querystring");
 
var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
}

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

// setting up the server
const port = 3000;
app.listen(port, ()=>{console.log(`server is up and running on localhost: ${port}`)});

app.post('/register', function(req,res){
    let uname = req.body.username;
    let email = req.body.email;
    let pw = req.body.password;
    // generate a random unique cookie for each user 
    let cookie = crypto.randomBytes(10).toString('hex');
    
    // function that validates the registeration
    for(let i=0; i<users.length; i++) {
        if(users[i].username === uname || users[i].email === email) {
            res.status(409).json({status: "username or email already taken"});
            return;
        }
    }
    let user = new userModel.User(cookie, uname, email, pw);
    users.push(user);
    notes[uname] = [];
    res.status(201).json({status: "successfully created"});

});

app.post('/login', function(req,res) {
    let uname = req.body.username;
    let pw = req.body.password;
    
    // function that makes sure the user already signed up
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
    let cookie = req.cookies['AUTH'];
    let username = "";

    for(let i=0; i<users.length; i++) {
        if(users[i].cookie === cookie) {
            username = users[i].username;
            break;
        }
    }
    let note = new noteModel.Note(title, description);
    notes[username].push(note);
    res.status(201).json({status: "successfully created"});
});

app.get('/my-notes', function(req,res) {
    let cookie = req.cookies['AUTH'];
    let username = "";

    for(let i=0; i<users.length; i++) {
        if(users[i].cookie === cookie) {
            username = users[i].username;
            break;
        }
    }
    res.send(JSON.stringify(notes[username]));
});

app.post('/update-note', function(req,res) {
    let cookie = req.cookies['AUTH'];
    let title = req.body.title;
    let description = req.body.description;
    let id = req.body.id;
    let username = "";
    for(let i=0; i<users.length; i++) {
        if(users[i].cookie === cookie) {
            username = users[i].username;
            break;
        }
    }
    notes[username][id] = new noteModel.Note(title, description);
    res.status(200).json({status: "Successfully updated"});
});

app.post('/delete-note', function(req, res) {
    let cookie = req.cookies['AUTH'];
    let id = req.body.id;
    let username = "";
    for(let i=0; i<users.length; i++) {
        if(users[i].cookie === cookie) {
            username = users[i].username;
            break;
        }
    }
    notes[username].splice(id, 1);
    res.status(200).json({status: "Successfully deleted"});
})