/* eslint no-undef: "off" */
import $ from 'jquery';

// import GameDriver from './gameDriver';
// import GameView from './gameView';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

$('body').append('<div id=main />');

ReactDOM.render(<App />, $('#main'));


// console.log('hi');
// const url = window.location.href;
// const gameView = new GameView();
// const gameDriver = new GameDriver(url, gameView);
// window.addEventListener('keydown', gameDriver.moveSelection);
// GameView.startPopup((username, playerColor) => gameDriver.startGame(username, playerColor));
