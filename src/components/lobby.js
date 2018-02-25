/* eslint linebreak-style: ["error", "windows"],
prefer-const:0, class-methods-use-this:0, max-len:0 */

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

    const username = props.username ? props.username : null;

    this.state = {
      user: null,
      games: [],
      selectedGame: null,
      joinedGame: null,
    };

    this.onGames = this.onGames.bind(this);
    this.onGameStarted = this.onGameStarted.bind(this);
    this.onUsers = this.onUsers.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.signUpLobby = this.signUpLobby.bind(this);
    this.selectGame = this.selectGame.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.hostPrivateGame = this.hostPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);

    this.lobbySocket = new LobbySocket(this.onGames, this.onUsers, this.onGameStarted, username);
    if (username) {
      this.signUpLobby(username);
    }
    this.timer = 0;
    this.startKeyIndex = 2;
    this.endKeyIndex = 9;
    this.keyLength = this.endKeyIndex - this.startKeyIndex;
  }

  onGames(games) {
    this.setState({ games });
  }

  onGameStarted(game) {
    this.props.onStart(this.state.user, game);
  }

  onUsers(users) {
    console.log(users);
  }

  onStartGame() {
    this.lobbySocket.startGame(this.state.joinedGame.id)
      .then(() => {})
      .catch(err => console.log(err));
  }

  exitGame() {
    this.lobbySocket.disconnect();
    this.props.exitGame();
  }

  updateUser(fields) {
    this.lobbySocket.updateUser(this.state.user.username, fields).then((user) => {
      this.setState({ user });
    });
  }

  signUpLobby(username) {
    this.lobbySocket.getOrCreateUser(username).then((user) => {
      this.setState({ user });
    });
  }

  selectGame(game) {
    if (!this.state.joinedGame) { this.setState({ selectedGame: game }); }
  }

  joinPublicGame(gameId) {
    this.lobbySocket.joinNewGame(gameId).then((game) => {
      this.setState({ joinedGame: game });
    });
  }

  joinPrivateGame(gameId) {
    this.lobbySocket.joinNewGame(gameId).then((game) => {
      this.setState({ joinedGame: game, selectedGame: null });
    });
  }
  hostPrivateGame() {
    this.lobbySocket.createGame(true).then((newGame) => {
      this.setState({ joinedGame: newGame, selectedGame: null });
    });
  }
  backToGameSelect() {
    if (this.state.selectedGame) {
      this.lobbySocket.leaveNewGame(this.state.selectedGame.id).then(() => {
        this.setState({ selectedGame: null, joinedGame: null });
      });
    }
  }

  renderLobbyTop() {
    return (
      <div id="lobby-top">
        <span>
          <button className="exit-lobby-button" onClick={this.exitGame}>&times;</button>
        </span>
        <div>
          <svg id="info" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <div id="info-box">
            HOW TO PLAY
            <div>Race other WebAdventurers to the goal page and learn more about the world!</div>
            <img id="nav-keys" className="info-img" alt="nav-keys" src="https://i.imgur.com/qPjFtPZ.png" />
            <div>Move across the page with WASD and jump links with the L key</div>
          </div>
        </div>
      </div>
    );
  }

  renderGameSelectComponent() {
    if (this.state.joinedGame) {
      return (
        <SelectedGameView
          avatar={this.state.playerAvatar}
          joinedGame={this.state.joinedGame}
          backToGameSelect={this.backToGameSelect}
        />
      );
    } else {
      return (
        <LobbyDetailsView
          joinPrivateGame={this.joinPrivateGame}
          joinPublicGame={this.joinPublicGame}
          hostPrivateGame={this.hostPrivateGame}
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
            {this.renderLobbyTop()}
            <div id="lobby-title">WEBADVENTURE</div>
            <div id="lobby-contents">
              <LobbyGamesView
                games={this.state.games}
                selectedGame={this.state.selectedGame}
                selectGame={this.selectGame}
              />
              <div id="lobby-columns">
                <DisplayUser
                  user={this.state.user}
                  username={this.state.user.username}
                  updateUser={this.updateUser}
                />
                {this.renderGameSelectComponent()}
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
          {this.renderLobbyTop()}
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
