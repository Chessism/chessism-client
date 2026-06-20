
// ALL CONSTANTS

export const SQUARE_SIZE = 100; // In pixels
export const NUM_ROW = 8;
export const NUM_COL = 8;
export const IS_WHITE = true; // If you're playing white (dummy variable, im just using this to test UI for black/white)

export const START_BITBOARDS: BitboardData = {
    whitePawns:   0x000000000000FF00n, // rank 2
    whiteKnights: 0x0000000000000042n, // b1, g1
    whiteBishops: 0x0000000000000024n, // c1, f1
    whiteRooks:   0x0000000000000081n, // a1, h1
    whiteQueens:  0x0000000000000008n, // d1
    whiteKing:    0x0000000000000010n, // e1

    blackPawns:   0x00FF000000000000n, // rank 7
    blackKnights: 0x4200000000000000n, // b8, g8
    blackBishops: 0x2400000000000000n, // c8, f8
    blackRooks:   0x8100000000000000n, // a8, h8
    blackQueens:  0x0800000000000000n, // d8
    blackKing:    0x1000000000000000n, // e8
};

export const START_FEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"