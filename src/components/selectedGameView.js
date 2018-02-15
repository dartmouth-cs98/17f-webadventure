import React from 'react';

const SelectedGameView = (props) => {
  const renderPlayers = () => {
    return props.selectedGame.players
      .map((player, index) => {
        const newKey = `Hello, ${index}!`;
        return (<div key={newKey}>{player}</div>);
      });
  };

  return (
    <div id="selectedGameView">
      <div>In {props.selectedGame.name}</div>
      {renderPlayers()}
      <button onClick={props.onGoBack}>Go back</button>
    </div>
  );
};

export default SelectedGameView;
