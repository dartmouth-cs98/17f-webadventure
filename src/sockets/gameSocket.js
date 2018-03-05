import io from 'socket.io-client';

// const socketserver = 'https://webadventure-api.herokuapp.com/';
const socketserver = 'http://localhost:9090/';

export default class GameSocket {
  constructor(onGame, gameId, username) {
    this.gameId = gameId;
    this.username = username;
    this.onGame = onGame;
    this.socket = io(`${socketserver}?gameId=${gameId}`);

    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.socket.on('game', onGame);
  }

  updatePlayer(finishTime, numClicks, curUrl) {
    const playerInfo = { finishTime, numClicks, curUrl };
    const req = { gameId: this.gameId, username: this.username, playerInfo };
    this.socket.emit('updatePlayer', req);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
