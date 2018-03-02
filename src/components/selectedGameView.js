/* eslint no-mixed-spaces-and-tabs:0, no-tabs:0 */

import React from 'react';

const SelectedGameView = (props) => {
  const renderStartPage = () => {
    const pageName = decodeURIComponent(props.joinedGame.startPage.split('/').pop()).replace(/_/g, ' ');
    return pageName;
  };

  const renderPlayers = () => {
    return props.joinedGame.players
      .map((player) => {
        return (<div key={player.username}>{player.username}</div>);
      });
  };

  const renderPrivateGameKey = () => {
    if (props.joinedGame.isPrivate) {
      return (
        <div>{props.joinedGame.id}</div>
      );
    }
    return (<div />);
  };

  return (
    <div id="selectedGameView">
      <div>{renderPrivateGameKey()}</div>
      <div>{props.joinedGame.players.length}/5 players joined</div>
      <div>Start: {renderStartPage()}</div>
      <div>Players in game:</div>
      {renderPlayers()}
      <button onClick={props.backToGameSelect}>Go back</button>
    </div>
  );
};

export default SelectedGameView;
