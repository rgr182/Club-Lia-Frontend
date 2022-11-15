import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
	backButton: {
        backgroundColor: '#fff',
        color: 'rgb(0,58,131,203)',
		position: 'fixed',
		left: 12,
		bottom: 12,
		zIndex: 99,
        '&:hover':{
            backgroundColor: 'rgba(167,187,223)',
        },
        '& .MuiIcon-root': {
            fontSize: '36px',
        }
	}
}));

export default function BackButton(props) {
    const classes = useStyles();

    return (
        <FuseAnimate animation="transition.expandIn" delay={300}>
            <Fab
                color='primary'
                aria-label="add"
                className={classes.backButton}
                onClick={env => props.goBack()}
            >
                <Icon>{'chevron_left'}</Icon>
            </Fab>
        </FuseAnimate>
    )
}
