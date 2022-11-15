import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// New Calendar
import parse from 'html-react-parser';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { getEvents } from '../preescolar/sections/Fetch';

// Modal
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { openEventDialog } from './store/eventsSlice';
import EventsCalendarEventDialog from './EventCalendarEventDialog';
import EventsCalendarDialog from './EventsCalendarDialog';
import { getCalendars, getSubjects, setGroup } from './store/calendarSlice';
import { Card, Grid, Menu, MenuItem, Select } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import { Add, ExpandLess, ExpandMore, PlusOne } from '@material-ui/icons';
import { openEditGroupDialog, selectGroups } from '../groups/store/groupSlice';
import FuseUtils from '@fuse/utils';
import EventsCalendarTokenDialog from './EventsCalendarTokenDialog';


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const usrRol = ['Maestro-A', 'Maestro-M', 'Maestro-I', 'maestro_secundaria', 'maestro_preescolar', 'maestro',  'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'];
// Modal

const formats = {
	eventTimeRangeFormat: () => {
		return '';
	}
};

const getPartOfDescription = text => {
	const helperText = String(text).split('*');
	return helperText[0];
};

const localizer = momentLocalizer(moment);

const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}))(Tooltip);

const CustomEvent = ({ event }) => {
	moment.locale('es-MX');
	const dateString =
		String(
			`${moment(event.start.toString()).format('dddd, Do MMMM hh:mm ')}-${moment(event.end.toString()).format(
				'hh:mm a'
			)}`
		)
			.charAt(0)
			.toUpperCase() +
		String(
			`${moment(event.start.toString()).format('dddd, Do MMMM h:mm ')}-${moment(event.end.toString()).format(
				'hh:mm a'
			)}`
	).slice(1);

	
	return (
		<>
			<HtmlTooltip
				interactive
				title={
					<>
						<div>{event.title}</div>
						<br />
						<div>{dateString}</div>
						<br />
						{parse(getPartOfDescription(event.description.toString()))}
					</>
				}
			>
				<strong> {event.title} </strong>
			</HtmlTooltip>
		</>
	);
};

