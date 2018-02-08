/* eslint react/no-array-index-key: 0 */

import React, { Component } from 'react';

class LobbyGamesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        { name: 'Game1' },
        { name: 'Game2' },
        { name: 'Game3' },
        { name: 'Game4' },
        { name: 'Game5' },
      ],
    };

    this.renderGames = this.renderGames.bind(this);
  }

  renderGames() {
    return this.state.games
      .map((game, index) => {
        return (
          <div key={index}>{game.name}</div>
        );
      });
  }

  render() {
    return (
      <div id="GamesView">
        <div>
          {this.renderGames()}
        </div>
      </div>
    );
  }
}

export default LobbyGamesView;
