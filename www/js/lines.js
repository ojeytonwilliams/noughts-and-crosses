let horizontal = [];
let vertical = [];
let diagonal = [];

let down = [];
let up = [];

for(let i = 0; i < 3; i++){
  let row = [];
  let col = [];
  for(let j = 0; j < 3; j++) {
    row.push(1 + 3 * i + j);
    col.push(1 + i + 3 * j);
  }
  horizontal.push(row);
  vertical.push(col);
  down.push(1 + 4 * i);
  up.push(7 - 2 * i);
}

diagonal.push(up);
diagonal.push(down);

// NOTE: invalid solution, since the order isn't correct
//diagonal.push([[1,1], [1,1], [2,2]]);


exports.diagonal = diagonal;
exports.horizontal = horizontal;
exports.vertical = vertical;
exports.lines = diagonal.concat(horizontal, vertical);

/*
console.log(exports.diagonal);
console.log(exports.horizontal);
console.log(exports.vertical); */
