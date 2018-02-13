/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import SignUp from './signup';
import LobbyDetailsView from './lobbyDetailsView';
import LobbyGamesView from './lobbyGamesView';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        { name: 'Game1' },
        { name: 'Game2' },
        { name: 'Game3' },
        { name: 'Game4' },
        { name: 'Game5' },
      ],
      selectedGame: '',
    };
    this.timer = 0;
    this.onGameChange = this.onGameChange.bind(this);
  }

  componentDidMount() {
  }

  onGameChange(game) {
    this.setState({ selectedGame: game });
  }

  render() {
    const selectedGameName = this.state.selectedGame;
    const currentGames = this.state.games;

    return (
      <div id="lobby">
        <div id="lobby-title">WEBADVENTURE</div>
        <div id="lobby-contents">
          <LobbyGamesView
            games={currentGames}
            selectedGame={selectedGameName}
            onSelectGame={this.onGameChange}
          />
          <div id="lobby-columns">
            <SignUp />
            <LobbyDetailsView />
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
