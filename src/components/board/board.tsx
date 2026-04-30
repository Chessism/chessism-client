import {useMemo, useRef, useState} from "react";
import {type BitboardData, BitboardsToBoard} from "../../utils/boardState.ts";
import {createLetterLabel, createNumberLabel} from "../../utils/boardRender.tsx";
import {usePieceDrag} from "../../hooks/pieceDrag/pieceDrag.tsx";
import {type PieceSymbol, PIECE_IMAGES} from "../../lib/pieceMap.ts";
import Square from "./square";
import Piece from "../piece/piece.tsx";
import * as CONSTANTS from "../../constants.ts";
import './board.css'


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

// ======================= MAIN ============================
function Board() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [board, setBoard] = useState<(PieceSymbol | null)[]>(
        () => BitboardsToBoard(DUMMY_BITBOARDS, CONSTANTS.IS_WHITE)
    );
    const {drag, draggingFrom, startDrag, moveDrag, endDrag, cancelDrag} = usePieceDrag({
        svgRef,
        onDrop: ({piece, from, to}) => {
            console.log(`Dropped ${piece} from ${from.row} ${from.col} to ${to.row} ${to.col}`);
            setBoard(
                (prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[to.row * CONSTANTS.NUM_ROW + to.col] = piece;
                    newBoard[from.row * CONSTANTS.NUM_ROW + from.col] = null;
                    return newBoard;
                }
            )
            // TODO: Implement piece drop logic and API calls
        },
    });


    const elements = [];

    for (let row = 0; row < CONSTANTS.NUM_ROW; row++) {
        for (let col = 0; col < CONSTANTS.NUM_COL; col++) {
            const index = row * CONSTANTS.NUM_ROW + col;
            const piece = board[index] as PieceSymbol | null;

            // Create Square Rendering
            elements.push(
                // key: element identifier for rendering
                <Square key={`sq-${row}-${col}`} row={row} col={col} />
            );
            
            // CREATE TEXT COORDINATES LABEL (1-8, a-h) ===================
            if (col == 0) elements.push(createNumberLabel(row, col));
            if (row == CONSTANTS.NUM_ROW-1) elements.push(createLetterLabel(row, col));

            // Piece Rendering
            if (piece) {
                const isDragging = draggingFrom?.row === row && draggingFrom?.col === col;
                elements.push(
                    <Piece
                        key={`piece-${row}-${col}`}
                        row={row}
                        col={col}
                        piece={piece}
                        isDragging={isDragging}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            startDrag(row, col, piece, e.clientX, e.clientY)
                        }}
                    />
                );
            }
        }
    }

    // RETURN THE BOARD 
    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${CONSTANTS.NUM_COL * CONSTANTS.SQUARE_SIZE} ${CONSTANTS.NUM_ROW * CONSTANTS.SQUARE_SIZE}`}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={(e) => endDrag(e.clientX, e.clientY)}
            onMouseLeave={cancelDrag}
            onContextMenu={(e) => e.preventDefault()} // Disables the right-click popup menu when interacting with board
            >
            {/*Chessboard elements*/}
            {elements}
            {/*Drag overlay*/}
            {drag && (
                <image
                    href={PIECE_IMAGES[drag.piece]}
                    x={drag.x - (CONSTANTS.SQUARE_SIZE - 20) / 2}
                    y={drag.y - (CONSTANTS.SQUARE_SIZE - 20) / 2}
                    width={CONSTANTS.SQUARE_SIZE - 20}
                    height={CONSTANTS.SQUARE_SIZE - 20}
                    imageRendering="pixelated"
                    pointerEvents="none"
                    style={{ cursor: 'grabbing' }}
                />
            )}
        </svg>
    )
}

export default Board