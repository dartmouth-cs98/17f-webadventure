/* eslint no-alert: "off", no-undef: "off", class-methods-use-this: "off" */
import $ from 'jquery';

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

const PLAYER_DIV = id =>
  `<div id="${id}"
  style="
    position: absolute;
  "
>
  <img style="
  height: 50px;
  "
  src="http://emojis.slackmojis.com/emojis/images/1450458551/184/nyancat_big.gif?1450458551"
  alt="nyan cat"/>
</div>`;

const END_POPUP_DIV =
`<div id="webAdv-gameover" style="
    position: fixed;
    text-align: center;
    width: 200px;
    font-size: 36px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    background-color: white;
    left: 40vw;
    top: 50vh;
    box-shadow: 10px 10px 5px #888888;
">GAME OVER
</div>`;

const LEADERBOARD_DIV =
`<div id ="leaderboard" style="
    position: fixed;
    top: 0vh;
    left: 0vw;
    width: 175px;
    height: 400px;
    background-color: rgba(225, 225, 225, 1);
"><p style="
    text-align: center;
">Leaderboard
</p>
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
    $('body').append(LEADERBOARD_DIV);
    const gameOver = $('#webAdv-gameover');
    if (gameOver.length) { gameOver.remove(); }
    const username = prompt('Enter a username');

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
    callback(username, playerColor);
    // $('body').append(START_POPUP_DIV);
    // const onClick = () => {
    //   const inputs = $('#startPopup').children('input');
    //   const username = $(inputs[0]).val();
    //   const playerColor = {
    //     r: $(inputs[1]).val(),
    //     g: $(inputs[2]).val(),
    //     b: $(inputs[3]).val(),
    //   };
    //   $('#startPopup').remove();
    //   setTimeout(() => callback(username, playerColor), 100);
    // };
    // $('#startPopup').children('button').click(onClick);
  }

  static endGame(playerDivId) {
    $(`#${playerDivId}`).remove();
    $('body').append(END_POPUP_DIV);
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
      let playerDiv = $(`#${playerDivId}`);
      if (!playerDiv.length) {
        $('body').append(PLAYER_DIV(playerDivId));
        playerDiv = $(`#${playerDivId}`);
      }
      playerDiv.css('top', $(span).offset().top);
      playerDiv.css('left', $(span).offset().left);
    }
  }

  updateLeaderboard(players) {
    const sortedPlayers = players;
    sortedPlayers.sort((a, b) => b.curScore - a.curScore);
    for (let i = 1; i <= 10; i += 1) {
      if (players[i - 1] !== undefined) {
        document.getElementById(`top${i.toString()}`).innerHTML =
          `${players[i - 1].username}: ${players[i - 1].curScore.toString()}`;
      }
    }
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
}

export default GameView;
