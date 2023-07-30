import { Chess } from "../node_modules/chess.js/dist/chess.js";
import { uiHelpers } from "../ej/js/ui-helpers.js";
const chess = new Chess();

export { chess };

export function move(m) {
  chess.move(m);
  uiHelpers.printBoardToConsole(chess);
  return chess.board();
}

export function getPiece(square) {
  return chess.get(square).type.toUpperCase();
}
