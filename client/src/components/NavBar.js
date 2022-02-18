import React, { useEffect,useState } from 'react';
import MenuDesktop from './MenuDesktop';
import MenuMovil from './MenuMovil';


const NavBar = () => {

  const [device,setDevice]  = useState()


  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 600px)")
    console.log(mediaQuery)
    mediaQuery.matches? setDevice('movil') : setDevice('desktop')
  },[])

  return (
    device === 'movil' ? <MenuMovil/> : <MenuDesktop/> 
  )
}

export default NavBar;
