import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button} from '@material-ui/core';
import secondsToString from '../services/secondToString';
import { timeAgo } from '../services/ago';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GetAppIcon from '@material-ui/icons/GetApp';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaylist, loadSong, playSong } from '../actions/audioPlayerActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import fileDownload from 'js-file-download'
import { helpHttp } from '../services/helpHttp';
import { GlobalContext } from '../context/GlobalContext'
import { urls } from '../services/urlApi';



const useStyles = makeStyles((theme) => ({
  container: {
    width: '90vw',
    margin: '0 auto',
    marginTop: 30,

  },
  table: {
    minWidth: 650
  },
 
  cell: {
    paddingLeft: 8,
    border: 'none',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      padding: 4,
      paddingLeft: 6

    },
  },
  cellHead: {
    fontWeight: 600,
    paddingLeft: 8,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: 4,
      paddingLeft: 6

    },
  }
}));

const TableList = ({ podcasts }) => {
  const classes = useStyles();
  const { setAlert, setLoading } = useContext(GlobalContext)
  const audioPlayer = useSelector(state => state.audioPlayer)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  //console.log(audioPlayer)

  const handlerSong = (id, title, duration) => {
  
    if (id === audioPlayer?.currentSong?.id) {
      if (audioPlayer.isPlaying === true) {
        dispatch(playSong(false))
      } else {
        dispatch(playSong(true))
      }
    } else {
      dispatch(loadSong(id, title, duration))
      dispatch(playSong(true))
    }

  }

  const handlerDownload = (id, title) => {
    setLoading(true)
    setAlert({
      open: true,
      type: 'warning',
      message: 'Iniciando descarga'
    })
  
    fetch(`${urls().DOWNLOAD}${id}`, {
      headers: {
        responseType: 'blob',
        Authorization: `Bearer ${user.userInfo.token}`
      }
    })
      .then(response => {
        //console.log(response)
        if (!response.ok) {
          let error = new Error('Ocurrió un error al descargar')
          throw error
        }
        else return response.blob()
      })
      .then(data => {
       // console.log(data)
        if (!data || data.type === "application/json") {
          let error = new Error('Ocurrió un error al descargar')
          throw error
        } else {
          setAlert({
            open: true,
            type: 'success',
            message: 'Descargando archivo'
          })
          fileDownload(data, `${title}.mp3`)
        }
      })
      .catch(error => {
        setAlert({
          open: true,
          type: 'error',
          message: error.message
        })
      })

      setLoading(false)
  }



  const handlerDelete = (id, podcastId) => {
    const currentSong = JSON.parse(localStorage.getItem('currentSong'))
    if (currentSong) {
      if (podcastId === currentSong.id) {
        dispatch(loadSong())
      }
    }

    setAlert({
      open: true,
      type: 'warning',
      message: 'Borrando Podcast'
    })

    setLoading(true)

    helpHttp().del(`${urls().DELETE}${id}`, {
      headers: {
        Authorization: `Bearer ${user.userInfo.token}`
      }
    })
      .then(res => {
        //console.log(res)
        if (res.error) {
          setAlert({
            open: true,
            type: 'error',
            message: res.error
          })
          return false
        }
        setLoading(false)
        dispatch(loadPlaylist(user))
        setAlert({
          open: true,
          type: 'success',
          message: res.message
        })
      })

  }



  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cellHead}>#</TableCell>
            <TableCell className={classes.cellHead}>Título</TableCell>
            <TableCell className={classes.cellHead} align="right">Reproducir</TableCell>
            <TableCell className={classes.cellHead} align="right">Descargar</TableCell>
            <TableCell className={classes.cellHead} align="right">Eliminar</TableCell>
            <TableCell className={classes.cellHead} align="right">Duración</TableCell>
            <TableCell className={classes.cellHead} align="right">Fecha incorporación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {podcasts.map((el, index) => (
            
            <TableRow key={index} style={{
              backgroundColor:
                audioPlayer?.currentSong?.id === el.podcastId ? "rgba(205,167,87)" : "transparent",
              borderBottom: 'solid 1px white'

            }}>
              <TableCell className={classes.cell} component="th" scope="row">
                {index}
              </TableCell>
              <TableCell className={classes.cell} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>{<img src={el.img} height='40' width='50' />} <h5>{el.title}</h5></TableCell>
              <TableCell className={classes.cell} align="right"><Button onClick={() => handlerSong(el.podcastId, el.title, el.duration)}>{
                (audioPlayer?.currentSong?.id === el.podcastId && audioPlayer?.isPlaying) ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />
              }</Button></TableCell>
              <TableCell className={classes.cell} align="right"><Button onClick={() => handlerDownload(el.podcastId, el.title)}><GetAppIcon /></Button></TableCell>
              <TableCell className={classes.cell} align="right"><Button onClick={() => handlerDelete(el.id, el.podcastId)}><DeleteForeverIcon /></Button></TableCell>
              <TableCell className={classes.cell} align="right">{secondsToString(el.duration)}</TableCell>
              <TableCell className={classes.cell} align="right">{timeAgo(el.date, 'es')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
