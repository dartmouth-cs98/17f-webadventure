import React from 'react';
import '../style.css';
import Leaderboard from './leaderboard';


const App = (props) => {
  return (
    <div>
      <Leaderboard
        curPlayer={props.leaderboard.curPlayer}
        time={props.leaderboard.time}
        players={props.leaderboard.players}
      />
    </div>);
};

export default App;
