import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import reducer from './store';
import { getCategories, selectCategories } from './store/categoriesSlice';
import { getGroups } from './store/groupSlice';
import { getCustomSubjects } from './store/customsubjectSlice';
import { getActivities, selectActivities, downloadActivity, openEditActivityDialog } from './store/activitiesSlice';

import { openUpdateDeliveryDialog } from './store/deliverySlice';
import { showMessage } from '../../../store/fuse/messageSlice';
import ActivitySidebarContent from './ActivitySideBarContent';
import '../../../../styles/newdesign.css';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	select: {
		width: '200px',
		borderRadius: '10px',
		background: 'transparent',
		color: '#353535',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #60CEFF 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		'&:before, &:after, &:focus': {
			border: 'solid transparent 0px',
			content: 'none'
		}
	},
	title: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '20px'
	},
	activityDescription: {
		fontFamily: 'Poppins',
		fontSize: '13px',
		color: '#353535',
		width: '95%',
		display: '-webkit-box',
		'-webkit-line-clamp': '3',
		'-webkit-box-orient': 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	estatusVencida: {
		fontFamily: 'Poppins',
		fontSize: '13px',
		color: '#353535',
	},
	estatusBorrador: {
		fontFamily: 'Poppins',
		fontSize: '13px',
		color: '#00B1FF',
	},
	button: {
		alignContent: "center",
		textAlign: "center",
		width: "150px",
		borderRadius: "45px",
		background: "transparent",
		color: "#00B1FF",
		height: "35px",
		marginTop: "8px",
		marginRight: "7px",
		border: "solid #00B1FF 3px",
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: "#60CEFF",
			color: "#fff",
			borderColor: "#60CEFF",

		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	buttonFill: {
		background: "#60CEFF",
		color: "#fff",
		border: "solid #60CEFF 3px",
		'&:hover': {
			backgroundColor: '#00B1FF',
			borderColor: '#00B1FF',
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	buttonRed: {
		color: "#FF2F54",
		border: "solid #FF2F54 3px",
		'&:hover': {
			background: "#FF2F54",
			borderColor: "#FF2F54",
		},
	},
	cardShadow: {
		boxShadow: '0px 0px 20px rgba(27, 129, 166, 0.1)'
	},
	pagination: {
		'& .MuiPaginationItem-root': {
			color: '#BEBEBE',
		},
		'& .MuiPaginationItem-page.Mui-selected': {
			color: '#00B1FF',
			backgroundColor: '#DFF5FF'
		}
	},
}));

const defaultFormState = {
	group_name: ''
};

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 16
	}
}))(Tooltip);

