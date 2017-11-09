import GameView from './gameView';
import GameData from './gameData';

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

class GameDriver {
  constructor(gameView = new GameView()) {
    this.nextMove = RIGHT;
    this.moveInterval = null;
    this.gameData = new GameData();
    this.gameView = gameView;

    this.startGame = this.startGame.bind(this);
    this.stopMovement = this.stopMovement.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.moveSelection = this.moveSelection.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
  }

  startGame(username = 'random', playerColor = { r: 100, g: 100, b: 100 }) {
    this.username = username;
    this.gameData.createUser(username, playerColor);
    this.playerColor = playerColor;
    this.curLocation = this.gameView.randomLoc();
    this.gameData.onPlayers(this.getPlayers);
    const colorString = `rgb(${playerColor.r}, ${playerColor.g}, ${playerColor.b})`;
    this.gameView
      .highlightWord(
        this.curLocation[0], this.curLocation[1], this.curLocation[2],
        colorString, true,
      );
    this.curScore = 0;
    this.moveInterval = setInterval(this.makeMove, 250);

  }
  endGame() {
    this.stopMovement();
    this.gameData.removeUserFromGame(this.username);
    GameView.endGame(this.username.replace(/\s/, ''));
  }

  stopMovement() {
    clearInterval(this.moveInterval);
  }

  makeMove() {
    const loc = this.curLocation;
    let move = null;
    switch (this.nextMove) {
      case UP:
        move = this.gameView.getUp(loc[0], loc[1], loc[2]);
        break;
      case RIGHT:
        move = this.gameView.getRight(loc[0], loc[1], loc[2]);
        break;
      case DOWN:
        move = this.gameView.getDown(loc[0], loc[1], loc[2]);
        break;
      case LEFT:
        move = this.gameView.getLeft(loc[0], loc[1], loc[2]);
        break;
      default: break;
    }
    if (move && this.gameView.isEmptyLoc(move)) {
      const nextLoc = move;
      const colorString = `rgb(${this.playerColor.r}, ${this.playerColor.g}, ${this.playerColor.b})`;
      this.gameView.highlightWord(
        nextLoc[0], nextLoc[1], nextLoc[2],
        colorString, true, this.username.replace(/\s/, ''),
      );
      this.curLocation = nextLoc;
      const updateLoc = {
        url: 'www.wikipedia.com',
        sectionID: nextLoc[0],
        sentenceID: nextLoc[1],
        character: nextLoc[2],
      };
      this.curScore = this.curScore + 1;
      this.gameData.updateUser(this.username, this.curScore, this.playerColor, updateLoc);
    } else {
      this.endGame();
    }
  }

  getPlayers(players) {
    this.gameView.updateLeaderboard(players);
    players.forEach((player) => {
      if (player.curLocation) {
        const loc = [player.curLocation.sectionID,
          player.curLocation.sentenceID, player.curLocation.character];
        const colorString = `rgb(${player.playerColor.r}, ${player.playerColor.g}, ${player.playerColor.b})`;
        this.gameView.highlightWord(loc[0], loc[1], loc[2], colorString);
      }
    });
    // Danger zone
    // Don't add code here
  }

  moveSelection(evt) {
    switch (evt.keyCode) {
      case 65:
        this.nextMove = LEFT;
        break;
      case 68:
        this.nextMove = RIGHT;
        break;
      case 87:
        this.nextMove = UP;
        break;
      case 83:
        this.nextMove = DOWN;
        break;
      default:
        this.nextMove = this.nextMove;
    }
  }
}

export default GameDriver;
