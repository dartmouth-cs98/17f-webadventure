import $ from 'jquery';


const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class FlipPowerup {
  constructor(type, position = { left: 600, top: 600 }) {
    this.type = "FlipPowerup";
    this.position = position;
    this.size = { height: 40, width: 40 };
    this.icon = ICON;

    this.insertPowerup = this.insertPowerup.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  insertPowerup(x, y) {
    $('body').append(`<div id="${this.type}" class="powerup" style="position: absolute; top: 300px; left: 300px">
              <img class="player-img" src="${ICON}" alt="powerup img"/>
            </div>`);
  }

  getPosition() {
    return { x: this.position.left, y: this.position.top };
  }
}

export default FlipPowerup;
