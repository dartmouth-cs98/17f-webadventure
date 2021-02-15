import $ from 'jquery';
import Player from './player';
import Powerups from './powerups';
import QA from './question';

// jquert plugin selects random paragraph
$.fn.random = function () { // eslint-disable-line
  return this.eq(Math.floor(Math.random() * this.length));
};

class WikiGame {
  constructor(
    onNewUrl,
    curPlayer = new Player('curPlayer'),
    game,
    audioOn,
  ) {
    this.onNewUrl = onNewUrl;
    this.curPlayer = curPlayer;

    this.audioOn = audioOn;
    this.speed = 1;
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

    this.powerupSound = WikiGame.createSounds();

    // DEVELOPMENT = QA-mode
    this.question = new QA();

    this.powerups = new Powerups();
    this.path = game.path;

    this.isFlipped = false;
    this.flipMultiplier = 1; // scales step size and direction; 1 for normal movement

    this.renderGame();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
    $(window).resize(this.curPlayer.getLinks);
  }

  endGame = () => {
    $('#powerAudio').remove();
    $(window).off('resize');
    $(window).off('keydown');
    $(window).off('keyup');
    $('#wa-toc').attr('id', 'toc');
    $('#toc').insertBefore($($('.mw-parser-output').children('h2')[0]));
    this.curPlayer.removePlayer();
    window.clearInterval(this.updateInterval);
    this.updateInterval = null;
    $('#powerups').remove();
  }

  renderGame = () => {
    this.setupToc();
    this.toggleAudio();
    const curPosition = this.curPlayer.getPosition();
    this.curPlayer.insertPlayer(curPosition.x, curPosition.y);
    this.powerups.insertPowerups();

    this.borders = {
      width: $(document).width() - this.curPlayer.getWidth(),
      height: $(document).height(),
    };
  }

  static createSounds() {
    const powerAudio = document.createElement('AUDIO');
    powerAudio.setAttribute('id', 'powerAudio');
    powerAudio.setAttribute('src', 'https://k003.kiwi6.com/hotlink/5cunslfq0k/Good-idea-bell.mp3');
    document.body.appendChild(powerAudio);
    return powerAudio;
  }

  // Toggle sound icon and mute property of all audio
  toggleAudio = () => {
    const sound = $('#sound');
    const allAudio = $('audio');
    for (let i = 0; i < allAudio.length; i += 1) {
      allAudio[i].muted = !this.audioOn;
    }

    sound.click(() => {
      chrome.runtime.sendMessage({ message: 'sound' }, (response) => {
        response.audioOn ? sound.attr('class', 'sound-on') : sound.attr('class', 'sound-off'); // eslint-disable-line
        for (let i = 0; i < allAudio.length; i += 1) {
          allAudio[i].muted = !response.audioOn;
        }
      });
    });
  }

  setupToc = () => {
    const toc = $('#toc').detach();
    $(toc).attr('id', 'wa-toc');
    $('body').append(toc);
    $(toc).find('a').each((i, link) => {
      $(link).click(() => {
        const id = $(link).attr('href');
        const { left, top } = $(document.getElementById(id.substring(1))).offset();
        // Issue with jquery on id's with special characters; i.e. (, ), -
        this.curPlayer.movePlayer(left, top, this.speed);
        this.updateOnPowerup();
      });
    });
  }

