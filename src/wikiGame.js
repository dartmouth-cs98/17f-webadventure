import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Player from './player';


import App from './components/app';

class WikiGame {
  constructor(
    onNewUrl,
    curPlayer = new Player('curPlayer', { left: 100, top: 100 }, true),
    counter = 0,
  ) {
    this.onNewUrl = onNewUrl;
    this.counter = counter;
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
    this.leaderboard = {
      time: 1234,
      curPlayer: {
        name: curPlayer.username,
        avatarRight: this.curPlayer.getAvatarRight(),
      },
      players: [
        { username: 'Barry', numClicks: 40 },
        { username: 'Alma', numClicks: 45 },
        { username: 'David', numClicks: 60 },
        { username: curPlayer.username, numClicks: 0 },
        { username: 'Tim', numClicks: 7 },
      ],
      goalPage: 'https://en.wikipedia.org/wiki/Orange',
    };

    this.soundEffects = [];

    this.renderGame = this.renderGame.bind(this);
    this.updateLeaderboard = this.updateLeaderboard.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
    this.setupToc = this.setupToc.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.setupTopbar = this.setupTopbar.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);

    setInterval(this.increaseCounter, 1000);
    this.renderGame();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
  }


  renderGame() {
    $('body').append('<div id=wa-main />');
    ReactDOM.render(<App leaderboard={this.leaderboard} counter={this.counter} />, document.getElementById('wa-main'));
    this.setupToc();
    this.setupTopbar();
    const curPosition = this.curPlayer.getPosition();
    this.curPlayer.insertPlayer(curPosition.x, curPosition.y);
    this.borders = {
      width: $(document).width() - this.curPlayer.getWidth(),
      height: $(document).height(),
    };
  }

  updateLeaderboard(game) {
    if (game) {
      this.leaderboard.players = game.players;
      this.leaderboard.goalPage = game.goalPage;
    }
    ReactDOM.render(<App leaderboard={this.leaderboard} counter={this.counter} />, document.getElementById('wa-main'));
  }

  increaseCounter() {
    this.counter = this.counter + 1;
    this.updateLeaderboard();
  }

  toggleAudio() {
    console.log("toggleAudio");
    const linkAudio = document.createElement("AUDIO");
    linkAudio.setAttribute("id", "whoosh");
    linkAudio.setAttribute("src","http://k003.kiwi6.com/hotlink/6etyb9h8wr/swoosh.mp3");

    var audio = document.querySelectorAll("audio");
    // for each audio, set mute
  }

  setupTopbar() {

    var bgAudio = document.getElementById("bgAudio");
    console.log(bgAudio);

    $('.sound').click(function() {
      console.log("sound clicked");
      $('.sound').toggleClass('sound-mute');
      $('.sound').toggleClass('sound-on');

      // this.toggleAudio(); // Toggle sound effects
      // Toggle background music
      chrome.runtime.sendMessage({message: "sound"}, function(response) {
      });
    });
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
    if (this.keysPressed.x.left && !this.keysPressed.x.right && newLoc.x - 5 > 0) {
      newLoc.x -= 5;
      this.curPlayer.updateDirRight(false);
    } else if (!this.keysPressed.x.left &&
      this.keysPressed.x.right && newLoc.x + 5 < this.borders.width) {
      newLoc.x += 5;
      this.curPlayer.updateDirRight(true);
    }
    if (this.keysPressed.y.up && !this.keysPressed.y.down && newLoc.y - 5 > 0) {
      newLoc.y -= 5;
    } else if (!this.keysPressed.y.up &&
      this.keysPressed.y.down && newLoc.y + 5 < this.borders.height) {
      newLoc.y += 5;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);
  }

  openLink() {
    console.log(this.curPlayer.getLink());
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.leaderboard.url = redirectLink;
      this.onNewUrl(redirectLink);
    }
  }

  playSound() {
    console.log("playSound");
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
        // console.log('pause game, pause pop up?');
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
        this.playSound();
        break;
      default:
        break;
    }
  }
}

export default WikiGame;
