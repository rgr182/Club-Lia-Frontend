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
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { getTareasCalificadas } from '../store/tareasCalificadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { logoutUser } from 'app/auth/store/userSlice';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getPanelInfo } from '../store/panelSlice';
import { getCalendar, openCalendarDialog } from '../store/calendarSlice';
import CalendarDialog from './CalendarDialog';
import UserInfoHeader from '../components/UserInfoHeader';
import LogoutButton from '../components/LogoutButton';
import MuteButton from '../components/MuteButton';
import {isMobile} from 'react-device-detect';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "42px" : "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextCalendar: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "18px" : "13px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[1],
		fontSize: ({ nivel }) => nivel == 2 ? "19px" : "14px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
		wordBreak: 'break-word'
	},
	button: {
		"&:hover": {
			transform: "scale(1.2) translateX(50px)"
		},
		text: "center",
		justifyContent: "left"
	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
	container: {
		marginTop: "-40px",
		paddingTop: "20px",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center",
	},
	paperTitle: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "280px",
		textAlign: "center",
	},
	paperTitleAlta: {
		marginTop: "-90px",
		paddingTop: "20px",
		paddingButton: "40px",
		height: "70px",
		width: "280px",
		textAlign: "center",
	},
	paperCalendar: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "180px",
		textAlign: "center",
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 390,
		border: 1
	},
	scrollAlta: {
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
	scrollCalendar: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 180,
		border: 1,
		paddingBottom: 15
	},
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	avatarContainer: {
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	userIcon: {
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		color: '#FFFFFF',
		borderRadius: 15,
		fontWeight: "bold",
		width: 'full',
		height: 'full',
		textAlign: "center",
		flex: 1,
		borderColor: '#FFD90A',
		borderWidth: 6,
		background: 'rgb(255,231,5)',
		background: 'radial-gradient(circle, rgba(255,231,5,1) 0%, rgba(234,160,0,1) 100%)'
	},
	infoCardsColumnBlue: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		color: '#FFFFFF',
		borderRadius: 15,
		fontWeight: "bold",
		width: 'full',
		height: 'full',
		textAlign: "center",
		flex: 1,
		background: 'rgb(0,58,131,203)',
		background: 'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
	},
	linkCardsColumn: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		textAlign: "center",
		flex: 1,
	},
	calendarPoints: {
		paddingLeft: 5, paddingRight: 5, color: '#FFFFFF',
		borderRadius: 15, fontWeight: "bold", textAlign: "center", 
		borderColor: ({ nivel }) => nivel == 2 ? '#008DCB' : '#FFD90A', 
		borderWidth: 6,
	},
	TextDaysCalendar: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[1],
		fontSize: ({ nivel }) => nivel == 2 ? "12px" : "8px",
		color: 'white',
		textShadow: '1px 1px 1px black',
		text: "center",
		alignSelf: "center",
	},
	TextDaysCalendarAlta: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "18px" : "11px",
		color: 'white',
		textShadow: '1px 1px 1px black',
		text: "center",
		alignSelf: "center",
	},
	listenIcon: {
		fontWeight: "bold",
		fontSize: "25px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	paperNav: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		position: 'relative',

	},
	TextIcons: {
		fontFamily: ({ nivel, theme }) => nivel == 2 ? theme.fonts[2] : theme.fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
		textAlign: "center",
		textTransform: "capitalize"
	},
	imgIcons: {
		width: "100%"
	},
}));

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 16,
	},
}))(Tooltip);

