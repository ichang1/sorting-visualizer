const getHeapSortAnimations = (arr) => {
  const animations = [];
  if (arr.length <= 1) {
    return animations;
  }
  const newArr = arr.slice().sort((a, b) => a - b);
  heapSort(arr, animations);
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

const heapSort = (arr, animations) => {
  for (let i = arr.length - 1; i > 0; i--) {
    heapifyUp(arr, i, animations);
  }
  console.log(arr);
  //the tree should be a max heap
  for (let i = arr.length - 1; i > 0; i--) {
    //move cur max to the back
    //cur max is at index 0
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifyDown(arr, 0, i - 1, animations);
    console.log(arr, "after");
  }
};

const heapifyUp = (arr, idx, animations) => {
  while (idx !== 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (arr[idx] > arr[parentIdx]) {
      //swap
      [arr[parentIdx], arr[idx]] = [arr[idx], arr[parentIdx]];
      idx = parentIdx;
    } else {
      return;
    }
  }
};

const heapifyDown = (arr, idx, endIdx, animations) => {
  while (idx <= endIdx) {
    const leftChildIdx = 2 * idx + 1;
    const rightChildIdx = 2 * idx + 2;
    const leftChildVal = leftChildIdx >= endIdx ? -Infinity : arr[leftChildIdx];
    const rightChildVal =
      rightChildIdx >= endIdx ? -Infinity : arr[rightChildIdx];

    if (arr[idx] > leftChildVal && arr[idx] > rightChildVal) {
      //value is larger than both of its children -> done
      return;
    } else {
      //at least one child is larger
      //swap with the larger child
      if (leftChildVal >= rightChildVal) {
        //left child is larger
        [arr[leftChildIdx], arr[idx]] = [arr[idx], arr[leftChildIdx]];
        idx = leftChildIdx;
      } else if (arr[rightChildIdx]) {
        //right child larger
        [arr[rightChildIdx], arr[idx]] = [arr[idx], arr[rightChildIdx]];
        idx = rightChildIdx;
      }
    }
  }
};

export default getHeapSortAnimations;
