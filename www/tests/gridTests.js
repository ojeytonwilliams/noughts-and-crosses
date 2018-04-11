import test from 'ava';
const { grid, asObject } = require('../js/grid');

test('Grid should have the numbers 1 through 9', t => {
  t.is(grid.size, 9);
  for(var i = 1; i <= 9; i++) {
    t.is(grid.get(i - 1), i, );
  }
});

test('asObject should return an object whose keys are the numbers 1 through 9', t => {
  let keys = Object.keys(asObject());
  t.is(keys.length, 9);
  for(var i = 1; i <= 9; i++) {
    t.true(keys.includes("" + i));
  }
});
