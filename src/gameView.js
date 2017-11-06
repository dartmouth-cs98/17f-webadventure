import $ from 'jquery';

class GameView {
  constructor() {
    this.createTree();
  }

  showPopup() {
    console.log("in show popup");
    var overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    overlay.style.position = "absolute";
    overlay.style.background = "grey";
    overlay.style.top = "0";
    overlay.style.bottom = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.opacity = "0.5";
    document.body.appendChild(overlay);

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "divvy");

    // move to css eventually
    newDiv.style.position = "fixed";
    newDiv.style.height = "300px";
    newDiv.style.width = "500px";
    newDiv.style.top = "50%";
    newDiv.style.left = "50%";
    newDiv.style.backgroundColor = "white";
    newDiv.style.margin = "-150px 0 0 -250px";
    newDiv.style.borderRadius = "15px";
    newDiv.style.boxShadow = "10px 10px 5px #888888";

    document.body.appendChild(newDiv);
  }

  closePopup() {
    console.log("in close popup");
    var popup = document.getElementById("divvy");
    popup.parentNode.removeChild(popup);

    var overlay = document.getElementById("overlay");
    overlay.parentNode.removeChild(overlay);
  }

  createTree() {
    const textElement = $('#mw-content-text').children()[0];
    const sections = $(textElement).children('p').map((x, item) => {
      const sentenceToCharSpans = sentence => Array.from(sentence).map(char =>
        `<span>${char}</span>`);
      const sentences = $(item).text().match(/[^.!?]+[.!?]*/g) ? $(item).text().match(/[^.!?]+[.!?]*/g) : [];
      const charSpans = sentences.map(sentenceToCharSpans);
      $(item).html(charSpans.map(sentence => `<span>${sentence.join('')}</span>`).join(''));
      return [$(item).children().map((index, child) => $(child).children())];
    });
    this.pageTree = sections;
  }

  highlightChar(sectionId, sentenceId, charId, color = 'yellow') {
    $(this.pageTree[sectionId][sentenceId][charId]).css('background-color', color);
  }

  getMoves(sectionId, sentenceId, charId) {
    return [this.getUp(sectionId, sentenceId, charId),
      this.getRight(sectionId, sentenceId, charId),
      this.getDown(sectionId, sentenceId, charId),
      this.getLeft(sectionId, sentenceId, charId)];
  }

  parseBackward(startLoc, condition) {
    for (let i = startLoc.sectionId; i >= 0; i -= 1) {
      const section = this.pageTree[i];
      for (let j = i === startLoc.sectionId ? startLoc.sentenceId : section.length - 1;
        j >= 0; j -= 1) {
        const sentence = section[j];
        for (let k = j === startLoc.sentenceId ? startLoc.charId : sentence.length - 1;
          k >= 0; k -= 1) {
          const loc = { sectionId: i, sentenceId: j, charId: k };
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
        for (let k = j === startLoc.sentenceId ? startLoc.charId : 0; k < sentence.length; k += 1) {
          const loc = { sectionId: i, sentenceId: j, charId: k };
          if (condition(loc)) { return [i, j, k]; }
        }
      }
    }
    return null;
  }


  getUp(sectionId, sentenceId, charId) {
    const selectedChar = $(this.pageTree[sectionId][sentenceId][charId]);
    const offsets = selectedChar.offset();
    const selectedMiddle = offsets.left + (selectedChar.width() / 2);
    const startLoc = { sectionId, sentenceId, charId };
    const condition = (loc) => {
      const char = $(this.pageTree[loc.sectionId][loc.sentenceId][loc.charId]);
      const charOffsets = char.offset();
      return charOffsets.top < offsets.top &&
        GameView.isBounded(char, charOffsets, selectedMiddle);
    };
    return this.parseBackward(startLoc, condition);
  }

  getRight(sectionId, sentenceId, charId) {
    const startLoc = { sectionId, sentenceId, charId };
    const condition = loc =>
      !(sectionId === loc.sectionId && sentenceId === loc.sentenceId && charId === loc.charId);
    return this.parseForward(startLoc, condition);
  }

  getDown(sectionId, sentenceId, charId) {
    const selectedChar = $(this.pageTree[sectionId][sentenceId][charId]);
    const offsets = selectedChar.offset();
    const selectedMiddle = offsets.left + (selectedChar.width() / 2);
    const startLoc = { sectionId, sentenceId, charId };
    const condition = (loc) => {
      const char = $(this.pageTree[loc.sectionId][loc.sentenceId][loc.charId]);
      const charOffsets = char.offset();
      return charOffsets.top > offsets.top &&
        GameView.isBounded(char, charOffsets, selectedMiddle);
    };
    return this.parseForward(startLoc, condition);
  }

  getLeft(sectionId, sentenceId, charId) {
    const startLoc = { sectionId, sentenceId, charId };
    const condition = loc =>
      !(sectionId === loc.sectionId && sentenceId === loc.sentenceId && charId === loc.charId);
    return this.parseBackward(startLoc, condition);
  }

  endGame() {
    console.log(this.pageTree[0][0][0]);
    console.log('Game Over');
  }

  static isBounded(char, charOffsets, selectedMiddle) {
    const rightEdge = charOffsets.left + char.width();
    return charOffsets.left <= selectedMiddle && rightEdge >= selectedMiddle;
  }

  isEmptyLoc(loc) {
    const char = $(this.pageTree[loc[0]][loc[1]][loc[2]]);
    return (char.css('background-color') === 'rgba(0, 0, 0, 0)');
  }
}

export default GameView;
