export const createQueue = () => {
  const queue = [];

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

// console.log(q.isEmpty()); // true
// console.log(q.length); // 0