import React from 'react';

import '../style.css';
import Leaderboard from './leaderboard';

const App = (props) => {
  return (
    <div>
      <Leaderboard
        exitGame={props.exitGame}
        goalPage={props.leaderboard.goalPage}
        curPlayer={props.leaderboard.curPlayer}
        time={props.leaderboard.time}
        players={props.leaderboard.players}
        counter={props.counter}
        audioOn={props.leaderboard.audioOn}
      />
    </div>);
};

export default App;
