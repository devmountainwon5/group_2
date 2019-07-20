const express = require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const authenticate = require('./server/controller/authenticate');
const group = require('./server/controller/group');
const post = require('./server/controller/post');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(express.static(path.join(__dirname, '/build')));
//ENDPOINTS BELOW

app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
      })
});

const port = PORT || 4000;

app.listen(port, ()=>{
    console.log(`Liftoff on port ${port}`)
})