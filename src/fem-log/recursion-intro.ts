//1. Write a function that loops through the numbers n down to 0. If you haven't done so try using a while loop to do this.

interface TCallback {
  (arg: number): void;
}

export const iterWithWhile = (num: number, cb: TCallback): void => {
  while (num >= 1) {
    cb(num);
    num--;
  }
};

//2. Next, try looping just like above except using recursion

export const iterNum = (num: number, c: TCallback) => {
  if (num === 0) return;
  c(num);
  iterNum(--num, c);
};

//3.Write a function 'exponent' that takes two arguments base, and expo, uses a while loop to return the exponenet value of the base.

export const exponent = (base: number, expo: number) => {
  let result = 1;
  while (expo--) {
    result *= base;
  }
  return result;
};

//4. Write a function 'RecursiveExponent' that takes two arguments base, and expo, recursively returns exponent value of the base.

export const recursiveExponent = (
  base: number,
  expo: number,
  result = base
): number => {
  return expo === 1 ? result : recursiveExponent(base, expo - 1, result * base);
};

//5. Write a function 'recursiveMultiplier' that takes two arguments, 'arr and num', and multiplies each arr value into by num and returns an array of the values.

export const recursiveMultiplier = (
  arr: number[],
  num: number,
  iter = arr.length
): number[] => {
  if (iter === 0) return arr;
  arr[iter - 1] *= num;
  return recursiveMultiplier(arr, num, iter - 1);
};

//6. Write a function 'recursiveReverse' that takes an array and uses recursion to return its contents in reverse

export const recursiveReverse = <T>(
  arr: T[],
  iter = arr.length,
  reversed: T[] = []
): T[] => {
  if (iter === 0) return reversed;
  reversed.push(arr[iter - 1]);
  return recursiveReverse(arr, iter - 1, reversed);
};

export const recursiveReverse2 = <T>(arr: T[], iter = arr.length): T[] => {
  if (iter === 0) return arr;
  arr.push(arr.splice(iter - 1, 1)[0]);
  return recursiveReverse2(arr, iter - 1);
};
