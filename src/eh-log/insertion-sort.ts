export function insertionSort<T>(array: T[]) {
  let i, j;

  for (i = 1; i < array.length; i++) {
    for (j = 0; j < i; j++) {
      if (array[i] < array[j]) {
        const [item] = array.splice(i, 1);
        array.splice(j, 0, item);
      }
    }
  }

  return array;
}

const numbers = [10, 5, 2, 3, 8, 6, 7, 9, 1, 4];

console.log(insertionSort<number>(numbers));
