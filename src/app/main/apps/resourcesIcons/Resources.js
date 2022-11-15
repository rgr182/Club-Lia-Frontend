import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { getResources } from './store/resourceSlice';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Iframe from 'react-iframe';
import { getVerify, setValidURLReset } from './store/verifyURLSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackButton from '../preescolar/components/BackButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
// import logFirebaseEvent from 'app/main/firebase/FirebaseEvents';

const useClasses = makeStyles(() => ({
	islandBtn: {
		backgroundColor: 'transparent',
		textTransform: 'none',
		borderBottom: 'none',
		cursor: 'default'
	},
	islandLbl: {
		backgroundColor: 'transparent',
		textTransform: 'none',
		borderBottom: 'none'
	},
	Text: {
		fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '30px' : '22px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center',
		textTransform: 'none'
	},
	textclose: {
		color: 'white'
	},
	imgIcon: {
		height: '100px'
	},
	buttonText: {
		fontSize: '25px',
		color: 'white',
		textShadow: '2px 2px 2px black'
	},
	closeButton: {
		backgroundColor: 'rgb(255, 255, 255, 0.2)',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		'&:hover': {
			backgroundColor: 'rgb(255, 255, 255, 0.4)'
		}
	},
	borde: {
		'& .MuiInputBase-input': {
			fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
			fontSize: ({ nivel }) => (nivel == 2 ? '20px' : '14px'),
			color: '#fff',
			textShadow: '2px 2px 2px #595959'
		},
		'& .MuiOutlinedInput-root': {
			'&:hover fieldset': {
				borderColor: '#595959'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#595959'
			}
		}
	},
	item: ({ nivel }) =>
		nivel == 2
			? {
					fontFamily: 'haettenschweilerRegular',
					fontSize: '20px'
			  }
			: {
					fontFamily: `'grobold', 'rager'`,
					fontSize: '14px'
			  }
}));

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 16
	}
}))(Tooltip);

