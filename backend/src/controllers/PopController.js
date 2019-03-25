const Pop = require('../models/Pop');
const Enlace = require('../models/Enlace');

module.exports = {
  async index(req, res) {
    const pops = await Pop.find({}, '-__v');

    return res.json(pops);
  },

  async store(req, res) {
    const pop = await Pop.create(req.body);

    req.io.emit('pop', pop);

    return res.json(pop);
  },

  async neighboors({params: {id}}, res){
    const {Nome} = await Pop.findById(id, '-__v');
    const neighboors = await Enlace.find({'P1': Nome},  '-__v')
    return res.json(neighboors);
  },
}


