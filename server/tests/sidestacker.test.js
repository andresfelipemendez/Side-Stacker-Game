"use strict";
const {
  createBoard,
  stackRight,
  stackLeft,
  getHorizontalAdjacentPieces,
  getVerticalAdjacentPieces,
  isWinningMove,
} = require("../src/sideStacker.js");

it("should create a new board with 7 rows and 7 columns", () => {
  const board = createBoard();
  expect(board.length).toBe(7);
  expect(board[0].row.length).toBe(7);
});

describe("stacking Right", () => {
  test("stack player x to the rightCount of an empty row", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedRight = stackRight(row, "x");
    expect(stackedRight.row.length).toBe(7);
    expect(stackedRight.row[6]).toBe("x");
    expect(stackedRight.rightCount).toBe(1);
  });

  test("stack player o to the rightCount of an empty row", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedRight = stackRight(row, "o");
    expect(stackedRight.row.length).toBe(7);
    expect(stackedRight.row[6]).toBe("o");
    expect(stackedRight.rightCount).toBe(1);
  });

  test("stack player x to the rightCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, "x"],
      leftCount: 0,
      rightCount: 1,
    };
    const stackedRight = stackRight(row, "x");
    expect(stackedRight.row[5]).toBe("x");
    expect(stackedRight.rightCount).toBe(2);
  });
});

describe("stacking Left", () => {
  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row[0]).toBe("o");
    expect(stackedLeft.leftCount).toBe(1);
  });

  test("stack player x to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "x");
    expect(stackedLeft.row[0]).toBe("x");
    expect(stackedLeft.leftCount).toBe(1);
  });

  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: ["x", 0, 0, 0, 0, 0, 0],
      leftCount: 1,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row[1]).toBe("o");
    expect(stackedLeft.leftCount).toBe(2);
  });
});

describe("stacking both ends", () => {
  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row[0]).toBe("o");
    expect(stackedLeft.leftCount).toBe(1);

    const stackedRight = stackRight(row, "x");
    expect(stackedLeft.row[6]).toBe("x");
    expect(stackedLeft.rightCount).toBe(1);
  });

  test("stack player x to the leftCount of row with one x piece", () => {
    const row = {
      row: ["x", "x", "o", 0, "x", "o", "x"],
      leftCount: 3,
      rightCount: 3,
    };
    const stackedLeft = stackLeft(row, "x");
    expect(stackedLeft.row[3]).toBe("x");
    expect(stackedLeft.leftCount).toBe(4);
    expect(stackedLeft.row).toEqual(["x", "x", "o", "x", "x", "o", "x"]);
  });

  test("don't stack anymore if row its already filled", () => {
    const row = {
      row: ["x", "x", "o", "x", "x", "o", "x"],
      leftCount: 4,
      rightCount: 3,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row).toEqual(["x", "x", "o", "x", "x", "o", "x"]);
    expect(stackedLeft.leftCount).toBe(4);
  });
});

describe("board", () => {
  test("is empty", () => {
    const board = createBoard();
    const expectedBoard = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    expect(board).toEqual(expectedBoard);
  });
});

describe("get horizontal played row", () => {
  test("empty board", () => {
    const board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: stackedLeft.leftIndex, // 0 base index
    };
    expect(getHorizontalAdjacentPieces(board, move)).toEqual(["o", 0, 0, 0]);
  });

  test("right of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    board[firsRow] = stackRight(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: board[firsRow].rightIndex, // 0 base index
    };
    expect(getHorizontalAdjacentPieces(board, move)).toEqual([0, 0, 0, "o"]);
  });

  test("center of board", () => {
    let board = [
      { row: [0, 0, 0, 0, "x", "o", "o"], leftCount: 0, rightCount: 3 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    board[firsRow] = stackRight(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: board[firsRow].rightIndex, // 0 base index
    };
    const expectedArray = [0, 0, 0, "o", "x", "o", "o"];
    expect(getHorizontalAdjacentPieces(board, move)).toEqual(expectedArray);
  });
});

describe("get vertical played column", () => {
  test("empty board firsts row", () => {
    const board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: stackedLeft.leftIndex, // 0 base index
    };
    const expectedColumn = ["o", 0, 0, 0];
    expect(getVerticalAdjacentPieces(board, move)).toEqual(expectedColumn);
  });

  test("empty board last row of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const lastRow = 6;
    board[lastRow] = stackRight(board[lastRow], "o");
    const move = {
      row: lastRow,
      column: board[lastRow].rightIndex, // 0 base index
    };

    expect(getVerticalAdjacentPieces(board, move)).toEqual([0, 0, 0, "o"]);
  });

  test("vertical center of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: ["o", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const centerRow = 3;
    board[centerRow] = stackLeft(board[centerRow], "o");
    const move = {
      row: centerRow,
      column: board[centerRow].leftIndex, // 0 base index
    };
    const verticalAdjacentPieces = getVerticalAdjacentPieces(board, move);
    const expectedArray = [0, "o", "x", "o", 0, "x", 0];

    expect(verticalAdjacentPieces.length).toBe(7);
    expect(verticalAdjacentPieces).toEqual(expectedArray);
  });
});

describe("win condition", () => {
  test("empty board", () => {
    const board = createBoard();
    const expectedBoard = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      col: stackedLeft.leftCount,
    };
    expect(isWinningMove(move, board)).toBe(false);
  });
});
