const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const dotenvConfiged = require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: 'smart-brain'
  }
});

const saltRounds = 10;

const app = express();
const database = {
  users: [
    {
      id: '123',
      name: 'tom',
      email: 'tommy@tom.com',
      hash: '$2b$10$AwVAJP7KbYMPrTAxUNQLD.CC31y5qcfWJVAiR/xBifwtWX2lSRMYC',
      entries: 0,
      joined: new Date()
    },

    {
      id: '124',
      name: 'rebeccah',
      email: 'rebeccah@rebeccah.com',
      password: 124,
      entries: 0,
      joined: new Date()
    }
  ]
};

const removeHash = obj => {
  const { hash, ...noHash } = obj;
  return noHash;
};
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('this is working');
});

app.post('/signin', signin.handleSignin(bcrypt, knex));
app.post('/register', register.handleRegister(bcrypt, saltRounds, knex));
app.get('/profile/:userId', profile.handleProfile(knex));
app.put('/image', image.handleImage(knex));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/* Planned Endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
