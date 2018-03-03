import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from '../components/lobby';


$('body').append('<div id=wa-lobby />');
const onStart = (user, game) => {
  console.log('on start!');
  const request = {
    message: 'start game',
    payload: {
      user,
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
    if (req.payload && req.payload.username) {
      ReactDOM.render(<Lobby onStart={onStart} username={req.payload.username} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    } else {
      ReactDOM.render(<Lobby onStart={onStart} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    }
  }
});
