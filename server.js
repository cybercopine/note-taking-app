let users = [];

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

// setting up the server
const port = 3000;
app.listen(port, ()=>{console.log(`server is up and running on localhost: ${port}`)});