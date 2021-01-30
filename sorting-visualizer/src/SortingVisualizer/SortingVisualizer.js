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

  const MIN_HEIGHT = 5;
  const MAX_HEIGHT = height - 75;

  const AQUA = "aqua";
  const RED = "#cc0000";
  const MAROON = "#800000";

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(150);
  const [speed, setSpeed] = useState(6);
  const [barWidth, setBarWidth] = useState(0.3466666);

  const barRefs = useRef([]);

  React.useEffect(() => {
    resetArray(size);
    barRefs.current = new Array(size);
  }, [size]);

  const sizeToBarWidth = (n) => {
    return 55 / n;
  };

  const changeSize = (n) => {
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
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    // const arrayBars = document.getElementsByClassName("array-bar");
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
        }, i * speed);
      } else {
        const [barIdx, newHeight] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
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
        }, i * speed);
      } else {
        //swap
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const [barOneStyle, barTwoStyle] = [
          arrayBars[barOneIdx].style,
          arrayBars[barTwoIdx].style,
        ];
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * speed);
      }
    }
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(array);
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
        }, i * speed);
      } else if (type === "parent") {
        const action = animations[i].action;
        const color = action === "start" ? MAROON : AQUA;
        const parentIdx = animations[i].bar;
        const parentStyle = arrayBars[parentIdx].style;
        setTimeout(() => {
          parentStyle.backgroundColor = color;
        }, i * speed);
      } else {
        //swap
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const [barOneStyle, barTwoStyle] = [
          arrayBars[barOneIdx].style,
          arrayBars[barTwoIdx].style,
        ];
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * speed);
      }
    }
  };

  const shellSort = () => {
    const animations = getShellSortAnimations(array);
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
        }, i * speed);
      } else if (type === "swap") {
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        const [barOneStyle, barTwoStyle] = [
          arrayBars[barOneIdx].style,
          arrayBars[barTwoIdx].style,
        ];
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * speed);
      } else if (type === "check") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const barIdx = animations[i].bar;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.backgroundColor = color;
        }, i * speed);
      } else if (type === "shift") {
        const barNewIdx = animations[i].bar + 1;
        const barNewHeight = animations[i].height;
        const barStyle = arrayBars[barNewIdx].style;
        setTimeout(() => {
          barStyle.height = `${barNewHeight}px`;
        }, i * speed);
      } else {
        //insert
        const barIdx = animations[i].bar;
        const barHeight = animations[i].height;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${barHeight}px`;
        }, i * speed);
      }
    }
  };

  const bitonicSort = () => {
    const animations = getBitonicSortAnimations(array);
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
        }, i * speed);
      } else {
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * speed);
      }
    }
  };

  return (
    <div>
      <ToolBar
        getArray={resetArray}
        mergeSort={mergeSort}
        quickSort={quickSort}
        heapSort={heapSort}
        shellSort={shellSort}
        bitonicSort={bitonicSort}
        size={size}
        changeSize={changeSize}
        setSpeed={setSpeed}
        sizeToSpeeds={sizeToSpeeds}
      ></ToolBar>
      <div
        className="array-container"
        style={{ height: `${100 - 5000 / height}%` }}
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
