import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from '../components/lobby';


$('body').append('<div id=wa_main />');
const onStart = (gameInfo) => {
  const request = {
    message: 'start game',
    payload: gameInfo,
  };
  chrome.runtime.sendMessage(request);
};
ReactDOM.render(<Lobby onStart={onStart} />, document.getElementById('wa_main'));
