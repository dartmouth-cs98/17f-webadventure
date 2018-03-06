import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import End from '../components/end';

let curPlayerInfo;

const exitGame = () => {
  document.getElementById('wa-main-end').remove();
  const req = {
    message: 'quit game',
  };
  chrome.runtime.sendMessage(req);
};
const onNewGame = (username) => {
  document.getElementById('wa-main-end').remove();
  const req = {
    message: 'end to lobby',
    payload: {
      username,
    },
  };
  chrome.runtime.sendMessage(req);
};
chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'end game info') {
    ({ curPlayerInfo } = req.payload);
    const game = req.payload.game;
    const leaderboard = req.payload.game.players;
    ReactDOM.render(
      <End
        onNewGame={onNewGame}
        exitGame={exitGame}
        curPlayerInfo={curPlayerInfo}
        leaderboard={leaderboard}
        game={game}
      />,
      document.getElementById('wa-main-end'),
    );
  }
});
$('body').append('<div id=wa-main-end />');
