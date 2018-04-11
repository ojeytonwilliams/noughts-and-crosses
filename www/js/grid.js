const { List } = require('immutable');
let grid = List();

for (var i = 1; i <= 9; i++) {
  grid = grid.push(i);
}


exports.grid = grid;
exports.asArray = function () {
  return grid.toArray();
};

exports.asObject = function () {
  let gridObj = {};
  for(var i = 1; i <= 9; i++) {
    gridObj["" + i] = null;
  }
  return gridObj;
}

exports.asSet = function asSet() {
  let gridSet = new Set();
  for(var i = 1; i <= 9; i++) {
    gridSet.add(i);
  }
  return gridSet;
}
