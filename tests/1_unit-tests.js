const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', (done) => {
        const result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.equal(result.valid, true);
        done();
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
        const result = solver.validate('1a5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.equal(result.valid, false);
        assert.equal(result.error, 'Invalid characters in puzzle');
        done();
    });
    test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
        const result = solver.validate('15..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.equal(result.valid, false);
        assert.equal(result.error, 'Expected puzzle to be 81 characters long');
        done();
    });
    test('Logic handles a valid row placement', (done) => {
        const result = solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 3);
        assert.equal(result, true);
        done();
    });
    test('Logic handles an invalid row placement', (done) => {
        const result = solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 1);
        assert.equal(result, false);
        done();
    });
    test('Logic handles a valid column placement', (done) => {
        const result = solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 3);
        assert.equal(result, true);
        done();
    });
    test('Logic handles an invalid column placement', (done) => {
        const result = solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 2);
        assert.equal(result, false);
        done();
    });
    test('Logic handles a valid region (3x3 grid) placement', (done) => {
        const result = solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 3);
        assert.equal(result, true);
        done();
    });
    test('Logic handles an invalid region (3x3 grid) placement', (done) => {
        const result = solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 'a', 2, 1);
        assert.equal(result, false);
        done();
    });
    test('Valid puzzle strings pass the solver', (done) => {
        const result = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.exists(result.solution);
        done();
    });
    test('Invalid puzzle strings fail the solver', (done) => {
        const result = solver.solve('15..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.exists(result.error);
        done();
    })
    test('Solver returns the the expected solution for an incomplete puzzle', (done) => {
        const result = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.equal(result.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        done();
    })
});
