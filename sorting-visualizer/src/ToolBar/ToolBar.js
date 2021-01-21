import React, { useState } from "react";
import "./ToolBar.css";

const ToolBar = ({ getArray, mergeSort }) => {
  const [isRunning, setIsRunning] = useState(false);
  const sortAlgorithms = [mergeSort];
  const runSortAlgorithm = (sort) => {
    if (!isRunning) {
      setIsRunning(true);
      sort();
      setIsRunning(true);
    }
  };
  return (
    <nav id="tool-bar">
      <div id="get-array" onClick={!isRunning ? getArray : null}>
        New Array
      </div>
      {sortAlgorithms.map((algorithm, idx) => (
        <SortButton
          sort={algorithm}
          isSorting={isRunning}
          key={`sort-algorithm-${idx}`}
        ></SortButton>
      ))}
    </nav>
  );
};

const SortButton = ({ sort, isSorting }) => {
  return (
    <div className="sort-button" onClick={sort}>
      {sort.name}
    </div>
  );
};

export default ToolBar;
