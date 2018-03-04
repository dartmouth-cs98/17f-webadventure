/* eslint  max-len:0 */

import React from 'react';

const LobbyTop = (props) => {
  return (
    <div id="lobby-top">
      <span>
        <button className="exit-lobby-button" onClick={props.exitGame}>&times;</button>
      </span>
      <div>
        <svg id="info" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <div id="sound" className="sound-on" />
        <div id="info-box">
          HOW TO PLAY
          <div>Race other WebAdventurers to the goal page and learn more about the world!</div>
          <img id="nav-keys" className="info-img" alt="nav-keys" src="https://i.imgur.com/qPjFtPZ.png" />
          <div>Move across the page with WASD and jump links with the L key</div>
        </div>
      </div>
    </div>
  );
};

export default LobbyTop;
