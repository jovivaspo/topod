import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={process.env.PUBLIC_URL + 'logo.png'} alt='topod' height='100' onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
          <div>
            {user.userInfo && <Button className={classes.button} href='/playlist'>Playlist</Button>}
            {!user.userInfo ? <ModalLogin /> : <LogOut />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;





