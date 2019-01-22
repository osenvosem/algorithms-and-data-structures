export interface TQueue {
  enqueue<T>(item: T): void;
  dequeue<T>(): T;
  peek<T>(): T;
  readonly length: number;
  isEmpty(): boolean;
}

export const createQueue = (): TQueue => {
  const queue: any[] = [];

  return {
    enqueue(item) {
      queue.unshift(item);
    },
    dequeue() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    get length() {
      return queue.length;
    },
    isEmpty() {
      return !queue.length;
    }
  };
};

const q = createQueue();

q.enqueue("Buy some apples.");
q.enqueue("Get a haircut.");
q.enqueue("Go out for a run");

q.dequeue(); // "Buy apples."
q.dequeue(); // "Get a haircut."
q.dequeue(); // "Go out for a run"

q.isEmpty(); // true
q.length; // 0
