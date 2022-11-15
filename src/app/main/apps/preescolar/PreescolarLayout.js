import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Preescolar.css';
import { Link, useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import LogoutButton from './components/LogoutButton';
import MuteButton from './components/MuteButton';
import PlayButton from './components/PlayButton';
import Popover from '@material-ui/core/Popover';
import { setRedirect } from '../../../auth/store/redirectSlice';

const useStyles = makeStyles(theme => ({
	Text: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[1] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
		fontWeight: '500',
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)",
		}
	},
	img: {
		animationName: "floating",
		animationDuration: "6s",
		animationIterationCount: "infinite",
		animationTimingFunction: "ease-in-out",
	},
	listenIcon: {

		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	dashboardText: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[1] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "38px" : "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		padding: 15,
	},
	TextIcons: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[1] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
		textAlign: "center",
		textTransform: "capitalize"
	},
	paper: {
		backgroundColor: 'rgb(0, 0, 0, 0.8)',
		'& .MuiPopover-paper': {
			['@media (max-width: 960px)']: {
				marginTop: '0px',
			},
			marginTop: '100px',
			backgroundImage: ({ nivel, theme }) => `url(${theme.background[nivel]})`,
			backgroundPosition: 'center',
			borderRadius: '25px',
		}
	},
	closeButton: {
		position: 'absolute',
		right: '5px',
		color: '#BEBEBE',
		fontWeight: 'bold'
	},
}));


