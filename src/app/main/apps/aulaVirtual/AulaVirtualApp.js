import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import Carousel from 'react-elastic-carousel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getDocs, collection, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage';
import {
	submitFileClassroom,
	getFileClassroom,
	getMeetingId,
	getGroupsStudent,
	getGroups,
	downloadFile,
	deleteFileClassroom
} from './store/aulaSlice.js';
import { getEventWithoutColor } from '../preescolar/sections/Fetch';
import Chat from '../liaChat/Chat';
// Screen recorder
import RecordView from './RecordView';
// Screen recorder
// Firebase
import db from '../firebaseConfig';
// Redux
import ResourcesDialog from './components/ResourcesDialog';
import { getResources } from './store/resourcesSlice';
import { getNonPlannedResources, addResource, removeResources } from './store/nonPlannedResourcesSlice';
import { getSubjects } from './store/subjectsSlice';
import reducer from './store';

let wlocation = '';
let liaFirestore = 'LIA/chat';
const liaStorage = 'Documents';
const st = getStorage();
// Firebase

const useStyles = makeStyles({
	TextTitle: {
		fontWeight: 'bold',
		fontSize: '32px',
		color: 'white',
		textShadow: '2px 2px 2px black'
	},
	aulaEnd: {
		marginRight: 30
	},
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	},
	img: {
		width: 100,
		position: 'absolute',
		margin: '1%'
	},
	img2: {
		width: 60,
		position: 'absolute',
		margin: '1%'
	},
	imgbanner: {
		maxHeight: '100px',
		overflow: 'hidden'
	},
	imgHeader: {
		maxHeight: '115px'
	},
	imgBackgroundStyle: {
		backgroundImage: 'url(assets/images/backgrounds/_0012_Vector-Smart-Object.png)',
		backgroundSize: 'cover',
		position: 'relative',
		height: '100%',
		width: '100%'
	},
	imgBackgroundStyle4: {
		backgroundImage: 'url(assets/images/backgrounds/Background.png)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		width: '100%',
		height: '100%'
	},
	containerStyle: {
		width: '100%',
		height: '100%'
	},
	rightContainerStyle: {
		color: 'white',
		overflowY: 'scroll',
		width: '100%',
		height: '100%',
		padding: '20px'
	},
	jitsiContainerOpen: {
		display: 'block',
		width: '100%',
		height: '100%'
	},
	jitsiContainerOpen2: {
		display: 'block',
		width: '89%',
		height: '100%'
	},
	fileNameStyle: {
		color: '#FFF',
		textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;'
	},
	button: {
		margin: '20px',
		backgroundColor: '#00B1FF',
		color: '#FFFFFF',
		'&:hover': {
			backgroundColor: '#FFFFFF',
			color: '#00B1FF'
		},
		justifyContent: 'left'
	},
	groupButton: {
		backgroundColor: '#4883C0',
		color: 'white',
		marginLeft: '5%'
	},
	groupTitle: {
		color: 'white',
		margin: '5%'
	},
	groupDivButtons: {
		width: '100%'
	},
	videoScreen: {
		marginTop: '40px',
		height: '70vh',
		maxWidth: '62vw',
		marginLeft: '-27px'
	},
	videoScreen2: {
		height: '50vh',
		maxWidth: '42vw',
		marginLeft: '7px',
		marginTop: '48vh',
		position: 'absolute'
	},
	videoScreenM: {
		marginTop: '70px',
		height: '70vh'
	},
	imgBackgroundStyle2: {
		backgroundImage: 'url(assets/images/backgrounds/_0008_nave-frente.png)',
		position: 'relative',
		height: '30vh',
		backgroundSize: 'cover',
		width: '45vw !important',
		marginLeft: '148px',
		marginTop: '-42px'
	},
	elementDown: {
		marginLeft: '111px',
		marginTop: '26px',
		height: '117px',
		width: '17%'
	},
	anotherelementDown: {
		marginTop: '57px'
	},
	imgBackgroundStyle3: {
		backgroundImage: 'url(assets/images/backgrounds/_0007_Objeto-inteligente-vectorial.png)',
		backgroundSize: 'cover',
		position: 'relative',
		height: '80%',
		width: '29vw !important',
		marginTop: '48px',
		marginLeft: '86px'
	},
	resourcesRight: {
		width: '80vw',
		height: '100vh',
		marginLeft: '20px'
	},
	imgBackgroundStyle5: {
		backgroundImage: 'url(assets/images/backgrounds/RecursosClase.png)',
		backgroundSize: 'cover',
		position: 'relative',
		height: '80%',
		width: '80% !important',
		marginTop: '48px',
		marginLeft: '10%'
	}
});
const hideConsole = true;
const gamesShow = true;
let op = false;
let urlFile = '';
let aulita = [];
let aulaRP = [];
const aulaR = [];
let LIALinkResources = [];
const roleFlag = 0;

