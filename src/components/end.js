/* eslint max-len:0, class-methods-use-this: 0, no-undef: 0 */

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

  renderFinishTime(player) {
    if (player.finishTime === -1) {
      return (
        <div id="finish-svg-div">
          <svg id="finish-svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        </div>
      );
    }
    return <div>{player.finishTime}s</div>;
  }

  renderPlayers(finishTimes) {
    return this.state.leaderboard
      .sort((a, b) => this.scoringSort(a, b, finishTimes))
      .map((player, index) => {
        return (
          <div
            className="leaderboard-item end-item"
            key={player.username}
          >
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            <div className="end-item-right">
              {this.renderFinishTime(player)}
              <div>{player.finishTime === -1 ? 'P' : `${this.calculateScore(player, finishTimes)} pt`}</div>
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
    return (
      this.state.game.path
        .map((link, index) => {
          const colorIndex = `color-${index}`;
          const parsedLink = decodeURIComponent(link.split('/').pop()).replace(/_/g, ' ');
          if (index !== this.state.game.path.length - 1) {
            return (
              <div className="displ-with-right-arrow">
                <div id={colorIndex}>{parsedLink}</div>
                <div>&rarr;</div>
              </div>
            );
          } else {
            return (
              <div id={colorIndex}>{parsedLink}</div>
            );
          }
        })
    );
  }

  render() {
    const finishTimes = this.state.leaderboard
      .sort((a, b) => a.finishTime - b.finishTime);
    return (
      <div id="end">
        <button className="exit-lobby-button end-div-button" onClick={this.props.exitGame}> &times; </button>
        <div id="end-flex">
          <div className="userStats">WEBADVENTURE</div>
          {this.renderLeader(finishTimes)}
          <div id="user-rankings">
            <div className="selected-game-header">CURRENT RANKINGS</div>
            {this.renderPlayers(finishTimes)}
          </div>
          <div className="selected-game-header">SHORTEST POSSIBLE PATH</div>
          <div id="path">
            {this.renderPath()}
          </div>
          <button onClick={this.onNewGame}>To Lobby</button>
        </div>
      </div>
    );
  }
}

export default End;
