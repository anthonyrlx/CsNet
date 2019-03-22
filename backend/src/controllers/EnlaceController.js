const Enlace = require('../models/Enlace');

module.exports = {
  async index(req, res) {
    const enlace = { "teste": "funfando" }

    return res.json(enlace);
  },

  async store(req, res) {
    const enlace = await Enlace.create(req.body);

    req.io.emit('pop', enlace);

    return res.json(enlace);
  }
}


