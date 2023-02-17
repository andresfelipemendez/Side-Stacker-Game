IsRowFull = (row) => {
    if(row.right + row.left === 7) return true;
    return false;
},

module.exports = {
    playMove: (board, move, player) => {
        const { row, side } = move;
        board[row][6]=player;
        return board;
    },
    createBoard: () => {
        const board = [];
        for (let i = 0; i < 7; i++) {
            board.push({row: [], left: 0, right: 0});
            for (let j = 0; j < 7; j++) {
                board[i].row.push(0);
            }
        }
        return board;
    },
    stackRight: (row,player) => {
        if(IsRowFull(row)) return row;
        row.arr[6-row.right]=player;
        row.right++;
        return row;
    },
    stackLeft: (row,player) => {
        if(IsRowFull(row)) return row;
        row.arr[row.left]=player;
        row.left++;
        return row;
    }
}