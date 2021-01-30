const getBitonicSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  //   const newArr = arr.slice().sort((a, b) => a - b);
  bitonicSort(arr, animations);
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] != newArr[i]) {
  //       console.log(false);
  //       console.log(arr);
  //       console.log(newArr);
  //     }
  //   }
  //   console.log(true);
  return animations;
};

const bitonicSort = (arr, animations) => {
  // true for ascending, false for descending
  bitonicSortHelp(arr, 0, arr.length, true, animations);
};

const bitonicSortHelp = (arr, start, n, dir, animations) => {
  if (n > 1) {
    let m = Math.floor(n / 2);
    bitonicSortHelp(arr, start, m, !dir, animations);
    bitonicSortHelp(arr, start + m, n - m, dir, animations);
    merge(arr, start, n, dir, animations);
  }
};

const merge = (arr, start, n, dir, animations) => {
  if (n > 1) {
    const m = maxPowerTwoLessThan(n);
    for (let i = start; i < start + n - m; i++) {
      if (dir === arr[i] > arr[i + m]) {
        //direction is the same as inversion direction
        [arr[i], arr[i + m]] = [arr[i + m], arr[i]];
      }
    }
    merge(arr, start, m, dir);
    merge(arr, start + m, n - m, dir);
  }
};

const maxPowerTwoLessThan = (n) => {
  let k = 1;
  while (k > 0 && k < n) {
    k = k << 1;
  }
  //right shift b/c after loop, k is larger than n
  return k >>> 1;
};

export default getBitonicSortAnimations;
