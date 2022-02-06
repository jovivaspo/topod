import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import TableList from '../components/TableList';
import { useNavigate } from 'react-router-dom';
import { loadPlaylist } from '../actions/audioPlayerActions';

const PlayList = () => {

  const audioPlayer = useSelector(state => state.audioPlayer)
  const user = useSelector(state => state.user)
  const  podcasts  = audioPlayer.playlist
  
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
    <>
      <h2 style={{
        margin: 24,
        fontWeight: 'bold'
      }}>Your PlayList</h2>
      {podcasts && <TableList podcasts={podcasts} />}

    </>
  );
};

export default PlayList;

