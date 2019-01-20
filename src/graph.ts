export interface TNode {
  key: string;
  neighbors: TNode[];
  addNeighbor(node: TNode): void;
}

interface TGraph {
  directed: boolean;
  nodes: TNode[];
  edges: string[];
  addNode(key: string): number;
  getNode(key: string): TNode | void;
  addEdge(this: TGraph, node1key: string, node2key: string): void;
  print(): string;
}

function createNode(key: string): TNode {
  let neighbors: TNode[] = [];

  return {
    key,
    neighbors,
    addNeighbor(node: TNode) {
      neighbors.push(node);
    }
  };
}

function createGraph(directed = false): TGraph {
  let nodes: TNode[] = [];
  let edges: string[] = [];

  return {
    directed,
    nodes,
    edges,
    addNode(key) {
      return nodes.push(createNode(key));
    },
    getNode(key) {
      return nodes.find(node => node.key === key);
    },
    addEdge(node1key, node2key) {
      const node1 = this.getNode(node1key);
      const node2 = this.getNode(node2key);

      if (node1 && node2) {
        node1.addNeighbor(node2);
        edges.push(`${node1key}-${node2key}`);

        if (!directed) {
          node2.addNeighbor(node1);
        }
      }
    },
    print() {
      return nodes
        .map(({ key, neighbors }) => {
          let result = key;

          if (neighbors.length) {
            result += ` => ${neighbors.map(({ key }) => key).join(" ")}`;
          }

          return result;
        })
        .join("\n");
    }
  };
}

const graph = createGraph(true);

graph.addNode("Kyle");
graph.addNode("Anna");
graph.addNode("Krios");
graph.addNode("Tali");

graph.addEdge("Kyle", "Anna");
graph.addEdge("Anna", "Kyle");
graph.addEdge("Kyle", "Krios");
graph.addEdge("Kyle", "Tali");
graph.addEdge("Anna", "Krios");
graph.addEdge("Anna", "Tali");
graph.addEdge("Krios", "Anna");
graph.addEdge("Tali", "Kyle");

console.log(graph.print());
