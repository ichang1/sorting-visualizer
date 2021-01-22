import React, { useState } from "react";
import "./ToolBar.css";

const ToolBar = ({ getArray, mergeSort, quickSort }) => {
  const [isRunning, setIsRunning] = useState(false);
  const sortAlgorithms = [mergeSort, quickSort];
  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };
  return (
    <nav id="tool-bar">
      <div id="get-array" onClick={!isRunning ? getArray : null}>
        New Array
      </div>
      {sortAlgorithms.map((algorithm, idx) => (
        <SortButton sort={algorithm} key={`sort-algorithm-${idx}`}></SortButton>
      ))}
      <div>{isRunning ? "True" : "False"}</div>
    </nav>
  );
};

const SortButton = ({ sort }) => {
  return (
    <div className="sort-button" onClick={sort}>
      {sort.name}
    </div>
  );
};

export default ToolBar;
