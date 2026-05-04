import { data } from "react-router-dom";

const requestGame = async (userID: string) => {
    const userAuth = localStorage.getItem("userAuth");
    
    const response = await fetch("http://localhost:8000/join-queue", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            user_id: parseInt(userID),
            auth_token: userAuth,
        })
    });

    const response_data = await response.json();
    const status = response_data.status

    if (status == "Failed") {
        console.log(response_data.reason)
    } else if (status == "Waiting") {
        console.log("Waiting in the queue...")
    } else if (status == "Success") {
        console.log(`Joined game id ${response_data.game_id} against player ${response_data.oppo_id}`)
    } else {
        console.log("Unknown status")
    }
    return response_data;
}

export default requestGame;