import test from 'ava';
const { allNextStates, nextMoves } = require('../js/play.js');
const { game } = require('../js/game.js');
const { asArray } = require('../js/grid.js');
const _ = require('lodash');
const { hasWinner } = require('../js/solver.js');


test('The AI should try every move to start a game', t => {
  let gameOne = game();
  let nextTurns = nextMoves(gameOne);
  // To get an array of moves, we need to flatten slightly, because nextTurns returns *arrays*
  // of moves, so we extract the first element.
  let moves = nextTurns.map(turn => turn.getMoves()[0]);
  asArray().forEach(pos => {
    t.truthy(moves.findIndex(move => _.isEqual(move, pos)) >= 0, 'All moves should be tried');
  });
});

test('If a game has one move, then there should be 8 next turns', t => {
    let gameOne = game();
    gameOne.move([2,2]);
    let nextTurns = nextMoves(gameOne);
    t.is(nextTurns.length, 8);
});

test('If a game has three moves, then there should be 6 next turns', t => {
    let gameOne = game();
    gameOne.move([2,2]).move([1,1]).move([3,3]);
    let nextTurns = nextMoves(gameOne);
    t.is(nextTurns.length, 6);
});

test('Exploring one turn should generate 9 game states', t => {
    let gameOne = game();
    t.is(allNextStates([gameOne]).length, 9);
});

test('Exploring two turns should generate 8*9 indistinct game states', t => {
    let gameOne = game();
    let afterTwoTurns = allNextStates(allNextStates([gameOne]));
    t.is(afterTwoTurns.length, 8*9);
});

test('If all game states are explored up to four moves, no winning states should be found', t => {
  let gameStates = [game()];
  for (var i = 0; i < 4; i++) {
    gameStates = allNextStates(gameStates);
  }
  let winnerId = gameStates.findIndex(state => hasWinner(state.getMoves()));
  t.falsy(winnerId > -1);
});

test('If all game states are generated for 5 turns, at least one should be a win.', t => {
  let gameStates = [game()];
  for (var i = 0; i < 5; i++) {
    gameStates = allNextStates(gameStates);
  }
  let winnerId = gameStates.findIndex(state => hasWinner(state.getMoves()));
  t.truthy(winnerId > -1);
});
