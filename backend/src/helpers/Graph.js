class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
    this.previous = new Set();
    this.closed = [];
  }

  addNode(node) {
    if (!this.nodes.includes(node) && !this.closed.includes(node)) {
      this.nodes.push(node);
      this.adjacencyList[node] = [];
    }
  }

  addEdge(node1, node2, weight) {
    if (!this.previous.has(node1 + " | " + node2) && !this.previous.has(node2 + " | " + node1)) {
      if (!this.closed.includes(node1) && !this.closed.includes(node2)) {
        this.previous.add(node1 + " | " + node2)
        this.previous.add(node2 + " | " + node1)
        this.adjacencyList[node1].push({ node: node2, weight: weight });
        this.adjacencyList[node2].push({ node: node1, weight: weight });
      }
    }
  }

  closeNodes(nodes) {
    nodes.forEach(node => {
      this.closed.push(node);
    });
  }

}

module.exports = Graph;
