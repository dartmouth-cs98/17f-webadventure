import $ from 'jquery';
// import Powerups from './powerups';

const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];

class Player {
  constructor(username, position = { left: 0, top: 0 }, isCurPlayer = false) {
    this.username = username;
    this.id = username.replace(' ', '');
    this.facingRight = true;
    this.position = position;
    this.size = { height: 40, width: 40 };
    this.isCurPlayer = isCurPlayer;
    this.avatar = NYAN_CATS;
    this.link = null;

    // this.powerups = new Powerups();

    this.insertPlayer = this.insertPlayer.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.updateDirRight = this.updateDirRight.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getAvatarRight = this.getAvatarRight.bind(this);
    this.getLink = this.getLink.bind(this);
    this.updateOnLink = this.updateOnLink.bind(this);
    // this.updateOnPowerup = this.updateOnPowerup.bind(this);
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
              <img class="player-img" src="${NYAN_CATS[1]}" alt="nyan cat"/>
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
      // console.log("got to movePlayer");
      // this.updateOnPowerup();
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

  // updateOnPowerup() {
  //   const leftEnd = this.position.left;
  //   const rightEnd = this.position.left + this.size.width;
  //   const topEnd = this.position.top;
  //   const bottomEnd = this.position.top + this.size.height;

  //   const overlap = this.powerups.powerups.filter((powerup) => {
  //     const xOverlap = (leftEnd > powerup.getPosition().left && leftEnd < powerup.getPosition().left + powerup.size.width) ||
  //       (rightEnd > powerup.position.left && rightEnd < powerup.position.left + powerup.size.width) ||
  //       (leftEnd < powerup.position.left && rightEnd > powerup.position.left + powerup.size.width);
  //     const yOverlap = (topEnd > powerup.position.top && topEnd < powerup.position.top + powerup.size.height) ||
  //       (bottomEnd > powerup.position.top && bottomEnd < powerup.position.top + powerup.size.height) ||
  //       (topEnd < powerup.position.top && bottomEnd > powerup.top + powerup.size.height);
  //     return xOverlap && yOverlap;
  //   });
  //   const hitPowerup = overlap.length !== 0 ? overlap[0] : null;
  //   if (hitPowerup) {
  //     // do something
  //     if (hitPowerup.type === "flipControls") {
  //       console.log("hit flipControls powerup!!");

  //     }
  //     // Remove from powerups array
  //     this.powerups.powerups = this.powerups.powerups.filter((powerup) => {
  //       return powerup !== hitPowerup;
  //     });

  //     const domPowerup = document.elementFromPoint(hitPowerup.position.left, hitPowerup.position.top);
  //     $(domPowerup).css('visibility', 'hidden');

  //     // $('#powerups').removeChild($(hitPowerup));
  //     // $(hitPowerup).parentNode.removeChild($(hitPowerup));
  //     // $(hitPowerup).css({'visibility': 'hidden'});
  //     // $(hitPowerup).css({'display': 'none'});
  //     // console.log($(hitPowerup));
  //   }
  // }

  // Detect collisions of avatar with links and powerups
  // detectCollision(collider) {
  //   const xOverlap = (leftEnd > collider.left && leftEnd < collider.left + collider.width) ||
  //       (rightEnd > collider.left && rightEnd < collider.left + collider.width) ||
  //       (leftEnd < collider.left && rightEnd > collider.left + collider.width);
  //   const yOverlap = (topEnd > collider.top && topEnd < collider.top + collider.width) ||
  //     (bottomEnd > collider.top && bottomEnd < collider.top + collider.width) ||
  //     (topEnd < collider.top && bottomEnd > collider.top + collider.width);
  //   return xOverlap && yOverlap;
  // }

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
