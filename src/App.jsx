import { useState } from 'react'
import './App.css'
import CapitalCard from './CapitalCard'

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
}

const initialCards = [
  { country: "France", capital: "Paris", flag: "https://flagcdn.com/w320/fr.png" },
  { country: "Japan", capital: "Tokyo", flag: "https://flagcdn.com/w320/jp.png" },
  { country: "Canada", capital: "Ottawa", flag: "https://flagcdn.com/w320/ca.png" },
  { country: "Brazil", capital: "Brasília", flag: "https://flagcdn.com/w320/br.png" },
  { country: "South Korea", capital: "Seoul", flag: "https://flagcdn.com/w320/kr.png" },
  { country: "Norway", capital: "Oslo", flag: "https://flagcdn.com/w320/no.png" },
  { country: "Ireland", capital: "Dublin", flag: "https://flagcdn.com/w320/ie.png" },
  { country: "Ivory Coast", capital: "Yamoussoukro", flag: "https://flagcdn.com/w320/ci.png" },
  { country: "Russia", capital: "Moscow", flag: "https://flagcdn.com/w320/ru.png" },
  { country: "Venezuela", capital: "Caracas", flag: "https://flagcdn.com/w320/ve.png" }
]

function App() {
  const [cards, setCards] = useState(initialCards)
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const currentCard = cards[index]

  const handleSubmit = () => {
    const input = normalize(guess)
    const correct = normalize(currentCard.capital)

    const matched = input === correct
    setIsCorrect(matched)
    setShowAnswer(true)

    if (matched) {
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > maxStreak) setMaxStreak(newStreak)
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1)
      resetCard()
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1)
      resetCard()
    }
  }

  const resetCard = () => {
    setGuess('')
    setShowAnswer(false)
    setIsCorrect(null)
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setIndex(0)
    resetCard()
  }

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1> Guess the Capital</h1>
      <p>Total Cards: {cards.length} | Highest Streak: {maxStreak}</p>
      <button onClick={shuffleCards} style={{ marginBottom: '1rem' }}> Shuffle Cards</button>

      <CapitalCard
        capital={currentCard.capital}
        showAnswer={showAnswer}
        isCorrect={isCorrect}
        flag={currentCard.flag}
        country={currentCard.country}
      />

      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={showAnswer}
        style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '1rem' }}
      />
      <br />
      <button onClick={handleSubmit} disabled={showAnswer} style={{ marginTop: '0.5rem' }}>
        Submit
      </button>

      <div className="nav-buttons" style={{ marginTop: '1rem' }}>
        <button onClick={handlePrev} disabled={index === 0}>Back</button>
        <button onClick={handleNext} disabled={index === cards.length - 1}>Next</button>
      </div>
    </div>
  )
}

export default App
