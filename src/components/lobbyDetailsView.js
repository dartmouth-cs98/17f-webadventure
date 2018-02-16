/* eslint react/no-unused-state: 0  */

import React, { Component } from 'react';

class LobbyDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinKey: '',
      hostKey: '',
      time: {},
      seconds: '',
      // start: false,
      players: [],

    };
    this.timer = 0;
    this.onInputKey = this.onInputKey.bind(this);
    this.onChange = this.onChange.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
  }

  onChange(event) {
    this.setState({
      joinKey: event.target.value,
    });
    this.props.onInputKey(event.target.value);
  }

  onInputKey() {
    this.props.onInputKey();
  }

  startTimer() {
    if (this.checkNumPlayers()) {
      clearInterval(this.timer);
      this.setState({
        seconds: 6,
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

  joinPublicGame() {
    if (this.props.selectedGame) {
      this.props.joinPublicGame();
      this.startTimer();
    }
  }

  joinPrivateGame() {
    if (this.props.joinKey.length === 7) {
      this.props.joinPrivateGame();
      this.startTimer();
    }
  }

  backToGameSelect() {
    this.props.backToGameSelect();
    this.setState({ time: { s: 5 } });
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

  generateKey() {
    const key = Math.random().toString(36).substring(2, 9);
    this.setState({
      hostKey: key,
    });
  }

  render() {
    return (
      <div id="lobby-game-view">
        <div id="public">
          <button className="publicGame" onClick={this.joinPublicGame}>
            Join Public Game
          </button>
        </div>
        <div id="join-private">
          <input
            placeholder="Private Game Key"
            value={this.props.joinKey}
            onChange={this.onChange}
          />
          <button className="join" onClick={this.joinPrivateGame}>
            Join Private Game
          </button>
        </div>
        <div id="host-private">
          <button onClick={this.generateKey}>
            Host Private Game
          </button>
        </div>
        <div>{this.state.hostKey}</div>
      </div>
    );
  }
}

export default LobbyDetailsView;
