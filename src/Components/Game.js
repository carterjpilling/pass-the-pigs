import React, { useState, useEffect } from 'react'
import { Paper, Button, Typography } from '@material-ui/core'
import './Game.css'
// import { BiDice1, BiDice2, BiDice3, BiDice4, BiDice5, BiDice6 } from 'react-icons/bi'
import { GiPig } from 'react-icons/gi'


//How will I handle a user getting a '1' and passing it to the next player? Will there be a pass button?

//Numbers are getting messed up after passing the pigs.
//Pig needs to be larger




export default function Game() {
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)

  const [currentPlayer, setCurrentPlayer] = useState(1)

  const [currentScore1, setCurrentScore1] = useState(0)
  const [currentScore2, setCurrentScore2] = useState(0)


  const dieArray = [1, 2, 3, 4, 5, 6]

  const [die1, setDie1] = useState(0)
  const [die2, setDie2] = useState(0)

  const [oneHit, setOneHit] = useState(false)

  const [winnerState, setWinnerState] = useState(false)
  const [winnerPlayer, setWinnerPlayer] = useState(1)

  useEffect(() => {
    setCurrentPlayer(1)
    setCurrentScore1(0)
    setCurrentScore2(0)
  }, [])

  useEffect(() => {
    if (player1Score >= 100) {
      setWinnerPlayer(1)
      setWinnerState(true)
    } else if (player2Score >= 100) {
      setWinnerPlayer(2)
      setWinnerState(true)
    }
  }, [player1Score, player2Score])


  useEffect(() => {
    if (die1 === 1 || die2 === 1) {
      setOneHit(true)
    } else if (currentPlayer === 1) {
      setCurrentScore1((currentScore1 + (die1 + die2)))
    } else {
      setCurrentScore2((currentScore2 + (die1 + die2)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [die1, die2])

  function rollDice() {
    setDie1(dieArray[Math.floor(Math.random() * dieArray.length)])
    setDie2(dieArray[Math.floor(Math.random() * dieArray.length)])

  }



  function hold() {
    let score1 = (player1Score + currentScore1)
    let score2 = (player2Score + currentScore2)

    if (currentPlayer === 1) {
      setPlayer1Score(score1)
      setCurrentScore1(0)
      setCurrentPlayer(2)
    }

    if (currentPlayer === 2) {
      setPlayer2Score(score2)
      setCurrentScore2(0)
      setCurrentPlayer(1)
    }

  }

  function newGame() {
    setWinnerState(false)

    setOneHit(false)
    setDie1(0)
    setDie2(0)

    setPlayer1Score(0)
    setPlayer2Score(0)

    setCurrentScore1(0)
    setCurrentScore2(0)

    // setCurrentPlayer(1)
  }

  function passThePigs() {

    if (currentPlayer === 1) {
      setCurrentScore1(0)
      setCurrentPlayer(2)
      setOneHit(false)
      setDie1(0)
      setDie2(0)
    } else {
      setCurrentScore2(0)
      setCurrentPlayer(1)
      setOneHit(false)
      setDie1(0)
      setDie2(0)
    }
  }

  return (
    <div>
      <Paper className="paper">
        <div className="player1-side">
          <div>
            {currentPlayer === 1 &&
              <GiPig />
            }

          </div>
          <h3>Player 1</h3>
          <h2>{player1Score}</h2>
          <div className="current">
            <p>CURRENT</p>
            <p>{currentScore1}</p>
          </div>
        </div>
        <div className="middle-container">
          <Button type='submit' variant='contained' onClick={() => newGame()}>New Game</Button>
          <div className="dice-container">
            <h1>
              {die1}
              {/* <BiDice1 /> */}
            </h1>
            <h1>
              {die2}
              {/* <BiDice2 /> */}
            </h1>
          </div>
          {winnerState === true ? <Typography className="game-button-container">Winner is Player {winnerPlayer}!</Typography> :
            <div>
              {oneHit === false ?
                <div className="game-button-container">
                  <Button type='submit' variant='contained' onClick={() => rollDice()}>Roll Dice</Button>
                  <Button type='submit' variant='contained' onClick={() => hold()}>Hold</Button>
                </div>
                :
                <div className="game-button-container">
                  <Button type='submit' variant='contained' onClick={() => passThePigs()}>Pass the Pigs</Button>
                </div>
              }</div>
          }
        </div>
        <div className="player2-side">
          <div>
            {currentPlayer === 2 &&
              <GiPig />
            }

          </div>
          <h3>Player 2</h3>
          <h2>{player2Score}</h2>
          <div className="current">
            <p>CURRENT</p>
            <p>{currentScore2}</p>
          </div>
        </div>
      </Paper>

    </div >
  )
}