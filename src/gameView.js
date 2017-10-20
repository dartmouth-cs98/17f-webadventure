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
}

export default GameView;
