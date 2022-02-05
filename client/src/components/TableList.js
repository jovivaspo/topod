import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import secondsToString from '../services/secondToString';
import { timeAgo } from '../services/ago';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GetAppIcon from '@material-ui/icons/GetApp';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';


const useStyles = makeStyles({
  container:{
    width:'90vw',
    margin: '0 auto',
    marginTop:30,

  },
  table: {
    backgroundColor:'#302b63'
  },
});
const TableList = ({podcasts}) => {
  const classes = useStyles();

  return (
    <TableContainer  className={classes.container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Título</TableCell>
            <TableCell align="right">Duración</TableCell>
            <TableCell align="right">Fecha incorporación</TableCell>
            <TableCell align="right">Reproducir</TableCell>
            <TableCell align="right">Descargar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {podcasts.map((el,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell style={{display:'flex', alignItems:'center', gap:16}}>{<img src={el.img} height='40' width='50'/>} <h5>{el.title}</h5></TableCell>
              <TableCell align="right">{secondsToString(el.duration)}</TableCell>
              <TableCell align="right">{timeAgo(el.date,'es')}</TableCell>
              <TableCell align="right"><Button><PlayCircleFilledIcon/></Button></TableCell>
              <TableCell align="right"><Button><GetAppIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
