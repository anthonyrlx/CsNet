const Graph = require('../helpers/Graph');

function initializeGraph(enlaces, Pops, method, closedNodes, closedEdges) {

  let map = new Graph();
  if (closedNodes.length > 0) { map.closeNodes(closedNodes) }

  if (closedEdges.length > 0) { map.closeEdges(closedEdges) }

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
