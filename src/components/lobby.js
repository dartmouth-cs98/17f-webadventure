/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import SignUp from './signup';
import LobbyGameView from './lobbyGameView';
import LobbyGamesView from './lobbyGamesView';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUp: false,
    };
    this.timer = 0;
  }

  componentDidMount() {
  }

  signUpLobby(username) {
    this.setState({
      signedUp: true,
      username: username
    });
  }

  render() {
    if (this.state.signedUp) {
      return (
        <div id="lobby">
          <div id="lobby-title">WEBADVENTURE</div>
          <div id="lobby-contents">
            <LobbyGamesView />
            <div id="lobby-columns">
              <SignUp signedUp={ true } username={ this.state.username }/>
              <LobbyGameView />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div id="lobby">
        <div id="lobby-title">WEBADVENTURE</div>
        <SignUp signUpLobby={ this.signUpLobby.bind(this) }/>
      </div>
    );
  }
}

export default Lobby;
