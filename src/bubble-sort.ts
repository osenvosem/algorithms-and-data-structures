function bubbleSort<T>(array: T[]) {
  let swapped = false;

  do {
    swapped = false;

    array.forEach((item, idx) => {
      if (item > array[idx + 1]) {
        array[idx] = array[idx + 1];
        array[idx + 1] = item;

        swapped = true;
      }
    });
  } while (swapped);

  return array;
}

const numbers = [10, 5, 6, 3, 2, 8, 9, 4, 7, 1];

console.log(bubbleSort<number>(numbers));
