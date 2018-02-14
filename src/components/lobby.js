/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import SignUp from './signup';
import LobbyDetailsView from './lobbyDetailsView';
import LobbyGamesView from './lobbyGamesView';
import SelectedGameView from './selectedGameView';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedUp: false,
      games: [
        { name: 'Game1', players: ['Bill', 'Jill'] },
        { name: 'Game2', players: ['Tommy', 'Eli', 'James'] },
        { name: 'Game3', players: ['Tim'] },
        { name: 'Game4', players: ['Alma', 'David', 'Stephanie', 'Lisa'] },
        { name: 'Game5', players: ['Imanol', 'Barry'] },
      ],
      selectedGame: '',
      privateGameSelected: false,
      publicGameSelected: false,
      // signedUp: false,
    };

    this.onGameChange = this.onGameChange.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
  }

  componentDidMount() {
  }

  signUpLobby(username) {
    this.setState({
      signedUp: true,
      username: username
    });
  }

  onGameChange(game) {
    this.setState({ selectedGame: game });
  }

  joinPublicGame() {
    this.setState({ privateGameSelected: false, publicGameSelected: true });
  }

  joinPrivateGame() {
    this.setState({ privateGameSelected: true, publicGameSelected: false });
  }

  backToGameSelect() {
    this.setState({ privateGameSelected: false, publicGameSelected: false });
  }

  render() {

    // Render lobby with all lobby components
    if (this.state.signedUp) {

      const selectedGameName = this.state.selectedGame;
      const currentGames = this.state.games;
      const privGameSel = this.state.privateGameSelected;
      const publGameSel = this.state.publicGameSelected;

      if (publGameSel && selectedGameName !== '') {
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
                <SignUp signedUp={ true } username={ this.state.username }/>
                <SelectedGameView />
              </div>
            </div>
          </div>
        );
      }
      else {
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
                <SignUp signedUp={ true } username={ this.state.username }/>
                <LobbyDetailsView
                  privGameSel={privGameSel}
                  publGameSel={publGameSel}
                  joinPublicGame={this.joinPublicGame}
                  joinPrivateGame={this.joinPrivateGame}
                  backToGameSelect={this.backToGameSelect}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    // Render initial lobby with just sign up component
    return (
      <div id="lobby">
        <div id="lobby-title">WEBADVENTURE</div>
        <SignUp signUpLobby={ this.signUpLobby.bind(this) }/>
      </div>
    );
  }
}

export default Lobby;
