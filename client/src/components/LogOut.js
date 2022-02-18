import { useDispatch } from "react-redux"
import { logout} from "../actions/userActions"
import {reset} from '../actions/audioPlayerActions'
import {Link} from 'react-router-dom'



const LogOut = () => {
   
   
    const dispatch = useDispatch()

    return (
      <Link style={{textDecoration: 'none', fontWeight:'bold'}} to='/' onClick={() => {
        dispatch(logout())
        dispatch(reset())
      }}>Cerrar Sesión</Link>
    )
  }

  export default LogOut