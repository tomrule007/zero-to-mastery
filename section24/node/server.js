const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  console.log('recieved request');
  const user = {
    name: 'Sally',
    hobby: 'soccer'
  };
  res.send(user);
});

app.post('/profile', (req, res) => {
  console.log('recieved request', req.body);
  const user = {
    name: 'Sally',
    hobby: 'soccer'
  };
  res.send(user);
});
app.listen(3000);
