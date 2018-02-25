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

  renderPlayers() {
    return this.state.leaderboard
      .sort((a, b) => a.numClicks - b.numClicks)
      .map((player, index) => {
        return (
          <div className="leaderboard-item">
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            <div className="leaderboard-item-right">
              {player.finishTime === -1 ? 'PENDING' : `${player.finishTime}s`}
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
