import React from 'react';
import '../style.css';

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

  const renderFinishTime = (finishTime) => {
    if (finishTime === -1) {
      return <div className="leaderboard-item-right">PENDING</div>;
    } else {
      return <div className="leaderboard-item-right">{finishTime}</div>;
    }
  };

  const renderGames = () => {
    return games.players
      .sort((a, b) => a.numClicks - b.numClicks)
      .map((player, index) => {
        return (
          <div className="leaderboard-item">
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            {renderFinishTime(player.finishTime)}
          </div>
        );
      });
  };

  // const renderGames = () => {
  //   return games.players
  //     .sort((a, b) => a.numClicks - b.numClicks)
  //     .map((player, index) => {
  //       return (
  //         <div>
  //           <div className="leaderboard-item-left">
  //             <div className="leaderboard-rank">{index + 1}</div>
  //             {renderFinishTime(player)}
  //           </div>
  //         </div>
  //       );
  //     });
  // };

  return (
    <div id="end">
      <div id="end-flex">
        <div className="userStats">WEBADVENTURE</div>
        <div id="winner">
          {`${curPlayer.username} wins!`}
        </div>
        <div id="user-rankings">
          {renderGames()}
        </div>
        <button>To lobby</button>
      </div>
    </div>
  );
};

export default End;
