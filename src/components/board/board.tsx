import {useMemo} from "react";
import {type BitboardData, BitboardsToBoard} from "../../utils/boardState.ts";
import {createLetterLabel, createNumberLabel} from "../../utils/boardRender.tsx";
import Square from "./square";
import Piece from "./piece";
import * as CONSTANTS from "../../constants.ts";
import './board.css'


// ==================== Temporary Bitboards (for testing) ==========================
const DUMMY_BITBOARDS: BitboardData = {
    whitePawns:   0x000000000000FF00n,
    whiteKnights: 0x0000000000000042n,
    whiteBishops: 0x0000000000000024n,
    whiteRooks:   0x0000000000000081n,
    whiteQueens:  0x0000000000000008n,
    whiteKing:    0x0000000000000010n,
    blackPawns:   0x00FF000000000000n,
    blackKnights: 0x4200000000000000n,
    blackBishops: 0x2400000000000000n,
    blackRooks:   0x8100000000000000n,
    blackQueens:  0x0800000000000000n,
    blackKing:    0x1000000000000000n,
};

// ======================= MAIN ============================
function Board() {
    const board = useMemo(() => BitboardsToBoard(DUMMY_BITBOARDS, CONSTANTS.IS_WHITE), []);
    const elements = [];

    for (let row = 0; row < CONSTANTS.NUM_ROW; row++) {
        for (let col = 0; col < CONSTANTS.NUM_COL; col++) {
            const index = row * CONSTANTS.NUM_ROW + col;
            const piece = board[index];

            // Create Square Rendering
            elements.push(
                // key: element identifier for rendering
                <Square key={`sq-${row}-${col}`} row={row} col={col} />
            );
            
            // CREATE TEXT COORDINATES LABEL (1-8, a-h) ===================
            if (col == 0) elements.push(createNumberLabel(row, col));
            if (row == CONSTANTS.NUM_ROW-1) elements.push(createLetterLabel(row, col));

            // Piece Rendering
            if (piece) {
                elements.push(
                    <Piece key={`piece-${row}-${col}`} row={row} col={col} piece={piece}/>
                );
            }
        }
    }

    // RETURN THE BOARD 
    return (
        <svg 
            viewBox={`0 0 ${CONSTANTS.NUM_COL * CONSTANTS.SQUARE_SIZE} ${CONSTANTS.NUM_ROW * CONSTANTS.SQUARE_SIZE}`}
            onContextMenu={(e) => e.preventDefault()} // Disables the right-click popup menu when interacting with board
            >
            {/*Chessboard grids*/}
            {elements}
            {/*Chessboard grid highlight overlay*/}
        </svg>
    )
}

export default Board