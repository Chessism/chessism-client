import { useEffect } from 'react'; // Used to disable the right-click popup menu
import './Board.css'
// returns a button element for the grids
// Constants
const SQUARE_SIZE = 1000; // In pixels
const NUM_ROW = 8;
const NUM_COL = 8;

function BoardLeftClicked(row: number, col: number) {
    console.log(`Usr left-clicked ${row} ${col}`)
}
function BoardRightClicked(row: number, col: number) {
    console.log(`Usr right-clicked ${row} ${col}`)
}
function Board() {
    const squares = [];

    for (let row = 0; row < NUM_ROW; row++) {
        for (let col = 0; col < NUM_COL; col++) {
            const isLight = (row + col) % 2 === 0  // Black: false(0), White: true(1)
            const squareID = `${row}-${col}`; // id of the current square
            const x = col * SQUARE_SIZE;
            const y = row * SQUARE_SIZE;
            const color = (isLight) ? "#EBD7A4" : "#385E0B";

            // create square (rect element)
            const squareElement = <rect
                key={squareID}
                x={x}
                y={y}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill={color}
                onClick={() => BoardLeftClicked(row, col)}
                onContextMenu={() => BoardRightClicked(row, col)}
            />;

            // store it in squares[] array
            squares.push(squareElement);
        }
    }

    return (
        <svg 
            viewBox={`0 0 ${NUM_COL * SQUARE_SIZE} ${NUM_ROW * SQUARE_SIZE}`}
            onContextMenu={(e) => e.preventDefault()} // Disables the right-click popup menu when interacting with board
            >
            {squares}
        </svg>
    )
}

export default Board