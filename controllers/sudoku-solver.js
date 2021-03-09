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
          error: 'Expected puzzle to be 81 characters long'
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
            error: 'Invalid characters in puzzle'
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
      // if (row + column == 'a3') {
      //   console.log('coordinate:', row + column);
      //   console.log('value:', value);
      //   console.log('condition:', puzzleString[this.coordination.indexOf(row + column)] == value &&
      //     myRow.match(new RegExp(value, 'g')).length == 1);
      //   console.log(myRow);
      //   console.log(!myRow.includes(value))
      // }
      return (!myRow.includes(value))
        ? true
        : (puzzleString[this.coordination.indexOf(row + column)] == value &&
          myRow.match(new RegExp(value, 'g')).length == 1)
          ? true
          : false

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
      return (!myColumn.includes(value))
        ? true
        : (puzzleString[this.coordination.indexOf(row + column)] == value &&
          myColumn.match(new RegExp(value, 'g')).length == 1)
          ? true
          : false

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
      return (!myRegion.includes(value))
        ? true
        : (puzzleString[this.coordination.indexOf(row + column)] == value &&
          myRegion.match(new RegExp(value, 'g')).length == 1)
          ? true
          : false

    } catch (err) {
      throw err;
    }
  }


  solve(puzzleString) {
    try {
      let solutionArray = [...puzzleString];
      for (let i = 0; i < solutionArray.length; i++) {

        if (puzzleString[i] == '.') {
          for (let j = 1; j <= 9; j++) {
            const coordinate = this.coordination[i];
            const row = coordinate.charAt(0);
            const col = coordinate.charAt(1);
            const rowValid = this.checkRowPlacement(solutionArray.join(''), row, col, j);
            const colValid = this.checkColPlacement(solutionArray.join(''), row, col, j);
            const regionValid = this.checkRegionPlacement(solutionArray.join(''), row, col, j);

            if (rowValid && colValid && regionValid) {
              solutionArray[i] = j;
              break;
            } else if (j == 9) {
              // need to backtrack from here
              // decrease i by 1 until found previous .
              // then make j choose next solution instead of current solution
              // if that can't solve it again, redo the steps until we can't increment the first one

              //  situation: current position cannot be fitted with any numbers(1-9)
              //  so you need to move backward until you find previous solution and increment it by 1

              //  everytime you move backward, make sure solutionArray is also in the previous state
              //console.log('backtracking...');
              while (i != 0) {
                i--;
                if (puzzleString[i] == '.') {
                  //console.log('now we are at index:', i);
                  //console.log('previous solution:', solutionArray[i]);
                  j = solutionArray[i];
                  if (j == 9) {
                    continue;
                  } else {
                    solutionArray = solutionArray.slice(0, i + 1).concat([...puzzleString.slice(i + 1)]);
                    break;
                  }
                }
              }
              if (i == 0) {
                return { "error": "Puzzle cannot be solved" };
              } else {
                continue;
              }
            } else {
              continue;
            }
          }
        } else {
          const coordinate = this.coordination[i];
          const row = coordinate.charAt(0);
          const col = coordinate.charAt(1);
          const rowValid = this.checkRowPlacement(solutionArray.join(''), row, col, solutionArray[i]);
          const colValid = this.checkColPlacement(solutionArray.join(''), row, col, solutionArray[i]);
          const regionValid = this.checkRegionPlacement(solutionArray.join(''), row, col, solutionArray[i]);

          if (rowValid && colValid && regionValid) {
            continue;
          } else {
            // console.log("element:", solutionArray[i], "\n", "index:", i)
            return { "error": "Puzzle cannot be solved" };
          }
        }
      }
      const solutionString = solutionArray.join('');
      return { solution: solutionString };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SudokuSolver;

