import $ from 'jquery';

const ICON = ['https://i.imgur.com/pp96Q4O.gif', 'https://media.giphy.com/media/11d7p2CrzQzfOw/giphy.gif',
'https://78.media.tumblr.com/4abad145cfeca409f3f76cac7e9393de/tumblr_mq50y4zfz71szhoyto1_400.gif'];

class Powerup {
  constructor(type, position = { left: 0, top: 0 }) {
    this.type = type;
    this.position = position;
    this.size = { height: 100, width: 100 };
    this.icon = ICON;

    this.insertPowerup = this.insertPowerup.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  insertPowerup() {
    console.log("inserting at "+this.position);
    $('#powerups').append(`<div powerupID="${this.type} "class= powerup"
              style="position: absolute; left:${this.position.left}px; top:${this.position.top}px;">
              <img class="powerup" src="${ICON[this.type]}" alt="powerup img"/>
            </div>`);
  }

  getPosition() {
    return { left: this.position.left, top: this.position.top };
  }
}

export default Powerup;
