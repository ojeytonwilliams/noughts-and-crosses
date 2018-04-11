import test from 'ava';
const lines = require('../js/lines');

test("All the solutions contain three elements", t => {
  lines.lines.forEach(soln => {
    t.is(3, soln.length ,"All the solutions contain three elements");
  });
});

test("All the elements are numbers from 1 to 9", t => {
  lines.lines.forEach(soln => {
    soln.forEach(elem => {
      t.true(elem <= 9 && elem > 0);
    })
  });
});

test("The three elements are distinct", t => {
  lines.lines.forEach(soln => {
    for(let i = 0; i < 3; i++) {
      for(let j = i + 1; j < 3; j++){
        t.not(soln[i], soln[j], "A single element should not appear twice in a solution");
      }
    }
  });
});
