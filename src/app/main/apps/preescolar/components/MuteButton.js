import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { mute } from 'app/store/fuse/soundSlice';
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        width: '125px',
        "&:hover": {
            transform: "scale(1.2)",
        }
    },
    backButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 4,
    },
    listenIcon: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
}));

export default function MuteButton() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const role = useSelector(({ auth }) => auth.user.role);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const isPreescolar = role == 'preescolar' ? true : false;

    return (
        (!isMobile && isPreescolar) ?
            <div className={clsx(classes.backButton)} >
                <Button
                    disableRipple
                    className={clsx(classes.button)}
                    style={{ backgroundColor: 'transparent' }}
                    type="button"
                    onClick={() => { dispatch(mute()); }}
                >
                    <Icon className={clsx(classes.listenIcon)}>
                        {isMuted ? 'volume_off' : 'volume_up'}
                    </Icon>
                </Button>
            </div>
        :
        <div></div>
    )
}
