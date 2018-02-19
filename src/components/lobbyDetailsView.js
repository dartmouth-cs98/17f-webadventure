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
      errorMsgPublicGame: false,
      errorMsgPrivateGame: false,
    };
    this.timer = 0;
    this.onChange = this.onChange.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  onChange(event) {
    this.setState({
      joinKey: event.target.value,
    });
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
    this.setState({ errorMsgPublicGame: true });
    if (this.props.selectedGame) {
      this.setState({ errorMsgPublicGame: false });
      this.props.joinPublicGame();
      this.startTimer();
    }
  }

  joinPrivateGame() {
    this.setState({ errorMsgPrivateGame: true });
    if (this.joinKey.length === 7) {
      this.setState({ errorMsgPrivateGame: false });
      this.props.joinPrivateGame(this.joinKey);
      this.startTimer();
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

  generateKey() {
    const key = Math.random().toString(36).substring(2, 9);
    this.setState({
      hostKey: key,
    });
  }

  renderErrorMessagePublicGame() {
    if (this.state.errorMsgPublicGame) {
      return (
        <div className="errorMsg">Please select a game to join!</div>
      );
    } else {
      return (<div />);
    }
  }

  renderErrorMessagePrivateGame() {
    if (this.state.errorMsgPrivateGame) {
      return (
        <div className="errorMsg">Please enter a valid join key!</div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div id="lobby-game-view">
        <div id="public">
          <button className="publicGame" onClick={this.joinPublicGame}>
            Join Public Game
          </button>
          {this.renderErrorMessagePublicGame()}
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
          {this.renderErrorMessagePrivateGame()}
        </div>
        <div id="host-private">
          <button onClick={this.props.hostPrivateGame}>
            Host Private Game
          </button>
        </div>
        <div>{this.state.hostKey}</div>
      </div>
    );
  }
}

export default LobbyDetailsView;
