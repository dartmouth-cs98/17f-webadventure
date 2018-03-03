/* eslint react/no-unused-state: 0, prefer-const: 0, max-len:0  */

import React, { Component } from 'react';

class LobbyDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinKey: '',
      hostKey: '',
      players: [],
      username: this.props.username,
      errorMsg: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onJoinPublicGame = this.onJoinPublicGame.bind(this);
    this.onJoinPrivateGame = this.onJoinPrivateGame.bind(this);
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


  onJoinPublicGame() {
    if (this.props.selectedGame === null) {
      this.setState({ errorMsg: 'Please select a game to join!' });
    } else if (this.props.selectedGame.players.length >= 5) {
      this.setState({ errorMsg: 'Too many people! Please select another game' });
    } else {
      this.props.joinPublicGame(this.props.selectedGame.id);
    }
  }

  onJoinPrivateGame() {
    if (this.props.games.some(game => (game.id === this.state.joinKey) && game.isPrivate)) {
      this.setState({ errorMsg: null });
      // Should be handled in back end if error
      this.props.joinPrivateGame(this.state.joinKey);
    } else {
      this.setState({ errorMsg: 'Please enter a valid join key!' });
    }
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
          <button id="public-game-button" onClick={this.onJoinPublicGame}>
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
            <button id="join-private-button" onClick={this.onJoinPrivateGame}>
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
