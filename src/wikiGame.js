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
    audioOn,
  ) {
    this.onNewUrl = onNewUrl;
    this.counter = counter;
    this.curPlayer = curPlayer;
    this.players = [];
    this.audioOn = audioOn;
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

    this.renderGame = this.renderGame.bind(this);
    this.updateLeaderboard = this.updateLeaderboard.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
    this.setupToc = this.setupToc.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    // this.createSounds = this.createSounds.bind(this);
    // this.soundEffects = this.createSounds();
    // this.toggleAudio = this.toggleAudio.bind(this);

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

  // createSounds() {
  //   console.log("create sounds");
  //   let soundArray = [];

  //   // const linkAudio = document.createElement("AUDIO");
  //   // linkAudio.setAttribute("id", "linkAudio");
  //   // // linkAudio.setAttribute("src","https://k003.kiwi6.com/hotlink/6etyb9h8wr/swoosh.mp3");
  //   // linkAudio.setAttribute("src", "https://k003.kiwi6.com/hotlink/3ewofkoxts/wii.mp3");
  //   // document.body.appendChild(linkAudio);
  //   // soundArray.push(linkAudio);

  //   console.log(soundArray);
  //   return soundArray;
  // }

  toggleAudio() {
    console.log("toggleAudio");

    var audio = document.querySelectorAll('audio');
    console.log(audio);
    // for each audio, set mute
  }

  setupTopbar() {
    $('#sound').click(() => {
      this.toggleAudio(); // Toggle sound effects
      // Toggle background music
      chrome.runtime.sendMessage({ message: 'sound' }, (response) => {
        console.log(response.audio);
        if (response.audio)
          document.getElementById("sound").className = 'sound-on';
        else
          document.getElementById("sound").className = 'sound-off';
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
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.leaderboard.url = redirectLink;
      this.onNewUrl(redirectLink);
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
        break;
      default:
        break;
    }
  }
}

export default WikiGame;
