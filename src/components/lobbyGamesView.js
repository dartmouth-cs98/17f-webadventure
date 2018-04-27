/* eslint "react/jsx-no-bind": 0 jsx-a11y/no-distracting-elements:0 */

import React from 'react';

const LobbyGamesView = (props) => {
  const handleOverflow = (start, end) => {
    const parsedStart = decodeURIComponent(start).replace(/_/g, ' ');
    const parsedEnd = decodeURIComponent(end).replace(/_/g, ' ');
    const compare = parsedStart + parsedEnd;
    if (compare.length > 20) {
      return (
        <marquee
          className="starting-page"
          behavior="scroll"
          direction="left"
          scrollamount="3"
        >
          {parsedStart}&rarr;{parsedEnd}
        </marquee>
      );
    }
    return (
      <div className="starting-page">
        {parsedStart}&rarr;{parsedEnd}
      </div>
    );
  };

  const gameDone = (players) => {
    let done = false;
    players.forEach((player) => {
      if (player.finishTime > -1) {
        done = true;
      }
    });
    return done;
  };

  const renderGames = () => {
    return props.games.filter((game) => { return !game.isPrivate && !gameDone(game.players); })
      .sort((a, b) => b.players.length - a.players.length)
      .map((game, index) => {
        const start = game.startPage.split('/').pop();
        const end = game.goalPage.split('/').pop();
        const colorIndex = `color-${index}`;
        if (props.selectedGame && game.id === props.selectedGame.id) {
          return (
            <div className="game-selected game-item" key={game.id}>
              <div className="game-title-row">
                <div
                  className="lobby-game-item"
                >{game.host}
                </div>
                <div className="num-players">
                  ({game.players.length}/5)
                </div>
              </div>
              {handleOverflow(start, end)}
            </div>
          );
        } else {
          return (
            <div
              className="game-item"
              key={game.id}
              onClick={() => props.selectGame(game)}
              role="button"
              tabIndex={0}
            >
              <div className="game-title-row">
                <div
                  className="lobby-game-item"
                  id={colorIndex}
                >
                  {game.host}
                </div>
                <div className="num-players">
                  ({game.players.length}/5)
                </div>
              </div>
              {handleOverflow(start, end)}
            </div>
          );
        }
      });
  };

  return (
    <div id="GamesView">
      {/* <div id="public-games-header">PUBLIC GAMES</div> */}
      <div id="games-list">
        {renderGames()}
      </div>
    </div>
  );
};

export default LobbyGamesView;
