import { CURRENT_SONG, LOAD_SONGS, PLAYING, RESET } from "../types"
import { helpHttp } from "../services/helpHttp"



export const loadPlaylist = (user) => async (dispatch) =>{

        helpHttp().get(`${process.env.REACT_APP_URL_API}/api/podcasts/all/${user.userInfo.userId}`,{
            headers:{
                "Authorization": `Bearer ${user.userInfo.token}`
            }
        })
        .then(res=>{
            if(res.error){
                alert(res.error)
                return false
            }
            console.log(res)
            dispatch({type:LOAD_SONGS,payload:res})
        })
    

}


export const loadSong = (id,title,duration) => async (dispatch) =>{
    dispatch({type:CURRENT_SONG, payload:{id,title,duration}})
    localStorage.setItem('currentSong', JSON.stringify({id,title,duration}))
}

export const playSong = (isPlaying) => async (dispatch) =>{
    dispatch({type:PLAYING, payload:isPlaying})
}

export const reset = () => async (dispatch) => {
    localStorage.removeItem('currentSong')
    dispatch({type:RESET})
}
