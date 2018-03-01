/* eslint no-mixed-spaces-and-tabs:0, no-tabs:0 */

import React, { Component } from 'react';

class SelectedGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: '',
    };
    // this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.renderStartPage = this.renderStartPage.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.joinedGame.players.length === 5) {
      var timer = setInterval(this.countDown, 1000);
      this.setState({timer: timer, seconds: 5});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  countDown() {
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1});
    } else {
      clearInterval(this.state.timer);
    }
  }

  renderStartPage() {
    const pageName = decodeURIComponent(this.props.joinedGame.startPage.split('/').pop()).replace(/_/g, ' ');
    return pageName;
  };

  renderPlayers() {
    return this.props.joinedGame.players
      .map((player) => {
        return (<div>{player.username}</div>);
      });
  };

  renderTimer() {
    if (this.props.joinedGame.players.length === 5) {
      return (
        <div>Starting in {this.state.seconds}</div>
      )
    } else {
      return (<div/>)
    }
  };

  render() {
    return (
      <div id="selectedGameView">
        <div>{this.props.joinedGame.players.length}/5 players joined</div>
        {this.renderTimer()}
        <div>Start: {this.renderStartPage()}</div>
        <div>Players in game:</div>
        {this.renderPlayers()}
        <button onClick={this.props.backToGameSelect}>Go back</button>
      </div>
    );
  }
}

export default SelectedGameView;
