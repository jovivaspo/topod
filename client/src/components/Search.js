import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSearch} from '../useHooks/useSearch'
const useStyles = makeStyles((theme)=>({
    home_form:{
        width:'80vw',
        margin:'0 auto',
        padding:50,

        [theme.breakpoints.down('xs')]:{
          width:'95%'
        }
    },

    search:{
      width:'100%',
      margin:8,
      padding:8,
      background:theme.palette.primary.main,
      color:'#fff',
      fontSize:'16px',
      border:'none',
      borderBottom:'solid 2px #CDA757',

     
      '&:focus':{
        outline: 'none',
       
      },

      '&::placeholder':{
        color:'#fff', 
        fontSize:'16px'
      }
    }

}))


const Search = () => {
    const {search,handleChange, handleSubmit} = useSearch()
    const classes = useStyles()

  return (
    <form className={classes.home_form} noValidate autoComplete="off" onSubmit={handleSubmit}>
    <input type='text' className={classes.search} placeholder='Buscador' onChange={handleChange} value={search}/>
  </form>
  )
};

export default Search;
