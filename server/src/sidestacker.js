"use strict";

// the board is 7x7
// index 0 is the bottom of the board and 6 is the top
// height increments from top to bottom
// width increments from left to right
const boardWidth = 6;
const boardHeight = 6;
const winningLength = 4;
const winningLengthMinusOne = winningLength - 1;


function IsRowFull(row) {
  return row.rightCount + row.leftCount > boardWidth
}

function CappedLeft(column) {
  return column - winningLengthMinusOne < 0 ? 0 : column - winningLengthMinusOne;
}

function CappedRight(column) {
    return column + winningLengthMinusOne > boardWidth ? boardWidth : column + winningLengthMinusOne;
}

function CappedTop(row) {
    return row - winningLengthMinusOne < 0 ? 0 : row - winningLengthMinusOne;
}

function GetCappedTopRightLength(row, column) {
    let distanceRight = boardWidth - column;
    let diagDistance = row < distanceRight ? row : distanceRight
    return diagDistance < winningLengthMinusOne ? diagDistance : winningLengthMinusOne;
}

function GetCappedBottomLeftLength(row, column) {
    let distanceLeft = column;
    let distanceBottom = boardHeight - row;
    let diagDistance = distanceLeft < distanceBottom ? distanceLeft : distanceBottom;
    return diagDistance < winningLengthMinusOne ? diagDistance : winningLengthMinusOne;
}

module.exports = {
  createBoard: () => {
    const board = [];
    for (let i = 0; i <= boardWidth; i++) {
      board.push({ row: [], leftCount: 0, rightCount: 0 });
      for (let j = 0; j < 7; j++) {
        board[i].row.push(0);
      }
    }
    return board;
  },
  stackRight: (row, player) => {
    if (IsRowFull(row)) return row;
    row.rightIndex = boardWidth - row.rightCount;
    row.row[row.rightIndex] = player;
    // 0 base index, count is 1 base
    row.rightCount++;
    return row;
  },
  stackLeft: (row, player) => {
    if (IsRowFull(row)) return row;
    row.leftIndex = row.leftCount;
    row.row[row.leftIndex] = player;
    row.leftCount++;
    return row;
  },
  getHorizontalAdjacentPieces: (board, move) => {
    let adjacentPieces = [];
    const playedRow = board[move.row].row;
    const cappedLeft = move.column - 3 < 0 ? 0 : move.column - 3;
    const cappedRight = move.column + 3 > 6 ? 6 : move.column + 3;
    for (let i = cappedLeft; i <= cappedRight; i++) {
      adjacentPieces.push(playedRow[i]);
    }
    return adjacentPieces;
  },
  getVerticalAdjacentPieces: (board, move) => {
    let adjacentPieces = [];
    const cappedTop = move.row - 3 < 0 ? 0 : move.row - 3;
    const cappedBottom = move.row + 3 > 6 ? 6 : move.row + 3;
    for (let i = cappedTop; i <= cappedBottom; i++) {
      adjacentPieces.push(board[i].row[move.column]);
    }
    return adjacentPieces;
  },
  getForwardDiagonalAdjacentPieces: (board, move) => {
    let adjacentPieces = [];

    const {cappedBottom,cappedLeft} =  getBottomLeft(move);
    const {cappedTop,cappedRight} = getTopRight(move);

    let i = cappedTop;
    let j = cappedLeft;
    while (i <= cappedBottom && j <= cappedRight) {
      adjacentPieces.push(board[i].row[j]);
      i++;
      j++;
    }
    return adjacentPieces;
  },
  getBottomLeft: (row, column) => {
    let length = GetCappedBottomLeftLength(row, column);
    return {
        bottom: row + length,
        left: column - length
    }
  },
  
  getTopRight: (row, column) => {
    let length = GetCappedTopRightLength(row, column);
    const top = row - length;
    const right = column + length;
    return {
        top: top,
        right: right
    }
  },
  isWinningMove(player, board) {
    return false;
  },
};
