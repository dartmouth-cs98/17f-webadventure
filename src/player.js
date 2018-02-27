import $ from 'jquery';

const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];

class Player {
  constructor(
    username, avatar = NYAN_CATS,
    position = { left: 100, top: 100 }, isCurPlayer = true,
  ) {
    this.username = username;
    this.id = username.replace(' ', '');
    this.facingRight = true;
    this.position = position;
    this.size = { height: 40, width: 40 };
    this.isCurPlayer = isCurPlayer;
    this.avatar = avatar;
    this.link = null;

    this.insertPlayer = this.insertPlayer.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.updateDirRight = this.updateDirRight.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getAvatarRight = this.getAvatarRight.bind(this);
    this.getLink = this.getLink.bind(this);
    this.updateOnLink = this.updateOnLink.bind(this);
  }

  getLinks() {
    this.links = [];
    $('a').each((i, link) => {
      if (!$(link).attr('href') || $(link).attr('href').includes('#')) {
        return;
      }
      const { top, left } = $(link).offset();
      const width = $(link).width();
      const height = $(link).height();
      const vertSection = Math.floor((top + height) / 100);
      const linksList = this.links[vertSection] ? this.links[vertSection] : [];
      linksList.push({
        top, left, width, height, link,
      });
      this.links[vertSection] = linksList;
    });
  }

  insertPlayer(x, y) {
    this.getLinks();
    $('body').append(`<div id="${this.id}" class="playerDiv" style="position: absolute">
              <span class="playerName">${this.id}</span>
              <img class="player-img" src="${this.avatar[1]}" alt="nyan cat"/>
            </div>`);
    this.movePlayer(x, y);
  }

  movePlayer(left, top) {
    if (left < 0 || top < 0) { return; }
    this.position = { left, top };
    $(`#${this.id}`).css(this.position);

    if (this.isCurPlayer) {
      if (!Player.isScrolledIntoView(`#${this.id}`)) {
        Player.scrollIntoCenterView(`#${this.id}`);
      }
      this.updateOnLink();
    }
  }

  updateOnLink() {
    const leftEnd = this.position.left;
    const rightEnd = this.position.left + this.size.width;
    const topEnd = this.position.top;
    const bottomEnd = this.position.top + this.size.height;
    const linksList = this.links[Math.floor(topEnd / 100)] ?
      this.links[Math.floor(topEnd / 100)] : [];
    if (Math.floor(topEnd / 100) !== Math.floor(bottomEnd / 100)) {
      linksList.concat(this.links[Math.floor(bottomEnd / 100)]);
    }
    const overlap = linksList.filter((linkItem) => {
      const xOverlap = (leftEnd > linkItem.left && leftEnd < linkItem.left + linkItem.width) ||
        (rightEnd > linkItem.left && rightEnd < linkItem.left + linkItem.width) ||
        (leftEnd < linkItem.left && rightEnd > linkItem.left + linkItem.width);
      const yOverlap = (topEnd > linkItem.top && topEnd < linkItem.top + linkItem.width) ||
        (bottomEnd > linkItem.top && bottomEnd < linkItem.top + linkItem.width) ||
        (topEnd < linkItem.top && bottomEnd > linkItem.top + linkItem.width);
      return xOverlap && yOverlap;
    });
    const link = overlap.length !== 0 ? overlap[0].link : null;
    if (link) {
      $(link).css('color', 'pink');
    }
    if (this.link && this.link !== link) {
      $(this.link).css('color', '#0645ad');
    }
    this.link = link;
  }

  updateDirRight(isRight) {
    if (isRight && !this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', this.avatar[1]);
      this.facingRight = true;
    } else if (!isRight && this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', this.avatar[0]);
      this.facingRight = false;
    }
  }

  getWidth() {
    return $(`#${this.id}`).width();
  }

  getPosition() {
    return { x: this.position.left, y: this.position.top };
  }

  getAvatarRight() {
    return this.avatar[1];
  }

  getLink() {
    return this.link ? $(this.link).attr('href') : null;
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
