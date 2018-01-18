import React, { Component } from 'react';


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPlayer: {
        username: 'Alma',
        curScore: 100000,
        index: 0,
        avatar: 'https://i.imgur.com/YNcTBuU.gif',
      },
      games: {
        players: [{ username: 'Alma', curScore: 123123 }, { username: 'Barry', curScore: 11 }],
      },
    };
    this.renderRankings = this.renderRankings.bind(this);
  }

  renderRankings() {
    const top10 = this.state.games.players
      .sort((a, b) => b.curScore - a.curScore)
      .slice(0, 10)
      .map((player, index) =>
        (
          <div className="leaderboard-item">
            {index + 1}. {player.username} : {player.curScore}
          </div>));
    return top10;
  }

  render() {
    return (
      <div id="leaderboard">
        <div id="userStats">
          WEBADVENTURE
          <div id="userStatRow">
            {this.state.curPlayer.index + 1}. {this.state.curPlayer.username} :
             {this.state.curPlayer.curScore}
          </div>
        </div>
        <p id="currentPlayerView">Leaderboard</p>
        <div id="userStatRow" >
          {this.renderRankings()}
        </div>
        <img id="wahoo" src={this.state.curPlayer.avatar} alt="userIcon" />
      </div>
    );
  }
}

export default Leaderboard;
