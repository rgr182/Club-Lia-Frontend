import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { getPanelInfo } from '../store/panelSlice';
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { openAvatarLayout } from 'app/store/fuse/avatarSlice';
import Avatar from '@material-ui/core/Avatar';
import { setRedirect, getPHPFoxUrl } from '../../../../auth/store/redirectSlice';
import LogoutButton from '../components/LogoutButton';
import {isMobile} from 'react-device-detect';
import IconButton from '@material-ui/core/IconButton';
import MuteButton from '../components/MuteButton';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontSize: "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextLeft: {
		fontSize: "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "left",
		alignSelf: "flex-start",
		paddingLeft: 5
	},
	TextSubtitle:{
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "32px" : "26px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	yellowIcons: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "38px" : "28px",
		color: 'yellow',
	},
	buildIcon:{
		fontSize: "40px",
		color:'white',
	},
	button: {
		"&:hover": {
			transform: "scale(1.2)"
		},
		text: "center",
	},
	logoLia:{
		maxHeight: "10%",
		maxWidth: "10%",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
		display: 'inline',
		paddingLeft: 10

	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
		display: 'inline',
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
		backgroundColor: 'rgba(255, 255, 255, .9)',

	},
	paperTitle: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 550,
		height: 550,
		border: 1,
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
	},
	card: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 620,
		height: 620,
		border: 0,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
	},
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	avatarContainer: {
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	userIcon:{
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',												
		borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
	},
	channelIcon: {
		maxHeight: 60,
		maxWidth: 60,
	}, 
	TextChannel: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[1],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
	},
	avatarLeft: {
		width: 80,
		height: 80,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '80%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	},
	customBadge: {
		backgroundColor: "#8a02b0",
		color: "white", 
	  },
	TextTitleAlta: {
		fontFamily:  ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "38px" : "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		padding: 8,
	},
	textBlue:{
		fontWeight: "bold",
		fontSize: "28px",
		color: "#064d9e"
	},
	buttonLarge: {
		height: "70px",
		width: "300px",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		flexDirection: 'row'
	},
	yellowIconsAlta:{
		fontSize: "28px",
		color: 'yellow',
		margin: 8,
	},
	listenIcon: {
		fontWeight: "bold",
		fontSize: "28px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	listenIconNoShadow: {
		fontWeight: "bold",
		fontSize: "18px",
		color: 'white',
	},
}));

