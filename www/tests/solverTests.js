import test from 'ava';

const solver = require('../js/solver');

// Moves
test("No moves yet", t => {
  t.deepEqual(solver.moves([]), []);
});
test("Last player's moves", t => {
  t.deepEqual(solver.moves([[1,1], null, [1,2], null, [1,3]]),
  [[1,1],[1,2],[1,3]], "One player's moves are interleaved with the other's");
});
test("Last player's moves again", t => {
  t.deepEqual(solver.moves([[1,1], null, [1,2], null, [1,3], [1,2], [1,4]]),
  [[1,1],[1,2],[1,3], [1,4]], "One player's moves are interleaved with the other's");
});


// Wins

test("You have to play to win", t => {
  t.false(solver.hasWinner([]), "You can't have a winner before someone moves.");
});

test("Horizontal win", t => {
  t.true(solver.hasWinner([[1,1], null, [1,2], null, [1,3]]), "A horizontal line should have won.");
});

test("Horizontal win, different order", t => {
  t.true(solver.hasWinner([[1,3], null, [1,1], null, [1,2]]), "The order of placement should not matter.");
})

test("A line must be complete (horizontal)", t => {
  t.false(solver.hasWinner([[1,3], null, [2,2], null, [1,1]]), "A line with a missing element is not a line.");
});

test("A line must be complete (vertical)", t => {
  t.false(solver.hasWinner([[3,1], null, [2,2], null, [1,1]]), "A line with a missing element is not a line.");
});
