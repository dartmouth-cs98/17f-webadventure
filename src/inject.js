/* eslint no-undef: "off" */
import GameView from './gameView';

console.log('hi');

const gameView = new GameView();
gameView.highlightChar(0, 0, 1, 'red');
const b = gameView.getDown(0, 0, 1);
gameView.highlightChar(b[0], b[1], b[2], 'blue');

gameView.highlightChar(0, 2, 0, 'green');
const moves = gameView.getMoves(0, 2, 0);
moves.forEach((m) => {
  console.log(m);
  if (m) {
    gameView.highlightChar(m[0], m[1], m[2]);
  }
});
