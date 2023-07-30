import { Chess } from "../../node_modules/chess.js/dist/chess.js";
import {uiHelpers} from "./ui-helpers.js";

console.error("CHECK: ", Chess);

class CTChess extends Chess {
  constructor() {
    super();
    this.history = [];
    this.currentMove = null;
  }

  move(move) {
    const result = super.move(move);
    this.addMoveToHistory(result);
    return result;
  }

  undo() {
    if (!this.currentMove) return false;

    super.undo();

    const parent = this.currentMove.parent;
    this.currentMove = parent ? parent : null;

    return true;
  }

  setCurrent(currRow, currCol) {
    // find the line with this row/column - and update the chess board to match - right?
    uiHelpers.printBoardToGridInConsole(this);
    console.error("CURRENT: ", currRow, currCol, this.currentMove);
  }

  addMoveToHistory(result) {
    if (result) {
      const newNode = { ...result };
      newNode.history = [];

      this.linkNewNodeToParent(newNode);

      this.currentMove = newNode;
    }
    console.error("CURRENT HISTORY: ", this.history);
  }

  linkNewNodeToParent(newNode) {
    if (this.currentMove) {
      newNode.parent = this.currentMove;
      this.currentMove.history.push(newNode);
    } else {
      this.history.push(newNode);
    }
  }

}
const ctchess = new CTChess();

export { ctchess };

export function move(m) {
  ctchess.move(m);
  uiHelpers.printBoardToConsole(ctchess);
  uiHelpers.printBoardToGridInConsole(ctchess);
  return ctchess.board();
}

export function getPiece(square) {
  return ctchess.get(square).type.toUpperCase();
}
