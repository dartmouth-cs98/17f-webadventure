/* eslint no-mixed-spaces-and-tabs:0, no-tabs:0 */

import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class SelectedGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: '',
      copyMsg: 'Copy Key',
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
    if (
      nextProps.joinedGame.players.length === 2 &&
      !nextProps.joinedGame.isPrivate
    ) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ seconds: 5 });
    } else {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onCopy() {
    this.setState({ copyMsg: 'Copied!' });
  }

  countDown() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      this.props.onStartGame();
      clearInterval(this.timer);
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
      this.props.joinedGame.players.length === 2 &&
      !this.props.joinedGame.isPrivate
    ) {
      return (
        <div>Starting in {this.state.seconds}</div>
      );
    } else {
      return (<div />);
    }
  }

  renderHostKey() {
    if (this.props.joinedGame.isPrivate) {
      return (
        <div>
          <div id="game-id-row">
            <CopyToClipboard text={this.props.joinedGame.id}>
              <button className="colorful-button" onClick={this.onCopy}>
                {this.state.copyMsg}
              </button>
            </CopyToClipboard>
            <div id="game-id">{this.props.joinedGame.id}</div>
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    console.log('joinedGame');
    console.log(this.props.joinedGame);
    return (
      <div id="selectedGameView">
        {this.renderTimer()}
        <div className="selected-game-header">START</div>
        <div id="selected-game-start-page">{this.renderStartPage()}</div>
        {this.renderHostKey()}
        <div className="selected-game-header">JOINED GAME</div>
        <div>{this.props.joinedGame.players.length}/5 players joined</div>
        <div id="selected-game-render-players">
          {this.renderPlayers()}
        </div>
        <div id="selected-game-buttons">
          <button onClick={this.props.backToGameSelect}>Go Back</button>
          {this.renderStartGameButton()}
        </div>
      </div>
    );
  }
}

export default SelectedGameView;