const useStyles = makeStyles(theme => ({
	root: {
		'& .rbc-toolbar': {
			padding: '12px 6px',
			fontWeight: 600,
			fontSize: 14,
			backgroundColor: '#ffffff'
		},
		'& .rbc-label': {
			padding: '8px 6px'
		},
		'& .rbc-today': {
			backgroundColor: '#ffffff'
		},
		'& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
			borderBottom: `2px solid ${theme.palette.secondary.main}!important`
		},
		'& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
			padding: 24,
			backgroundColor: '#ffffff',
			[theme.breakpoints.down('sm')]: {
				padding: 10
			},
			...theme.mixins.border(0)
		}
	},
	addButton: {
		position: 'absolute',
		right: 12,
		top: 172,
		zIndex: 99
	},
	paper: {
		padding: theme.spacing(1),
		backgroundColor: 'rgb(255, 255, 255, 0.1)',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: 460,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 460
	},
	paperNav: {
		padding: theme.spacing(1),
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: 460,
		position: 'relative',
		maxHeight: 460
	},
	TextInfo: {
		fontSize: '16px',
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center'
	},
	containerClass: {
		padding: '4rem'
	},
	button: {
		'&:hover': {
			transform: 'scale(1.2)'
		},
		text: 'center'
	},
	buttonClass: {
		width: 'auto',
		'&:hover': {
			backgroundColor: '#6f51ed',
			transform: 'scale(1.1)'
		},
		minWidth: '48px',
		height: '48px',
		minHeight: 'auto',
		padding: ' 0 16px',
		borderRadius: '24px',
		margin: '10px',
		backgroundColor: '#6f51ed'
	},
	img: {
		maxHeight: '20%',
		maxWidth: '20%'
	},
	imgButton: {
		maxHeight: '80%',
		maxWidth: '80%'
	},
	container: {
		marginTop: '-40px',
		paddingTop: '20px',
		justifyContent: 'center',
		alignItems: 'center',
		text: 'center',
		textAlign: 'center'
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
	avatarContainer: {
		paddingLeft: '70px',
		paddingRight: '70px'
	},
	userIcon: {
		paddingLeft: '100px'
	},
	nested: {
		paddingLeft: theme.spacing(4)
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
	containerAddButtonsLeft: {
		float: 'left'
	},
	// List, tabs and modal
	react_responsive_modal_modal: {
		maxWidth: '800px',
		display: 'inline-block',
		textAlign: 'left',
		verticalAlign: 'middle',
		background: '#ffffff',
		boxShadow: '0 12px 15px 0 rgba(0, 0, 0, 0.25)',
		margin: '1.2rem',
		padding: '1.2rem',
		position: 'relative',
		overflowY: 'auto',
		borderRadius: 30
	},
	numberList: {
		display: 'inline-block',
		padding: '6px 15px',
		borderRadius: '50%',
		fontSize: '18px',
		textAlign: 'center',
		background: '#545AB7',
		color: '#fefefe'
	},
	contentOfTabs: {
		width: 650
	},
	titleInsideTab: {
		fontFamily: 'poppins',
		color: '#545AB7',
		textAlign: 'center'
	},
	marginContainer: {
		marginLeft: 50,
		marginRight: 50
	},
	containerList: {
		display: 'flex'
	},
	sizeNumberList: {
		width: '10%'
	},
	sizeDescriptioinList: {
		width: '90%'
	},
	descriptionList: {
		padding: 10,
		fontFamily: 'poppins',
		color: '#343434'
	},
	buttonOpenModal: {
		color: '#FFF',
		backgroundColor: '#5557BD',
		fontFamily: 'grobold'
	},
	buttonContainer: {
		display: 'flex'
	},
	buttonContainerLeft: {
		width: '50%'
	},
	buttonContainerRight: {
		width: '50%',
		textAlign: 'right'
	},
	tabBorderBotton: {
		borderBottom: 'solid 3px rgb(189, 190, 197'
	}
}));

