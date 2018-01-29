/* eslint max-len: "off" */
/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import GameData from './../gameData';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: '',
      joinKey: '',
      time: {},
      seconds: 15
    };
    this.timer = 0;
    this.gameData = new GameData();
    this.players = this.gameData.getPlayers();
    console.log("foo");
    // this.getPlayers = this.getPlayers.bind(this);
    this.renderLobby = this.renderLobby.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.onInputKey = this.onInputKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  onInputKey(event) {
    this.setState({
      joinKey: event.target.value,
    });
  }

  generateKey() {
    this.setState({
      hostKey: 'foo',
    });
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    clearInterval(this.timer);
    this.setState({
      seconds: 15
    });
    this.timer = setInterval(this.countDown, 1000);
    /*else {
      this.timer = 0;
      
    }*/
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer)
      this.setState({
        time: {
          s: "Game start!"
        }
      });
    }
  }


  renderLobby() {
    this.players = this.gameData.getPlayers();
  }

  render() {
    return (
      <div id="Lobby">
        Hello World
        <div id="Public">
          <button className="publicGame" onClick={this.startTimer}>
            Join Public Game
          </button>
          {this.state.time.s}
        </div>

        <div id="JoinPrivate">
          <input placeholder="Private Game Key" value={this.state.joinKey} onChange={this.onInputKey} />
          <button className="join">
            Join Private Game
          </button>
        </div>
        <div id="HostPrivate">
          <button onClick={this.generateKey}>
            Host Private Game
          </button>
          <h1>{this.state.hostKey}</h1>
        </div>
      </div>
    );
  }
}

export default Lobby;
