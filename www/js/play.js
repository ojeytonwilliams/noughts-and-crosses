const { game } = require('./game.js');

function nextMoves(gameState) {
  return [...gameState.getRemainingMoves()].map(move => {
    // Create a copy of the current game state and then make the move.
    return game(gameState.getMoves(), gameState.getRemainingMoves()).move(move);
  })
}

exports.nextMoves = nextMoves;

// Here states is an array of games
exports.allNextStates = function (states) {
  // get all the subsequent game states and squash them into a single array.
  return states.map(nextMoves).reduce((acc,cv) => acc.concat(cv));
};
