/* eslint linebreak-style: ["error", "windows"],
prefer-const:0, class-methods-use-this:0, max-len:0 */

import React, { Component } from 'react';
import LobbySocket from '../sockets/lobbySocket';
import LobbyTop from './lobbyTop';
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

    this.lobbySocket = new LobbySocket(this.onGames, this.onUsers, username);
    if (username) {
      this.signUpLobby(username);
    }
    this.timer = 0;
    this.startKeyIndex = 2;
    this.endKeyIndex = 9;
    this.keyLength = this.endKeyIndex - this.startKeyIndex;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.exitGame);
  }

  componentWillUnmount() {
    this.exitGame();
    window.removeEventListener('beforeunload', this.exitGame);
  }

  onGames(games) {
    this.setState({ games });

    // cleaner way to write this?
    for (let i = 0; i < games.length; i += 1) {
      if (this.state.selectedGame && this.state.selectedGame.id === games[i].id) {
        this.setState({ selectedGame: games[i] });
      }
      if (this.state.joinedGame && this.state.joinedGame.id === games[i].id) {
        this.setState({ joinedGame: games[i] });
      }
    }
  }

  onUsers(users) {
    console.log(users);
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
    this.props.onStart(this.state.user, game);
  }

  exitGame() {
    if (this.state.selectedGameID) {
      // Do I need to do something with what is returned?
      this.lobbySocket.leaveNewGame(this.state.selectedGameID);
    }
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
          <LobbyTop exitGame={this.exitGame} />
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
