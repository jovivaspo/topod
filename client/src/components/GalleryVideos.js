import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Button } from '@material-ui/core';
import { helpHttp } from '../services/helpHttp'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import secondsToString from '../services/secondToString'
import { loadPlaylist } from '../actions/audioPlayerActions';
import { urls } from '../services/urlApi';
import io from "socket.io-client"

const useStyles = makeStyles((theme) => ({

    gallery: {
        width: '90vw',
        margin: '0 auto',
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
    const { videos, setDuration, setAlert, setProgress, convert, setConvert } = useContext(GlobalContext)
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    //console.log(user.userInfo)

    const handlerConvert = async (video) => {
        try {
            if (!user.userInfo) {
                navigate('/login')
                return false
            }
            if (convert) {
                setAlert({
                    open: true,
                    type: 'warning',
                    message: 'Espere a que termine el proceso anterior'
                })

                return false
            }
            //  navigate('/playlist')
            /* setDuration(video.duration)
             setAlert({
                 open: true,
                 type: 'warning',
                 message: 'Convirtiendo vídeo...espere por favor'
             })*/
            setConvert(true)

            const { token } = user.userInfo
            video.date = new Date
            const duration = parseInt(video.duration)
          
            const socket = io(process.env.REACT_APP_URL_API_LOCAL, {
                auth: { token },
                query: { duration }
            })

            socket.on("connect_error", (err) => {
                setAlert({
                    open: true,
                    type: 'error',
                    message: err.message
                })
            });

            socket.on("message_converting", message => {
                setAlert({
                    open: true,
                    type: 'warning',
                    message
                })
            })

            socket.emit("sending_infovideo", video)

          

            setConvert(false)

           
            /* const res = await helpHttp().post(`${urls().CONVERT}`, {
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${user.userInfo.token}`
                 },
                 body: {
 
                     link: video.link,
                     title: video.title,
                     img: video.thumbnail,
                     userId: user.userInfo.userId,
                     duration: video.duration,
                     date: new Date
                 }
             })*/

            /*   setDuration()
               setProgress(0)
               setConvert(false)
   
               if (res.error) {
                   setAlert({
                       open: true,
                       type: 'error',
                       message: res.error
                   })
   
                   return false
   
               }
   
               setAlert({
                   open: true,
                   type: 'success',
                   message: res.message
               })
               dispatch(loadPlaylist(user))*/

        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Algo salió mal'
            })
        }

    }


    //console.log(videos)
    return (<div className={classes.gallery}>
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
                                onClick={() => handlerConvert(video)}
                            >Convertir</Button></span></p>

                        </div>
                    </div>
                )
            })
        }



    </div>);
};

export default GalleryVideos;
