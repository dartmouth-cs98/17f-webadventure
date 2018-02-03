import React, { Component } from 'react';


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.renderRankings = this.renderRankings.bind(this);
  }

  renderRankings() {
    const top10 = this.props.players
      .sort((a, b) => b.numClicks - a.numClicks)
      .slice(0, 10)
      .map((player, index) => {
        if (player.name === this.props.curPlayer.name) {
          return (
            <div className="leaderboard-item leaderboard-curPlayer">
              <div className="leaderboard-item-left">
                <div className="leaderboard-rank">{index + 1}</div>
                <div>{player.name}</div>
              </div>
              <div className="leaderboard-item-right">{player.numClicks}</div>
            </div>);
        }
        return (
          <div className="leaderboard-item">
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.name}</div>
            </div>
            <div className="leaderboard-item-right">{player.numClicks}</div>
          </div>);
      });
    return top10;
  }

  render() {
    if (this.props.curPlayer) {
      return (
        <div id="wa-container">
          <img id='wiki-logo' src='https://i.imgur.com/hQbOKPS.png'/>
          <div id="leaderboard">
            <div id="userStats">WEBADVENTURE</div>
            <div id="curUserRow">
              <div>
                <img id="wahoo" src={this.props.curPlayer.avatarRight} alt="userIcon" />
              </div>
              <div className="curPlayerName">{this.props.curPlayer.name}</div>
            </div>
            <div id="userStatRow" >{this.renderRankings()}</div>
          </div>
        </div>
      );
    }
    return (
      <div id="leaderboard">
        <div id="userStats">
          WEBADVENTURE
          <div id="userStatRow" />
        </div>
        <p id="currentPlayerView">Leaderboard</p>
        <div id="userStatRow" />
      </div>
    );
  }
}

export default Leaderboard;
