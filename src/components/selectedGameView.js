import React from 'react';

const SelectedGameView = (props) => {
  const renderStartPage = () => {
    const pageName = decodeURIComponent(props.joinedGame.startPage.split('/').pop()).replace(/_/g, ' ');
    return pageName;
  };

  const renderPlayers = () => {
    return props.joinedGame.players
      .map((player) => {
        return (<div>{player.username}</div>);
      });
  };

  return (
    <div id="selectedGameView">
      <div>Playing as {props.avatar}</div>
      <div>Waiting... {props.joinedGame.players.length}/5 players joined</div>
      <div>Start: {renderStartPage()}</div>
      <div>Players in game:</div>
      {renderPlayers()}
      <button onClick={props.backToGameSelect}>Go back</button>
    </div>
  );
};

export default SelectedGameView;
