import React, { useState, useEffect } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import './Game.css'
import { BiDice1, BiDice2, BiDice3, BiDice4, BiDice5, BiDice6 } from 'react-icons/bi'
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

  const [targetScore, setTargetScore] = useState(100)

  const dieArray = [1, 2, 3, 4, 5, 6]

  const [die1, setDie1] = useState(0)
  const [die2, setDie2] = useState(0)

  const [dieSum, setDieSum] = useState(0)

  const [oneHit, setOneHit] = useState(false)

  const [winnerState, setWinnerState] = useState(false)

  useEffect(() => {
    setCurrentPlayer(1)
  }, [])


  useEffect(() => {
    setDieSum(die1 + die2)
    if (die1 === 1 || die2 === 1) {
      console.log('1 hit')
      setOneHit(true)
    }
  }, [die1, die2])

  function rollDice() {
    setDie1(dieArray[Math.floor(Math.random() * dieArray.length)])
    setDie2(dieArray[Math.floor(Math.random() * dieArray.length)])

    if (currentPlayer === 1) {
      setCurrentScore1((currentScore1 + dieSum))
    } else if (currentPlayer === 2) {
      setCurrentScore2((currentScore2 + dieSum))
    }
  }

  let player1
  let player2


  function hold() {
    let score1 = (player1Score + currentScore1)
    let score2 = (player2Score + currentScore2)

    if (currentPlayer === 1) {
      if (player1Score >= targetScore) {
        return winner(player1)
      }
      else {
        console.log('Else Hit', 'Player 1')
        setPlayer1Score(score1)
        setCurrentScore1(0)
        setCurrentPlayer(2)
      }
    }


    if (currentPlayer === 2) {
      if (player2Score >= targetScore) {
        return winner(player2)
      }
      else {
        console.log('Else Hit', 'Player 2')
        setPlayer2Score(score2)
        setCurrentScore2(0)
        setCurrentPlayer(1)
      }
    }
  }

  function newGame() {
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
    } else {
      setCurrentScore2(0)
      setCurrentPlayer(1)
      setOneHit(false)
    }
  }


  function winner() {
    console.log('hit')
    //Make Popup, and a button that says "choose starting player" that sets currentplayer and runs newgame()
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
            <p>{die1}</p>
            <p>{die2}</p>
          </div>
          {oneHit === false ?
            <div>
              <Button type='submit' variant='contained' onClick={() => rollDice()}>Roll Dice</Button>
              <Button type='submit' variant='contained' onClick={() => hold()}>Hold</Button>
              <TextField id="filled-basic" label="Target Score" className="textfield" variant="filled" onChange={(e) => setTargetScore(e.target.value)} />
            </div>

            :
            <div >
              <Button type='submit' variant='contained' onClick={() => passThePigs()}>Pass the Pigs</Button>
            </div>
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