import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import NavBar from "./components/NavBar";
import PlayList from "./pages/PlayList";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Player from "./components/Player";
import Checkout from "./components/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Seacher from "./pages/Seacher";
import NotFound from "./pages/NotFound";
import TermsConditions from "./pages/TermsConditions";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";

const stripePromise = loadStripe(
  "pk_live_51KSjXRKB2XXJmSdXfIfj4CqsaC1uydEgtRS7u9NvV02Pe1kVxlDd3YJgI86b8TgNe30GpjVDD8eyq2Li5NwOqmBi00rwyZw1ML"
);

function App() {
  const user = useSelector((state) => state.user);
  const audioPlayer = useSelector((state) => state.audioPlayer);
  const options = {
    clientSecret: process.env.REACT_APP_CLIENT_SECRET_STRIPE,
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Seacher />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/terminos-y-condiciones"
              element={<TermsConditions />}
            />
            <Route path="/politica-privacidad" element={<Privacy />} />
            {
              user.userInfo && <>
               <Route path="/playlist" element={<PlayList />} />
               <Route path="/perfil" element={<Profile/>}/>
               <Route
              path="/donaciones"
              element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              }
            />
              </>
            }
          
            <Route path="*" element={<NotFound />} />
          </Routes>
          {user.userInfo &&
            audioPlayer?.currentSong?.id &&
            audioPlayer?.playlist?.length > 0 && <Player />}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
