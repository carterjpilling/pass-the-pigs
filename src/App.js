import Game from './Components/Game'
import ReactGA from 'react-ga';


ReactGA.initialize('G-TK3CEES8CS')

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
