/* eslint  max-len:0 */

import React from 'react';

const LobbyTop = (props) => {
  return (
    <div id="lobby-top">
      <span>
        <button className="exit-lobby-button" onClick={props.exitGame}>&times;</button>
      </span>
      <span className="row">
        <div id="sound-lobby" className="sound-on" />
        <div>
          <svg id="info" fill="#000000" height="37" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" transform="scale(1.5)">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <div id="info-box">
            HOW TO PLAY
            <div>Race other WebAdventurers to the goal page and learn more about the world!</div>
            <img id="nav-keys" className="info-img" alt="nav-keys" src="https://i.imgur.com/qPjFtPZ.png" />
            <div>Move across the page with WASD and jump links with the L key</div>
            <div>You get 80 points for finishing first, 60 points for finishing second, etc.</div>
            <div>You can also earn an extra point for every page you visit (up to 30 extra points!)</div>
            <div>So even if you are not first, do not get discouraged! You could still win!</div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default LobbyTop;
