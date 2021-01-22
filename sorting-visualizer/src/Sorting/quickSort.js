const getQuickSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  const newArr = arr.slice().sort((a, b) => a - b);
  quickSortHelp(arr, 0, arr.length - 1, animations);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== newArr[i]) {
      console.log(false);
      console.log(arr);
      console.log(newArr);
      break;
    }
  }
  console.log(true);
  return animations;
};

const quickSortHelp = (arr, left, right, animations) => {
  if (left >= right) return;
  let pivot = partition(arr, left, right, animations);
  quickSortHelp(arr, left, pivot - (pivot === right), animations);
  quickSortHelp(arr, pivot + 1, right, animations);
};

// const partition = (arr, left, right, animations) => {
//   let pivIdx = Math.floor((left + right) / 2);
//   const pivotVal = arr[pivIdx];
//   animations.push({ type: "pivot", idx: Math.floor((left + right) / 2) });
//   //index of left-most element so far that is larger than the pivot
//   let i = left;
//   let j = right;
//   while (i < j) {
//     if (arr[i] < pivotVal && arr[j] > pivotVal) {
//       i += 1;
//       j -= 1;
//     } else if (arr[i] < pivotVal) {
//       i += 1;
//     } else if (arr[j] > pivotVal) {
//       j -= 1;
//     } else {
//       //not both are equal to pivotVal
//       // at least one is on the wrong side
//       // the other might be on the wrong side as well or is pivotVal
//       if (i == pivIdx) {
//         pivIdx = j;
//       } else if (j == pivIdx) {
//         pivIdx = i;
//       }
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//   }
//   return pivIdx;
// };
const partition = (arr, left, right, animations) => {
  const pivotVal = arr[right];
  animations.push({ type: "pivot", idx: right });
  //index of left-most element so far that is larger than the pivot
  let idx = left;
  for (let i = left; i <= right - 1; i++) {
    animations.push({ type: "begin-comparison", i: i, idx: idx });
    animations.push({ type: "end-comparison", i: i, idx: idx });
    if (arr[i] <= pivotVal) {
      animations.push({ type: "swap", i: i, idx: idx });
      [arr[i], arr[idx]] = [arr[idx], arr[i]];
      idx += 1;
    }
  }
  animations.push({ type: "swap", i: idx, idx: right });
  [arr[right], arr[idx]] = [arr[idx], arr[right]];
  return idx;
};

export default getQuickSortAnimations;