  updateGame = () => {
    const newLoc = this.curPlayer.getPosition();
    const stepSize = this.speed * this.flipMultiplier;

    if (((this.keysPressed.x.left && !this.keysPressed.x.right && !this.isFlipped)
    || (!this.keysPressed.x.left && this.keysPressed.x.right && this.isFlipped))
      && newLoc.x - stepSize > 0) {
      newLoc.x -= stepSize;
      this.curPlayer.updateDirRight(false);
    } else if (((!this.keysPressed.x.left && this.keysPressed.x.right && !this.isFlipped)
    || (this.keysPressed.x.left && !this.keysPressed.x.right && this.isFlipped))
    && newLoc.x + stepSize < this.borders.width) {
      newLoc.x += stepSize;
      this.curPlayer.updateDirRight(true);
    }
    if (((this.keysPressed.y.up && !this.keysPressed.y.down && !this.isFlipped) ||
    (!this.keysPressed.y.up && this.keysPressed.y.down && this.isFlipped))
      && newLoc.y - stepSize > 0) {
      newLoc.y -= stepSize;
    } else if (((!this.keysPressed.y.up && this.keysPressed.y.down && !this.isFlipped) ||
    (this.keysPressed.y.up && !this.keysPressed.y.down && this.isFlipped))
    && newLoc.y + stepSize < this.borders.height) {
      newLoc.y += stepSize;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);
    this.updateOnPowerup();
  }

  openLink = () => {
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.onNewUrl(redirectLink);
    }
  }

  updateOnPowerup = () => {
    const curLoc = this.curPlayer.getPosition();
    const left = curLoc.x;
    const right = curLoc.x + this.curPlayer.size.width;
    const top = curLoc.y;
    const bottom = curLoc.y + this.curPlayer.size.height;

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
      // Play powerup audio
      this.powerupSound.play();

      if (hitPowerup.type === 0) {
        this.flipControls();
      } else if (hitPowerup.type === 1) {
        this.speedUp();
      } else if (hitPowerup.type === 2) {
        this.slowDown();
      } else if (hitPowerup.type === 3) {
        this.teleport();
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

  flipControls = () => {
    this.isFlipped = true;
    this.curPlayer.updateRevPowerup(true);
    setTimeout(this.resetMultiplier, 5000);
  }

  speedUp = () => {
    this.flipMultiplier = 2;
    setTimeout(this.resetMultiplier, 5000);
  }

  slowDown = () => {
    this.flipMultiplier = 0.3;
    setTimeout(this.resetMultiplier, 5000);
  }

  teleport = () => {
    // Randomize somewhere on the path
    // const index = Math.floor(Math.random() * (this.path.length - 2)) + 1;
    // const link = `https://en.${this.path[this.path.length - 1]}`;

    // Teleport to one before the goal
    const link = `https://en.${this.path[this.path.length - 2]}`;
    this.onNewUrl(link);
  }

  resetMultiplier = () => {
    this.isFlipped = false;
    this.curPlayer.updateRevPowerup(false);
  }

  onKeyDown = (evt) => {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = true; break;
      case 68: this.keysPressed.x.right = true; break;
      case 87: this.keysPressed.y.up = true; break;
      case 83: this.keysPressed.y.down = true; break;
      case 55:
        // hit '7' and activate question.js

        // const s = $('p').random().text();
        // QA.new(s);
        window.alert(this.question.question); // eslint-disable-line no-alert
        // console.log(); // eslint-disable-line
        // this.QA.refresh();
        // this.QA.popup();
        break;
      case 13: // click link with enter
        this.openLink();
        break;
      case 76: // click link with L
        this.openLink();
        break;
      case 80: // P
        break;
      default:
        break;
    }
    if (!this.isNoKeysPressed() && this.speed < 5) {
      this.speed = this.speed + 2;
    }
  }

  onKeyUp = (evt) => {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = false; break;
      case 68: this.keysPressed.x.right = false; break;
      case 87: this.keysPressed.y.up = false; break;
      case 83: this.keysPressed.y.down = false; break;
      case 80: // Pause game with 'P'
        break;
      default:
        break;
    }
    if (this.isNoKeysPressed()) {
      this.speed = 1;
    }
  }

  isNoKeysPressed = () => {
    return !this.keysPressed.x.left && !this.keysPressed.x.right
    && !this.keysPressed.y.up && !this.keysPressed.y.down;
  }
}

export default WikiGame;
