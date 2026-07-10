
// ALL CONSTANTS

// Board constants
export const SQUARE_SIZE = 100; // In pixels
export const NUM_ROW = 8;
export const NUM_COL = 8;
export const IS_WHITE = true; // If you're playing white (dummy variable, im just using this to test UI for black/white)
export const WHITE_SQUARE_COL = "#e6d6ac";
export const BLACK_SQUARE_COL = "#4b7913";


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

// =================================================== TO DELETE (ONE-USE FOR DEBUG PURPOSES)
export const RANDOM_MIDGAME_BITBOARDS: BitboardData = {
    // White pieces
    whitePawns:   0x000000001008EF00n, // e4 and d5 pushed, others on rank 2
    whiteKnights: 0x0000000000240000n, // c3 and f3 (standard development)
    whiteBishops: 0x0000001000000020n, // e3 and f1 (one moved, one home)
    whiteRooks:   0x0000000000000081n, // still on a1, h1
    whiteQueens:  0x0000000000020000n, // moved to c2
    whiteKing:    0x0000000000000010n, // uncasted on e1

    // Black pieces
    blackPawns:   0x00EF081000000000n, // d4 and e5 pushed, others on rank 7
    blackKnights: 0x0000200000000000n, // f6 developed (b8 knight captured)
    blackBishops: 0x0024000000000000n, // still on c8, f8
    blackRooks:   0x0000000000000000n, // text placeholder or castled/captured
    blackQueens:  0x0800000000000000n, // still on d8
    blackKing:    0x2000000000000000n, // castled to g8 (0x2000000000000000n)
};