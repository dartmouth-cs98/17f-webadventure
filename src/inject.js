/* eslint no-undef: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// <<<<<<< HEAD
// const url = window.location.href;
// const gameView = new GameView();
// const gameDriver = new GameDriver(url, gameView);
// window.addEventListener('keydown', gameDriver.moveSelection);
// GameView.startPopup((username, playerColor) => gameDriver.startGame(username, playerColor));
// =======
import WikiGame from './wikiGame';
import App from './components/app';

$('body').append('<div id=wa_main />');

const wikiGame = new WikiGame();
console.log(wikiGame);
ReactDOM.render(<App />, document.getElementById('wa_main'));
// >>>>>>> 90917ae2d31a9b059de79a2dfca039d485555a30
