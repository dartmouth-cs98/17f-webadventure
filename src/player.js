import $ from 'jquery';

const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];

class Player {
  constructor(username, position = { x: 0, y: 0 }, isCurPlayer = false) {
    this.username = username;
    this.id = username.replace(' ', '');
    this.facingRight = true;
    this.position = { x: -1, y: -1 };
    this.isCurPlayer = isCurPlayer;
    this.avatar = NYAN_CATS;
    $('body').append(`<div id="${this.id}" class="playerDiv" style="position: absolute">
              <span class="playerName">${this.id}</span>
              <img class="player-img" src="${NYAN_CATS[1]}" alt="nyan cat"/>
            </div>`);

    this.movePlayer = this.movePlayer.bind(this);
    this.updateDirRight = this.updateDirRight.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.isOnLink = this.isOnLink.bind(this);

    this.movePlayer(position.x, position.y);
  }

  movePlayer(x, y) {
    if (x < 0 || y < 0) { return; }
    this.position = { x, y };
    const newLoc = {
      left: x,
      top: y,
    };
    $(`#${this.id}`).css(newLoc);

    if (this.isCurPlayer) {
      if (!Player.isScrolledIntoView(`#${this.id}`)) {
        Player.scrollIntoCenterView(`#${this.id}`);
      }
    }
  }

  updateDirRight(isRight) {
    if (isRight && !this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', NYAN_CATS[1]);
      this.facingRight = true;
    } else if (!isRight && this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', NYAN_CATS[0]);
      this.facingRight = false;
    }
  }

  getPosition() {
    return this.position;
  }

  getAvatarRight() {
    return this.avatar[1];
  }

  isOnLink() {
    const curLink = $('a').filter((i, link) => {
      const { top, left } = $(link).offset();
      const width = $(link).width();
      const height = $(link).height();
      return (this.position.x > left && this.position.x < left + width
      && this.position.y > top && this.position.y < top + height);
    });
    return curLink.length !== 0 ? $(curLink[0]).attr('href') : null;
  }

  static isScrolledIntoView(elem) {
    const $elem = $(elem);
    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    const elemTop = $elem.offset().top;
    const elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  static scrollIntoCenterView(elem) {
    const top = $(elem).offset().top - ($(window).height() / 2);
    $('html, body').animate({
      scrollTop: top,
    }, 100);
  }
}

export default Player;
