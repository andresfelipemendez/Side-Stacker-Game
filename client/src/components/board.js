import React, { useState } from "react";
import styles from "./board.module.css";

function Board({ board, sendPlayerMove }) {
  const renderSquare = (value) => {
    return (
      <span
        className={styles.piece} >
        {value}
      </span>
  )};

  return (
    <div className={styles.container}>
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
              <button onClick={sendPlayerMove} row={rowIndex} side="left"> L </button>
              {row.map((value, columnIndex) => (
                <span key={columnIndex}>{renderSquare(value)}</span>
              ))}
              <button onClick={sendPlayerMove} row={rowIndex} side="right"> R </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;