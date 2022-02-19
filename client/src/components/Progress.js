import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
   // console.log(props.value)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '80vw', margin: '0 auto', marginTop: 30 }}>
            <Typography variant="h6" style={{ width: '100%', textAlign: 'center' }}>Convirtiendo vídeo...</Typography>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" color='secondary' {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>

    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function Progress({ duration }) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {

        const completed = Math.round(duration / 11)
        //console.log(duration)
        //console.log(completed)
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : (prevProgress + (100 / completed))))
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={progress} />
        </div>
    );
}
