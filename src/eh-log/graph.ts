import { createQueue, TQueue } from "./queue";

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
  breadthFirstSearch(
    startingNodeKey: string,
    visitFn: (node: TNode) => void
  ): void;
  depthFirstSearch(
    startingNodeKey: string,
    visitFn: (node: TNode) => void
  ): void;
}

interface TVisitedNodes {
  [key: string]: boolean;
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
    },
    breadthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);

      const visited = nodes.reduce<TVisitedNodes>((acc, node) => {
        acc[node.key] = false;
        return acc;
      }, {});

      const queue = createQueue();

      if (startingNode) {
        queue.enqueue(startingNode);

        while (!queue.isEmpty()) {
          const currentNode = queue.dequeue<TNode>();

          if (!visited[currentNode.key]) {
            visitFn(currentNode);
            visited[currentNode.key] = true;
          }

          currentNode.neighbors.forEach(node => {
            if (!visited[node.key]) {
              queue.enqueue(node);
            }
          });
        }
      }
    },
    depthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);
      const visited = nodes.reduce<TVisitedNodes>((acc, node) => {
        acc[node.key] = false;
        return acc;
      }, {});

      function explore(node: TNode) {
        if (visited[node.key]) {
          return;
        }

        visitFn(node);
        visited[node.key] = true;

        node.neighbors.forEach(node => {
          explore(node);
        });
      }

      if (startingNode) {
        explore(startingNode);
      }
    }
  };
}

const graph = createGraph(true);

const nodes = ["a", "b", "c", "d", "f"];
const edges = [
  ["a", "b"],
  ["a", "e"],
  ["a", "f"],
  ["b", "d"],
  ["b", "e"],
  ["c", "b"],
  ["d", "c"],
  ["d", "e"]
];

nodes.forEach(node => graph.addNode(node));
edges.forEach(nodes => graph.addEdge(nodes[0], nodes[1]));

// test Breadth First Search
graph.breadthFirstSearch("a", node => {
  console.log(node.key);
});

// test Depth First Search
graph.depthFirstSearch("a", node => {
  console.log(node.key);
});
