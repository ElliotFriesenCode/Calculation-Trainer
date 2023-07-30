export class uiHelpers {    
  static printBoardToConsole(ctc) {
    ctc.history.forEach((move) => {
      uiHelpers.printMoveToConsole(move, 0);
    });
  }

  static printBoardToGridInConsole(ctc) {
    console.error("PRINTING BOARD TO GRID IN CONSOLE");
    ctc.history.forEach((move) => {
      const line = ` -> ${move.san}`; // ${move.from}
      uiHelpers.printLineToGridInConsole(line, move, []);
    });
  }

  static renderBoard(ctc, chessboardTable) {
    const board = ctc.board();
    chessboardTable.innerHTML = '';

    uiHelpers.printBoardToConsole(ctc);
    uiHelpers.printBoardToGridInConsole(ctc);

    for (let row = 0; row < 8; row++) {
        const tableRow = document.createElement('tr');
        for (let col = 0; col < 8; col++) {
            const tableCell = document.createElement('td');
            tableCell.id = `${String.fromCharCode(97 + col)}${8 - row}`;
            tableCell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');

            const piece = board[row][col];
            if (piece) {
                tableCell.textContent = piece.type.toUpperCase();
                tableCell.draggable = true;
                tableCell.ondragstart = (event) => {
                    const draggedPiece = event.target;
                    event.dataTransfer.setData('text/plain', tableCell.id);
                    console.error('START DRAGGING: ', draggedPiece.textContent, draggedPiece.id);
                };

                if (piece.color === 'b') {
                    tableCell.style.color = 'black';
                } else {
                    tableCell.style.color = 'white';
                }
            }

            tableRow.appendChild(tableCell);
        }
        chessboardTable.appendChild(tableRow);
    }
  }

  static printMoveToConsole(move, depth) {
    uiHelpers.printMoveAtDepth(move, depth);
    if (move.history) {
      move.history.forEach((subMove) => {
        uiHelpers.printMoveToConsole(subMove, depth + 1);
      });
    }
  }

  static printMoveAtDepth(move, depth) {
    console.error(`${"   ".repeat(depth)}|-${move.from} -> ${move.to}`);
  }


  static printLineToGridInConsole(line, move, sharedHistory) {
    const currentLine = [...sharedHistory, line];
    if (move.history && move.history.length > 0) {
      move.history.forEach((subMove) => {
        uiHelpers.printLineToGridInConsole(`-> ${subMove.san}`, subMove, currentLine); // ${subMove.from} 
      });
    } else {
      console.error(currentLine.join(" -> "));
    }
  }
}
