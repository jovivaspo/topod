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


    const data = { alert, setAlert, initialAlert, loading, setLoading, videos, setVideos, duration, setDuration }

    return (
        <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }