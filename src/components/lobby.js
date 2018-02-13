/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import SignUp from './signup';
import LobbyDetailsView from './lobbyDetailsView';
import LobbyGamesView from './lobbyGamesView';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div id="lobby">
        <div id="lobby-title">WEBADVENTURE</div>
        <div id="lobby-contents">
          <LobbyGamesView />
          <div id="lobby-columns">
            <SignUp />
            <LobbyDetailsView />
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
