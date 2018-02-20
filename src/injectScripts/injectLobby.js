import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from '../components/lobby';


$('body').append('<div id=wa_lobby />');
const onStart = (username, game) => {
  const request = {
    message: 'start game',
    payload: {
      username,
      game,
    },
  };
  document.getElementById('wa_lobby').remove();
  chrome.runtime.sendMessage(request);
};
ReactDOM.render(<Lobby onStart={onStart} />, document.getElementById('wa_lobby'));
