import {type PieceSymbol} from "../../lib/pieceMap.ts";

// Manages all the structures use for drag and drop

export interface DragState {
    piece: PieceSymbol,
    fromRow: number,
    fromCol: number,
    x: number,
    y: number
}

export interface Square {
    row: number,
    col: number
}