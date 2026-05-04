import {useEffect, useRef, useCallback} from "react";
import {type PieceSymbol} from "../../lib/pieceMap.ts";
import {type Square} from "../../components/piece/dragTypes.ts";

export interface MovePiece {
    piece: PieceSymbol;
    from: Square;
    to: Square;
}

export interface UseChessSocketParams {
    onMove: (move: MovePiece) => void;
    onGameStart: () => void;
    onConnected: (color: 'white' | 'black') => void;
    onPlayerLeft: () => void;
}

export function useChessSocket({
    onMove,
    onGameStart,
    onConnected,
    onPlayerLeft,
                               }: UseChessSocketParams) {
    const wsRef = useRef<WebSocket | null>(null);

    const handlersRef = useRef({
        onMove,
        onGameStart,
        onConnected,
        onPlayerLeft,
    });

    useEffect(() => {
        handlersRef.current = {onMove, onGameStart, onConnected, onPlayerLeft};
        let attempts = 0;
        const MAX_ATTEMPTS = 3;

        function connect() {
            if (attempts >= MAX_ATTEMPTS) {
                console.log('Max reconnection attempts reached');
                return;
            }

            const ws = new WebSocket('ws://localhost:3000');
            wsRef.current = ws;
            attempts++;

            ws.onopen = () => {
                console.log('WebSocket connected');
                attempts = 0; // reset on successful connection
            };

            ws.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                const {onMove, onGameStart, onConnected, onPlayerLeft} = handlersRef.current;
                switch (msg.type) {
                    case 'connected':
                        onConnected(msg.color);
                        break
                    case 'game_start':
                        onGameStart()
                        break
                    case 'move':
                        onMove({ piece: msg.piece, from: msg.from, to: msg.to })
                        break
                    case 'player_left':
                        onPlayerLeft()
                        break
                }
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
                setTimeout(connect, 2000); // retry after 2 seconds
            };

            ws.onerror = () => {
                console.error('WebSocket error');
                ws.close();
            };
        }

        connect();
        return () => wsRef.current?.close();
    }, [onConnected, onGameStart, onMove, onPlayerLeft]);

    const sendMove = useCallback((move: MovePiece) => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket is not open. Cannot send move');
            return;
        }
        wsRef.current?.send(JSON.stringify({type: 'move', ...move}));
    }, []);

    return {sendMove};
}

