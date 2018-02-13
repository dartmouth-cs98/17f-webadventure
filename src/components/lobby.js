/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: '',
      joinKey: '',
      time: {},
      seconds: '',
      // start: false,
      players: [],
    };
    this.timer = 0;
    // this.players = this.gameData.getPlayers();
    // this.getPlayers = this.getPlayers.bind(this);
    // this.renderLobby = this.renderLobby.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.onInputKey = this.onInputKey.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
  }

  onInputKey(event) {
    this.setState({
      joinKey: event.target.value,
    });
  }

  onStartGame() {
    const username = 'almawang';
    const game = {
      id: '5a80e8dff58b73d699780895',
      host: 'almawang',
      isPrivate: true,
      startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
      goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
    };
    this.props.onStart(username, game);
  }


  generateKey() {
    const key = Math.random().toString(36).substring(2, 9);
    this.setState({
      hostKey: key,
    });
  }

  startTimer() {
    if (this.checkNumPlayers()) {
      clearInterval(this.timer);
      this.setState({
        seconds: 16,
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

  /* renderLobby() {
    this.players = this.gameData.getPlayers();
  } */

  render() {
    return (
      <div id="lobby">
        <div id="lobby-title">WEBADVENTURE</div>
        <div id="public">
          <button className="publicGame" onClick={this.startTimer}>
            Join Public Game
          </button>
          {this.state.time.s}
        </div>
        <div id="join-private">
          <input
            placeholder="Private Game Key"
            value={this.state.joinKey}
            onChange={this.onInputKey}
          />
          <button className="join" onClick={this.addPlayer}>
            Join Private Game
          </button>
        </div>
        <div id="host-private">
          <button onClick={this.generateKey}>
            Host Private Game
          </button>
        </div>
        <div>{this.state.hostKey}</div>
        <button onClick={this.onStartGame} >
        Click me
        </button>
      </div>
    );
  }
}

export default Lobby;
