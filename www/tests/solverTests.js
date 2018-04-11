import test from 'ava';

const solver = require('../js/solver');
const { game } = require('../js/game');

// Moves
test("No moves yet", t => {
  t.deepEqual(solver.moves([]), []);
});
test("Last player's moves", t => {
  t.deepEqual(solver.moves([1, null, 2, null, 3]),
  [1, 2, 3], "One player's moves are interleaved with the other's");
});
test("Last player's moves again", t => {
  t.deepEqual(solver.moves([1, null, 2, null, 3, 2, 4]),
  [1,2,3,4], "One player's moves are interleaved with the other's");
});


// Wins

test("You have to play to win", t => {
  t.false(solver.hasWinner(game([])), "You can't have a winner before someone moves.");
});

test("Horizontal win", t => {
  t.true(solver.hasWinner(game([1, null, 2, null, 3])), "A horizontal line should have won.");
});

test("Horizontal win, different order", t => {
  t.true(solver.hasWinner(game([3, null, 1, null, 2])), "The order of placement should not matter.");
})

test("A line must be complete (horizontal)", t => {
  t.false(solver.hasWinner(game([3, null, 5, null, 1])), "A line with a missing element is not a line.");
});

test("A line must be complete (vertical)", t => {
  t.false(solver.hasWinner(game([3, null, 5, null, 1])), "A line with a missing element is not a line.");
});

// Separate game states

test('Game states can be separated into p1 wins, p2 wins, draws and ongoing', t => {
  let p1win = game();
  p1win.move(1).move(4).move(2).move(5).move(3);
  let p2win = game();
  p2win.move(1).move(5).move(2).move(3).move(4).move(7);
  let draw = game();
  draw.move(2).move(1).move(4).move(3).move(6).move(5)
  .move(7).move(8).move(9);
  let empty = game();

  let gameStates = [p1win, draw, p2win, empty];

  t.deepEqual(solver.p1Wins(gameStates), [p1win]);
  t.deepEqual(solver.p2Wins(gameStates), [p2win]);
  t.deepEqual(solver.draws(gameStates), [draw]);
  t.deepEqual(solver.ongoing(gameStates), [empty]);
});
