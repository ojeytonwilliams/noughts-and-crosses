const { List } = require('immutable');
let grid = List();
for (var i = 1; i <= 3; i++) {
  for (var j = 1; j <= 3; j++) {
    grid = grid.push(List([i,j]));
  }
}


exports.grid = grid;
exports.asArray = function () {
  return grid.toArray().map(x => x.toArray());
};
