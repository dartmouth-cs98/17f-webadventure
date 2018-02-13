import React, { Component } from 'react';

class LobbyDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostKey: '',
      joinKey: '',
      time: {},
      seconds: '',
      // start: false,
      players: [],
      privGameSel: false,
      publGameSel: false,
    };
    this.timer = 0;
    this.onInputKey = this.onInputKey.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.checkNumPlayers = this.checkNumPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
  }

  onInputKey(event) {
    this.setState({
      joinKey: event.target.value,
    });
  }

  generateKey() {
    const key = Math.random().toString(36).substring(2, 9);
    this.setState({
      hostKey: key,
    });
  }

  startTimer() {
    if (this.checkNumPlayers()) {
      clearInterval(this.timer);
      this.setState({
        seconds: 6,
      });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const secs = this.state.seconds - 1;
    this.setState({
      time: {
        s: secs,
      },
      seconds: secs,
    });

    // Check if we're at zero.
    if (secs === 0) {
      clearInterval(this.timer);
      this.setState({
        time: {
          s: 'Game start!',
        },
      });
    }
  }

  joinPublicGame() {
    this.setState({
      privGameSel: false,
      publGameSel: true,
    });
    this.startTimer();
  }

  joinPrivateGame() {
    this.setState({
      privGameSel: true,
      publGameSel: false,
    });
    this.startTimer();
  }

  backToGameSelect() {
    this.setState({
      privGameSel: false,
      publGameSel: false,
      time: {
        s: 5,
      },
    });
  }

  checkNumPlayers() {
    const reqNum = 5;
    if (this.state.players.length < reqNum) {
      return false;
    }
    return true;
  }

  addPlayer() {
    this.setState({
      players: ['a', 'b', 'c', 'd', 'e', 'f'],
    });
  }

  render() {
    if (this.state.privGameSel) {
      return (
        <div id="lobby-game-view">
          <div id="private">
            <p>In Game {this.state.joinKey}!</p>
            <p>{this.state.time.s}</p>
          </div>
          <div id="players">
            Player 1
            Player 2
          </div>
          <button onClick={this.backToGameSelect}>Go back</button>
          <p>{this.publGameSel}</p>
          <p>{this.privGameSel}</p>
        </div>
      );
    } else if (this.state.publGameSel) {
      return (
        <div id="lobby-game-view">
          <div id="public">
            <p>In Game 5!</p>
            <p>{this.state.time.s}</p>
          </div>
          <div id="players">
            Player 1
            Player 2
          </div>
          <button onClick={this.backToGameSelect}>Go back</button>
          <p>{this.publGameSel}</p>
          <p>{this.privGameSel}</p>
        </div>
      );
    }
    return (
      <div id="lobby-game-view">
        <div id="public">
          <button className="publicGame" onClick={this.joinPublicGame}>
            Join Public Game
          </button>
        </div>
        <div id="join-private">
          <input
            placeholder="Private Game Key"
            value={this.state.joinKey}
            onChange={this.onInputKey}
          />
          <button className="join" onClick={this.joinPrivateGame}>
            Join Private Game
          </button>
        </div>
        <div id="host-private">
          <button onClick={this.generateKey}>
            Host Private Game
          </button>
        </div>
        <div>{this.state.hostKey}</div>
      </div>
    );
  }
}

export default LobbyDetailsView;