function PreescolarLayout(props) {
	const dispatch = useDispatch();
	var role = useSelector(({ auth }) => auth.user.role);
	const grade = useSelector(({ auth }) => auth.user.grade);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;
	const audioMimundoLia = new Audio("assets/sounds/Mi Mundo Lia.mp3");
	const audioMisClases = new Audio("assets/sounds/Mis Clases.mp3");
	const audioMisActividades = new Audio("assets/sounds/Mis Actividades.mp3");
	const audioDashboard = new Audio("assets/sounds/Dashboard.mp3");

	const theme = {
		background: [
			'assets/images/preescolar/BackgroundPreescolar.png',
			'assets/images/preescolar/pantalla12.png',
			'assets/images/preescolar/BackgroundPrimariaAlta.png'
		],
		island1: [
			'assets/images/preescolar/explorer2.png',
			'assets/images/preescolar/explorer.png',
			'assets/images/preescolar/MisTareasPLANETA.png'
		],
		island2: [
			'assets/images/preescolar/islaMundoLIA.png',
			'assets/images/preescolar/comunicacion.png',
			'assets/images/preescolar/MiMundoLIA.png'
		],
		island3: [
			'assets/images/preescolar/artes2.png',
			'assets/images/preescolar/artes.png',
			'assets/images/preescolar/MisClases.png'
		],
		fonts: [
			'grobold',
			'haettenschweilerRegular',
		],
	}

	const classes = useStyles({ nivel, theme });
	const [width, setWidth] = useState(window.innerWidth);
	const [device, setDevice] = useState(false);
	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	function playMundolia() {
		const promise = audioMimundoLia.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playMisClases() {
		const promise = audioMisClases.play();

		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playMisActividades() {
		const promise = audioMisActividades.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playDashboard() {
		const promise = audioDashboard.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}

	const history = useHistory();
	function redirectMiMundoLia() {
		if (nivel == 0) {
			window.location.href = process.env.REACT_APP_API.split('api')[0] + "lia-kinder";
		} else {
			history.push('/loginp');
		}
	}

	useEffect(() => {
		const updateWindowDimensions = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
			if (newWidth < '1170') {
				setDevice(true);
			}
			else {
				setDevice(false);
			}

			console.log("updating Width");

		};

		window.addEventListener("resize", updateWindowDimensions);
		return () => window.removeEventListener("resize", updateWindowDimensions)

	}, []);


	return (
		<div
			className="flex flex-1"
			style={{
				backgroundImage: `url(${theme.background[nivel]})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<FuseAnimateGroup
				className="flex flex-wrap p-64"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<LogoutButton />
				<MuteButton />
				<PlayButton />

				{/* -----------------------Mis Tareas/Mis Actividades------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button disableRipple className={clsx(classes.button)} style={{ backgroundColor: 'transparent', zIndex: 1 }} to={`/apps/sections/mistareas`} component={Link} type="button">
						<img src={theme.island1[nivel]} />
					</Button>
					<Button disableRipple style={{ backgroundColor: 'transparent', zIndex: 3, textTransform: 'none' }} to={`/apps/sections/mistareas`} component={Link} color="secondary" onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisActividades : null}>
						<Typography className={clsx(classes.Text)}>
							{!nivel == 0 ? 'Mis Tareas' : 'Mis Actividades'}
						</Typography>
					</Button>
					{isMobile && nivel == 0 ? (
						<Button style={{ backgroundColor: 'transparent' }} onClick={playMisActividades}>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
					) : null}
				</div>

				{/* -----------------------Mundo Lia----------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center" raised>
					{nivel == 0 ?
						<>
							<Button disableRipple className={clsx(classes.button)} style={{ backgroundColor: 'transparent', zIndex: 1 }} onClick={redirectMiMundoLia} component={Link} type="button">
								<img src={theme.island2[0]} alt="logo" />
							</Button>
							<Button disableRipple style={{ backgroundColor: 'transparent', zIndex: 3, textTransform: 'none' }} onClick={redirectMiMundoLia} component={Link} type="button" onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMundolia : null}>
								<Typography className={clsx(classes.Text)}>Mi Mundo Lia</Typography>
							</Button>
							{isMobile &&
								<Button style={{ backgroundColor: 'transparent' }} onClick={playMundolia}>
									<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
								</Button>
							}
						</>
						:
						<>
							<Button id="mundoLia" disableRipple className={clsx(classes.button)} style={{ backgroundColor: 'transparent', zIndex: 1 }} onClick={userMenuClick} type="button">
								<img src={theme.island2[nivel]} alt="logo" />
							</Button>
							<Button disableRipple style={{ backgroundColor: 'transparent', zIndex: 3, textTransform: 'none' }} type="button" onClick={userMenuClick}>
								<Typography className={clsx(classes.Text)}>Mi Mundo Lia</Typography>
							</Button>
						</>
					}
				</div>

				{/* -----------------------Mis Clases----------------------- */}
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button disableRipple className={clsx(classes.button)} style={{ backgroundColor: 'transparent', zIndex: 1 }} component={Link} type="button" to={`/apps/sections/calendario`}>
						<img src={theme.island3[nivel]} alt="logo" />
					</Button>
					<Button disableRipple style={{ backgroundColor: 'transparent', zIndex: 3, textTransform: 'none' }} to={`/apps/sections/calendario`} component={Link} type="button" onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisClases : null}>
						<Typography className={clsx(classes.Text)}>{'Mis Clases'}</Typography>
					</Button>
					{isMobile && nivel == 0 ? (
						<Button disableRipple style={{ backgroundColor: 'transparent' }} onClick={playMisClases}>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
					) : null}
				</div>

				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col items-center justify-center flex-1">
					<Button disableRipple justifyContent="center" className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
							backgroundImage: `url("assets/images/preescolar/ButtonLIA.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							textTransform: 'none'
						}}
						to={`/apps/sections/miscore`}
						component={Link}
						onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playDashboard : null}
						type="button"
					>
						<Typography className={clsx(classes.dashboardText)}>Dashboard</Typography>
					</Button>
					{isMobile && nivel == 0 ? (
						<Button disableRipple style={{ backgroundColor: 'transparent' }} onClick={playDashboard}>
							<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
						</Button>
					) : null}
				</div>
			</FuseAnimateGroup>

			<Popover
				open={Boolean(userMenu)}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'center',
				}}
				classes={{ paper: 'py-8' }}
				className={classes.paper}
			>
				<div className=" flex w-full flex-wrap my-8">
					<div className="float sm:w-1/2 md:w-1/3 w-full text-center">
						<Button
							to='/apps/galaxies/MisGalaxias'
							component={Link}
							type="button"
						>
							<div className="flex flex-col">
								<img className="flex w-320 p-40" src="assets/images/preescolar/MisgalaxiasFinal.png" />
								<Typography className={clsx(classes.TextIcons)}>
									Mi Galaxia LIA
								</Typography>
							</div>
						</Button>
					</div>
					<div className="float sm:w-1/2 md:w-1/3 w-full text-center">
						<Button
							to={`/loginp`}
							component={Link}
							type="button"
							onClick={ev => dispatch(setRedirect("experienciaslia"))}
						>
							<div className="flex flex-col">
								<img className="flex w-320 p-40 py-32" src={'assets/images/preescolar/islas-experiencias.png'} />
								<Typography className={clsx(classes.TextIcons)}>
									Experiencias LIA
								</Typography>
							</div>
						</Button>
					</div>
					<div className="float sm:w-1/2 md:w-1/3 w-full text-center">
						<Button
							to='/apps/sections/miscursos'
							component={Link}
							type="button"
						>
							<div className="flex flex-col">
								<img className="flex w-320 p-40 py-32" src={'assets/images/preescolar/cursos-isla.png'} />
								<Typography className={clsx(classes.TextIcons)}>
									Mis Cursos
								</Typography>
							</div>
						</Button>
					</div>
					<IconButton className={classes.closeButton} onClick={userMenuClose}>
						<Icon>close</Icon>
					</IconButton>
				</div>
			</Popover>
		</div>
	);
}

export default PreescolarLayout;
