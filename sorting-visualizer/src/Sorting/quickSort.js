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

const partition = (arr, left, right, animations) => {
  const mid = Math.floor((left + right) / 2);
  let pivIdx = mid;
  const piv = arr[pivIdx];

  let i = left;
  let j = right;
  while (i < pivIdx && j > pivIdx) {
    if (arr[i] > piv && arr[j] < piv) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
      j -= 1;
    } else if (arr[i] <= piv) {
      i += 1;
    } else {
      j -= 1;
    }
  }
  if (j == mid) {
    let idx = i;
    for (let k = i; k < mid; k++) {
      if (arr[k] <= piv) {
        [arr[k], arr[idx]] = [arr[idx], arr[k]];
        idx += 1;
      }
    }
    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];
    pivIdx = idx;
  } else {
    let idx = j;
    for (let k = j; k > mid; k--) {
      if (arr[k] >= piv) {
        [arr[k], arr[idx]] = [arr[idx], arr[k]];
        idx -= 1;
      }
    }
    [arr[idx], arr[mid]] = [arr[mid], arr[idx]];
    pivIdx = idx;
  }
  return pivIdx;
};

export default getQuickSortAnimations;
