import React from 'react';
import TableList from '../components/TableList';
import { usePlayList } from '../useHooks/usePlayList';


const PlayList = () => {

  const { podcasts } = usePlayList()
 

  console.log(podcasts)


  return (
    <>
      <h2 style={{margin:24,
      fontWeight:'bold'
      }}>Your PlayList</h2>
      {podcasts && <TableList podcasts={podcasts} />}
     
    </>
  );
};

export default PlayList;

