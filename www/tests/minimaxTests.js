import test from 'ava';
const {minimax, rankFirstMove} = require('../js/minimax');
const {game} = require('../js/game');

/*EDIT: the minimax function should be taking a possible move (with a game state attached)
and just evaluating it - giving it a value from -infinity to +infinity, not actually deciding
which move to take! */

test('rankFirstMove should put the edges as losses and the rest draws', t => {
  t.is(rankFirstMove([2,1]), Number.NEGATIVE_INFINITY);
  t.is(rankFirstMove([2,2]), 0);
  t.is(rankFirstMove([3,3]), 0);
  t.is(rankFirstMove([1,2]), Number.NEGATIVE_INFINITY);

})

test('Minimax gives a winning state a score of +infinity', t => {
  let gameOne = game();

  //  x 1 2
  //  1 2 2
  //  1 2 1

  gameOne.move([3,3]).move([3,2]).move([1,2]).move([1,3]).move([2,1])
  .move([2,2]).move([3,1]).move([2,3]).move([1,1]);
  t.is(minimax(gameOne, 1, true), Number.POSITIVE_INFINITY, "Should be a winning state for p1");
});

test('Minimax gives a draw a score of 0', t => {
  let gameOne = game();

  //  2 1 2
  //  2 1 1
  //  1 2 x

  gameOne.moves([[1,2],[1,3],[2,2],[2,1],[2,3],[3,2],[3,1],[1,1],[3,3]]);
  t.is(minimax(gameOne, 1, true), 0, "Draw");
});

test('When you cannot win, the score for a move should be -(their best score, given that move)', t => {
  let gameOne = game();
  let gameTwo = game();
  //  1 2 1
  //  2 1 1
  //  2 . .
  gameOne.moves([[1,1], [1,2], [1,3], [2,1], [2,2], [3,1], [2,3]]);
  gameTwo.moves([[1,1], [1,2], [1,3], [2,1], [2,2], [3,1], [2,3]]);
  t.is(minimax(gameOne.move([3, 2]), 2, true), Number.NEGATIVE_INFINITY, 'Losing play.');
  t.is(minimax(gameTwo.move([3, 3]), 2, true), 0, 'Draw.');

  // At this point, p2 should get [3,3] and draw or lose.  50% of the moves win and 50% lose.
});

test('Two steps', t => {
  let gameOne = game();
  let gameTwo = game();
  //  2 2 1
  //  2 1 1
  //  . 1 .
  gameOne.moves([[1,3], [1,1], [2,2], [1,2], [2,3], [2,1], [3,2]]);
  gameTwo.moves([[1,3], [1,1], [2,2], [1,2], [2,3], [2,1], [3,2]]);
  t.is(minimax(gameOne.move([3, 1]), 2, true), Number.POSITIVE_INFINITY, 'Win.');
  t.is(minimax(gameTwo.move([3, 3]), 2, true), Number.NEGATIVE_INFINITY, 'Loss.');

  // At this point, p2 should get [3,3] and draw or lose.  50% of the moves win and 50% lose.
});




test('Minimax should be able to look three moves ahead', t => {
  let gameOne = game();
  //  1 2 1
  //  2 1 .
  //  2 . .
  gameOne.moves([[1,1], [1,2], [1,3], [2,1], [2,2], [3,1]]);
  t.is(minimax(game(gameOne.getMoves()).move([3, 3]), 3, true), Number.POSITIVE_INFINITY, 'Should win outright.');
  t.is(minimax(game(gameOne.getMoves()).move([2, 3]), 3, true), 0, 'Draw.');
  t.is(minimax(game(gameOne.getMoves()).move([3, 2]), 3, true), 0, 'Draw.');
  // At this point, p2 should get [3,3] and draw or lose.  50% of the moves win and 50% lose.
});



test('The corners and center should rank 0 while the edges should rank -infinity', t => {
  let drawingMoves = [[1,1],[1,3],[2,2],[3,1],[3,3]];
  let losingMoves = [[1,2],[2,1],[2,3],[3,2]];

  drawingMoves.forEach(move => {
    t.is(minimax(game([move]),9,true), 0);
  });

  losingMoves.forEach(move => {
    t.is(minimax(game([move]),9,true), Number.NEGATIVE_INFINITY, move + ' should be a loss');
  });
});

test('Center after corner (and vice versa) should be a draw', t => {
  t.is(minimax(game([[2,2],[1,1]]), 7, true), 0);
  t.is(minimax(game([[1,1],[2,2]]), 7, true), 0);
})

test('Edge after center should lose', t => {
  t.is(minimax(game([[2,2],[1,2]]), 7, true), Number.NEGATIVE_INFINITY);

})
