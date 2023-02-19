import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import Snap from "snapsvg-cjs";

export default function Board({ board, player, sendPlayerMove }) {
  
  useEffect(() => {
    var s = Snap("#svg");
    const pieceRadius = 30;
    const strokeWidth = 3;
    const leftOffset = pieceRadius + strokeWidth + 80;
    const topOffset = pieceRadius + strokeWidth;
    console.log("board", player);

    let enabled = false;
    switch(board.gameState) {
      case "newGame": {
        enabled = player === "1" ? true : false;
        break;
      }
      case "player1Turn": {
        enabled = player === "1" ? true : false;
        break;
      }
      case "player2Turn":{
        enabled = player === "2" ? true : false;
        break;
      }
      case "player1won":{
        enabled = false;
        break;
      }
      case "player2won":{
        enabled = false;
        break;
      }
    }

    const buttonFillColor = enabled ? "#FFE56B" : "#DDD";
    const buttonBorderColor = enabled ? "#FFE56B" : "#EEE";

    board.board.map((row, rowIndex) => {
      const leftButton = s.circle(
        topOffset,
        (80*rowIndex) + topOffset, 
        pieceRadius);
      
      leftButton.attr({
        fill: buttonFillColor,
        stroke: buttonBorderColor,
        strokeWidth: strokeWidth
      });

      leftButton.click((e) => {
        if(!enabled) return;
        sendPlayerMove({ rowIndex, side: 'left', player: player });
      });

      const rightButton = s.circle(
          topOffset + 650,
          (80*rowIndex) + topOffset , 
          pieceRadius);

      rightButton.attr({
        fill: buttonFillColor,
        stroke: buttonBorderColor,
        strokeWidth: strokeWidth,
        
      });

      rightButton.click(() => {
        sendPlayerMove({ rowIndex, side: 'right', player: player });
      });
      
      row.row.map((value, columnIndex) => {
        const piece = s.circle(
          (80*columnIndex) + leftOffset, 
          (80*rowIndex) + topOffset, 
          pieceRadius);
        
        if (value === "1") {
          piece.attr({
            fill: "#651234",
            stroke: "#1E1D12",
            strokeWidth: strokeWidth
          });
        }
        else if (value === "2") {
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