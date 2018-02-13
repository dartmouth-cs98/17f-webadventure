/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import SignUp from './signup';
import LobbyGameView from './lobbyGameView';
import LobbyGamesView from './lobbyGamesView';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        { name: 'Game1', players: ['Bill', 'Jill'] },
        { name: 'Game2', players: ['Tommy', 'Eli', 'James'] },
        { name: 'Game3', players: ['Tim'] },
        { name: 'Game4', players: ['Alma', 'David', 'Stephanie', 'Lisa'] },
        { name: 'Game5', players: ['Imanol', 'Barry'] },
      ],
      selectedGame: '',
    };

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
            {/* <LobbyGameView /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
