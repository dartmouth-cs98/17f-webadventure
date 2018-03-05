import React, { Component } from 'react';
import '../style.css';

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: props.leaderboard,
    };

    this.onRequest = this.onRequest.bind(this);
    this.onNewGame = this.onNewGame.bind(this);

    chrome.runtime.onMessage.addListener(this.onRequest);
  }

  onRequest(req) {
    if (req.message === 'game info') {
      const leaderboard = req.payload.game.players; // leaderboard
      this.setState({ leaderboard });
    }
  }

  onNewGame() {
    this.props.onNewGame(this.props.curPlayerInfo.username);
  }

  scoringSort(player1, player2, sortedScores) {
    let score1 = this.calculateScore(player1, sortedScores);
    let score2 = this.calculateScore(player2, sortedScores);
    return score2 - score1;
  }

  calculateScore(player, sortedScores) {
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

  renderPlayers() {
    const finishTimes = this.state.leaderboard
      .sort((a, b) => a.finishTime - b.finishTime);
    return this.state.leaderboard
      .sort((a, b) => this.scoringSort(a, b, finishTimes))
      .map((player, index) => {
        return (
          <div className="leaderboard-item">
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


  render() {
    return (
      <div id="end">
        <button className="exit-lobby-button" onClick={this.props.exitGame}> &times; </button>
        <div id="end-flex">
          <div className="userStats">WEBADVENTURE</div>
          <div id="winner">
            {`${this.props.curPlayerInfo.username} wins!`}
          </div>
          <div id="user-rankings">
            {this.renderPlayers()}
          </div>
          <button onClick={this.onNewGame}>To Lobby</button>
        </div>
      </div>
    );
  }
}

export default End;
