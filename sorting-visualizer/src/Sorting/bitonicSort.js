const getBitonicSortAnimations = (arr) => {
  const animations = [];
  const statistics = [{ comparisons: 0, accesses: 0 }];
  if (arr.length <= 1) {
    statistics[0].comparisons += 1;
    return { animations, statistics };
  }
  //   const newArr = arr.slice().sort((a, b) => a - b);
  bitonicSort(arr, animations, statistics);
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] != newArr[i]) {
  //       console.log(false);
  //       console.log(arr);
  //       console.log(newArr);
  //     }
  //   }
  //   console.log(true);
  return { animations, statistics };
};

const bitonicSort = (arr, animations, statistics) => {
  // true for ascending, false for descending
  bitonicSortHelp(arr, 0, arr.length, true, animations, statistics);
};

const bitonicSortHelp = (arr, start, n, dir, animations, statistics) => {
  if (n > 1) {
    const m = Math.floor(n / 2);
    bitonicSortHelp(arr, start, m, !dir, animations, statistics);
    bitonicSortHelp(arr, start + m, n - m, dir, animations, statistics);
    merge(arr, start, n, dir, animations, statistics);
  }
};

const merge = (arr, start, n, dir, animations, statistics) => {
  if (n > 1) {
    const m = maxPowerTwoLessThan(n);
    for (let i = start; i < start + n - m; i++) {
      animations.push({ type: "compare", action: "start", bars: [i, i + m] });

      let { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons, accesses: accesses });

      if (dir === arr[i] > arr[i + m]) {
        //direction is the same as inversion direction
        animations.push({
          type: "swap",
          bars: [i, i + m],
          heights: [arr[i + m], arr[i]],
        });
        [arr[i], arr[i + m]] = [arr[i + m], arr[i]];

        ({ comparisons, accesses } = statistics[statistics.length - 1]);
        statistics.push({
          comparisons: comparisons + 2,
          accesses: accesses + 4,
        });
      }
      animations.push({ type: "compare", action: "end", bars: [i, i + m] });
      ({ comparisons, accesses } = statistics[statistics.length - 1]);
      statistics.push({
        comparisons: comparisons,
        accesses: accesses,
      });
    }
    merge(arr, start, m, dir, animations, statistics);
    merge(arr, start + m, n - m, dir, animations, statistics);
  }
  statistics[statistics.length - 1].comparisons += 1;
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
