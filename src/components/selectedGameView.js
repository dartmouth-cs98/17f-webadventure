/* eslint no-mixed-spaces-and-tabs:0, no-tabs:0 */

import React from 'react';

const SelectedGameView = (props) => {
  const returnStartPage = () => {
  	const pageName = decodeURIComponent(props.selectedGame.startPage.split('/').pop()).replace(/_/g, ' ');
  	return pageName;
  };

  const renderPlayers = () => {
    return props.selectedGame.players
      .map((player) => {
        return (<div>{player.username}</div>);
      });
  };

  return (
    <div id="selectedGameView">
      <div>Playing as {props.avatar}</div>
      <div>{props.selectedGame.players.length}/5 players joined</div>
      <div>{returnStartPage()}</div>
      <div>Players in game:</div>
      {renderPlayers()}
      <button onClick={props.onGoBack}>Go back</button>
    </div>
  );
};

export default SelectedGameView;
