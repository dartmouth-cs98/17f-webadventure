import React from 'react';
import Leaderboard from './leaderboard';
import '../style.css';

const App = (props) => {
  console.log(props);
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
