import React, { useState } from "react";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const MIN_HEIGHT = 5;
  const MAX_HEIGHT = 500;

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(200);

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

  return (
    <div className="array-container">
      {array.map((val, idx) => (
        <div
          className="array-bar"
          style={{ height: `${val}px` }}
          key={idx}
        ></div>
      ))}
    </div>
  );
};

export default SortingVisualizer;
