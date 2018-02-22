import io from 'socket.io-client';

const socketserver = 'https://webadventure-api.herokuapp.com/';
// const socketserver = 'http://localhost:9090/';

export default class GameSocket {
  constructor(onGame, roomhost, gameId, username) {
    this.gameId = gameId;
    this.username = username;
    this.onGame = onGame;
    this.socket = io(`${socketserver}?roomhost=${roomhost}&gameId=${gameId}`);

    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.socket.on('game', onGame);
  }

  updatePlayer(finishTime, numClicks, curUrl) {
    const game = {
      id: '5a80e8dff58b73d699780895',
      host: 'almawang',
      isPrivate: true,
      startPage: 'https://en.wikipedia.org/wiki/Victorian_architecture',
      goalPage: 'https://en.wikipedia.org/wiki/Architectural_style',
      players: [
        { username: 'Barry', numClicks: 40, finishTime: -1 },
        { username: 'Alma', numClicks: 45, finishTime: -1 },
        { username: 'David', numClicks: 60, finishTime: -1 },
        { username: this.username, numClicks: 70, finishTime: -1 },
        { username: 'Tim', numClicks: 7, finishTime: -1 },
      ],
    };
    const updatedPlayers = game.players.map((player) => {
      if (player.username === this.username) {
        const newPlayer = player;
        newPlayer.finishTime = finishTime;
        newPlayer.numClicks = numClicks;
        newPlayer.curUrl = curUrl;
        return player;
      } else {
        return player;
      }
    });
    game.players = updatedPlayers;
    this.onGame(game);
    // const playerInfo = { finishTime, numClicks, curUrl };
    // const req = { gameId: this.gameId, username: this.username, playerInfo };
    // this.socket.emit('updatePlayer', req); // disabled for now
  }

  disconnect() {
    this.socket.disconnect();
  }
}
