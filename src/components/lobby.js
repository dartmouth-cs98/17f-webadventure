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
      selectedGameID: null,
      playerAvatar: 'nyan',
    };

    this.onGameChange = this.onGameChange.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.hostPrivateGame = this.hostPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
    this.signUpLobby = this.signUpLobby.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.onGames = this.onGames.bind(this);
    this.onUsers = this.onUsers.bind(this);

    this.lobbySocket = new LobbySocket(this.onGames, this.onUsers, username);
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
    if (this.state.selectedGame) {
      this.setState({ selectedGameID: this.state.selectedGame._id });
    }
  }

  onUsers(users) {
    console.log(users);
  }

  onGameChange(game) {
    this.setState({ selectedGame: game });
  }

  onStartGame() {
    const game = {
      id: '5a80e8dff58b73d699780895',
      host: 'almawang',
      isPrivate: true,
      startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
      goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
      players: [
        { username: 'Barry', numClicks: 40, finishTime: -1 },
        { username: 'Alma', numClicks: 45, finishTime: -1 },
        { username: 'David', numClicks: 60, finishTime: -1 },
        { username: this.state.user.username, numClicks: 0, finishTime: -1 },
        { username: 'Tim', numClicks: 7, finishTime: -1 },
      ],
    };
    this.props.onStart(this.state.user.username, game);
  }

  exitGame() {
    this.lobbySocket.disconnect();
    this.props.exitGame();
  }

  changeAvatar(avatar) {
    this.setState({ playerAvatar: avatar });
  }

  signUpLobby(username) {
    this.lobbySocket.getOrCreateUser(username).then((user) => {
      this.setState({ user });
    });
  }

  joinPublicGame() {
    // this.setState({ selectedGameID: this.state.selectedGame.id });
    this.lobbySocket.joinNewGame(this.state.selectedGame.id)
      .then((game) => {
        this.setState({ selectedGame: game });
      })
      .catch((error) => {
        console.log(error);
      });
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

  renderLowerLeftComponent() {
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
            {this.renderLobbyTop()}
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
