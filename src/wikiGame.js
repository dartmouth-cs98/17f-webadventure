import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Player from './player';
import Powerups from './powerups';

import App from './components/app';

class WikiGame {
  constructor(onNewUrl, curPlayer = new Player('curPlayer', { left: 100, top: 100 }, true)) {
    this.onNewUrl = onNewUrl;
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

    this.powerups = new Powerups();

    this.flipMultiplier = 1; // scales step size and direction; 1 for normal movement
    this.leaderboard = {
      time: 1234,
      curPlayer: {
        name: 'Alma',
        avatarRight: this.curPlayer.getAvatarRight(),
      },
      players: [
        { username: 'Barry', numClicks: 40 },
        { username: 'Alma', numClicks: 45 },
        { username: 'David', numClicks: 60 },
        { username: 'Imanol', numClicks: 70 },
        { username: 'Tim', numClicks: 2 },
      ],
    };

    this.renderGame = this.renderGame.bind(this);
    this.updateLeaderboard = this.updateLeaderboard.bind(this);
    this.setupToc = this.setupToc.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.updateOnPowerup = this.updateOnPowerup.bind(this);
    this.flipControls = this.flipControls.bind(this);
    this.speedUp = this.speedUp.bind(this);
    this.slowDown = this.slowDown.bind(this);
    this.resetMultiplier = this.resetMultiplier.bind(this);

    this.renderGame();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
  }

  renderGame() {
    $('body').append('<div id=wa-main />');
    ReactDOM.render(<App leaderboard={this.leaderboard} />, document.getElementById('wa-main'));
    this.setupToc();
    const curPosition = this.curPlayer.getPosition();
    this.curPlayer.insertPlayer(curPosition.x, curPosition.y);
    this.powerups.insertPowerups();
  }

  updateLeaderboard(game) {
    // this.leaderboard.players = game.players;
    console.log(game);
    ReactDOM.render(<App leaderboard={this.leaderboard} />, document.getElementById('wa-main'));
  }

  setupToc() {
    const toc = $('#toc').detach();
    $(toc).attr('id', 'wa-toc');
    $('body').append(toc);
    $(toc).find('a').each((i, link) => {
      $(link).click(() => {
        const id = $(link).attr('href');
        const { left, top } = $(document.getElementById(id.substring(1))).offset();
        // Issue with jquery on id's with special characters; i.e. (, ), -
        this.curPlayer.movePlayer(left, top);
        this.updateOnPowerup();
      });
    });
  }

  updateGame() {
    const newLoc = this.curPlayer.getPosition();
    const stepSize = 5 * this.flipMultiplier;
    if (this.keysPressed.x.left && !this.keysPressed.x.right) {
      newLoc.x -= stepSize;
      this.curPlayer.updateDirRight(false);
    } else if (!this.keysPressed.x.left && this.keysPressed.x.right) {
      newLoc.x += stepSize;
      this.curPlayer.updateDirRight(true);
    }
    if (this.keysPressed.y.up && !this.keysPressed.y.down) {
      newLoc.y -= stepSize;
    } else if (!this.keysPressed.y.up && this.keysPressed.y.down) {
      newLoc.y += stepSize;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);
    this.updateOnPowerup();
  }

  openLink() {
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.leaderboard.url = redirectLink;
      this.onNewUrl(redirectLink);
    }
  }

  updateOnPowerup() {
    const left = this.curPlayer.position.left;
    const right = this.curPlayer.position.left + this.curPlayer.size.width;
    const top = this.curPlayer.position.top;
    const bottom = this.curPlayer.position.top + this.curPlayer.size.height;

    const overlap = this.powerups.powerups.filter((pow) => {
      const xOverlap = (left > pow.position.left && left < pow.position.left + pow.size.width) ||
        (right > pow.position.left && right < pow.position.left + pow.size.width) ||
        (left < pow.position.left && right > pow.position.left + pow.size.width);
      const yOverlap = (top > pow.position.top && top < pow.position.top + pow.size.height) ||
        (bottom > pow.position.top && bottom < pow.position.top + pow.size.height) ||
        (top < pow.position.top && bottom > pow.top + pow.size.height);
      return xOverlap && yOverlap;
    });
    const hitPowerup = overlap.length !== 0 ? overlap[0] : null;
    if (hitPowerup) {
      if (hitPowerup.type === 0) {
        this.flipControls();
      } else if (hitPowerup.type === 1) {
        this.speedUp();
      } else if (hitPowerup.type === 2) {
        this.slowDown();
      }
      // Remove from powerups array
      this.powerups.powerups = this.powerups.powerups.filter((powerup) => {
        return powerup !== hitPowerup;
      });

      // Hide icon from user
      // const powerupSelect = '.powerup[index=' + hitPowerup.index + ']';
      const powerupSelect = `.powerup[index=${hitPowerup.index}]`;
      $(powerupSelect).css({ visibility: 'hidden' });
    }
  }

  flipControls() {
    this.flipMultiplier = -1;
    setTimeout(this.resetMultiplier, 5000);
  }

  speedUp() {
    this.flipMultiplier = 2;
    setTimeout(this.resetMultiplier, 5000);
  }

  slowDown() {
    this.flipMultiplier = 0.3;
    setTimeout(this.resetMultiplier, 5000);
  }

  resetMultiplier() {
    this.flipMultiplier = 1;
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
      case 80: // P
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
        // console.log('pause game, pause pop up?');
        break;
      default:
        break;
    }
  }
}

export default WikiGame;
