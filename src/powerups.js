import $ from 'jquery';
// import FlipControls from './powerups/flipControls';
// import SpeedUp from './powerups/speedUp';
import Powerup from './powerup';

const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class Powerups {
  constructor() {
    this.types = ['flipControls', 'speedup', 'slowdown'];
    this.icon = ICON;

    this.powerups = [];

    this.createPowerups = this.createPowerups.bind(this);
    this.insertPowerups = this.insertPowerups.bind(this);

    this.createPowerups();
  }

  createPowerups() {
    const numPowerups = Math.floor(Math.random() * 5) + 4;

    for (let i = 0; i < numPowerups; i += 1) {
      const $window = $(window);

      // Scatter powerups semi-randomly
      // const offsetX = $("#wa-container").width();
      const offsetX = 126; // 11em ish - 50 (width of avatar)
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
      const x = Math.floor(Math.random() * ($window.width() - offsetX)) + offsetX;
      const y = Math.floor(Math.random() * height);

      const type = Math.floor(Math.random() * this.types.length);
      const powerup = new Powerup(type, { left: x, top: y }); // flipControls, speedUp, slowDown

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
