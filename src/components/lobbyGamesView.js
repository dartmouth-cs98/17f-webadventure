/* eslint react/no-array-index-key: 0, "react/jsx-no-bind": 0 */

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
      selectedGame: '',
    };

    this.renderGames = this.renderGames.bind(this);
    this.selectGame = this.selectGame.bind(this);
  }

  selectGame(name) {
    console.log("name is "+name);
    this.setState({ selectedGame: name });
  }

  renderGames() {
    return this.state.games
      .map((game, index) => {
        if (game.name === this.state.selectedGame) {
          return (
            <div
              className="lobby-game-item game-selected"
              key={index}
            >{game.name}
            </div>
          );
        } else {
          return (
            <div
              className="lobby-game-item"
              key={index}
              onClick={e => this.selectGame(game.name, e)}
              role="button"
              tabIndex={0}
            >{game.name}
            </div>
          );
        }
      });
  }

  render() {
    return (
      <div id="GamesView">
        {this.renderGames()}
      </div>
    );
  }
}

export default LobbyGamesView;
