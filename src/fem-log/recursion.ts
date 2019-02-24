export const factorial = (num: number, result: number = 1): number => {
  if (num === 1) return result;
  return factorial(num - 1, result * num);
};

export const fibonacci = (step: number): number => {
  if (step === 0 || step === 1) return step;

  const compute = (
    curr: number = 1,
    prev: number = 0,
    iter: number = step
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
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
};

export const greatestCommonDivisor = (a: number, b: number): number => {
  return !b ? a : greatestCommonDivisor(b, a % b);
};

export const stringPermutation = (str: string): string[] => {
  let result: string[] = [];
  if (str.length === 1) return [str];
  if (str.length === 2) return [str[1], str[0]];

  str.split("").forEach((char, idx, arr) => {
    const sub = arr.slice();
    sub.splice(idx, 1);
    stringPermutation(sub.join("")).forEach(perm => result.push(char + perm));
  });

  return result;
};
