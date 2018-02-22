import React from 'react';

import '../style.css';
import Leaderboard from './leaderboard';

const App = (props) => {
  return (
    <div>
      <Leaderboard
        goalPage={props.leaderboard.goalPage}
        curPlayer={props.leaderboard.curPlayer}
        time={props.leaderboard.time}
        players={props.leaderboard.players}
        counter={props.counter}
      />
    </div>);
};

export default App;
