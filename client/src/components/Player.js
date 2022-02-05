import { makeStyles } from '@material-ui/styles';
import React from 'react';


const useStyles = makeStyles(()=>({
    playerPanel:{
        position:'absolute',
        bottom:0,
        width:'100vw',
        height: '120px',
        backgroundColor:'black'
    },
    audio:{
        display:'block',
        margin:'0 auto',
        marginTop:'55px',
        maxWidth:600,
        minWidth:300,
        height:45

    }
}))
const Player = ({id}) => {
    const classes = useStyles()
    return (<div className={classes.playerPanel}>
        <audio controls className={classes.audio}>
            <source  />
        </audio>
    </div>);
};

export default Player;

//src={`${process.env.REACT_APP_URL_API}/api/podcasts/single/${id}`}