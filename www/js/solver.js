let lines = require('./lines');
let _ = require('lodash');

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
    if(hasSolution(playerMoves, soln)){
      solved = true;
    }
  });
  return solved;
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
  return state.filter((x,id) => {return ((id + !even) % 2)});
}

exports.moves = moves;
exports.hasWinner = hasWinner;
exports.hasSolution = hasSolution;
