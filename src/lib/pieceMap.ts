//Import all PNGs from asset
import K from '../assets/art-king-white-1.png'
import Q from '../assets/art-queen-white-2.png'
import R from '../assets/art-rook-white-1.png'
import B from '../assets/art-bishop-white-1.png'
import N from '../assets/art-knight-white-1.png'
import P from '../assets/art-pawn-white-1.png'
import k from '../assets/art-king-black-1.png'
import q from '../assets/art-queen-black-2.png'
import r from '../assets/art-rook-black-1.png'
import b from '../assets/art-bishop-black-1.png'
import n from '../assets/art-knight-black-1.png'
import p from '../assets/art-pawn-black-1.png'

export type PieceSymbol = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p';

export const PIECE_IMAGES: Record<string, string> = {
    K, Q, R, B, N, P,
    k, q, r, b, n, p
}  // Writing k, q, r is the same as 'k': k, 'q': q ...

export const BITBOARD_FIELDS: [string, PieceSymbol][] = [
    ['whiteKing', 'K'],
    ['whiteQueens', 'Q'],
    ['whiteRooks', 'R'],
    ['whiteBishops', 'B'],
    ['whiteKnights', 'N'],
    ['whitePawns', 'P'],
    ['blackKing', 'k'],
    ['blackQueens', 'q'],
    ['blackRooks', 'r'],
    ['blackBishops', 'b'],
    ['blackKnights', 'n'],
    ['blackPawns', 'p'],
]