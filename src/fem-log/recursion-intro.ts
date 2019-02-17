//1. Write a function that loops through the numbers n down to 0. If you haven't done so try using a while loop to do this.
let num = 10;

while (num >= 1) {
  // console.log(num);
  num--;
}

//2. Next, try looping just like above except using recursion
const iterNum = (num: number) => {
  if (num === 0) return;
  // console.log(num);
  iterNum(--num);
};

iterNum(10);

//3.Write a function 'exponent' that takes two arguments base, and expo, uses a while loop to return the exponenet value of the base.
const exponent = (base: number, expo: number) => {
  let result = 1;
  while (expo--) {
    result *= base;
  }
  return result;
};
// console.log(exponent(3, 4));

//4. Write a function 'RecursiveExponent' that takes two arguments base, and expo, recursively returns exponent value of the base.
const recursiveExponent = (
  base: number,
  expo: number,
  result = base
): number => {
  return expo === 1 ? result : recursiveExponent(base, expo - 1, result * base);
};
// console.log(recursiveExponent(3, 4));

//5. Write a function 'recursiveMultiplier' that takes two arguments, 'arr and num', and multiplies each arr value into by num and returns an array of the values.
const recursiveMultiplier = (
  arr: number[],
  num: number,
  iter = arr.length
): number[] => {
  if (iter === 0) return arr;
  arr[iter - 1] *= num;
  return recursiveMultiplier(arr, num, iter - 1);
};
// console.log(recursiveMultiplier([2, 4, 6, 8], 3));

//6. Write a function 'recursiveReverse' that takes an array and uses recursion to return its contents in reverse
const recursiveReverse = <T>(
  arr: T[],
  iter = arr.length,
  reversed: T[] = []
): T[] => {
  if (iter === 0) return reversed;
  reversed.push(arr[iter - 1]);
  return recursiveReverse(arr, iter - 1, reversed);
};

// console.log(recursiveReverse<number>([1, 2, 3, 4, 5]));

const recursiveReverse2 = <T>(arr: T[], iter = arr.length): T[] => {
  if (iter === 0) return arr;
  arr.push(arr.splice(iter - 1, 1)[0]);
  return recursiveReverse2(arr, iter - 1);
};

// console.log(recursiveReverse2([1, 2, 3, 4, 5]));
