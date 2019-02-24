import {
  factorial,
  fibonacci,
  flatten,
  reverse,
  greatestCommonDivisor,
  stringPermutation
} from "../recursion";

describe("recursion", () => {
  test("factorial", () => {
    expect(factorial(5)).toBe(120);
  });

  test("fibonacci", () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(8)).toBe(21);
  });

  test("flatten", () => {
    const arg = [1, [2], [3, [[4]]]];
    const expected = [1, 2, 3, 4];
    expect(flatten(arg)).toEqual(expected);
  });

  test("reverse", () => {
    const testStr = "Hello there!";
    const expected = testStr
      .split("")
      .reverse()
      .join("");

    expect(reverse(testStr)).toBe(expected);
  });

  test("greatestCommonDiviser", () => {
    expect(greatestCommonDivisor(54, 24)).toBe(6);
  });

  test("stringPermutation", () => {
    expect(stringPermutation("abc")).toHaveLength(6);
  });
});
