const {
  game
} = require('./game');
const {
  hasWinner
} = require('./solver');
const _ = require('lodash');

// NOTE: we're currently ignoring depth.  May have to think about it if it's
// too slow.
// NOTE: I use the terminology 'currentPlayer' over 'maximizingPlayer'
// because we're ranking the game state *after* a move has been made
// This means that the child plays are made by the other player and, so we
// should pick the one that minimises their score.
function minimax(gameState, depth, currentPlayer) {
  // defensive copy
//  gameState = game(gameState.getMoves());
  let remaining = gameState.getRemainingMoves();
  let moves = gameState.getMoves();

  // we know how to evaluate the first move (edges are bad, everything else is fine)

//  if(remaining.length == 8) {
  if(remaining.size === 8) {
    return rankFirstMove(moves[0]);
  }

  // win
  if(hasWinner(gameState)) {
    return currentPlayer ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }
  // draw
  //if (remaining.length === 0) {
  if(remaining.size === 0) {
    return 0;
  }

  // undecided
/*  let values = remaining.map(childMove => {
    let nextGameState = game(moves);
    return minimax(nextGameState.move(childMove), depth - 1, !currentPlayer);
  }); */

  let values = [...remaining].map(childMove => {
      let nextGameState = game(moves);
      return minimax(nextGameState.move(childMove), depth - 1, !currentPlayer);
    });

  //console.log("remaining", remaining);
  //console.log("maximizing", currentPlayer);
  //console.log("depth", depth);
  //console.log(values);


  return currentPlayer ? values.reduce((a, b) => Math.min(a, b)) : values.reduce((a, b) => Math.max(a, b));

};

function rankFirstMove(firstMove) {
//  the edges are [2,4,6,8], so if the first move is even it's a mistake.
  return firstMove % 2 == 0 ? Number.NEGATIVE_INFINITY : 0;
}


exports.minimax = minimax;
exports.rankFirstMove = rankFirstMove;
