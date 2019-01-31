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

  it("must return a string if maximum capacity is exceeded", () => {
    const stack = createStack(classOrFunc, isFunc);
    stack.setMaxCapacity(10);
    Array.from({ length: 10 }, (_, idx) => stack.push(`Item: ${++idx}`));

    expect(typeof stack.push("redundant item")).toBe("string");
  });

  it("must determine if the stack contains the value", () => {
    const stack = createStack(classOrFunc, isFunc);
    const items = ["one", "two", "three"];
    items.forEach(item => stack.push(item));

    expect(stack.contains("one")).toBe(true);
    expect(stack.contains("two")).toBe(true);
    expect(stack.contains("three")).toBe(true);
    expect(stack.contains("non-existent")).toBe(false);
  });

  it(".until()", () => {
    const stack = createStack(classOrFunc, isFunc);

    expect(stack.until("one")).toBeNull();

    stack.push("one");

    expect(stack.until("one")).toBe(1);

    ["two", "three", "four", "five"].forEach(item => stack.push(item));

    expect(stack.until("four")).toBe(4);
  });
};

describe("StackString", describeFn(StackString));

describe("StackArray", describeFn(StackArray));

describe("stackObject functional", describeFn(stackObject, true));
