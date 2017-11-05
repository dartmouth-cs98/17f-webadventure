/* questions.js class */

class Questions {
  constructor(gameModel, playerId) {
    this.gameModel = gameModel;
    this.playerId = playerId;
    this.location = gameModel.getPlayer(playerId).getLoc();
    this.trail = gameModel.getPlayer(playerId).getTrail();

    if (badTrail(gameModel, playerId)) {
      return false;
    }

    this.qas = generateQAS(gameModel, this.trail);
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

  static badTrail(gameModel, playerId) {
    return false;
  }

  /* generates a question, an answer, and a score */
  static generateQAS(gameModel, trail) {
    const words = [];
    let question = '';

    for (let i = 0; i < trail.length; i += 1) {
      words.append(gameModel.getWord(trail[i]));
    }

    // eventually should be replaced with questionSelect(words)
    const select = selectNoun();
    const answer = words[select];
    for (let i = 0; i < words.length; i += 1) {
      if (i === select) {
        question += '_' * answer.length;
      } else {
        question += words[i];
      }
    }
    // scoreQuestion(words)
    const score = 0;

    return [question, answer, score];
  }

  static selectNoun() {
    return 0;
  }
}

export default Questions;
