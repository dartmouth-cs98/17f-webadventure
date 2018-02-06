/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import LobbyGameView from './lobbyGameView';

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
        <LobbyGameView />
      </div>
    );
  }
}

export default Lobby;