function EventsCalendarContent(props) {
	const [calendarsIds, setCalendars] = useState([]);
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const calendars = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.data);
	const loading = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.loading);
	const subjects = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.subjects.data.calendars);
	const groups = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.groups.data);
	const group = useSelector(({ EventsCalendarApp }) => EventsCalendarApp.calendar.group.group);
	const [eventData, setEventData] = React.useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [materiasData, setMateriasData] = useState([]);
	const [infoCalendarData, setInfoCalendarData] = useState([]);
	const [filtroGrupo, setFiltroGrupo] = useState("");
	const [filtroMateria, setFiltroMateria] = useState("");
	const routeParams = useParams();
	const grupo = routeParams.group_id;

	const role = useSelector(({ auth }) => auth.user.role);
	const [open, setOpen] = useState(false);
	const onCloseModal = () => setOpen(false);
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	useEffect(() => {
		setMateriasData(subjects);
	}, [subjects]);

	useEffect(() => {
		setFilteredData(groups);
		if (groups && groups[0] && groups[0].id) {
			const id_grupo = grupo && Number.isInteger(parseInt(grupo)) && groups.find(element => element.id == grupo) ? grupo : groups[0].id;
			if (id_grupo && group != id_grupo) {
				dispatch(setGroup(id_grupo));
			}
		}	
	}, [groups]);
	
	useEffect(() => {
		if (group) {
			gruposCalendar(group);
		}
	}, [group]);

	const closeIconModal = (
		<svg width="32" height="32" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="43" cy="43" r="43" fill="#545AB7" />
			<path
				d="M34.9052 23L43.611 31.9589L51.8283 23L61.7779 30.488L51.2509 41.4525L62 52.4617L53.5162 61.5989L43.4334 48.896L35.3493 62L25.2221 53.4868L35.3493 42.0765L25 30.488L34.9052 23Z"
				fill="white"
			/>
		</svg>
	);
	const helpIconButton = (
		<svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0ZM22.3 31.8H15.2V26.9H22.3V31.8ZM28.7 17.4C28.4 18.1 27.9 18.8 27.4 19.3C26.9 19.8 26.4 20.2 25.8 20.6C25.2 21 24.6 21.4 24.1 21.8C23.6 22.2 23.2 22.7 22.8 23.3C22.5 23.9 22.3 24.6 22.3 25.5H15.1V23.9C15.1 23.1 15.2 22.3 15.5 21.7C15.8 21.1 16.1 20.6 16.5 20.1C16.9 19.7 17.4 19.3 17.8 19C18.3 18.7 18.7 18.3 19.2 18C19.6 17.7 20 17.4 20.2 17C20.5 16.7 20.6 16.3 20.6 15.8C20.6 15.5 20.5 15.2 20.2 15C19.9 14.8 19.5 14.6 18.8 14.6C18.2 14.6 17.6 14.7 17.1 14.8C16.5 14.9 16 15 15.4 15.2C14.9 15.4 14.3 15.5 13.8 15.8C13.3 16 12.9 16.2 12.5 16.4L11 10.3C11.5 10 12.1 9.8 12.8 9.5C13.5 9.2 14.2 9 15 8.8C15.8 8.6 16.7 8.4 17.6 8.3C18.5 8.1 19.5 8 20.5 8C21.8 8 23.1 8.2 24.1 8.5C25.2 8.8 26.1 9.3 26.8 9.9C27.6 10.5 28.1 11.2 28.5 12C28.9 12.8 29.1 13.6 29.1 14.5C29.2 15.7 29 16.7 28.7 17.4Z"
				fill="white"
			/>
		</svg>
	);

	useEffect(() => {
		if (calendars && subjects && calendars.length > 0) {
			const calendarsArray = [];
			for (const i in calendars) {
				calendarsArray.push({ calendarId: calendars[i].calendar_id, color: calendars[i].custom_color });
			}
			setCalendars(calendarsArray);
		} 
	}, [dispatch, subjects, calendars]);

	useEffect(() => {
		setInfoCalendarData([]);
		if (calendars && calendars.length > 0 && calendars[0].calendar_id) {
			for (const i in calendars) {
				getEvents(
					events => {
						setEventData(eventData => [...eventData, ...events]);
						setInfoCalendarData(infoCalendarData => [...infoCalendarData, ...events]);
					},
					process.env.REACT_APP_CALENDAR_KEY,
					calendars[i].calendar_id.toString(),
					calendars[i].custom_color.toString()
				);
			}
		}
	}, [calendars]);

	const styles = {
		// you can use object styles (no import required)
		calendar: {
			borderWidth: '3px' // make outer edge of calendar thicker
		},

		// you can also use emotion's string styles
		today: {
			border: '1px solid red',
			backgroundColor: '#ffeceb'
		}
	};

	

	const gruposCalendar = (value) => {
		setEventData([]);
		setInfoCalendarData([]);
		setFiltroMateria("");
		setCalendars([]);
		dispatch(getCalendars({ group_id: value }));
		dispatch(getSubjects({ group_id: value }));
		setInfoCalendarData(eventData);
		setFiltroGrupo(value);
		setMaterias(materiasData && materiasData[0] && materiasData[0].id ? materiasData[0].id : []);
		setFiltroMateria("");
	}

	const setMaterias = (value) => {
		var array = [];
		setFiltroMateria(value);
		eventData.filter((elemento) => {
			if(elemento.title.includes(value)){
				array.push(elemento);
			}
		});
		setInfoCalendarData(array);
	}

	const limpiarFiltros = () => {
		setFiltroGrupo("");
		setFiltroMateria("");
		setMaterias("");
	}

	return (
		<>
			{role === 'Maestro-M' ||
			role === 'Maestro-I' ||
			role === 'Maestro-A' ||
			role === 'maestro_preescolar' ||
			role === 'maestro_secundaria' ||
			role === 'profesor_summit_2021' ||
			role === 'maestro' ||
			role == 'Maestro-I-preescolar' ||
			role == 'Maestro-M-preescolar' ||
			role == 'Maestro-A-preescolar' ||
			role == 'Maestro-I-secundaria' ||
			role == 'Maestro-M-secundaria' ||
			role == 'Maestro-A-secundaria'  ? (
				<EventsCalendarTokenDialog />
			) : null}
			{ filteredData ? (
					<Card className="contenedorCalendar">
						<div className="w-full item-center p-20">
							<Grid className='headCalendar'>		
								<Grid item className="btnRegresarCalendar">
									<Button onClick={() => window.history.back()} style={{textTransform: 'none'}}><Icon>{'chevron_left'}</Icon>Regresar</Button>
								</Grid>						
								<h3 className='titleCalendar'>Clases</h3>
								<div className="divBtnCrearClase">
									<div>
										{role === 'Maestro-M' ||
										role === 'Maestro-I' ||
										role === 'Maestro-A' ||
										role === 'maestro_preescolar' ||
										role === 'maestro_secundaria' ||
										role === 'profesor_summit_2021' ||
										role === 'maestro' ||
										role == 'Maestro-I-preescolar' ||
										role == 'Maestro-M-preescolar' ||
										role == 'Maestro-A-preescolar' ||
										role == 'Maestro-I-secundaria' ||
										role == 'Maestro-M-secundaria' ||
										role == 'Maestro-A-secundaria'  ? (
											<>
												<FuseAnimate animation="transition.expandIn" delay={300}>
													<Button
														color="primary"
														variant="extended"
														aria-label="add"
														className="btnCrearClase"
														to={`/apps/eventscalendaredit`} 
														component={Link}
													>
														<Add/> Crear clase
													</Button>
												</FuseAnimate>
											</>
											
										) : null}
									</div>
								</div>
							</Grid>
							<Grid className='bodyCalendar'>
								<div className='flex w-full left'>
									<Button to="/apps/grabaciones/all" component={Link} className='btnClases' >Ver clases grabadas</Button>
								</div>
								<div className='flex w-full left'>
									<Button onClick={limpiarFiltros} className="btnLimpiar">Limpiar filtros</Button>
								</div>
							</Grid>
							<Grid className="divFiltros">
								<TreeView
									aria-label="file system navigator"
									defaultCollapseIcon={<ExpandLess />}
									defaultExpandIcon={<ExpandMore />}
									className="treeView"
									defaultExpanded={['1']}
								>
									<TreeItem  nodeId="1" label="Filtros" className="elementosFilter">
										<div className="flex w-full">
											<Grid style={{ width: '50% '}}>
												<h3 className='subtitle'>Por grupos</h3>
												<Select
													className="selectFilterGroup marginRight"
													displayEmpty
													value={filtroGrupo}								
													onChange={ev => dispatch(setGroup(ev.target.value))}									
												>											
													{ 
														filteredData ? filteredData.map(grupo => (															
															<MenuItem value={grupo.id}>{grupo.name}</MenuItem>															
														))
														:
														null
													}
												</Select>
											</Grid>
											<Grid style={{ width: '50% '}}>
											<h3 className='subtitle'>Por materias</h3>
												<Select
													className="selectFilterGroup"
													displayEmpty
													value={filtroMateria}
													onChange={(e) => setMaterias(e.target.value)}
												>
													<MenuItem value="">Todas las materias</MenuItem>
													{
														materiasData ? materiasData.map(materia => (
															<MenuItem value={materia.custom_name}>{materia.custom_name}</MenuItem>
														)) :
															null
													}
												</Select>
											</Grid>
										</div>										
									</TreeItem>									
								</TreeView>
							</Grid>
							<div className={classes.buttonContainer}>
								
							</div>

							<Modal
								open={open}
								onClose={onCloseModal}
								center
								classNames={{ modal: classes.react_responsive_modal_modal }}
								closeIcon={closeIconModal}
							>
								<br />
								<Box sx={{ width: '100%' }}>
									<Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
										<Tabs
											value={value}
											onChange={handleChange}
											aria-label="basic tabs example"
											centered
											style={{ borderBottom: 'solid 3px rgb(189, 190, 197' }}
										>
											<Tab
												label="Pre requisitos"
												{...a11yProps(0)}
												style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }}
											/>
											<Tab
												label="Crear clase"
												{...a11yProps(1)}
												style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }}
											/>
										</Tabs>
									</Box>
									<TabPanel value={value} index={0}>
										<div className={classes.contentOfTabs}>
											<p className={classes.titleInsideTab}>
												Antes de crear una clase, debe seguir los siguientes pasos:
											</p>
											<br />
											<div className={classes.marginContainer}>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>1</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>
															Iniciar sesión en el sistema LIA
														</p>
														<img className="logo-icon" src="assets/images/help/Pre1.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>2</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>
															Navega hacia el módulo de "Clases"
														</p>
														<img className="logo-icon" src="assets/images/help/Pre2.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>3</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>
															Iniciar sesión con Google y aceptar los permisos
														</p>
														<img className="logo-icon" src="assets/images/help/Pre3.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>4</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>Crear un grupo</p>
														<img className="logo-icon" src="assets/images/help/Pre4.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>5</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>Crear materias</p>
														<img className="logo-icon" src="assets/images/help/Pre5.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>6</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>
															Seleccionar el calendario correspondiente al grupo
														</p>
														<img className="logo-icon" src="assets/images/help/Pre6.png" />
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
									<TabPanel value={value} index={1}>
										<div className={classes.contentOfTabs}>
											<p className={classes.titleInsideTab}>Creación de clase:</p>
											<br />
											<div className={classes.marginContainer}>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>1</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>Crear clase</p>
														<img className="logo-icon" src="assets/images/help/clases1.png" />
													</div>
												</div>
												<div className={classes.containerList}>
													<div className={classes.sizeNumberList}>
														<span className={classes.numberList}>2</span>
													</div>
													<div className={classes.sizeDescriptioinList}>
														<p className={classes.descriptionList}>
															Completar información en campos requeridos (Materia, Recursos,
															Descripción, Horario y Fecha en que se impartirá la clase)
														</p>
														<img className="logo-icon" src="assets/images/help/clases2.png" />
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Box>
							</Modal>
							{!loading.subjects && calendarsIds ? 
								calendarsIds.length ? (
									<div>
										<Calendar
											localizer={localizer}
											events={infoCalendarData.length == 0 ? [] : infoCalendarData}
											defaultView="week"
											messages={{
												next: 'Siguiente',
												previous: 'Anterior',
												today: 'Hoy',
												month: 'Mes',
												week: 'Semana',
												day: 'Día',
												noEventsInRange: 'No hay eventos programados'
											}}
											views={['day', 'week']}
											showMultiDayTimes
											startAccessor="start"
											endAccessor="end"
											eventPropGetter={event => ({
												style: {
													fontSize: '10px',
													backgroundColor: event.customColor,
													textAlign: 'center',
													alignContent: 'center',
													alignItems: 'center'
												}
											})}
											components={{
												event: CustomEvent
											}}
											formats={formats}
											className={classes.root}
											min={new Date(0, 0, 0, 8)}
											max={new Date(0, 0, 0, 18)}
											tooltipAccessor={null}
										/>
									</div>
								) : (
								<div className="flex flex-1 items-center justify-center h-200 xl:h-400">
									<Typography color="textSecondary" className="text-24 my-24 poppins">
										No se encontraron calendarios!
									</Typography>
								</div>
								)
								:
								<div className="flex flex-1 flex-col items-center justify-center h-200 xl:h-400">
									<Typography className="text-20 mb-16 poppins">
										Consultando información...
									</Typography>
									<CircularProgress color="secondary" />
								</div>
							}
						</div>
					</Card>
			) : (
				<Card className="contenedorCalendar h-full">
					<div className="flex flex-1 flex-col items-center justify-center">
						<Typography className="text-20 mb-16 poppins">
							Consultando información...
						</Typography>
						<CircularProgress color="secondary" />
					</div>
				</Card>
			)}
			<EventsCalendarEventDialog />
			<EventsCalendarDialog />
		</>
	);
}
export default EventsCalendarContent;
