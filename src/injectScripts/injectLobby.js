import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from '../components/lobby';

const onStart = (user, game) => {
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
  chrome.runtime.sendMessage({ message: 'close lobby' });
};

chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'render lobby' && $('#wa-lobby').length === 0) {
    $('body').append('<div id=wa-lobby />');
    if (req.payload && req.payload.username) {
      ReactDOM.render(<Lobby onStart={onStart} audioOn={req.payload.audioOn} username={req.payload.username} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    } else {
      ReactDOM.render(<Lobby onStart={onStart} audioOn={req.payload.audioOn} exitGame={exitGame} />, document.getElementById('wa-lobby'));
    }
  }
});
