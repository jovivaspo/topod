import { LOAD_SONGS, CURRENT_SONG, PLAYING, RESET } from "../types";


const SongReducer = (state={},action) =>{
    switch(action.type){
        case LOAD_SONGS : {
            return {...state,playlist:action.payload}
        }
        case CURRENT_SONG : {
            return {...state, currentSong:action.payload}
        }
        case PLAYING : {
            return {...state, isPlaying: action.payload}
        }
        case RESET : {
            return {  playlist:[],
                currentSong: null,
                isPlaying:false}
        }
        default:
            return state
    }
}

export {SongReducer}