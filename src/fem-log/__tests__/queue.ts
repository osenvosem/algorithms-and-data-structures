import { QueueObject, QueueStacks, TQueue, DoubleEndedQueue } from "../queue";

interface TQueueClass {
  new (): TQueue;
}

const describeFn = (Queue: TQueueClass) => () => {
  test("enqueue", () => {
    const queue = new QueueObject();
    ["one", "two"].forEach(item => queue.enqueue(item));

    expect(queue.count()).toBe(2);
  });

  test("dequeue", () => {
    const queue = new QueueObject();
    ["one", "two", "three"].forEach(item => queue.enqueue(item));
    queue.dequeue();
    queue.dequeue();

    expect(queue.count()).toBe(1);
  });

  test("peek", () => {
    const queue = new QueueObject();
    ["one", "two", "three"].forEach(item => queue.enqueue(item));

    expect(queue.peek()).toBe("three");
  });

  test("max capacity", () => {
    const queue = new QueueObject();
    const maxCapacity = 20;
    queue.setMaxCapacity(maxCapacity);
    Array.from({ length: maxCapacity }, (_, idx) =>
      queue.enqueue(`Item ${idx}`)
    );

    expect(queue.count()).toBe(maxCapacity);
    expect(typeof queue.enqueue("redundant item")).toBe("string");
  });

  test("contains", () => {
    const queue = new QueueObject();
    ["one", "two", "three"].forEach(item => queue.enqueue(item));

    expect(queue.contains("two")).toBe(true);
  });

  test("until", () => {
    const queue = new QueueObject();
    ["one", "two", "three", "four", "five"].forEach(item =>
      queue.enqueue(item)
    );

    expect(queue.until("four")).toBe(4);
  });
};

describe("QueueObject", describeFn(QueueObject));

describe("QueueStacks", describeFn(QueueStacks));

describe("DoubleEndedQueue", () => {
  test("left queue", () => {
    const queue = new DoubleEndedQueue();
    ["one", "two", "three"].forEach(item => queue.enqueueLeft(item));

    expect(queue.count("left")).toBe(3);
    expect(queue.dequeueLeft()).toBe("three");
    expect(queue.count("left")).toBe(2);
  });

  test("right queue", () => {
    const queue = new DoubleEndedQueue();
    ["one", "two", "three"].forEach(item => queue.enqueueRight(item));

    expect(queue.count("right")).toBe(3);
    expect(queue.dequeueRight()).toBe("three");
    expect(queue.count("right")).toBe(2);
  });

  test("count", () => {
    const queue = new DoubleEndedQueue();
    const testSize = 10;
    Array.from({ length: testSize }, (_, idx) =>
      Math.random() > 0.5
        ? queue.enqueueLeft(`Item: ${++idx}`)
        : queue.enqueueRight(`Item: ${++idx}`)
    );

    expect(queue.count()).toBe(testSize);
  });
});
