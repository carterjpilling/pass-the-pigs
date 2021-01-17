import React, { useState, useEffect } from 'react'
import { Paper, Button, Typography } from '@material-ui/core'
import './Game.css'
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDice } from 'react-icons/fa'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import ReactGa from 'react-ga'

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
  const [rulesOpen, setRulesOpen] = useState(false)

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
    ReactGa.event({
      category: "Button",
      action: "Roll Dice"
    })

    setDie1(dieArray[Math.floor(Math.random() * dieArray.length)])
    setDie2(dieArray[Math.floor(Math.random() * dieArray.length)])

  }



  function hold() {
    let score1 = (player1Score + currentScore1)
    let score2 = (player2Score + currentScore2)

    ReactGa.event({
      category: "Button",
      action: "Hold the Dice"
    })

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

    setDie1(0)
    setDie2(0)

  }

  function newGame() {
    ReactGa.event({
      category: "Button",
      action: "New Game"
    })
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
    ReactGa.event({
      category: "Button",
      action: "Pass the Dice"
    })

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
    <div className="div-body">
      <Paper className="paper">
        <div className="player1-side">
          <div className='player-pig-container'>
            <h3>Player 1</h3>
            {currentPlayer === 1 &&
              <FaDice color='rgb(69,19,28)' />
            }
          </div>
          <h2>{player1Score}</h2>
          <div className="current">
            <p>CURRENT</p>
            <p>{currentScore1}</p>
          </div>
        </div>
        <div className="middle-container">
          <Button type='submit' variant='contained' onClick={() => newGame()}>
            {winnerState === false ?
              <Typography variant="subtitle1">
                New Game
            </Typography> :
              <Typography>
                Play Again!
            </Typography>
            }

          </Button>
          <div className="dice-container">
            <h1>
              {die1 === 0 && <FaDice color='rgb(69,19,28)' />}
              {die1 === 1 && <FaDiceOne color='rgb(69,19,28)' />}
              {die1 === 2 && <FaDiceTwo color='rgb(69,19,28)' />}
              {die1 === 3 && <FaDiceThree color='rgb(69,19,28)' />}
              {die1 === 4 && <FaDiceFour color='rgb(69,19,28)' />}
              {die1 === 5 && <FaDiceFive color='rgb(69,19,28)' />}
              {die1 === 6 && <FaDiceSix color='rgb(69,19,28)' />}
            </h1>
            <h1>
              {die2 === 0 && <FaDice color='rgb(69,19,28)' />}
              {die2 === 1 && <FaDiceOne color='rgb(69,19,28)' />}
              {die2 === 2 && <FaDiceTwo color='rgb(69,19,28)' />}
              {die2 === 3 && <FaDiceThree color='rgb(69,19,28)' />}
              {die2 === 4 && <FaDiceFour color='rgb(69,19,28)' />}
              {die2 === 5 && <FaDiceFive color='rgb(69,19,28)' />}
              {die2 === 6 && <FaDiceSix color='rgb(69,19,28)' />}
            </h1>
          </div>
          {winnerState === true ? <Typography className="game-button-container">The Winner is Player {winnerPlayer}!</Typography> :
            <div>
              {oneHit === false ?
                <div className="game-button-container">
                  <Button type='submit' variant='contained' onClick={() => rollDice()}>Roll Dice</Button>
                  <Button type='submit' variant='contained' onClick={() => hold()}>Hold</Button>
                </div>
                :
                <div className="game-button-container">
                  <Button type='submit' variant='contained' onClick={() => passThePigs()}>Pass the Dice</Button>
                </div>
              }</div>
          }
        </div>
        <div className="player2-side">
          <div className='player-pig-container'>
            <h3>Player 2</h3>
            {currentPlayer === 2 &&
              <FaDice color='rgb(69,19,28)' />
            }

          </div>
          <h2>{player2Score}</h2>
          <div className="current">
            <p>CURRENT</p>
            <p>{currentScore2}</p>
          </div>
        </div>
      </Paper>
      <Button type='submit' variant='contained' onClick={() => setRulesOpen(!rulesOpen)} className='rules'>

        Rules
        {rulesOpen === false ?
          <AiOutlineArrowDown /> :
          <AiOutlineArrowUp />
        }
      </Button>

      {rulesOpen &&
        <Paper className="paper-two">
          <Typography>
            1. The goal of the game is to be the first player to reach 100 points.
          </Typography>
          <Typography>
            2. During your turn, you earn points by rolling the dice. Points from your turn can be added to your overall point total using the Hold button.
          </Typography>
          <Typography>
            3. The dice are passed if either dice roll a '1.'
          </Typography>
          <Typography>
            4. Will you be a player who goes for 100 in one turn, or the player who conservatively increments their score?
          </Typography>
        </Paper>
      }

    </div >
  )
}