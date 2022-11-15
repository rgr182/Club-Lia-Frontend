import React, { useEffect, useState, useRef } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
	Card,
	makeStyles,
	Button,
	MenuItem,
	Icon,
	IconButton,
	CircularProgress,
	createMuiTheme,
	LinearProgress,
	InputAdornment
} from '@material-ui/core';
import { showMessage } from '../../../../store/fuse/messageSlice';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileParent, openSuccessDialog, statusParentUpdate, createParentUser } from '../store/profileParentSlice';
import { useForm } from '@fuse/hooks';
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import SuccessDialog from './SuccessDialog';
import { useParams, useHistory } from 'react-router-dom';
import BackLink from 'app/ui/BackLink';

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: '10px',
				color: '#353535',
				backgroundColor: 'white',
				boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)',
				fontFamily: 'Poppins',
				borderRadius: '0%'
			}
		}
	}
});

const useStyles = makeStyles(theme => ({
	card: {
		flexWrap: 'wrap',
		display: 'flex',
		justifyContent: 'left',
		width: '100%',
		padding: '20px 50px',
		margin: '5px 5px 25px 5px',
		borderRadius: '10px',
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		color: '#353535',
		'-webkit-box-shadow': '0px 0px 15px 3px ' + theme.palette.primary.light + 'B3',
		boxShadow: '0px 0px 15px 3px ' + theme.palette.primary.light + 'B3',
		fontSize: '13px'
	},
	title: {
		color: theme.palette.primary.light,
		fontSize: '25px',
		fontFamily: `'grobold', 'rager'`
	},
	subTitle: {
		color: theme.palette.primary.light,
		fontSize: '18px',
		fontFamily: 'poppins'
	},
	yellowLabel: {
		background: '#F8CA27',
		color: '#FFFFFF',
		padding: '2px 15px',
		borderRadius: '5px'
	},
	blueLabel: {
		background: '#DFF5FF',
		fontWeight: '600'
	},
	button: {
		alignContent: 'center',
		textAlign: 'center',
		borderRadius: '45px',
		background: 'transparent',
		color: theme.palette.primary.main,
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid ' + theme.palette.primary.main + ' 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: theme.palette.primary.light,
			color: '#fff',
			borderColor: theme.palette.primary.light
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonFill: {
		background: theme.palette.primary.light,
		color: '#fff',
		border: 'solid ' + theme.palette.primary.light + ' 3px',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	yellowButton: {
		backgroundColor: '#F4B335',
		'&:hover': {
			backgroundColor: '#F4B335CC'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonFill: {
		background: theme.palette.primary.light,
		color: '#fff',
		border: 'solid ' + theme.palette.primary.light + ' 3px',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonRed: {
		color: '#FF2F54',
		border: 'solid #FF2F54 3px',
		'&:hover': {
			background: '#FF2F54',
			borderColor: '#FF2F54'
		}
	},
	redButton: {
		backgroundColor: '#FF2F54',
		'&:hover': {
			backgroundColor: '#FF2F54CC'
		}
	},
	select: {
		alignContent: 'left',
		textAlign: 'left',
		width: '100%',
		marginTop: '8px',
		marginRight: '7px',
		'& .MuiSelect-select': {
			borderRadius: '10px',
			background: 'transparent',
			color: '#353535',
			height: '18px',
			border: 'solid #BEBEBE 3px',
			fontFamily: 'Poppins',
			padding: '6px 3px',
			fontFamily: 'Poppins',
			'&:before, &:after, &:focus': {
				backgroundColor: 'transparent',
				border: 'solid #BEBEBE 3px',
				content: 'none'
			},
			'&:hover': {
				border: 'solid ' + theme.palette.primary.main + ' 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: theme.palette.primary.main
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover': {
				borderColor: 'transparent'
			}
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderColor: 'transparent'
		},
		'& .MuiSelect-select.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		}
	},
	textField: {
		width: '100%',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '10px',
			background: '#fff',
			color: '#353535',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid ' + theme.palette.primary.main + ' 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: theme.palette.primary.main
		},
		'& .MuiInput-root.Mui-error': {
			borderColor: '#FF2F54',
			color: '#FF2F54',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#FF2F54'
			}
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: '#FF2F54'
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover, &:focus-visible': {
				borderColor: 'transparent'
			}
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderColor: 'transparent'
		},
		'& ::-webkit-calendar-picker-indicator': {
			filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
		},
		'& .MuiInput-inputMultiline': {
			padding: '5px 3px'
		}
	},
	textFieldButton: {
		backgroundColor: 'transparent',
		width: '100%',
		borderRadius: '10px',
		background: 'transparent',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #BEBEBE 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		fontWeight: 'normal',
		textTransform: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		'&:before, &:after, &:focus, &:hover, &:focus-visible': {
			border: 'solid ' + theme.palette.primary.main + ' 3px',
			outlineColor: theme.palette.primary.main,
			backgroundColor: 'transparent'
		},
		'& .MuiButton-label': {
			justifyContent: 'left'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE !important',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonPlus: {
		width: '30px !important',
		height: '30px !important',
		background: theme.palette.primary.light,
		color: 'white',
		borderRadius: '50%'
	},
	buttonSubir: {
		width: '8vw',
		height: '35px',
		background: theme.palette.primary.light,
		borderRadius: '28px',
		fontFamily: 'Poppins',
		color: 'white',
		marginTop: '9px',
		marginLeft: '10px',
		textTransform: 'none'
	},
	tooltip: {
		width: '18px',
		height: '18px',
		background: theme.palette.primary.main,
		marginLeft: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		borderRadius: '50%',
		alignItems: 'center'
	},
	checkbox: {
		marginLeft: '5px',
		marginRight: '5px',
		'& > span': {
			fontFamily: 'Poppins'
		}
	},
	checkbox2: {
		background: 'white',
		borderRadius: '6px',
		borderBottomLeftRadius: '0%',
		paddingTop: '9px',
		borderBottomRightRadius: '0%',
		'& > span': {
			fontFamily: 'Poppins'
		}
	},
	componenteEduativo: {
		background: '#F5F5F5',
		borderTopLeftRadius: '6px',
		borderTopRightRadius: '6px',
		borderBottomLeftRadius: '0%',
		paddingTop: '9px',
		borderBottomRightRadius: '0%',
		'& > span': {
			fontFamily: 'Poppins'
		}
	},
	grayBackground: {
		backgroundColor: '#F5F5F5',
		borderRadius: '6px',
		borderTopLeftRadius: '0%'
	},
	labelRoot: {
		'& .MuiFormControlLabel-root': {
			marginLeft: '0px',
			marginRight: '0px',
			display: 'block'
		}
	},
	checkboxGrid: {
		display: 'grid',
		gap: '3rem',
		gridTemplateColumns: 'repeat(auto-fill, minmax(0rem, 140px))',
		width: '100%'
	}
}));

const defaultFormState = {
	username: '',
	password: '',
	c_password: ''
};

export default function ProfileParentContent(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const routeParams = useParams();
	const history = useHistory();

	const role = useSelector(({ auth }) => auth.user.role);
	const { form, handleChange, setForm, setInForm, resetForm } = useForm(defaultFormState);
	const profileParentData = useSelector(({ ProfileApp }) => ProfileApp.profileParent.profileParentData);
	const profileParentStatus = useSelector(({ ProfileApp }) => ProfileApp.profileParent.profileParentStatus);

	const [loading, setLoading] = useState(false);
	const [loadingForm, setLoadingForm] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordC, setShowPasswordC] = useState(false);

	const [statusP, setStatusP] = useState('En revision');
	const [comments, setComments] = useState('');

	const formRef = useRef(null);
	const divRef = useRef(null);

	useEffect(() => {
		if (profileParentStatus.error) {
			if (profileParentStatus.error.response.request.status == '500') {
				setLoadingForm(false);
				dispatch(showMessage({ message: profileParentStatus.error.response.data.message, variant: 'error' }));
			} else {
				setLoadingForm(false);
				dispatch(showMessage({ message: profileParentStatus.error.response.data.message, variant: 'error' }));
			}
		}
		if (profileParentStatus.success) {
			divRef.current.scrollIntoView();
			if (form.username) {
				dispatch(openSuccessDialog({ username: form.username, password: form.password }));
			} else {
				dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
			}
			resetFormState();
			setLoadingForm(false);
		}
	}, [profileParentStatus.error, profileParentStatus.success]);

	useEffect(() => {
		resetFormState();

		if (role == 'admin') {
			if (routeParams.id && !isNaN(parseInt(routeParams.id))) {
				setLoading(true);
				dispatch(getProfileParent(routeParams.id)).then(() => {
					setLoading(false);
				});
			}
		} else {
			history.push('/pages/errors/error-404');
		}
	}, []);

	useEffect(() => {
		if (profileParentData) {
			setStatusP(profileParentData.status);
			profileParentData.comments && setComments(profileParentData.comments);
		}
	}, [profileParentData]);

	function resetFormState() {
		resetForm();
		setStatusP('En revision');
		setComments('');
	}
	function disableButton() {
		setIsFormValid(false);
	}
	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm(values) {
		setForm(values);
	}
	function handleSubmit(event) {
		event.preventDefault();
		disableButton();
		setLoadingForm(true);
		const data = {
			id: routeParams.id,
			status: statusP,
			comments: comments
		};

		dispatch(statusParentUpdate(data));
	}

	function handleSubmitInfo(event) {
		event.preventDefault();
		disableButton();
		setLoadingForm(true);
		const data = {
			id: routeParams.id,
			username: form.username,
			password: form.password
		};

		dispatch(createParentUser(data));
	}

	const onBack = env => {
		env.preventDefault();
		history.goBack();
	};

	return (
		<>
			<div ref={divRef}>
				<FuseAnimateGroup
					className="flex flex-wrap justify-center"
					enter={{ animation: 'transition.slideUpBigIn' }}
				>
					<Formsy
						onChange={validateForm}
						onValid={enableButton}
						onInvalid={disableButton}
						ref={formRef}
						className="w-full"
					>
						<Card elevation={1} className={classes.card}>
							{loading ? (
								<div
									style={{ height: '600px' }}
									className="flex flex-1 flex-col items-center justify-center"
								>
									<div className="text-20 mb-16">Consultando información...</div>
									<CircularProgress color="primary" />
								</div>
							) : !profileParentData ? (
								<div
									style={{ height: '600px' }}
									className="flex flex-1 flex-col items-center justify-center"
								>
									<div className="text-20 mb-16">No se encontró información del padre.</div>
								</div>
							) : (
								<>
									<BackLink onBack={onBack} />
									<div className="w-full text-center pt-10">
										<h2 className={classes.title}>
											{profileParentData.name + ' ' + profileParentData.last_name}
										</h2>
									</div>
									{profileParentData.updated_at != profileParentData.created_at ? (
										<div className="w-full text-center pt-10">
											Último estatus asignado{' '}
											{' ( ' +
												profileParentData.updated_at.split('T')[0].replaceAll('-', ' / ') +
												' )'}
										</div>
									) : (
										<div className="w-full text-center pt-10">Estatus</div>
									)}
									<div className="w-full text-center pt-8">
										{profileParentData.status == 'En revision' && (
											<label className={classes.yellowLabel}>En proceso</label>
										)}
										{profileParentData.status == 'aceptado' && (
											<label className={classes.yellowLabel} style={{ background: '#26CD4A' }}>
												Aceptado
											</label>
										)}
										{(!profileParentData.status || profileParentData.status == 'no candidato') && (
											<label className={classes.yellowLabel} style={{ background: '#FF2F54' }}>
												No candidato
											</label>
										)}
									</div>
									{/*-------------------------INFORMACIÓN DEL TUTOR-----------------------------*/}
									<div className="w-full pt-32 font-semibold">
										<h2 className={classes.subTitle}>INFORMACIÓN DEL TUTOR</h2>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:pr-6">
										<div className="font-semibold">Nombre</div>
										<div>{profileParentData.name + ' ' + profileParentData.last_name}</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:px-12">
										<div className="font-semibold">Correo</div>
										<div>{profileParentData.email}</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:pl-6">
										<div className="font-semibold">Teléfono</div>
										<div>
											{profileParentData.phone_number ? profileParentData.phone_number : '-'}
										</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:pr-12">
										<div className="font-semibold">Ciudad de residencia</div>
										<div>{profileParentData.city ? profileParentData.city : '-'}</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:px-12">
										{profileParentData.username && (
											<>
												<div className="font-semibold">Usuario</div>
												<div> {profileParentData.username}</div>
											</>
										)}
									</div>
									<div className="w-full md:w-1/3 pt-28 md:pl-12"></div>
									{/*-------------------------INFORMACIÓN DEL HIJO/A  (OS/AS)-----------------------------*/}
									<div className="w-full pt-32 font-semibold">
										<h2 className={classes.subTitle}>INFORMACIÓN DEL HIJO/A (OS/AS)</h2>
									</div>
									<div className="w-full pt-28">
										<div className="font-semibold">Grados escolares de interés</div>
										{profileParentData.grades && profileParentData.grades.length > 0
											? profileParentData.grades.map((item, index) => (
													<span key={item.grade}>
														{item.grade +
															(index < profileParentData.grades.length - 1 ? ', ' : '')}
													</span>
											  ))
											: '-'}
									</div>
									<div className="w-full pt-28">
										<div className="font-semibold">Programas educativos inscritos</div>
										{profileParentData.education_program &&
										profileParentData.education_program.length > 0
											? profileParentData.education_program.map((item, index) => (
													<span key={item.program}>
														{item.program +
															(index < profileParentData.education_program.length - 1
																? ', '
																: '')}
													</span>
											  ))
											: '-'}
									</div>
									<div className="w-full pt-28">
										<div className="font-semibold">Información adicional</div>
										<div>
											{profileParentData.additional_information
												? profileParentData.additional_information
												: '-'}
										</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:pr-6">
										<div className="font-semibold">Requiere acreditación SEP</div>
										<div>{profileParentData.requires_sep == 0 ? 'No' : 'Si'}</div>
									</div>
									<div className="w-full md:w-1/3 pt-28 md:px-12">
										<div className="font-semibold">Fecha de inicio</div>
										<div>{profileParentData.start_date ? profileParentData.start_date : '-'}</div>
									</div>
									<div className="w-full md:w-1/3 md:pt-28 md:pl-6"></div>

									{/*-------------------------Estatus-----------------------------*/}
									{profileParentData.updated_at != profileParentData.created_at && (
										<>
											<div className="w-full pt-32 font-semibold">
												<h2 className={classes.subTitle}>Estatus</h2>
											</div>
											<div className="w-full pt-28">
												<div className="font-semibold pb-8">Último estatus asignado</div>
												<div>
													{profileParentData.status == 'En revision' && (
														<label className={classes.yellowLabel}>En proceso</label>
													)}
													{profileParentData.status == 'aceptado' && (
														<label
															className={classes.yellowLabel}
															style={{ background: '#26CD4A' }}
														>
															Aceptado
														</label>
													)}
													{(!profileParentData.status ||
														profileParentData.status == 'no candidato') && (
														<label
															className={classes.yellowLabel}
															style={{ background: '#FF2F54' }}
														>
															No candidato
														</label>
													)}
													{' ( ' +
														profileParentData.updated_at
															.split('T')[0]
															.replaceAll('-', ' / ') +
														' )'}
												</div>
											</div>

											{profileParentData.comments && (
												<>
													<div className="w-full pt-28">
														<div className="font-semibold">Comentario</div>
													</div>
													<div className={clsx(classes.blueLabel, 'w-full text-center p-20')}>
														<label>{profileParentData.comments}</label>
													</div>
												</>
											)}
										</>
									)}
									{/*-------------------------ACTUALIZAR ESTATUS-----------------------------*/}
									<div className="w-full pt-32 font-semibold">
										<h2 className={classes.subTitle}>ACTUALIZAR ESTATUS</h2>
									</div>
									<div className="w-full pt-28 md:w-1/3 md:pr-28">
										<SelectFormsy
											id="status"
											name="status"
											value={statusP}
											onChange={ev => setStatusP(ev.target.value)}
											className={classes.select}
										>
											<MenuItem className="poppins" value={'En revision'}>
												En proceso
											</MenuItem>
											<MenuItem className="poppins" value={'aceptado'}>
												Aceptado
											</MenuItem>
											<MenuItem className="poppins" value={'no candidato'}>
												No candidato
											</MenuItem>
										</SelectFormsy>
									</div>
									<div className="w-full md:pt-28 md:w-2/3"></div>
									<div className="w-full pt-28" style={{ height: '180px' }}>
										<TextFieldFormsy
											multiline
											type="text"
											name="comments"
											id="comments"
											value={comments}
											onChange={ev => setComments(ev.target.value)}
											validations={{
												maxLength: 255
											}}
											validationErrors={{
												maxLength: 'El máximo de carácteres permitidos es 255'
											}}
											className={classes.textField}
											rowsMax={7}
											rows={7}
										/>
									</div>
									<div className="w-full md:w-1/3 md:pt-28"></div>
									<div className="w-full md:w-1/3 pt-28 text-center">
										<Button
											className={clsx(classes.button, classes.buttonFill, 'px-56')}
											onClick={handleSubmit}
											disabled={
												!(
													statusP &&
													(statusP == 'aceptado' || (comments && comments.length < 255))
												)
											}
										>
											Actualizar estatus
										</Button>
									</div>
									<div className="w-full md:w-1/3 md:pt-28"></div>
									{/*-------------------------CREAR USUARIO-----------------------------*/}
									{!profileParentData.username && profileParentData.status == 'aceptado' && (
										<>
											<div className="w-full pt-32 font-semibold">
												<h2 className={classes.subTitle}>CREAR USUARIO</h2>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">
													Usuario <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="username"
													value={form.username}
													onChange={handleChange}
													validations={{
														minLength: 4,
														maxLength: 30
													}}
													validationErrors={{
														minLength: 'Minimo de caracteres es 4',
														maxLength: 'Máximo de caracteres es 30'
													}}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">
													Contraseña <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="password"
													name="password"
													value={form.password}
													onChange={handleChange}
													validations={{
														minLength: 8,
														maxLength: 30
													}}
													validationErrors={{
														minLength: 'Minimo de caracteres es 4',
														maxLength: 'Máximo de caracteres es 30'
													}}
													InputProps={{
														className: 'pr-2',
														type: showPassword ? 'text' : 'password',
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() => setShowPassword(!showPassword)}
																>
																	<Icon className="text-20" color="action">
																		{showPassword ? 'visibility' : 'visibility_off'}
																	</Icon>
																</IconButton>
															</InputAdornment>
														)
													}}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pl-6">
												<div className="font-semibold">
													Confirmar contraseña <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="password"
													name="c_password"
													value={form.c_password}
													onChange={handleChange}
													validations={{
														isEqual: function (values, value) {
															if (value) {
																return value == values.password;
															}
														}
													}}
													validationErrors={{
														isEqual: 'Las contraseñas no coinciden'
													}}
													InputProps={{
														className: 'pr-2',
														type: showPasswordC ? 'text' : 'password',
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() => setShowPasswordC(!showPasswordC)}
																>
																	<Icon className="text-20" color="action">
																		{showPasswordC
																			? 'visibility'
																			: 'visibility_off'}
																	</Icon>
																</IconButton>
															</InputAdornment>
														)
													}}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 md:pt-28"></div>
											<div className="w-full md:w-1/3 pt-28 text-center">
												<Button
													className={clsx(classes.button, classes.buttonFill, 'px-56')}
													onClick={handleSubmitInfo}
													disabled={!isFormValid}
												>
													Crear usuario
												</Button>
											</div>
										</>
									)}
									<div className="w-full md:w-1/3 md:pt-28"></div>
								</>
							)}
							<div className="w-full pt-80">{loadingForm && <LinearProgress />}</div>
						</Card>
					</Formsy>
				</FuseAnimateGroup>
				<SuccessDialog />
			</div>
		</>
	);
}
