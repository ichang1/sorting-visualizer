import React, { useState, useRef } from "react";
import "./SortingVisualizer.css";
import ToolBar from "./../ToolBar/ToolBar.js";
import getMergeSortAnimations from "./../Sorting/mergeSort.js";
import getQuickSortAnimations from "./../Sorting/quickSort.js";

const SortingVisualizer = () => {
  const MIN_HEIGHT = 5;
  const MAX_HEIGHT = 510;

  const ANIMATION_BASE_SPEED = 3;

  const AQUA = "aqua";
  const RED = "red";
  const MAROON = "#800000";

  const SIZE = 270;

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(SIZE);

  const barRefs = useRef([]);

  React.useEffect(() => {
    resetArray();
    barRefs.current = new Array(size);
  }, []);

  // const setSizeDefault = (n) => {
  //   if (n > 0) {
  //     setSize(n);
  //   } else {
  //     setSize(0);
  //   }
  // };

  const getRandomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
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
        }, i * ANIMATION_BASE_SPEED);
      } else {
        const [barIdx, newHeight] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_BASE_SPEED);
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
        }, i * ANIMATION_BASE_SPEED);
      } else if (type === "compare") {
        const action = animations[i].action;
        const color = action === "start" ? RED : AQUA;
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        console.log(animations[i]);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_BASE_SPEED);
      } else {
        //swap
        const [barOneIdx, barTwoIdx] = animations[i].bars;
        console.log(animations[i]);
        const [barOneStyle, barTwoStyle] = [
          arrayBars[barOneIdx].style,
          arrayBars[barTwoIdx].style,
        ];
        const [barOneNewHeight, barTwoNewHeight] = animations[i].heights;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * ANIMATION_BASE_SPEED);
      }
    }
  };

  return (
    <div>
      <ToolBar
        getArray={resetArray}
        mergeSort={mergeSort}
        quickSort={quickSort}
      ></ToolBar>
      <div className="array-container">
        {array.map((val, idx) => (
          <div
            className="array-bar"
            style={{ height: `${val}px` }}
            key={idx}
            ref={(el) => (barRefs.current[idx] = el)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
