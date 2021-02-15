class SudokuSolver {

  validate(puzzleString) {
    try {
      if (puzzleString.length != 81) {
        return {
          result: false,
          error: "Expected puzzle to be 81 characters long"
        };
      } else {
        const regex = /[1-9.]{81}/g;
        const valid = regex.test(puzzleString);
        valid
          ? {
            result: true
          }
          : {
            result: false,
            error: "Invalid characters in puzzle"
          }
      }
    } catch (err) {
      throw err;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

