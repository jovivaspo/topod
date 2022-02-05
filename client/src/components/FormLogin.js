import { Button, TextField, Snackbar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { login, register } from '../actions/userActions';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  form: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  input: {
    margin:8,
  },

  button:{
    fontWeight: 'bold', 
    marginTop:10,
    fontSize:12
  }
}))

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const initialAlert = {
  open: false,
  type: '',
  message: ''
}

const FormLogin = ({ value, setValue }) => {
  const classes = useStyles()
  const [form, setForm] = useState(initialForm)
  const [alert, setAlert] = useState(initialAlert)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(initialAlert)
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === 0) { //Inicio de sesión
      if (form.email === '' || form.password === '') {
        setAlert({
          open: true,
          type: 'error',
          message: 'Completa todos los campos'
        })
        return false

      }

      dispatch(login(form, setAlert, setForm, initialForm))
      setTimeout(()=>{
        navigate('/playlist')
      },1000)


    } else {
      if (form.password !== form.confirmPassword) {
        setAlert({
          open: true,
          type: 'error',
          message: 'Las contraseñas no coinciden'
        })
        return false
      }
      if (form.email === '' || form.password === '' || form.name === '') {
        setAlert({
          open: true,
          type: 'error',
          message: 'Completa todos los campos'
        })
        return false
      }

      dispatch(register(form, setAlert, setForm, initialForm))
      setTimeout(()=>{
        navigate('/playlist')
      },1000)
    }
  }


  return <div>
    <form className={classes.form} onSubmit={handleSubmit}>
      {value === 1 && (<TextField label="Name" className={classes.input} type='text' name='name' placeholder='Nombre' value={form.name} variant="outlined" onChange={handleChange} />)}
      <TextField  className={classes.input} type='email' name='email' placeholder='Email' value={form.email} variant="outlined" onChange={handleChange} />
      <TextField  className={classes.input} type='password' name='password' placeholder='Contraseña' variant="outlined" value={form.password} onChange={handleChange} />
      {value === 1 && (<TextField label="Password" className={classes.input} type='password' name='confirmPassword' placeholder='Contraseña' variant="outlined" value={form.confirmPassword} onChange={handleChange} />)}
      <Button size='small' className={classes.button} type='submit' variant="contained" color="secondary" onSubmit={handleSubmit}>{value === 0 ? 'Iniciar Sesión' : 'Registrate'}</Button>
      {value===0? (
        <>
        <p style={{
          margin:'0 auto',
          padding:14,
          fontSize:14
        }}>¿Eres nuevo?</p>
        <Button size='small' className={classes.button}  variant='outlined' onClick={()=>setValue(1)} >Crea una cuenta</Button>
        </>
        
      ) :

      (  <>
        <p style={{
          margin:'0 auto',
          padding:14,
          fontSize:14
        }}>¿Ya tienes cuenta?</p>
        <Button size='small' className={classes.button}  variant='outlined' onClick={()=>setValue(0)} >Inicia sesión</Button>
        </>)
    
    
    }
      <Snackbar open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose}
          elevation={10}
          variant='filled'
          severity={alert.type}
        >{alert.message}</MuiAlert>
      </Snackbar>
    </form>
  </div>;
};

export default FormLogin;
