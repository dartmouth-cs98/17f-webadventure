import $ from 'jquery';

const ICON = 'https://i.imgur.com/pp96Q4O.gif';

class FlipControls {
  constructor(position = { left: 0, top: 0 }) {
    this.type = "FlipControls";
    this.position = position;
    this.size = { height: 40, width: 40 };
    this.icon = ICON;

    this.insertPowerup = this.insertPowerup.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  insertPowerup() {
    console.log("inserting at "+this.position);
    $('body').append(`<div id="${this.type}" class="powerup"
              style="position: absolute; left:${this.position.left}px; top:${this.position.top}px;">
              <img class="player-img" src="${ICON}" alt="powerup img"/>
            </div>`);
  }

  getPosition() {
    return { x: this.position.left, y: this.position.top };
  }
}

export default FlipControls;
