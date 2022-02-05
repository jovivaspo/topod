import { createContext, useState } from 'react'

const StateContext = createContext()

const StateProvider = ({ children }) => {
    const initialAlert = {
        open: false,
        type: '',
        message: ''
    }
    const [alert, setAlert] = useState(initialAlert)
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])

    const data = { alert, setAlert, initialAlert, loading, setLoading, videos, setVideos }

    return (
        <StateContext.Provider value={data}>{children}</StateContext.Provider>
    )
}

export { StateContext, StateProvider }