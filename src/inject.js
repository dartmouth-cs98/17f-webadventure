/* eslint no-undef: "off" */
import * as dataFunctions from './gameData';


console.log('hi');
dataFunctions.getHelloMessage();

const { GameData } = dataFunctions;

const connection = new GameData();

connection.onPlayers(players => console.log(players));
