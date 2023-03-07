import { createStore, applyMiddleware } from "redux";
import reducers from "../reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const userStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const songStorage = localStorage.getItem("currentSong")
  ? JSON.parse(localStorage.getItem("currentSong"))
  : null;
const initialStates = {
  user: { userInfo: userStorage },
  audioPlayer: {
    playlist: [],
    currentSong: songStorage,
    isPlaying: false,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
