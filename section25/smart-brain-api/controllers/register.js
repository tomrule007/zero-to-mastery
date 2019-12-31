const handleRegister = (bcrypt, saltRounds, knex) => (req, res) => {
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
};

module.exports = { handleRegister };
