const PriorityQueue = require('../helpers/PriorityQueue');

function dijkstraAlgorithm(startNode, endNode, map) {
  nodes = map.nodes
  adjacencyList = map.adjacencyList
  let times = {};
  let backtrace = {};
  let pq = new PriorityQueue();

  times[startNode] = 0;

  nodes.forEach(node => {
    if (node !== startNode) {
      times[node] = Infinity
    }
  });

  pq.enqueue([startNode, 0]);

  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    adjacencyList[currentNode].forEach(neighbor => {
      let time = times[currentNode] + neighbor.weight;

      if (time < times[neighbor.node]) {
        times[neighbor.node] = time;
        backtrace[neighbor.node] = currentNode;
        pq.enqueue([neighbor.node, time]);
      }
    });
  }

  let path = [endNode];
  let lastStep = endNode;
  while (lastStep !== startNode) {
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  response = { path: path, cost: times[endNode] }
  return response
}
module.exports = dijkstraAlgorithm


