const Graph = require('../helpers/Graph');

function initializeGraph(enlaces, Pops, method, closed) {

  let map = new Graph();
  if (closed.length > 0) { map.closeNodes(closed) }


  Pops.forEach(pop => {
    map.addNode(pop.Nome);
  })

  enlaces.forEach(enlace => {
    enlace.routes.forEach(route => {
      map.addEdge(enlace.P1, route.name, route.metricas[method])
    })
  })

  return map

}

module.exports = initializeGraph
