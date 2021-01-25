const getHeapSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  // const newArr = arr.slice().sort((a, b) => a - b);
  heapSort(arr, animations);
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] !== newArr[i]) {
  //     console.log(false, i);
  //     console.log(arr);
  //     console.log(newArr);
  //     break;
  //   }
  // }
  // console.log(true);
  return animations;
};

const heapSort = (arr, animations) => {
  const start = Math.floor(arr.length / 2);
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, i, arr.length - 1, animations);
  }
  // console.log(arr);
  //the tree should be a max heap
  for (let i = arr.length - 1; i > 0; i--) {
    //move cur max to the back
    //cur max is at index 0
    animations.push({ type: "swap", bars: [0, i], heights: [arr[i], arr[0]] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // console.log(arr, i);
    //heapify down on root
    heapifyDown(arr, 0, i - 1, animations);
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

const heapifyDown = (arr, idx, endIdx, animations) => {
  while (idx <= endIdx) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    if (leftIdx > endIdx && rightIdx > endIdx) {
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
      if (arr[larger] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, larger],
          heights: [arr[larger], arr[idx]],
        });
        [arr[idx], arr[larger]] = [arr[larger], arr[idx]];
        idx = larger;
      } else {
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
      if (arr[leftIdx] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, leftIdx],
          heights: [arr[leftIdx], arr[idx]],
        });
        [arr[idx], arr[leftIdx]] = [arr[leftIdx], arr[idx]];
        idx = leftIdx;
      } else {
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
      if (arr[rightIdx] > arr[idx]) {
        animations.push({
          type: "swap",
          bars: [idx, rightIdx],
          heights: [arr[rightIdx], arr[idx]],
        });
        [arr[idx], arr[rightIdx]] = [arr[rightIdx], arr[idx]];
        idx = rightIdx;
      } else {
        return;
      }
    }
  }
};

export default getHeapSortAnimations;
