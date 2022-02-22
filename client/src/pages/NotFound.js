import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    title: {
        textAlign: 'center',
        fontSize: 32,
        marginTop: 32,
        color: theme.palette.text.secondary
    },
}))

const NotFound = () => {
    const classes = useStyles()
  return (
    <h2 className={classes.title}>Not Found</h2>
    
  )
}

export default NotFound