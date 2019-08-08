const express = require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const addDeleteController = require('./controllers/add_delete_favorites');

const app = express();

const authConfig = {
  domain: 'dev-gttkb6w1.auth0.com',
  audience: 'https://dev-gttkb6w1.auth0.com/api/v2/'
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
});

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!'
  });
});

require('dotenv').config();

const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database is connected');
  })
  .catch(err => {
    console.log(`There was an error ${err}`);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(express.static(path.join(__dirname, '/build')));
//ENDPOINTS BELOW

app.get('/*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'build')
  });
});

app.post('/api/favorites', addDeleteController.addFavorite);
app.delete('/api/favorites_delete/:favorite_id', addDeleteController.deleteFavorite);
app.post('/api/userfavorites', addDeleteController.getFavorites);

const port = PORT || 4000;

app.listen(port, () => {
  console.log(`Liftoff on port ${port}`);
});
