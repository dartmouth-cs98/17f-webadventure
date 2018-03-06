import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import App from '../components/app';
import WikiGame from '../wikiGame';
import Player from '../player';

let wikiGame;

const onNewUrl = (newUrl) => {
  const req = {
    message: 'new url',
    payload: {
      newUrl,
    },
  };
  chrome.runtime.sendMessage(req);
};

const exitGame = () => {
  wikiGame.endGame();
  $('#wa-main').remove();
  const req = {
    message: 'quit game',
  };
  wikiGame = null;
  chrome.runtime.sendMessage(req);
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'new game') {
    const {
      counter, username, avatar, game, audioOn,
    } = request.payload;
    // console.log("new game in inject.js");
    // console.log(game);
    const curPlayer = new Player(username, avatar);
    const leaderboard = {
      curPlayer: {
        name: curPlayer.username,
        avatarRight: curPlayer.getAvatarRight(),
      },
      players: game.players,
      goalPage: game.goalPage,
      audioOn,
    };
    $('body').append('<div id=wa-main />');
    ReactDOM.render(<App exitGame={exitGame} leaderboard={leaderboard} counter={counter} />, document.getElementById('wa-main'));
    wikiGame = new WikiGame(onNewUrl, curPlayer, game, audioOn);
  }
});
