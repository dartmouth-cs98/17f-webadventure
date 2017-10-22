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
    const offsets = $(this.pageTree[sectionId][sentenceId][charId]).offset();
    const section = this.pageTree[sectionId];
    for (let i = sentenceId; i >= 0; i -= 1) {
      const sentence = section[i];
      for (let j = i === sentenceId ? charId : sentence.length - 1; j >= 0; j -= 1) {
        const charOffsets = $(sentence[j]).offset();
        if (charOffsets.top < offsets.top && charOffsets.left <= offsets.left) {
          return [sectionId, i, j];
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
    const offsets = $(this.pageTree[sectionId][sentenceId][charId]).offset();
    const section = this.pageTree[sectionId];
    for (let i = sentenceId; i < section.length; i += 1) {
      const sentence = section[i];
      for (let j = i === sentenceId ? charId : 0; j < sentence.length; j += 1) {
        const charOffsets = $(sentence[j]).offset();
        if (charOffsets.top > offsets.top && charOffsets.left >= offsets.left) {
          return [sectionId, i, j];
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
}

export default GameView;
