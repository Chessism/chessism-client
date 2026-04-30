import * as CONSTANTS from '../../constants.ts';
import {type Square} from "../../components/piece/dragTypes.ts";

export function clientToSVG(clientX: number, clientY: number, rect: DOMRect) {
    const scaleX = (CONSTANTS.NUM_COL * CONSTANTS.SQUARE_SIZE) / rect.width;
    const scaleY = (CONSTANTS.NUM_ROW * CONSTANTS.SQUARE_SIZE) / rect.height;

    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
    }
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
}

export function coordsToSquare(x: number, y: number): Square {
    return {
        col: clamp(Math.floor(x / CONSTANTS.SQUARE_SIZE), 0, CONSTANTS.NUM_COL - 1),
        row: clamp(Math.floor(y / CONSTANTS.SQUARE_SIZE), 0, CONSTANTS.NUM_ROW - 1),
    }
}