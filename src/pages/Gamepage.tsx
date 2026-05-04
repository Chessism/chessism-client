import { useNavigate } from 'react-router-dom';
import Board from '../components/board/Board.tsx'
import requestGame from '../services/requestGame.ts'

import './globalPage.css'
import { useEffect, useState } from 'react';
const GamePage = () => {
    // declare consts
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const [oppoID, setOpID] = useState("Finding an Opponent...")

    // Join queue
    useEffect(() => {
        requestGame(userID).then((data) => {
            setOpID(data.oppo_id)
        });
    }, []);
    // Game page ui
    return (
        <div>
            <button onClick={() => navigate('/')}>Main Menu</button>
            <h1>Opponent ID: {oppoID}</h1>
            {/* CREATE BOARD */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ width: '40%', aspectRatio: '1 / 1'}}>
                    <Board />
                </div>
            </div>
            <h1>Your ID: {userID}</h1>
        </div>
    );
};

export default GamePage;