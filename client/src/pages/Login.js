import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import FormLogin from '../components/FormLogin';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        margin: '0 auto',
        marginTop: '80px',
        gap: '50px',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            gap: '30px',
        },


    },

    textBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            marginTop: 40,
        },
        [theme.breakpoints.down('xs')]: {
           textAlign:'center',
            marginTop: 10,
        },
    },

    title: {
        textAlign: 'center',
        fontSize:32,
        color:theme.palette.text.secondary
    },
    text:{
        color:theme.palette.text.secondary
    },
    containerForm:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
}))

const Login = () => {
    const [value, setValue] = useState(0)
    const classes = useStyles()
    return (<div className={classes.container}>
        <div className={classes.textBox}>
            <h2 className={classes.title}>To Podcast</h2>
            <p className={classes.text}>Escucha a tus youtubers favoritos desde donde quieras</p>
            <p className={classes.text}>Crea tu playlist y descarga tus podcasts desde la app</p>
            <p className={classes.text}>3 horas de reproducción totalmente gratis</p>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.containerForm}>
            {value === 0 ? <h2 className={classes.title}>Inicia sesión</h2> : <h2 className={classes.title}>Crea una cuenta</h2>}
            <FormLogin value={value} setValue={setValue} />
        </div>

    </div>);
};

export default Login;
