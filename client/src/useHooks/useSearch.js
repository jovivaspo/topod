import { useContext, useState } from "react"
import { SearchContext } from "../context/SearchContext"
import { helpHttp } from "../services/helpHttp"


export const useSearch = () => {

    const [search, setSearch] = useState('')
    const {setLoading, setAlert, setVideos} = useContext(SearchContext)
   

    const handleChange = (e) => {

        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        helpHttp().get(`/api/videos/${search}`) 
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