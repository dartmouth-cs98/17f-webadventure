import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Lobby from './components/lobby';
import LobbySocket from './sockets/lobbySocket';


const loggingCallback = (data) => {
  console.log(data);
};

const lobbySocket = new LobbySocket(loggingCallback, loggingCallback, 'almawang');
lobbySocket.createGame('almawang', { startPage: 'blah', endPage: 'blah' }).then((data) => {
  console.log('game created');
  console.log(data);
});

//
// $('body').append('<div id=wa_main />');
//
// ReactDOM.render(<Lobby />, document.getElementById('wa_main'));
