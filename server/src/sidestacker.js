(IsRowFull = (row) => {
  if (row.rightCount + row.leftCount === 7) return true;
  return false;
}),
  (module.exports = {
    createBoard: () => {
      const board = [];
      for (let i = 0; i < 7; i++) {
        board.push({ row: [], leftCount: 0, rightCount: 0 });
        for (let j = 0; j < 7; j++) {
          board[i].row.push(0);
        }
      }
      return board;
    },
    stackRight: (row, player) => {
      if (IsRowFull(row)) return row;
      // board width index its 6 
      row.rightIndex = 6 - (row.rightCount);
      row.row[row.rightIndex] = player;
      // 0 base index, count is 1 base
      row.rightCount++;
      return row;
    },
    stackLeft: (row, player) => {
      if (IsRowFull(row)) return row;
      row.row[row.leftCount] = player;
      row.leftCount++;
      row.leftIndex = row.leftCount - 1; // 0 base index, count is 1 base
      return row;
    },
    getHorizontalAdjacenPieces: (board,move) => {
        let adjacentPieces = [];
        const playedRow = board[move.row].row;
        const cappedLeft = move.column - 3 < 0 ? 0 : move.column - 3;
        const cappedRight = move.column + 3 > 6 ? 6 : move.column + 3;
        for (let i = cappedLeft; i <= cappedRight; i++) {
            adjacentPieces.push(playedRow[i]);
        }
        return adjacentPieces;
    },
    isWinningMove(player, board) {
      return false;
    },
  });
