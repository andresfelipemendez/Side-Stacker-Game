import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import Snap from "snapsvg-cjs";

export default function Board({ board, sendPlayerMove }) {
  const [player, setPlayer] = useState("x");

  
  useEffect(() => {
    var s = Snap("#svg");
    const pieceRadius = 30;
    const strokeWidth = 3;
    const leftOffset = pieceRadius + strokeWidth + 80;
    const topOffset = pieceRadius + strokeWidth;
    if(board.length === 0) 
      return;
    board.map((row, rowIndex) => {
      const leftButton = s.circle(
        topOffset,
        (80*rowIndex) + topOffset, 
        pieceRadius);
      
      leftButton.attr({
        fill: "#FFE56B",
        stroke: "#FFE56B",
        strokeWidth: strokeWidth
      });

      leftButton.click((e) => {
        sendPlayerMove({ rowIndex, side: 'left', player: player });
        setPlayer(player === "x" ? "o" : "x");
      });

      const rightButton = s.circle(
          topOffset + 650,
          (80*rowIndex) + topOffset , 
          pieceRadius);

          rightButton.attr({
            fill: "#FFE56B",
            stroke: "#FFE56B",
            strokeWidth: strokeWidth
          });

      rightButton.click(() => {
        sendPlayerMove({ rowIndex, side: 'right', player: player });
        setPlayer(player === "x" ? "o" : "x");
      });
      
      row.row.map((value, columnIndex) => {
        const piece = s.circle(
          (80*columnIndex) + leftOffset, 
          (80*rowIndex) + topOffset, 
          pieceRadius);
        
        if (value === "x") {
          piece.attr({
            fill: "#651234",
            stroke: "#1E1D12",
            strokeWidth: strokeWidth
          });
        }
        else if (value === "o") {
        piece.attr({
          fill: "#2C465E",
          stroke: "#1E1D12",
          strokeWidth: strokeWidth,
        });
        } else {
          piece.attr({
            fill: "#EBD7B5",
            stroke: "#EBD7B5",
            strokeWidth: strokeWidth
          });
        }
      });
      
    });
}, [board]);

  return (
    <div style={styles}>
      <svg
        id="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}