const getShellSortAnimations = (arr) => {
  const animations = [];
  const statistics = [{ comparisons: 0, accesses: 0 }];
  if (arr.length <= 1) {
    return { animations, statistics };
  }
  statistics[0].comparisons += 1;
  // const newArr = arr.slice().sort((a, b) => a - b);
  shellSort(arr, animations, statistics);
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] !== newArr[i]) {
  //     console.log(false);
  //     console.log(arr);
  //     console.log(newArr);
  //     break;
  //   }
  // }
  // console.log(true);
  return { animations, statistics };
};

const shellSort = (arr, animations, statistics) => {
  const gaps = [];
  for (let k = 0; k < arr.length; k++) {
    statistics[statistics.length - 1].comparisons += 1;
    if (2 ** k + 1 < arr.length) {
      statistics[statistics.length - 1].comparisons += 1;
      gaps.push(2 ** k + 1);
    } else {
      break;
    }
  }

  for (let j = gaps.length - 1; j >= 1; j--) {
    statistics[statistics.length - 1].comparisons += 1;
    const gap = gaps[j];
    for (let i = 0; i <= arr.length - gap - 1; i++) {
      let { comparisons, accesses } = statistics[statistics.length - 1];

      animations.push({
        type: "compare",
        action: "start",
        bars: [i, i + gap],
      });
      statistics.push({ comparisons: comparisons + 1, accesses: accesses });
      if (arr[i] > arr[i + gap]) {
        animations.push({
          type: "swap",
          bars: [i, i + gap],
          heights: [arr[i + gap], arr[i]],
        });
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];

        ({ comparisons, accesses } = statistics[statistics.length - 1]);
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
      }
      animations.push({
        type: "compare",
        action: "end",
        bars: [i, i + gap],
      });
      ({ comparisons, accesses } = statistics[statistics.length - 1]);
      statistics.push({
        comparisons: comparisons,
        accesses: accesses,
      });
    }
  }
  insertionSort(arr, animations, statistics);
  //last gap of 1 -> insertion sort
};

const insertionSort = (arr, animations, statistics) => {
  for (let i = 1; i < arr.length; i++) {
    statistics[statistics.length - 1].comparisons += 1;
    const val = arr[i];
    statistics[statistics.length - 1].accesses += 1;
    let last = i - 1;
    let { comparisons, accesses } = statistics[statistics.length - 1];
    for (let k = i - 1; k >= 0; k--) {
      animations.push({ type: "check", action: "start", bar: k });
      statistics.push({ comparisons: comparisons + 1, accesses: accesses });
      if (arr[k] > val) {
        animations.push({ type: "shift", bar: k, height: arr[k] });
        animations.push({ type: "check", action: "end", bar: k });
        arr[k + 1] = arr[k];

        ({ comparisons, accesses } = statistics[statistics.length - 1]);
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 3,
        });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 3,
        });
        last -= 1;
      } else {
        animations.push({ type: "check", action: "end", bar: k });
        ({ comparisons, accesses } = statistics[statistics.length - 1]);
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 1,
        });
        break;
      }
    }
    animations.push({ type: "insert", bar: last + 1, height: val });
    arr[last + 1] = val;
    ({ comparisons, accesses } = statistics[statistics.length - 1]);
    statistics.push({
      comparisons: comparisons,
      accesses: accesses + 1,
    });

    // animations.push({ type: "comparison", action: "start", bars: [i - 1, i] });
    // while (j >= 0 && arr[j] > val) {
    //   //move arr[j] up 1 index
    //   animations.push({ type: "height", bar: j + 1, height: arr[j] });
    //   arr[j + 1] = arr[j];
    //   j -= 1;
    // }
    // arr[j + 1] = val;
    // animations.push({ type: "height", bar: j + 1, height: val });
  }
};

export default getShellSortAnimations;
