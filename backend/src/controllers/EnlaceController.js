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
  },

  async neighboors({params: {Nome}}, res){
    //console.log(req)
    //const {NomePop} = await Pop.find({'Nome': Nome}, '-__v');
    const neighboors = await Enlace.find({'P1': Nome},  '-__v' )//.find({'P2': Nome}, '-__v')
    const neighboors_P2 = await Enlace.find({'P2': Nome},  '-__v')
    neighboors_P2.forEach(enlace => {
      neighboors.push(enlace)
    })
    
    return res.json(neighboors);
  },
}


