import { useEffect } from 'react'; // Used to disable the right-click popup menu
import './Board.css'
// returns a button element for the grids
// ==================== CONSTANTS ==========================
const SQUARE_SIZE = 100; // In pixels
const NUM_ROW = 8;
const NUM_COL = 8;
const IS_WHITE = false; // If you're playing white (dummy variable, im just using this to test UI for black/white)

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
    for (let row = 0; row < NUM_ROW; row++) {
        for (let col = 0; col < NUM_COL; col++) {
            const isLight = (row + col) % 2 == 0  // Black: false(0), White: true(1)
            const squareID = `${row}-${col}`; // id of the current square
            let x = col * SQUARE_SIZE;
            let y = row * SQUARE_SIZE;
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
            if (col == 0) {
                squares.push(createNumberLabel(row, col));
            }
            if (row == NUM_ROW-1) {
                squares.push(createLetterLabel(row, col));
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