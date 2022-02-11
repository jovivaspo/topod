import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import NavBar from './components/NavBar';
import PlayList from './pages/PlayList';
import { useSelector } from 'react-redux'
import Login from './pages/Login';
import Player from './components/Player'

function App() {
  const user = useSelector(state => state.user)
  const audioPlayer = useSelector(state => state.audioPlayer)


  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/playlist' element={<PlayList />} />
          </Routes>
          {user.userInfo
            &&
            audioPlayer?.currentSong?.id
            &&
            (audioPlayer?.playlist?.length > 0)
            &&
            <Player />}
        </Router>
      </div>

    </ThemeProvider>

  );
}

export default App;
