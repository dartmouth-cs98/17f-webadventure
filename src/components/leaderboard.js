import React, { Component } from 'react';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: props.players,
      timer: props.counter,
      // audioOn: props.audioOn,
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

  renderRankings() {
    const top5 = this.state.players
      .sort((a, b) => a.numClicks - b.numClicks)
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
              <div className="leaderboard-item-right">{player.numClicks}</div>
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
            <div className="leaderboard-item-right">{player.numClicks}</div>
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
            <div id="top">
              GOAL: {goalPage}
            </div>
            <div> </div>
            {this.props.audioOn ? (
              <div id="sound" className="sound-on" />
            ) : (
              <div id="sound" className="sound-off" />
            )}
            <svg id="exit-button" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
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
