import { useMemo } from "react";
import { PIECE_IMAGES} from "../../lib/pieceMap";
import  {type BitboardData, BitboardsToBoard } from "../../utils/board-state";
import './Board.css'

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


// returns a button element for the grids
// ==================== CONSTANTS ==========================
const SQUARE_SIZE = 100; // In pixels
const NUM_ROW = 8;
const NUM_COL = 8;
const IS_WHITE = true; // If you're playing white (dummy variable, im just using this to test UI for black/white)

// =============== HELPER FUNCTIONS ==================== 
function createNumberLabel(row: number, col: number) {
    const isLight = (row + col) % 2 == 0
    const colourType = isLight ? 'coordinate-light' : 'coordinate-dark';
    const textElement = <text
        key={`number-${row}-${col}`}
        pointerEvents="none"
        className={`coordinate-text ${colourType}`}
        x={col * SQUARE_SIZE + 5}
        y={row * SQUARE_SIZE + 25}
    >
        {IS_WHITE ? NUM_ROW - row : row + 1}
    </text>;
    return textElement;
}

function createLetterLabel(row: number, col: number) {
    const isLight = (row + col) % 2 == 0
    const colourType = isLight ? 'coordinate-light' : 'coordinate-dark';
    const textElement = <text
        key={`letter-${row}-${col}`}
        pointerEvents="none"
        className={`coordinate-text ${colourType}`}
        x={col * SQUARE_SIZE + 75}
        y={row * SQUARE_SIZE + 95}
    >
        {IS_WHITE ? String.fromCharCode(97 + col) : String.fromCharCode(97 + NUM_COL - col - 1)}
    </text>;
    return textElement;
}

// ================= INTERACTIONS ========================
function BoardLeftClicked(row: number, col: number) {
    console.log(`Usr left-clicked ${row} ${col}`)
}
function BoardRightClicked(row: number, col: number) {
    console.log(`Usr right-clicked ${row} ${col}`)
}

// ======================= MAIN ============================
function Board() {
    const squares = [];
    const board = useMemo(() => BitboardsToBoard(DUMMY_BITBOARDS, IS_WHITE), []);
    for (let row = 0; row < NUM_ROW; row++) {
        for (let col = 0; col < NUM_COL; col++) {
            const isLight = (row + col) % 2 == 0  // Black: false(0), White: true(1)
            const squareID = `${row}-${col}`; // id of the current square
            const x = col * SQUARE_SIZE;
            const y = row * SQUARE_SIZE;
            const color = (isLight) ? "#EBD7A4" : "#385E0B";

            // CREATE BOARD SQUARES ============================= 
            const squareElement = <rect
                key={squareID}
                x={x}
                y={y}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill={color}
                onClick={() => BoardLeftClicked(row, col)} // On left-click
                onContextMenu={() => BoardRightClicked(row, col)} // On right-click
            />;
            
            // store it in squares[] array
            squares.push(squareElement);
            
            // CREATE TEXT COORDINATES LABEL (1-8, a-h) ===================
            if (col == 0) squares.push(createNumberLabel(row, col));
            if (row == NUM_ROW-1) squares.push(createLetterLabel(row, col));

            // CREATE PIECE IMAGE ==============================
            const piece = board[row * 8 + col];
            if (piece && PIECE_IMAGES[piece]) {
                squares.push(
                    <image
                        key={`piece-${row}-${col}`}
                        x={x + 10}
                        y={y + 10}
                        width={SQUARE_SIZE - 20}
                        height={SQUARE_SIZE - 20}
                        href={PIECE_IMAGES[piece]}
                        imageRendering="pixelated"
                    />
                );
            }
        }
    }

    // RETURN THE BOARD 
    return (
        <svg 
            viewBox={`0 0 ${NUM_COL * SQUARE_SIZE} ${NUM_ROW * SQUARE_SIZE}`}
            onContextMenu={(e) => e.preventDefault()} // Disables the right-click popup menu when interacting with board
            >
            {/*Chessboard grids*/}
            {squares}
            {/*Chessboard grid highlight overlay*/}
        </svg>
    )
}

export default Board