/* questions.js, npm install compromise required */
const nlp = require('compromise');

/* chooses the candidate sentences from which questions are generated */
function chooseCandidates(pageTree, trail) {
  const dict = {};
  for (let i = 0; i < trail.length; i += 1) {
    const sectionId = trail[i][0];
    const sentenceId = trail[i][1];
    const key = [sectionId, sentenceId];
    if (key in dict.keys) {
      dict[key] += 1;
    } else {
      dict[key] = 1;
    }
  }

  const candidateSentences = [];
  for (let j = 0; j < dict.keys.length; j += 1) {
    const key = dict.keys[j];
    const sectionId = key[0];
    const sentenceId = key[1];
    if (pageTree[sectionId][sentenceId].length === dict[key]) {
      candidateSentences.append(key);
    }
  }

  return candidateSentences;
}

/* selects a noun from the words list to design question around */
function selectNoun(words) {
  let composite = '';
  for (let i = 0; i < words.length; i += 1) {
    composite += words[i];
  }

  const parsed = nlp(composite);
  const options = parsed.nouns().out('array');
  const iChoose = options[Math.floor(Math.random() * options.length)];
  if (options.length > 1) {
    for (let j = 0; j < words.length; j += 1) {
      if (words[j] === iChoose) {
        return j;
      }
    }
  }

  // if a noun is not found, then a random word will be seleccted
  return Math.floor(Math.random() * words.length);
}

/* assess the number of points that a player can score from a sentence */
function points(words) {
  return words.length;
}

/* generates a question, an answer, and a score from the candidates */
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

class Question {
  constructor(pageTree, playerId) {
    this.pageTree = pageTree;
    this.playerId = playerId;
    this.location = pageTree.getPlayer(playerId).getLoc();
    this.trail = pageTree.getPlayer(playerId).getTrail();

    // determine which sentences are elgible for questioning
    this.candidates = chooseCandidates(pageTree, this.trail);
    if (this.candidates.length < 1) {
      return false;
    }

    this.qas = generateQAS(pageTree, this.candidates);
  }

  qas() {
    return this.qas;
  }

  question() {
    return this.qas[0];
  }

  answer() {
    return this.qas[1];
  }

  score() {
    return this.qas[2];
  }
}

export default Question;
