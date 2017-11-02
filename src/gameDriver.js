import GameView from './gameView';
import { GameData } from './gameData';

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const Q = 100;

class GameDriver {
  constructor() {
    this.nextMove = RIGHT;
    this.gameView = new GameView();
    this.curLocation = [0, 0, 0];
    this.moveInterval = null;
    this.gameData = new GameData();

    this.startGame = this.startGame.bind(this);
    this.stopMovement = this.stopMovement.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.moveSelection = this.moveSelection.bind(this);
  }

  startGame(username = 'random', playerColor = { r: 100, g: 100, b: 100 }) {
    this.gameView.highlightChar(this.curLocation[0], this.curLocation[1], this.curLocation[2]);
    this.moveInterval = setInterval(this.makeMove, 250);
    this.username = username;
    this.gameData.createUser(username);
    this.playerColor = playerColor;
    this.curScore = 0;
  }
  endGame() {
    this.stopMovement();
    this.gameView.endGame();
  }

  stopMovement() {
    clearInterval(this.moveInterval);
  }

  makeMove() {
    const loc = this.curLocation;
    const moves = this.gameView.getMoves(loc[0], loc[1], loc[2]);
    if(this.nextMove == Q){
      console.log("q detected!");
      this.stopMovement();
      this.gameView.showPopup();
      return;
    }
    if (moves[this.nextMove] && this.gameView.isEmptyLoc(moves[this.nextMove])) {
      const nextLoc = moves[this.nextMove];
      this.gameView.highlightChar(nextLoc[0], nextLoc[1], nextLoc[2]);
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

  moveSelection(evt) {
    // console.log("pressed is "+evt.keyCode);
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
        console.log("down 83 was pressed!");
        break;
      case 81:
        console.log("q was pressed!");
        this.nextMove = Q;
        break;
      case 82:
        console.log("resume");
        setInterval(this.makeMove, 250);
        this.nextMove = RIGHT;
        break;
      default:
        this.nextMove = this.nextMove;
    }
  }
}

export default GameDriver;
