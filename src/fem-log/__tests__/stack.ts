import { StackString, StackArray, stackObject, Stack } from "../stack";

const createStack = (classOrFunc: any, isFunc: boolean) => {
  return isFunc ? classOrFunc() : new classOrFunc();
};

const describeFn = (classOrFunc: any, isFunc = false) => () => {
  it("0 items", () => {
    const stack = createStack(classOrFunc, isFunc);
    expect(stack.size()).toBe(0);
    expect(stack.pop()).toBeUndefined();
  });

  it("1 item", () => {
    const stack = createStack(classOrFunc, isFunc);
    const item = "test item";
    stack.push(item);

    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(item);
  });

  it("many items", () => {
    const stack = createStack(classOrFunc, isFunc);
    const items = ["one", "two", "three"];
    items.forEach(item => stack.push(item));

    expect(stack.size()).toBe(items.length);
    expect(stack.pop()).toBe(items.pop());
  });
};

describe("StackString", describeFn(StackString));

describe("StackArray", describeFn(StackArray));

describe("stack object functional", describeFn(stackObject, true));
