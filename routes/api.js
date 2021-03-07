'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (req.body.puzzle == '' || req.body.coordinate == '' || req.body.value == '') {
        res.json({ "error": "Required field(s) missing" });
      } else if (!solver.validate(req.body.puzzle).valid) {
        res.json(valid.error);
      } else if (!/^[A-Ia-i][1-9]$/.test(req.body.coordinate)) {
        res.json({ error: 'invalid coordinate' });
      } else if (!/[1-9]/.test(req.body.value)) {
        res.json({ error: 'invalid value' });
      } else {
        const row = req.body.coordinate.charAt(0);
        const col = req.body.coordinate.charAt(1);
        const rowValid = solver.checkRowPlacement(req.body.puzzle, row, col, req.body.value);
        const colValid = solver.checkColPlacement(req.body.puzzle, row, col, req.body.value);
        const regionValid = solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value);
        const conflict = { valid: false, conflict: [] };
        if (rowValid && colValid && regionValid) {
          res.json({ valid: true });
        } else {
          if (!solver.checkRowPlacement(req.body.puzzle, row, col, req.body.value)) {
            conflict.conflict.push('row');
          }
          if (!solver.checkColPlacement(req.body.puzzle, row, col, req.body.value)) {
            conflict.conflict.push('column');
          }
          if (!solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value)) {
            conflict.conflict.push('region');
          }
          res.json(conflict);
        }
      }
    });

  app.route('/api/solve')
    .post((req, res) => {

    });

  app.route('/api/checkValid')
    .post((req, res) => {
      const result = solver.validate(req.body.puzzle);
      res.send(result);
    });

  app.route('/api/checkRow')
    .post((req, res) => {
      const result = solver.checkRowPlacement(req.body.puzzle, req.body.row, req.body.column, req.body.value);
      res.send(result);
    });

  app.route('/api/checkCol')
    .post((req, res) => {
      const result = solver.checkColPlacement(req.body.puzzle, req.body.row, req.body.column, req.body.value);
      res.send(result);
    })

  app.route('/api/checkReg')
    .post((req, res) => {
      const result = solver.checkRegionPlacement(req.body.puzzle, req.body.row, req.body.column, req.body.value);
      res.send(result);
    })
};
