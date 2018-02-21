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

    this.flipMultiplier = 1; // either 1 or -1 for flipped controls
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

    this.flipControls = this.flipControls.bind(this);
    this.unflipControls = this.unflipControls.bind(this);

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
      });
    });
  }

  updateGame() {
    const newLoc = this.curPlayer.getPosition();
    var stepSize = 5 * this.flipMultiplier;
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
  }

  openLink() {
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.leaderboard.url = redirectLink;
      this.onNewUrl(redirectLink);
    }
  }

  flipControls() {
    console.log("in flipControls");
    this.flipMultiplier = -1;

    setTimeout(this.unflipControls, 5000);
  }

  unflipControls() {
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
      case 80: // Testing flip controls with 'P'
        console.log('pressed p, flipping controls');
        this.flipControls();
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
