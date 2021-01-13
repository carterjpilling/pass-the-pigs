import React, { useState, useEffect } from 'react'
import { Paper, Button, Typography } from '@material-ui/core'
import './Game.css'
// import { BiDice1, BiDice2, BiDice3, BiDice4, BiDice5, BiDice6 } from 'react-icons/bi'
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDice } from 'react-icons/fa'
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

  // const [dice1, setDice1] = useState(FaDice)
  // const [dice2, setDice2] = useState(FaDice)

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

  // useEffect(() => {
  //   console.log(dice1, 'beginning')
  //   const FaDice = 0
  //   const FaDiceOne = 1
  //   const FaDiceTwo = 2
  //   const FaDiceThree = 3
  //   const FaDiceFour = 4
  //   const FaDiceFive = 5
  //   const FaDiceSix = 6

  //   switch (die1) {
  //     case FaDice:
  //       setDice1(FaDice)
  //       break
  //     case FaDiceOne:
  //       setDice1(FaDiceOne)
  //       break
  //     case FaDiceTwo:
  //       setDice1(FaDiceTwo)
  //       break
  //     case FaDiceThree:
  //       setDice1(FaDiceThree)
  //       break
  //     case FaDiceFour:
  //       setDice1(FaDiceFour)
  //       break
  //     case FaDiceFive:
  //       setDice1(FaDiceFive)
  //       break
  //     case FaDiceSix:
  //       setDice1(FaDiceSix)
  //       break
  //     default:
  //       return null
  //   }

  //   console.log(dice1, 'end')

  // }, [die1])

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

    setDie1(0)
    setDie2(0)

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
          <div className='player-pig-container'>
            <h3>Player 1</h3>
            {currentPlayer === 1 &&
              <GiPig color='rgb(69,19,28)' />
            }
          </div>
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
          <div className='player-pig-container'>
            <h3>Player 2</h3>
            {currentPlayer === 2 &&
              <GiPig color='rgb(69,19,28)' />
            }

          </div>
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