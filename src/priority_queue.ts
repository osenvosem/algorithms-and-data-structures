import { createQueue } from "./queue";

const createPriorityQueue = () => {
  const lowPriorityQueue = createQueue();
  const highPriorityQueue = createQueue();

  return {
    enqueue(item, isHighPriority = false) {
      if (isHighPriority) {
        highPriorityQueue.enqueue(item);
      } else {
        lowPriorityQueue.enqueue(item);
      }
    },
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue();
      } else {
        return lowPriorityQueue.dequeue();
      }
    },
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek();
      } else {
        return lowPriorityQueue.peek();
      }
    },
    get length() {
      return highPriorityQueue.length + lowPriorityQueue.length;
    },
    isEmpty() {
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty();
    }
  };
};

const q = createPriorityQueue();

q.enqueue("A fix here");
q.enqueue("A bug there");
q.enqueue("A new feature");

q.dequeue();

q.enqueue("Emergency task!", true);

console.log(q.peek()); // Emergency task!

q.dequeue();

console.log(q.peek()); // A bug there
