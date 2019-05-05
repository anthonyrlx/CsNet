class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
    this.previous = new Set();
    this.closedNodes = [];
    this.closedEdges = [];
  }

  addNode(node) {
    if (!this.nodes.includes(node) && !this.closedNodes.includes(node)) {
      this.nodes.push(node);
      this.adjacencyList[node] = [];
    }
  }

  addEdge(node1, node2, weight) {
    let edge = [node1, node2].sort()

    let closed = this.closedEdges.some(function (value) {
      if (value === this[0]) return true;
      if (value == null || this[0] == null) return false;

      for (var i = 0; i < value.length; ++i) {
        if (value[i] !== this[0][i]) return false;
      }
      return true;
    }, [edge]);


    if (!closed) {
      if (!this.previous.has(node1 + " | " + node2) && !this.previous.has(node2 + " | " + node1)) {
        if (!this.closedNodes.includes(node1) && !this.closedNodes.includes(node2)) {
          this.previous.add(node1 + " | " + node2)
          this.previous.add(node2 + " | " + node1)
          this.adjacencyList[node1].push({ node: node2, weight: weight });
          this.adjacencyList[node2].push({ node: node1, weight: weight });
        }
      }
    }
  }

  closeNodes(nodes) {
    nodes.forEach(node => {
      this.closedNodes.push(node);
    });
  }

  closeEdges(nodes) {
    nodes.forEach(node => {
      this.closedEdges.push(node.sort());
    });
  }


}


module.exports = Graph;
