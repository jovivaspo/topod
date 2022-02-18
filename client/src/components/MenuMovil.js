import { Button, Toolbar, AppBar, makeStyles, Drawer, List, ListItem } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PaymentIcon from '@material-ui/icons/Payment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from "react-redux";
import LogOut from "./LogOut";

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: theme.palette.primary.main,
        position: 'sticky',
        top: 0,
        zIndex: 99
    },
    menu: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        height: '100vh',
        zIndex: 999,
        width: '75vw',
        transition: 'all 0.5s ease'

    },
    menuItem: {
        borderBottom: 'solid 1px white',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        height: 60,
        cursor: 'pointer',
    },
    title: {
        fontSize: 28,
        margin: 20
    },
    link: {
        textDecoration: 'none',
        width:'75%',
        display:'flex',
        gap:30,
        fontWeight:'bold',
    }
}))

const MenuMovil = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.user)
    const menuRef = useRef()

   
    const handlerOpen = () => {
        setOpen(!open)
    }

    useEffect(()=>{

        const handlerClickOutside = (e) => {
           
                if(e.target!==menuRef.current && open){
                    setOpen(false)
                }
            }
        
        document.addEventListener('click',handlerClickOutside)

        return () => {
            document.removeEventListener('click',handlerClickOutside)
        }
    })

    return (
        <>
            <AppBar className={classes.appbar} position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <img src={process.env.PUBLIC_URL + 'logo.png'} alt='topod' height='100' onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                    <Button onClick={handlerOpen}><MenuIcon /></Button>
                </Toolbar>
            </AppBar>
            <div className={classes.menu} ref={menuRef} style={{
                transform: open ? 'translate(0,0)' : 'translate(-200%,0)'
            }}>
                <h3 className={classes.title}>ToPod</h3>
                <List >

                    {!user.userInfo && <ListItem className={classes.menuItem}>
                        <Link className={classes.link} to='/login' onClick={handlerOpen}>
                            <VpnKeyIcon /><span>Iniciar sesión</span>
                        </Link></ListItem>}

                    <ListItem className={classes.menuItem}>
                        <Link className={classes.link} to='/' onClick={handlerOpen}>
                            <SearchIcon /><span>Buscar Vídeo</span>
                        </Link></ListItem>

                    {user.userInfo && <ListItem className={classes.menuItem} onClick={handlerOpen}>
                        <Link className={classes.link} to='/Playlist'>
                            <MusicNoteIcon /><span>Ver Playlist</span>
                        </Link></ListItem>}

                     <ListItem className={classes.menuItem} onClick={handlerOpen}>
                        <Link className={classes.link} to='/Donaciones'>
                            <PaymentIcon /><span>Donaciones</span>
                        </Link></ListItem>

                    {user.userInfo &&
                     <ListItem className={classes.menuItem} onClick={handlerOpen}>
                         <ExitToAppIcon/><span style={{marginLeft:10}}><LogOut/></span>
                        </ListItem>
}

                </List>
            </div>


        </>

    )
}

export default MenuMovil