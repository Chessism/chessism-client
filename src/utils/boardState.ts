import { getSquaresFromBitboard, indexToScreenCoordinates} from "./bitboard.ts";
import { BITBOARD_FIELDS} from "../lib/pieceMap.ts";

export interface BitboardData {
    whitePawns: bigint;
    whiteKnights: bigint;
    whiteBishops: bigint;
    whiteRooks: bigint;
    whiteQueens: bigint;
    whiteKing: bigint;
    blackPawns: bigint;
    blackKnights: bigint;
    blackBishops: bigint;
    blackRooks: bigint;
    blackQueens: bigint;
    blackKing: bigint;
}

export function BitboardsToBoard(data: BitboardData, isWhite: boolean): (string | null)[] {
    const board: (string | null)[] = Array(64).fill(null);

    for (const [field, symbol] of BITBOARD_FIELDS) {
        const bitboard = data[field as keyof BitboardData];
        if (!bitboard) continue;
        for (const sqIndex of getSquaresFromBitboard(bitboard)) {
            const {col, row} = indexToScreenCoordinates(sqIndex, isWhite);
            board[row * 8 + col] = symbol;
        }
    }

    return board;
}
