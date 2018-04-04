import test from 'ava';
import solver from '../js/solver.js';

// Has solution

test("No moves = no solution", t => {
  t.false(solver.hasSolution([], []), "You can't have a winner before someone moves.");
});

test("The solution is a solution", t => {
  t.true(solver.hasSolution([[1,1], [1,2], [1,3]], [[1,1], [1,2], [1,3]]));
});

test("The order of the moves doesn't matter", t => {
  t.true(solver.hasSolution([[1,1], [1,3], [1,2]], [[1,1], [1,2], [1,3]]));
});

test("The solution is in the moves", t => {
  t.true(solver.hasSolution([[1,1], [2,2], [1,2], [1,3]], [[1,1], [1,2], [1,3]]));
});
