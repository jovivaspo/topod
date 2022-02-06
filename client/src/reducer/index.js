import { combineReducers } from "redux";
import { SongReducer } from "./SongReducer";
import { UserReducer } from "./UserReducer";

const reducers = combineReducers({
    user: UserReducer,
    audioPlayer: SongReducer
})

export default reducers