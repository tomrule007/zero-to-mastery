const handleImage = knex => (req, res) => {
  const { id } = req.body;
  knex('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(400).json('User Not Found');
      }
    })
    .catch(console.log);
};
module.exports = { handleImage };
