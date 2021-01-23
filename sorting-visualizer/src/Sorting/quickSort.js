const getQuickSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  // const newArr = arr.slice().sort((a, b) => a - b);
  quickSortHelp(arr, 0, arr.length - 1, animations);
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] !== newArr[i]) {
  //     console.log(false);
  //     console.log(arr);
  //     console.log(newArr);
  //     break;
  //   }
  // }
  // console.log(true);
  return animations;
};

const quickSortHelp = (arr, left, right, animations) => {
  if (left >= right) return;
  let pivot = partition(arr, left, right, animations);
  quickSortHelp(arr, left, pivot - (pivot === right), animations);
  quickSortHelp(arr, pivot + 1, right, animations);
};

const partition = (arr, left, right, animations) => {
  const mid = Math.floor((left + right) / 2);
  let pivIdx = mid;
  const piv = arr[pivIdx];
  animations.push({ type: "pivot", action: "start", idx: pivIdx });
  let i = left;
  let j = right;
  while (i < pivIdx && j > pivIdx) {
    animations.push({ type: "compare", action: "start", bars: [i, j] });
    animations.push({ type: "compare", action: "end", bars: [i, j] });

    if (arr[i] > piv && arr[j] < piv) {
      animations.push({
        type: "swap",
        bars: [i, j],
        heights: [arr[j], arr[i]],
      });
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
      j -= 1;
    } else if (arr[i] <= piv) {
      i += 1;
    } else {
      j -= 1;
    }
  }
  if (j === mid) {
    let idx = i;
    for (let k = i; k < mid; k++) {
      animations.push({ type: "compare", action: "start", bars: [k, k] });
      animations.push({ type: "compare", action: "end", bars: [k, k] });
      if (arr[k] <= piv) {
        animations.push({
          type: "swap",
          bars: [k, idx],
          heights: [arr[idx], arr[k]],
        });
        [arr[k], arr[idx]] = [arr[idx], arr[k]];
        idx += 1;
      }
    }
    animations.push({
      type: "swap",
      bars: [idx, mid],
      heights: [arr[mid], arr[idx]],
    });
    animations.push({ type: "pivot", action: "end", idx: pivIdx });
    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];
    pivIdx = idx;
    animations.push({ type: "pivot", action: "start", idx: pivIdx });
  } else {
    let idx = j;
    for (let k = j; k > mid; k--) {
      animations.push({ type: "compare", action: "start", bars: [k, k] });
      animations.push({ type: "compare", action: "end", bars: [k, k] });
      if (arr[k] >= piv) {
        animations.push({
          type: "swap",
          bars: [k, idx],
          heights: [arr[idx], arr[k]],
        });
        [arr[k], arr[idx]] = [arr[idx], arr[k]];
        idx -= 1;
      }
    }
    animations.push({
      type: "swap",
      bars: [idx, mid],
      heights: [arr[mid], arr[idx]],
    });
    animations.push({ type: "pivot", action: "end", idx: pivIdx });
    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];
    pivIdx = idx;
    animations.push({ type: "pivot", action: "start", idx: pivIdx });
  }
  animations.push({ type: "pivot", action: "end", idx: pivIdx });
  return pivIdx;
};

export default getQuickSortAnimations;
