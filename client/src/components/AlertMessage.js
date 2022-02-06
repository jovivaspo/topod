import React, { useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { SearchContext } from '../context/SearchContext';
import { Snackbar } from '@material-ui/core'

const AlertMessage = () => {
    const { alert, initialAlert, setAlert } = useContext(SearchContext)
   
    
    const handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert(initialAlert)
    }

    return (
        
            <Snackbar open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
            >
                <MuiAlert onClose={handleClose}
                elevation={10}
                variant='filled'
                severity={alert.type}
                >{alert.message}</MuiAlert>
            </Snackbar>
         
    );
   
}

export  {AlertMessage}

