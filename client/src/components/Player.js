import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'
import { Slider } from '@material-ui/core';
import secondsToString from '../services/secondToString';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../actions/audioPlayerActions';

const useStyles = makeStyles(() => ({
    audioPanel:{
        position: 'absolute',
        bottom: 20,
        width: '100%',
      

        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        margin:10,
        textAlign:'center'
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
    }

}))

const Player = () => {

    const classes = useStyles()
    const audio = useRef()
    const audioPlayer = useSelector(state => state.audioPlayer)
    const dispatch = useDispatch()

    const [currentTime, setCurrentTime] = useState(0)
    console.log(audioPlayer)
    const duration = parseInt(audioPlayer?.currentSong?.duration)



    const handlerPlay = () => {

        const prevState = audioPlayer.isPlaying

       // audio.current.paused ? audio.current.play() : audio.current.pause()
        prevState === false ? audio.current.play() : audio.current.pause()
        
        dispatch(playSong(!prevState))

    }

    const handleProgress = (value) => {
        let compute = (value * duration)
        setCurrentTime(compute)
        audio.current.currentTime = compute
    }
   

    return (
        audioPlayer.currentSong && <div  className={classes.audioPanel}>
            <p className={classes.title}>{audioPlayer.currentSong.title}</p>
            <div className={classes.audio} >
                <audio ref={audio} type="audio/mpeg" 
                onTimeUpdate={(e)=>setCurrentTime(e.target.currentTime)}
                preload='true'
                autoPlay
                src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${audioPlayer.currentSong.id}`}
                
                
                />
                <button className={classes.button} onClick={handlerPlay}>{!audioPlayer.isPlaying ? <FaPlay /> : <FaPause />}</button>
                <div className={classes.time}>{secondsToString(Math.floor(currentTime))}</div>
                <progress value={duration ? (currentTime * 100) / duration : 0}
                    max="100"
                    onClick={(e) =>
                        handleProgress(
                            ((e.clientX - e.target.offsetLeft) / e.target.offsetWidth) * 100,
                        )
                    }
                />
                <div className={classes.time}>{secondsToString(Math.floor(duration))}</div>

            </div>

        </div>


    );
};

export default Player;

//src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${id}`}  <source  src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${audioPlayer.currentSong}`} />