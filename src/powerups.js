import $ from 'jquery';
// import FlipControls from './powerups/flipControls';
// import SpeedUp from './powerups/speedUp';
import Powerup from './powerup';

const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class Powerups {
  constructor() {
    this.types = ['flipControls', 'speedup', 'slowdown', 'teleport'];
    this.icon = ICON;

    this.powerups = [];

    this.createPowerups = this.createPowerups.bind(this);
    this.insertPowerups = this.insertPowerups.bind(this);

    this.createPowerups();
  }

  static getPowerupType() {
    const rand = Math.random();
    if (rand < 0.3) {
      return 0;
    } else if (rand < 0.6) {
      return 1;
    } else if (rand < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }

  createPowerups() {
    // const numPowerups = Math.floor(Math.random() * 5) + 4;
    const $window = $(window);
    const offsetX = 176; // 11em
    const avatarWidth = 50;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight,
    );

    const numPowerups = Math.floor(Math.random() * height)/150 + 2;
    for (let i = 0; i < numPowerups; i += 1) {

      // Scatter powerups semi-randomly
      // const offsetX = $("#wa-container").width();
      const x = Math.floor(Math.random() * ($window.width() - offsetX - avatarWidth)) + offsetX;
      const y = Math.floor(Math.random() * height);

      // const type = Math.floor(Math.random() * this.types.length);
      const type = Powerups.getPowerupType();

      const powerup = new Powerup(type, { left: x, top: y }); // flipControls, speedUp, slowDown, teleport

      this.powerups.push(powerup);
    }
  }

  insertPowerups() {
    $('body').append('<div id="powerups" style="position: absolute; top: 0px; left: 0px;"></div>');
    this.powerups.forEach((powerup, i) => {
      powerup.insertPowerup(i);
    });
  }
}

export default Powerups;
