import type { BitboardData } from "../utils/boardState";

// === /queue (WebSocket) ===
export interface JoinQueueRequest {
    nick_name: string;
}

export type QueueMessage =
    | { status: "waiting" }
    | { status: "matched"; game_id: string, opponent_name: string }
    | { status: "failed"; reason: string };

// === /game/:gameId (WebSocket) ===
export type GameMessage =
    | { type: "board_update"; bitboards: BitboardData }
    | { type: "color_assigned"; isWhite: boolean }
    | { type: "status"; status: string };

export interface MoveMessage {
    type: "move";
    move: unknown;
}