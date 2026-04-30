import { useState, useCallback,type RefObject } from 'react';
import {type DragState } from '../../components/piece/dragTypes.ts';
import { clientToSVG, coordsToSquare } from './boardMath';
import {type PieceSymbol } from '../../lib/pieceMap';

interface usePieceDragParams {
    svgRef: RefObject<SVGSVGElement | null>; // svgRef: knowing where the board is on the screen
    onDrop?: (data: {
        piece: PieceSymbol;
        from: { row: number; col: number };
        to: { row: number; col: number };
    }) => void; // onDrop: callback function to handle the drop event
}

export function usePieceDrag({ svgRef, onDrop }: usePieceDragParams) {
    // useState: React feature to let a component remember something that changed over time
    // drag: the value, setDrag: the update function
    const [drag, setDrag] = useState<DragState | null>(null);

    // Get the SVG's position on the page and converts mouse coordinates to SVG coordinates
    // useCallback: React feature to memoize a function so that it doesn't re-render when the dependencies change'
    const getSVGPoint = useCallback(
        (clientX: number, clientY: number) => {
            const rect = svgRef.current!.getBoundingClientRect();
            return clientToSVG(clientX, clientY, rect);
        },
        [svgRef] // Dependencies -> svgRef, re-render this function if svgRef changes
    );

    const startDrag = useCallback(
        (row: number, col: number, piece: PieceSymbol, clientX: number, clientY: number) => {
            const { x, y } = getSVGPoint(clientX, clientY);

            // For startDrag, we set the drag value to the starting position of the drag
            setDrag({
                piece,
                fromRow: row,
                fromCol: col,
                x,
                y,
            });
        },
        [getSVGPoint] // Dependencies: -> getSVGPoint -> svgRef
    );

    const moveDrag = useCallback(
        (clientX: number, clientY: number) => {
            // For moveDrag, we only need to update the x and y coordinates

            setDrag(prev => {
                if (!prev) return null;

                const { x, y } = getSVGPoint(clientX, clientY);
                return { ...prev, x, y }; // keep everything else except x and y
            });
        },
        [getSVGPoint]
    );

    const endDrag = useCallback(
        (clientX: number, clientY: number) => {
            setDrag(prev => {
                if (!prev) return null;

                const { x, y } = getSVGPoint(clientX, clientY);
                const to = coordsToSquare(x, y);

                // Call the drop function for endDrag
                onDrop?.({
                    piece: prev.piece,
                    from: { row: prev.fromRow, col: prev.fromCol },
                    to,
                });

                // Clears the useState as the drag ended
                return null;
            });
        },
        [getSVGPoint, onDrop]
    );

    const cancelDrag = useCallback(() => {
        setDrag(null);
    }, []);

    return {
        drag,
        draggingFrom: drag
            ? { row: drag.fromRow, col: drag.fromCol }
            : null,
        startDrag,
        moveDrag,
        endDrag,
        cancelDrag,
    };
}