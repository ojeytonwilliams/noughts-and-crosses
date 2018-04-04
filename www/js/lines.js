let horizontal = [];
let vertical = [];
let diagonal = [];

let down = [];
let up = [];

for(let i = 1; i <= 3; i++){
  let row = [];
  let col = [];
  for(let j = 1; j <= 3; j++) {
    row.push([i, j]);
    col.push([j, i]);
  }
  horizontal.push(row);
  vertical.push(col);
  down.push([i, i]);
  up.push([4-i, i]);
}

diagonal.push(up);
diagonal.push(down);

// NOTE: invalid solution, since the order isn't correct
//diagonal.push([[1,1], [1,1], [2,2]]);

console.log(diagonal);

exports.diagonal = diagonal;
exports.horizontal = horizontal;
exports.vertical = vertical;
exports.lines = diagonal.concat(horizontal, vertical);
