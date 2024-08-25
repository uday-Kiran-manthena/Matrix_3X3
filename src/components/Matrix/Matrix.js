import React, { useState } from "react";
import "./Matrix.css";

const Box = ({ id, color, handleClick }) => (
  <div
    className="box"
    style={{ backgroundColor: color }}
    onClick={() => handleClick(id)}
  />
);

const Matrix = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(null)); // State to hold box colors
  const [clickOrder, setClickOrder] = useState([]); // State to track the order of clicks

  const handleClick = (id) => {
    // If This box was already clicked, do nothing
    if (clickOrder.includes(id)) return;

    const newBoxes = [...boxes];
    newBoxes[id] = "green"; // Change the clicked box's color to green
    setBoxes(newBoxes);
    setClickOrder([...clickOrder, id]); // Add this box's ID to the order of clicks

    // If this was the last box to be clicked
    if (clickOrder.length === 8) {
      setTimeout(() => turnBoxesOrange([...clickOrder, id]), 250); // Start turning boxes orange after a short delay
    }
  };

  const turnBoxesOrange = (order) => {
    // Change each box in the click order to orange, with a delay between each
    order.forEach((id, index) => {
      setTimeout(() => {
        setBoxes((prevBoxes) => {
          const updatedBoxes = [...prevBoxes];
          updatedBoxes[id] = "orange";
          return updatedBoxes;
        });
      }, index * 500);
    });
  };

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
