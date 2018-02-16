/* eslint react/no-array-index-key: 0, "react/jsx-no-bind": 0 */

import React from 'react';

const LobbyGamesView = (props) => {
  const renderGames = () => {
    return props.games
      .map((game, index) => {
        if (props.selectedGame !== null && game.name === props.selectedGame.name) {
          return (
            <div
              className="lobby-game-item game-selected"
              key={index}
            >{props.selectedGame.name}
            </div>
          );
        } else {
          return (
            <div
              className="lobby-game-item"
              key={index}
              onClick={e => props.onSelectGame(game, e)}
              role="button"
              tabIndex={0}
            >{game.name}
            </div>
          );
        }
      });
  };

  return (
    <div id="GamesView">
      {renderGames()}
    </div>
  );
};

export default LobbyGamesView;
