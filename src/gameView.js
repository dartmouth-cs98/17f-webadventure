/* eslint no-alert: "off", no-undef: "off", class-methods-use-this: "off", */
/* eslint no-restricted-globals: "off" */
import $ from 'jquery';
import '../styles.css';

// const START_POPUP_DIV = `
// <div id="startPopup" style="
//     position: fixed;
//     left: 50vw;
//     top: 50vh;
//     background-color: white;
//     padding: 20px;
//     border: 1px solid lightgrey;
//     border-radius: 5px;
//     " >
//   <input name="username" placeholder="Username"/>
//   <input name="r" type="number" placeholder="Color R" />
//   <input name="g" type="number" placeholder="Color G" />
//   <input name="b" type="number" placeholder="Color B" />
//   <button>Start</button>
// </div>
// `;

// left-facing at index 0, right-facing at index 1
const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];

function PLAYER_DIV(id) {
  // initialize with right-facing avatar
  return `<div id="${id}" class="playerDiv" style="position: absolute">
            <span class="playerName">${id}</span>
            <img id="${id}-img" class="player-img" src="${NYAN_CATS[1]}"alt="nyan cat"/>
          </div>`;
}

const RULES_INSTRUCTIONS = `
To move the snake make sure the Wikipedia page in focus (click on it if it's not) and move using the keys 'W', 'A', 'S', 'D'.

The edges of the game are the top and bottom of any given section. Avoid going into an edge and the snake's trail.

Your score is determined by how many words you have captured.

To quit the game, enter ctrl+q.
`;

const END_POPUP_DIV = `
<div id="endPopUp">GAME OVER!
<div>---------</div>`;

const LEADERBOARD_DIV =
`<div id ="leaderboard">
  <div id="userStats">WEBADVENTURE
    <div id="userStatRow"></div>
  </div>

  <p id="currentPlayerView">Leaderboard</p>

  <div id="userStatRow"></div>
  <p id="top1"></p>
  <p id="top2"></p>
  <p id="top3"></p>
  <p id="top4"></p>
  <p id="top5"></p>
  <p id="top6"></p>
  <p id="top7"></p>
  <p id="top8"></p>
  <p id="top9"></p>
  <p id="top10"></p>
</div>`;

const blueJeans = {
  name: 'Blue Jeans',
  color: {
    r: 91,
    g: 192,
    b: 235,
  },
};
const gargoyleGas = {
  name: 'Gargoyle Gas',
  color: {
    r: 253,
    g: 231,
    b: 76,
  },
};
const androidGreen = {
  name: 'Android Green',
  color: {
    r: 155,
    g: 197,
    b: 61,
  },
};
const flame = {
  name: 'Flame',
  color: {
    r: 229,
    g: 89,
    b: 15,
  },
};
const princetonOrange = {
  name: 'Princeton Orange',
  color: {
    r: 240,
    g: 121,
    b: 33,
  },
};
const colors = [blueJeans, gargoyleGas, androidGreen, flame, princetonOrange];

class GameView {
  constructor() {
    this.createTree();
  }

  static startPopup(callback) {
    const gameOver = $('#webAdv-gameover');
    if (gameOver.length) { gameOver.remove(); }
    if (confirm(RULES_INSTRUCTIONS) === false) {
      return;
    }

    let username = null;
    while (!username) {
      username = prompt('Enter a username (using only alphanumeric characters)');
      if (!username.match(/^[0-9a-z]+$/)) {
        alert('Invalid username!');
        username = null;
      }
    }
    // const username = prompt('Enter a username');

    const colorPrompt = colors.map((color, index) => ` ${color.name} (${index + 1})`).join();
    let playerColor = null;
    while (!playerColor) {
      const response = parseInt(prompt(`Choose one of the colors by number (1-${colors.length}): \n${colorPrompt}`), 10);

      if (!response || response < 0 || response > colors.length) {
        alert('Invalid choice!');
      } else {
        playerColor = colors[response - 1].color;
      }
    }
    $('body').append(LEADERBOARD_DIV);
    this.updateUserDisplay(username, playerColor);
    callback(username, playerColor);
  }

