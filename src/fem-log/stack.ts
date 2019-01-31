// LIFO - Last in, first out

export interface Stack {
  push(item: any): string | number;
  pop(): any;
  peek(): any;
  count(): number;
  setMaxCapacity(arg: number): void;
  contains(arg: any): any;
}

// Implemented using a string
export class StackString implements Stack {
  private storage = "";
  private maxCapacity = 100;

  push(item: string) {
    if (this.count() >= this.maxCapacity) {
      return "Max capacity already reached. Remove element before adding a new one.";
    }
    this.storage += !this.storage.length ? item : `,${item}`;
    return this.count();
  }
  pop() {
    switch (this.count()) {
      case 0:
        return undefined;
      case 1: {
        const item = this.storage;
        this.storage = "";
        return item;
      }
      default: {
        const lastCommaIdx = this.storage.lastIndexOf(",");
        const item = this.storage.slice(lastCommaIdx + 1);
        this.storage = this.storage.slice(0, lastCommaIdx);
        return item;
      }
    }
  }
  peek() {
    switch (this.count()) {
      case 0:
        return undefined;
      case 1:
        return this.storage;
      default: {
        const lastCommaIdx = this.storage.lastIndexOf(",");
        const item = this.storage.slice(lastCommaIdx + 1);
        return item;
      }
    }
  }
  count() {
    if (!this.storage.length) {
      return 0;
    } else if (this.storage.length && !this.storage.includes(",")) {
      return 1;
    } else {
      return this.storage.split(",").length;
    }
  }
  setMaxCapacity(num: number) {
    this.maxCapacity = num;
  }
  contains(item: string) {
    const regex = new RegExp(`\\b${item}\\b`);
    return regex.test(this.storage);
  }
}

// Implemented using an array
export class StackArray implements Stack {
  private storage: any[] = [];
  private maxCapacity = 100;

  push(item: any) {
    if (this.count() >= this.maxCapacity) {
      return "Max capacity already reached. Remove element before adding a new one.";
    }
    return this.storage.push(item);
  }
  pop() {
    return this.storage.pop();
  }
  peek() {
    return this.storage.slice(-1)[0];
  }
  count() {
    return this.storage.length;
  }
  setMaxCapacity(num: number) {
    this.maxCapacity = num;
  }
  contains(item: any) {
    return this.storage.includes(item);
  }
}

// Implemented using an object and more functional way
export function stackObject(maxCapacity = 100): Stack {
  let storage: { [key: number]: any } = {};

  return {
    push(item: any) {
      if (this.count() >= maxCapacity) {
        return "Max capacity already reached. Remove element before adding a new one.";
      }
      const idx = this.count();
      storage[idx] = item;
      return idx;
    },
    pop() {
      return storage[this.count() - 1];
    },
    peek() {
      return storage[this.count() - 1];
    },
    count() {
      return Object.keys(storage).length;
    },
    setMaxCapacity(num: number) {
      maxCapacity = num;
    },
    contains(item: any) {
      return Object.keys(storage).some((key: string) => storage[+key] === item);
    }
  };
}
