import * as CONSTANTS from "../constants.ts";

// Creates the number labels for the board rendering
export function createNumberLabel(row: number, col: number) {
    const isLight = (row + col) % 2 == 0
    const colourType = isLight ? 'coordinate-light' : 'coordinate-dark';
    return <text
        key={`number-${row}-${col}`}
        pointerEvents="none"
        className={`coordinate-text ${colourType}`}
        x={col * CONSTANTS.SQUARE_SIZE + 5}
        y={row * CONSTANTS.SQUARE_SIZE + 25}
    >
        {CONSTANTS.IS_WHITE ? CONSTANTS.NUM_ROW - row : row + 1}
    </text>;
}

// Creates file letter labels for the board rendering
export function createLetterLabel(row: number, col: number) {
    const isLight = (row + col) % 2 == 0
    const colourType = isLight ? 'coordinate-light' : 'coordinate-dark';
    return <text
        key={`letter-${row}-${col}`}
        pointerEvents="none"
        className={`coordinate-text ${colourType}`}
        x={col * CONSTANTS.SQUARE_SIZE + 75}
        y={row * CONSTANTS.SQUARE_SIZE + 95}
    >
        {CONSTANTS.IS_WHITE ? String.fromCharCode(97 + col) : String.fromCharCode(97 + CONSTANTS.NUM_COL - col - 1)}
    </text>;
}