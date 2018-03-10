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

  console.log("inject onNewUrl 1");

  chrome.runtime.sendMessage(req);

  console.log("inject onNewUrl 2");
};

const exitGame = () => {

  console.log("exitGame 1");

  wikiGame.endGame();

  console.log("exitGame 2");

  $('#wa-main').remove();

  console.log("exitGame 3");

  const req = {
    message: 'quit game',
  };
  wikiGame = null;

  console.log("exitGame 4");

  chrome.runtime.sendMessage(req);

  console.log("exitGame 5");

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

    console.log("new game 1");

    ReactDOM.render(
      <App exitGame={exitGame} leaderboard={leaderboard} counter={counter} />,
      document.getElementById('wa-main'), () => {
        $('#wa-loading').remove();
      },
    );

    console.log("new game 2");

    wikiGame = new WikiGame(onNewUrl, curPlayer, game, audioOn);

    console.log("new game 3");

  } else if (request.message === 'redirect') {
    // Check that loaded page will trigger a redirect from Wikipedia
    if ($('.mw-redirectedfrom')[0]) {

      console.log("redirect 1");

      sendResponse({ message: 'redirect' });

      console.log("redirect 1.1");

    } else {

      console.log("redirect 2");

      sendResponse({ message: '' });

      console.log("redirect 2.1");

    }
  }
});
