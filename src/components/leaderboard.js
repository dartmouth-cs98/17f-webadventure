/* eslint max-len:0, class-methods-use-this: 0 */

import React, { Component } from 'react';

class Leaderboard extends Component {
  static calculateScore(player, sortedScores) {
    let score = 0;
    if (player.numClicks <= 30) {
      score = player.numClicks;
    } else {
      score = 30;
    }
    if (player.finishTime > -1) {
      score += (4 - sortedScores.indexOf(player)) * 20;
    }
    return score;
  }

  static scoringSort(player1, player2, sortedScores) {
    const score1 = Leaderboard.calculateScore(player1, sortedScores);
    const score2 = Leaderboard.calculateScore(player2, sortedScores);
    return score2 - score1;
  }
  constructor(props) {
    super(props);
    this.state = {
      players: props.players,
      timer: props.counter,
    };
    this.onMessageRequest = this.onMessageRequest.bind(this);
    this.incTimer = this.incTimer.bind(this);
    setInterval(this.incTimer, 1000);

    chrome.runtime.onMessage.addListener(this.onMessageRequest);
  }

  onMessageRequest(req) {
    if (req.message === 'game info') {
      this.setState({ players: req.payload.game.players });
    }
  }

  incTimer() {
    this.setState({ timer: this.state.timer + 1 });
  }

  renderAudioOn() {
    if (this.props.audioOn) { return <div id="sound" className="sound-on" />; }
    return <div id="sound" className="sound-off" />;
  }

  renderRankings() {
    const finishTimes = this.state.players
      .sort((a, b) => a.finishTime - b.finishTime);
    const top5 = this.state.players
      .sort((a, b) => Leaderboard.scoringSort(a, b, finishTimes))
      .map((player, index) => {
        if (player.username === this.props.curPlayer.name) {
          return (
            <div
              className="leaderboard-item leaderboard-curPlayer"
              key={player.username}
            >
              <div className="leaderboard-item-left">
                <div className="leaderboard-rank">{index + 1}</div>
                <div>{player.username}</div>
              </div>
              <div className="leaderboard-item-right">
                {Leaderboard.calculateScore(player, finishTimes)}
              </div>
            </div>);
        }
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
              {Leaderboard.calculateScore(player, finishTimes)}
            </div>
          </div>);
      });
    return top5;
  }

  render() {
    const goalPage = decodeURIComponent(this.props.goalPage.split('/').pop()).replace(/_/g, ' ');
    if (this.props.curPlayer) {
      return (
        <div id="wa-container">
          <img id="wiki-logo" src="https://i.imgur.com/hQbOKPS.png" alt="wiki logo" />
          <div id="topbar">
            <span id="top-left">
              <div>GOAL:&nbsp;</div>
              <div id="color-5">{goalPage}</div>
            </span>
            <span className="row">
              {this.renderAudioOn()}
              <svg id="exit-button" onClick={this.props.exitGame} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59
              12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </span>
          </div>
          <div id="leaderboard">
            <div className="userStats">WEBADVENTURE</div>
            <div id="curUserRow">
              <div>
                <img id="wahoo" src={this.props.curPlayer.avatarRight} alt="userIcon" />
              </div>
              <div className="curPlayerName">{this.props.curPlayer.name}</div>
            </div>
            <div id="timer">
              {this.state.timer}s elapsed
            </div>
            <div id="userStatRow">{this.renderRankings()}</div>
          </div>
        </div>
      );
    }
    return (
      <div id="wa-container">
        <img id="wiki-logo" src="https://i.imgur.com/hQbOKPS.png" alt="wiki logo" />
        <div id="leaderboard">
          <div className="userStats">WEBADVENTURE</div>
          <div id="curUserRow" />
          <div id="userStatRow" />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
