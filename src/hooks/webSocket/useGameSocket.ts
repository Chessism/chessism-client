import { useEffect, useRef, useState } from 'react';
import type { GameMessage } from '../../lib/apiPayloads';
import type { BitboardData } from '../../utils/boardState';
import { START_BITBOARDS } from '../../constants';

export function useGameSocket(gameId: string) {
    const [bitboard, setBitboards] = useState<BitboardData>(START_BITBOARDS);
    const [isWhite, setIsWhite] = useState<boolean>(true);
    const [gameStatus, setGameStatus] = useState<string>("Connecting...");
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/game/${gameId}`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
        const msg: GameMessage = JSON.parse(event.data);

        switch (msg.type) {
            case "board_update":
                setBitboards(msg.bitboards);
                break;
            case "color_assigned":
                setIsWhite(msg.isWhite);
                break;
            case "status":
                setGameStatus(msg.status);
                break;
        }
    };

        return () => socket.close(); // cleanup on unmount
    }, [gameId]);

    const sendMove = (move: unknown) => {
        socketRef.current?.send(JSON.stringify({ type: "move", move }));
    };

    return { bitboard, isWhite, gameStatus, sendMove };
}