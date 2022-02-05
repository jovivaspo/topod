import { useContext, useState } from "react"
import { StateContext } from "../context/stateContext"
import { helpHttp } from "../services/helpHttp"


export const useSearch = () => {

    const [search, setSearch] = useState('')
    const {setLoading, setAlert, setVideos} = useContext(StateContext)
   

    const handleChange = (e) => {

        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        helpHttp().get(`${process.env.REACT_APP_URL_API}/api/videos/${search}`) 
        .then(res =>{
            if(res.error){
                setLoading(false)
                setAlert({
                    open:true,
                    type:'error',
                    message:res.error})
                return false
            }
            setLoading(false)
            setVideos(res.videos)
            setSearch('')
        })  
    };

return { search, handleSubmit, handleChange }

}