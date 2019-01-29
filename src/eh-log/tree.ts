interface TNode {
  key: string;
  children: TNode[];
  addChild(key: string): TNode;
}

interface TTree {
  root: TNode;
  print(): string;
}

function createNode(key: string): TNode {
  let children: TNode[] = [];

  return {
    key,
    children,
    addChild(childKey) {
      const childNode = createNode(childKey);
      children.push(childNode);
      return childNode;
    }
  };
}

function createTree(rootKey: string): TTree {
  const root = createNode(rootKey);

  return {
    root,
    print() {
      let result = "";

      type TVisitFn = (node: TNode, depth: number) => void;
      function traverse(node: TNode, visitFn: TVisitFn, depth: number) {
        visitFn(node, depth);

        if (node.children.length) {
          node.children.forEach(child => {
            traverse(child, visitFn, depth + 1);
          });
        }
      }

      function addKeyToResult(node: TNode, depth: number) {
        result +=
          result.length === 0
            ? node.key
            : `\n${" ".repeat(depth * 2)}${node.key}`;
      }

      traverse(root, addKeyToResult, 0);

      return result;
    }
  };
}

const dom = createTree("html");
const head = dom.root.addChild("head");
const body = dom.root.addChild("body");
const title = head.addChild("title");
const header = body.addChild("header");
const main = body.addChild("main");
const footer = body.addChild("footer");
const h1 = header.addChild("h1 - This is a title.");
const p = main.addChild("p - This is a description.");
const copyright = footer.addChild(`Copyright ${new Date().getFullYear()}`);

console.log(dom.print());
