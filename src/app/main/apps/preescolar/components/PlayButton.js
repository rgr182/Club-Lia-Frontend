import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { mute } from 'app/store/fuse/soundSlice';
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect';
import Icon from '@material-ui/core/Icon';
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
        right: '80px',
        zIndex: 4,
    },
    listenIcon: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
    TextTitle: {
        color: '#fff',
        fontFamily: ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
        fontSize: ({ nivel }) => nivel == 2 ? '24px' : '18px',
        textShadow: '1px 1px 1px #595959',
        fontWeight: 'normal',
    } ,
}));



export default function PlayButton() {
    //const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
	const handleClose = () => setOpen(false);

    var role = useSelector(({ auth }) => auth.user.role);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const isPreescolar = role == 'preescolar' ? true : false;
    const isSecundaria = role == 'alumno_secundaria' ? true : false;
    const isAlumno = role == 'alumno' ? true : false;

    const grade = useSelector(({ auth }) => auth.user.grade);
    const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
    const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar'? 0 : 1 ;

    const classes = useStyles({ nivel });
    
    //Modal
    const closeIconModal = (
		<svg width="32" height="32" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="43" cy="43" r="43" fill="#545AB7" />
			<path d="M34.9052 23L43.611 31.9589L51.8283 23L61.7779 30.488L51.2509 41.4525L62 52.4617L53.5162 61.5989L43.4334 48.896L35.3493 62L25.2221 53.4868L35.3493 42.0765L25 30.488L34.9052 23Z" fill="white" />
		</svg>
	);

    return (
        (!isMobile) ?
        <>
            <div className={clsx(classes.backButton)} >
                <Button
                    disableRipple
                    className={clsx(classes.button)}
                    style={{ backgroundColor: 'transparent' }}
                    type="button"
                    onClick={onOpenModal}
                >
                    <Icon className={clsx(classes.listenIcon)}>
                        play_circle_outline
                    </Icon>
                </Button>
                
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <AppBar position="static" elevation={1}  >
                    <Toolbar className="flex w-full justify-between">
                        <Typography variant="subtitle1" color="inherit" className={clsx(classes.TextTitle)}>
                            Comunidad LIA 
                        </Typography>
                        <Button style={{ backgroundColor: 'transparent'}} onClick={handleClose}>
                            <Icon className={clsx(classes.TextTitle)}>close</Icon>
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{backgroundColor: '#595959'}}>
                    <video width="700" height="450" controls autoplay="autoplay">
                        {isPreescolar ? <source src="assets/videos/tutorial primaria.mp4" type="video/mp4" /> : null }
                        {isSecundaria ? <source src="assets/videos/tutorial primaria.mp4" type="video/mp4" /> : null }
                        {isAlumno ? <source src="assets/videos/tutorial primaria.mp4" type="video/mp4" /> : null }
                    </video>
                </DialogContent>
            </Dialog>
        </>
        :
        <div></div>
    )
}
