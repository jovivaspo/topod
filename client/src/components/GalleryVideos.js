import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { StateContext } from '../context/stateContext';
import { Button } from '@material-ui/core';
import { helpHttp } from '../services/helpHttp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import secondsToString from '../services/secondToString'

const useStyles = makeStyles((theme) => ({

    gallery: {
        width: '90vw',
        margin: '0 auto'
    },

    item: {
        display: 'flex',
        margin: '20px',
        borderBottom: 'solid 1px white',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }

    },

    imgMain: {
        maxHeight: '265px'
    },

    columnInfo: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px'
    },

    tags: {
        display: 'flex',
        gap: '20px',
        margin: '10px'
    },

    imgChannel: {
        width: '30px',
        height: '30px',
        borderRadius: '100%',
    },

    button: {
        fontWeight: 'bold',
        paddingButton: '8px'
    }



}))

const GalleryVideos = () => {
    const classes = useStyles()
    const { videos } = useContext(StateContext)
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)
    console.log(user.userInfo)


    const handleConvert = async (video) => {
        if(!user.userInfo){
            navigate('/login')
            return false
        }
        navigate('/playlist')
        helpHttp().post(`${process.env.REACT_APP_URL_API}/api/videos`, {
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${user.userInfo.token}`
            },
            body: {
               
                link: video.link,
                title: video.title,
                img:video.thumbnail,
                userId: user.userInfo.userId,
                duration:video.duration
            }
        })
            .then(res => {
                if (res.error) {
                    alert(res.error)
                    return false
                }

                alert(res.message)

            })


    }


    console.log(videos)
    return <div className={classes.gallery}>
        {
            videos?.map((video, index) => {
                return (
                    <div key={index} className={classes.item}>
                        <img className={classes.imgMain} src={video.thumbnail} alt={video.id} />
                        <div className={classes.columnInfo}>
                            <h3>{video.title}</h3>
                            <p className={classes.tags}><span>{video.views} visulizaciones</span><span>Hace {video.uploaded}</span></p>
                            <p className={classes.tags}><img className={classes.imgChannel} src={video.channel.thumbnail} /><span style={{ paddingTop: 6 }}>{video.channel.name}</span></p>
                            <p className={classes.tags}><span>{video.description}</span></p>
                            <p className={classes.tags} style={{ display: 'flex', justifyContent: 'space-between' }}><span>Duración: {secondsToString(video.duration)}</span></p>
                            <p className={classes.tags}> <span><Button className={classes.button} size="small" variant="contained" color="secondary"
                                onClick={() => handleConvert(video)}
                            >Convertir</Button></span></p>

                        </div>
                    </div>
                )
            })
        }

    </div>;
};

export default GalleryVideos;
