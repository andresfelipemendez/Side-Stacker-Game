const { createBoard, playMove, isGameComplete } = require('../src/sidestacker.js');


it('should create a new board with 7 rows and 7 columns', () => {
    const board = createBoard();
    expect(board.length).toBe(7);
    expect(board[0].length).toBe(7);
});

it('should allow a player to make a move on the board', () => {
    const board = createBoard();
    const move = { row: 2, side: 'R' };
    const player = 'x';
    const updatedBoard = playMove(board, move, player);
    expect(updatedBoard[2][6]).toBe(player);
});