  static buildEndPopup(players) {
    players.sort((a, b) => b.highScore - a.highScore);

    let newEndPopupDiv = END_POPUP_DIV;
    newEndPopupDiv += '<div>High Scores</div>';
    players.every((player, index) => {
      const playerText = `<div> ${player.username} : ${player.highScore}</div>`;
      newEndPopupDiv += playerText;
      if (index === 4) {
        return false;
      }
      return true;
    });
    const NEW_END_POPUP = newEndPopupDiv;
    return NEW_END_POPUP;
  }

  static endGame(playerDivId, players) {
    $(`#${playerDivId}`).remove();
    $('body').append(this.buildEndPopup(players));
  }

  createTree() {
    const textElement = $('#mw-content-text').children()[0];
    const sections = $(textElement).children('p').map((x, item) => {
      const sentenceToWordSpans = sentence => sentence.split(' ').map(word =>
        `<span>${word} </span>`);
      const sentences = $(item).text().match(/[^.!?]+[.!?]*/g) ? $(item).text().match(/[^.!?]+[.!?]*/g) : [];
      const wordSpans = sentences.map(sentenceToWordSpans);
      $(item).html(wordSpans.map(sentence => `<span>${sentence.join('')}</span>`).join(''));
      return [$(item).children().map((index, child) => $(child).children())];
    });
    this.pageTree = sections;
  }

  highlightWord(sectionId, sentenceId, wordId, color = 'yellow', scrollTo = false, playerDivId) {
    const span = this.pageTree[sectionId][sentenceId][wordId];
    $(span).css('background-color', color);
    if (scrollTo && !GameView.isScrolledIntoView(span)) {
      GameView.scrollIntoCenterView(span);
    }
    if (playerDivId) {
      this.username = playerDivId;
      let playerDiv = $(`#${playerDivId}`);
      if (!playerDiv.length) {
        $('body').append(PLAYER_DIV(playerDivId));
        playerDiv = $(`#${playerDivId}`);
      }
      playerDiv.css('top', $(span).offset().top);
      playerDiv.css('left', $(span).offset().left);
    }
  }

  updateLeaderboard(id, players) {
    players.sort((a, b) => b.curScore - a.curScore);
    for (let i = 1; i <= 10; i += 1) {
      if (players[i - 1] !== undefined) {
        document.getElementById(`top${i.toString()}`).innerHTML =
          `${i}. ${players[i - 1].username}: ${players[i - 1].curScore.toString()}`;
      }
    }
  }

  updateUserScoreDisplay(id, score) {
    document.getElementById('userStatRow').innerHTML =
          `${id}: ${score.toString()}`;
  }

