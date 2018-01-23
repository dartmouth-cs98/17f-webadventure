import React, { Component } from 'react';
import GameData from './../gameData';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPlayer: {
        username: 'Alma',
        curScore: 100000,
        index: 0,
        avatar: 'https://i.imgur.com/YNcTBuU.gif',
      },
      games: {
        players: [{ username: 'Alma', curScore: 123123 }, { username: 'Barry', curScore: 11 }],
      },
    };

    this.functionnamasf = this.functionnamasf.bind(this);
  }

  functionnamasf() {

  }


  render() {
    return (
     <div id={this.state.afas} />
    );
  }
}

export default Lobby;
;