import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import Snap from "snapsvg-cjs";

export default function Board({ board, sendPlayerMove }) {
  const [player, setPlayer] = useState("x");

  

  useEffect(() => {
    var s = Snap("#svg");
    const pieceRadius = 30;
    const strokeWidth = 2;
    const leftOffset = pieceRadius + strokeWidth + 80;
    const topOffset = pieceRadius + strokeWidth;
    board.map((row, rowIndex) => {
      const leftButton = s.circle(
        topOffset,
        (80*rowIndex) + topOffset, 
        pieceRadius);

      leftButton.click((e) => {
        
        console.log("leftButton click " + rowIndex);
        sendPlayerMove({ rowIndex, side: 'left', player: player });
        setPlayer(player === "x" ? "o" : "x");
      });

      const rightButton = s.circle(
          topOffset + 650,
          (80*rowIndex) + topOffset , 
          pieceRadius);

      rightButton.click((e) => {
        
        console.log("right click " + rowIndex);
        sendPlayerMove({ rowIndex, side: 'right', player: player });
        setPlayer(player === "x" ? "o" : "x");
      });
        
      row.map((value, columnIndex) => {
        const piece = s.circle(
          (80*columnIndex) + leftOffset, 
          (80*rowIndex) + topOffset, 
          pieceRadius);
        
        if (value === "x") {
          piece.attr({
            fill: "blue",
            stroke: "#000",
            strokeWidth: strokeWidth
          });
        }
        else if (value === "o") {
        piece.attr({
          fill: "red",
          stroke: "#000",
          strokeWidth: strokeWidth
        });
        } else {
          piece.attr({
            fill: "#fff",
            stroke: "#000",
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
        // height="80vh"
        // width="80vw"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}