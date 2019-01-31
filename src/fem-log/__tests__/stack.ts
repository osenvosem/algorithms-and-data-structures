import { StackString, StackArray, stackObject, Stack } from "../stack";

const createStack = (classOrFunc: any, isFunc: boolean) => {
  return isFunc ? classOrFunc() : new classOrFunc();
};

const describeFn = (classOrFunc: any, isFunc = false) => () => {
  it("0 items", () => {
    const stack = createStack(classOrFunc, isFunc);
    expect(stack.count()).toBe(0);
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
  });

  it("1 item", () => {
    const stack = createStack(classOrFunc, isFunc);
    const item = "test item";
    stack.push(item);

    expect(stack.count()).toBe(1);
    expect(stack.peek()).toBe(item);
    expect(stack.pop()).toBe(item);
  });

  it("many items", () => {
    const stack = createStack(classOrFunc, isFunc);
    const items = ["one", "two", "three"];
    items.forEach(item => stack.push(item));

    expect(stack.count()).toBe(items.length);
    expect(stack.peek()).toBe(items.slice(-1)[0]);
    expect(stack.pop()).toBe(items.pop());
  });

  it("must return the same item no matter how many times it's called", () => {
    const stack = createStack(classOrFunc, isFunc);
    const items = ["one", "two", "three"];
    items.forEach(item => stack.push(item));

    expect(stack.peek()).toBe(items.slice(-1)[0]);
    expect(stack.peek()).toBe(items.slice(-1)[0]);
  });
};

describe("StackString", describeFn(StackString));

describe("StackArray", describeFn(StackArray));

describe("stackObject functional", describeFn(stackObject, true));
