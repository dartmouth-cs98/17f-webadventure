/* eslint no-undef: "off" */
import * as dataFunctions from './gameData';
import GameView from './gameView';

console.log('hi');
// dataFunctions.getHelloMessage();

// const { GameData } = dataFunctions;

// const connection = new GameData();

// connection.onPlayers(players => console.log(players));

const gameView = new GameView();
gameView.highlightChar(0, 0, 0, 'red');
gameView.highlightChar(0, 2, 0);
