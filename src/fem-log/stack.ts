// Last In First Out

// Implemented using a string
export class StackString {
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
export class StackArray {
  private storage: any[] = [];

  push(item: any) {
    return this.storage.push(item);
  }
  pop() {
    return this.storage.pop();
  }
  size() {
    return this.storage.length;
  }
}
