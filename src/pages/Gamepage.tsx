import { useParams, useNavigate } from 'react-router-dom';
import { Board } from '../../components/board/board.tsx';
import { useGameSocket } from '../hooks/webSocket/useGameSocket';
import './globalPage.css';

const GamePage = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { bitboard, isWhite, gameStatus, sendMove } = useGameSocket(gameId!);

    const debugFunction = () => {
        console.log("Debug button pressed");
        
    }
    // ==== Game page ui ====
    return (
        <div>
            <button onClick={() => navigate('/')}>Main Menu</button>
            <h1>Game Status: {gameStatus}</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '40%', aspectRatio: '1 / 1' }}>
                    <Board bitboards={bitboard} isWhite={isWhite} />
                </div>
            </div>
            <button onClick={debugFunction}> Run a command </button>
        </div>
    );
};
export default GamePage;