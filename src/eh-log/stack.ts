interface TStack {
  push(item: string): void;
  pop(): string | undefined;
  peek(): string | undefined;
  readonly length: number;
  isEmpty(): boolean;
}

const createStack = (): TStack => {
  let array: string[] = [];

  return {
    push(item) {
      array.push(item);
    },
    pop() {
      return array.pop();
    },
    peek() {
      return array[array.length - 1];
    },
    get length() {
      return array.length;
    },
    isEmpty() {
      return array.length === 0;
    }
  };
};

const lowerBodyStack = createStack();

lowerBodyStack.push("underware");
lowerBodyStack.push("socks");
lowerBodyStack.push("pants");
lowerBodyStack.push("shoes");

lowerBodyStack.pop(); // shoes
lowerBodyStack.pop(); // pants

console.log(lowerBodyStack.peek()); // socks
console.log(lowerBodyStack.length); // 2
