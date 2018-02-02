import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import WikiGame from './wikiGame';
import Lobby from './components/lobby';

$('body').append('<div id=wa_main />');

ReactDOM.render(<Lobby />, document.getElementById('wa_main'));
