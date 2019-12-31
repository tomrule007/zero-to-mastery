const handleSignin = (bcrypt, knex) => (req, res) => {
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
};

module.exports = { handleSignin };
