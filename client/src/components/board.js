import React, { useState } from "react";
import styles from "./board.module.css";
function Board({ initialBoard }) {
  const [board, setBoard] = useState(initialBoard);

  const updateSquare = (rowIndex, columnIndex, value) => {
    const updatedBoard = board.map((row, i) =>
      i === rowIndex ? [...row.slice(0, columnIndex), value, ...row.slice(columnIndex + 1)] : row
    );
    setBoard(updatedBoard);
  };

  const renderSquare = (value, rowIndex, columnIndex) => {
    const handleChange = (event) => {
      const newValue = event.target.value;
      updateSquare(rowIndex, columnIndex, newValue);
    };
    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{ width: "30px", height: "30px", textAlign: "center" }}
      />
    );
  };

  return (
    <div className={styles.container}>
        <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((value, columnIndex) => (
            <span key={columnIndex}>{renderSquare(value, rowIndex, columnIndex)}</span>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
}

export default Board;