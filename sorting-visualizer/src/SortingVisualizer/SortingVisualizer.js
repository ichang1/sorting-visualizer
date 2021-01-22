import React, { useState } from "react";
import "./SortingVisualizer.css";
import ToolBar from "./../ToolBar/ToolBar.js";
import getMergeSortAnimations from "./../Sorting/mergeSort.js";
import getQuickSortAnimations from "./../Sorting/quickSort.js";

const SortingVisualizer = () => {
  const MIN_HEIGHT = 5;
  const MAX_HEIGHT = 510;

  const ANIMATION_BASE_SPEED = 3;

  const FIRST_COLOR = "aqua";
  const SECOND_COLOR = "red";

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(270);

  React.useEffect(() => {
    resetArray();
  }, []);

  const setSizeDefault = (n) => {
    if (n > 0) {
      setSize(n);
    } else {
      setSize(0);
    }
  };

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
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        //we are comparing or just  done comparing
        const [leftBarIdx, rightBarIdx] = animations[i];
        const leftBarStyle = arrayBars[leftBarIdx].style;
        const rightBarStyle = arrayBars[rightBarIdx].style;
        const color = i % 3 === 0 ? SECOND_COLOR : FIRST_COLOR;
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
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
