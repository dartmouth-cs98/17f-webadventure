/* eslint max-len:0, class-methods-use-this: 0 */

import React, { Component } from 'react';
import '../style.css';

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      leaderboard: props.leaderboard,
    };

    this.onRequest = this.onRequest.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.renderPath = this.renderPath.bind(this);
    this.renderLeader = this.renderLeader.bind(this);
    chrome.runtime.onMessage.addListener(this.onRequest);
  }

  onRequest(req) {
    if (req.message === 'game info') {
      const game = req.payload.game;
      const leaderboard = req.payload.game.players; // leaderboard
      this.setState({ leaderboard });
      this.setState({ game });
    }
  }

  onNewGame() {
    this.props.onNewGame(this.props.curPlayerInfo.username);
  }

  scoringSort(player1, player2, sortedTimes) {
    const score1 = this.calculateScore(player1, sortedTimes);
    const score2 = this.calculateScore(player2, sortedTimes);
    return score2 - score1;
  }

  calculateScore(player, sortedTimes) {
    let score = 0;
    if (player.numClicks <= 30) {
      score = player.numClicks;
    } else {
      score = 30;
    }
    if (player.finishTime > -1) {
      score += (4 - sortedTimes.indexOf(player)) * 20;
    }
    return score;
  }

  renderPlayers(finishTimes) {
    return this.state.leaderboard
      .sort((a, b) => this.scoringSort(a, b, finishTimes))
      .map((player, index) => {
        return (
          <div
            className="leaderboard-item"
            key={player.username}
          >
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            <div className="leaderboard-item-right">
              {player.finishTime === -1 ? 'PENDING' : `${this.calculateScore(player, finishTimes)}`}
            </div>
          </div>
        );
      });
  }

  renderLeader(finishTimes) {
    const sortedScores = this.state.leaderboard
      .sort((a, b) => this.scoringSort(a, b, finishTimes));
    if (finishTimes.some(player => player.finishTime < 0)) {
      return (
        <div id="winner">
          {`${sortedScores[0].username} is winning!`}
        </div>
      );
    } else {
      return (
        <div id="winner">
          {`${sortedScores[0].username} has won!`}
        </div>
      );
    }
  }

  renderPath() {
    console.log(this.state.game.path);
    return (
      <div id="path">
        {this.state.game.path}
      </div>
    );
  }

  render() {
    const finishTimes = this.state.leaderboard
      .sort((a, b) => a.finishTime - b.finishTime);

    return (
      <div id="end">
        <button className="exit-lobby-button" onClick={this.props.exitGame}> &times; </button>
        <div id="end-flex">
          <div className="userStats">WEBADVENTURE</div>
          {this.renderLeader(finishTimes)}
          <div id="user-rankings">
            {this.renderPlayers(finishTimes)}
          </div>
          {this.renderPath()}
          <button onClick={this.onNewGame}>To Lobby</button>
        </div>
      </div>
    );
  }
}

export default End;
