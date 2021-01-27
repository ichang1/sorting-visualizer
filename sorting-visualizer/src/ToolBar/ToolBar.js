import React, { useState, useRef } from "react";
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
  const sizeRef = useRef(0);

  React.useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const handleClick = (sort) => {
    setIsRunning(!isRunning);
    sort();
    setIsRunning(false);
  };

  const handleChange = (e) => {
    const newSize = e.target.value;
    changeSize(parseInt(newSize));
    sizeRef.current = newSize;
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
        max="270"
        step="10"
        defaultValue="150"
        style={{ background: "red" }}
        disabled={isRunning ? "disabled" : null}
        onChange={handleChange}
      />
      <div
        id="array-size"
        ref={(el) => (sizeRef.current = el)}
      >{`Size: ${sizeRef.current}`}</div>
    </nav>
  );
};

// const SortButton = ({ sort, isRunning, setIsRunning }) => {
//   const noInterruptSort = () => {
//     if (!isRunning) {
//       setIsRunning(true);
//       sort();
//       setIsRunning(false);
//     }
//   };
//   return (
//     <div className="sort-button" onClick={!isRunning ? noInterruptSort : null}>
//       {sort.name}
//     </div>
//   );
// };

export default ToolBar;
