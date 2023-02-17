const { createBoard, playMove, stackRight, stackLeft } = require('../src/sidestacker.js');


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

describe('stacking Right', () => {
    test('stack player x to the right of an empty row', () => {
        const row = {
            arr: [0,0,0,0,0,0,0],
            left:0,
            right:0,
        }
        const stackedRight = stackRight(row,'x');
        expect(stackedRight.arr.length).toBe(7);
        expect(stackedRight.arr[6]).toBe('x');
        expect(stackedRight.right).toBe(1);
    });

    test('stack player o to the right of an empty row', () => {
        const row = {
            arr: [0,0,0,0,0,0,0],
            left:0,
            right:0,
        }
        const stackedRight = stackRight(row,'o');
        expect(stackedRight.arr.length).toBe(7);
        expect(stackedRight.arr[6]).toBe('o');
        expect(stackedRight.right).toBe(1);
    });

    test('stack player x to the right of row with one x piece', () => {
        const row = {
            arr: [0,0,0,0,0,0,'x'],
            left:0,
            right:1,
        }
        const stackedRight = stackRight(row,'x');
        expect(stackedRight.arr[5]).toBe('x');
        expect(stackedRight.right).toBe(2);
    });
});

describe('stacking Left', () => {
    test('stack player o to the left of row with one x piece', () => {
        const row = {
            arr: [0,0,0,0,0,0,0],
            left:0,
            right:0,
        }
        const stackedLeft = stackLeft(row,'o');
        expect(stackedLeft.arr.length).toBe(7);
        expect(stackedLeft.arr[0]).toBe('o');
        expect(stackedLeft.left).toBe(1);
    });

    test('stack player x to the left of row with one x piece', () => {
        const row = {
            arr: [0,0,0,0,0,0,0],
            left:0,
            right:0,
        }
        const stackedLeft = stackLeft(row,'x');
        expect(stackedLeft.arr[0]).toBe('x');
        expect(stackedLeft.left).toBe(1);
    });


    test('stack player o to the left of row with one x piece', () => {
        const row = {
            arr: ['x',0,0,0,0,0,0],
            left:1,
            right:0,
        }
        const stackedLeft = stackLeft(row,'o');
        expect(stackedLeft.arr.length).toBe(7);
        expect(stackedLeft.arr[1]).toBe('o');
        expect(stackedLeft.left).toBe(2);
    });
});

describe('stacking both ends', () => {
    test('stack player o to the left of row with one x piece', () => {
        const row = {
            arr: [0,0,0,0,0,0,0],
            left:0,
            right:0,
        }
        const stackedLeft = stackLeft(row,'o');
        expect(stackedLeft.arr[0]).toBe('o');
        expect(stackedLeft.left).toBe(1);

        const stackedRight = stackRight(row,'x');
        expect(stackedLeft.arr[6]).toBe('x');
        expect(stackedLeft.right).toBe(1);
    });

    test('stack player x to the left of row with one x piece', () => {
        const row = {
            arr: ['x','x','o',0,'x','o','x'],
            left:3,
            right:3,
        }
        const stackedLeft = stackLeft(row,'x');
        expect(stackedLeft.arr[3]).toBe('x');
        expect(stackedLeft.left).toBe(4);
        expect(stackedLeft.arr).toEqual(['x','x','o','x','x','o','x']);
        
    });

    test("don't stack anymore if row its already filled", () => {
        const row = {
            arr: ['x','x','o','x','x','o','x'],
            left:4,
            right:3,
        }
        const stackedLeft = stackLeft(row,'o');
        expect(stackedLeft.arr.length).toBe(7);
        expect(stackedLeft.arr).toEqual(['x','x','o','x','x','o','x']);
        expect(stackedLeft.left).toBe(4);
    });
});

describe('board', () => {
    test('is empty', () => {
        const board = createBoard();
        expectedBoard = [
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
            {row:[0,0,0,0,0,0,0], left:0, right:0},
        ];
        expect(board).toEqual(expectedBoard);
    });
});