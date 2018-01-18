/* eslint no-undef: "off" */
import GameDriver from './gameDriver';
import GameView from './gameView';

console.log('inject.js!!!');
const url = window.location.href;
const gameView = new GameView();
const gameDriver = new GameDriver(url, gameView);
window.addEventListener('keydown', gameDriver.moveSelection);
GameView.startPopup((username, playerColor) => gameDriver.startGame(username, playerColor));
