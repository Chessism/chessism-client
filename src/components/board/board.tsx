import {useRef, useState, useCallback} from "react";
import {useChessGame} from "../../hooks/webSocket/useChessBoard.ts";
import {useChessPlayer} from "../../hooks/webSocket/useChessPlayer.ts";
import {useChessSocket} from "../../hooks/webSocket/webSocket.ts"
import {createLetterLabel, createNumberLabel} from "../../utils/boardRender.tsx";
import {usePieceDrag} from "../../hooks/pieceDrag/pieceDrag.tsx";
import {type PieceSymbol, PIECE_IMAGES} from "../../lib/pieceMap.ts";
import {handleLeftClick, handleRightClick} from "./mouseEvents.tsx";
import Square from "./square";
import Piece from "../piece/piece.tsx";
import * as CONSTANTS from "../../constants.ts";
import './board.css'

// ======================= MAIN ============================
function Board() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const {board, applyMove} = useChessGame();
    const [isConnected, setIsConnected] = useState(false);
    const {playerColor, gameReady, setPlayerColor, setGameReady, isYourPiece} = useChessPlayer();

    const onConnected = useCallback((color: 'white' | 'black') => {
        setPlayerColor(color);
        setIsConnected(true);
    }, [setPlayerColor]);

    const onGameStart = useCallback(() => {
        setGameReady(true);
    }, [setGameReady]);

    const onPlayerLeft = useCallback(() => {
        setGameReady(false);
        setIsConnected(false);
    }, [setGameReady]);

    const { sendMove } = useChessSocket({
        onConnected,
        onGameStart,
        onMove: applyMove,   // applyMove should already be stable from useChessGame
        onPlayerLeft,
    });
    const {drag, draggingFrom, startDrag, moveDrag, endDrag, cancelDrag} = usePieceDrag({
        svgRef,
        onDrop: ({piece, from, to}) => {
            if (!isYourPiece(piece) || !gameReady || !isConnected) return;
            applyMove({piece, from, to});
            sendMove({piece, from, to});
        },
    });


    const elements = [];

    for (let row = 0; row < CONSTANTS.NUM_ROW; row++) {
        for (let col = 0; col < CONSTANTS.NUM_COL; col++) {
            const index = row * CONSTANTS.NUM_COL + col;
            const piece = board[index] as PieceSymbol | null;

            // Create Square Rendering
            elements.push(
                // key: element identifier for rendering
                <Square
                    key={`sq-${row}-${col}`}
                    row={row}
                    col={col}
                    onLeftClick={handleLeftClick(row, col)}
                    onRightClick={handleRightClick(row, col)}
                />
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
                        startDrag={startDrag}
                        onLeftClick={handleLeftClick(row, col)}
                        onRightClick={handleRightClick(row, col)}
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
            onMouseUp={(e) => {
                e.stopPropagation();
                endDrag(e.clientX, e.clientY)
            }}
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