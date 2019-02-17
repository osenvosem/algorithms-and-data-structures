// First In First Out
import { stackObject, TStack } from "./stack";

export interface TQueue {
  enqueue(value: any): number | string;
  dequeue(): any;
  peek(): number;
  count(): number;
  setMaxCapacity(num: number): void;
  contains(item: any): boolean;
  until(item: any): number | null;
}

// Using object
export class QueueObject implements TQueue {
  private storage: { [key: number]: any } = {};
  private maxCapacity = 10;

  enqueue(item: any) {
    if (this.count() >= this.maxCapacity) {
      return "Max capacity already reached. Remove element before adding a new one.";
    }
    this.storage[this.count() + 1] = item;
    return this.count();
  }

  dequeue() {
    if (this.count() === 0) return null;
    const idx = this.count();
    const item = this.storage[idx];
    delete this.storage[idx];
    return item;
  }

  peek() {
    return this.storage[this.count()];
  }

  count() {
    return +(Object.keys(this.storage).pop() || 0);
  }

  setMaxCapacity(num: number) {
    this.maxCapacity = num;
  }

  contains(item: any) {
    return Object.values(this.storage).includes(item);
  }

  until(item: any) {
    let idx = Object.values(this.storage).indexOf(item);
    return idx === -1 ? null : ++idx;
  }
}

// Using two stacks
export class QueueStacks implements TQueue {
  private primaryStack: TStack = stackObject();
  private secondaryStack: TStack = stackObject();
  private maxCapacity = 10;

  enqueue(item: any) {
    if (this.count() >= this.maxCapacity) {
      return "Max capacity already reached. Remove element before adding a new one.";
    }

    this.primaryStack.push(item);
    return this.count();
  }

  dequeue() {
    this.transferItems();

    return this.secondaryStack.pop();
  }

  peek() {
    this.transferItems();
    return this.secondaryStack.peek();
  }

  count() {
    return this.primaryStack.count() + this.secondaryStack.count();
  }

  setMaxCapacity(num: number) {
    this.maxCapacity = num;
  }

  contains(item: any) {
    return (
      this.primaryStack.contains(item) || this.secondaryStack.contains(item)
    );
  }

  until(item: any) {
    const inSecondary = this.secondaryStack.until(item);
    const inPrimary = this.primaryStack.until(item);
    if (inSecondary) return inSecondary;
    if (inPrimary)
      return (
        inPrimary - this.primaryStack.count() + this.secondaryStack.count()
      );
    return null;
  }

  private transferItems() {
    if (this.secondaryStack.count() === 0) {
      while (this.primaryStack.count() > 0) {
        this.secondaryStack.push(this.primaryStack.pop());
      }
    }
  }
}

// Double ended

export interface TDoubleEndedQueue {
  enqueueLeft(item: any): number;
  dequeueLeft(): any;
  enqueueRight(item: any): number;
  dequeueRight(): any;
  count(which?: "left" | "right"): number;
}

interface TPrivateQueueProp {
  [key: number]: any;
}

export class DoubleEndedQueue implements TDoubleEndedQueue {
  private leftQueue: TPrivateQueueProp = {};
  private rightQueue: TPrivateQueueProp = {};

  private enqueue(item: any, which: "left" | "right") {
    const nextIdx = this.count(which) + 1;
    if (which === "left") {
      this.leftQueue[nextIdx] = item;
    }
    if (which === "right") {
      this.rightQueue[nextIdx] = item;
    }
    return nextIdx;
  }
  private dequeue(which: "left" | "right") {
    const idx = this.count(which);
    let item;
    if (which === "left") {
      item = this.leftQueue[idx];
      delete this.leftQueue[idx];
    }
    if (which === "right") {
      item = this.rightQueue[idx];
      delete this.rightQueue[idx];
    }
    return item;
  }

  enqueueLeft(item: any) {
    return this.enqueue(item, "left");
  }
  enqueueRight(item: any) {
    return this.enqueue(item, "right");
  }
  dequeueLeft() {
    return this.dequeue("left");
  }
  dequeueRight() {
    return this.dequeue("right");
  }
  count(which?: "left" | "right") {
    const getLength = (obj: { [key: number]: any }) => Object.keys(obj).length;
    const leftLength = getLength(this.leftQueue);
    const rightLength = getLength(this.rightQueue);

    return which === "left"
      ? leftLength
      : which === "right"
      ? rightLength
      : leftLength + rightLength;
  }
}
