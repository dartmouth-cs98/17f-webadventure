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
      time: {},
      seconds: 15,
      // start: false,
      players: [],
    };
    this.timer = 0;
    this.gameData = new GameData();
    this.players = this.gameData.getPlayers();
    // this.getPlayers = this.getPlayers.bind(this);
    this.renderLobby = this.renderLobby.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.onInputKey = this.onInputKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    const timeLeftVar = { s: this.state.seconds };
    this.setState({ time: timeLeftVar });
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

  startTimer() {
    if (this.checkNumPlayers()) {
      clearInterval(this.timer);
      this.setState({
        seconds: 15,
      });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const secs = this.state.seconds - 1;
    this.setState({
      time: {
        s: secs,
      },
      seconds: secs,
    });

    // Check if we're at zero.
    if (secs === 0) {
      clearInterval(this.timer);
      this.setState({
        time: {
          s: 'Game start!',
        },
      });
    }
  }

  checkNumPlayers() {
    const reqNum = 5;
    if (this.state.players.length < reqNum) {
      return false;
    }
    return true;
  }

  addPlayer() {
    this.setState({
      players: ['a', 'b', 'c', 'd', 'e', 'f'],
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
          <button className="publicGame" onClick={this.startTimer}>
            Join Public Game
          </button>
          {this.state.time.s}
        </div>

        <div id="JoinPrivate">
          <input placeholder="Private Game Key" value={this.state.joinKey} onChange={this.onInputKey} />
          <button className="join" onClick={this.addPlayer}>
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
