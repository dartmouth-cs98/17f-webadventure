import $ from 'jquery';

class GameView {
  constructor() {
    this.createTree();
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

  getUp(sectionId, sentenceId, charId) {
    const selectedChar = $(this.pageTree[sectionId][sentenceId][charId]);
    const offsets = selectedChar.offset();
    const selectedMiddle = offsets.left + (selectedChar.width() / 2);
    for (let i = sectionId; i >= 0; i -= 1) {
      const section = this.pageTree[i];
      for (let j = i === sectionId ? sentenceId : section.length - 1; j >= 0; j -= 1) {
        const sentence = section[j];
        for (let k = j === sentenceId ? charId : sentence.length - 1; k >= 0; k -= 1) {
          const char = $(sentence[k]);
          const charOffsets = char.offset();
          if (charOffsets.top < offsets.top &&
            GameView.isBounded(char, charOffsets, selectedMiddle)) {
            return [i, j, k];
          }
        }
      }
    }
    return null;
  }

  getRight(sectionId, sentenceId, charId) {
    for (let i = sectionId; i < this.pageTree.length; i += 1) {
      const section = this.pageTree[i];
      for (let j = i === sectionId ? sentenceId : 0; j < section.length; j += 1) {
        const sentence = section[j];
        for (let k = j === sentenceId ? charId : 0; k < sentence.length; k += 1) {
          if (!(sectionId === i && sentenceId === j && charId === k)) {
            return [i, j, k];
          }
        }
      }
    }
    return null;
  }


  getDown(sectionId, sentenceId, charId) {
    const selectedChar = $(this.pageTree[sectionId][sentenceId][charId]);
    const offsets = selectedChar.offset();
    const selectedMiddle = offsets.left + (selectedChar.width() / 2);
    for (let i = sectionId; i < this.pageTree.length; i += 1) {
      const section = this.pageTree[i];
      for (let j = i === sectionId ? sentenceId : 0; j < section.length; j += 1) {
        const sentence = section[j];
        for (let k = j === sentenceId ? charId : 0; k < sentence.length; k += 1) {
          const char = $(sentence[k]);
          const charOffsets = char.offset();
          if (charOffsets.top > offsets.top
            && GameView.isBounded(char, charOffsets, selectedMiddle)) {
            return [i, j, k];
          }
        }
      }
    }
    return null;
  }

  getLeft(sectionId, sentenceId, charId) {
    for (let i = sectionId; i >= 0; i -= 1) {
      const section = this.pageTree[i];
      for (let j = i === sectionId ? sentenceId : section.length - 1; j >= 0; j -= 1) {
        const sentence = section[j];
        for (let k = j === sentenceId ? charId : sentence.length - 1; k >= 0; k -= 1) {
          if (!(sectionId === i && sentenceId === j && charId === k)) {
            return [i, j, k];
          }
        }
      }
    }
    return null;
  }

  static isBounded(char, charOffsets, selectedMiddle) {
    const rightEdge = charOffsets.left + char.width();
    return charOffsets.left <= selectedMiddle && rightEdge >= selectedMiddle;
  }
}

export default GameView;
