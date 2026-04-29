import {PIECE_IMAGES} from "../../lib/pieceMap";
import * as CONSTANTS from "../../constants.ts";

type Params = {
    row: number;
    col: number;
    piece: string;
};

// Storing Piece renderer settings
function Piece({row, col, piece}: Params) {
    const x = col * CONSTANTS.SQUARE_SIZE;
    const y = row * CONSTANTS.SQUARE_SIZE;

    const img = PIECE_IMAGES[piece];
    if (!img) return null;

    return (
        <image
            x={x + 10}
            y={y + 10}
            width={CONSTANTS.SQUARE_SIZE - 20}
            height={CONSTANTS.SQUARE_SIZE - 20}
            href={img}
            imageRendering="pixelated"
        />
    );
}

export default Piece;