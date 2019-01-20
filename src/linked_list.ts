interface TNode {
  value: any;
  next: TNode | null;
}

interface TLinkedList {
  head: TNode | null;
  tail: TNode | null;
  length: number;
  push(value: any): TNode;
  pop(): TNode;
  get(index: number): TNode;
  delete(index: number): TNode;
  isEmpty(): boolean;
  print(): string;
}

const createNode = (value: any) => {
  return {
    value,
    next: null
  } as TNode;
};

const createLinkedList = () => {
  return {
    head: null,
    tail: null,
    length: 0,
    push(value) {
      const node = createNode(value);

      if (this.head === null) {
        this.head = node;
        this.tail = node;
        this.length++;
        return node;
      }

      this.tail!.next = node;
      this.tail = node;
      this.length++;

      return node;
    },
    pop() {
      if (this.isEmpty()) {
        return null;
      }

      const node = this.tail;

      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.length--;
        return node;
      }

      let current = this.head;
      let penultimate: TNode;
      while (current) {
        if (current.next === this.tail) {
          penultimate = current;
          break;
        }
        current = current.next;
      }

      penultimate!.next = null;
      this.tail = penultimate;
      this.length--;

      return node;
    },
    get(index) {
      if (index < 0 || index > this.length - 1) {
        return null;
      }

      if (index === 0) {
        return this.head;
      }

      let current = this.head;
      let i = 0;
      while (i < index) {
        i++;
        current = current!.next;
      }

      return current;
    },
    delete(index) {
      if (index < 0 || index > this.length - 1) {
        return null;
      }

      if (index === 0) {
        const deleted = this.head;
        this.head = this.head!.next;
        this.length--;

        return deleted;
      }

      let current = this.head;
      let previous: TNode;
      let i = 0;
      while (i < index) {
        i++;
        previous = current!;
        current = current!.next;
      }

      const deleted = current;
      previous!.next = current!.next;

      if (previous!.next === null) {
        this.tail = previous;
      }

      this.length--;

      return deleted;
    },
    isEmpty() {
      return this.length === 0;
    },
    print() {
      let values = [];
      let current = this.head;

      while (current) {
        values.push(current.value);
        current = current.next;
      }

      return values.join(" => ");
    }
  } as TLinkedList;
};

const list = createLinkedList();
const values = ["a", "b", "c", "d", "e"];

const nodes = values.map(val => list.push(val));

console.log(list.isEmpty()); // false

list.pop();

console.log(list.tail!.value); // d

console.log(list.get(1).value); // b

list.delete(1);

console.log(list.print()); // a => c => d