function MisTareas(props) {
	const dispatch = useDispatch();

	const routeParams = useParams();
	var role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
	const calificadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasCalificadas.data);
	const panelInfo = useSelector(({ PreescolarApp }) => PreescolarApp.panel.data);
	const calendarInfo = useSelector(({ PreescolarApp }) => PreescolarApp.calendar.data);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const info = useSelector(({ auth }) => auth.user);
	const audioActividadesPendientes = new Audio("assets/sounds/Actividades Pendientes.mp3");
	const audioActividadesEntregadas = new Audio("assets/sounds/Actividades Entregadas.mp3");
	const audioActividadesCalidicadas = new Audio("assets/sounds/Actividades Calidicadas.mp3");
	const audioCalendarioDeActividades = new Audio("assets/sounds/Calendario de Actividades.mp3");
	const audioMisActividades = new Audio("assets/sounds/Mis Actividades.mp3");
	const audioMimundoLia = new Audio("assets/sounds/Mi Mundo Lia.mp3");
	const audioMisClases = new Audio("assets/sounds/Mis Clases.mp3");
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && info.grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;

	const [loading, setLoading ]= React.useState({
		pendientes : false,
		entregadas : false,
		calificadas : false,
	});
	
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
			'rager',
			'haettenschweilerRegular',
		],
	}

	const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

	const classes = useStyles({ nivel, theme });

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useDeepCompareEffect(() => {
		setLoading({ pendientes : true, entregadas : true, calificadas : true,});
		dispatch(getTareasPendientes()).then(() => {
			setLoading({ pendientes : false});
		});
		dispatch(getTareasEntregadas()).then(() => {
			setLoading({ entregadas : false });
		});
		dispatch(getTareasCalificadas()).then(() => {
			setLoading({ calificadas : false });
		});
		dispatch(getPanelInfo());
		dispatch(getCalendar());
	}, [dispatch, routeParams]);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			console.log("token_exists::");
		} else {
			console.log("token_exists::no");
		}
	}

	function playActividadesPendientes() {
		const promise = audioActividadesPendientes.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playActividadesEntregadas() {
		const promise = audioActividadesEntregadas.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playActividadesCalidicadas() {
		const promise = audioActividadesCalidicadas.play();
		if (promise !== undefined) {
			promise.then(() => { }).catch(error => console.error);
		}
	}
	function playCalendarioDeActividades() {
		const promise = audioCalendarioDeActividades.play();
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
	function playMundolia() {
		audioMimundoLia.play();
	}
	function playMisClases() {
		audioMisClases.play();
	}
	function renderScoreStars(score) {
		if (score >= 9) {
			return (
				<div>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
				</div>
			)
		}
		if (score == 7 || score == 8) {
			return (
				<div>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
				</div>
			)
		}
		if (score <= 6) {
			return (
				<div>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
					<Icon className={clsx(classes.starIcon, "text-center")} style={{ fontSize: 14 }}>star</Icon>
				</div>
			)
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

	return (
		<div className="flex-1" style={{ backgroundImage: `url(${theme.background[nivel]})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
			<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
				{!isMobile && <LogoutButton />}
				<MuteButton/>
				<div className="float flex w-full flex-wrap ">
					<div className="flex w-full md:w-1/2">
						<Button className={clsx(classes.button)} style={{ backgroundColor: 'transparent', textTransform: 'none' }} to={`/apps/landing`} component={Link} type="button" onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisActividades : null}>
							<img className={clsx(classes.img)} src={theme.island1[nivel]} />
							<Typography className={clsx(classes.TextTitle)}>
								{!nivel == 0 ? 'Mis Tareas' : 'Mis Actividades'}
							</Typography>

						</Button>
						{(isMobile && nivel == 0) &&
							<IconButton size="small">
								<Icon className={clsx(classes.listenIcon)} onClick={playMisActividades} >volume_up</Icon>
							</IconButton>
						}
					</div>

					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row" >
						<UserInfoHeader />
					</div>
				</div>
				< div className="w-full pt-28 pb-28 m-20 pr-40 pl-40 items-center justify-center flex-wrap flex-row flex">
					{/* -------------------------- tasks undelivered ------------------------- */}
					<Paper
						elevation={0}
						className={classes.paperNav}
						style={!isMobile ? { width: '150px' } : { paddingBottom: '40' }}
					>
						{nivel != 0 &&
							<div className="flex w-full flex-col text-center">
								<Button

									to='/apps/galaxies/MisGalaxias'
									component={Link}
									type="button"
								>
									<div className="flex flex-col">
										<img className={clsx(classes.imgIcons, "flex w-full p-16")} src="assets/images/preescolar/MisgalaxiasFinal.png" />
										<Typography className={clsx(classes.TextIcons)}>
											Mi Galaxia LIA
									</Typography>
									</div>
								</Button>
							</div>
						}
						<div
							className="flex w-full flex-col text-center"
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMundolia : null}
						>
							<Button
								onClick={redirectMiMundoLia}
								component={Link}
								type="button"
							>
								<div className="flex flex-col">
									<img className={clsx(classes.imgIcons, "flex w-full p-16")} src={theme.island2[nivel]} />
									<Typography className={clsx(classes.TextIcons)}>
										Mi Mundo Lia
									</Typography>
								</div>
							</Button>
							{(isMobile && nivel == 0) &&
								<IconButton size="small">
									<Icon className={clsx(classes.listenIcon)} onClick={playMundolia} >volume_up</Icon>
								</IconButton>
							}
						</div>
						<div
							className="flex w-full flex-col text-center"
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisClases : null}
						>
							<Button
								to={`/apps/sections/calendario`}
								component={Link}
								type="button"
							>
								<div className="flex flex-col">
									<img className={clsx(classes.imgIcons, "flex w-full p-16")} src={theme.island3[nivel]} />
									<Typography className={clsx(classes.TextIcons)}>
										Mis Clases
									</Typography>
								</div>
							</Button>
							{(isMobile && nivel == 0) &&
								<IconButton size="small">
									<Icon className={clsx(classes.listenIcon)} onClick={playMisClases} >volume_up</Icon>
								</IconButton>
							}
						</div>
					</Paper>
					<Paper
						className={nivel == 2 ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
							: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20")}
						elevation={nivel == 2 ? 0 : 3}
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playActividadesPendientes : null}
						>
							<Typography className={clsx(classes.Text, "ml-10")} >
								{nivel == 0 ? 'Actividades Pendientes'
									: nivel == 1 ? 'Tareas Pendientes'
										: 'Mis Tareas Pendientes'}
								{(isMobile && nivel == 0) &&
									<IconButton size="small" style={{ paddingLeft: '5px' }}>
										<Icon className={clsx(classes.listenIcon)} onClick={playActividadesPendientes} >volume_up</Icon>
									</IconButton>
								}
							</Typography>

						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{loading.pendientes ?
									<div className="flex flex-1 items-center justify-center h-96">
										<CircularProgress color="secondary" />
									</div>
									:
									pendientes && pendientes.length > 0 ?
										pendientes.map(row => (
											<>
												{nivel == 1 ?
													<>
														<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
															<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
																<Link to={'/apps/sections/mitarea/' + row.id} >
																	{row.remaining_days > 5 ?
																		<img src={"assets/images/preescolar/tiempo-tareaspendientes.png"} />
																		: row.remaining_days >= 1 ?
																			<img src={"assets/images/preescolar/proxima-tareaspendientes.png"} />
																			:
																			<img src={"assets/images/preescolar/pendientes.png"} />
																	}
																</Link>
															</p>
															<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	{row.name}
																</Typography>
															</p>
															<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	{row.finish_date.slice(0, 10)}
																</Typography>
															</p>
														</div>
													</>
													:
													nivel == 0 ?
														<>
															<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
																<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
																	<Link to={'/apps/sections/mitarea/' + row.id} >
																		{row.remaining_days > 5 ?
																			<img src={"assets/images/preescolar/tiempo-tareaspendientes.png"} />
																			: row.remaining_days >= 1 ?
																				<img src={"assets/images/preescolar/proxima-tareaspendientes.png"} />
																				:
																				<img src={"assets/images/preescolar/pendientes.png"} />
																		}
																	</Link>
																</p>
																<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																	<Typography className={clsx(classes.TextInfo)}>
																		{row.name}
																	</Typography>
																</p>
																<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																	<Typography className={clsx(classes.TextInfo)}>
																		{row.finish_date.slice(0, 3)}{months[row.finish_date.slice(3, 5) - 1]}
																	</Typography>
																</p>
															</div>
														</>
														:
														<>
															<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
																<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
																	<Link to={'/apps/sections/mitarea/' + row.id} >
																		{row.remaining_days > 2 ?
																			<img src={"assets/images/primariaalta/icons/en-tiempo.png"} />
																			: row.remaining_days >= 1 ?
																				<img src={"assets/images/primariaalta/icons/nota.png"} />
																				:
																				<img src={"assets/images/primariaalta/icons/alerta.png"} />
																		}
																	</Link>
																</p>
																<p className={clsx(classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																	<Typography className={clsx(classes.TextInfo)}>
																		{row.name}
																	</Typography>
																</p>
																<p className={clsx(classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																	<Typography className={clsx(classes.TextInfo)}>
																		{row.finish_date.slice(0, 10)}
																	</Typography>
																</p>
															</div>
														</>
												}
											</>
										))
										:
										<div className="flex flex-1 items-center justify-center h-full">
											<Typography className={clsx(classes.TextInfo)}>
												{!nivel == 0 ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!'}
											</Typography>
										</div>
								}
							</div>
						</List>
					</Paper>

					{/* -------------------------- tasks delivered ------------------------- */}
					<Paper
						className={nivel == 2 ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
							: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20")}
						elevation={nivel == 2 ? 0 : 3}
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playActividadesEntregadas : null}
						>
							<Typography className={clsx(classes.Text)}>
								{nivel == 0 ? 'Actividades Entregadas'
									: nivel == 1 ? 'Tareas Entregadas'
										: 'Mis Tareas Entregadas'}
								{(isMobile && nivel == 0) &&
									<IconButton size="small" style={{ paddingLeft: '5px' }}>
										<Icon className={clsx(classes.listenIcon)} onClick={playActividadesEntregadas} >volume_up</Icon>
									</IconButton>
								}
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{loading.entregadas ?
									<div className="flex flex-1 items-center justify-center h-96">
										<CircularProgress color="secondary" />
									</div>
									:
									entregadas && entregadas.length > 0 ?
										entregadas.map(row => (
											<>
												{nivel != 2 ?
													<>
														<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
															<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
																<Link to={'/apps/sections/mitarea/' + row.id} >
																	<img src="assets/images/preescolar/entregado.png" />
																</Link>
															</p>
															<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	{row.name}
																</Typography>
															</p>
															<p className={clsx(classes.infoCardsColumn)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	Lista
																</Typography>
															</p>
														</div>
													</>
													:
													<>
														<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
															<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
																<Link to={'/apps/sections/mitarea/' + row.id} >
																	{row.on_time == true ?
																		<img src="assets/images/primariaalta/icons/recibida.png" />
																		:
																		<img src="assets/images/primariaalta/icons/fuera-de-tiempo.png" />
																	}
																</Link>
															</p>
															<p className={clsx(classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	{row.name}
																</Typography>
															</p>
															<p className={clsx(classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
																<Typography className={clsx(classes.TextInfo)}>
																	Lista
																</Typography>
															</p>
														</div>
													</>
												}
											</>
										))
										:
										<div className="flex flex-1 items-center justify-center h-full">
											<Typography className={clsx(classes.TextInfo)}>
												{!nivel == 0 ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!'}
											</Typography>
										</div>
								}
							</div>
						</List>
					</Paper>

					{/* -------------------------- tasks qualified ------------------------- */}
					<Paper
						className={nivel == 2 ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
							: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20")}
						elevation={nivel == 2 ? 0 : 3}
						style={{
							backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'transparent',
						}}>

						<div className={nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playActividadesCalidicadas : null}
						>
							<Typography className={clsx(classes.Text)}>
								{nivel == 0 ? 'Actividades Calificadas'
									: nivel == 1 ? 'Tareas Calificadas'
										: 'Mis Tareas Calificadas'}
								{(isMobile && nivel == 0) &&
									<IconButton size="small" style={{ paddingLeft: '5px' }}>
										<Icon className={clsx(classes.listenIcon)} onClick={playActividadesCalidicadas} >volume_up</Icon>
									</IconButton>
								}
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{loading.calificadas ?
									<div className="flex flex-1 items-center justify-center h-96">
										<CircularProgress color="secondary" />
									</div>
									:
									calificadas && calificadas.length > 0 ?
										calificadas.map(row => (
											<>
												<div className=" flex w-full p-4 text-center items-center justify-center" style={{ display: 'table-row' }}>
													<p className={clsx(classes.linkCardsColumn)} style={{ display: 'table-cell', width: '20%', verticalAlign: 'middle', padding: 15 }}>
														{nivel == 2 ?
															<Link to={'/apps/sections/mitarea/' + row.id} >
																{row.score > 7 ?
																	<img src={"assets/images/primariaalta/icons/aprobatoria.png"} />
																	: row.score >= 6 ?
																		<img src={"assets/images/primariaalta/icons/nota-del-maestro.png"} />
																		:
																		<img src={"assets/images/primariaalta/icons/revision-especial.png"} />
																}
															</Link>
															:
															<Link to={'/apps/sections/mitarea/' + row.id} >
																<img src="assets/images/preescolar/miscalificaciones.png" />
															</Link>
														}
													</p>
													<p className={clsx(nivel != 2 ? classes.infoCardsColumn : classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
														<Typography className={clsx(classes.TextInfo)}>
															{row.name}
														</Typography>
													</p>
													<p className={clsx(nivel != 2 ? classes.infoCardsColumn : classes.infoCardsColumnBlue)} style={{ display: 'table-cell', width: '40%', verticalAlign: 'middle' }}>
														<Typography className={clsx(classes.TextInfo)}>
															{role == 'preescolar' ? renderScoreStars(parseFloat(row.score)) : parseFloat(row.score).toFixed(1)}
														</Typography>
													</p>
												</div>
											</>
										))
										:
										<div className="flex flex-1 items-center justify-center h-full">
											<Typography className={clsx(classes.TextInfo)}>
												{!nivel == 0 ? 'No hay tareas Calificadas!' : 'No hay actividades Calificadas!'}
											</Typography>
										</div>
								}
							</div>
						</List>
					</Paper>

					{/* -------------------------- calendar ------------------------- */}
					{nivel == 2 ?
						<Paper
							className={nivel == 2 ? (clsx(classes.container), "w-full max-w-360 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20 mt-80 p-12")
								: (clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/4 sm:w-1/2 flex-col m-20")}
							elevation={nivel == 2 ? 0 : 3}
							style={{
								backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Card.png")` : `url("assets/images/preescolar/Back-tareas.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundColor: 'transparent',
							}}>

							<div className={nivel == 2 ? clsx(classes.paperTitleAlta) : clsx(classes.paperTitle)}
								style={{
									backgroundImage: nivel == 2 ? `url("assets/images/primariaalta/Boton_large.png")` : `url("assets/images/preescolar/tituloback.png")`,
									backgroundPosition: 'center',
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<Typography className={clsx(classes.Text)}>
									{!nivel == 0 ? 'Calendario Semanal de tareas' : 'Calendario Semanal de Actividades'}
								</Typography>
							</div>
							{/* ----------------------------Info inside card-------------------------- */}
							<List className={nivel == 2 ? classes.scroll : classes.scrollAlta} >
								<div className="flex flex-row flex-wrap relative overflow-hidden mt-40">
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Lunes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Martes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Miercoles
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Jueves
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-l-1">
										<Typography className={clsx(classes.TextDaysCalendarAlta)}>
											Viernes
										</Typography>
									</div>

									{calendarInfo &&
										calendarInfo.map(row => (
											< div className=" flex w-1/5 p-3 text-center items-center justify-center flex-col h-full">
												{row && row.dayActivities.length > 0 ?
													<>
														{row.dayActivities && row.dayActivities.map(rows => (
															<LightTooltip title={rows.custom_name} placement="top">
																<p className={clsx(classes.calendarPoints)}
																	style={{
																		backgroundColor: rows.custom_color,
																	}}>

																	<Typography className={clsx(classes.TextDaysCalendar)}>
																		{rows.total}
																	</Typography>
																</p>
															</LightTooltip>
														))}
													</>
													:
													null
												}
											</div>
										))
									}
								</div>
							</List>
						</Paper>
						:
						<Paper
							className={clsx(classes.container), "w-full max-w-200 rounded-8 items-center justify-center flex md:w-1/4 sm:w-1/2 flex-col m-20"}
							elevation={3}
							style={{
								backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',

							}}>

							<div className={clsx(classes.paperCalendar)}
								style={{
									backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
									backgroundPosition: 'center',
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
								}} 
								onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playCalendarioDeActividades : null}
							>
								<Typography className={clsx(classes.TextCalendar)}>
									{!nivel == 0 ? 'Calendario Semanal de tareas' : 'Calendario Semanal de Actividades'}
									{(isMobile && nivel == 0) &&
										<IconButton size="small" style={{ paddingLeft: '5px' }}>
											<Icon className={clsx(classes.listenIcon)} onClick={playCalendarioDeActividades} style={{ fontSize: '22px' }}>volume_up</Icon>
										</IconButton>
									}
								</Typography>
							</div>

							{/* ----------------------------Info inside card-------------------------- */}
							<List className={classes.scrollCalendar} onClick={calendarInfo ? ev => dispatch(openCalendarDialog(calendarInfo)) : null}>
								<div className="flex flex-row flex-wrap relative overflow-hidden">
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1">
										<Typography className={clsx(classes.TextDaysCalendar)}>
											Lunes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendar)}>
											Martes
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendar)}>
											Miercoles
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-r-1 border-l-1">
										<Typography className={clsx(classes.TextDaysCalendar)}>
											Jueves
										</Typography>
									</div>
									<div className=" flex w-1/5 p-3 text-center items-center justify-center border-l-1">
										<Typography className={clsx(classes.TextDaysCalendar)}>
											Viernes
										</Typography>
									</div>

									{calendarInfo &&
										calendarInfo.map(row => (
											< div className=" flex w-1/5 p-3 text-center items-center justify-center flex-col h-full">
												{row && row.dayActivities.length > 0 ?
													<>
														{row.dayActivities && row.dayActivities.map(rows => (
															<p className={clsx(classes.calendarPoints)}
																style={{
																	backgroundColor: rows.custom_color,
																}}>
																<Typography className={clsx(classes.TextDaysCalendar)}>
																	{rows.total}
																</Typography>
															</p>
														))}
													</>
													:
													null
												}
											</div>
										))
									}
								</div>
							</List>
						</Paper>
					}
					<Popover
						open={Boolean(userMenu)}
						anchorEl={userMenu}
						onClose={userMenuClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						classes={{
							paper: 'py-8'
						}}
					>
						<MenuItem onClick={() => { dispatch(logoutUser()); userMenuClose(); }}>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</Popover>
					<CalendarDialog />
				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('PreescolarApp', reducer)(MisTareas);