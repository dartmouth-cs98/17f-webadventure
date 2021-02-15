import $ from 'jquery';

const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];

class Player {
  constructor(
    username, avatar = NYAN_CATS,
    position = { left: 100, top: 100 }, isCurPlayer = true, // TODO: build feature to ensure random start point on pages
  ) {
    this.username = username;
    this.id = username.replace(' ', '');
    this.facingRight = true;
    this.position = position;
    this.size = { height: 40, width: 40 };
    this.isCurPlayer = isCurPlayer;
    this.avatar = avatar;
    this.link = null;
    this.windowSize = { height: 0, width: 0 };
  }

  // updates window size.
  updateWindowSize = () => {
    const width = window.innerWidth;
    const height = window.inner;
    this.windowSize = { height, width };
  }

  addToLinksList = (link, checkLine = true) => {
    const { top, left } = $(link).offset();
    const width = $(link).width();
    const height = $(link).height();
    const vertSection = Math.floor((top + height) / 100);
    const linksList = this.links[vertSection] ? this.links[vertSection] : [];
    const url = $(link).attr('href');
    if (!url.includes('/wiki/') || url.includes(':') || url === '/wiki/Main_Page') {
      const text = $(link).text();
      $(link).replaceWith(text);
      return;
    }
    if (checkLine) {
      const lineHeightWord = $(link).css('line-height');
      const lineHeight = parseInt(lineHeightWord.substring(0, lineHeightWord.length - 2), 10);
      if (lineHeight < height) {
        const href = $(link).attr('href');
        const newTags = $(link).text().split(' ').map(word => `<a href=${href}>${word}</a>`)
          .join(' ');
        const newTagsElement = $(newTags);
        $(link).replaceWith(newTagsElement);
        newTagsElement.filter('a').each((index, newLink) => {
          this.addToLinksList(newLink, false);
        });
        return;
      }
    }
    linksList.push({
      top, left, width, height, link,
    });
    this.links[vertSection] = linksList;
  }

  getLinks = () => {
    this.links = [];
    const links = $('a');
    links.each((i, link) => {
      if (!$(link).attr('href') || $(link).attr('href').charAt(0) === '#') {
        return;
      }
      this.addToLinksList(link);
    });
  }

  insertPlayer = (x, y) => {
    this.getLinks();
    $('body').append(`<div id="${this.id}" class="playerDiv" style="position: absolute">
              <span class="playerName">${this.id}</span>
              <img class="player-img" src="${this.avatar[1]}" alt="nyan cat"/>
            </div>`);
    this.movePlayer(x, y);
  }

  removePlayer = () => {
    $(`#${this.id}`).remove();
  }

  movePlayer = (left, top, speed = 1) => {
    if (left < 0 || top < 0) { return; }
    this.position = { left, top };
    $(`#${this.id}`).css(this.position);

    if (this.isCurPlayer) {
      if (!Player.isScrolledIntoView(`#${this.id}`)) {
        Player.scrollIntoCenterView(`#${this.id}`, speed);
      }
      this.updateOnLink();
    }
  }

  updateOnLink = () => {
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
      const yOverlap = (topEnd > linkItem.top && topEnd < linkItem.top + linkItem.height) ||
        (bottomEnd > linkItem.top && bottomEnd < linkItem.top + linkItem.height) ||
        (topEnd < linkItem.top && bottomEnd > linkItem.top + linkItem.height);
      return xOverlap && yOverlap;
    });
    let link;
    if (overlap.length === 1) {
      link = overlap[0].link; // eslint-disable-line
    } else if (overlap.length > 1) {
      const center = { y: (topEnd + bottomEnd) / 2, x: (leftEnd + rightEnd) / 2 };
      const centerOverlap = overlap.filter((linkItem) => {
        return linkItem.left < center.x && linkItem.left + linkItem.width > center.x
        && linkItem.top < center.y && linkItem.top + linkItem.height > center.y;
      });
      link = centerOverlap.length === 0 ? overlap[0].link : centerOverlap[0].link;
    } else {
      link = null;
    }

    if (link) {
      $(link).css('color', 'pink');
      $('#wa-nextPage').text(link);
    }
    if (this.link && this.link !== link) {
      $(this.link).css('color', '#0645ad');
      $('#wa-nextPage').text('');
    }
    this.link = link;
  }

  updateDirRight = (isRight) => {
    if (isRight && !this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', this.avatar[1]);
      this.facingRight = true;
    } else if (!isRight && this.facingRight) {
      $($(`#${this.id}`).children('img')[0]).attr('src', this.avatar[0]);
      this.facingRight = false;
    }
  }


  updateRevPowerup = (isReversed = false) => {
    if (isReversed) {
      if ($(`#${this.id}`).children('.reversed').length === 0) {
        $(`#${this.id}`).append('<div class="reversed">REVERSED</div>');
      }
    } else {
      $($(`#${this.id}`).children('.reversed')[0]).remove();
    }
  }

  getWidth = () => {
    return $(`#${this.id}`).width();
  }

  getPosition = () => {
    return { x: this.position.left, y: this.position.top };
  }

  getAvatarRight = () => {
    return this.avatar[1];
  }

  getLink = () => {
    return this.link ? $(this.link).attr('href') : null;
  }

  static isScrolledIntoView = (elem) => {
    const $elem = $(elem);
    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    const elemTop = $elem.offset().top;
    const elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  static scrollIntoCenterView = (elem, speed) => {
    const top = $(elem).offset().top - ($(window).height() / 2);
    $('html, body').animate({
      scrollTop: top,
    }, 100 / speed);
  }
}

export default Player;
