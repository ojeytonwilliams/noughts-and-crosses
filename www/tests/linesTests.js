import test from 'ava';
const lines = require('../js/lines');

test("All the solutions contain three elements", t => {
  lines.lines.forEach(soln => {
    t.is(3, soln.length ,"All the solutions contain three elements");
  });
});

test("All the elements are arrays with two entries", t => {
  lines.lines.forEach(soln => {
    soln.forEach(elem => {
      t.is(2, elem.length);
    })
  });
});

test("The three elements are distinct", t => {
  lines.lines.forEach(soln => {
    for(let i = 0; i < 3; i++) {
      for(let j = i + 1; j < 3; j++){
        t.notDeepEqual(soln[i], soln[j],
          "A single element should not appear twice in a solution");
      }
    }
  });
});
