const getQuickSortAnimations = (arr) => {
  const animations = [];
  const statistics = [{ comparisons: 0, accesses: 0 }];
  if (arr.length <= 1) {
    statistics[0].comparisons += 1;
    return { animations, statistics };
  }
  statistics[0].comparisons += 1;
  // const newArr = arr.slice().sort((a, b) => a - b);
  quickSortHelp(arr, 0, arr.length - 1, animations, statistics);
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

const quickSortHelp = (arr, left, right, animations, statistics) => {
  if (left >= right) {
    statistics[statistics.length - 1].comparisons += 1;
    return;
  }
  statistics[statistics.length - 1].comparisons += 1;
  let pivot = partition(arr, left, right, animations, statistics);
  statistics[statistics.length - 1].comparisons += 1;
  quickSortHelp(arr, left, pivot - (pivot === right), animations, statistics);
  quickSortHelp(arr, pivot + 1, right, animations, statistics);
};

const partition = (arr, left, right, animations, statistics) => {
  const mid = Math.floor((left + right) / 2);
  let pivIdx = mid;
  const piv = arr[pivIdx];
  animations.push({ type: "pivot", action: "start", idx: pivIdx });

  const { comparisons, accesses } = statistics[statistics.length - 1];
  statistics.push({ comparisons: comparisons, accesses: accesses + 1 });

  let i = left;
  let j = right;
  while (i < pivIdx && j > pivIdx) {
    animations.push({ type: "compare", action: "start", bars: [i, j] });
    animations.push({ type: "compare", action: "end", bars: [i, j] });

    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons, accesses: accesses });
    statistics.push({ comparisons: comparisons, accesses: accesses });

    if (arr[i] > piv && arr[j] < piv) {
      animations.push({
        type: "swap",
        bars: [i, j],
        heights: [arr[j], arr[i]],
      });
      [arr[i], arr[j]] = [arr[j], arr[i]];

      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons + 2, accesses: accesses + 4 });

      i += 1;
      j -= 1;
    } else if (arr[i] <= piv) {
      statistics[statistics.length - 1].comparison += 3;
      statistics[statistics.length - 1].accesses += 3;
      i += 1;
    } else {
      statistics[statistics.length - 1].comparison += 3;
      statistics[statistics.length - 1].accesses += 3;
      j -= 1;
    }
  }
  statistics[statistics.length - 1].comparison += 2;
  if (j === mid) {
    statistics[statistics.length - 1].comparisons += 1;
    let idx = i;
    for (let k = i; k < mid; k++) {
      animations.push({ type: "compare", action: "start", bars: [k, k] });
      animations.push({ type: "compare", action: "end", bars: [k, k] });

      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons, accesses: accesses });
      statistics.push({ comparisons: comparisons, accesses: accesses });

      if (arr[k] <= piv) {
        animations.push({
          type: "swap",
          bars: [k, idx],
          heights: [arr[idx], arr[k]],
        });
        [arr[k], arr[idx]] = [arr[idx], arr[k]];

        const { comparisons, accesses } = statistics[statistics.length - 1];
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 3,
        });

        idx += 1;
      }
    }
    const { comparisons, accesses } = statistics[statistics.length - 1];

    animations.push({
      type: "swap",
      bars: [idx, mid],
      heights: [arr[mid], arr[idx]],
    });
    statistics.push({ comparisons: comparisons, accesses: accesses });

    animations.push({ type: "pivot", action: "end", idx: pivIdx });
    statistics.push({ comparisons: comparisons, accesses: accesses });

    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];

    statistics.push({ comparisons: comparisons, accesses: accesses + 2 });

    pivIdx = idx;
    animations.push({ type: "pivot", action: "start", idx: pivIdx });
  } else {
    let idx = j;
    statistics[statistics.length - 1].comparisons += 1;
    for (let k = j; k > mid; k--) {
      animations.push({ type: "compare", action: "start", bars: [k, k] });
      animations.push({ type: "compare", action: "end", bars: [k, k] });

      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons, accesses: accesses });
      statistics.push({ comparisons: comparisons, accesses: accesses });

      if (arr[k] >= piv) {
        animations.push({
          type: "swap",
          bars: [k, idx],
          heights: [arr[idx], arr[k]],
        });
        [arr[k], arr[idx]] = [arr[idx], arr[k]];

        const { comparisons, accesses } = statistics[statistics.length - 1];
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 3,
        });

        idx -= 1;
      }
    }

    const { comparisons, accesses } = statistics[statistics.length - 1];

    animations.push({
      type: "swap",
      bars: [idx, mid],
      heights: [arr[mid], arr[idx]],
    });

    statistics.push({ comparisons: comparisons, accesses: accesses });

    animations.push({ type: "pivot", action: "end", idx: pivIdx });

    statistics.push({ comparisons: comparisons, accesses: accesses });

    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];

    statistics.push({ comparisons: comparisons, accesses: accesses + 2 });

    pivIdx = idx;
    animations.push({ type: "pivot", action: "start", idx: pivIdx });
  }
  animations.push({ type: "pivot", action: "end", idx: pivIdx });

  statistics.push({
    comparisons: statistics[statistics.length - 1].comparisons,
    accesses: statistics[statistics.length - 1].accesses,
  });

  return pivIdx;
};

export default getQuickSortAnimations;
