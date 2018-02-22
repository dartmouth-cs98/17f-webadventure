/* eslint react/no-unused-state: 0, prefer-const: 0, max-len:0  */

import React, { Component } from 'react';

class LobbyDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinKey: '',
      hostKey: '',
      time: {},
      seconds: '',
      players: [],
      username: this.props.username,
      errorMsg: null,
    };
    this.timer = 0;
    this.onChange = this.onChange.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.username !== nextProps.username) {
      this.setState({ username: nextProps.username });
    }
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
    if (this.props.selectedGame && // if selectedGame exists
        this.props.selectedGame.players.length < 5 && // if the length is less than 5
        this.props.selectedGame.players.indexOf(this.state.username) === -1) { // it doesn't already exist
      let newPlayers = Object.assign({}, this.props.selectedGame).players;
      newPlayers.push(this.state.username);
      this.setState({
        errorMsgPublicGame: false,
      });
      this.props.joinPublicGame();
      this.startTimer();
    } else {
      this.setState({ errorMsg: 'Please select a game to join!' });
    }
  }

  joinPrivateGame() {
    if (this.state.joinKey.length === 7) {
      this.setState({ error: null });
      // Should be handled in back end if error
      this.props.joinPrivateGame(this.joinKey);
      this.startTimer();
    } else {
      this.setState({ errorMsg: 'Please enter a valid join key!' });
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

  renderError() {
    if (this.state.errorMsg) {
      return (
        <div className="errorMsg">{this.state.errorMsg}</div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div id="lobby-game-view">
        <div id="public">
          <button id="public-game-button" onClick={this.props.joinPublicGame}>
            Join Public
          </button>
        </div>
        <div id="or">&mdash;or&mdash;</div>
        <div id="private">
          <div id="join-private">
            <input
              placeholder="Private Game Key"
              value={this.state.joinKey}
              onChange={this.onChange}
            />
          </div>
          <div id="private-buttons">
            <button id="host-private-button" onClick={this.props.hostPrivateGame}>
            Host Private
            </button>
            <button id="join-private-button" onClick={this.joinPrivateGame}>
            Join Private
            </button>
          </div>
        </div>
        <div>{this.state.hostKey}</div>
        {this.renderError()}
      </div>
    );
  }
}

export default LobbyDetailsView;
