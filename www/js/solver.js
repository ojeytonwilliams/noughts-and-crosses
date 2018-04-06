let lines = require('./lines');
let _ = require('lodash');
const {
  game
} = require('./game.js');
const {
  allNextStates
} = require('./play');

function hasWinner(state) {
  // it's impossible to win in less than 5 moves
  var len = state.length;
  if (len < 5) return false;
  var playerMoves = moves(state);
  // NOTE: the dumb way!  Namely, try each solution and see if it
  // can be found in the moves.
  //  console.log("playerMoves", playerMoves);
  let solved = false;

  lines.lines.forEach(soln => {
    if (hasSolution(playerMoves, soln)) {
      solved = true;
    }
  });
  return solved;
}

function isDrawn(moves) {
  return moves.length == 9 && !hasWinner(moves);
}

function hasSolution(moves, soln) {
  let count = 0;
  // If we can find each of the three values in soln
  soln.forEach(pos => {
    // ... inside moves, that means that the set of moves wins the game.
    let id = moves.findIndex(move => _.isEqual(move, pos));

    count += (id > -1);
  });
  return count == 3;
}

function moves(state) {
  var even = !(state.length % 2);
  // if the state has even length, we want all the odd ids (because it's zero
  // based, duh).  In this case, id + !even = id, so the predicate is just
  // id % 2, i.e. is truthy for all odd values.
  // If it has odd length, id + !even = id + 1, so the predicate is just
  // (id + 1) % 2 and is truthy for all even values
  return state.filter((x, id) => {
    return ((id + !even) % 2)
  });
}

// Picks out the games where player one wins.
function p1Wins(gameStates) {
  return gameStates.filter(game => {
    let p1HasLastMove = (game.getMoves().length % 2);
    if (!p1HasLastMove) {
      return false;
    } else {
      return hasWinner(game.getMoves());
    }
  });
}

function p2Wins(gameStates) {
  return gameStates.filter(game => {
    let p2HasLastMove = !(game.getMoves().length % 2);
    if (!p2HasLastMove) {
      return false;
    } else {
      return hasWinner(game.getMoves());
    }
  });
}

function draws(gameStates) {
  return gameStates.filter(game => {
    return isDrawn(game.getMoves());
  });
}

function ongoing(gameStates) {
  return gameStates.filter(game => {
    return game.getMoves().length != 9 && !hasWinner(game.getMoves());
  });
}

function rank(gameState, move, player) {
  let [wins, losses, drawnGames] = [0, 0, 0];
  let currentGame = game(gameState.getMoves(), gameState.getRemainingMoves());

  currentGame.move(move);
  if (hasWinner(currentGame.getMoves())) {
    return 1;
  } else if (isDrawn(currentGame.getMoves())) {
    return 0;
  }

  let undecided = true;
  let gameStates = [currentGame];
  while(gameStates.length) {
    let next = allNextStates(gameStates);
    drawnGames += draws(next).length;
    if (player == 2) {
      wins += p2Wins(next).length;
      losses += p1Wins(next).length;
    } else {
      wins += p1Wins(next).length;
      losses += p2Wins(next).length;
    }
    gameStates = ongoing(next);
  }

  /*console.log("next", next);
  console.log("next 0, moves", next[0].getMoves());
  console.log("move", move);
  console.log(wins, losses, drawnGames); */
  return (wins - losses)/(wins + losses + drawnGames);
}
console.log("top left", rank(game(),[1,1],1));
console.log("top", rank(game(),[1,2],1));
console.log("middle", rank(game(), [2,2],1));

exports.moves = moves;
exports.hasWinner = hasWinner;
exports.hasSolution = hasSolution;
exports.p1Wins = p1Wins;
exports.p2Wins = p2Wins;
exports.draws = draws;
exports.rank = rank;
exports.ongoing = ongoing;
