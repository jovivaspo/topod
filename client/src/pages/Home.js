import React, { useContext } from 'react';
import Search from '../components/Search';
import { LinearProgress } from '@material-ui/core';
import {SearchContext} from '../context/SearchContext'
import {AlertMessage} from '../components/AlertMessage'
import GalleryVideos from '../components/GalleryVideos';


const Home = () => {
    const {loading} = useContext(SearchContext)
  return (
      <>
      <Search/>
        { loading && <LinearProgress color="secondary" style={{width:'80vw', margin:'0 auto'}} />} 
        {<GalleryVideos/>}
        {<AlertMessage/>}
      </>
  );
};

export default Home