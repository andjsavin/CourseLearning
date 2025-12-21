import Die from '/src/components/Die.jsx'
import { useState, useRef, useEffect } from 'react'
import Confetti from '/src/components/Confetti.jsx'

export default function App() {

  const hold = (id) => {
    setDice(
      prev => prev.map(
        die => die.props.id === id ? { ...die, props: { ...die.props, isHeld: !die.props.isHeld } } : die
      )
    )
  }

  const [dice, setDice] = useState(
    () => [...Array(10).keys()].map(x => <Die value={Math.floor(Math.random() * 6) + 1} key={x} isHeld={false} id={x} hold={hold} />)
  )

  const reroll = () => {
    setDice(
      prev => prev.map(
        die =>
          die.props.isHeld ? die : { ...die, props: { ...die.props, value: Math.floor(Math.random() * 6) + 1 } }
      )
    )
  }

  const startNewGame = () => {
    setDice(
      [...Array(10).keys()].map(x => <Die value={Math.floor(Math.random() * 6) + 1} key={x} isHeld={false} id={x} hold={hold} />)
    )
  }

  let gameWon = dice.every(die => die.props.isHeld) && dice.every(die => dice[0].props.value === die.props.value)
  const newGameRef = useRef(null)
  useEffect(
    () => {
      if (gameWon) {
        newGameRef.current.focus()
      } else {
        newGameRef.current.blur()
      }
    }, [gameWon]
  )

  return (
    <main>
      {gameWon && <Confetti />}
      <div className='rules-container'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice-container'>
        {
          dice
        }
      </div>
      <button className='roll-button' onClick={gameWon ? startNewGame : reroll} ref={newGameRef}>{gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

