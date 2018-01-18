/* eslint no-undef: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import WikiGame from './wikiGame';
import App from './components/app';

$('body').append('<div id=wa_main />');

const wikiGame = new WikiGame();
console.log(wikiGame);
ReactDOM.render(<App />, document.getElementById('wa_main'));
