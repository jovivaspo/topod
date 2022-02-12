import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableList from '../components/TableList';
import { useNavigate } from 'react-router-dom';
import { loadPlaylist } from '../actions/audioPlayerActions';
import { SearchContext } from '../context/SearchContext';
import { LinearProgress } from '@material-ui/core';
import { AlertMessage } from '../components/AlertMessage';
import Progress from '../components/Progress';

const PlayList = () => {
  const { loading, duration } = useContext(SearchContext)
  const audioPlayer = useSelector(state => state.audioPlayer)
  const user = useSelector(state => state.user)
  const podcasts = audioPlayer.playlist


  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if (!user.userInfo) {
      navigate('/login')
      return false
    }
    dispatch(loadPlaylist(user))
  }, [])

  return (
    <div className='playlist'>
      <h2 style={{
        margin: 24,
        fontWeight: 'bold'
      }}>Your PlayList</h2>
      {loading && <LinearProgress color="secondary" style={{ width: '80vw', margin: '0 auto', marginTop: 30, marginBottom: 30 }} />}
      {duration && <Progress duration={duration} />}
      {podcasts && <TableList podcasts={podcasts} style={{ marginBottom: 20 }} />}
      {<AlertMessage />}
    </div>
  );
};

export default PlayList;

