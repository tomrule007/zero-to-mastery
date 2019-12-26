const express = require('express');
const app = express();
const database = {
  users: [
    {
      id: '123',
      name: 'tom',
      email: 'tom@tom.com',
      password: 123,
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
app.get('/', (req, res) => {
  res.json('this is working');
});
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = database.users.find(user => user.email === email);
  if (user && user.password === password) {
    // should not be sending password back
    res.json(user);
  } else res.status(400).send('Invalid Password or Email');
});
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    res.status(400).send('Missing Required Parameter');
  const newUser = {
    id: database.users.length,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  };
  database.push(newUser);
  res.json(newUser);
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