  // called once to initialize color of user in leaderboard display
  static updateUserDisplay(id, color) {
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
    const userStatRow = document.getElementById('userStatRow');
    userStatRow.innerHTML = `${id}: 0`;
    userStatRow.style.backgroundColor = `${colorString}`;
    const userIcon = document.createElement('div');
    userIcon.setAttribute('id', 'userIcon');

    userIcon.innerHTML = `<img id="wahoo"style="position: absolute; height: 30px; width: 30px;
                                                top: 0; right: 0px; margin-top: 48px;"
                                  src="${NYAN_CATS[1]}"alt="userIcon"/>`;

    document.getElementById('leaderboard').appendChild(userIcon);
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
    }, 700);
  }

  static updateAvatar(id, direction) {
    document.getElementById(`${id}-img`).src = NYAN_CATS[direction];
  }

  getMoves(sectionId, sentenceId, wordId) {
    return [this.getUp(sectionId, sentenceId, wordId),
      this.getRight(sectionId, sentenceId, wordId),
      this.getDown(sectionId, sentenceId, wordId),
      this.getLeft(sectionId, sentenceId, wordId)];
  }

  parseBackward(startLoc, condition) {
    for (let i = startLoc.sectionId; i >= 0; i -= 1) {
      const section = this.pageTree[i];
      for (let j = i === startLoc.sectionId ? startLoc.sentenceId : section.length - 1;
        j >= 0; j -= 1) {
        const sentence = section[j];
        for (let k = j === startLoc.sentenceId ? startLoc.wordId : sentence.length - 1;
          k >= 0; k -= 1) {
          const loc = { sectionId: i, sentenceId: j, wordId: k };
          if (condition(loc)) { return [i, j, k]; }
        }
      }
    }
    return null;
  }

  parseForward(startLoc, condition) {
    for (let i = startLoc.sectionId; i < this.pageTree.length; i += 1) {
      const section = this.pageTree[i];
      for (let j = i === startLoc.sectionId ? startLoc.sentenceId : 0; j < section.length; j += 1) {
        const sentence = section[j];
        for (let k = j === startLoc.sentenceId ? startLoc.wordId : 0; k < sentence.length; k += 1) {
          const loc = { sectionId: i, sentenceId: j, wordId: k };
          if (condition(loc)) { return [i, j, k]; }
        }
      }
    }
    return null;
  }

  getUp(sectionId, sentenceId, wordId) {
    const selectedWord = $(this.pageTree[sectionId][sentenceId][wordId]);
    const offsets = selectedWord.offset();
    const selectedMiddle = offsets.left + (selectedWord.width() / 2);
    const startLoc = { sectionId, sentenceId, wordId };
    const condition = (loc) => {
      const word = $(this.pageTree[loc.sectionId][loc.sentenceId][loc.wordId]);
      const wordOffsets = word.offset();
      return wordOffsets.top < offsets.top &&
        GameView.isBounded(word, wordOffsets, selectedMiddle);
    };
    return this.parseBackward(startLoc, condition);
  }

  getRight(sectionId, sentenceId, wordId) {
    const startLoc = { sectionId, sentenceId, wordId };
    const condition = loc =>
      !(sectionId === loc.sectionId && sentenceId === loc.sentenceId && wordId === loc.wordId);
    return this.parseForward(startLoc, condition);
  }

  getDown(sectionId, sentenceId, wordId) {
    const selectedWord = $(this.pageTree[sectionId][sentenceId][wordId]);
    const offsets = selectedWord.offset();
    const selectedMiddle = offsets.left + (selectedWord.width() / 2);
    const startLoc = { sectionId, sentenceId, wordId };
    const condition = (loc) => {
      const word = $(this.pageTree[loc.sectionId][loc.sentenceId][loc.wordId]);
      const wordOffsets = word.offset();
      return wordOffsets.top > offsets.top &&
        GameView.isBounded(word, wordOffsets, selectedMiddle);
    };
    return this.parseForward(startLoc, condition);
  }

  getLeft(sectionId, sentenceId, wordId) {
    const startLoc = { sectionId, sentenceId, wordId };
    const condition = loc =>
      !(sectionId === loc.sectionId && sentenceId === loc.sentenceId && wordId === loc.wordId);
    return this.parseBackward(startLoc, condition);
  }

  static isBounded(word, wordOffsets, selectedMiddle) {
    const rightEdge = wordOffsets.left + word.width();
    return wordOffsets.left <= selectedMiddle && rightEdge >= selectedMiddle;
  }

  isEmptyLoc(loc) {
    const word = $(this.pageTree[loc[0]][loc[1]][loc[2]]);
    return (word.css('background-color') === 'rgba(0, 0, 0, 0)');
  }

  randomLoc() {
    let randSect = Math.floor(Math.random() * this.pageTree.length);
    let count = 0;
    while (this.pageTree[randSect].length < 1 && count < 100) {
      randSect = Math.floor(Math.random() * this.pageTree.length);
      count += 1;
    }
    let randSentence = Math.floor(Math.random() * this.pageTree[randSect].length);
    count = 0;
    while (this.pageTree[randSect][randSentence].length < 1 && count < 100) {
      randSentence = Math.floor(Math.random() * this.pageTree[randSect].length);
      count += 1;
    }
    let randWord = Math.floor(Math.random() * this.pageTree[randSect][randSentence].length);
    count = 0;
    while (this.isEmptyLoc([randSect, randSentence, randWord]) && count < 100) {
      randWord = Math.floor(Math.random() * this.pageTree[randSect][randSentence].length);
      count += 1;
    }
    return [randSect, randSentence, randWord];
  }

  showPopup() {
    console.log('in show popup');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    document.body.appendChild(overlay);

    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'pauseModal');

    const pauseSpan = '<span style="font-family:impact; font-size:50px;text-align:center;">GAME PAUSED</span>';
    newDiv.innerHTML = pauseSpan;

    document.body.appendChild(newDiv);
  }

  closePopup() {
    console.log('in close popup');
    const popup = document.getElementById('pauseModal');
    popup.parentNode.removeChild(popup);

    const overlay = document.getElementById('overlay');
    overlay.parentNode.removeChild(overlay);
  }
}

export default GameView;
