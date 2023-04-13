import { Chess } from "../node_modules/chess.js/dist/chess.js";
const chess = new Chess();


export { chess }

export function move(m){
chess.move(m);
return chess.board();
}
export function getPiece(square){
    return chess.get(square).type.toUpperCase();
}