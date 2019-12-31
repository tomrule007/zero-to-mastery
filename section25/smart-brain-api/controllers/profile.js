const handleProfile = knex => (req, res) => {
  const { userId } = req.params;
  knex('users')
    .select('*')
    .where({ id: userId })
    .then(user => {
      if (user.length) res.json(user[0]);
      res.status(400).json('Error User Not Found');
    })
    .catch(console.log);
};

module.exports = { handleProfile };
