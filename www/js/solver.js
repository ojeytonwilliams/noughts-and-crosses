

function hasWinner(state) {
  // it's impossible to win in less than 5 moves
  var len = state.length;
  if (len < 5) return false;
  var playerMoves = moves(state);
}

function moves(state) {
  var even = !(state.length % 2);
  state.filter((x,id) => {return ((id + even) % 2)});
  return [];
}

exports.moves = moves;
exports.hasWinner = hasWinner;
