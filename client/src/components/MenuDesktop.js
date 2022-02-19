import { AppBar, Toolbar } from "@material-ui/core"
import LogOut from "./LogOut";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: '#000000',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 12
    }
}));

const MenuDesktop = () => {

    const user = useSelector(state => state.user)
    const classes = useStyles();
    const navigate = useNavigate()

    return (<div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={process.env.PUBLIC_URL + 'logo.png'} alt='topod' height='100' onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                <div>
                    {user.userInfo && <Link style={{ textDecoration: 'none', marginRight: 16, fontWeight: 'bold' }} to='/buscar'>Buscar</Link>}
                    {user.userInfo && <Link style={{ textDecoration: 'none', marginRight: 16, fontWeight: 'bold' }} to='/playlist'>Playlist</Link>}
                    {user.userInfo && <Link style={{ textDecoration: 'none', marginRight: 16, fontWeight: 'bold' }} to='/donaciones'>Donaciones</Link>}
                    {user.userInfo && <LogOut />}
                </div>
            </Toolbar>
        </AppBar>
    </div>)
}

export default MenuDesktop