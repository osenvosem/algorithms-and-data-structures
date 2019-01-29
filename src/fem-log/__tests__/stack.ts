import { StackString, StackArray } from "../stack";

interface TStack {
  new (): StackString | StackArray;
}

const describeFn = (Stack: TStack) => () => {
  it("0 items", () => {
    const stack = new Stack();

    expect(stack.size()).toBe(0);
    expect(stack.pop()).toBeUndefined();
  });

  it("1 item", () => {
    const stack = new Stack();
    const item = "test item";
    stack.push(item);

    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(item);
  });

  it("many items", () => {
    const stack = new Stack();
    const items = ["one", "two", "three"];
    items.forEach(item => stack.push(item));

    expect(stack.size()).toBe(items.length);
    expect(stack.pop()).toBe(items.pop());
  });
};

describe("StackString", describeFn(StackString));

describe("StackArray", describeFn(StackArray));
