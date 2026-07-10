import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import type { QueueMessage } from '../../lib/apiPayloads';

type QueueStatus = "idle" | "connecting" | "waiting" | "failed";

export function useQueueSocket() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<QueueStatus>("idle");
    const socketRef = useRef<WebSocket | null>(null);

    const joinQueue = (nickname: string) => {
        setStatus("connecting");
        const socket = new WebSocket(`/ws/queue?nickname=${encodeURIComponent(nickname)}`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const msg: QueueMessage = JSON.parse(event.data);
            switch (msg.status) {
                case "matched":
                    socket.close();
                    navigate(`/game/${msg.game_id}`);
                    break;
                case "failed":
                    socket.close();
                    setStatus("failed");
                    break;
                case "waiting":
                    setStatus("waiting");
                    break;
            }
        };

        socket.onerror = () => setStatus("failed");
    };

    const cancelQueue = () => {
        socketRef.current?.close();
        socketRef.current = null;
        setStatus("idle");
    };

    return { status, joinQueue, cancelQueue };
}