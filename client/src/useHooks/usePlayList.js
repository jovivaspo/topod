import { useEffect, useState } from "react"
import {helpHttp} from '../services/helpHttp'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const usePlayList = () =>{

const [podcasts, setPodcasts] = useState([])
const user = useSelector(state=>state.user)
const navigate = useNavigate()

const getList=()=>{
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
        setPodcasts(res)
    })
}

useEffect(()=>{
    if(!user.userInfo){
        navigate('/login')
        return false
      }
    getList()
},[])

return {podcasts}
}

export {usePlayList}