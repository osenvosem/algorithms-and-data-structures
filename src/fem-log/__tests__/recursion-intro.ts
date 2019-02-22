import {
  iterWithWhile,
  iterNum,
  exponent,
  recursiveExponent,
  recursiveMultiplier,
  recursiveReverse,
  recursiveReverse2
} from "../recursion-intro";

describe("Recursion intro", () => {
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

  test("5 recursiveMultiplier", () => {
    const multiplier = 4;
    const arr = [1, 3, 5, 7];
    const expectedResult = arr.map(num => num * multiplier);

    expect(recursiveMultiplier(arr, multiplier)).toEqual(expectedResult);
  });

  test("6 recursiveReverse", () => {
    const arr = [2, 4, 6, 8];
    const expectedResult = arr.slice().reverse();

    expect(recursiveReverse(arr)).toEqual(expectedResult);
    expect(recursiveReverse2(arr)).toEqual(expectedResult);
  });
});
