import io from 'socket.io-client';

// const socketserver = 'https://webadventure-api.herokuapp.com/lobby';
const socketserver = 'http://localhost:9090/lobby';

export default class LobbySocket {
  constructor(onGames, onUsers, username) {
    this.username = username;
    const socketURL = username ? `${socketserver}?username=${username}` : `${socketserver}`;
    this.socket = io(socketURL);

    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.socket.on('games', onGames);
    this.socket.on('users', onUsers);
  }

  getOrCreateUser(username) {
    this.username = username;
    return new Promise((resolve, reject) => {
      this.socket.emit('getOrCreateUser', { username }, (data) => {
        if (data) { resolve(data); } else {
          reject(new Error('No data returned'));
        }
      });
    });
  }

  updateUser(username, fields) {
    const req = {
      username, fields,
    };
    this.socket.emit('updateUser', req);
  }

  createGame(isPrivate) {
    const req = {
      username: this.username, isPrivate,
    };
    return new Promise((resolve, reject) => {
      this.socket.emit('createGame', req, (data) => {
        if (data) { resolve(data); } else {
          reject(new Error('No data returned'));
        }
      });
    });
  }

  joinNewGame(gameId) {
    const req = { gameId, username: this.username };
    return new Promise((resolve, reject) => {
      this.socket.emit('joinNewGame', req, (data) => {
        if (data) { resolve(data); } else {
          reject(new Error('No data returned'));
        }
      });
    });
  }

  leaveNewGame(gameId) {
    const req = { gameId, username: this.username };
    return new Promise((resolve, reject) => {
      this.socket.emit('leaveNewGame', req, (data) => {
        if (data) { resolve(data); } else {
          reject(new Error('No data returned'));
        }
      });
    });
  }
  disconnect() {
    this.socket.close();
  }

  startGame(gameId) {
    return new Promise((resolve, reject) => {
      this.socket.emit('startGame', gameId, (data) => {
        if (data) {
          this.socket.close();
          this.socket = null;
          resolve(data);
        } else {
          reject(new Error('No data returned'));
        }
      });
    });
  }
}
