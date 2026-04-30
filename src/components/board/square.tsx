import  * as CONSTANTS from "../../constants.ts"

type Params = {
    row: number;
    col: number;
    onLeftClick: (e: React.MouseEvent) => void;
    onRightClick: (e: React.MouseEvent) => void;
};

// Storing square rendering settings, including left and right click
function Square({row, col, onLeftClick, onRightClick}: Params) {
    const isLight = (row + col) % 2 == 0;
    const x = col * CONSTANTS.SQUARE_SIZE;
    const y = row * CONSTANTS.SQUARE_SIZE;

    return (
        <rect
            x={x}
            y={y}
            width={CONSTANTS.SQUARE_SIZE}
            height={CONSTANTS.SQUARE_SIZE}
            fill={isLight ? "#EBD7A4" : "#385E0B"}
            onClick={onLeftClick}
            onContextMenu={onRightClick}
        />
    );
}

export default Square;