import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { urls } from '../services/urlApi';

const useStyles = makeStyles((theme) => ({
    backgroud: {
        position: 'relative',
        width: '100%',
        height: '100%',

        backgroundImage: 'url("Background-topodcast.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: 1,
    },
    gradient: {
        position: 'absolute',
        top: 100,
        zIndex: 2,
        width: '100%',
        height: '100%',

        background: ' rgb(67,67,67)',
        background: 'radial-gradient(circle, rgba(67,67,67,0.85) 0%, rgba(0,0,0,0.85) 50%)',

    },
    mainContainer: {
        position: 'absolute',
        top: '270px',
        left: '10%',
        width: '80%',
        zIndex: 3,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },


    title: {
        fontFamily: 'Bebas Neue',
        fontSize: 120,

        [theme.breakpoints.down('xs')]: {
            fontSize: 90

        }
    },

    subtitle: {
        fontFamily: 'Bebas Neue',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20

        }

    },

    containerButtons: {
        marginTop: 22,
        display: 'flex',
        justifyContent: 'center',
        gap: 22,
        [theme.breakpoints.down('xs')]: {
            marginTop: 32

        }
    },

    link: {
        textDecoration: 'none',
        fontSize: 16,
        fontFamily: 'Bebas Neue'
    }

}))

const Home = () => {
    const classes = useStyles()
    const user = useSelector(state => state.user)

    return (
        <>
            <div className={classes.backgroud}></div>
            <div className={classes.gradient}></div>
            <div className={classes.mainContainer}>

                <Typography className={classes.title} variant='h1'>To Podcast</Typography>
                <Typography className={classes.subtitle} variant='h4'>Disfruta escuchando tus vídeos favoritos allá donde vayas</Typography>

                <div className={classes.containerButtons}>
                    <Button variant='outlined'><Link className={classes.link} to='/buscar'>Busca tu vídeo</Link></Button>
                    {!user.userInfo ?
                        <Button variant='outlined'><Link className={classes.link} to='/login'>Registrate</Link></Button> :
                        <Button variant='outlined' disabled><Link className={classes.link} to='/login'>Registrate</Link></Button>
                    }

                </div>
            </div>


        </>

    )
}

export default Home