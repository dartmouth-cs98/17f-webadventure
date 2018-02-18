import nlp from 'compromise';

// subject to A/B testing
const minWords = 200
const minSen = 5
const maxSen = 16

/* determines whether a page is a good candidate for a powerup */
function summarizePage(pageTree) {
  let pageScore = 0;
  let candidates = [];
  for (let i = 0; i < pageTree[0]; i++) {
    for (let j = 0; i <pageTree[i]; j++) {
      pageScore += pageTree[i][j].length;
      if (minSen <= pageTree[i][j].length <= maxSen) {
        candidates.append([i, j]);
      }
    }
  }
  return {
    goodPage: pageScore > minWords,
    candidates: candidates
  }
}

/* selects a noun as a basis for a question */
function selectNoun(sentence) {
  const parsed = nlp(composite);
  const options = parsed.nouns().out('array');
  const iChoose = options.reduce(function (a, b) { return a.length > b.length ? a : b; });
  return iChoose;
}

/* eduPowerUp object */
class eduPowerUp {
  constructor(pageTree) {
    this.generateQA(pageTree);
  }

  generateQA(pageTree) {
    summary = summarizePage(pageTree);

    if (summary.goodPage) {
      const sel = Math.floor(Math.random() * summary.candidates.length)
      const [sectionId, sentenceId] = summary.candidates[sel];
      const sentence = pageTree[sectionId][sectionId].join(' ');
      const answer = selectNoun(sentence);
      const question = sentence.replace(answer, '_' * answer.length);

      return this.qa = {
        prompt: "Identify the missing word.",
        question: question,
        answer: answer
      }
    return this.qa = false;
    }
  }

  evalAnswer(answer) {
    if (this.qa) {
      return this.qa.answer.toLowerCase() == answer.toLowerCase();
    }
    return false;
  }
}

export default eduPowerUp;