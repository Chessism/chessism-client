import './App.css'
import Board from '../components/board/board.tsx'

function App() {
  // TypeScript ensures 'message' must be a string
  const message: string = "WELCOME TO CHESSISM";

  return (
    <div className='Main-background'>
      {/*NOTE: You add comments like this*/}

      {/* Some random text being shown above the chess board */}
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: "Comic Sans MS"}}>
      <h1>{message}</h1>
      </div>

      {/* CREATE BOARD */}
      <div className="Board-container">
        <Board />
      </div>
    </div>
  )
}

export default App
