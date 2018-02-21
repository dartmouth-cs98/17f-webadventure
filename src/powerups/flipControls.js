import $ from 'jquery';

const ICON = 'https://media.giphy.com/media/26tPgy93ssTeTTSqA/giphy.gif';

class FlipControls {
  constructor(type, position = { left: 600, top: 600 }) {
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
              style="position: absolute; left="${this.position.left}"; top="${this.position.right}";">
              <img class="player-img" src="${ICON}" alt="powerup img"/>
            </div>`);
  }

  getPosition() {
    return { x: this.position.left, y: this.position.top };
  }
}

export default FlipControls;
