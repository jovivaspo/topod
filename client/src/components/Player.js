import { makeStyles } from '@material-ui/styles';
import React, {useContext, useRef} from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'
import { Slider } from '@material-ui/core';
import { StateContext } from '../context/stateContext';

const useStyles = makeStyles(() => ({
    audioPanel: {

        position: 'absolute',
        bottom: 20,
        width: '300px',
        left: '50%',
        marginLeft: -150,

        display: 'flex',
        justifyContent:'center',
        alignItems:'center'


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

    const { isPlaying,song, setIsPlaying } = useContext(StateContext)

    const classes = useStyles()

    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const audioPlayer = useRef()

    const handlerPlayer = () => {
        console.log('pulse')
        const prevValue = isPlaying
        setIsPlaying(!prevValue)
        if (!prevValue) {
            audioPlayer.current.src =`${process.env.REACT_APP_URL_API}/api/podcasts/single/${song}`
            audioPlayer.current.play()
        } else {
            audioPlayer.current.pause()
        }
    }
    
    console.log(audioPlayer);
    return (
        <div className={classes.audioPanel} >
            <audio ref={audioPlayer}  >
                <source type="audio/mpeg" src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${song}`}/>
            </audio>
            <button className={classes.button} onClick={handlerPlayer}>{!isPlaying ? <FaPlay /> : <FaPause />}</button>
            <div className={classes.time}>0</div>
            <Slider className={classes.range} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            <div className={classes.time}>0</div>

        </div>

    );
};

export default Player;

//src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${id}`}