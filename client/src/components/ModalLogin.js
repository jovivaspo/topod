import React, { useState } from 'react';
import { makeStyles, Modal, AppBar, Tabs, Tab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import FormLogin from './FormLogin';


const useStyles = makeStyles((theme) => ({
    button:{
        fontWeight: 'bold', 
        marginTop:10,
        fontSize:12
      },
    paper: {
        //position: 'absolute',
        width: 370,
        top: '20%',
        margin: ' 150px auto',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const ModalLogin = () => {

    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    return <>
        <Button className={classes.button} color="inherit" onClick={handleOpen}>Iniciar Sesión</Button>
        <Modal
            open={open}
            onClose={handleClose}
        ><Fade in={open}>
                <div className={classes.paper}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant='fullWidth'>
                            <Tab label="Login" style={{ fontWeight: 600, fontSize:12 }} />
                            <Tab label="Registrate" style={{ fontWeight: 600, fontSize:12 }} />
                        </Tabs>
                        {<FormLogin value={value} setValue={setValue} handleClose={handleClose} />}
                    </AppBar>
                </div>
            </Fade></Modal>
    </>;
};

export default ModalLogin;
