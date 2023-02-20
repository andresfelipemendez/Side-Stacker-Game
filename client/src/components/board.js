import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import Snap from "snapsvg-cjs";

function getRightFacingTrianglePath(x, y, width, height) {

  return Snap.format("M {centerRight} {y} L {left} {bottom} L {left} {top} Z", {
    x: x,
    y: y,
    centerRight: x + (width / 2),
    bottom: (y) + (height / 2),
    top: (y) - (height / 2),
    left: (x) - (width / 2)
  });
}

function getLeftFacingTrianglePath(x, y, width, height) {
  return Snap.format("M {centerLeft} {y} L {right} {bottom} L {right} {top} Z", {
    x: x,
    y: y,
    centerLeft: x - (width / 2),
    bottom: (y) + (height / 2),
    top: (y) - (height / 2),
    right: (x) + (width / 2)
  });
}

export default function Board({ board, player, sendPlayerMove }) {
  

  const [hoverState, setHoverState] = useState(false);

  useEffect(() => {
    if(!board) return;
    
    var s = Snap("#svg");
    const pieceRadius = 30;
    const strokeWidth = 3;
    const leftOffset = pieceRadius + strokeWidth + 80;
    const topOffset = pieceRadius + strokeWidth;

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

    const hoverColor = enabled ? "#FAB500" : "#BBB";
    const buttonFillColor = enabled ? "#FFE56B" : "#DDD";
    const buttonBorderColor = enabled ? "#FFE56B" : "#EEE";

    board?.board.map((row, rowIndex) => {
      const leftButton = s.path(getRightFacingTrianglePath(
        topOffset, 
        (80*rowIndex) + topOffset, 
        30, 
        40));
      
      leftButton.attr({
        fill: buttonFillColor,
        stroke: buttonBorderColor,
        strokeWidth: strokeWidth,
        class: styles.interactiveIcon,
        side: "right",
        row: rowIndex
      });

      leftButton.click((e) => {
        if(!enabled) return;
        sendPlayerMove({ rowIndex, side: 'left', player: player });
      });

      leftButton.hover((e) => {
        console.log(
          e.target.getAttribute("side"),
          e.target.getAttribute("row"),
        );

        e.target.setAttribute("fill", hoverColor)
        setHoverState(true);
      },
      () => {
        setHoverState(false);
      });

      const rightButton = s.path(getLeftFacingTrianglePath(
        topOffset + 640,
        (80*rowIndex) + topOffset , 
        30,
        40
      ));

      rightButton.attr({
        fill: buttonFillColor,
        stroke: buttonBorderColor,
        strokeWidth: strokeWidth,
        class: styles.interactiveIcon,
        side: "right",
        row: rowIndex
      });

      rightButton.click(() => {
        sendPlayerMove({ rowIndex, side: 'right', player: player });
      });

      rightButton.hover((e) => {
        console.log(
          e.target.getAttribute("side"),
          e.target.getAttribute("row"),
        );

        e.target.setAttribute("fill", hoverColor)
        setHoverState(true);
      },
      () => {
        setHoverState(false);
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
}, [board, hoverState]);

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