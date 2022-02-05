import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { theme } from '../theme';
import {useSearch} from '../useHooks/useSearch'
const useStyles = makeStyles((theme)=>({
    home_form:{
        width:'80vw',
        margin:'0 auto',
        padding:50
    },

    search:{
        color:theme.palette.text.primary
    }

}))


const Search = () => {
    const {search,handleChange, handleSubmit} = useSearch()
    const classes = useStyles()

  return (
    <form className={classes.home_form} noValidate autoComplete="off" onSubmit={handleSubmit}>
    <TextField className={classes.search} id="standard-basic" label="Search video to convert" color='secondary' fullWidth onChange={handleChange} value={search}/>
  </form>
  )
};

export default Search;
