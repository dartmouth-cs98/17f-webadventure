import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Player from './player';


import App from './components/app';


// const UP = 0;
// const RIGHT = 1;
// const DOWN = 2;
// const LEFT = 3;

class WikiGame {
  constructor(curPlayer = new Player('curPlayer', { left: 100, top: 100 }, true)) {
    this.curPlayer = curPlayer;
    this.players = [];
    this.keysPressed = {
      x: {
        left: false,
        right: false,
      },
      y: {
        up: false,
        down: false,
      },
    };

    // this.asdfsf = {new info};

    this.renderGame = this.renderGame.bind(this);
    this.setupToc = this.setupToc.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.renderGame();

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "hello")
          sendResponse({farewell: "goodbye"});
    });

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.updateInterval = window.setInterval(this.updateGame, 10);
  }

  renderGame() {
    $('body').append('<div id=wa-main />');
    ReactDOM.render(<App/>, document.getElementById('wa-main'));
    this.setupToc();
    const curPosition = this.curPlayer.getPosition();
    this.curPlayer.insertPlayer(curPosition.x, curPosition.y);
  }

  setupToc() {
    const toc = $('#toc').detach();
    $(toc).attr('id', 'wa-toc');
    $('body').append(toc);
    $(toc).find('a').each((i, link) => {
      $(link).click(() => {
        const id = $(link).attr('href');
        const { left, top } = $(document.getElementById(id.substring(1))).offset();
        // Issue with jquery on id's with special characters; i.e. (, ), -
        this.curPlayer.movePlayer(left, top);
      });
    });
  }

  updateGame() {
    const newLoc = this.curPlayer.getPosition();
    if (this.keysPressed.x.left && !this.keysPressed.x.right) {
      newLoc.x -= 5;
      this.curPlayer.updateDirRight(false);
    } else if (!this.keysPressed.x.left && this.keysPressed.x.right) {
      newLoc.x += 5;
      this.curPlayer.updateDirRight(true);
    }
    if (this.keysPressed.y.up && !this.keysPressed.y.down) {
      newLoc.y -= 5;
    } else if (!this.keysPressed.y.up && this.keysPressed.y.down) {
      newLoc.y += 5;
    }
    this.curPlayer.movePlayer(newLoc.x, newLoc.y);

    // update locations of other players
    //
  }

  openLink() {
    const link = this.curPlayer.getLink();
    if (link !== null) {
      // window.open(`https://en.wikipedia.org${link}`, '_self');

      const redirectLink = `https://en.wikipedia.org${link}`;

      let leaderboard = {
        time: 1234,
        username:"2002 Toyota Corolla",
        url: redirectLink,
        players: [
          player1: [
            username: "player1",
            score: 1,
          ],
          player2: [
            username: "player2",
            score: 2,
          ]
        ]
      };

      chrome.runtime.sendMessage(leaderboard, (response) => {
        console.log(response);
      });
    }
  }

  onKeyDown(evt) {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = true; break;
      case 68: this.keysPressed.x.right = true; break;
      case 87: this.keysPressed.y.up = true; break;
      case 83: this.keysPressed.y.down = true; break;
      case 76: // click link with L
        this.openLink();
        break;
      case 80: // Pause game with 'P'
        console.log('pause game, pause pop up?');
        break;
      default:
        break;
    }
  }

  onKeyUp(evt) {
    switch (evt.keyCode) {
      case 65: this.keysPressed.x.left = false; break;
      case 68: this.keysPressed.x.right = false; break;
      case 87: this.keysPressed.y.up = false; break;
      case 83: this.keysPressed.y.down = false; break;
      case 80: // Pause game with 'P'
        console.log('pause game, pause pop up?');
        break;
      default:
        break;
    }
  }
}

export default WikiGame;
