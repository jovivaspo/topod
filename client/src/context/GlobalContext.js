import { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
    const initialAlert = {
        open: false,
        type: '',
        message: ''
    }
   
    const [alert, setAlert] = useState(initialAlert)
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    const [duration,setDuration] = useState()
    const [progress,setProgress]= useState(0)
    const [convert, setConvert] = useState(false)


    const data = { alert, setAlert, initialAlert, loading, setLoading, videos, setVideos, duration, setDuration, progress, setProgress, convert, setConvert }

    return (
        <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }