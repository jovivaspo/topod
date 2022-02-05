import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import NavBar from './components/NavBar';
import { StateProvider } from './context/stateContext';
import PlayList from './pages/PlayList';
import {useSelector} from 'react-redux'
import Login from './pages/Login';

function App() {
  const user = useSelector(state => state.user)
 
  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <div className="App">
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/playlist' element={<PlayList />} />
            </Routes>
          </Router>
        </div>
      </StateProvider>
    </ThemeProvider>

  );
}

export default App;
