import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from '../components/lobby';


$('body').append('<div id=wa-lobby />');
const onStart = (username, game) => {
  const request = {
    message: 'start game',
    payload: {
      username,
      game,
    },
  };
  document.getElementById('wa-lobby').remove();
  chrome.runtime.sendMessage(request);
};
const exitGame = () => {
  document.getElementById('wa-lobby').remove();
};
chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'render lobby') {
    console.log(req);
    if (req.payload && req.payload.username) {
      ReactDOM.render(<Lobby onStart={onStart} username={req.payload.username} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    } else {
      ReactDOM.render(<Lobby onStart={onStart} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    }
  }
});
