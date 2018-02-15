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
    };

    this.onGameChange = this.onGameChange.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
   
    this.timer = 0;
    this.startKeyIndex = 2;
    this.endKeyIndex = 9;
    this.keyLength = this.endKeyIndex - this.startKeyIndex;
    this.onStartGame = this.onStartGame.bind(this);
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

  onStartGame() {
    const username = 'almawang';
    const game = {
      id: '5a80e8dff58b73d699780895',
      host: 'almawang',
      isPrivate: true,
      startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
      goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
    };
    this.props.onStart(username, game);
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
            <button onClick={this.onStartGame} >
              Click me
            </button>
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
            <button onClick={this.onStartGame} >
              Click me
            </button>
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
