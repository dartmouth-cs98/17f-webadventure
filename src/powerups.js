import $ from 'jquery';

import FlipControls from './powerups/flipControls';


const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class Powerups {
  constructor() {
    this.types = ["flipControls", "speedup", "slowdown"];
    this.icon = ICON;

    this.powerups = [];

    this.createPowerups = this.createPowerups.bind(this);
    this.insertPowerups = this.insertPowerups.bind(this);

    this.createPowerups();
  }

  createPowerups() {
    console.log("createPowerups");

    const numPowerups = Math.floor(Math.random() * 5)+3;

    var i;
    for(i=0; i<numPowerups; i++){
      const $window = $(window);
      let x = Math.floor(Math.random()*$window.width());
      let y = Math.floor(Math.random()*$window.height());

      let powerup = new FlipControls({ left: x, top: y });
      this.powerups.push(powerup);
    }
  }

  insertPowerups() {
    console.log("insertPowerups");
    $('body').append(`<div id="powerups" style="position: absolute; top: 0px; left: 0px;"></div>`);
    this.powerups.map(powerup => powerup.insertPowerup());
  }
}

export default Powerups;
