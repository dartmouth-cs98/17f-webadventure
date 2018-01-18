/* eslint no-unused-vars: 0 */

import Player from './player';

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

class WikiGame {
  constructor(curPlayer = new Player('curPlayer', { x: 100, y: 100 }, true)) {
    this.curPlayer = curPlayer;
    this.players = [];
    this.keysPressed = {
      x: {
        left: false,
        right: false,
      },
      y: {
        up: false,
        down: false,
      },
    };

    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
  }

  updateGame() {
    const newLoc = this.curPlayer.getPosition();
    if (this.keysPressed.x.left && !this.keysPressed.x.right) {
      newLoc.x -= 5;
      this.curPlayer.updateDirRight(false);
    } else if (!this.keysPressed.x.left && this.keysPressed.x.right) {
      newLoc.x += 5;
      this.curPlayer.updateDirRight(true);
    }
    if (this.keysPressed.y.up && !this.keysPressed.y.down) {
      newLoc.y -= 5;
    } else if (!this.keysPressed.y.up && this.keysPressed.y.down) {
      newLoc.y += 5;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);

    // update locations of other players
    //
  }

  openLink() {
    const link = this.curPlayer.isOnLink();
    if (link !== null) {
      window.open(`https://en.wikipedia.org${link}`, '_self');
    }
  }

  onKeyDown(evt) {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = true; break;
      case 68: this.keysPressed.x.right = true; break;
      case 87: this.keysPressed.y.up = true; break;
      case 83: this.keysPressed.y.down = true; break;
      case 76: // click link with L
        this.openLink();
        break;
      case 80: // Pause game with 'P'
        console.log('pause game, pause pop up?');
        break;
      default:
        break;
    }
  }

  onKeyUp(evt) {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = false; break;
      case 68: this.keysPressed.x.right = false; break;
      case 87: this.keysPressed.y.up = false; break;
      case 83: this.keysPressed.y.down = false; break;
      case 80: // Pause game with 'P'
        console.log('pause game, pause pop up?');
        break;
      default:
        break;
    }
  }
}

export default WikiGame;
