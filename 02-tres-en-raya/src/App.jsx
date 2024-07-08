import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURN } from './constants'
import { checkWinnerFrom, checkEndGame} from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  // tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : 
    Array(9).fill(null)
  })
  
    
    
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.x
  } )


  //null es que no hay ganador y false es que hay empate
  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

 

  const updateBoard = (index) => {
    // no actualizamos esta poción
    // si ya tiene algo
    if (board[index] || winner  ) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURN.x ? TURN.o : TURN.x
    setTurn(newTurn)

    //Guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner =checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) // empate
    }
  }

  return (
    <>
       <main className='board'>
        <h1>Tres En Raya</h1>
        <button onClick={resetGame}>Reset del Juego</button>
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square 
                  key={index}
                  index = {index}
                  updateBoard = {updateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURN.x} >{TURN.x}</Square>
          <Square isSelected={turn === TURN.o} >{TURN.o}</Square>
        </section>

        <WinnerModal
            winner = {winner}
            resetGame = {resetGame}
        ></WinnerModal>

       </main>
    </>
  )
}

export default App
