const Enlace = require('../models/Enlace');

module.exports = {
  async index(req, res) {
    const enlaces = await Enlace.find({}, '-__v');

    return res.json(enlaces);
  },

  async store(req, res) {
    const enlace = await Enlace.create(req.body);

    req.io.emit('pop', enlace);

    return res.json(enlace);
  }
}


