import React, { Component } from 'react';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.counter,
    };
    this.renderRankings = this.renderRankings.bind(this);
    this.incTimer = this.incTimer.bind(this);
    setInterval(this.incTimer, 1000);

    this.audioOn = true;
  }

  incTimer() {
    this.setState({ timer: this.state.timer + 1 });
  }

  renderRankings() {
    const top5 = this.props.players
      .sort((a, b) => a.numClicks - b.numClicks)
      .map((player, index) => {
        if (player.username === this.props.curPlayer.name) {
          return (
            <div className="leaderboard-item leaderboard-curPlayer">
              <div className="leaderboard-item-left">
                <div className="leaderboard-rank">{index + 1}</div>
                <div>{player.username}</div>
              </div>
              <div className="leaderboard-item-right">{player.numClicks}</div>
            </div>);
        }
        return (
          <div className="leaderboard-item">
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            <div className="leaderboard-item-right">{player.numClicks}</div>
          </div>);
      });
    return top5;
  }

  // <audio id="myAudio" src="http://www.sousound.com/music/healing/healing_01.mp3" preload="auto"></audio>
  //file:///Users/stephanie/Documents/cs98/webad/assets/wii.mp3
//             loop="true" autoplay="true"
// <audio id="myAudio" src="http://k003.kiwi6.com/hotlink/3ewofkoxts/wii.mp3" loop="true" autoplay="true"></audio>

// <img id="sound-on" src="https://i.imgur.com/IBdWqJb.png" />
              // <img id="sound-mute" src="https://i.imgur.com/CwDJxek.png" />

  render() {
    const goalPage = this.props.goalPage.split('/').pop();
    if (this.props.curPlayer) {
      return (
        <div id="wa-container">
          <img id="wiki-logo" src="https://i.imgur.com/hQbOKPS.png" alt="wiki logo" />
          <div id="topbar">
            <div id="sound" className="sound-on">
            </div>
          </div>
          <div id="leaderboard">
            <div className="userStats">WEBADVENTURE</div>
            <div id="curUserRow">
              <div>
                <img id="wahoo" src={this.props.curPlayer.avatarRight} alt="userIcon" />
              </div>
              <div className="curPlayerName">{this.props.curPlayer.name}</div>
            </div>
            <div id="top">
              GOAL: {goalPage}
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
