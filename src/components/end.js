import React from 'react';
import '../style.css';

const End = (props) => {
  console.log(props);
  const curPlayer = {
    username: 'alma',
    curScore: 2,
    avatar: 'https://i.imgur.com/YNcTBuU.gif',
  };

  const renderPlayers = () => {
    return props.leaderboard
      .sort((a, b) => a.numClicks - b.numClicks)
      .map((player, index) => {
        return (
          <div className="leaderboard-item">
            <div className="leaderboard-item-left">
              <div className="leaderboard-rank">{index + 1}</div>
              <div>{player.username}</div>
            </div>
            <div className="leaderboard-item-right">
              {player.finishTime === -1 ? 'PENDING' : player.finishTime}
            </div>
          </div>
        );
      });
  };

  const onNewGame = () => {
    props.onNewGame(curPlayer.username);
  };

  return (
    <div id="end">
      <button className="exit-lobby-button" onClick={props.exitGame}> &times; </button>
      <div id="end-flex">
        <div className="userStats">WEBADVENTURE</div>
        <div id="winner">
          {`${curPlayer.username} wins!`}
        </div>
        <div id="user-rankings">
          {renderPlayers()}
        </div>
        <button onClick={onNewGame}>To Lobby</button>
      </div>
    </div>
  );
};

export default End;
