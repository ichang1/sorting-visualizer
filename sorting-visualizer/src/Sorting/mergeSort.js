const getMergeSortAnimations = (arr) => {
  const animations = [];
  const statistics = [{ comparisons: 0, accesses: 0 }];
  //every 3 animations determines a sequence of color, uncolor and height change
  //the first one has the indices of the elements being compared
  //the bars at these 2 indices should be some off color
  //the second one has the indices of the elements just compared
  //the bars at these 2 indices should revert back to the normal color
  //the third one has the height change at an index for a combined hill
  if (arr.length <= 1) {
    return { animations, statistics };
  }
  statistics[0].comparisons += 1;
  const aux = arr.slice();
  mergeSortHelp(arr, 0, arr.length - 1, aux, animations, statistics);
  return { animations, statistics };
};

const mergeSortHelp = (arr, left, right, aux, animations, statistics) => {
  if (left === right) return;
  statistics[statistics.length - 1].comparisons += 1;
  const mid = Math.floor((left + right) / 2);
  //get the hills on the left and right
  mergeSortHelp(aux, left, mid, arr, animations, statistics);
  mergeSortHelp(aux, mid + 1, right, arr, animations, statistics);

  //merge the hills into one hill
  merge(arr, left, mid, right, aux, animations, statistics);
};

const merge = (arr, left, mid, right, aux, animations, statistics) => {
  //pointer for array
  let k = left;
  //pointer for left hill in aux
  let i = left;
  // pointer for rigt hill in aux
  let j = mid + 1;
  while (i <= mid && j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    // These are the number of comaprisons and array accesses at this frame

    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons + 3, accesses: accesses + 2 });
    statistics.push({ comparisons: comparisons + 3, accesses: accesses + 2 });

    if (aux[i] <= aux[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, aux[i]]);

      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({
        comparisons: comparisons,
        accesses: accesses + 2,
      });

      arr[k] = aux[i];
      k++;
      i++;
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, aux[j]]);

      const { comparisons, accesses } = statistics[statistics.length - 1];
      statistics.push({
        comparisons: comparisons,
        accesses: accesses + 2,
      });

      arr[k] = aux[j];
      k++;
      j++;
    }
  }
  //after this loop, one of the hills is fully added

  //if left hill is not added to arr completely
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, aux[i]]);

    // These are the number of comaprisons and array accesses at this frame
    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });

    arr[k] = aux[i];
    k++;
    i++;
  }
  //if right hill is not added to arr completely
  while (j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, aux[j]]);

    const { comparisons, accesses } = statistics[statistics.length - 1];
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });
    statistics.push({ comparisons: comparisons + 1, accesses: accesses + 2 });

    arr[k] = aux[j];
    k++;
    j++;
  }
};

export default getMergeSortAnimations;
