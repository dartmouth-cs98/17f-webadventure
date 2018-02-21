import $ from 'jquery';
// import FlipControls from './powerups/flipControls';
// import SpeedUp from './powerups/speedUp';
import Powerup from './powerup';

const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class Powerups {
  constructor() {
    this.types = ["flipControls", "speedup", "slowdown"];
    this.icon = ICON;

    this.powerups = [];
    // this.jqueryPowerups = [];

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

      const type = Math.floor(Math.random() * this.types.length);
      let powerup = new Powerup(type, { left: x, top: y });  // flipControls, speedUp, slowDown
      
      this.powerups.push(powerup);
    }
  }

  insertPowerups() {
    console.log("insertPowerups");
    $('body').append(`<div id="powerups" style="position: absolute; top: 0px; left: 0px;"></div>`);
    for(var i=0; i<this.powerups.length; i++){
      this.powerups[i].insertPowerup(i);
      console.log(this.powerups[i]);
    }
  }
}

export default Powerups;