function MiScore(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const user = useSelector(({ auth }) => auth.user);
	var role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
	const panelInfo = useSelector(({ PreescolarApp }) => PreescolarApp.panel.data);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ;
	const typeUser = escuelabaja || role== 'preescolar' ? 'escuelabaja' : 'escuelaalta';
	const audioMisHerramientas = new Audio("assets/sounds/Mis Herramientas.mp3");
	const audioMisRecursosLIA = new Audio("assets/sounds/Mis Recursos LIA.mp3");
	const audioCanalLIA = new Audio("assets/sounds/Canal LIA.mp3");
	const audioLIAUniversity = new Audio("assets/sounds/LIA University.mp3");
	const audioMisGrupos = new Audio("assets/sounds/Mis Grupos.mp3");
	const audioClasesEnVivo = new Audio("assets/sounds/Clases en Vivo.mp3");
	const audioMimundoLia = new Audio("assets/sounds/Mi Mundo Lia.mp3");
	const audioMisClases= new Audio("assets/sounds/Mis Clases.mp3");
	const audioMisActividades = new Audio("assets/sounds/Mis Actividades.mp3");
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && info.grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar'? 0 : 1 ;

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
            `'grobold', 'rager'`,
            'rager',
            'haettenschweilerRegular',
        ],
	}

    const classes = useStyles({nivel, theme});

	useDeepCompareEffect(() => {
		dispatch(getPHPFoxUrl());	
		dispatch(getPanelInfo());
		dispatch(getTareasPendientes());
		dispatch(getTareasEntregadas());
	}, [dispatch, routeParams]);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			console.log("token_exists::");
		} else {
			console.log("token_exists::no");
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

	function playMisHerramientas() {
		const promise = audioMisHerramientas.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
	function playMisRecursosLIA() {
		const promise = audioMisRecursosLIA.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
	function playCanalLIA() {
		const promise = audioCanalLIA.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
	function playLIAUniversity() {
		const promise = audioLIAUniversity.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
	function playMisGrupos() {
		const promise = audioMisGrupos.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
	function playClasesEnVivo() {
		const promise = audioClasesEnVivo.play();
        if (promise !== undefined) {
            promise.then(() => { }).catch(error => console.error);
        }
	}
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

	switch (typeUser) {
		case 'escuelabaja': {
			return (
				<div className="flex-1" style={{backgroundImage: `url("assets/images/preescolar/BackDashboard1.png")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
					<FuseAnimateGroup className="flex flex-wrap" enter={{animation: 'transition.slideUpBigIn'}}>
						{ !isMobile && <LogoutButton/>}
						<MuteButton />
						< div className="w-full h-full pt-80 items-center justify-center flex-wrap flex-row flex flex-1 h-full">
							{/* -------------------------- Mis Tareas Section ------------------------- */}
							<div className={clsx(classes.container), "w-full items-center justify-center flex md:w-1/3 sm:w-1/2 flex-col p-12"}>
								<List className={classes.scroll} >
									<Link to="/apps/sections/mistareas" onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMisActividades : null }>
										<img className={clsx(classes.img)} src={ theme.island1[nivel] } />
										<Typography className={clsx(classes.TextTitle)}>
											{!nivel == 0 ? 'Mis Tareas' : 'Mis Actividades'}
										</Typography>
										
									</Link>
									{ (isMobile && nivel == 0) &&
										<IconButton size="small">
											<Icon className={clsx(classes.listenIcon)} onClick={playMisActividades} >volume_up</Icon>
										</IconButton>
									}
									<div className="flex  flex-wrap p-12 relative overflow-hidden flex-row w-full pb-60">
										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={pendientes ? pendientes.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >error_outline</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Pendientes
											</Typography>
										</div>

										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={entregadas ? entregadas.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >check</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Realizadas
											</Typography>
										</div>

										<div className="w-1/3 flex-col items-center justify-center flex" >
											<Badge badgeContent={panelInfo ? panelInfo.score.length : '0'} classes={{ badge: classes.customBadge }} showZero>
												<Icon className={clsx(classes.yellowIcons)} >star</Icon>
											</Badge>
											<Typography className={clsx(classes.Text)}>
												Calificadas
											</Typography>
										</div>
									</div>
									{nivel != 0 && 
										<>

									<div className="flex flex-wrap  w-full border-t-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mis-herramientas.png" />
										</div>
										<div className="w-5/8 flex-col items-start justify-center flex p-2" >
											<Button
												underline='hover' 
												onClick={ev => {dispatch(setRedirect("misherramientas")); redirectMiMundoLia();}}
												component={Link}
												disableRipple
												style={{
													backgroundColor: 'transparent',
													textTransform: 'none',
												}}
												onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMisHerramientas : null }
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Herramientas
												</Typography>
											</Button>
											
										</div>
										{ (isMobile && nivel == 0) &&
											<div className="w-1/8 flex-col justify-center flex">
												<IconButton size="small">
													<Icon className={clsx(classes.listenIconNoShadow)} onClick={playMisHerramientas} >volume_up</Icon>
												</IconButton>
											</div>
										}
									</div>
									<div className="flex flex-wrap  w-full border-t-1 border-b-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
										<div className="w-1/4 flex-col items-center justify-center flex" >
											<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_recursoslia.png" />
										</div>
										<div className="w-5/8 flex-col items-start justify-center flex p-2" >
											<Button
												onClick={ev => {dispatch(setRedirect("recursoslia")); ; redirectMiMundoLia();}}
												component={Link}
												disableRipple
												style={{
													backgroundColor: 'transparent',
													textTransform: 'none',
												}}
												onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMisRecursosLIA : null }
											>
												<Typography className={clsx(classes.TextChannel)}>
													Mis Recursos Lia
												</Typography>
											</Button>

										</div>
										{ (isMobile && nivel == 0) &&
											<div className="w-1/8 flex-col justify-center flex" >
												<IconButton size="small">
													<Icon className={clsx(classes.listenIconNoShadow)} onClick={playMisRecursosLIA} >volume_up</Icon>
												</IconButton>
											</div>
										}
									</div>
									</> 
										}
								</List>
							</div>

							{/* -------------------------- Mi Mundo LIA ------------------------- */}
							<div className={clsx(classes.container), "w-full flex md:w-1/3 sm:w-1/2 flex-col p-12"}>
								<List className={classes.scroll} >
									<Link onClick={redirectMiMundoLia} onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMundolia : null }>
										<img className={clsx(classes.img)} src={ theme.island2[nivel] }  />
										<Typography className={clsx(classes.TextTitle)}>
											Mi Mundo Lia
											<img className={clsx(classes.logoLia)} src="assets/images/preescolar/logos/score_logoclublia.png" />
										</Typography>
									</Link>
									{ (isMobile && nivel == 0) &&
										<IconButton size="small">
											<Icon className={clsx(classes.listenIcon)} onClick={playMundolia} >volume_up</Icon>
										</IconButton>
									}
									<div className="flex  flex-wrap p-12 relative overflow-hidden flex-row w-full" style={{ borderBottomColor: "white" }}>
										<div className="w-1/3 flex-col items-center justify-center flex">
											<Avatar className={clsx(classes.avatarLeft, 'avatar')} onClick={ev => dispatch(openAvatarLayout())}
												src={user.data.photoURL && user.data.photoURL !== ''
													? user.data.photoURL
													: " assets/images/preescolar/infoestudiante.png"} >
											</Avatar>
										</div>
										<div className="w-2/3 flex-col items-center justify-center flex">
											<Typography className={clsx(classes.TextSubtitle)}>
												Mi Avatar
											</Typography>
										</div>

										<div className="flex  flex-wrap p-2 relative overflow-hidden flex-row w-full ">
										</div>

										<div className={`flex flex-wrap  w-full border-t-1 mt-16 ${nivel == 0 && 'border-b-1'}`} style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clublia.png" />
											</div>
											<div className="w-5/8 flex-col items-start justify-center flex p-2" >
												<Link to={`/loginp`} onClick={ev => dispatch(setRedirect("onlinelia"))} onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playCanalLIA : null }>
													<Typography className={clsx(classes.TextChannel)}>
														Canal Lia
													</Typography>
												</Link>
											</div>
											{ (isMobile && nivel == 0) &&
												<div className="w-1/8 flex-col justify-center flex">
													<IconButton size="small">
														<Icon className={clsx(classes.listenIconNoShadow)} onClick={playCanalLIA} >volume_up</Icon>
													</IconButton>
												</div>
											}
										</div>
										{ nivel != 0 && 
										<>
											<div className="flex flex-wrap  w-full border-t-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
												<div className="w-1/4 flex-col items-center justify-center flex">
													<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_lia-u.png" />
												</div>
												<div className="w-5/8 flex-col items-start justify-center flex p-2">
													<Link to="/logina" onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playLIAUniversity : null } >
														<Typography className={clsx(classes.TextChannel)}>
															LIA U
														</Typography>
													</Link>
												</div>
												{ (isMobile && nivel == 0) &&
													<div className="w-1/8 flex-col justify-center flex" >
														<IconButton size="small">
															<Icon className={clsx(classes.listenIconNoShadow)} onClick={playLIAUniversity} >volume_up</Icon>
														</IconButton>
													</div>
												}
											</div>
											<div className="flex flex-wrap  w-full border-t-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
												<div className="w-1/4 flex-col items-center justify-center flex">
													<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_misgrupos.png" />
												</div>
												<div className="w-5/8 flex-col items-start justify-center flex p-2" >
													<Link onClick={ev => {dispatch(setRedirect("misgrupos")); redirectMiMundoLia();}} onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMisGrupos : null } >
														<Typography className={clsx(classes.TextChannel)}>
															Mis Grupos
														</Typography>
													</Link>
												</div>
												{ (isMobile && nivel == 0) &&
													<div className="w-1/8 flex-col justify-center flex" >
														<IconButton size="small">
															<Icon className={clsx(classes.listenIconNoShadow)} onClick={playMisGrupos} >volume_up</Icon>
														</IconButton>
													</div>
												}
											</div>
											<div className="flex flex-wrap  w-full border-t-1 border-b-1"
												style={{ borderTopColor: "white", borderBottomColor: "white" }}>
												<div className="w-1/4 flex-col items-center justify-center flex" >
													<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_misgalaxias.png" />
												</div>
												<div className="w-5/8 flex-col items-start justify-center flex p-2" >
													<Link to="/apps/galaxies/MisGalaxias" >
														<Typography className={clsx(classes.TextChannel)}>
															Mi Galaxia LIA
														</Typography>
													</Link>
												</div>
											</div>
										</> 
										}
									</div>
								</List>
							</div>


							{/* -------------------------- Mis Clases Section ------------------------- */}
							<div className={clsx(classes.container), "w-full flex md:w-1/3 sm:w-1/2 flex-col p-12"}>
								<List className={classes.scroll} >
									<Link to="/apps/sections/calendario" onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playMisClases : null }>
										<img className={clsx(classes.img)} src={ theme.island3[nivel] } />
										<Typography className={clsx(classes.TextTitle)}>
											Mis Clases
										</Typography>
									</Link>
									{ (isMobile && nivel == 0) &&
										<IconButton size="small">
											<Icon className={clsx(classes.listenIcon)} onClick={playMisClases} >volume_up</Icon>
										</IconButton>
									}

									<div className=" flex flex-wrap flex-col w-full mb-10 mt-10 items-center justify-center pb-80">
									</div>

									<div className="flex  flex-wrap  relative overflow-hidden flex-col w-full  items-center justify-center mt-28">
										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white"}}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clases-envivo.png" />
											</div>
											<div className="w-5/8 flex-col items-start justify-center flex p-2" >
												<Link to={"/apps/sections/calendario"} onMouseEnter={ nivel == 0 && !isMobile && !isMuted ? playClasesEnVivo : null }>
													<Typography className={clsx(classes.TextChannel)}>
														Clases en vivo
													</Typography>
												</Link>
											</div>
											{ (isMobile && nivel == 0) &&
												<div className="w-1/8 flex-col justify-center flex" >
													<IconButton size="small">
														<Icon className={clsx(classes.listenIconNoShadow)} onClick={playClasesEnVivo} >volume_up</Icon>
													</IconButton>
												</div>
											}
										</div>
									</div>
								</List>
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			);
		}
		case 'primariaalta':
		default: {
			return (
				<div className="flex-1" style={{backgroundImage: `url("assets/images/primariaalta/fondoDashboard.png")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
					<FuseAnimateGroup className="flex flex-wrap" enter={{animation: 'transition.slideUpBigIn'}}>
					<LogoutButton/>
						< div className="w-full h-full pt-80 items-center justify-center flex-wrap flex-row flex flex-1 h-full">
							{/* -------------------------- Mis Tareas Section ------------------------- */}
							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">
								<div className={classes.paperTitle}>
									<Link to="/apps/sections/mistareas" className="items-center justify-center" >
										<img className={clsx(classes.img)} src={ theme.island1[nivel] } />
										<div className="mb-16" style={{backgroundImage: `url("assets/images/primariaalta/Boton.png")`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mis Tareas'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"} elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}>

									<div className={clsx(classes.card)}>
										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full">
											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={pendientes ? pendientes.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >error_outline</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Pendientes
												</Typography>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={entregadas ? entregadas.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >check</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Realizadas
												</Typography>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Badge badgeContent={panelInfo ? panelInfo.score.length : '0'} classes={{ badge: classes.customBadge }} showZero>
													<Icon className={clsx(classes.yellowIcons)} >star</Icon>
												</Badge>
												<Typography className={clsx(classes.TextTitle)}>
													Calificadas
												</Typography>
											</div>

										</div>
											<div className="flex flex-wrap  w-full border-t-1 mt-60" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
												<div className="w-1/4 flex-col items-center justify-center flex">
													<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_mis-herramientas.png" />
												</div>
												<div className="w-3/4 flex-col items-start justify-center flex p-2">
													<Button
														underline='hover'
														to={ `/loginp`} 
														onClick={ev => dispatch(setRedirect("misherramientas"))}
														component={Link}
														disableRipple
														style={{
															backgroundColor: 'transparent',
															textTransform: 'none',
														}}
													>
														<Typography className={clsx(classes.TextChannel)}>
															Mis Herramientas
														</Typography>
													</Button>
												</div>
											</div>
											<div className="flex flex-wrap  w-full border-t-1 border-b-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
												<div className="w-1/4 flex-col items-center justify-center flex">
													<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_recursoslia.png" />
												</div>
												<div className="w-3/4 flex-col items-start justify-center flex p-2">
													<Button
														onClick={ev => {dispatch(setRedirect("recursoslia")); redirectMiMundoLia();}}
														component={Link}
														disableRipple
														style={{
															backgroundColor: 'transparent',
															textTransform: 'none',
														}}>
														<Typography className={clsx(classes.TextChannel)}>
															Mis Recursos Lia
														</Typography>
													</Button>
												</div>
											</div>
									</div>
								</Paper>
							</div>

							{/* -------------------------- Mi Mundo LIA ------------------------- */}
							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">
								<div className={classes.paperTitle}>

									<Link onClick={redirectMiMundoLia} className="items-center justify-center" >
										<img className={clsx(classes.img)} src={ theme.island2[nivel] }  />
										<div className="mb-16"
											style={{
												backgroundImage: `url("assets/images/primariaalta/Boton.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mi Mundo Lia'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper
									className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"}
									elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}
								>
									<div className={clsx(classes.card)}>
										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full">
											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8 justify-center"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Link onClick={ev => {dispatch(setRedirect("misgrupos")); redirectMiMundoLia();}}>
													<Typography className={clsx(classes.TextTitle)}>
														Mis Grupos
													</Typography>
												</Link>
											</div>

											<div className="flex flex-wrap p-12 relative overflow-hidden flex-row w-full mb-8 justify-center"
												style={{
													backgroundImage: `url("assets/images/primariaalta/Boton_large.png")`,
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
												}}>
												<Link onClick={ev => dispatch(openAvatarLayout())} >
													<Typography className={clsx(classes.TextTitle)}>
														Mi Avatar
													</Typography>
												</Link>
											</div>
										</div>

										<div className="flex flex-wrap  w-full border-t-1 mt-16" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex">
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clublia.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to={`/loginp`} onClick={ev => dispatch(setRedirect("onlinelia"))}>
													<Typography className={clsx(classes.TextChannel)}>
														Canal Lia
													</Typography>
												</Link>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1" style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex">
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_lia-u.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/logina" >
													<Typography className={clsx(classes.TextChannel)} >
														LIA U
													</Typography>
												</Link>
											</div>
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_misgalaxias.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/apps/galaxies/MisGalaxias" >
													<Typography className={clsx(classes.TextChannel)} >
														Mi Galaxia LIA
													</Typography>
												</Link>
											</div>
										</div>

									</div>
								</Paper>
							</div>

							{/* -------------------------- Mis Clases ------------------------- */}
							<div className="flex w-full md:w-1/4 sm:w-1/2 flex-col items-center justify-center">
								<div className={classes.paperTitle}>
									<Link to="/apps/sections/calendario" className="items-center justify-center" >
										<img className={clsx(classes.img)} src={ theme.island3[nivel] } />
										<div className="mb-16"
											style={{
												backgroundImage: `url("assets/images/primariaalta/Boton.png")`,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
											<Typography className={clsx(classes.TextTitleAlta)}>
												{'Mis Clases'}
											</Typography>
										</div>
									</Link>
								</div>

								<Paper
									className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex flex-col"}
									elevation={0}
									style={{
										backgroundImage: `url("assets/images/primariaalta/cardDashboard.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundColor: 'transparent',
										borderColor: 'transparent'

									}}
								>
									<div className={clsx(classes.card)}>
										<div className="flex flex-wrap p-12 relative overflow-hidden flex-col w-full mt-80">
										</div>
										<div className="flex flex-wrap  w-full border-t-1 border-b-1 mt-80"
											style={{ borderTopColor: "white", borderBottomColor: "white" }}>
											<div className="w-1/4 flex-col items-center justify-center flex" >
												<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/logos/score_clases-envivo.png" />
											</div>
											<div className="w-3/4 flex-col items-start justify-center flex p-2" >
												<Link to="/apps/sections/calendario" >
													<Typography className={clsx(classes.TextChannel)}>
														Clases en vivo
													</Typography>
												</Link>
											</div>
										</div>
									</div>
								</Paper>
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			);
		}
	}
}


export default withReducer('PreescolarApp', reducer)(MiScore);
