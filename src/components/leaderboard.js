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
              {index + 1}. {player.name} : {player.numClicks}
            </div>);
        }
        return (
          <div className="leaderboard-item">
            {index + 1}. {player.name} : {player.numClicks}
          </div>);
      });
    return top10;
  }

  render() {
    if (this.props.curPlayer) {
      return (
        <div id="leaderboard">
          <div id="userStats">
          WEBADVENTURE
          <div id="userStatRow">
            {this.props.curPlayer.name}
          </div>
          </div>
          <p id="currentPlayerView">Leaderboard</p>
          <div id="userStatRow" >
            {this.renderRankings()}
          </div>
          <img id="wahoo" src={this.props.curPlayer.avatarRight} alt="userIcon" />
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
