import React, { useState } from "react";
import "./ToolBar.css";
import useWindowDimensions from "./../Utils/windowDimensions.js";

const ToolBar = ({
  getArray,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
  size,
  changeSize,
  setSpeed,
  sizeToSpeeds,
}) => {
  const { width } = useWindowDimensions();

  const MIN_SIZE = 20;
  const MAX_SIZE = 0.2 * width > 20 ? Math.floor(0.2 * width) : 60;
  const STEP = 10;

  const [isRunning, setIsRunning] = useState(false);
  const [speeds, setSpeeds] = useState({});
  const [speedLabel, setSpeedLabel] = useState("Normal");
  const sortAlgorithms = [mergeSort, quickSort, heapSort, shellSort];
  const levelToSpeed = { 0: "Fast", 1: "Normal", 2: "Slow" };

  const N = 2;

  React.useEffect(() => {
    const newSpeeds = sizeToSpeeds(size);
    setSpeeds(newSpeeds);
    setSpeed(newSpeeds[speedLabel.toLowerCase()]);
  }, [size, setSpeeds, setSpeed, sizeToSpeeds, speedLabel]);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    changeSize(parseInt(newSize));
  };

  const handleSpeedChange = (e) => {
    //N - level to get actual level from range b/c lower actually means faster
    const level = N - e.target.value;
    //get the speed label
    const label = levelToSpeed[level];
    setSpeedLabel(label);
    //to lowercase b/c the property names are lower case of the label name
    // Ex: Fast -> fast
    const newSpeed = speeds[label.toLowerCase()];
    setSpeed(newSpeed);
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
      <div id="size-range-container">
        <div id="size-range-title">Size</div>
        <input
          id="change-size"
          type="range"
          min={`${MIN_SIZE}`}
          max={`${MAX_SIZE}`}
          step={`${STEP}`}
          defaultValue="150"
          disabled={isRunning ? "disabled" : null}
          onChange={handleSizeChange}
        />
        <div id="array-size">{size}</div>
      </div>

      <div id="speed-range-container">
        <div id="speed-range-title">Speed</div>
        <input
          id="change-speed"
          type="range"
          min="0"
          max="2"
          step="1"
          defaultValue="1"
          disabled={isRunning ? "disabled" : null}
          onChange={handleSpeedChange}
        />
        <div id="speed-label">{speedLabel}</div>
      </div>
    </nav>
  );
};

export default ToolBar;
