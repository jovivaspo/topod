import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSong, playSong } from '../actions/audioPlayerActions';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    audioPanel: {
        position: 'fixed',
        bottom: 0,
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.secondary.main,
        background: 'linear-gradient(90deg, rgba(215,197,159,0.9755252442773985) 0%, rgba(205,167,87,1) 43%)',
        paddingBottom: 16

    },
    title: {
        color:theme.palette.text.secondary,
        margin: 10,
        fontWeight:'bold',
        textAlign: 'center'
    },

    audio: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        border: 'solid 1px white',
        width: 40,
        height: 40,
        borderRadius: '100%',
        cursor: 'pointer',
        transition: 'all 0.5s ease',

        "&:hover": {
            backgroundColor: '#302b63',

        }
    },

    time: {
        fontSize: '14px',
        marginLeft: '10px',
        marginRight: '10px'
    },
    range: {
        width: 200
    },

    close:{
        position:'absolute',
        bottom:0,
        right:0,
    }

}))

const Player = () => {

    const classes = useStyles()
    const audio = useRef()
    const audioPlayer = useSelector(state => state.audioPlayer)


    const dispatch = useDispatch()

    const handlerClose=()=>{
        dispatch(playSong(false))
        dispatch(loadSong())
    }


    useEffect(() => {

        audioPlayer?.isPlaying === true ? audio.current.play() : audio.current.pause()

    }, [audioPlayer])


    return (
        <div className={classes.audioPanel}>
            <p className={classes.title}>{audioPlayer.currentSong.title}</p>
            <IconButton className={classes.close} variant='outlined'onClick={handlerClose}><CloseIcon/></IconButton>
            <div className={classes.audio} >
                <audio ref={audio} type="audio/mpeg" style={{ width: 280 }}
                    preload='true'
                    onPlay={() => dispatch(playSong(true))}
                    onPause={() => dispatch(playSong(false))}
                    autoPlay
                    src={`/api/podcasts/single/${audioPlayer.currentSong.id}`}
                    controls />
            </div>

        </div>


    );
};

export default Player;

//src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${id}`}  <source  src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${audioPlayer.currentSong}`} />