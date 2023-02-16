module.exports = {
    playMove: (board, move, player) => {
        const { row, side } = move;
        board[row][6]=player;
        return board;
    },
    createBoard: () => {
        const board = [];
        for (let i = 0; i < 7; i++) {
            board.push([]);
            for (let j = 0; j < 7; j++) {
                board[i].push(0);
            }
        }
        return board;
    },
}