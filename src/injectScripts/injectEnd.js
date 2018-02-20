import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import End from '../components/end';

console.log('end!');
$('body').append('<div id=wa-main-end />');
ReactDOM.render(<End />, document.getElementById('wa-main-end'));
