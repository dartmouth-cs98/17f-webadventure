/* eslint no-alert: "off", no-undef: "off" */
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


const END_POPUP_DIV =
`<div style="
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

class GameView {
  constructor() {
    this.createTree();
  }

  static startPopup(callback) {
    const username = prompt('Enter a username');
    const r = prompt('Enter R color value');
    const g = prompt('Enter G color value');
    const b = prompt('Enter B color value');
    const playerColor = { r, g, b };
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

  static endGamePopup() {
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

  highlightWord(sectionId, sentenceId, wordId, color = 'yellow') {
    $(this.pageTree[sectionId][sentenceId][wordId]).css('background-color', color);
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

  randStart() {
    let randSect = Math.floor(Math.random() * this.pageTree.length);
    while (this.pageTree[randSect].length < 1) {
      randSect = Math.floor(Math.random() * this.pageTree.length);
    }
    let randSentence = Math.floor(Math.random() * this.pageTree[randSect].length);
    while (this.pageTree[randSect][randSentence].length < 1) {
      randSentence = Math.floor(Math.random() * this.pageTree[randSect].length);
    }

    const randWord = Math.floor(Math.random() * this.pageTree[randSect][randSentence].length);
    return [randSect, randSentence, randWord];
  }
}

export default GameView;
