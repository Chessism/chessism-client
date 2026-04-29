import  * as CONSTANTS from "../../constants.ts"

type Params = {
    row: number;
    col: number;
};

// Storing square rendering settings, including left and right click
function Square({row, col}: Params) {
    const isLight = (row + col) % 2 == 0;
    const x = col * CONSTANTS.SQUARE_SIZE;
    const y = row * CONSTANTS.SQUARE_SIZE;

    const handleLeftClick = () => {
        console.log(`Usr left-clicked ${row} ${col}`);
    };

    const handleRightClick = () => {
        console.log(`Usr right-clicked ${row} ${col}`);
    };

    return (
        <rect
            x={x}
            y={y}
            width={CONSTANTS.SQUARE_SIZE}
            height={CONSTANTS.SQUARE_SIZE}
            fill={isLight ? "#EBD7A4" : "#385E0B"}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        />
    );
}

export default Square;