function Resources(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	let role = useSelector(({ auth }) => auth.user.role);
	const user = useSelector(({ auth }) => auth.user);
	const grade = useSelector(({ auth }) => auth.user.grade);
	const school = useSelector(({ auth }) => auth.user.school_name);
	const resources = useSelector(({ ResourcesIconsApp }) => ResourcesIconsApp.resources.data);
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	const validURL = useSelector(({ ResourcesIconsApp }) => ResourcesIconsApp.verifyURL.validURL);

	if (role !== 'alumno' && role !== 'alumno_secundaria' && role !== 'preescolar') {
		level_id === 1 ? (role = 'preescolar') : level_id === 2 ? (role = 'alumno') : (role = 'alumno_secundaria');
	}
	const nivel = (role === 'alumno' && grade > 3) || role === 'alumno_secundaria' ? 2 : role === 'preescolar' ? 0 : 1;

	const [visibleIcons, setVisibleIcons] = useState(false);
	const [visibleIframe, setVisibleIframe] = useState(false);
	const [resourceURL, setResourceURL] = useState('');
	const [bloque, setBloque] = useState(0);
	const [gradeFilter, setGradeFilter] = useState(0);
	const [values, setValues] = useState({
		loading: false
	});

	const params = {
		id: routeParams.id,
		globalSchooling:
			school === 'Global Schooling' || school === 'CASA PACO' || school === 'Casa Hogar Eugenio Olaez A.C.'
				? 1
				: 0
	};
	const limited = user.role === 'Alumno-I';
	const nameSubject = routeParams.name;
	let categoria = 'verde';

	if (nameSubject === 'Geografía' || nameSubject === 'Ciencias naturales') {
		categoria = 'verde';
	} else if (nameSubject === 'Historia' || nameSubject === 'Arte') {
		categoria = 'rosa';
	} else if (nameSubject === 'Inglés' || nameSubject === 'Español') {
		categoria = 'morado';
	} else if (
		nameSubject === 'Tecnología y Habilidades Digitales' ||
		nameSubject === 'Matemáticas' ||
		nameSubject === 'STEM'
	) {
		categoria = 'azul';
	} else if (
		nameSubject === 'Formación Cívica y Ética' ||
		nameSubject === 'Salud y Bienestar' ||
		nameSubject === 'Mindfulness' ||
		nameSubject === 'Educación Socioemocional'
	) {
		categoria = 'naranja';
	}

	const classes = useClasses({ nivel });

	useDeepCompareEffect(() => {
		setValues({ loadingResources: true });
		dispatch(getResources(params)).then(() => {
			setValues({ loadingResources: false });
		});
		showIcons();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (validURL.valid === true) {
			setValues({ loading: false });
			setVisibleIframe(true);
		} else {
			if (validURL.url !== '') {
				setValues({ loading: false });
				window.open(validURL.url, '_blank');
				showIcons();
			} else {
				setVisibleIcons(true);
				setVisibleIframe(false);
			}
		}
	}, [validURL]);

	function showIcons() {
		dispatch(setValidURLReset());
		setVisibleIcons(true);
		setVisibleIframe(false);
	}

	function requestURL(value) {
		setValues({ loading: true });
		setVisibleIcons(false);
		setResourceURL(value);
		dispatch(getVerify(value));
	}

	function filter(event) {
		setBloque(event.target.value);
	}
	function filterGrade(event) {
		setGradeFilter(event.target.value);
	}

	function onResourceClick(resource) {
		console.log(resource);
		requestURL(resource.url_resource);
		const eventName = `A_${resource.name.replaceAll(' ', '_')}`;
		// logFirebaseEvent(eventName, user);
	}

	return (
		<div
			className="flex-1"
			style={{
				backgroundImage: `url(assets/images/resources/${categoria}.png)`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}
		>
			<FuseAnimateGroup
				className="flex flex-wrap p-64 mt-50 h-full"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex w-full flex-wrap px-180">
					<div className="float flex flex-col w-full md:w-1/4">
						<div className="flex w-full flex-wrap">
							<div className="md:w-full sm:w-2/3 xs:w-full text-center">
								<Button disableRipple className={classes.islandBtn} type="button">
									<img
										className={clsx(classes.img)}
										src={
											'assets/images/resources/islands/' +
											nameSubject
												.replace('í', 'i')
												.replace('ó', 'o')
												.replace('á', 'a')
												.replace('é', 'e')
												.replace('ñ', 'n')
												.replace('É', 'E') +
											'.png'
										}
									/>
								</Button>
								<Button disableRipple className={classes.islandLbl} type="button">
									<Typography className={classes.Text} style={{ textTransform: 'uppercase' }}>
										{nameSubject}
									</Typography>
								</Button>
							</div>
							<div className="flex w-full flex-wrap md:w-full sm:w-1/3 xs:w-full"></div>
						</div>
					</div>

					{limited && nameSubject !== 'Matemáticas' ? (
						<div className="flex w-full md:w-3/4 items-start justify-center flex-wrap flex-row mb-40 flex-col">
							<Typography
								className={classes.Text}
								style={{ textTransform: 'uppercase', justifySelf: 'center' }}
							>
								Diviértete al máximo y adquiere una membresía mensual o anual.
							</Typography>
						</div>
					) : (
						<div className="flex w-full md:w-3/4 items-start justify-right flex-wrap flex-row mb-40">
							{resources && resources.length && visibleIcons && !values.loadingResources && (
								<>
									<div className="flex w-full flex-wrap h-fit">
										<div id="container" className="w-full flex-row flex-wrap">
											<FormControl
												className={clsx(classes.borde, 'flex-wrap flex-row p-50 m-8')}
												variant="outlined"
											>
												<Select
													id="bloque"
													name="bloque"
													InputLabelProps={{ shrink: false }}
													value={bloque}
													onChange={filter}
													style={{ backgroundColor: 'rgb(255, 255, 255, 0.4)' }}
												>
													<MenuItem className={classes.item} key={'bloque0'} value={0}>
														Todos
													</MenuItem>
													<MenuItem className={classes.item} key={'bloque1'} value={1}>
														Bloque 1
													</MenuItem>
													<MenuItem className={classes.item} key={'bloque2'} value={2}>
														Bloque 2
													</MenuItem>
													<MenuItem className={classes.item} key={'bloque3'} value={3}>
														Bloque 3
													</MenuItem>
												</Select>
											</FormControl>

											{params.globalSchooling === 1 ? (
												<FormControl
													className={clsx(classes.borde, 'flex-wrap flex-row p-50 m-8')}
													variant="outlined"
												>
													<Select
														id="grade"
														name="grade"
														InputLabelProps={{ shrink: false }}
														value={gradeFilter}
														onChange={filterGrade}
														style={{ backgroundColor: 'rgb(255, 255, 255, 0.4)' }}
													>
														<MenuItem className={classes.item} key={'grade0'} value={0}>
															Grado
														</MenuItem>
														<MenuItem className={classes.item} key={'grade1'} value={1}>
															1°
														</MenuItem>
														<MenuItem className={classes.item} key={'grade2'} value={2}>
															2°
														</MenuItem>
														<MenuItem className={classes.item} key={'grade3'} value={3}>
															3°
														</MenuItem>
														<MenuItem className={classes.item} key={'grade4'} value={4}>
															4°
														</MenuItem>
														<MenuItem className={classes.item} key={'grade5'} value={5}>
															5°
														</MenuItem>
														<MenuItem className={classes.item} key={'grade6'} value={6}>
															6°
														</MenuItem>
													</Select>
												</FormControl>
											) : null}
										</div>

										{resources.map(
											(row, index) =>
												(bloque === 0 || row.bloque === bloque) &&
												(gradeFilter === 0 || row.grade === gradeFilter) && (
													<div
														className="flex md:w-1/6 w-1/2 my-20 flex-wrap flex-row justify-center md:justify-right pepe"
														styles={{ backgroundColor: 'red' }}
														key={row.name + index}
													>
														<Button
															disableRipple
															style={{
																backgroundColor: 'transparent',
																textTransform: 'none',
																borderBottom: 'none'
															}}
															onClick={() => onResourceClick(row)}
															to={row.url_resource}
															target="_blank"
															type="button"
														>
															<LightTooltip title={row.name} placement="bottom">
																<img
																	className={clsx(classes.imgIcon)}
																	src={
																		'assets/images/resources/iconos/' +
																		row.category_name
																			.replace('ó', 'o')
																			.replace('á', 'a') +
																		'.svg'
																	}
																/>
															</LightTooltip>
														</Button>
													</div>
												)
										)}
									</div>
								</>
							)}
							{!values.loadingResources &&
								(!(resources && resources.length) ||
								(bloque !== 0 && !JSON.stringify(resources).includes(`"bloque":${bloque}`)) ||
								(gradeFilter !== 0 && !JSON.stringify(resources).includes(`"grade":${gradeFilter}`)) ? (
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography className={clsx(classes.Text)}>
											{'No hay Recursos que mostrar!'}
										</Typography>
									</div>
								) : null)}
							{visibleIframe ? (
								<div
									className="flex w-full h-full items-center justify-center text-center flex-wrap flex-row"
									style={{ minHeight: '480px' }}
								>
									<div className="flex w-full justify-end">
										<IconButton
											onClick={showIcons}
											className={clsx(classes.closeButton, classes.textclose)}
											size="medium"
										>
											<label color="white">Cerrar</label>
										</IconButton>
									</div>
									<Iframe
										url={validURL.url}
										className="myClassname w-full h-full"
										display="initial"
										position="relative"
									/>
								</div>
							) : null}
							{values.loading || values.loadingResources ? (
								<div className="flex flex-1 items-center justify-center h-full">
									<CircularProgress color="secondary" />
								</div>
							) : null}
						</div>
					)}
				</div>

				<BackButton goBack={props.history.goBack} />
			</FuseAnimateGroup>
		</div>
	);
}
export default withReducer('ResourcesIconsApp', reducer)(Resources);
