import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { logout } from '../actions/userActions';
import { reset } from '../actions/audioPlayerActions';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: theme.palette.primary.main
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 12
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  //console.log(user)

  const LogOut = () => {
    return (
      <Button className={classes.button} onClick={() => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }}>Cerrar Sesión</Button>
    )
  }

  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 600px)")
    console.log(mediaQuery)
    mediaQuery.matches? console.log('movil') : console.log('desktop')
  },[])

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={process.env.PUBLIC_URL + 'logo.png'} alt='topod' height='100' onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
          <div>
            {user.userInfo && <Link style={{textDecoration:'none'}} to='/playlist'><Button className={classes.button}>Playlist</Button></Link>}
            {user.userInfo && <Link style={{textDecoration:'none'}} to='/donaciones'><Button className={classes.button}>Donaciones</Button></Link>}
            {!user.userInfo ? <ModalLogin /> : <LogOut />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
