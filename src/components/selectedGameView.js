/* eslint no-mixed-spaces-and-tabs:0, no-tabs:0 */

import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class SelectedGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: '',
      copyMsg: 'COPY KEY',
    };
    this.timer = null;
    this.onCopy = this.onCopy.bind(this);
    this.countDown = this.countDown.bind(this);
    this.renderStartPage = this.renderStartPage.bind(this);
    this.renderStartGameButton = this.renderStartGameButton.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.joinedGame.players.length === 3) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ seconds: 5 });
    } else {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countDown() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      this.props.onStartGame();
      clearInterval(this.timer);
    }
  }

  onCopy() {
    this.setState({ copyMsg: "Copied!" });
  }

  renderHostKey() {
    if (this.props.joinedGame.isPrivate) {
      return (
        <div>
          {this.props.joinedGame.id}
          <CopyToClipboard text={this.props.joinedGame.id}>
            <button onClick={this.onCopy}>
              {this.state.copyMsg}
            </button>
          </CopyToClipboard>
        </div>
      );
    } else {
      return (<div />);
    }
  }

  renderStartPage() {
    return decodeURIComponent(this.props.joinedGame.startPage.split('/').pop()).replace(/_/g, ' ');
  }

  renderStartGameButton() {
    if (
      this.props.joinedGame.isPrivate &&
      this.props.user.username === this.props.joinedGame.host
    ) {
      return (
        <div>
          <button onClick={this.props.onStartGame}>
            Start Game
          </button>
        </div>
      );
    } else {
      return (<div />);
    }
  }

  renderPlayers() {
    return this.props.joinedGame.players
      .map((player) => {
        return (<div key={player.username}>{player.username}</div>);
      });
  }

  renderTimer() {
    if (
      this.props.joinedGame.players.length === 3 &&
      !this.props.joinedGame.isPrivate
    ) {
      return (
        <div>Starting in {this.state.seconds}</div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div id="selectedGameView">
        {this.renderHostKey()}
        <div>{this.props.joinedGame.players.length}/5 players joined</div>
        {this.renderTimer()}
        <div>Start: {this.renderStartPage()}</div>
        <div>Players in game:</div>
        {this.renderPlayers()}
        {this.renderStartGameButton()}
        <button onClick={this.props.backToGameSelect}>Go back</button>
      </div>
    );
  }
}

export default SelectedGameView;
