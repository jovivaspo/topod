import { createContext, useState } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
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


    const data = { alert, setAlert, initialAlert, loading, setLoading, videos, setVideos, duration, setDuration, progress, setProgress }

    return (
        <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }