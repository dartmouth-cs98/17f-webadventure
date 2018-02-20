/* eslint react/no-array-index-key: 0, "react/jsx-no-bind": 0 */

import React from 'react';

const LobbyGamesView = (props) => {
  const handlOverflow = (start, end) => {
    const compare = start + end;
    if (compare.length > 20) {
      return (
        <marquee
          className="starting-page"
          behavior="scroll"
          direction="right"
          scrollamount="3"
        >
          {start}&rarr;{end}
        </marquee>
      );
    }
    return (
      <div className="starting-page">
        {start}&rarr;{end}
      </div>
    );
  };

  const splitWord = (str) => {
    const parts = str.split('/');
    return parts.pop();
  };

  const renderGames = () => {
    return props.games
      .sort((a, b) => b.players.length - a.players.length)
      .map((game, index) => {
        const start = splitWord(game.startPage);
        const end = splitWord(game.goalPage);
        if (game.id === props.selectedGameID) {
          return (
            <div className="game-selected game-item">
              <div className="game-title-row">
                <div
                  className="lobby-game-item"
                  key={index}
                >{game.host}
                </div>
                <div className="num-players">
                  ({game.players.length}/5)
                </div>
              </div>
              {handlOverflow(start, end)}
            </div>
          );
        } else {
          return (
            <div
              className="game-item"
              onClick={e => props.onSelectGame(game, e)}
              role="button"
              tabIndex={0}
            >
              <div className="game-title-row">
                <div
                  className="lobby-game-item"
                  key={index}
                >
                  {game.host}
                </div>
                <div className="num-players">
                  ({game.players.length}/5)
                </div>
              </div>
              {handlOverflow(start, end)}
            </div>
          );
        }
      });
  };

  return (
    <div id="GamesView">
      <div id="public-games-header">PUBLIC GAMES</div>
      <div id="games-list">
        {renderGames()}
      </div>
    </div>
  );
};

export default LobbyGamesView;
