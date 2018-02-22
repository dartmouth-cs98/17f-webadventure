import React from 'react';

const SelectedGameView = (props) => {
  const renderPlayers = () => {
    return props.selectedGame.players
      .map((player) => {
        return (<div>{player.username}</div>);
      });
  };

  return (
    <div id="selectedGameView">
      <div>Playing as {props.avatar}</div>
      <div>Waiting... {props.selectedGame.players.length}/5 players joined</div>
      <div>Start: {props.selectedGame.startPage}</div>
      <div>Players in game:</div>
      {renderPlayers()}
      <button onClick={props.onGoBack}>Go back</button>
    </div>
  );
};

export default SelectedGameView;
