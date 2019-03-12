// Recursion intro tasks

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
  result = base,
): number => {
  return expo === 1 ? result : recursiveExponent(base, expo - 1, result * base);
};

//5. Write a function 'recursiveMultiplier' that takes two arguments, 'arr and num', and multiplies each arr value into by num and returns an array of the values.

export const recursiveMultiplier = (
  arr: number[],
  num: number,
  iter = arr.length,
): number[] => {
  if (iter === 0) return arr;
  arr[iter - 1] *= num;
  return recursiveMultiplier(arr, num, iter - 1);
};

export const recursiveMultiplier2 = (arr: number[], num: number): number[] => {
  if (arr.length === 0) return arr;
  const last = arr.pop()!;
  recursiveMultiplier2(arr, num);
  arr.push(last * num);
  return arr;
};

//6. Write a function 'recursiveReverse' that takes an array and uses recursion to return its contents in reverse

export const recursiveReverse = <T>(
  arr: T[],
  iter = arr.length,
  reversed: T[] = [],
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

// Recursion main tasks

export const factorial = (num: number, result: number = 1): number => {
  if (num === 1) return result;
  return factorial(num - 1, result * num);
};

export const fibonacci = (step: number): number => {
  if (step === 0 || step === 1) return step;

  const compute = (
    curr: number = 1,
    prev: number = 0,
    iter: number = step,
  ): number => {
    if (iter === 1) return curr;
    return compute(curr + prev, curr, iter - 1);
  };
  return compute();
};

export const flatten = (arg: any[]): any[] => {
  let flatArr: any[] = [];

  arg.forEach(item => {
    if (Array.isArray(item)) {
      flatArr.push(...flatten(item));
    } else {
      flatArr.push(item);
    }
  });

  return flatArr;
};

export const reverse = (str: string): string => {
  if (str === '') return '';
  return reverse(str.slice(1)) + str[0];
};

export const greatestCommonDivisor = (a: number, b: number): number => {
  return !b ? a : greatestCommonDivisor(b, a % b);
};

export const stringPermutation = (str: string): string[] => {
  let result: string[] = [];
  if (str.length === 1) return [str];
  if (str.length === 2) return [str[1], str[0]];

  str.split('').forEach((char, idx, arr) => {
    const sub = arr.slice();
    sub.splice(idx, 1);
    stringPermutation(sub.join('')).forEach(perm => result.push(char + perm));
  });

  return result;
};

