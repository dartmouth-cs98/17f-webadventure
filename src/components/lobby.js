/* eslint linebreak-style: ["error", "windows"], prefer-const:0 */

import React, { Component } from 'react';
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
      signedUp: false,
      games: [
        {
          name: 'Game1',
          players: ['Bill', 'Jill'],
          startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
          endPage: 'https://en.wikipedia.org/wiki/Architectural_style',
        },
        {
          name: 'Game2',
          players: ['Tommy', 'Eli', 'James'],
          startPage: 'https://en.wikipedia.org/wiki/China',
          endPage: 'https://en.wikipedia.org/wiki/Japan',
        },
        {
          name: 'Game3',
          players: ['Tim'],
          startPage: 'https://en.wikipedia.org/wiki/Korea',
          endPage: 'https://en.wikipedia.org/wiki/Bimbimbap',
        },
        {
          name: 'Game4',
          players: ['Alma', 'David', 'Stephanie', 'Lisa'],
          startPage: 'https://en.wikipedia.org/wiki/Dartmouth',
          endPage: 'https://en.wikipedia.org/wiki/Ivy_League',
        },
        {
          name: 'Game5',
          players: ['Imanol', 'Jerry'],
          startPage: 'https://en.wikipedia.org/wiki/Orange',
          endPage: 'https://en.wikipedia.org/wiki/Yellow',
        },
      ],
      selectedGame: null,
      privateGameSelected: false,
      publicGameSelected: false,
      joinKey: '',
      playerAvatar: 'nyan',
    };

    this.onGameChange = this.onGameChange.bind(this);
    this.onInputKey = this.onInputKey.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.backToGameSelect = this.backToGameSelect.bind(this);
    this.signUpLobby = this.signUpLobby.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);

    this.timer = 0;
    this.startKeyIndex = 2;
    this.endKeyIndex = 9;
    this.keyLength = this.endKeyIndex - this.startKeyIndex;
    this.onStartGame = this.onStartGame.bind(this);
  }

  componentDidMount() {
  }

  onGameChange(game) {
    if (!this.state.publicGameSelected) {
      this.setState({ selectedGame: game });
    }
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

  onInputKey(val) {
    if (val.length <= 7) {
      this.setState({
        joinKey: val,
      });
    }
  }

  changeAvatar(avatar) {
    this.setState({ playerAvatar: avatar });
  }

  signUpLobby(username) {
    this.setState({
      signedUp: true,
      username,
    });
  }

  joinPublicGame(newPlayers) {
    let newSelectedGame = Object.assign({}, this.state.selectedGame);
    newSelectedGame.players = newPlayers;

    this.setState({
      privateGameSelected: false,
      publicGameSelected: true,
      selectedGame: newSelectedGame,
    });
  }

  joinPrivateGame() {
    this.setState({ privateGameSelected: true, publicGameSelected: false });
  }

  backToGameSelect() {
    let newSelectedGame = Object.assign({}, this.state.selectedGame);
    const i = newSelectedGame.players.indexOf(this.state.username);
    if (i !== -1) {
      newSelectedGame.players.splice(i, 1);
    }
    this.setState({
      privateGameSelected: false,
      publicGameSelected: false,
      joinKey: '',
      selectedGame: newSelectedGame,
    });
  }

  renderLowerLeftComponent() {
    if (this.state.publicGameSelected && this.state.selectedGame !== null) {
      return (
        <SelectedGameView
          selectedGame={this.state.selectedGame}
          onGoBack={this.backToGameSelect}
        />
      );
    } else if (this.state.privateGameSelected) {
      const privGame = {
        name: 'Game1',
        players: [
          'Bob',
          'Joe',
          'Tom',
        ],
      };
      return (
        <SelectedGameView
          selectedGame={privGame}
          onGoBack={this.backToGameSelect}
        />
      );
    } else {
      return (
        <LobbyDetailsView
          username={this.state.username}
          games={this.state.games}
          privGameSel={this.state.privateGameSelected}
          publGameSel={this.state.publicGameSelected}
          joinPublicGame={this.joinPublicGame}
          joinPrivateGame={this.joinPrivateGame}
          backToGameSelect={this.backToGameSelect}
          selectedGame={this.state.selectedGame}
          joinKey={this.state.joinKey}
          onInputKey={this.onInputKey}
        />
      );
    }
  }

  render() {
    // Render lobby with all lobby components
    if (this.state.signedUp) {
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
                  username={this.state.username}
                  avatar={this.state.playerAvatar}
                  onAvatar={this.changeAvatar}
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

    // Render initial lobby with just sign up component
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
