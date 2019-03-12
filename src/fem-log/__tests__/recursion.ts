import {
  iterWithWhile,
  iterNum,
  exponent,
  recursiveExponent,
  recursiveMultiplier,
  recursiveMultiplier2,
  recursiveReverse,
  recursiveReverse2,
  factorial,
  fibonacci,
  flatten,
  reverse,
  greatestCommonDivisor,
  stringPermutation
} from "../recursion";

describe("Recursion intro tasks", () => {
  test("1 iterWithWhile", () => {
    const cb = jest.fn();
    const times = 10;

    iterWithWhile(times, cb);

    expect(cb).toHaveBeenCalledTimes(times);
  });

  test("2 iterNum", () => {
    const cb = jest.fn();
    const times = 10;

    iterNum(times, cb);

    expect(cb).toHaveBeenCalledTimes(times);
  });

  test("3 exponent", () => {
    expect(exponent(3, 4)).toBe(3 ** 4);
  });

  test("4 recursiveExponent", () => {
    expect(recursiveExponent(3, 4)).toBe(3 ** 4);
  });

  const recursiveMultiplierTest = (fun: any) => () => {
    () => {
      const multiplier = 4;
      const arr = [1, 3, 5, 7];
      const expectedResult = arr.map(num => num * multiplier);

      expect(fun(arr, multiplier)).toEqual(expectedResult);
    };
  };
  test("5 recursiveMultiplier", recursiveMultiplierTest(recursiveMultiplier));
  test("5 recursiveMultiplier2", recursiveMultiplierTest(recursiveMultiplier2));

  test("6 recursiveReverse", () => {
    const arr = [2, 4, 6, 8];
    const expectedResult = arr.slice().reverse();

    expect(recursiveReverse(arr)).toEqual(expectedResult);
    expect(recursiveReverse2(arr)).toEqual(expectedResult);
  });
});

describe("Recursion main tasks", () => {
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
