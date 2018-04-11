const _ =  require('lodash');
const { grid, asArray, asObject, asSet } = require('./grid.js');


exports.game = function (oldMoves) {
  //let moves = oldMoves ? oldMoves.slice() : [];
//  let remaining = oldRemaining ? oldRemaining.slice() : asArray();
  let moves = [];
//  let remaining = asArray();
//let remaining = asObject();
  let remaining = asSet();
  let obj = {
    getMoves: function getMoves() {
      return moves;
    },
    getRemainingMoves: function getRemainingMoves() {
      return remaining;
    },
    move: function move(pos) {
      moves.push(pos);
   //  remaining = remaining.filter(x => x !== pos);
  //    delete remaining["" + pos];
      remaining.delete(pos);
      return this;
    },
    moves: function moves(xs) {
      for(x in xs) {
        this.move(xs[x]);
      }
      return this;
    }
  };

  return obj.moves(oldMoves);
}
