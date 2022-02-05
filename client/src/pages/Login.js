import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import FormLogin from '../components/FormLogin';

const useStyles = makeStyles((theme)=>({
    container:{
        display:'flex',
        justifyContent:'center',
        width:'90vw',
        margin: '0 auto',
        marginTop:'80px',
        gap:'50px'
    },

    textBox:{
        display:'flex',
        flexDirection:'column',
        gap:20,
        marginTop:40
    },

    title:{
        textAlign:'center'
    }
}))

const Login = () => {
    const [value, setValue] = useState(0)
    const classes = useStyles()
  return (<div className={classes.container}>
      <div className={classes.textBox}>
          <h2 className={classes.title}>ToPod</h2>
          <p className={classes.text}>Escucha a tus youtubers favoritos desde donde quieras</p>
          <p className={classes.text}>Crea tu playlist y descarga tus podcasts desde la app</p>
          <p className={classes.text}>Convierte cualquier video a formtato mp3</p>
      </div>
      <Divider orientation="vertical" flexItem/>
      <div>
          {value===0? <h2>Inicia sesión</h2> : <h2>Crea una cuenta</h2>}
          <FormLogin value={value} setValue={setValue} />
      </div>
      
  </div>);
};

export default Login;
