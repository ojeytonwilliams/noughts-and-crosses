const assert = require('assert'); //.strict; should be strict, on node 9.9.x
const solver = require('../js/solver');

// Moves
assert.deepStrictEqual(solver.moves([[1,1], null, [1,2], null, [1,3]]),
[[1,1],[1,2],[1,3]], "One player's moves are separated by the other's");
assert.deepStrictEqual(solver.moves([]), [],
"When there are no moves, we should get an empty array");



assert.ok(!solver.hasWinner([]), "You can't have a winner before someone moves.");
assert.ok(solver.hasWinner([[1,1], null, [1,2], null, [1,3]]), "A horizontal line should have won.");
assert.ok(solver.hasWinner([[1,3], null, [1,1], null, [1,2]]), "The order of placement should not matter.");
assert.ok(!solver.hasWinner([[3,1], null, [2,2], null, [1,1]]), "A line with a missing element is not a line.");
