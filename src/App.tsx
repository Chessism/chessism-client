import './App.css'

function App() {
  // TypeScript ensures 'message' must be a string
  const message: string = "2123";

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
    </div>
  )
}

export default App
