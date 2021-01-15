import React, { useEffect } from 'react'
import Game from './Components/Game'
import ReactGA from 'react-ga';


function App() {

  useEffect(() => {
    ReactGA.initialize('UA-185129485-1')
    ReactGA.pageview('/');

  }, [])
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
