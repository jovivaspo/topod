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
import Checkout from './components/Checkout';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51KSjXRKB2XXJmSdX0b2HtJSIAqpe0ZBRESIgtD6lXJsPPLwFsGxf0sYZq87nugeAJtabZOU9IQui9IqsFrPj5cJY00WXcP2Unq")


function App() {
  const user = useSelector(state => state.user)
  const audioPlayer = useSelector(state => state.audioPlayer)
  const options = {
   
    clientSecret: process.env.REACT_APP_CLIENT_SECRET_STRIPE,
  };


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/playlist' element={<PlayList />} />
            <Route path='/donaciones' element={
              <Elements stripe={stripePromise} >
                <Checkout />
              </Elements>
            } />
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
