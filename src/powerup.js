import $ from 'jquery';

const ICON = ['https://i.imgur.com/pp96Q4O.gif', 'https://media.giphy.com/media/11d7p2CrzQzfOw/giphy.gif',
  'https://78.media.tumblr.com/4abad145cfeca409f3f76cac7e9393de/tumblr_mq50y4zfz71szhoyto1_400.gif'];

const types = ['flipControls', 'speedUp', 'slowDown'];

class Powerup {
  constructor(type, position = { left: 0, top: 0 }) {
    this.type = type; // corresponds to index of types array above
    this.position = position;
    this.size = { height: 100, width: 100 };
    this.icon = ICON;
    this.index = 0;

    this.insertPowerup = this.insertPowerup.bind(this);
  }

  insertPowerup(index) {
    this.index = index;
    const element = `<img type=${this.type} index=${index} class=powerup
      style="position: absolute; left:${this.position.left}px; top:${this.position.top}px;
      width:' + this.size.width + 'px; height:' + this.size.height + 'px;"
      src=${ICON[this.type]} alt="${types[this.type]}" />`;
    $('#powerups').append(element);
  }
}

export default Powerup;
