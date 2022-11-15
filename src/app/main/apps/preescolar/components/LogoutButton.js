import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { logoutUser } from 'app/auth/store/userSlice';
import Button from '@material-ui/core/Button';
import '../Preescolar.css';
import { isMobile } from 'react-device-detect';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        width: '125px',
        "&:hover": {
            transform: "scale(1.2)",
        }
    },
    logoutButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 4,
    },
    listenButton: {
        position: 'absolute',
        top: '120px',
        right: '48px',
        zIndex: 4,
    },
    listenIcon: {
		fontSize: "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
}));

export default function LogoutButton() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const role = useSelector(({ auth }) => auth.user.role);
    const isPreescolar = role == 'preescolar' ? true : false;
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
    const audioSalir = new Audio("assets/sounds/Salir.mp3");

    function playSalir() {
		const promise = audioSalir.play();

		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}

    return (
        <>
        <div className={clsx(classes.logoutButton, "float")} >
            <Button
                disableRipple
                className={clsx(classes.button)}
                style={{
                    backgroundColor: 'transparent',
                }}
                type="button"
                onClick={() => { dispatch(logoutUser()); }}
                onMouseEnter={isPreescolar && !isMobile && !isMuted ? playSalir : null}
            >
                <img src="assets/images/preescolar/logoutLia.png" alt="logo" />
            </Button>
        </div>
        {isMobile && isPreescolar ? (
            <div className={clsx(classes.listenButton, "float")} >
                <Button disableRipple style={{ backgroundColor: 'transparent' }} onClick={playSalir}>
                    <Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
                </Button>
            </div>
		) : null}
        </>
    )
}
