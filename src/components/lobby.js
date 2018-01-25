/* eslint max-len: "off" */
/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import GameData from './../gameData';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: '',
      joinKey: '',
    };
    this.gameData = new GameData();
    this.players = this.gameData.getPlayers();

    // this.getPlayers = this.getPlayers.bind(this);
    this.renderLobby = this.renderLobby.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.onInputKey = this.onInputKey.bind(this);
  }

  onInputKey(event) {
    this.setState({
      joinKey: event.target.value,
    });
  }

  generateKey() {
    this.setState({
      hostKey: 'foo',
    });
  }

  renderLobby() {
    this.players = this.gameData.getPlayers();
  }

  render() {
    return (
      <div id="Lobby">
        Hello World
        <div id="Public">
          <button className="publicGame">
            Join Public Game
          </button>
        </div>

        <div id="JoinPrivate">
          <input placeholder="Private Game Key" value={this.state.joinKey} onChange={this.onInputKey} />
          <button className="join">
            Join Private Game
          </button>
        </div>
        <div id="HostPrivate">
          <button onClick={this.generateKey}>
            Host Private Game
          </button>
          <h1>{this.state.hostKey}</h1>
        </div>
      </div>
    );
  }
}

export default Lobby;
