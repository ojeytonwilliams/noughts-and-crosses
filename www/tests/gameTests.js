import test from 'ava';
const _ = require('lodash');
const { game } = require('../js/game.js');
const { grid, asArray } = require('../js/grid');

test.beforeEach(t => {
	t.context.gameOne = game();
});

test('A game should store the moves made and the moves remaining', t => {
  let gameOne = t.context.gameOne;
  t.deepEqual(gameOne.getMoves(), [], 'A new game should have no moves');
});

test('A game should store the moves remaining', t => {
  let gameOne = t.context.gameOne;

  t.deepEqual(gameOne.getRemainingMoves(), asArray(), 'The game should start with a full grid of moves available');
});

test('After a move is made, the game should show that move', t => {
  let gameOne = t.context.gameOne;
    gameOne.move([1,1]);
    t.deepEqual(gameOne.getMoves(), [[1,1]]);
});

test('After a move is made, the remaining moves should not include it', t => {
  let gameOne = t.context.gameOne;
  var move = [1,1];
  gameOne.move([1,1]);
  var remaining = asArray().filter(x => !_.isEqual(x, move));
  console.log(remaining);
  t.deepEqual(gameOne.getRemainingMoves(), asArray().filter(x => !_.isEqual(x, move)));
});

test('A game with existing moves should be independent of the original game', t => {
  let first = [3,3];
  let second = [1,1];
  let gameOne = t.context.gameOne;
  gameOne.move(first);
  let gameTwo = game(gameOne.getMoves(), gameOne.getRemainingMoves());
  gameTwo.move(second)
  t.deepEqual(gameOne.getMoves(), [first], 'Game one should have one move');
  t.deepEqual(gameTwo.getMoves(), [first, second], 'Game two should have two moves');
});
