import React from 'react';

const End = () => {
  const curPlayer = {
    username: 'Alma',
    curScore: 2,
    index: 0,
    avatar: 'https://i.imgur.com/YNcTBuU.gif',
  };

  const games = {
    players: [
      { username: 'Alma', numClicks: 2, finishTime: 23 },
      { username: 'Barry', numClicks: 11, finishTime: -1 },
      { username: 'Stephanie', numClicks: 4, finishTime: -1 },
    ],
  };

  const renderGames = () => {
    return games.players
      .sort((a, b) => a.numClicks - b.numClicks)
      .map((player, index) => {
        return (
          <div>
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}: {player.numClicks}</div>
            </div>
          </div>
        );
      });
  };

  return (
    <div id="end">
      <div>
        {`${curPlayer.username} wins!`}
      </div>
      {renderGames()}
    </div>);
};

export default End;
