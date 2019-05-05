const Enlace = require('../models/Enlace');
const Pop = require('../models/Pop');
const initializeGraph = require('../functions/initializeGraph')
const dijkstraAlgorithm = require('../functions/dijkstraAlgorithm')


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

  async dijkstra({ body: { start, end, method, closedNodes, closedEdges } }, res) {

    const enlaces = await Enlace.find({}, '-__v').lean();
    const Pops = await Pop.find({}, '-__v').lean();

    let map = initializeGraph(enlaces, Pops, method, closedNodes, closedEdges);

    let route = dijkstraAlgorithm(start, end, map)

    return res.json(route)
  }
}
