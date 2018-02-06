/* eslint no-unused-vars: 0 */

import React from 'react';
import '../style.css';
import Leaderboard from './leaderboard';
import Lobby from './lobby';


const App = (props) => {
  return (
    <div>
      <Leaderboard
        curPlayer={props.leaderboard.curPlayer}
        time={props.leaderboard.time}
        players={props.leaderboard.players}
      />
      {/* <Lobby /> */}
    </div>);
};

export default App;
