// src/components/Matrix/Matrix.js
import React, { useState, useCallback } from "react";
import "./Matrix.css";

const Box = ({ id, color, handleClick }) => {
  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(id)}
    />
  );
};

const Matrix = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(null)); // Array to hold box colors
  const [clickOrder, setClickOrder] = useState([]); // Array to track order of clicks
  const [isComplete, setIsComplete] = useState(false); // Tracks if all boxes have been clicked

  const handleClick = useCallback(
    (id) => {
      // Prevent further changes if the process is complete or if the box has already been clicked
      if (isComplete || clickOrder.includes(id)) return;

      const newBoxes = [...boxes];
      newBoxes[id] = "green"; // Change clicked box color to green
      setBoxes(newBoxes);
      setClickOrder((prevOrder) => [...prevOrder, id]); // Track the order of the clicks

      if (clickOrder.length === 8) {
        // If this is the last box to be clicked
        setIsComplete(true); // Mark as complete to prevent further changes
        setTimeout(() => changeToOrange([...clickOrder, id]), 100); // Delay to ensure green color is visible first
      }
    },
    [isComplete, clickOrder, boxes]
  );

  const changeToOrange = useCallback(
    (order) => {
      const newBoxes = [...boxes]; // Create a copy of the current state
      order.forEach((id, index) => {
        setTimeout(() => {
          newBoxes[id] = "orange"; // Change color to orange one by one
          setBoxes([...newBoxes]); // Update state with the new color
        }, index * 500); // Delay between each box turning orange (500ms)
      });
    },
    [boxes]
  );
  return (
    <>
      <p className="title">3x3 Matrix</p>
      <div className="matrix">
        {boxes.map((color, index) => (
          <Box key={index} id={index} color={color} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
};

export default Matrix;
