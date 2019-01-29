interface TBinaryNode {
  key: string;
  left: TBinaryNode | null;
  right: TBinaryNode | null;
  addLeft(key: string): TBinaryNode;
  addRight(key: string): TBinaryNode;
}

function createBinaryNode(key: string): TBinaryNode {
  return {
    key,
    left: null,
    right: null,
    addLeft(leftKey: string) {
      const newLeft = createBinaryNode(leftKey);
      this.left = newLeft;
      return newLeft;
    },
    addRight(rightKey: string) {
      const newRight = createBinaryNode(rightKey);
      this.right = newRight;
      return newRight;
    }
  };
}

interface TTraversalFn {
  (node: TBinaryNode | null, visitFn: (node: TBinaryNode) => void): void;
}
type TTraversalsKeys = "IN_ORDER" | "PRE_ORDER" | "POST_ORDER";
type TTraversals = { [key in TTraversalsKeys]: TTraversalFn };

const TRAVERSALS: TTraversals = {
  IN_ORDER: (node, visitFn) => {
    if (node !== null) {
      TRAVERSALS.IN_ORDER(node.left, visitFn);
      visitFn(node);
      TRAVERSALS.IN_ORDER(node.right, visitFn);
    }
  },
  PRE_ORDER: (node, visitFn) => {
    if (node !== null) {
      visitFn(node);
      TRAVERSALS.IN_ORDER(node.left, visitFn);
      TRAVERSALS.IN_ORDER(node.right, visitFn);
    }
  },
  POST_ORDER: (node, visitFn) => {
    if (node !== null) {
      TRAVERSALS.IN_ORDER(node.left, visitFn);
      TRAVERSALS.IN_ORDER(node.right, visitFn);
      visitFn(node);
    }
  }
};

interface TBinaryTree {
  root: TBinaryNode;
  print(traversalType?: TTraversalsKeys): string;
}

function createBinaryTree(rootKey: string): TBinaryTree {
  const root = createBinaryNode(rootKey);

  return {
    root,
    print(traversalType = "IN_ORDER") {
      let result = "";

      const visit = (node: TBinaryNode) => {
        result += result.length === 0 ? node.key : ` => ${node.key}`;
      };

      TRAVERSALS[traversalType](this.root, visit);

      return result;
    }
  };
}

const tree = createBinaryTree("a");
const b = tree.root.addLeft("b");
const c = tree.root.addRight("c");
const d = b.addLeft("d");
const e = b.addRight("e");
const f = c.addLeft("f");
const g = c.addRight("g");
const h = d.addLeft("h");
const i = d.addRight("i");

console.log(tree.print("POST_ORDER"));
