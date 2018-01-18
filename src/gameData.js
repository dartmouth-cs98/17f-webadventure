/* eslint no-undef: "off", no-unused-vars: "off" */
import io from 'socket.io-client';

const socketserver = 'https://webadventure-api.herokuapp.com/';
// const socketserver = 'http://localhost:9090/';

export default class GameData {
  constructor() {
    this.socket = io(socketserver);
    console.log("hey in gamedata!");
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  onPlayers(callback) {
    this.socket.on('players', callback);
  }

  getPlayers(callback) {
    this.socket.emit('getPlayers', callback);
  }

  createUser(username, playerColor) {
    this.socket.emit('signup', username, playerColor, (user) => {
    });
  }

  updateUser(username, curScore, playerColor, location) {
    const fields = { curScore, playerColor, location };
    this.socket.emit('updatePlayer', username, fields);
  }

  removeUserFromGame(username) {
    this.socket.emit('gameOver', username);
  }
}
