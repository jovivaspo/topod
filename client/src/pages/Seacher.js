import React, { useContext } from 'react';
import Search from '../components/Search';
import { LinearProgress, makeStyles } from '@material-ui/core';
import { SearchContext } from '../context/SearchContext'
import { AlertMessage } from '../components/AlertMessage'
import GalleryVideos from '../components/GalleryVideos';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 32,
    color: theme.palette.text.secondary
  },
}))

const Seacher = () => {
  const classes = useStyles()
  const { loading } = useContext(SearchContext)
  return (
    <div className='home'>
      <h2 className={classes.title}>Busca tu vídeo</h2>
      <Search />
      {loading && <LinearProgress color="secondary" style={{ width: '80vw', margin: '0 auto' }} />}
      {<GalleryVideos />}
      {<AlertMessage />}
    </div>
  );
};

export default Seacher