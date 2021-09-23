import React, { useState } from "react";
import "./ToolBar.css";
import useWindowDimensions from "./../Utils/windowDimensions.js";
import Dropdown from "./../Dropdown/Dropdown.js";
import { FaBars } from "react-icons/fa";

const ToolBar = ({
  sortAlgorithms,
  getArray,
  size,
  changeSize,
  setSpeed,
  sizeToSpeeds,
}) => {
  const { width } = useWindowDimensions();

  // min size of array
  const MIN_SIZE = 20;
  // maximum size of array based on screen width
  const MAX_SIZE = Math.floor(0.2 * (width - 10));
  //step for range input controlling array size
  const STEP = 10;

  // this keeps track of whether an algorithm is being run. If something
  // is running, then the user can't run another algorithm, reset the array
  // or change the array size during this
  // wasn't able to implement this
  const [isRunning, setIsRunning] = useState(false);
  // the state of the sorting speed based on the current array size
  const [speeds, setSpeeds] = useState({});
  // the name of the speed that the user will see
  const [speedLabel, setSpeedLabel] = useState("Normal");
  // maps a number to a speed string
  const levelToSpeed = { 0: "Fast", 1: "Normal", 2: "Slow" };

  // the number of levels of speed minus 1
  const N = 2;

  React.useEffect(() => {
    // get the new sorting speeds based on the new size
    const newSpeeds = sizeToSpeeds(size);
    // set new speeds to be current possible sorting speeds
    setSpeeds(newSpeeds);
    // set current speed of the sorting algorithm based on new speeds
    setSpeed(newSpeeds[speedLabel.toLowerCase()]);
  }, [size, setSpeeds, setSpeed, sizeToSpeeds, speedLabel]);

  // handles size change from range input
  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    changeSize(parseInt(newSize));
  };

  const handleSpeedChange = (e) => {
    // range input for speed goes from 0 - 2
    // normally 2 is the fastest, but within the code, the lower numbers
    // mean a faster speed
    //N - <level> to get actual level from range
    const level = N - e.target.value;
    //get the speed label name that user sees
    const label = levelToSpeed[level];
    setSpeedLabel(label);
    //to lowercase b/c the property names are lower case of the label name
    // Ex: Fast -> fast
    const newSpeed = speeds[label.toLowerCase()];
    // set the new speed that the user moved the range input to
    setSpeed(newSpeed);
  };

  return (
    <nav id="tool-bar">
      <Dropdown icon={<FaBars className="dropdown-icon" />} right={false}>
        {sortAlgorithms.map((algorithm, idx) => (
          <button
            className="sort-button"
            onClick={!isRunning ? algorithm : null}
            key={`sort-algorithm-${idx}`}
          >
            {algorithm.name}
          </button>
        ))}
      </Dropdown>
      <ul className="sorting-buttons">
        {sortAlgorithms.map((algorithm, idx) => (
          <button
            className="sort-button"
            onClick={!isRunning ? algorithm : null}
            key={`sort-algorithm-${idx}`}
          >
            {algorithm.name}
          </button>
        ))}
      </ul>
      <div id="get-array-container">
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
      </div>
      <ul className="range-container">
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
      </ul>
      <Dropdown icon={<FaBars className="dropdown-icon" />} right={true}>
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
      </Dropdown>
    </nav>
  );
};

export default ToolBar;