const getPartOfDescription = (part, text) => {
	const helperText = String(text).split('*');
	if (helperText.length > 0) {
		// Return required position
		return helperText[parseInt(part)];
	}
	// Return default position
	return helperText[parseInt(0)];
};

const getDescriptionByPosition = (part, text) => {
	const helperText = String(text).split('*');
	const resultado = JSON.parse(helperText[2]);
	resultado.map(x => aulaRP.push(`${x.url}_${x.name}_${x.allowFrame}`));
	resultado.map(x => aulita.push(`${x.url}_${x.name}_${x.allowFrame}`));
	if (helperText.length > 0) {
		// Return required position
		return helperText[String(part)];
	}
	// Return default position
	return helperText[String(0)];
};

function AulaVirtualApp(props) {
	const dispatch = useDispatch();
	const hideBar = 0;
	let meeting_id_GetFiles;
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [openMeeting, setOpenMeeting] = useState(false);
	const [openGroups, setOpenGroups] = useState(false);
	const [valueGroups, setValueGroups] = useState('');
	const [eventData, setEventData] = React.useState([]);
	const [subjectNameCalendar, setSubjectNameCalendar] = React.useState('');
	const [descriptionHelper, setDescriptionHelper] = React.useState('');
	const [meeting, setMeeting] = useState('');

	const user = useSelector(({ auth }) => auth.user.data);
	var { role } = user;
	const grado = user.grade;
	if (
        role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar' &&
        role != 'maestro_preescolar' &&
        role != 'maestro_secundaria' &&
        role != 'profesor_summit_2021' &&
        role != 'maestro' &&
        role != 'admin_escuela' &&
        role != 'maestroe1' &&
        role != 'maestroe2' &&
        role != 'maestroe3' &&
        role != 'Maestro-I' &&
        role != 'Maestro-M' &&
        role != 'Maestro-A' &&
		role != 'Maestro-I-preescolar' &&
		role != 'Maestro-M-preescolar' &&
		role != 'Maestro-A-preescolar' &&
		role != 'Maestro-I-secundaria' &&
		role != 'Maestro-M-secundaria' &&
		role != 'Maestro-A-secundaria'
    ) {
        user.level_id == 1 ? role = 'preescolar' : user.level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
    }
	const nivel = (role === 'alumno' && grado > 3) || role === 'alumno_secundaria' ? 2 : role === 'preescolar' ? 0 : 1;
	const npResources = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.npresources.data);
	// Screen recorder
	// const { status, startRecording, stopRecording, mediaBlobUrl, } = useReactMediaRecorder({ screen: true, audio: true, echoCancellation: true, blobPropertyBag: { type: "video/mp4" } });
	/* const { status, startRecording, stopRecording, mediaBlobUrl, } = 
        useReactMediaRecorder({ 
            screen: true,  */
	/* audio: false,
            video: {
                facingMode: "environment"
            }, */
	// mediaRecorderOptions: constraints
	/* mediaRecorderOptions: {
                // width: { min: 640, ideal: 1920, max: 1920 },
                // height: { min: 400, ideal: 1080 },
                width: 640,
                height: 400,
                //aspectRatio: 1.777777778,
                //frameRate: { max: 30 },
                //facingMode: { exact: "user" }
            }, */
	// audio: true,
	// video: true,
	/* video: {
                width: { min: 640, ideal: 1920 },
                height: { min: 400, ideal: 1080 },
                aspectRatio: { ideal: 1.7777777778 }
            },
            audio: {
                sampleSize: 16,
                channelCount: 2
            }, */
	/* video: {
                // width: { min: 640, ideal: 1920, max: 1920 },
                // height: { min: 400, ideal: 1080 },
                width: 640,
                height: 400,
                //aspectRatio: 1.777777778,
                //frameRate: { max: 30 },
                //facingMode: { exact: "user" }
            }, */
	// echoCancellation: true,
	// blobPropertyBag: { type: "video/mp4" }
	// }

	const island3 = [
		'assets/images/preescolar/artes2.png',
		'assets/images/preescolar/artes.png',
		'assets/images/preescolar/MisClases.png'
	];

	const aula = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.filesAula);

	const route = window.location.toString();
	const arrRoute = route.split('/');
	const indexU = arrRoute.indexOf('aula') + 1;
	const helperValue = arrRoute[indexU]; // Id-Google-Calendar
	if (aula.response.length > 0) {
		aulita = [];
		aulaRP.map(x => aulita.push(x));
		aula.response.map(y => aulita.push(y));
	}

	const meetingIdVal = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.meetingAula);
	const groupsTeacher = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.groups);
	const [show, setShow] = useState(false);
	const [studentResources, setStudentResources] = useState([]);
	const delay = 5;
	let filetype = '';

	const removeCollectionFirestore = async collectionName => {
		const querySnapshot = await getDocs(collection(db, collectionName));
		querySnapshot.forEach(doc => {
			deleteDoc(doc.ref);
		});
	};

	const RemoveAllFilesInStorage = async () => {
		const listRef = ref(st, `${liaStorage}/${wlocation}`);
		listAll(listRef)
			.then(res => {
				res.items.forEach(itemRef => {
					const fileToDelete = ref(st, itemRef._location.path_);
					deleteObject(fileToDelete);
				});
			})
			.catch(error => {
				alert('Error eliminando archivos ');
			});
	};

	useEffect(() => {
		if (meetingIdVal.success) {
			meeting_id_GetFiles = meetingIdVal.response.meeting_id;
			setOpenGroups(false);
			createJitsiMeet(meetingIdVal.response.meeting_id);
			dispatch(getFileClassroom(meetingIdVal.response.meeting_id));
			setOpenMeeting(true);

			const timer1 = setInterval(() => {
				if (
					role === 'alumno' ||
					role === 'alumno_secundaria' ||
					role === 'preescolar' ||
					role === 'alumnoe0' ||
					role === 'alumnoe1' ||
					role === 'alumnoe2' ||
					role === 'alumnoe3' ||
					role === 'Alumno-I' ||
					role === 'Alumno-M' ||
					role === 'Alumno-A'
				) {
					aulita = [];
					const route = window.location.toString();
					const arrRoute = route.split('/');
					const indexU = arrRoute.indexOf('aula') + 1;
					const helperValue = arrRoute[indexU]; // Id-Google-Calendar
					dispatch(deleteFileClassroom(helperValue));
				}
			}, delay * 1000);

			return () => {
				clearInterval(timer1);
			};
		}
	}, [meetingIdVal]);

	useEffect(() => {
		getEvents();
	}, [eventData, npResources]);

	useEffect(() => {
		if (groupsTeacher.success) {
			setOpenGroups(true);
			setValueGroups(groupsTeacher.response);
		}
	}, [groupsTeacher.success, groupsTeacher.error]);

	useDeepCompareEffect(() => {
		dispatch(getNonPlannedResources(routeParams));
		dispatch(getResources());
		getEvents();
		dispatch(getSubjects());
		setOpenMeeting(false);
		if ('id' in routeParams && routeParams.id !== 'all') {
			createJitsiMeet(routeParams.id);
			dispatch(getFileClassroom(routeParams.id));
			setOpenMeeting(true);
		} else if (
			role === 'maestro_preescolar' ||
			role === 'maestro_secundaria' ||
			role === 'profesor_summit_2021' ||
			role === 'maestro' ||
			role === 'admin_escuela' ||
			role === 'maestroe1' ||
			role === 'maestroe2' ||
			role === 'maestroe3' ||
			role === 'Maestro-I' ||
			role === 'Maestro-M' ||
			role === 'Maestro-A' ||
			role == 'Maestro-I-preescolar' ||
			role == 'Maestro-M-preescolar' ||
			role == 'Maestro-A-preescolar' ||
			role == 'Maestro-I-secundaria' ||
			role == 'Maestro-M-secundaria' ||
			role == 'Maestro-A-secundaria' 
		) {
			dispatch(getGroups());
		} else if (
			role === 'alumno' ||
			role === 'alumno_secundaria' ||
			role === 'preescolar' ||
			role === 'alumnoe0' ||
			role === 'alumnoe1' ||
			role === 'alumnoe2' ||
			role === 'alumnoe3' ||
			role === 'Alumno-I' ||
			role === 'Alumno-M' ||
			role === 'Alumno-A'
		) {
			dispatch(getGroupsStudent());
		}
	}, [dispatch, routeParams]);

	useEffect(() => {
		const route = window.location.toString();
		const arrRoute = route.split('/');
		const helperValue = arrRoute[arrRoute.length - 2]; // Id-Google-Calendar
		setSubjectNameCalendar(arrRoute[arrRoute.length - 1].toString());
		getEventWithoutColor(
			events => {
				setEventData(eventData => [...eventData, ...events]);
			},
			process.env.REACT_APP_CALENDAR_KEY,
			helperValue.toString()
		);
		
		if (
			(route.includes('/apps/aula/') === true && role === 'maestro_preescolar') ||
			role === 'maestro_secundaria' ||
			role === 'profesor_summit_2021' ||
			role === 'maestro' ||
			role === 'admin_escuela' ||
			role === 'maestroe1' ||
			role === 'maestroe2' ||
			role === 'maestroe3' ||
			role === 'Maestro-I' ||
			role === 'Maestro-M' ||
			role === 'Maestro-A' ||
			role == 'Maestro-I-preescolar' ||
			role == 'Maestro-M-preescolar' ||
			role == 'Maestro-A-preescolar' ||
			role == 'Maestro-I-secundaria' ||
			role == 'Maestro-M-secundaria' ||
			role == 'Maestro-A-secundaria' 
		) {
			document.getElementById('fuse-navbar').style.display = 'none';
			document.getElementById('fuse-toolbar').style.display = 'none';
			document.getElementById('fuse-footer').style.display = 'none';
		}
		wlocation = String(arrRoute[5]).trim();
		liaFirestore = `${liaFirestore}/${String(wlocation)}`;
		setMeeting(arrRoute[5]);
	}, []);

	function getEvents() {
		aulita = [];
		aulaRP = [];

		if (eventData.length > 0) {
			const objResult = eventData.find(obj => {
				return obj.id === subjectNameCalendar;
			});
			const helperDescription = getPartOfDescription(1, objResult.description.toString());
			setDescriptionHelper(helperDescription);
			// Get link resources from LIA
			const jsonHelper = JSON.parse(getDescriptionByPosition(2, objResult.description.toString()));
			if (jsonHelper.length > 0) {
				LIALinkResources = jsonHelper;
			}
		}
		if (npResources) {
			npResources.map(x => aulaRP.push(`${x.url}_${x.name}_${x.allowFrame}`));
			npResources.map(x => aulita.push(`${x.url}_${x.name}_${x.allowFrame}`));
		}
		setStudentResources(aulita);
	}

	function openLIAResource(link, type) {
		let leftPosition;
		let topPosition;
		if (type === 0) {
			leftPosition = window.screen.width / 2 - (600 / 2 + 10);
			topPosition = window.screen.height / 2 - (480 / 2 + 50);
			const iframe = `<html><head><style>body, html {width: 100vw; height: 100vh; margin: 0; padding: 0}</style></head><body><iframe src='${link}' style='height:calc(100% - 4px);width:calc(100% - 4px)' name='Maestros'></iframe></html></body>`;
			const win = window.open('', '', 'width=600,height=480, location=no, toolbar=no, menubar=no, resizable=yes');
			win.document.write(iframe);
		} else {
			window.open(link);
		}
	}

	function createJitsiMeet(meetId) {
		try {
			const domain = 'meet.jit.si';
			const options = {
				roomName: meetId,
				parentNode: document.getElementById('jitsi-container'),
				userInfo: {
					email: user.email,
					displayName: user.username
				},
				interfaceConfigOverwrite: {
					filmStripOnly: false,
					SHOW_JITSI_WATERMARK: false
				},
				configOverwrite: {
					disableSimulcast: false,
					fileRecordingsEnabled: false,
					liveStreamingEnabled: false
				}
			};

			const api = new window.JitsiMeetExternalAPI(domain, options);
			api.addEventListener('videoConferenceJoined', () => {
				api.executeCommand(
					'avatarUrl',
					`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${user.photoURL}`
				);
			});
		} catch (error) {
			console.error('Failed to load Jitsi API', error);
		}
	}

	function uploadFile(file) {
		dispatch(submitFileClassroom(file, routeParams.id));
	}

	function CloseAndDeleteFiles() {
		// Detele chat messages and files saved on firebase
		if ( role === 'maestro_preescolar' ||
			role === 'maestro_secundaria' ||
			role === 'profesor_summit_2021' ||
			role === 'maestro' ||
			role === 'admin_escuela' ||
			role === 'maestroe1' ||
			role === 'maestroe2' ||
			role === 'maestroe3' ||
			role === 'Maestro-I' ||
			role === 'Maestro-M' ||
			role === 'Maestro-A' ||
			role == 'Maestro-I-preescolar' ||
			role == 'Maestro-M-preescolar' ||
			role == 'Maestro-A-preescolar' ||
			role == 'Maestro-I-secundaria' ||
			role == 'Maestro-M-secundaria' ||
			role == 'Maestro-A-secundaria' 
		) {
			document.getElementById('fuse-navbar').style.display = 'block';
			document.getElementById('fuse-toolbar').style.display = 'block';
			document.getElementById('fuse-footer').style.display = 'block';
		}
		removeCollectionFirestore(liaFirestore);
		RemoveAllFilesInStorage();
		if (npResources) {
			dispatch(removeResources(npResources));
		}
		const route = window.location.toString();
		const arrRoute = route.split('/');
		const indexU = arrRoute.indexOf('aula') + 1;
		const helperValue = arrRoute[indexU];
		dispatch(deleteFileClassroom(helperValue));
		document.getElementById('fuse-navbar').style.display = '';
	}

	function onClickGroup(id) {
		setOpenGroups(false);
		dispatch(getMeetingId(id));
	}

	function openFiles() {
		op = true;
	}

	function closeFile() {
		op = false;
		urlFile = '';
	}

	const state = {
		activeDrags: 0,
		deltaPosition: {
			x: 0,
			y: 0
		},
		controlledPosition: {
			x: -400,
			y: 200
		}
	};

	function onStart() {
		this.setState({ activeDrags: ++this.state.activeDrags });
	}

	function onStop() {
		this.setState({ activeDrags: --this.state.activeDrags });
	}

	function refresh() {
		dispatch(getFileClassroom(helperValue));
		dispatch(getNonPlannedResources(routeParams));
		getEvents();
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={
					<div
						className={
							role === 'preescolar' || (role === 'alumno' && grado < 4)
								? classes.imgBackgroundStyle4
								: classes.imgBackgroundStyle
						}
						id="lia-root"
					>
						<Grid className="boarding" container>
							{role === 'maestro_preescolar' ||
							role === 'maestro_secundaria' ||
							role === 'profesor_summit_2021' ||
							role === 'maestro' ||
							role === 'admin_escuela' ||
							role === 'maestroe1' ||
							role === 'maestroe2' ||
							role === 'maestroe3' ||
							role === 'Maestro-I' ||
							role === 'Maestro-M' ||
							role === 'Maestro-A' ||
							role == 'Maestro-I-preescolar' ||
							role == 'Maestro-M-preescolar' ||
							role == 'Maestro-A-preescolar' ||
							role == 'Maestro-I-secundaria' ||
							role == 'Maestro-M-secundaria' ||
							role == 'Maestro-A-secundaria' ? (
								<>
									<Grid item xs={2}>
										<div>
											<Button
												className={clsx(classes.button)}
												to="/apps/eventscalendar"
												component={Link}
												type="button"
												variant="outlined"
												onClick={() => CloseAndDeleteFiles()}
												startIcon={<ArrowBackIcon />}
											>
												Terminar Clase
											</Button>
										</div>
									</Grid>
								</>
							) : (
								<Grid item xs={2}>
									<div>
										<Button
											className={clsx(classes.button)}
											style={{ backgroundColor: 'transparent' }}
											to="/apps/sections/calendario"
											component={Link}
											type="button"
										>
											<div className={clsx(classes.imgbanner)}>
												<img className={clsx(classes.imgHeader)} src={island3[nivel]} />
											</div>
										</Button>
									</div>
									<div>
										<Typography className={clsx(classes.TextTitle)}>Mis Clases</Typography>
									</div>
									<div>
										<IconButton onClick={refresh} aria-label="open left sidebar" color="primary">
											<Typography
												className={clsx(
													classes.fileNameStyle,
													'text-center text-16 font-600 m-4'
												)}
											>
												Recursos para la clase{' '}
											</Typography>
											<Icon
												className={clsx(
													classes.fileNameStyle,
													'text-center text-16 font-600 mt-4'
												)}
											>
												refresh
											</Icon>
										</IconButton>
									</div>
									<div>
										{op == true ? (
											<IconButton
												onClick={() => dispatch(getFileClassroom(helperValue), closeFile())}
												aria-label="open left sidebar"
												color="primary"
											>
												<Typography
													className={clsx(
														classes.fileNameStyle,
														'text-center text-16 font-600 m-4'
													)}
												>
													Cerrar Recurso{' '}
												</Typography>
												<Icon
													className={clsx(
														classes.fileNameStyle,
														'text-center text-16 font-600 mt-4'
													)}
												/>
											</IconButton>
										) : (
											<></>
										)}
									</div>
								</Grid>
							)}
							<Grid
								item
								xs={7}
								className={
									(classes.containerStyle,
									urlFile !== ''
										? classes.videoScreen2
										: role === 'maestro_preescolar' ||
										  role === 'maestro_secundaria' ||
										  role === 'profesor_summit_2021' ||
										  role === 'maestro' ||
										  role === 'admin_escuela' ||
										  role === 'maestroe1' ||
										  role === 'maestroe2' ||
										  role === 'maestroe3' ||
										  role === 'Maestro-I' ||
										  role === 'Maestro-M' ||
										  role === 'Maestro-A' ||
										  role == 'Maestro-I-preescolar' ||
										  role == 'Maestro-M-preescolar' ||
										  role == 'Maestro-A-preescolar' ||
										  role == 'Maestro-I-secundaria' ||
										  role == 'Maestro-M-secundaria' ||
										  role == 'Maestro-A-secundaria' 
										? classes.videoScreenM
										: classes.videoScreen)
								}
							>
								{openGroups ? (
									<>
										<Typography
											fontFamily
											variant="h3"
											color="inherit"
											className={clsx(classes.groupTitle)}
										>
											{role === 'maestro_preescolar' ||
											role === 'maestro_secundaria' ||
											role === 'profesor_summit_2021' ||
											role === 'maestro' ||
											role === 'admin_escuela' ||
											role === 'maestroe1' ||
											role === 'maestroe2' ||
											role === 'maestroe3' ||
											role === 'Maestro-I' ||
											role === 'Maestro-M' ||
											role === 'Maestro-A' ||
											role == 'Maestro-I-preescolar' ||
											role == 'Maestro-M-preescolar' ||
											role == 'Maestro-A-preescolar' ||
											role == 'Maestro-I-secundaria' ||
											role == 'Maestro-M-secundaria' ||
											role == 'Maestro-A-secundaria' ? (
												<div className={clsx(classes.fileNameStyle)}>
													¿A qué grupo impartirás clase?
												</div>
											) : (
												<div className={clsx(classes.fileNameStyle)}>
													Selecciona un grupo para entrar a la clase
												</div>
											)}
										</Typography>
										<div className={clsx(classes.groupDivButtons)}>
											{valueGroups.map(group => {
												return (
													<Button
														onClick={() => onClickGroup(group.id)}
														className={clsx(classes.groupButton, 'normal-case')}
													>
														<Typography>{group.name}</Typography>
													</Button>
												);
											})}
										</div>
									</>
								) : (
									<>
										{role === 'maestro_preescolar' ||
										role === 'maestro_secundaria' ||
										role === 'profesor_summit_2021' ||
										role === 'maestro' ||
										role === 'admin_escuela' ||
										role === 'maestroe1' ||
										role === 'maestroe2' ||
										role === 'maestroe3' ||
										role === 'Maestro-I' ||
										role === 'Maestro-M' ||
										role === 'Maestro-A' ||
										role == 'Maestro-I-preescolar' ||
										role == 'Maestro-M-preescolar' ||
										role == 'Maestro-A-preescolar' ||
										role == 'Maestro-I-secundaria' ||
										role == 'Maestro-M-secundaria' ||
										role == 'Maestro-A-secundaria' ? (
											<Grid container alignItems="flex-start" justify="flex-end" direction="row">
												<RecordView />
											</Grid>
										) : (
											<></>
										)}
										<Grid
											container
											item
											justifyContent="center"
											id="jitsi-container"
											className={
												urlFile != '' ? classes.jitsiContainerOpen2 : classes.jitsiContainerOpen
											}
										>
											<img
												className={urlFile != '' ? clsx(classes.img2) : clsx(classes.img)}
												src="assets/images/logos/clublia.png"
											/>
										</Grid>
										{((role === 'alumno' && grado >= 4) || role === 'alumno_secundaria') &&
											openMeeting !== false &&
											aula.response && (
												<>
													{op === false && (
														<>
															<Carousel
																itemsToShow={1}
																style={{}}
																className={classes.imgBackgroundStyle2}
															>
																{aulita.map(file => {
																	return (
																		<>
																			<p
																				style={{
																					paddingTop: 3,
																					paddingBottom: 3,
																					paddingLeft: 5,
																					paddingRight: 5,
																					marginTop: 5,
																					backgroundColor: '#c7c7c7',
																					color: '#FFFFFF',
																					borderRadius: 12,
																					fontWeight: 'bold',
																					textAlign: 'center'
																				}}
																			>
																				<Button
																					className="flex flex-col justify-center"
																					onClick={ev => {
																						ev.stopPropagation();

																						const filename = file.split(
																							'_'
																						);

																						if (file.startsWith('public')) {
																							urlFile =
																								process.env.REACT_APP_API.replace(
																									'api',
																									''
																								) +
																								file.replace(
																									'public',
																									'storage'
																								);
																							dispatch(
																								downloadFile(
																									file.replace(
																										'public',
																										''
																									)
																								),
																								openFiles()
																							);
																						} else if (filename[2] === 1) {
																							window.open(
																								filename[0],
																								'_blank'
																							);
																						} else {
																							urlFile = filename[0];
																							dispatch(
																								getFileClassroom(
																									meetingIdVal
																										.response
																										.meeting_id
																								),
																								openFiles()
																							);
																						}
																					}}
																				>
																					<Typography
																						className={clsx(
																							classes.fileNameStyle,
																							'text-center text-13 font-600 mt-4'
																						)}
																					>
																						{file.slice(
																							file.indexOf('_') + 1
																						)}
																					</Typography>
																					<Icon
																						className={clsx(
																							classes.fileNameStyle,
																							'text-center text-13 font-600 mt-4 ml-4'
																						)}
																					>
																						save_alt
																					</Icon>
																				</Button>
																			</p>
																		</>
																	);
																})}
															</Carousel>
														</>
													)}
												</>
											)}
									</>
								)}
							</Grid>

							{role === 'maestro_preescolar' ||
							role === 'maestro_secundaria' ||
							role === 'profesor_summit_2021' ||
							role === 'maestro' ||
							role === 'admin_escuela' ||
							role === 'maestroe1' ||
							role === 'maestroe2' ||
							role === 'maestroe3' ||
							role === 'Maestro-I' ||
							role === 'Maestro-M' ||
							role === 'Maestro-A' ||
							role == 'Maestro-I-preescolar' ||
							role == 'Maestro-M-preescolar' ||
							role == 'Maestro-A-preescolar' ||
							role == 'Maestro-I-secundaria' ||
							role == 'Maestro-M-secundaria' ||
							role == 'Maestro-A-secundaria' ? (
								<Grid item xs={3} className={classes.rightContainerStyle}>
									<div className={clsx('flex flex-col justify-center')}>
										{openMeeting !== false && aula.response && (
											<>
												{
													// LIA link resources
													LIALinkResources.length == 0
														? null
														: LIALinkResources.map(v => {
																return (
																	<>
																		<p
																			style={{
																				paddingTop: 3,
																				paddingBottom: 3,
																				paddingLeft: 5,
																				paddingRight: 5,
																				marginTop: 5,
																				backgroundColor: '#c7c7c7',
																				color: '#FFFFFF',
																				borderRadius: 12,
																				fontWeight: 'bold',
																				textAlign: 'center'
																			}}
																		>
																			<Button
																				className="flex flex-col justify-center"
																				onClick={ev => {
																					ev.stopPropagation();
																					openLIAResource(
																						v.url,
																						v.allowFrame
																					);
																				}}
																			>
																				<Typography
																					className={clsx(
																						classes.fileNameStyle,
																						'text-center text-13 font-600 mt-4'
																					)}
																				>
																					{v.name}
																				</Typography>
																				<Icon
																					className={clsx(
																						classes.fileNameStyle,
																						'text-center text-13 font-600 mt-4 ml-4'
																					)}
																				>
																					link
																				</Icon>
																			</Button>
																		</p>
																	</>
																);
														  })
												}
												{
													// Non planned link resources
													npResources && npResources.length > 0
														? npResources.map(v => {
																return (
																	<>
																		<p
																			style={{
																				paddingTop: 3,
																				paddingBottom: 3,
																				paddingLeft: 5,
																				paddingRight: 5,
																				marginTop: 5,
																				backgroundColor: '#c7c7c7',
																				color: '#FFFFFF',
																				borderRadius: 12,
																				fontWeight: 'bold',
																				textAlign: 'center'
																			}}
																		>
																			<Button
																				className="flex flex-col justify-center"
																				onClick={ev => {
																					ev.stopPropagation();
																					openLIAResource(
																						v.url,
																						v.allowFrame
																					);
																				}}
																			>
																				<Typography
																					className={clsx(
																						classes.fileNameStyle,
																						'text-center text-13 font-600 mt-4'
																					)}
																				>
																					{v.name}
																				</Typography>
																				<Icon
																					className={clsx(
																						classes.fileNameStyle,
																						'text-center text-13 font-600 mt-4 ml-4'
																					)}
																				>
																					link
																				</Icon>
																			</Button>
																		</p>
																	</>
																);
														  })
														: null
												}
												{aula.response?.map(file => {
													return (
														<>
															<p
																style={{
																	paddingTop: 3,
																	paddingBottom: 3,
																	paddingLeft: 5,
																	paddingRight: 5,
																	marginTop: 5,
																	backgroundColor: '#c7c7c7',
																	color: '#FFFFFF',
																	borderRadius: 12,
																	fontWeight: 'bold',
																	textAlign: 'center'
																}}
															>
																<Button
																	className=" flex-inline justify-center"
																	onClick={ev => {
																		ev.stopPropagation();
																		filetype = file.split('.').pop();
																		dispatch(
																			downloadFile(file.replace('public', ''))
																		);
																	}}
																>
																	<Typography
																		className={clsx(
																			classes.fileNameStyle,
																			'text-center text-13 font-600 mt-4'
																		)}
																	>
																		{file.slice(file.indexOf('_') + 1)}
																	</Typography>

																	<Icon
																		className={clsx(
																			classes.fileNameStyle,
																			'text-center text-13 font-600 mt-4 ml-4'
																		)}
																	>
																		save_alt
																	</Icon>
																</Button>
															</p>
														</>
													);
												})}
												{role === 'maestro_preescolar' ||
												role === 'maestro_secundaria' ||
												role === 'profesor_summit_2021' ||
												role === 'maestro' ||
												role === 'admin_escuela' ||
												role === 'maestroe1' ||
												role === 'maestroe2' ||
												role === 'maestroe3' ||
												role === 'Maestro-I' ||
												role === 'Maestro-M' ||
												role === 'Maestro-A' ||
												role == 'Maestro-I-preescolar' ||
												role == 'Maestro-M-preescolar' ||
												role == 'Maestro-A-preescolar' ||
												role == 'Maestro-I-secundaria' ||
												role == 'Maestro-M-secundaria' ||
												role == 'Maestro-A-secundaria' ? (
													<input
														style={{
															alignSelf: 'center',
															marginTop: '10%',
															display: 'none'
														}}
														className="mb-16"
														type="file"
														name="file"
														id="file"
														onChange={e => uploadFile(e.target.files[0])}
														variant="outlined"
													/>
												) : (
													<IconButton
														onClick={
															(() => dispatch(getNonPlannedResources(routeParams)),
															dispatch(
																getFileClassroom(meetingIdVal.response.meeting_id)
															))
														}
														aria-label="open left sidebar"
														color="primary"
													>
														<Typography
															className={clsx(
																classes.fileNameStyle,
																'text-center text-16 font-600 m-4'
															)}
														>
															Recursos para la clase{' '}
														</Typography>
														<Icon
															className={clsx(
																classes.fileNameStyle,
																'text-center text-16 font-600 mt-4'
															)}
														>
															refresh
														</Icon>
													</IconButton>
												)}
											</>
										)}
									</div>
								</Grid>
							) : (
								<>
									{urlFile != '' ? (
										<Grid className={classes.resourcesRight}>
											<div className="modal">
												<div
													className="modalContent"
													style={{
														backgroundColor: 'white',
														width: '100%',
														height: '100vh'
													}}
												>
													<iframe
														src={urlFile}
														style={{
															width: '100%',
															height: '100vh'
														}}
													/>
												</div>
											</div>
										</Grid>
									) : (
										<div />
									)}
								</>
							)}
						</Grid>

						{((role === 'alumno' && grado < 4) || role === 'preescolar') &&
							openMeeting !== false &&
							aula.response &&
							op === false && (
								<>
									<Grid
										style={{
											bottom: '0',
											position: 'fixed',
											width: '52vw',
											height: '28vh',
											marginLeft: '22%'
										}}
									>
										{((role == 'alumno' && grado < 4) || role == 'preescolar') &&
											openMeeting !== false &&
											aula.response && (
												<>
													<Carousel
														itemsToShow={1}
														style={{ backgroundSize: 'contain' }}
														className={classes.imgBackgroundStyle5}
													>
														{studentResources.map(file => {
															return (
																<p
																	key={file}
																	style={{
																		paddingTop: 3,
																		paddingBottom: 3,
																		paddingLeft: 5,
																		paddingRight: 5,
																		marginTop: 5,
																		backgroundColor: '#c7c7c7',
																		color: '#FFFFFF',
																		borderRadius: 12,
																		fontWeight: 'bold',
																		textAlign: 'center'
																	}}
																>
																	<Button
																		className="flex flex-col justify-center"
																		onClick={() => {
																			const filename = file.split('_');

																			if (file.startsWith('public')) {
																				urlFile =
																					process.env.REACT_APP_API.replace(
																						'api',
																						''
																					) +
																					file.replace('public', 'storage');
																				dispatch(
																					downloadFile(
																						file.replace('public', '')
																					),
																					openFiles()
																				);
																			} else if (filename[2] == 1) {
																				window.open(filename[0], '_blank');
																			} else {
																				urlFile = filename[0];
																				dispatch(
																					getFileClassroom(
																						meetingIdVal.response.meeting_id
																					),
																					openFiles()
																				);
																			}
																		}}
																	>
																		<Typography
																			className={clsx(
																				classes.fileNameStyle,
																				'text-center text-13 font-600 mt-4'
																			)}
																		>
																			{file.slice(file.indexOf('_') + 1)}
																		</Typography>
																		<Icon
																			className={clsx(
																				classes.fileNameStyle,
																				'text-center text-13 font-600 mt-4 ml-4'
																			)}
																		>
																			save_alt
																		</Icon>
																	</Button>
																</p>
															);
														})}
													</Carousel>
												</>
											)}
									</Grid>
								</>
							)}
						<>
							<ResourcesDialog />
							<Chat typeOfUser={user.role} />
						</>
					</div>
				}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}

export default withReducer('AulaVirtualApp', reducer)(AulaVirtualApp);
