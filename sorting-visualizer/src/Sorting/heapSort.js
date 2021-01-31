const getHeapSortAnimations = (arr) => {
  const animations = [];
  const statistics = [{ comparisons: 0, accesses: 0 }];
  if (arr.length <= 1) {
    statistics[0].comparisons += 1;
    return { animations, statistics };
  }
  statistics[0].comparisons += 1;
  // const newArr = arr.slice().sort((a, b) => a - b);
  heapSort(arr, animations, statistics);
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] !== newArr[i]) {
  //     console.log(false, i);
  //     console.log(arr);
  //     console.log(newArr);
  //     break;
  //   }
  // }
  // console.log(true);
  return { animations, statistics };
};

const heapSort = (arr, animations, statistics) => {
  const start = Math.floor(arr.length / 2);
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, i, arr.length - 1, animations, statistics);
  }
  //the tree should be a max heap
  for (let i = arr.length - 1; i > 0; i--) {
    //move cur max to the back
    //cur max is at index 0
    animations.push({ type: "swap", bars: [0, i], heights: [arr[i], arr[0]] });
    [arr[0], arr[i]] = [arr[i], arr[0]];

    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons, accesses: accesses + 2 });

    //heapify down on root
    heapifyDown(arr, 0, i - 1, animations, statistics);
  }
};

// const heapifyUp = (arr, idx, animations) => {
//   while (idx !== 0) {
//     const parentIdx = Math.floor((idx - 1) / 2);
//     if (arr[idx] > arr[parentIdx]) {
//       //swap
//       [arr[parentIdx], arr[idx]] = [arr[idx], arr[parentIdx]];
//       idx = parentIdx;
//     } else {
//       return;
//     }
//   }
// };

const heapifyDown = (arr, idx, endIdx, animations, statistics) => {
  while (idx <= endIdx) {
    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons, accesses: accesses });
    animations.push({ type: "parent", action: "start", bar: idx });
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;

    if (leftIdx > endIdx && rightIdx > endIdx) {
      animations.push({ type: "parent", action: "end", bar: idx });
      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons, accesses: accesses });
      return;
    } else if (leftIdx <= endIdx && rightIdx <= endIdx) {
      const larger = arr[leftIdx] >= arr[rightIdx] ? leftIdx : rightIdx;
      animations.push({
        type: "compare",
        action: "start",
        bars: [leftIdx, rightIdx],
      });
      animations.push({
        type: "compare",
        action: "end",
        bars: [leftIdx, rightIdx],
      });
      let { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons + 3, accesses: accesses + 2 });
      statistics.push({ comparisons: comparisons + 3, accesses: accesses + 2 });

      ({ comparisons, accesses } = statistics[statistics.length - 1]);
      if (arr[larger] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, larger],
          heights: [arr[larger], arr[idx]],
        });
        [arr[idx], arr[larger]] = [arr[larger], arr[idx]];
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
        animations.push({ type: "parent", action: "end", bar: idx });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
        idx = larger;
      } else {
        animations.push({ type: "parent", action: "end", bar: idx });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 1,
        });
        return;
      }
    } else if (leftIdx <= endIdx) {
      animations.push({
        type: "compare",
        action: "start",
        bars: [leftIdx, leftIdx],
      });
      animations.push({
        type: "compare",
        action: "end",
        bars: [leftIdx, leftIdx],
      });

      let { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons + 3, accesses: accesses });
      statistics.push({ comparisons: comparisons + 3, accesses: accesses });

      ({ comparisons, accesses } = statistics[statistics.length - 1]);
      if (arr[leftIdx] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, leftIdx],
          heights: [arr[leftIdx], arr[idx]],
        });
        [arr[idx], arr[leftIdx]] = [arr[leftIdx], arr[idx]];
        animations.push({ type: "parent", action: "end", bar: idx });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
        idx = leftIdx;
      } else {
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 2,
        });
        animations.push({ type: "parent", action: "end", bar: idx });
        return;
      }
    } else {
      animations.push({
        type: "compare",
        action: "start",
        bars: [rightIdx, rightIdx],
      });
      animations.push({
        type: "compare",
        action: "end",
        bars: [rightIdx, rightIdx],
      });
      let { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({ comparisons: comparisons + 3, accesses: accesses });
      statistics.push({ comparisons: comparisons + 3, accesses: accesses });
      ({ comparisons, accesses } = statistics[statistics.length - 1]);
      if (arr[rightIdx] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, rightIdx],
          heights: [arr[rightIdx], arr[idx]],
        });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 4,
        });

        [arr[idx], arr[rightIdx]] = [arr[rightIdx], arr[idx]];
        animations.push({ type: "parent", action: "end", bar: idx });
        idx = rightIdx;
      } else {
        animations.push({ type: "parent", action: "end", bar: idx });
        statistics.push({
          comparisons: comparisons + 1,
          accesses: accesses + 2,
        });
        return;
      }
    }
  }
};

export default getHeapSortAnimations;
