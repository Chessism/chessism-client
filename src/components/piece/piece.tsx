import {PIECE_IMAGES, type PieceSymbol} from "../../lib/pieceMap.ts";
import * as CONSTANTS from "../../constants.ts";

type Params = {
    row: number;
    col: number;
    piece: PieceSymbol;
    isDragging?: boolean;
    startDrag: (row: number, col: number, piece: PieceSymbol, clinetX: number, clientY: number) => void;
    onLeftClick?: (e: React.MouseEvent) => void;
    onRightClick: (e: React.MouseEvent) => void;
};

// Storing Piece renderer settings
function Piece({row, col, piece, isDragging = false, startDrag, onLeftClick, onRightClick}: Params) {
    const x = col * CONSTANTS.SQUARE_SIZE;
    const y = row * CONSTANTS.SQUARE_SIZE;

    const img = PIECE_IMAGES[piece];
    if (!img) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only allow left-click
        onLeftClick?.(e);
        e.preventDefault();
        startDrag(row, col, piece, e.clientX, e.clientY);
    }

    return (
        <image
            x={x + 10}
            y={y + 10}
            width={CONSTANTS.SQUARE_SIZE - 20}
            height={CONSTANTS.SQUARE_SIZE - 20}
            href={img}
            imageRendering="pixelated"
            pointerEvents="all"
            style={{cursor: 'grab', opacity: isDragging ? 0.3: 1}}
            onMouseDown={handleMouseDown}
            onContextMenu={onRightClick}
        />
    );
}

export default Piece;