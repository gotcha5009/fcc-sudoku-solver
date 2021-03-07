class SudokuSolver {
  constructor() {
    this.coordination = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9',
      'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9',
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9',
      'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9',
      'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9',
      'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9',
      'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9',
      'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9'];
  }
  validate(puzzleString) {
    try {
      if (puzzleString.length != 81) {
        return {
          valid: false,
          error: "Expected puzzle to be 81 characters long"
        };
      } else {
        const regex = /[1-9.]{81}/g;
        const valid = regex.test(puzzleString);
        return valid
          ? {
            valid: true
          }
          : {
            valid: false,
            error: "Invalid characters in puzzle"
          }
      }
    } catch (err) {
      throw err;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    try {
      let myRow = '';
      this.coordination.forEach((element, index) => {
        if (element.includes(row)) {
          myRow += puzzleString[index];
        }
      });
      return myRow.includes(value) ? false : true;

    } catch (err) {
      throw err;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    try {
      let myColumn = '';
      this.coordination.forEach((element, index) => {
        if (element.includes(column)) {
          myColumn += puzzleString[index];
        }
      });
      return myColumn.includes(value) ? false : true;

    } catch (err) {
      throw err;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    //get row region: convert alphabet to their ascii's ref number
    //then classify it into group of 3 using divide and modulus 

    //get column region: similar to row region, only need divide and modulus since it's already a number


    try {
      function getGroupRef(row, column) {
        const rowGroupRef = Math.floor((row.charCodeAt(0) - 97) / 3);
        const colGroupRef = Math.floor((column - 1) / 3);
        return {
          row: rowGroupRef,
          column: colGroupRef
        }
      }
      let myRegion = '';
      const groupRef = getGroupRef(row, column);
      this.coordination.forEach((element, index) => {
        if (JSON.stringify(getGroupRef(element.charAt(0), element.charAt(1))) == JSON.stringify(groupRef)) {
          myRegion += puzzleString[index];
        }
      });
      //console.log(myRegion);
      return myRegion.includes(value) ? false : true;

    } catch (err) {
      throw err;
    }
  }


  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

