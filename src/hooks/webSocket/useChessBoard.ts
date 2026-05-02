import {useState, useCallback} from "react";
import {type PieceSymbol} from "../../lib/pieceMap.ts";
import {type MovePiece} from "./webSocket.ts";
import {type BitboardData, BitboardsToBoard} from "../../utils/boardState.ts";
import * as CONSTANTS from "../../constants.ts";

// ==================== Temporary Bitboards (for testing) ==========================
const DUMMY_BITBOARDS: BitboardData = {
    whitePawns:   0x000000000000FF00n,
    whiteKnights: 0x0000000000000042n,
    whiteBishops: 0x0000000000000024n,
    whiteRooks:   0x0000000000000081n,
    whiteQueens:  0x0000000000000008n,
    whiteKing:    0x0000000000000010n,
    blackPawns:   0x00FF000000000000n,
    blackKnights: 0x4200000000000000n,
    blackBishops: 0x2400000000000000n,
    blackRooks:   0x8100000000000000n,
    blackQueens:  0x0800000000000000n,
    blackKing:    0x1000000000000000n,
};

export function useChessGame() {
    const [board, setBoard] = useState<(PieceSymbol | null)[]>(
        () => BitboardsToBoard(DUMMY_BITBOARDS, CONSTANTS.IS_WHITE)
    );

    const applyMove = useCallback(({piece, from, to}: MovePiece) => {
        if (from.row === to.row && from.col === to.col) return;
        setBoard(prev => {
            const newBoard = [...prev];
            newBoard[to.row * CONSTANTS.NUM_ROW + to.col] = piece;
            newBoard[from.row * CONSTANTS.NUM_ROW + from.col] = null;
            return newBoard;
        });
    }, []);

    return {board, applyMove};
}