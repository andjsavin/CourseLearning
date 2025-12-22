import { languageData } from "./assets/languages"
import { words } from "./assets/words"
import Header from "./components/Header"
import Language from "./components/Language"
import StatusBar from "./components/StatusBar"
import { useState, useEffect } from "react"
import { nanoid } from 'nanoid';
import WordDisplayTile from "./components/WordDisplayTile"
import KeyboardButton from "./components/KeyboardButton"
import Confetti from '/src/components/Confetti.jsx'

export default function App() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const handleButtonClick = (letter) => {

    if (hiddenLetters.includes(letter) && hiddenLetters.length > 0 && checkLanguages()) {
      setWord(prev =>
        prev.map(tile =>
          tile.letter === letter
            ? { ...tile, show: true }
            : tile
        )
      )
      setKeyboard(prev =>
        prev.map(btn =>
          btn.letter === letter
            ? { ...btn, pressed: true, correct: true }
            : btn
        )
      )
    } else if (hiddenLetters.length > 0 && checkLanguages()) {
      setLanguages(prev => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].alive) {
            prev[i].alive = false
            setGameStatus(
              prevStatus => {
                return {
                  ...prevStatus,
                  status: i === 0 ? `Farewell ${prev[i].name}` : prevStatus.status + ` & ${prev[i].name}`,
                  style: {
                    fontStyle: 'italic'
                  }
                }
              }
            )
            break
          }
        }
        return [...prev]
      }
      )
      setKeyboard(prev =>
        prev.map(btn =>
          btn.letter === letter
            ? { ...btn, pressed: true, correct: false }
            : btn
        )
      )
    }
  }

  const [gameStatus, setGameStatus] = useState(
    () => {
      return {
        status: '',
        details: '',
        style: {}
      }
    }
  )

  const [languages, setLanguages] = useState(() =>
    languageData.map(x => ({
      name: x.name,
      color: x.color,
      backgroundColor: x.backgroundColor,
      id: nanoid(),
      alive: true
    }))
  )

  const [word, setWord] = useState(() =>
    Array.from(words[Math.floor(Math.random() * words.length)]).map(char => ({
      letter: char.toUpperCase(),
      show: false,
      id: nanoid()
    }))
  )

  const [keyboard, setKeyboard] = useState(() =>
    Array.from(alphabet).map(char => ({
      letter: char.toUpperCase(),
      id: nanoid(),
      pressed: false,
      correct: false
    }))
  )

  const checkLanguages = () => {
    for (const language of languages) {
      if (language.alive) {
        return true
      }
    }
    return false
  }

  const hiddenLetters = word
    .map(tile => tile.show ? '' : tile.letter)
    .join('')


  let gameWon = checkLanguages() && hiddenLetters.length === 0
  let gameLost = !checkLanguages()

  useEffect(
    () => {
      if (gameLost) {
        setGameStatus(
          {
            status: 'Game over!',
            details: 'You lose! Better start learning Assembly 😭',
            style: {
              backgroundColor: '#BA2A2A'
            }
          }
        )
        setWord(prev =>
          prev.map(tile => { return { ...tile, show: true } }
          )
        )
      }
      if (gameWon) {
        setGameStatus(
          {
            status: 'You win!',
            details: 'Well done! 🎉',
            style: {
              backgroundColor: '#10A95B'
            }
          }
        )
      }
    }, [gameLost, gameWon]
  )



  const startNewGame = () => {
    setGameStatus(
      {
        status: '',
        details: '',
        style: {}
      }
    )
    setLanguages(
      prev => [...prev].map(lang => {
        return { ...lang, alive: true }
      })
    )
    setWord(
      Array.from(words[Math.floor(Math.random() * words.length)]).map(char => ({
        letter: char.toUpperCase(),
        show: false,
        id: nanoid()
      }))
    )
    setKeyboard(
      prev => [...prev].map(tile => {
        return { ...tile, pressed: false, correct: false }
      })
    )
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <Header />
      <StatusBar gameStatus={gameStatus.status} details={gameStatus.details} style={gameStatus.style} />
      <div className="languages-box">
        {languages.map(lang => (
          <Language
            key={lang.id}
            name={lang.name}
            color={lang.color}
            backgroundColor={lang.backgroundColor}
            alive={lang.alive}
          />
        ))}
      </div>
      <div className="word-display" style={{
        minWidth: word.length * 42 + 'px',
        maxWidth: word.length * 42 + 'px'
      }}>
        {word.map(tile => (
          <WordDisplayTile
            key={tile.id}
            letter={tile.letter}
            show={tile.show}
          />
        ))}
      </div>
      <div className="keyboard">
        {keyboard.map(btn => (
          <KeyboardButton
            key={btn.id}
            letter={btn.letter}
            pressed={btn.pressed}
            correct={btn.correct}
            handleButtonClick={handleButtonClick}
          />
        ))}
      </div>
      <button className="new-game-button"
        style={{
          visibility: gameLost || gameWon ? 'visible' : 'hidden'
        }}
        onClick={startNewGame}>New Game</button>
    </main>
  )
}