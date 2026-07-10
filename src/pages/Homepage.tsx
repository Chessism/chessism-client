import { useEffect, useState } from 'react';
import './globalPage.css'
import { useQueueSocket } from '../hooks/webSocket/useQueueSocket';

const HomePage = () => {
    // Declare Constants:
    // - [TODO] Get userID from server (keep attempting everytime the user isn't registered) 
    const [nickname, setNickname] = useState('');
    const { status, joinQueue, cancelQueue } = useQueueSocket();
    const isSearching = status === "connecting" || status === "waiting";

    // =============== Features

    // When the user clicks "Start Game" button
    const handleStartGame = () => {
        // ensures nickname is not empty
        // sends a Websocket request to join queue with that nickname

        if (nickname.trim() === "") { 
            alert("Please enter a nickname before starting!"); 
            return; 
        }
        
        joinQueue(nickname);
    };

    // =============== Home page html
    return (
        <div>
            <h1>Welcome to Chessism</h1>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                disabled={isSearching}
            />
            <br /><br />

            {isSearching ? (
                <button onClick={cancelQueue} style={{ backgroundColor: "red", color: "white" }}>
                    Cancel
                </button>
            ) : (
                <button onClick={handleStartGame}>
                    {status === "failed" ? "Try Again" : "Start Game"}
                </button>
            )}

            {status === "waiting" && <p>Searching for opponent...</p>}
            {status === "failed" && <p style={{ color: "red" }}>Failed to find a match. Try again.</p>}
        </div>
    );
};

export default HomePage;