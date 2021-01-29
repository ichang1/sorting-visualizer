const getShellSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  // const newArr = arr.slice().sort((a, b) => a - b);
  shellSort(arr, animations);
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

const shellSort = (arr, animations) => {
  const gaps = [];
  for (let k = 0; k < arr.length; k++) {
    if (2 ** k + 1 < arr.length) {
      gaps.push(2 ** k + 1);
    } else {
      break;
    }
  }

  for (let j = gaps.length - 1; j >= 1; j--) {
    const gap = gaps[j];
    for (let i = 0; i <= arr.length - gap - 1; i++) {
      animations.push({
        type: "compare",
        action: "start",
        bars: [i, i + gap],
      });
      if (arr[i] > arr[i + gap]) {
        animations.push({
          type: "swap",
          bars: [i, i + gap],
          heights: [arr[i + gap], arr[i]],
        });
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
      }
      animations.push({
        type: "compare",
        action: "end",
        bars: [i, i + gap],
      });
    }
  }
  insertionSort(arr, animations);
  //last gap of 1 -> insertion sort
};

const insertionSort = (arr, animations) => {
  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    let last = i - 1;
    for (let k = i - 1; k >= 0; k--) {
      animations.push({ type: "check", action: "start", bar: k });
      if (arr[k] > val) {
        animations.push({ type: "shift", bar: k, height: arr[k] });
        animations.push({ type: "check", action: "end", bar: k });
        arr[k + 1] = arr[k];
        last -= 1;
      } else {
        animations.push({ type: "check", action: "end", bar: k });
        break;
      }
    }
    animations.push({ type: "insert", bar: last + 1, height: val });
    arr[last + 1] = val;

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
