import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import loading from '../components/loading.html';
import App from '../components/app';
import WikiGame from '../wikiGame';
import Player from '../player';

let wikiGame;

$('body').append(loading);
// window.setTimeout(() => {
//   console.log('some random time');
//   if (!wikiGame) { $('body').append(loading); }
// }, 10);
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'new game') {
    const {
      counter, username, avatar, game, audioOn,
    } = request.payload;
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
    ReactDOM.render(
      <App exitGame={exitGame} leaderboard={leaderboard} counter={counter} />,
      document.getElementById('wa-main'), () => {
        $('#wa-loading').remove();
      },
    );
    wikiGame = new WikiGame(onNewUrl, curPlayer, game, audioOn);
  } else if (request.message === 'redirect') {
    // Check that loaded page will trigger a redirect from Wikipedia
    if ($('.mw-redirectedfrom')[0]) {
      sendResponse({ message: 'redirect' });
    } else {
      sendResponse({ message: '' });
    }
  }
});
