const _ =  require('lodash');
const { grid, asArray } = require('./grid.js');


exports.game = function (oldMoves, oldRemaining) {
  let moves = oldMoves ? oldMoves.slice() : [];
  let remaining = oldRemaining ? oldRemaining.slice() : asArray();
  return {
    getMoves: function getMoves() {
      return moves;
    },
    getRemainingMoves: function getRemainingMoves() {
      return remaining;
    },
    move: function move(pos) {
      moves.push(pos);
      remaining = remaining.filter(x => !_.isEqual(x, pos));
      return this;
    }
  }
}
