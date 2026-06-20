// import {useState} from "react";
// import {type PieceSymbol} from "../../lib/pieceMap.ts";

// export function useChessPlayer() {
//     const [playerColor, setPlayerColor] = useState<'white' | 'black' | null>(null);
//     const [gameReady, setGameReady] = useState(false);

//     const isYourPiece = (piece: PieceSymbol): boolean => {
//         if (!playerColor) return false;
//         return playerColor === 'white' ?
//             piece === piece.toUpperCase() : piece === piece.toLowerCase();
//     };

//     return {
//         playerColor,
//         setPlayerColor,
//         gameReady,
//         setGameReady,
//         isYourPiece};
// }