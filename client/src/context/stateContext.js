import { createContext, useState } from 'react'

const StateContext = createContext()

const StateProvider = ({ children }) => {
    const initialAlert = {
        open: false,
        type: '',
        message: ''
    }
    const songLocalStorage = localStorage.getItem('song') ? JSON.parse(localStorage.getItem('song')) :  ''
    const [alert, setAlert] = useState(initialAlert)
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    const [song, setSong] = useState(songLocalStorage)
    const [isPlaying, setIsPlaying] = useState(false)

    const data = { alert, setAlert, initialAlert, loading, setLoading, videos, setVideos, song, setSong, isPlaying, setIsPlaying }

    return (
        <StateContext.Provider value={data}>{children}</StateContext.Provider>
    )
}

export { StateContext, StateProvider }