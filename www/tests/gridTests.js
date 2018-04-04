import test from 'ava';
const { grid } = require('../js/grid');

test('Grid should have 9 elements of size 2', t => {
  t.is(grid.size, 9);
  grid.forEach(x => t.is(x.size, 2));
});
