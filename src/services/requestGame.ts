import type { JoinQueueRequest, JoinQueueResponse } from "../lib/apiPayloads";

const requestGame = async (nickname: string): Promise<JoinQueueResponse> => {

    const payload: JoinQueueRequest = {
        nick_name: nickname,
    };

    const response = await fetch("http://localhost:8000/join-queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data: JoinQueueResponse = await response.json();

    switch (data.status) {
        case "Failed":
            console.log(data.reason);
            break;
        case "Waiting":
            console.log("Waiting in the queue...");
            break;
        case "Success":
            console.log(`Joined game id ${data.game_id} against player ${data.oppo_id}`);
            break;
        default:
            console.log("Unknown status");
    }

    return data;
};

export default requestGame;