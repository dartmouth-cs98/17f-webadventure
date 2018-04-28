/* eslint linebreak-style: ["error", "windows"],
prefer-const:0, class-methods-use-this:0, max-len:0 */

import React, { Component } from 'react';
import $ from 'jquery';
import LobbySocket from '../sockets/lobbySocket';
import LobbyTop from './lobbyTop';
import SignUp from './signup';
import LobbyDetailsView from './lobbyDetailsView';
import LobbyGamesView from './lobbyGamesView';
import SelectedGameView from './selectedGameView';
import DisplayUser from './displayUser';
import { generateId } from './quickstart';
import '../style.css';

class Lobby extends Component {
  constructor(props) {
    super(props);

    const username = props.username ? props.username : null;

    this.state = {
      user: null,
      games: [],
      selectedGame: null,
      allUsers: [],
      joinedGame: null,
    };

    this.lobbySocket = new LobbySocket(this.onGames, this.onUsers, this.onGameStarted, username);
    if (username) {
      this.signUpLobby(username);
    }
    this.timer = 0;
  }

  componentDidMount = () => {
    this.toggleAudio();
    window.addEventListener('beforeunload', this.exitGame);
  }

  // BUG: It connects to lobby multiple times if you keep starting and quiting
  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.exitGame);
  }

  onGames = (games) => {
    const newState = { games };
    games.forEach((game) => {
      if (this.state.selectedGame && this.state.selectedGame.id === game.id) {
        newState.selectedGame = game;
      }
      if (this.state.joinedGame && this.state.joinedGame.id === game.id) {
        newState.joinedGame = game;
      }
    });
    this.setState(newState);
  }

  onGameStarted = (game) => {
    this.props.onStart(this.state.user, game);
  }

  onUsers = (users) => {
    this.setState({ allUsers: users });
  }

  onStartGame = () => {
    if (!this.state.joinedGame.active) {
      this.lobbySocket.startGame(this.state.joinedGame.id)
        .then(() => {})
        .catch(err => console.log(err));
    }
  }

  // Toggle sound icon and mute property of all audio
  toggleAudio = () => {
    const sound = $('#sound-lobby');

    sound.click(() => {
      chrome.runtime.sendMessage({ message: 'sound' }, (response) => { // eslint-disable-line
        response.audioOn ? sound.attr('class', 'sound-on') : sound.attr('class', 'sound-off'); // eslint-disable-line
      });
    });
  }

  exitGame = () => {
    if (this.state.selectedGame) {
      this.lobbySocket.leaveNewGame(this.state.selectedGame.id);
    }
    this.lobbySocket.disconnect();
    this.props.exitGame();
  }

  updateUser = (fields) => {
    this.lobbySocket.updateUser(this.state.user.username, fields).then((user) => {
      this.setState({ user });
    });
  }

  signUpLobby = (username, callback) => {
    this.lobbySocket.getOrCreateUser(username).then((user) => {
      this.setState({ user }, callback);
    });
  }

  selectGame = (game) => {
    if (!this.state.joinedGame) {
      this.setState({ selectedGame: game });
    }
  }

  joinPublicGame = (gameId) => {
    this.lobbySocket.joinNewGame(gameId).then((game) => {
      this.setState({ joinedGame: game });
    });
  }

  joinPrivateGame = (gameId) => {
    this.lobbySocket.joinNewGame(gameId).then((game) => {
      this.setState({ joinedGame: game, selectedGame: null });
    });
  }

  hostPrivateGame = (callback) => {
    this.lobbySocket.createGame(true).then((newGame) => {
      this.setState({ joinedGame: newGame, selectedGame: null }, callback);
    });
  }

  joinQuickstartGame = () => {
    this.lobbySocket.createGame(true).then((newGame) => {
      this.setState({ joinedGame: newGame, selectedGame: null }, this.onStartGame);
    });
  }

  backToGameSelect = () => {
    if (this.state.joinedGame) {
      this.lobbySocket.leaveNewGame(this.state.joinedGame.id).then(() => {
        if (this.state.joinedGame.players.length === 1 && this.state.joinedGame.isPrivate) {
          this.lobbySocket.deleteGame(this.state.joinedGame.id);
        }
        this.setState({ selectedGame: null, joinedGame: null });
      });
    }
  }

  quickstart = () => {
    this.signUpLobby(generateId(), this.joinQuickstartGame); // skips to game
  }

  renderGameSelectComponent = () => {
    if (this.state.joinedGame) {
      return (
        <SelectedGameView
          user={this.state.user}
          onStartGame={this.onStartGame}
          joinedGame={this.state.joinedGame}
          backToGameSelect={this.backToGameSelect}
        />
      );
    } else {
      return (
        <LobbyDetailsView
          games={this.state.games}
          joinPrivateGame={this.joinPrivateGame}
          joinPublicGame={this.joinPublicGame}
          hostPrivateGame={this.hostPrivateGame}
          selectedGame={this.state.selectedGame}
        />
      );
    }
  }

  render = () => {
    // Render lobby with all lobby components
    if (this.state.user) {
      return (
        <div>
          <div className="overlay" />
          <div id="lobby-container">
            <div id="lobby">
              <LobbyTop exitGame={this.exitGame} />
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
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="overlay" />
        <div id="lobby-container">
          <div id="lobby">
            <LobbyTop audioOn={this.props.audioOn} exitGame={this.exitGame} />
            <img src="https://i.imgur.com/VUVNhtC.png" alt="webadventure!" id="webad-logo" />
            <div id="lobby-title">WEBADVENTURE</div>
            <SignUp
              allUsers={this.state.allUsers}
              signUpLobby={this.signUpLobby}
              signedUp={this.signedUp}
              quickstart={this.quickstart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
