import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initialiseUser from '../services/auth.ts';
import './globalPage.css'
const HomePage = () => {
    // declare consts
    const navigate = useNavigate();
    const [status, setStatus] = useState("Connecting to server...");
    const [userID, setUser] = useState("null");
    const [greetMessage, setGreet] = useState("Welcome back user ");

    // Get userID from server (once)
    useEffect(() => {
        initialiseUser().then((data) => {
            setStatus("Ready to Play");
            setUser(data.user_id.toString()); 
            if (data.status == "new") {setGreet("Welcome to Chessism user ")}
        });
    }, []);

    // Home page html
    return (
        <div>
            <h1>Chessism</h1>
            <p>UserID: {greetMessage} {userID}!</p>
            <p>Status: {status}</p>
            <button onClick={() => navigate('/game')}>
                Start Game
            </button>
        </div>
    );
};

export default HomePage;