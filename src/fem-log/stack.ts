// LIFO - Last in, first out

export interface Stack {
  push(item: any): number;
  pop(): any;
  peek(): any;
  size(): number;
}

// Implemented using a string
export class StackString implements Stack {
  private storage = "";

  push(item: string) {
    this.storage += !this.storage.length ? item : `,${item}`;
    return this.size();
  }
  pop() {
    switch (this.size()) {
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
    switch (this.size()) {
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
  size() {
    if (!this.storage.length) {
      return 0;
    } else if (this.storage.length && !this.storage.includes(",")) {
      return 1;
    } else {
      return this.storage.split(",").length;
    }
  }
}

// Implemented using an array
export class StackArray implements Stack {
  private storage: any[] = [];

  push(item: any) {
    return this.storage.push(item);
  }
  pop() {
    return this.storage.pop();
  }
  peek() {
    return this.storage.slice(-1)[0];
  }
  size() {
    return this.storage.length;
  }
}

// Implemented using an object and more functional way
export function stackObject(): Stack {
  let storage: { [key: number]: any } = {};

  return {
    push(item: any) {
      const idx = this.size();
      storage[idx] = item;
      return idx;
    },
    pop() {
      return storage[this.size() - 1];
    },
    peek() {
      return storage[this.size() - 1];
    },
    size() {
      return Object.keys(storage).length;
    }
  };
}
