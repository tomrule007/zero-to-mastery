const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
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
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  knex('login')
    .where({ email })
    .returning('hash')
    .then(data => {
      console.log({ data });
      return bcrypt.compare(password, data[0].hash).then(match => {
        console.log({ match });
        if (match) {
          knex('users')
            .select('*')
            .where({ email: data[0].email })
            .then(user => res.json(user[0]));
        } else {
          res.status(400).json('Invalid Password or Email');
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('Invalid Password or Email');
    });
});
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  bcrypt.hash(password, saltRounds).then(hash => {
    console.log({ hash });
    knex
      .transaction(trx => {
        trx
          .insert({ hash, email })
          .into('login')
          .returning('email')
          .then(loginEmail =>
            trx('users')
              .returning('*')
              .insert({ email: loginEmail[0], name, joined: new Date() })
              .then(newUser => res.json(newUser[0]))
          )
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json('failed to register');
      });
  });
});
app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  knex('users')
    .select('*')
    .where({ id: userId })
    .then(user => {
      if (user.length) res.json(user[0]);
      res.status(400).json('Error User Not Found');
    })
    .catch(console.log);
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  knex('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) res.json(entries[0]);
      res.status(400).json('User Not Found');
    })
    .catch(console.log);
});
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
