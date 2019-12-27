const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('this is working');
});
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = database.users.find(user => user.email === email);
  console.log({ password });
  bcrypt
    .compare(password, user.hash)
    .then(match => {
      console.log({ match });
      if (match) {
        // should not be sending password or hash back
        res.json(user);
      } else {
        res.status(400).send('Invalid Password or Email');
      }
    })
    .catch(console.log);
});
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    res.status(400).send('Missing Required Parameter');

  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      console.log({ hash });
      const newUser = {
        id: database.users.length,
        name,
        email,
        hash,
        entries: 0,
        joined: new Date()
      };
      database.users.push(newUser);
      // should not be sending password or hash back
      res.json(newUser);
    })
    .catch(console.log);
});
app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const user = database.users.find(user => user.id === userId);
  if (!user) res.status(404).send('User Not Found');

  // Should never send passwords
  res.json(user);
});

app.put('/image', (req, res) => {
  const { userId } = req.body;
  console.log({ userId });
  const userIndex = database.users.findIndex(user => user.id === userId);
  console.log({ userIndex });
  if (userIndex === -1) res.status(404).send('User Not Found');
  console.log(database.users[userIndex]);
  const entries = database.users[userIndex].entries++;
  res.json(entries);
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
