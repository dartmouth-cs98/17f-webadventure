/* eslint react/no-array-index-key: 0, "react/jsx-no-bind": 0 */

import React from 'react';

const LobbyGamesView = (props) => {
  // const handleChange = (name) => {
  //   props.onSelectGame(name);
  // };

  const renderGames = () => {
    return props.games
      .map((game, index) => {
        if (game.name === props.selectedGame) {
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
              onClick={e => props.onSelectGame(game.name, e)}
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