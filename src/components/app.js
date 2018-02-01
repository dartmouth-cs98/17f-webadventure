import React from 'react';

import Leaderboard from './leaderboard';
import Lobby from './lobby';


const App = (props) => {
  console.log(props);
  return (
    <div>
      <Leaderboard
        curPlayer={props.leaderboard.curPlayer}
        time={props.leaderboard.time}
        players={props.leaderboard.players}
      />
      <Lobby />
    </div>);
};

export default App;
