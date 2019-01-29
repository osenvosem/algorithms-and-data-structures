export function mergeSort<T>(array: T[]): T[] {
  if (array.length < 2) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge<T>(mergeSort<T>(left), mergeSort<T>(right));
}

function merge<T>(left: T[], right: T[]): T[] {
  let sorted: T[] = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift()!);
    } else {
      sorted.push(right.shift()!);
    }
  }

  const results = [...sorted, ...left, ...right];

  return results;
}

const numbers = [10, 5, 4, 7, 8, 2, 1, 3, 9, 6];

mergeSort(numbers);
