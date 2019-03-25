const Pop = require('../models/Pop');

module.exports = {
  async index(req, res) {
    const pops = await Pop.find({}, '-__v');

    return res.json(pops);
  },

  async store(req, res) {
    const pop = await Pop.create(req.body);

    req.io.emit('pop', pop);

    return res.json(pop);
  }
}


