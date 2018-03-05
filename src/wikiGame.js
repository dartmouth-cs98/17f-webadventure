import $ from 'jquery';
import Player from './player';
import Powerups from './powerups';


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

    this.powerups = new Powerups();

    this.flipMultiplier = 1; // scales step size and direction; 1 for normal movement

    this.setupToc = this.setupToc.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.isNoKeysPressed = this.isNoKeysPressed.bind(this);

    this.powerupSound = WikiGame.createSounds();

    this.updateOnPowerup = this.updateOnPowerup.bind(this);
    this.flipControls = this.flipControls.bind(this);
    this.speedUp = this.speedUp.bind(this);
    this.slowDown = this.slowDown.bind(this);
    this.resetMultiplier = this.resetMultiplier.bind(this);

    this.renderGame();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
    $(window).resize(this.curPlayer.getLinks);
  }

  endGame() {
    $('#powerAudio').remove();
    $(window).off('resize');
    $(window).off('keydown');
    $(window).off('keyup');
    $('#wa-toc').attr('id', 'toc');
    $('mw-parser-output').children().each((elem) => {
      console.log(elem);
      if ($(elem).text === '') {
        $(elem).insertBefore($('#toc'));
      }
    });
    this.curPlayer.removePlayer();
    window.clearInterval(this.updateInterval);
    this.updateInterval = null;
    $('#powerups').remove();
  }

  renderGame() {
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
    const powerAudio = $('AUDIO');
    powerAudio.attr('id', 'powerAudio');
    powerAudio.attr('src', 'http://k003.kiwi6.com/hotlink/5cunslfq0k/Good-idea-bell.mp3');
    $('body').append(powerAudio);
    return powerAudio;
  }

  // Toggle sound icon and mute property of all audio
  toggleAudio() {
    const sound = $('#sound');
    const allAudio = $('audio');
    for (let i = 0; i < allAudio.length; i += 1) {
      allAudio[i].muted = !this.audioOn;
    }

    sound.click(() => {
      chrome.runtime.sendMessage({ message: 'sound' }, (response) => {
        response.audioOn ? sound.attr('class', 'sound-on') : sound.attr('class', 'sound-off');
        for (let i = 0; i < allAudio.length; i += 1) {
          allAudio[i].muted = !response.audioOn;
        }
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
        this.curPlayer.movePlayer(left, top, this.speed);
        this.updateOnPowerup();
      });
    });
  }

  updateGame() {
    const newLoc = this.curPlayer.getPosition();
    const stepSize = this.speed * this.flipMultiplier;

    if (this.keysPressed.x.left && !this.keysPressed.x.right && newLoc.x - 5 > 0) {
      newLoc.x -= stepSize;
      this.curPlayer.updateDirRight(false);
    } else if (!this.keysPressed.x.left &&
      this.keysPressed.x.right && newLoc.x + 5 < this.borders.width) {
      newLoc.x += stepSize;
      this.curPlayer.updateDirRight(true);
    }
    if (this.keysPressed.y.up && !this.keysPressed.y.down && newLoc.y - 5 > 0) {
      newLoc.y -= stepSize;
    } else if (!this.keysPressed.y.up &&
      this.keysPressed.y.down && newLoc.y + 5 < this.borders.height) {
      newLoc.y += stepSize;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);
    this.updateOnPowerup();
  }

  openLink() {
    const link = this.curPlayer.getLink();
    if (link !== null) {
      const redirectLink = `https://en.wikipedia.org${link}`;
      this.onNewUrl(redirectLink);
    }
  }

  updateOnPowerup() {
    const currLoc = this.curPlayer.getPosition();
    const left = currLoc.x;
    const right = currLoc.x + this.curPlayer.size.width;
    const top = currLoc.y;
    const bottom = currLoc.y + this.curPlayer.size.height;

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
    if (!this.isNoKeysPressed() && this.speed < 5) {
      this.speed = this.speed + 2;
    }
  }

  onKeyUp(evt) {
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

  isNoKeysPressed() {
    return !this.keysPressed.x.left && !this.keysPressed.x.right
    && !this.keysPressed.y.up && !this.keysPressed.y.down;
  }
}

export default WikiGame;