function ActivitiesList(props) {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const activities = useSelector(selectActivities);
	const loading = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.loading);
	const input = useSelector(({ fuse }) => fuse.input.texto);
	const role = useSelector(({ auth }) => auth.user.role);
	const classes = useStyles(props);
	const theme = useTheme();
	const divRef = useRef(null);
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [fromDashboard, setFromDashboard] = useState(true);
	const [searchA, setSearchA] = useState([]);
	const [page, setPage] = useState(1);

	const handlePageChange = (event, value) => {
		setPage(value);
		if (value != page) {
			divRef.current.scrollIntoView();
		}
	};

	useEffect(() => {
		const array = [];
		if (searchA.length > 0) {
			searchA.filter(elemento => {
				if (elemento.name.toString().toLowerCase().includes(input.toLowerCase())) {
					array.push(elemento);
				}
			});
		}
		if (array) {
			setPage(1);
			setFilteredData(array);
		}
	}, [input]);

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getActivities(role));
		dispatch(getGroups());
		dispatch(getCustomSubjects());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			setPage(1);
			if (searchText.length === 0 && selectedCategory === 'all') {
				return activities;
			}

			return _.filter(activities, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}
				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (activities) {
			setFilteredData(getFilteredArray());
			setSearchA(getFilteredArray());
		}
		if (props.params.id > 0 && activities.length && fromDashboard) {
			dispatch(
				openUpdateDeliveryDialog(
					activities.find(obj => {
						return obj.id == props.params.id;
					})
				)
			);
			setFromDashboard(false);
		}
	}, [activities, searchText, selectedCategory]);

	return (
		<>
			<Card elevation={1} class="card3 h-full">
				<div className="flex flex-col flex-1 w-full mx-auto px-24">
					<div className="flex-row" ref={divRef}>
						<ActivitySidebarContent />
					</div>

					{useMemo(
						() =>
							!loading ? (
								filteredData &&
								(filteredData.length > 0 ? (
									<FuseAnimateGroup
										enter={{
											animation: 'transition.slideUpBigIn'
										}}
										className="flex flex-wrap"
									>
										{filteredData.slice((page - 1) * 6, ((page - 1) * 6) + 6).map((course, index) => {
											const category = activities.find(_cat => _cat.value === course.category);
											return (
												<div
													className={"w-full pb-24 sm:w-1 lg:w-1/2 py-24 " + (index % 2 == 0 ? "lg:pr-24" : "lg:pl-24")}
													key={course.id}
													style={{ height: '340px' }}
												>
													<Card
														elevation={1}
														className={clsx("flex flex-col h-700 rounded-5", classes.cardShadow)}
														style={{ height: '100%' }}
													>
														<div
															className="flex flex-shrink-0 items-center justify-between px-24 h-40"
															style={{
																background:
																	course.is_active == 3
																		? '#BEBEBE'
																		: course.custom_color,
																color: theme.palette.getContrastText('#2196f3')
															}}
														>
															<div className="flex-direction: column, items-center ">
																<Typography
																	className="font-medium truncate"
																	color="inherit"
																>
																	{course.custom_name.length > 20 ? course.custom_name.slice(0, 20) + '...' : course.custom_name}
																</Typography>
															</div>
															<div className="flex-direction: column, items-center justify-center opacity-75">
																<div className="text-16 whitespace-no-wrap text-right">
																	<Typography
																		className="font-medium truncate"
																		color="inherit"
																	>
																		{course.group_name.length > 20
																			? `${course.group_name.slice(0, 20)}...`
																			: course.group_name}
																	</Typography>
																</div>
															</div>
														</div>
														<CardContent className="flex flex-col flex-auto items-center justify-center" style={{ backgroundColor: course.is_active == 3 ? '#F5F5F5' : '#fff' }}>
															<Typography className={clsx(classes.activityDescription, "text-center text-15 font-600 mt-2")}>
																{course.name.length > 18
																	? `${course.name.slice(0, 18)}...`
																	: course.name}
															</Typography>
															<Typography className={clsx(classes.activityDescription, "text-center font-600 mt-4 mb-12 fixed-bottom")}>
																Fecha de entrega: {course.finish_date}
															</Typography>
															<Typography className={clsx(classes.activityDescription, "pt-8 h-64 text-center")}>
																{course.instructions
																	? course.instructions
																	: 'Sin Instrucciones'}
															</Typography>


															{course.file &&
																(role == 'alumno' ||
																	role == 'alumno_secundaria' ||
																	role == 'preescolar' ||
																	role == 'alumnoe0' ||
																	role == 'alumnoe1' ||
																	role == 'alumnoe2' ||
																	role == 'alumnoe3' ||
																	role == 'Alumno-I' ||
																	role == 'Alumno-M' ||
																	role == 'Alumno-A') ? (
																<IconButton
																	onClick={ev => {
																		ev.stopPropagation();
																		dispatch(downloadActivity(course.file));
																	}}
																>
																	<Typography className="text-center text-13 font-600 mt-4">
																		Descargar Archivo
																	</Typography>

																	<Icon className="text-center text-13 font-600 mt-4 ml-4">
																		save_alt
																	</Icon>
																</IconButton>
															) : course.url &&
																(role == 'alumno' ||
																	role == 'alumno_secundaria' ||
																	role == 'preescolar' ||
																	role == 'alumnoe0' ||
																	role == 'alumnoe1' ||
																	role == 'alumnoe2' ||
																	role == 'alumnoe3' ||
																	role == 'Alumno-I' ||
																	role == 'Alumno-M' ||
																	role == 'Alumno-A') ? (
																<IconButton
																	onClick={ev => {
																		ev.stopPropagation();
																		navigator.clipboard.writeText(course.url);
																		dispatch(
																			showMessage({ message: 'Enlace copiado' })
																		);
																	}}
																>
																	<Typography className="text-center text-13 font-600 mt-4">
																		Copiar Enlace
																	</Typography>

																	<Icon className="text-center text-13 font-600 mt-4 ml-4">
																		link
																	</Icon>
																</IconButton>
															) : course.url &&
																(role == 'alumno' ||
																	role == 'alumno_secundaria' ||
																	role == 'preescolar' ||
																	role == 'alumnoe0' ||
																	role == 'alumnoe1' ||
																	role == 'alumnoe2' ||
																	role == 'alumnoe3' ||
																	role == 'Alumno-I' ||
																	role == 'Alumno-M' ||
																	role == 'Alumno-A') ? (
																<IconButton
																	onClick={ev => {
																		ev.stopPropagation();
																		navigator.clipboard.writeText(course.url);
																		dispatch(
																			showMessage({ message: 'Enlace copiado' })
																		);
																	}}
																>
																	<Typography className="text-center text-13 font-600 mt-4">
																		Copiar Enlace
																	</Typography>

																	<Icon className="text-center text-13 font-600 mt-4 ml-4">
																		link
																	</Icon>
																</IconButton>
															) : null}
														</CardContent>
														{role == 'maestro' ||
															role == 'maestro_preescolar' ||
															role == 'maestro_secundaria' ||
															role == 'profesor_summit_2021' ||
															role == 'maestroe1' ||
															role == 'maestroe2' ||
															role == 'maestroe3' ||
															role == 'Maestro-I' ||
															role == 'Maestro-M' ||
															role == 'Maestro-A' ||
															role == 'Maestro-I-preescolar' ||
															role == 'Maestro-M-preescolar' ||
															role == 'Maestro-A-preescolar' ||
															role == 'Maestro-I-secundaria' ||
															role == 'Maestro-M-secundaria' ||
															role == 'Maestro-A-secundaria' 
															? (
															<>
																{course.is_active != 2 && course.is_active != 0 ? (
																	<CardActions className="justify-center" style={{ backgroundColor: course.is_active == 3 ? '#F5F5F5' : '#fff' }}>
																		<Button
																			to={`/apps/editarActividades/${course.id}`}
																			component={Link}
																			className={clsx(classes.button, classes.buttonFill)}
																		>
																			Ver{' '}
																			{course.status_entregada > 0 && (
																				<strong>
																					&nbsp;{course.status_entregada}
																				</strong>
																			)}
																		</Button>
																		<Button
																			to={`/apps/tareas/${course.id}/${course.name}`}
																			component={Link}
																			className={clsx(classes.button, classes.buttonFill)}
																		>
																			Calificar
																		</Button>
																	</CardActions>
																) : (
																	<CardActions className="justify-center">
																		<Button
																			style={{ width: '160px' }}
																			className={clsx(classes.button, classes.buttonFill)}
																			to={`/apps/editarActividades/${course.id}`}
																			component={Link}
																		>
																			Continuar editando
																		</Button>
																	</CardActions>
																)}
															</>
														) : (
															<CardActions className="justify-center">
																<Typography
																	className="font-medium truncate"
																	color="inherit"
																>
																	{course.status}: {course.score} -{' '}
																	{course.scored_date}
																</Typography>
															</CardActions>
														)}
														{course.is_active == 0 ? (
															<div className="flex text-center pt-4 pb-12 items-center justify-center">
																<Icon className="mr-10" color="primary">access_time</Icon>
																<Typography className={classes.estatusBorrador} color="primary">Progamada para {course.public_day}</Typography>
															</div>
														) : null}
														{course.is_active == 1 ? (
															<>
																<div>
																	<br />
																	<br />
																</div>
															</>
														) : null}
														{course.is_active == 2 ? (
															<div className="flex text-center pt-4 pb-12 items-center justify-center">
																<Icon className="mr-10" color="primary">edit</Icon>
																<Typography className={classes.estatusBorrador} color="primary">Esta tarea es un borrador</Typography>
															</div>
														) : null}
														{course.is_active == 3 ? (
															<div className="flex text-center pt-4 pb-12 items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
																<Icon className="mr-10" color="textSecondary">visibility_off</Icon>
																<Typography className={classes.estatusVencida}>Esta tarea está vencida</Typography>
															</div>
														) : null}
													</Card>
												</div>
											);
										})}
										<div className='flex justify-center pt-24 w-full'>
											<Pagination
												count={Math.floor(filteredData.length / 6) + (filteredData.length % 6 != 0 ? 1 : 0)}
												page={page}
												onChange={handlePageChange}
												size="small"
												className={classes.pagination}
											/>
										</div>
									</FuseAnimateGroup>
								) : (
									<div className="flex flex-1 items-center justify-center">
										<Typography color="textSecondary" className="text-24 my-24 poppins">
											No se encontraron tareas!
										</Typography>
									</div>
								))
							) : (
								<div className="flex flex-1 flex-col items-center justify-center">
									<Typography className="text-20 mb-16 poppins">
										Consultando información...
									</Typography>
									<CircularProgress color="secondary" />
								</div>
							),
						[categories, filteredData, theme.palette, page]
					)}
				</div>
			</Card>
		</>
	);
}

export default withReducer('ActivitiesApp', reducer)(ActivitiesList);
