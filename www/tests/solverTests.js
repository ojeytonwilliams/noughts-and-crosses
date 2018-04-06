import test from 'ava';

const solver = require('../js/solver');
const { game } = require('../js/game');

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

// Separate game states

test('Game states can be separated into p1 wins, p2 wins, draws and ongoing', t => {
  let p1win = game();
  p1win.move([1,1]).move([2,1]).move([1,2]).move([2,2]).move([1,3]);
  let p2win = game();
  p2win.move([1,1]).move([2,2]).move([1,2]).move([1,3]).move([2,1]).move([3,1]);
  let draw = game();
  draw.move([1,2]).move([1,1]).move([2,1]).move([1,3]).move([2,3]).move([2,2])
  .move([3,1]).move([3,2]).move([3,3]);
  let empty = game();

  let gameStates = [p1win, draw, p2win, empty];

  t.deepEqual(solver.p1Wins(gameStates), [p1win]);
  t.deepEqual(solver.p2Wins(gameStates), [p2win]);
  t.deepEqual(solver.draws(gameStates), [draw]);
  t.deepEqual(solver.ongoing(gameStates), [empty]);
});

test('Moves can be ranked by the weighted percentage of wins, losses and draws ', t => {
  let gameOne = game();
  //  1 2 1
  //  2 1 1
  //  2 . .
  gameOne.move([1,1]).move([1,2]).move([1,3]).move([2,1]).move([2,2]).move([3,1]).move([2,3]);
  // let gameTwo = game(gameOne.getMoves(), gameOne.getRemainingMoves());
  // At this point, p2 should get [3,3] and draw or lose.  50% of the moves win and 50% lose.
  t.is(solver.rank(gameOne, [3,3], 2), 0, 'The only move that does not lose');
  t.is(solver.rank(gameOne, [3,2], 2), -1, 'Losing play');
});

test('The ranker can identify a move that wins outright', t => {
  let gameOne = game();
  //  x 2 1
  //  2 1 1
  //  2 1 .
  gameOne.move([3,2]).move([1,2]).move([1,3]).move([2,1]).move([2,2]).move([3,1]).move([2,3]);
  t.is(solver.rank(gameOne, [1,1], 2), 1, 'Winning play');
});

test('The ranker can identify a move that draws immediately', t => {
  let gameOne = game();
  //  x 2 1
  //  2 1 1
  //  2 1 2
  gameOne.move([3,2]).move([1,2]).move([1,3]).move([2,1]).move([2,2]).move([3,1]).move([2,3]).move([3,3]);
  t.is(solver.rank(gameOne, [1,1], 1), 0, 'P1 fills the board for a draw');
});

test('The ranker can identify a move that leads to 50% wins %50 draws', t => {
  let gameOne = game();
  //  1 2 1
  //    2
  //  2 x 1
  gameOne.move([1,1]).move([1,2]).move([1,3]).move([2,2]).move([3,3]).move([3,1]);
  t.is(solver.rank(gameOne, [3,2], 1), 0.5, "P2 can either make a move that results in them losing or a draw");
});
