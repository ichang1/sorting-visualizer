import React, { useState } from "react";
import "./ToolBar.css";

const ToolBar = ({
  getArray,
  mergeSort,
  quickSort,
  heapSort,
  size,
  changeSize,
  speed,
  setSpeed,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const sortAlgorithms = [mergeSort, quickSort, heapSort];

  // const handleClick = (sort) => {
  //   setIsRunning(!isRunning);
  //   sort();
  //   setIsRunning(false);
  // };

  const handleChange = (e) => {
    const newSize = e.target.value;
    changeSize(parseInt(newSize));
  };

  return (
    <nav id="tool-bar">
      <button
        id="get-array"
        onClick={
          !isRunning
            ? () => {
                getArray(size);
              }
            : null
        }
      >
        New Array
      </button>
      {sortAlgorithms.map((algorithm, idx) => (
        <button
          className="sort-button"
          onClick={!isRunning ? algorithm : null}
          key={`sort-algorithm-${idx}`}
        >
          {algorithm.name}
        </button>
      ))}
      <input
        id="changeSize"
        type="range"
        min="20"
        max="250"
        step="10"
        defaultValue="150"
        style={{ background: "red" }}
        disabled={isRunning ? "disabled" : null}
        onChange={handleChange}
      />
      <div id="array-size">{`Size: ${size}`}</div>
    </nav>
  );
};

export default ToolBar;
