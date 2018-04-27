import $ from 'jquery';
// import nlp from 'compromise';

// jquert plugin selects random paragraph
$.fn.random = function () { // eslint-disable-line
  return this.eq(Math.floor(Math.random() * this.length));
};

/*
const selectNoun = (words) => {
}

// selects a noun from the words list to design question around
function selectNoun(words) {
  let composite = '';
  for (let i = 0; i < words.length; i += 1) {
    composite += words[i];
  }

  const parsed = nlp(composite);
  const options = parsed.nouns().out('array');
  const iChoose = options[Math.floor(Math.random() * options.length)];
  if (options.length > 1) {
    for (let i = 0, j = words.length; i < j; i++) {
      if (words[i] === iChoose) {
        return i;
      }
    }
  }

  // if a noun is not found, then a random word will be seleccted
  return Math.floor(Math.random() * words.length);
}

// assess the number of points that a player can score from a sentence
function points(words) {
  return words.length;
}

// generates a question, an answer, and a score from the candidates
function generateQAS(pageTree, candidates) {
  const words = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const sectionId = candidates[i][0];
    const sentenceId = candidates[i][1];
    for (let j = 0; j < pageTree[sectionId][sentenceId].length; j += 1) {
      const word = pageTree[sectionId][sentenceId][j];
      words.append(word);
    }
  }

  let question = '';
  const select = selectNoun();
  const answer = words[select];
  for (let i = 0; i < words.length; i += 1) {
    if (i === select) {
      let blank = '_' * (answer.length - 1);
      blank += ' ';
      question += blank;
    } else {
      const word = words[i];
      question += word;
    }
  }

  const score = points(words);
  return [question, answer, score];
}
*/

class QA {
  constructor() {
    this.question = $('p').random().text();
    this.new = (q) => {
      this.question = q;
    };
  }
}

export default QA;
