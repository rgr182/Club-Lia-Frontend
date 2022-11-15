import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from '@fuse/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { getMiTarea, submitUploadFile, openMiTareaDialog, openResourceDialog } from '../store/miTarea';
import Formsy from 'formsy-react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { logoutUser } from 'app/auth/store/userSlice';
import { downloadFile } from 'app/main/apps/aulaVirtual/store/aulaSlice';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserInfoHeader from '../components/UserInfoHeader';
import LogoutButton from '../components/LogoutButton';
import MuteButton from '../components/MuteButton';
import { isMobile } from 'react-device-detect';
import IconButton from '@material-ui/core/IconButton';
import MiTareaDialog from './MiTareaDialog';
import ResourceDialog from './ResourceDialog';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import 'moment/locale/es';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { FileConfig, validFile } from 'app/utils/FileConfig';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[0]),
		fontSize: ({ nivel }) => (nivel == 2 ? '42px' : '32px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		textTransform: 'capitalize'
	},
	Text: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[0]),
		fontSize: ({ nivel }) => (nivel == 2 ? '30px' : '22px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center'
	},
	TextIcons: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[0]),
		fontSize: ({ nivel }) => (nivel == 2 ? '24px' : '18px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center',
		textAlign: 'center',
		textTransform: 'capitalize'
	},
	TextInfo: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[1]),
		fontSize: ({ nivel }) => (nivel == 2 ? '22px' : '16px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center'
	},
	LabelText: {
		fontSize: '26px',
		color: 'red'
	},
	LabelTextWhite: {
		fontFamily: ({ theme }) => theme.fonts[2],
		fontSize: '34px',
		color: '#fff'
	},
	LabelDue: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[0]),
		fontSize: ({ nivel }) => (nivel == 2 ? '55px' : '45px'),
		color: 'red',
		textAlign: 'center',
		paddingTop: ({ nivel }) => (nivel == 2 ? '17px' : '27px')
	},
	LabelDesc: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[1]),
		fontSize: ({ nivel }) => (nivel == 2 ? '38px' : '28px'),
		color: 'white',
		textShadow: '4px 4px 4px #595959'
	},
	LabelDescNote: {
		fontFamily: ({ nivel, theme }) => (nivel == 2 ? theme.fonts[2] : theme.fonts[1]),
		fontSize: ({ nivel }) => (nivel == 2 ? '38px' : '28px'),
		color: 'white',
		textShadow: '4px 4px 4px #595959',
		marginTop: '-7px'
	},
	LabelDescNote2: {
		fontFamily: 'pangolin',
		fontSize: '36px',
		alignSelf: 'flex-start',
		marginLeft: '20px',
		color: 'red',
	},
	LabelDesc2: {
		fontFamily: 'Consolas',
		fontSize: '16px',
		alignSelf: 'flex-start',
		marginLeft: '20px',
		color: '#353535'
	},
	LabelScore: {
		fontSize: '65px',
		color: 'black'
	},
	LabelScore2: {
		color: 'red'
	},
	LabelScoreWhite: {
		fontFamily: ({ theme }) => theme.fonts[2],
		fontSize: '130px',
		color: '#f2d276'
	},
	starIcon: {
		color: '#f2d276'
	},
	redIcon: {
		color: 'red'
	},
	whiteIcon: {
		color: '#fff'
	},
	button: {
		'&:hover': {
			transform: 'scale(1.2) translateX(50px)'
		},
		justifyContent: 'left'
	},
	img: {
		maxHeight: '20%',
		maxWidth: '20%'
	},
	imgIcons: {
		width: '100%'
	},
	resourceIcons: {
		padding: '10px'
	},
	imgIconsFooter: {
		width: '160px',
		minWidth: '160px',
		marginLeft: '30',
		marginRight: '30'
	},
	container: {
		marginTop: '-40px',
		paddingTop: '20px',
		justifyContent: 'center',
		alignItems: 'center',
		text: 'center',
		textAlign: 'center'
	},
	containerFooter: {
		justifyContent: 'center',
		alignItems: 'center',
		text: 'center',
		textAlign: 'center',
		width: '100%'
	},
	paperTitle: {
		marginTop: '-40px',
		paddingTop: '20px',
		height: '70px',
		width: '280px',
		textAlign: 'center'
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 390,
		height: 390,
		border: 1
	},
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	right: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		textAlign: 'right',
		alignSelf: 'flex-end',
		flexContainer: 'justify-end',
		paddingLeft: '70px',
		paddingRight: '70px'
	},
	userIcon: {
		display: 'flex',
		objectFit: 'cover',
		flexContainer: 'justify-end',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		textAlign: 'right',
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
		paddingLeft: '100px'
	},
	infoCardsColumn: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: '#ECA800',
		color: '#FFFFFF',
		borderRadius: 15,
		fontWeight: 'bold',
		width: 'full',
		height: 'full',
		textAlign: 'center',
		flex: 1,
		borderColor: '#FFD90A',
		borderWidth: 6
	},
	listenIcon: {
		fontWeight: 'bold',
		fontSize: '26px',
		color: 'white',
		textShadow: '2px 2px 2px black'
	},
	listenIconRed: {
		fontWeight: 'bold',
		fontSize: '26px',
		color: 'red'
	},
	listenIconGray: {
		fontWeight: 'bold',
		fontSize: '26px',
		color: 'white',
		textShadow: '2px 2px 2px #595959'
	}
}));

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function MiTarea(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const [fileName, setFileName] = useState('');
	const [selectedFile, setSelectedFile] = useState([]);
	const fileInput = useRef(null);
	const [urlPath, setUrlPath] = useState([]);
	const miTareaDialog = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.miTareaDialog);
	let role = useSelector(({ auth }) => auth.user.role);
	const info = useSelector(({ auth }) => auth.user);
	const isMuted = useSelector(({ fuse }) => fuse.sound.value);
	const homework = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.data);
	const [userMenu, setUserMenu] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sendingHomework, setSendingHomework] = useState(false);
	const [error, setError] = useState('');

	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? (role = 'preescolar') : level_id == 2 ? (role = 'alumno') : (role = 'alumno_secundaria');
	}
	const nivel =
		(role == 'alumno' && info.grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;
	const audioMateria = new Audio('assets/sounds/Materia.mp3');
	const audioVencimiento = new Audio('assets/sounds/Vencimiento.mp3');
	const audioEstatus = new Audio('assets/sounds/Estatus.mp3');
	const audioDescripcion = new Audio('assets/sounds/Descripcion.mp3');
	const audioAdjuntar = new Audio('assets/sounds/Adjuntar.mp3');
	const audioEnviar = new Audio('assets/sounds/Enviar.mp3');
	const audioCalificacion = new Audio('assets/sounds/Calificacion.mp3');
	const audioMiAvatar = new Audio('assets/sounds/Mi avatar.mp3');
	const audioMimundoLia = new Audio('assets/sounds/Mi Mundo Lia.mp3');
	const audioMisClases = new Audio('assets/sounds/Mis Clases.mp3');
	const audioMisActividades = new Audio('assets/sounds/Mis Actividades.mp3');

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
		fonts: [`'grobold', 'rager'`, 'rager', 'haettenschweilerRegular']
	};

	const classes = useStyles({ nivel, theme });

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useEffect(() => {
		setSelectedFile([]);
		setUrlPath([]);
	}, []);

	useDeepCompareEffect(() => {
		dispatch(getMiTarea(routeParams));
	}, [dispatch, routeParams]);

	function handleSubmit() {
		const urlTags = [];
		urlPath.forEach(element => {
			urlTags.push({ value: element.value });
		});

		let fileType = '';
		if (selectedFile.length > 0 && urlPath.length > 0) {
			fileType = 'urlfile';
		} else if (selectedFile.length > 0) {
			fileType = 'file';
		} else {
			fileType = 'url';
		}
		setSendingHomework(true);
		dispatch(submitUploadFile(routeParams, homework, selectedFile, fileType, urlTags)).then(() => {
			setSendingHomework(false);
			setSelectedFile([]);
			setUrlPath([]);
		});
	}

	function requestURL(resource) {
		setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/verifyURL`, {
				params: { src: resource.url_resource }
			})
			.then(response => {
				if (response.data.data == 0) {
					dispatch(openResourceDialog(resource));
				} else {
					window.open(resource.url_resource, '_blank');
				}
				setLoading(false);
			})
			.catch(error => {
				window.open(resource.url_resource, '_blank');
				setLoading(false);
			});
	}

	function getPreeStarsIcons(stars) {
		return (
			<div>
				<Icon className={clsx(classes.starIcon, 'text-center text-40 font-600 mt-4 ml-4')}>star</Icon>
				<Icon className={clsx(classes.starIcon, 'text-center text-40 font-600 mt-4 ml-4')}>star</Icon>
				<Icon className={clsx(classes.starIcon, 'text-center text-40 font-600 mt-4 ml-4')}>star</Icon>
				<Icon className={clsx(classes.starIcon, 'text-center text-40 font-600 mt-4 ml-4')}>
					{stars > 3 ? 'star' : 'star_border'}
				</Icon>
				<Icon className={clsx(classes.starIcon, 'text-center text-40 font-600 mt-4 ml-4')}>
					{stars > 4 ? 'star' : 'star_border'}
				</Icon>
			</div>
		);
	}

	function playMateria() {
		const promise = audioMateria.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playVencimiento() {
		const promise = audioVencimiento.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playEstatus() {
		const promise = audioEstatus.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playDescripcion() {
		const promise = audioDescripcion.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playEnviar() {
		const promise = audioEnviar.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playAdjuntar() {
		const promise = audioAdjuntar.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playCalificacion() {
		const promise = audioCalificacion.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playMiAvatar() {
		const promise = audioMiAvatar.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playMundolia() {
		const promise = audioMimundoLia.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playMisClases() {
		const promise = audioMisClases.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
		}
	}
	function playMisActividades() {
		const promise = audioMisActividades.play();
		if (promise !== undefined) {
			promise.then(() => {}).catch(error => console.error);
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

	const onSelectFile = (e) => {
		const file = e.target.files[0]
		const errorMessage = validFile(FileConfig.studentHomework, file);
		if(!errorMessage) {
			setFileName(file.name);
			setSelectedFile([...selectedFile, file]);
        } else {
			setError(errorMessage);
			setFileName('Error');
        }
	}

	return (
		<div
			className="flex-1"
			style={{
				backgroundImage: `url(${theme.background[nivel]})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}
		>
			<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
				{!isMobile && <LogoutButton />}
				<MuteButton />
				<div className="float flex w-full flex-wrap ">
					<div className="flex w-full md:w-1/2">
						<Button
							className={clsx(classes.button)}
							style={{
								backgroundColor: 'transparent'
							}}
							to="/apps/sections/mistareas"
							component={Link}
							type="button"
							onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisActividades : null}
						>
							<img className={clsx(classes.img)} src={theme.island1[nivel]} />
							<Typography className={clsx(classes.TextTitle)}>
								{!nivel == 0 ? 'Mis Tareas' : 'Mis Actividades'}
							</Typography>
						</Button>
						{isMobile && nivel == 0 && (
							<IconButton size="small">
								<Icon className={clsx(classes.listenIcon)} onClick={playMisActividades}>
									volume_up
								</Icon>
							</IconButton>
						)}
					</div>

					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
						<UserInfoHeader />
					</div>
				</div>
				{homework ? (
					<Grid container className="flex flex-row m-20" spacing={0}>
						{/* -------------------------- grid for islands ------------------------- */}
						<Grid item xs={1} className="flex">
							<Grid container className="flex w-full flex-col" spacing={1}>
								{nivel != 0 && (
									<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
										<Button to="/apps/galaxies/MisGalaxias" component={Link} type="button">
											<div className="flex flex-col">
												<img
													className={clsx(classes.imgIcons, 'flex w-full')}
													src="assets/images/preescolar/MisgalaxiasFinal.png"
												/>
												<Typography className={clsx(classes.TextIcons)}>
													Mi Galaxia LIA
												</Typography>
											</div>
										</Button>
										{isMobile && nivel == 0 && (
											<IconButton size="small">
												<Icon className={clsx(classes.listenIcon)}>volume_up</Icon>
											</IconButton>
										)}
									</Grid>
								)}
								<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
									<Button onClick={redirectMiMundoLia} component={Link} type="button">
										<div
											className="flex flex-col"
											onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMundolia : null}
										>
											<img
												className={clsx(classes.imgIcons, 'flex w-full')}
												src={theme.island2[nivel]}
											/>
											<Typography className={clsx(classes.TextIcons)}>Mi Mundo Lia</Typography>
										</div>
									</Button>
									{isMobile && nivel == 0 && (
										<IconButton size="small">
											<Icon className={clsx(classes.listenIcon)} onClick={playMundolia}>
												volume_up
											</Icon>
										</IconButton>
									)}
								</Grid>
								<Grid item xs={3} className="flex flex-col items-center justify-center max-w-400">
									<Button to="/apps/sections/calendario" component={Link} type="button">
										<div
											className="flex flex-col"
											onMouseEnter={nivel == 0 && !isMobile && !isMuted ? playMisClases : null}
										>
											<img
												className={clsx(classes.imgIcons, 'flex w-full')}
												src={theme.island3[nivel]}
											/>
											<Typography className={clsx(classes.TextIcons)}>Mis Clases</Typography>
										</div>
									</Button>
									{isMobile && nivel == 0 && (
										<IconButton size="small">
											<Icon className={clsx(classes.listenIcon)} onClick={playMisClases}>
												volume_up
											</Icon>
										</IconButton>
									)}
								</Grid>
							</Grid>
						</Grid>
						{/* -------------------------- grid to cards ------------------------- */}
						<Grid item xs={11} className="flex w-full items-center flex-wrap">
							<Grid
								container
								className="flex flex-col flex-wrap items-center pt-28 pb-28 pr-20 w-full"
								spacing={0}
							>
								<Grid item xs={12} className="flex w-full items-center">
									<Grid
										container
										className="flex items-center w-full justify-center flex-row"
										spacing={0}
									>
										<Grid
											item
											xs
											className="flex items-center justify-center flex-col max-w-400 m-20 mb-40"
										>
											{/* -------------------------- tasks undelivered ------------------------- */}
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col mb-20')
												}
												elevation={3}
												style={{
													backgroundImage: `url(${
														nivel == 2
															? 'assets/images/primariaalta/Back-tareas.png'
															: 'assets/images/preescolar/Back-tareas.png'
													})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundColor: 'transparent'
												}}
											>
												<div
													className={clsx(classes.paperTitle)}
													style={{
														backgroundImage: `url(${
															nivel == 2
																? 'assets/images/primariaalta/tituloback.png'
																: 'assets/images/preescolar/tituloback.png'
														} )`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat'
													}}
													onMouseEnter={
														nivel == 0 && !isMobile && !isMuted ? playMateria : null
													}
												>
													<Typography className={clsx(classes.Text)}>
														Materia
														{isMobile && nivel == 0 && (
															<IconButton size="small">
																<Icon
																	className={clsx(classes.listenIcon)}
																	onClick={playMateria}
																>
																	volume_up
																</Icon>
															</IconButton>
														)}
													</Typography>
												</div>
												{/* ----------------------------Info inside card-------------------------- */}
												<div
													className="flex items-center justify-center w-full"
													style={{
														height: 110,
														paddingLeft: 45,
														paddingRight: 45
													}}
												>
													<div
														className="w-full"
														style={
															nivel == 2
																? {
																		paddingLeft: 5,
																		paddingRight: 5,
																		paddingTop: 2,
																		paddingBottom: 2,
																		borderRadius: 30,
																		textAlign: 'center',
																		background: 'rgb(0,58,131,203)',
																		background:
																			'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																  }
																: {
																		backgroundColor: '#FFFFFF',
																		paddingLeft: 5,
																		paddingRight: 5,
																		paddingTop: 2,
																		paddingBottom: 2,
																		borderRadius: 30,
																		textAlign: 'center'
																  }
														}
													>
														<Typography
															className={
																nivel == 2
																	? clsx(classes.LabelTextWhite)
																	: clsx(classes.LabelText)
															}
														>
															{homework.custom_name}
														</Typography>
													</div>
												</div>
											</Paper>
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col')
												}
												elevation={3}
												style={{
													backgroundImage: `url(${
														nivel == 2
															? 'assets/images/primariaalta/Back-tareas.png'
															: 'assets/images/preescolar/Back-tareas.png'
													})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundColor: 'transparent'
												}}
											>
												{/* ----------------------------Info inside card-------------------------- */}
												<div
													className="flex flex-col items-center w-full"
													style={{
														height: 300,
														paddingTop: 10
													}}
												>
													<Typography
														className={clsx(classes.LabelDesc)}
														onMouseEnter={
															nivel == 0 && !isMobile && !isMuted ? playDescripcion : null
														}
													>
														Descripción
														{isMobile && nivel == 0 && (
															<IconButton size="small" style={{ paddingLeft: '5px' }}>
																<Icon
																	className={clsx(classes.listenIconGray)}
																	onClick={playDescripcion}
																>
																	volume_up
																</Icon>
															</IconButton>
														)}
													</Typography>

													{homework.instructions ? (
														<div
															className="w-full"
															style={{
																marginTop: 20,
																height: 200,
																overflowY: 'scroll',
																color: 'white',
																padding: 10,
																fontFamily:
																	nivel == 2 ? theme.fonts[2] : theme.fonts[1],
																fontSize: nivel == 2 ? '28px' : '20px',
																paddingLeft: 40,
																paddingRight: 40
															}}
														>
															{homework.instructions}
														</div>
													) : (
														<div className="flex items-center justify-center h-200 text-center">
															<Typography className={clsx(classes.TextInfo)}>
																No hay instrucciones
															</Typography>
														</div>
													)}
												</div>
											</Paper>
										</Grid>
										{/* -------------------------- tasks delivered ------------------------- */}
										<Grid
											item
											xs
											className="flex items-center justify-center flex-col max-w-400 m-20 mb-40"
										>
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col mb-20')
												}
												elevation={3}
												style={{
													backgroundImage: `url(${
														nivel == 2
															? 'assets/images/primariaalta/Back-tareas.png'
															: 'assets/images/preescolar/Back-tareas.png'
													})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundColor: 'transparent'
												}}
											>
												<div
													className={clsx(classes.paperTitle)}
													style={{
														backgroundImage: `url(${
															nivel == 2
																? 'assets/images/primariaalta/tituloback.png'
																: 'assets/images/preescolar/tituloback.png'
														})`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat'
													}}
													onMouseEnter={
														nivel == 0 && !isMobile && !isMuted ? playVencimiento : null
													}
												>
													<Typography className={clsx(classes.Text)}>
														Vencimiento
														{isMobile && nivel == 0 && (
															<IconButton size="small">
																<Icon
																	className={clsx(classes.listenIcon)}
																	onClick={playVencimiento}
																>
																	volume_up
																</Icon>
															</IconButton>
														)}
													</Typography>
												</div>
												{/* ----------------------------Info inside card-------------------------- */}
												<div
													className="flex items-center justify-center w-full"
													style={{ height: 85, paddingLeft: 45, paddingRight: 45 }}
												>
													<div
														className="flex items-center flex-col"
														style={{
															backgroundImage:
																'url(assets/images/primariaalta/calendario.png)',
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
															backgroundColor: 'transparent',
															height: 90,
															width: 95,
															borderRadius: 5,
															position: 'relative'
														}}
													>
														<Typography className={clsx(classes.LabelDue)}>
															{new Date(
																moment(homework.finish_date).format('YYYY/MM/DD')
															).getDate()}
														</Typography>
													</div>
												</div>
												<Typography className={clsx(classes.TextInfo)}>
													{toTitleCase(String(moment(homework.finish_date).format('MMMM')))}
												</Typography>
											</Paper>
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col')
												}
												elevation={3}
												style={{
													backgroundImage: `url(${
														nivel == 2
															? 'assets/images/primariaalta/Back-tareas.png'
															: 'assets/images/preescolar/Back-tareas.png'
													})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundColor: 'transparent'
												}}
											>
												{/* ----------------------------Info inside card-------------------------- */}
												{homework.status == 'Calificado' ? (
													<div
														className="flex items-center justify-center text-center"
														style={{ height: 300 }}
													>
														<Typography className={clsx(classes.TextInfo)}>
															La tarea ya fue calificada
														</Typography>
													</div>
												) : (
													<div
														className="flex flex-col items-center w-full"
														style={{ height: 300, paddingLeft: 45, paddingRight: 45 }}
													>
														<Formsy
															onValidSubmit={handleSubmit}
															className="flex flex-col w-full items-center mt-20"
														>
															<DialogContent
																className="w-full items-center"
																style={{ display: 'flex' }}
															>
																<Button
																	className="w-full"
																	style={
																		nivel == 2
																			? {
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 2,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: 'center',
																					backgroundColor:
																						'rgb(0,58,131,203)',
																					background:
																						'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																			  }
																			: {
																					backgroundColor: '#FFFFFF',
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 10,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: 'center'
																			  }
																	}
																	onClick={ev => {
																		dispatch(openMiTareaDialog());
																	}}
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playAdjuntar
																			: null
																	}
																>
																	<div>
																		<Typography
																			className={
																				nivel == 2
																					? clsx(
																							classes.LabelTextWhite,
																							'pl-20'
																					  )
																					: clsx(classes.LabelText)
																			}
																		>
																			Adjuntar
																		</Typography>
																	</div>
																	{nivel == 2 ? (
																		<img
																			src="assets/images/primariaalta/adjuntarIcon.png"
																			style={{
																				paddingLeft: 5,
																				paddingRight: 20,
																				height: '35px'
																			}}
																		/>
																	) : (
																		<Icon
																			className={clsx(
																				nivel == 2
																					? classes.whiteIcon
																					: classes.redIcon,
																				'text-center text-40 font-600 ml-4'
																			)}
																		>
																			description
																		</Icon>
																	)}
																</Button>
																{isMobile && nivel == 0 && (
																	<div style={{ paddingLeft: 10 }}>
																		<IconButton
																			size="small"
																			style={{ backgroundColor: 'white' }}
																		>
																			<Icon
																				className={clsx(classes.listenIconRed)}
																				onClick={playAdjuntar}
																			>
																				volume_up
																			</Icon>
																		</IconButton>
																	</div>
																)}
																<input
																	type="file"
																	name="file"
																	id="file"
																	hidden
																	onChange={onSelectFile}
																	ref={fileInput}
																	accept={[...FileConfig.studentHomework.image.accepted, ...FileConfig.studentHomework.documents.accepted]}
																/>
															</DialogContent>
															{sendingHomework && <CircularProgress color="secondary" />}
															{!sendingHomework &&
																urlPath &&
																urlPath.length > 0 &&
																!miTareaDialog.props.open && (
																	<Typography
																		className={clsx(classes.TextInfo)}
																		style={{
																			width: '100%',
																			overflowX: 'auto',
																			whiteSpace: 'nowrap',
																			height: 50,
																			padding: 5
																		}}
																	>
																		Urls: {urlPath.map(row => ` ${row.value}`)}
																	</Typography>
																)}
															{!sendingHomework &&
																selectedFile &&
																selectedFile.length > 0 &&
																!miTareaDialog.props.open && (
																	<Typography
																		className={clsx(classes.TextInfo)}
																		style={{
																			width: '100%',
																			overflowX: 'auto',
																			whiteSpace: 'nowrap',
																			height: 50,
																			padding: 5
																		}}
																	>
																		Archivos adjuntos:{' '}
																		{selectedFile.map(row => ` ${row.name}`)}
																	</Typography>
																)}
															<DialogActions className="w-full mt-20">
																<Button
																	className="w-full"
																	style={
																		nivel == 2
																			? {
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 2,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: 'center',
																					background: 'rgb(0,58,131,203)',
																					background:
																						'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																			  }
																			: {
																					backgroundColor: '#FFFFFF',
																					paddingLeft: 5,
																					paddingRight: 5,
																					paddingTop: 2,
																					paddingBottom: 2,
																					borderRadius: 30,
																					textAlign: 'center'
																			  }
																	}
																	uppercase="false"
																	type="submit"
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playEnviar
																			: null
																	}
																	disabled={
																		selectedFile.length <= 0 && urlPath.length <= 0
																	}
																>
																	<Typography
																		className={
																			nivel == 2
																				? clsx(classes.LabelTextWhite)
																				: clsx(classes.LabelText)
																		}
																	>
																		Enviar
																	</Typography>
																	{nivel == 2 ? (
																		<img
																			src="assets/images/primariaalta/enviarIcon.png"
																			style={{ paddingLeft: 5, height: '40px' }}
																		/>
																	) : (
																		<Icon
																			className={clsx(
																				nivel == 2
																					? classes.whiteIcon
																					: classes.redIcon,
																				'text-center text-40 font-600 ml-4'
																			)}
																		>
																			send
																		</Icon>
																	)}
																</Button>
																{isMobile && nivel == 0 && (
																	<IconButton
																		size="small"
																		style={{ backgroundColor: 'white' }}
																	>
																		<Icon
																			className={clsx(classes.listenIconRed)}
																			onClick={playEnviar}
																		>
																			volume_up
																		</Icon>
																	</IconButton>
																)}
															</DialogActions>
														</Formsy>
													</div>
												)}
											</Paper>
										</Grid>
										{/* -------------------------- tasks delivered ------------------------- */}
										<Grid item xs className="flex items-center flex-col max-w-400 m-20 mb-40">
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col mb-20')
												}
												elevation={3}
												style={{
													backgroundImage: `url(${
														nivel == 2
															? 'assets/images/primariaalta/Back-tareas.png'
															: 'assets/images/preescolar/Back-tareas.png'
													})`,
													backgroundPosition: 'center',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundColor: 'transparent'
												}}
											>
												<div
													className={clsx(classes.paperTitle)}
													style={{
														backgroundImage: `url(${
															nivel == 2
																? 'assets/images/primariaalta/tituloback.png'
																: 'assets/images/preescolar/tituloback.png'
														})`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat'
													}}
													onMouseEnter={
														nivel == 0 && !isMobile && !isMuted ? playEstatus : null
													}
												>
													<Typography className={clsx(classes.Text)}>
														Estatus
														{isMobile && nivel == 0 && (
															<IconButton size="small">
																<Icon
																	className={clsx(classes.listenIcon)}
																	onClick={playEstatus}
																>
																	volume_up
																</Icon>
															</IconButton>
														)}
													</Typography>
												</div>
												<div
													className="flex items-center justify-center w-full"
													style={{ height: 110, paddingLeft: 45, paddingRight: 45 }}
												>
													<div
														className="w-full"
														style={
															nivel == 2
																? {
																		paddingLeft: 5,
																		paddingRight: 5,
																		paddingTop: 2,
																		paddingBottom: 2,
																		borderRadius: 30,
																		textAlign: 'center',
																		background: 'rgb(0,58,131,203)',
																		background:
																			'linear-gradient(0deg, rgba(0,58,131,1) 50%, rgba(0,150,203,1) 100%)'
																  }
																: {
																		backgroundColor: '#FFFFFF',
																		paddingLeft: 5,
																		paddingRight: 5,
																		paddingTop: 10,
																		paddingBottom: 2,
																		borderRadius: 30,
																		textAlign: 'center'
																  }
														}
													>
														<Typography
															className={
																nivel == 2
																	? clsx(classes.LabelTextWhite)
																	: clsx(classes.LabelText)
															}
														>
															{homework.status}
														</Typography>
													</div>
												</div>
												{/* ----------------------------Info inside card-------------------------- */}
											</Paper>
											<Paper
												className={
													(clsx(classes.container),
													'rounded-8 items-center justify-center flex w-full flex-col')
												}
												elevation={3}
												style={
													nivel == 0
														? {
																backgroundImage:
																	'radial-gradient(circle, #4d9cbb, #6aaac3, #84b8cc, #9dc7d5, #b6d5df)',
																backgroundPosition: 'center',
																backgroundSize: 'cover',
																backgroundRepeat: 'no-repeat',
																backgroundColor: 'transparent'
														  }
														: {
																backgroundImage: `url( 'assets/images/primariaalta/nota.jpg')`,
																backgroundPosition: 'center',
																backgroundSize: 'cover',
																backgroundRepeat: 'no-repeat',
																backgroundColor: 'transparent'
														  }
												}
											>
												{/* ----------------------------Info inside card-------------------------- */}
												<div
													className="flex items-center w-full flex-col"
													style={{ height: 300, paddingTop: 10 }}
												>
													{nivel == 0 ? (
														<Grid container justify="center">
															<Grid item xs={1} />
															<Grid item xs={4}>
																<img src="assets/images/preescolar/b1.svg" />
															</Grid>
															<Grid item xs={3}>
																<Typography
																	className={clsx(classes.LabelDescNote)}
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playCalificacion
																			: null
																	}
																>
																	Notas
																	{isMobile && nivel == 0 && (
																		<IconButton
																			size="small"
																			style={{ paddingLeft: '5px' }}
																		>
																			<Icon
																				className={clsx(classes.listenIconGray)}
																				onClick={playCalificacion}
																			>
																				volume_up
																			</Icon>
																		</IconButton>
																	)}
																</Typography>
															</Grid>
															<Grid item xs={4}>
																<img src="assets/images/preescolar/b2.svg" />
															</Grid>
														</Grid>
													)
													: (
														<Typography
															className={clsx(classes.LabelDescNote2)}
															onMouseEnter={
																nivel == 0 && !isMobile && !isMuted
																	? playCalificacion
																	: null
															}
														>
															Calificación
															{isMobile && nivel == 0 && (
																<IconButton size="small" style={{ paddingLeft: '5px' }}>
																	<Icon
																		className={clsx(classes.listenIconGray)}
																		onClick={playCalificacion}
																	>
																		volume_up
																	</Icon>
																</IconButton>
															)}
														</Typography>
													)}
													{homework.status == 'Calificado' ? (
														nivel == 0 ? (
															<Box
																boxShadow={0}
																bgcolor="#dfeffa"
																m={1}
																p={1}
																style={{ width: '35rem', height: '22rem' }}
															>
																<Typography
																	className={
																		nivel == 2
																			? clsx(classes.LabelDesc)
																			: clsx(classes.LabelDesc2)
																	}
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playCalificacion
																			: null
																	}
																>
																	Calificación
																</Typography>
																<Typography className={clsx(classes.LabelScore2)}>
																	{getPreeStarsIcons(homework.preeStars)}
																</Typography>
																<Typography
																	className={
																		nivel == 2
																			? clsx(classes.LabelDesc)
																			: clsx(classes.LabelDesc2)
																	}
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playCalificacion
																			: null
																	}
																>
																	{/* Esta es una nota */}
																</Typography>
																{homework &&
																	homework.dataBadges &&
																	homework.dataBadges.length &&
																	homework.dataBadges.length > 0 && (
																		<Grid container>
																			{homework.dataBadges.map(x => (
																				<Grid item xs={2}>
																					<img
																						src={`assets/images/homeworks/svg${x.badge_id}/${x.badge_id}.svg`}
																					/>
																				</Grid>
																			))}
																		</Grid>
																	)}
															</Box>
														) : (
															<>
															<div
																style={{
																	marginTop: nivel == 2 ? 0 : 0,
																	backgroundColor:
																		nivel == 2 ? 'transparent' : '#transparent',
																	paddingLeft: 25,
																	paddingRight: 25,
																	borderRadius: 10
																}}
															>
																<Typography
																	className={
																		nivel == 2
																			? clsx(classes.LabelDesc)
																			: clsx(classes.LabelDesc2)
																	}
																	onMouseEnter={
																		nivel == 0 && !isMobile && !isMuted
																			? playCalificacion
																			: null
																	}
																>
																	{/* Esta es una nota */}
																</Typography>
																<Typography
																	className={clsx(
																	 classes.LabelScore
																	)}
																>
																	{homework.score.slice(
																		homework.score.indexOf('.')
																	) == '.00'
																		? homework.score.slice(
																				0,
																				homework.score.indexOf('.')
																		  )
																		: homework.score}
																</Typography>
																
															</div>
															{homework &&
																	homework.dataBadges &&
																	homework.dataBadges.length &&
																	homework.dataBadges.length > 0 && (
																		<Grid container>
																			{homework.dataBadges.map(x => (
																				<Grid item xs={2}>
																					<img 
																						src={`assets/images/homeworks/svg${x.badge_id}/${x.badge_id}.svg`}
																					/>
																				</Grid>
																			))}
																		</Grid>
																	)}
															</>
															
														)
													) : (
														<div className="flex items-center justify-center h-200 text-center">
															<Typography className={clsx(classes.TextInfo)}>
																Esta tarea aún no tiene calificación
															</Typography>
														</div>
													)}
												</div>
											</Paper>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs xl={10} className="flex h-full w-full p-16">
									<div
										className="flex"
										style={{
											backgroundImage: `url(${
												nivel == 2
													? 'assets/images/primariaalta/Back-iconos.png'
													: 'assets/images/preescolar/Back-iconos.png'
											})`,
											backgroundPosition: 'center',
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											borderRadius: 8,
											width: '100%',
											justifyContent: 'center'
										}}
									>
										{loading ? (
											<div
												className="pt-20 pb-20 justify-center items-center"
												style={{ height: '197px' }}
											>
												<CircularProgress color="secondary" />
											</div>
										) : (
											<div className="flex ml-40 mr-40" style={{ overflowX: 'auto' }}>
												{/* ----------------------------Info inside card-------------------------- */}
												{homework.activityFile &&
													Array.isArray(homework.activityFile) &&
													homework.activityFile.map(uFile => (
														<div
															className={clsx(
																classes.imgIconsFooter,
																'pt-20 pb-20 justify-center'
															)}
															key={uFile}
														>
															<Tooltip
																placement="top"
																title={
																	<>
																		<Typography color="inherit">
																			{
																				uFile
																					.split('/')
																					[uFile.split('/').length - 1].split(
																						/_(.+)/
																					)[1]
																			}
																		</Typography>
																	</>
																}
															>
																<Button
																	className="flex w-full"
																	onClick={ev => {
																		ev.stopPropagation();
																		dispatch(
																			downloadFile(uFile.replace('public', ''))
																		);
																	}}
																>
																	<img
																		className={clsx(classes.resourceIcons)}
																		src={`assets/images/logos/${
																			uFile.split('.')[
																				uFile.split('.').length - 1
																			] == 'jpg' ||
																			uFile.split('.')[
																				uFile.split('.').length - 1
																			] == 'png' ||
																			uFile.split('.')[
																				uFile.split('.').length - 1
																			] == 'svg' ||
																			uFile.split('.')[
																				uFile.split('.').length - 1
																			] == 'ico'
																				? 'recurso-imagen.svg'
																				: uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'mp4' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'gif' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'mpg' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == '3gp' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'avi' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'wmv'
																				? 'recurso-video.svg'
																				: uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'docx' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'doc'
																				? 'recurso-word.svg'
																				: uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'xlsx' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'xml' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'csv'
																				? 'recurso-excel.svg'
																				: uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'pptx' ||
																				  uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'ppt'
																				? 'recurso-powerpoint.svg'
																				: uFile.split('.')[
																						uFile.split('.').length - 1
																				  ] == 'pdf'
																				? 'recurso-pdf.svg'
																				: 'Otro.svg'
																		}`}
																	/>
																</Button>
															</Tooltip>
														</div>
													))}

												{homework.activityURL ? (
													homework.activityURL[0].value ? (
														homework.activityURL.map(uURL => (
															<div
																className={clsx(
																	classes.imgIconsFooter,
																	'pt-20 pb-20 justify-center'
																)}
																key={uURL.value}
															>
																<Tooltip
																	placement="top"
																	title={
																		<>
																			<Typography color="inherit">
																				{uURL.value}
																			</Typography>
																		</>
																	}
																>
																	<Button
																		className="flex w-full"
																		underline="hover"
																		style={{ backgroundColor: 'transparent' }}
																		href={
																			uURL.value.includes('https://') ||
																			uURL.value.includes('http://')
																				? uURL.value
																				: `https://${uURL.value}`
																		}
																		target="_blank"
																		disableRipple
																	>
																		<img
																			className={clsx(classes.resourceIcons)}
																			src="assets/images/logos/recurso-enlace.svg"
																		/>
																	</Button>
																</Tooltip>
															</div>
														))
													) : (
														<div
															className={clsx(
																classes.imgIconsFooter,
																'pt-20 pb-20 justify-center'
															)}
														>
															<Tooltip
																placement="top"
																title={
																	<>
																		<Typography color="inherit">
																			{homework.activityURL}
																		</Typography>
																	</>
																}
															>
																<Button
																	className="flex w-full"
																	underline="hover"
																	style={{ backgroundColor: 'transparent' }}
																	href={
																		homework.activityURL.includes('https://') ||
																		homework.activityURL.includes('http://')
																			? homework.activityURL
																			: `https://${homework.activityURL}`
																	}
																	target="_blank"
																	disableRipple
																>
																	<img
																		className={clsx(classes.resourceIcons)}
																		src="assets/images/logos/recurso-enlace.svg"
																	/>
																</Button>
															</Tooltip>
														</div>
													)
												) : null}
												{homework.resources &&
													homework.resources.map(resource => (
														<div
															className={clsx(
																classes.imgIconsFooter,
																'pt-20 pb-20 justify-center'
															)}
															key={resource.name}
														>
															<Tooltip
																placement="top"
																title={
																	<>
																		<Typography color="inherit">
																			{resource.name}
																		</Typography>
																	</>
																}
															>
																<Button
																	className="flex w-full"
																	underline="hover"
																	style={{ backgroundColor: 'transparent' }}
																	onClick={() => requestURL(resource)}
																	target="_blank"
																	disableRipple
																>
																	<img
																		className={clsx(classes.resourceIcons)}
																		src={`assets/images/resources/iconos/${resource.category_name
																			.replace('ó', 'o')
																			.replace('á', 'a')}.svg`}
																	/>
																</Button>
															</Tooltip>
														</div>
													))}
											</div>
										)}
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* --------------- logout --------------- */}
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
							<MenuItem
								onClick={() => {
									dispatch(logoutUser());
									userMenuClose();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>exit_to_app</Icon>
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</MenuItem>
						</Popover>
					</Grid>
				) : null}
			</FuseAnimateGroup>
			<MiTareaDialog
				setUrlPath={setUrlPath}
				urlPath={urlPath}
				fileInput={fileInput}
				fileName={fileName}
				selectedFile={selectedFile}
			/>
			<ResourceDialog />
		</div>
	);
}

export default withReducer('MiTareaApp', reducer)(MiTarea);
