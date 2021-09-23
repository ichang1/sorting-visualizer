import React, { useState, useRef } from "react";
import "./SortingVisualizer.css";
import ToolBar from "./../ToolBar/ToolBar.js";
import useWindowDimensions from "./../Utils/windowDimensions.js";
import getMergeSortAnimations from "./../Sorting/mergeSort.js";
import getQuickSortAnimations from "./../Sorting/quickSort.js";
import getHeapSortAnimations from "./../Sorting/heapSort.js";
import getShellSortAnimations from "./../Sorting/shellSort.js";
import getBitonicSortAnimations from "./../Sorting/bitonicSort.js";

const SortingVisualizer = () => {
  const { height } = useWindowDimensions();
  // the height of the container for the array bars in percent
  const CONTAINER_HEIGHT_PERCENT = 100 - 7000 / height;

  // minimum height of a bar in px
  const MIN_HEIGHT = 5;
  // maximum height of a bar in px based on screen height
  const MAX_HEIGHT = (CONTAINER_HEIGHT_PERCENT / 100) * height - 50;

  const AQUA = "#00FFFF";
  const RED = "#cc0000";
  const MAROON = "#800000";

  // array of numbers that user sees as bars
  const [array, setArray] = useState([]);
  // size of the array
  const [size, setSize] = useState(150);
  // sorting speed
  const [speed, setSpeed] = useState(6);
  // the width of a bar on the screen in percent
  const [barWidth, setBarWidth] = useState(0.3466666);

  // reference to the bars that will be animated
  const barRefs = useRef([]);

  React.useEffect(() => {
    // get new array of requested size
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(getRandomIntFromRange(MIN_HEIGHT, MAX_HEIGHT));
    }
    setArray(newArray);
    // new reference to the bars of the array that will be animated
    barRefs.current = new Array(size);
    // reset the number of comparisons and array accesses to 0
    resetStatistics();
  }, [size, MIN_HEIGHT, MAX_HEIGHT]);

  const resetStatistics = () => {
    // hacky and bad way to reset current number of comparisons and
    // accesses

    // wanted to use state, but since both numbers change while
    // the array sort is being animated (loop), the set states are
    // mashed together and the numbers wouldn't update properly
    document.getElementById("comparisons").innerHTML = "Comparisons: 0";
    document.getElementById("array-accesses").innerHTML = "Array accesses: 0";
  };

  const changeSize = (n) => {
    const sizeToBarWidth = (n) => {
      // formula for bar width based on array size
      return 55 / n;
    };
    setSize(n);
    resetArray(n);
    //change bar width
    const barWidth = sizeToBarWidth(n);
    setBarWidth(barWidth);
  };

  const sizeToSpeeds = () => {
    //3 levels for speed
    //slow, normal, fast
    //scale speeds depending on size
    //slow: 2, normal: 1, fast: 0

    //slope is the speed for fast
    // const slope = -(28 / 230) * size + 7460 / 230;
    const slope = 500 / size;
    const speed = (level) => {
      return slope * level + slope;
    };
    return { slow: speed(2), normal: speed(1), fast: speed(0) };
  };

  const getRandomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (n) => {
    const newArray = [];
    for (let i = 0; i < n; i++) {
      newArray.push(getRandomIntFromRange(MIN_HEIGHT, MAX_HEIGHT));
    }
    setArray(newArray);
    resetStatistics();
  };

  const setStatistics = (curStats) => {
    // hacky and bad way to set current number of comparisons and
    // accesses

    // wanted to use state, but since both numbers change while
    // the array sort is being animated (loop), the set states are
    // mashed together and the numbers wouldn't update properly
    const { comparisons, accesses } = curStats;
    document.getElementById(
      "comparisons"
    ).innerHTML = `Comparisons: ${comparisons}`;
    document.getElementById(
      "array-accesses"
    ).innerHTML = `Array accesses: ${accesses}`;
  };

  // the animations for all the sorting algorithms at each step are
  // kept in an array that is returned from the actual sort
  // there is a corresponding array of the number of comparisons/array
  // accesses at each step

  // Using, the array of animations at each step of the sort, we animate
  // the array at each step of the sort and similarly for the number of
  // comparisons/array accesses

  // the animation at index i correspondings the the number of
  // comparisons/array accesses so far in the sort at index i

  const mergeSort = () => {
    const { animations, statistics } = getMergeSortAnimations(array.slice());
    const arrayBars = barRefs.current;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        //we are comparing or just  done comparing
        const [leftBarIdx, rightBarIdx] = animations[i];
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        const color = i % 3 === 0 ? RED : AQUA;
        setTimeout(() => {
          leftBarStyle.backgroundColor = color;
          rightBarStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else {
        const [barIdx, newHeight] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      }
    }
  };

  const quickSort = () => {
    const { animations, statistics } = getQuickSortAnimations(array);
    const arrayBars = barRefs.current;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;
      if (type === "pivot") {
        const action = animations[i].action;
        const color = action === "start" ? MAROON : AQUA;
        const pivIdx = animations[i].idx;
        const pivStyle = arrayBars[pivIdx].style;
        setTimeout(() => {
          pivStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else if (type === "compare") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else {
        //swap
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      }
    }
  };

  const heapSort = () => {
    const { animations, statistics } = getHeapSortAnimations(array);
    const arrayBars = barRefs.current;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;
      if (type === "compare") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else if (type === "parent") {
        const action = animations[i].action;
        const color = action === "start" ? MAROON : AQUA;
        const parentIdx = animations[i].bar;
        const parentStyle = arrayBars[parentIdx].style;
        setTimeout(() => {
          parentStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else {
        //swap
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      }
    }
  };

  const shellSort = () => {
    const { animations, statistics } = getShellSortAnimations(array);
    const arrayBars = barRefs.current;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;
      if (type === "compare") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else if (type === "swap") {
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else if (type === "check") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const barIdx = animations[i].bar;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else if (type === "shift") {
        const barNewIdx = animations[i].bar + 1;
        const barNewHeight = animations[i].height;
        const barStyle = arrayBars[barNewIdx].style;
        setTimeout(() => {
          barStyle.height = `${barNewHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else {
        //insert
        const barIdx = animations[i].bar;
        const barHeight = animations[i].height;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${barHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      }
    }
  };

  const bitonicSort = () => {
    const { animations, statistics } = getBitonicSortAnimations(array);
    const arrayBars = barRefs.current;
    for (let i = 0; i < animations.length; i++) {
      const type = animations[i].type;
      const [barOneIdx, barTwoIdx] = animations[i].bars;
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (type === "compare") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      } else {
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
          setStatistics(statistics[i + 1]);
        }, i * speed);
      }
    }
  };

  const sortAlgorithms = [
    {func:mergeSort, name:'mergesort'},
    {func:quickSort, name:'quicksort'},
    {func:heapSort, name:"heapsort"},
    {func:shellSort, name:"shellsort"},
    {func:bitonicSort, name:"bitonicsort"},
  ];
  return (
    <div>
      <ToolBar
        sortAlgorithms={sortAlgorithms}
        getArray={resetArray}
        size={size}
        changeSize={changeSize}
        setSpeed={setSpeed}
        sizeToSpeeds={sizeToSpeeds}
      />
      <div id="statistics">
        <div id="comparisons">Comparisons: 0</div>
        <div id="array-accesses">Array accesses: 0</div>
      </div>
      <div
        className="array-container"
        style={{ height: `${CONTAINER_HEIGHT_PERCENT}%` }}
      >
        {array.map((val, idx) => (
          <div
            className="array-bar"
            style={{ height: `${val}px`, width: `${barWidth}%` }}
            key={idx}
            ref={(el) => (barRefs.current[idx] = el)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
