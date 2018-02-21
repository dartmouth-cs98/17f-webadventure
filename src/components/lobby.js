/* eslint linebreak-style: ["error", "windows"], prefer-const:0 */

import React, { Component } from 'react';
import LobbySocket from '../sockets/lobbySocket';
import SignUp from './signup';
import LobbyDetailsView from './lobbyDetailsView';
import LobbyGamesView from './lobbyGamesView';
import SelectedGameView from './selectedGameView';
import DisplayUser from './displayUser';
import '../style.css';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      games: [
        {
          name: 'Game1',
          players: ['Bill', 'Jill'],
          startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
          goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
        },
        {
          name: 'Game2',
          players: ['Tommy', 'Eli', 'James', 'Harrison'],
          startPage: 'https://en.wikipedia.org/wiki/China',
          goalPage: 'https://en.wikipedia.org/wiki/Japan',
        },
        {
          name: 'Game3',
          players: ['Tim'],
          startPage: 'https://en.wikipedia.org/wiki/Korea',
          goalPage: 'https://en.wikipedia.org/wiki/Bimbimbap',
        },
        {
          name: 'Game4',
          players: ['Alma', 'David', 'Stephanie', 'Lisa'],
          startPage: 'https://en.wikipedia.org/wiki/Dartmouth',
          goalPage: 'https://en.wikipedia.org/wiki/Ivy_League',
        },
        {
          name: 'Game5',
          players: ['Imanol', 'Jerry'],
          startPage: 'https://en.wikipedia.org/wiki/Orange',
          goalPage: 'https://en.wikipedia.org/wiki/Yellow',
        },
      ],
      selectedGame: null,
      selectedGameID: null,
      playerAvatar: 'nyan',
    };


    this.onGameChange = this.onGameChange.bind(this);
    this.onGameIDChange = this.onGameIDChange.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.hostPrivateGame = this.hostPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
    this.signUpLobby = this.signUpLobby.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.onGames = this.onGames.bind(this);
    this.onUsers = this.onUsers.bind(this);

    this.lobbySocket = new LobbySocket(this.onGames, this.onUsers, null);
    this.timer = 0;
    this.startKeyIndex = 2;
    this.endKeyIndex = 9;
    this.keyLength = this.endKeyIndex - this.startKeyIndex;
    this.onStartGame = this.onStartGame.bind(this);
  }

  onGames(games) {
    this.setState({ games });
  }

  onUsers(users) {
    console.log(users);
  }

  onGameChange(game) {
    this.setState({ selectedGame: game });
  }

  onGameIDChange(game) {
    this.setState({ selectedGameID: game.id });
  }

  onStartGame() {
    const game = {
      id: '5a80e8dff58b73d699780895',
      host: 'almawang',
      isPrivate: true,
      startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
      goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
    };
    this.props.onStart(this.state.user.username, game);
  }

  changeAvatar(avatar) {
    this.setState({ playerAvatar: avatar });
  }

  signUpLobby(username) {
    this.lobbySocket.getOrCreateUser(username).then((user) => {
      this.setState({
        user,
      });
    });
  }

  joinPublicGame() {
    this.setState({ selectedGameID: this.state.selectedGame.id });
  }

  joinPrivateGame(gameId) {
    this.lobbySocket.joinNewGame(gameId).then((game) => {
      this.setState({ selectedGame: game });
    });
  }
  hostPrivateGame() {
    this.lobbySocket.createGame(true).then((newGame) => {
      this.setState({ selectedGame: newGame });
    });
  }
  backToGameSelect() {
    this.setState({ selectedGameID: null });
  }

  renderLowerLeftComponent() {
    console.log(this.state.selectedGameID);
    console.log(this.state.selectedGame);
    if (this.state.selectedGameID && this.state.selectedGame) {
      return (
        <SelectedGameView
          avatar={this.state.playerAvatar}
          selectedGame={this.state.selectedGame}
          onGoBack={this.backToGameSelect}
        />
      );
    } else {
      return (
        <LobbyDetailsView
          joinPrivateGame={this.joinPrivateGame}
          joinPublicGame={this.joinPublicGame}
          hostPrivateGame={this.hostPrivateGame}
          backToGameSelect={this.backToGameSelect}
          selectedGame={this.state.selectedGame}
        />
      );
    }
  }

  render() {
    // Render lobby with all lobby components
    if (this.state.user) {
      return (
        <div id="lobby-container">
          <div id="overlay" />
          <div id="lobby">
            <div id="lobby-title">WEBADVENTURE</div>
            <div id="lobby-contents">
              <LobbyGamesView
                games={this.state.games}
                selectedGame={this.state.selectedGame}
                onSelectGame={this.onGameChange}
              />
              <div id="lobby-columns">
                <DisplayUser
                  username={this.state.user.username}
                  avatar={this.state.playerAvatar}
                  onAvatar={this.changeAvatar}
                  onUsername={this.signUpLobby}
                />
                {this.renderLowerLeftComponent()}
              </div>
            </div>
            <button onClick={this.onStartGame} >
                Start Game
            </button>
          </div>
        </div>
      );
    }
    return (
      <div id="lobby-container">
        <div id="overlay" />
        <div id="lobby">
          <img src="https://i.imgur.com/VUVNhtC.png" alt="webadventure!" id="webad-logo" />
          <div id="lobby-title">WEBADVENTURE</div>
          <SignUp
            signUpLobby={this.signUpLobby}
            signedUp={this.signedUp}
          />
        </div>
      </div>
    );
  }
}

export default Lobby;
