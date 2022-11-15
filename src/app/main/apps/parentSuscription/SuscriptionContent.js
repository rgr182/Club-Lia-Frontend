import React, { useEffect, useState, useRef } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
	Card,
	makeStyles,
	Button,
	MenuItem,
	Icon,
	IconButton,
	createMuiTheme,
	FormControlLabel,
	RadioGroup,
	Radio
} from '@material-ui/core';
import { showMessage } from '../../../store/fuse/messageSlice';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '@fuse/hooks';
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import './parentSuscription.css';
import { registerParent } from './store/registerSlice';
import nacionalities from '../../pages/Jsons/Nacionalities.json';
import SubscriptionCard from './components/SubscriptionCard';

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
		justifyContent: 'center',
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
		fontSize: '30px',
		fontFamily: `'wendyone', 'rager'`
	},
	subTitle: {
		color: '#353535',
		fontSize: '13px',
		fontFamily: 'poppins',
		textAlign: 'center'
	},
	subTitle2: {
		color: '#1EC6BC',
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
		color: theme.palette.primary.light,
		fontWeight: '600'
	},
	button: {
		alignContent: 'center',
		textAlign: 'center',
		borderRadius: '45px',
		background: 'transparent',
		color: theme.palette.primary.main,
		height: '34px',
		width: '213px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid ' + theme.palette.primary.main + ' 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		fontSize: 13,
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
	},
	cardsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '20px',
		color: '#353535'
	},
	required: {
		color: '#1EC6BC'
	},
	emailError: {
		color: '#1EC6BC'
	}
}));

const defaultFormState = {
	subscription: '',
	suscriptionCount: '',
	children: [
		{
			name: '',
			last_name: '',
			level: '',
			grade: '',
			username: '',
			password: '',
			c_password: '',
			gender: '',
			nacionality: ''
		}
	]
};

var suscriptionCount = 1;

export default function SuscriptionContent(props) {
	const formRef = useRef(null);
	const classes = useStyles(props);
	const { form, setForm } = useForm(defaultFormState);

	const dispatch = useDispatch();
	const parentRegister = useSelector(({ PricingApp }) => PricingApp.register.register);

	const [showPasswordC, setShowPasswordC] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const onlyLettersRegex = /^[a-z, áéíóúñÑ]+$/i;

	const errorValidation = {
		minLength: 'El mínimo de caracteres es 3',
		maxLength: 'El máximo de caracteres es 150',
		includesSChars: 'No se permiten caracteres especiales'
	};

	useEffect(() => {
		if (parentRegister.error) {
			dispatch(showMessage({ message: parentRegister.error.response.data.message, variant: 'error' }));
			enableButton();
		}

		if (parentRegister.success) {
			dispatch(showMessage({ message: parentRegister.response.message, variant: 'success' }));
			if (parentRegister.response.data.order) {
				localStorage.setItem('id_order', parentRegister.response.data.order);
			} else {
				localStorage.removeItem('id_order');
			}
			window.open(parentRegister.response.data.init_point, '_self');
		}
	}, [parentRegister.error, parentRegister.success]);

	const disableButton = () => {
		setIsFormValid(false);
	};

	function enableButton() {
		setIsFormValid(true);
	}

	function deleteSon(index) {
		suscriptionCount--;
		setForm({ ...form, children: form.children.filter((item, idx) => idx !== index) });
	}

	function handleInput(e, index) {
		// ------ Getting values from input
		const { name, value } = e.target;

		// ------ Replacing children data and adding to Form
		const children = form.children;
		children[index] = { ...children[index], [name]: value };

		setForm({ ...form, children: children });
	}

	function handleInputSelect(e, index, field) {
		// ------ Getting values from input
		const { value } = e.target;
		const name = field;

		// ------ Replacing children data and adding to Form
		const children = form.children;
		children[index] = { ...children[index], [name]: value };

		setForm({ ...form, children: children });
	}

	function handleChangeSelect(e, field) {
		// ------ Getting values from input
		const { value } = e.target;
		const name = field;

		// ------ Adding value to Form
		const formAux = form;
		formAux[name] = value;
		setForm({ ...formAux });
	}

	const handleSubmit = () => {
		form.suscriptionCount = suscriptionCount;
		dispatch(registerParent(form));
	};

	function calculate(subscription, isTotal) {
		switch (subscription) {
			case 'mensual':
				return isTotal ? suscriptionCount * 2000 + suscriptionCount * 2000 : suscriptionCount * 2000;
			case 'semestral':
				return isTotal ? suscriptionCount * 10000 + suscriptionCount * 2000 : suscriptionCount * 10000;
			case 'anual':
				return isTotal ? suscriptionCount * 2000 + suscriptionCount * 2000 : suscriptionCount * 2000;
			default:
				return isTotal ? 2000 : 0;
		}
	}

	return (
		<div>
			<FuseAnimateGroup
				className="flex flex-wrap justify-center"
				enter={{ animation: 'transition.slideUpBigIn' }}
			>
				<Formsy
					onValidSubmit={handleSubmit}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef}
					className="w-full"
				>
					<Card elevation={1} className={classes.card}>
						<>
							<div className="w-full text-center pt-10">
								<Typography color="primary" style={{ fontSize: 30, fontFamily: 'wendyone' }}>
									Adquiere una suscripción
								</Typography>
							</div>
							<div className="w-full text-center pt-8">
								<label
									className={classes.yellowLabel}
									style={{ background: '#CDF5F5', color: '#139E96' }}
								>
									Inscripción incluida: $2,000 MXN
								</label>
							</div>

							<div class="flex" style={{ gap: 30 }}>
								<SubscriptionCard title="Mensual" price="2,000" description="Pago mensual" />
								<SubscriptionCard
									title="Semestral"
									price="10,000"
									description="Ahorro mensual e inscripción incluida"
								/>
								<SubscriptionCard
									title="Anual"
									price="20,000"
									description="Acceso los 12 meses del año Ahorro mensual e inscripción incluida"
								/>
							</div>

							{/*-------------------------INFORMACIÓN DE LA CUENTA-----------------------------*/}
							<div className="w-full md:w-2/2 pt-32 font-semibold">
								<h2 className={classes.subTitle2}>
									Por favor, llena los siguientes campos con los datos de tu hijo/a
								</h2>
							</div>

							<div className="w-full sm:w-1 md:w-1/3 py-12  md:pr-20">
								<div className="font-semibold">
									Tipo de suscripción <span className={classes.required}>*</span>
								</div>
								<SelectFormsy
									id="subscription"
									name="subscription"
									value={form.subscription}
									onChange={e => handleChangeSelect(e, 'subscription')}
									className={classes.select}
									displayEmpty
									required
								>
									<MenuItem className="poppins" value="" disabled>
										Elige una opción
									</MenuItem>
									<MenuItem className="poppins" value={'mensual'}>
										Mensual
									</MenuItem>
									<MenuItem className="poppins" value={'semestral'}>
										Semestral
									</MenuItem>
									<MenuItem className="poppins" value={'anual'}>
										Anual
									</MenuItem>
								</SelectFormsy>
							</div>

							<div className="w-full sm:w-1 md:w-2/3 py-12 md:px-20"></div>

							{/* -------------Children form-------------*/}

							{form.children && !!form.children.length ? (
								<>
									{form.children &&
										form.children.map((child, index) => (
											<div
												className="flex flex-wrap flex-row w-full border-b-1 pb-48"
												name="sons"
											>
												<div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
													<div className="font-semibold">
														Nombre(s) <span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="text"
														name={'name'}
														value={form.children[index].name}
														onChange={e => handleInput(e, index)}
														validations={{
															minLength: 3,
															maxLength: 150,
															includesSChars: function (values, value) {
																if (value) {
																	return onlyLettersRegex.test(value);
																}
																return true;
															}
														}}
														last_name
														validationErrors={errorValidation}
														required
													/>
												</div>
												<div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
													<div className="font-semibold">
														Apellido(s) <span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="text"
														name="last_name"
														value={form.children[index].last_name}
														onChange={e => handleInput(e, index)}
														validations={{
															minLength: 3,
															maxLength: 150,
															includesSChars: function (values, value) {
																if (value) {
																	return onlyLettersRegex.test(value);
																}
																return true;
															}
														}}
														validationErrors={errorValidation}
														required
													/>
												</div>

												<div className="w-full sm:w-1 md:w-1/3 py-12  md:pl-20">
													<div className="font-semibold">
														Nivel Educativo <span className={classes.required}>*</span>
													</div>
													<SelectFormsy
														className={classes.textField}
														id="level"
														name="level"
														value={form.children[index].level}
														onChange={e => handleInputSelect(e, index, 'level')}
														displayEmpty
														required
													>
														<MenuItem className="poppins" value="" disabled>
															Elige una opción
														</MenuItem>
														<MenuItem className="poppins" key={1} value={1}>
															Preescolar
														</MenuItem>
														<MenuItem className="poppins" key={2} value={2}>
															Primaria
														</MenuItem>
														<MenuItem className="poppins" key={3} value={3}>
															Secundaria
														</MenuItem>
													</SelectFormsy>
												</div>

												<div className="w-full sm:w-1 md:w-1/3 py-12  md:pr-20">
													<div className="font-semibold">
														Grado <span className={classes.required}>*</span>
													</div>
													<SelectFormsy
														className={classes.textField}
														id="grade"
														name="grade"
														value={form.children[index].grade}
														onChange={e => handleInputSelect(e, index, 'grade')}
														displayEmpty
														required
													>
														<MenuItem className="poppins" value="" disabled>
															Elige una opción
														</MenuItem>
														<MenuItem className="poppins" key={'grade1'} value={1}>
															1°
														</MenuItem>
														<MenuItem className="poppins" key={'grade2'} value={2}>
															2°
														</MenuItem>
														<MenuItem className="poppins" key={'grade3'} value={3}>
															3°
														</MenuItem>
														{child.level === 2 && (
															<>
																<MenuItem className="poppins" key={'grade4'} value={4}>
																	4°
																</MenuItem>
																<MenuItem className="poppins" key={'grade5'} value={5}>
																	5°
																</MenuItem>
																<MenuItem className="poppins" key={'grade6'} value={6}>
																	6°
																</MenuItem>
															</>
														)}
													</SelectFormsy>
												</div>

												<div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
													<div className="font-semibold">
														Correo electrónico (de tu hijo/a){' '}
														<span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="email"
														name="email"
														value={form.children[index].email}
														onChange={e => handleInput(e, index)}
														validations="isEmail"
														validationErrors={{
															isEmail: 'Por favor ingresa un correo válido'
														}}
														required
													/>
													<label className={classes.emailError}>
														El correo deberá ser distinto al tuyo
													</label>
												</div>
												<div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
													<div className="font-semibold">
														Nacionalidad <span className={classes.required}>*</span>
													</div>
													<SelectFormsy
														id="nacionality"
														name="nacionality"
														className={classes.select}
														value={form.children[index].nacionality}
														onChange={e => handleInputSelect(e, index, 'nacionality')}
														displayEmpty
														required
													>
														<MenuItem className="poppins" value="" disabled>
															Elige una opción
														</MenuItem>
														{Object.keys(nacionalities).map(nacionality => (
															<MenuItem
																className="poppins"
																key={nacionality}
																value={nacionality}
															>
																{nacionality}
															</MenuItem>
														))}
													</SelectFormsy>
												</div>

												<div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
													<div className="font-semibold">
														Crea un usuario para tu hijo/a{' '}
														<span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="text"
														name="username"
														value={form.children[index].username}
														onChange={e => handleInput(e, index)}
														validations={{
															minLength: 2,
															maxLength: 30
														}}
														validationErrors={{
															minLength: 'Min character length is 4'
														}}
														required
													/>
												</div>

												<div className="w-full sm:w-1 md:w-1/3 py-12  md:px-20">
													<div className="font-semibold">
														Crea una contraseña <span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="password"
														name="password"
														value={form.children[index].password}
														onChange={e => handleInput(e, index)}
														validations={{
															minLength: 4,
															maxLength: 30
														}}
														validationErrors={{
															minLength: 'El mínimo de caracteres es 4'
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
																			{showPassword
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

												<div className="w-full sm:w-1 md:w-1/3 py-12  md:pl-20">
													<div className="font-semibold">
														Confirma tu contraseña{' '}
														<span className={classes.required}>*</span>
													</div>
													<TextFieldFormsy
														className={classes.textField}
														type="password"
														name="c_password"
														value={form.children[index].c_password}
														onChange={e => handleInput(e, index)}
														validations={{
															minLength: 4,
															maxLength: 30
														}}
														validationErrors={{
															minLength: 'El mínimo de caracteres es 4'
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

												<div className="flex flex-wrap w-full flex-col align-left justify-left py-12 mb-24">
													<div className="font-semibold">
														Género <span className={classes.required}>*</span>
													</div>
													<Typography className={classes.label}>
														<RadioGroup
															name="gender"
															value={form.children[index].gender}
															onChange={e => handleInput(e, index)}
															row
														>
															<FormControlLabel
																className={classes.checkbox}
																value="Hombre"
																control={<Radio />}
																label="Hombre"
															/>
															<FormControlLabel
																className={classes.checkbox}
																value="Mujer"
																control={<Radio />}
																label="Mujer"
															/>
														</RadioGroup>
													</Typography>
												</div>

												{form.children.length > 1 ? (
													<div className="flex flex-wrap w-full flex-row align-center justify-center py-12">
														<Button
															style={{
																width: '124px'
															}}
															className="btnLimpiar"
															onClick={() => {
																deleteSon(index);
															}}
														>
															Borrar
														</Button>
													</div>
												) : null}
											</div>
										))}
								</>
							) : null}

							<div className="w-full md:w-3/3 pt-28 md:pr-6">
								<div className={classes.subTitle}>
									Suscripción mensual Global Schooling{' '}
									<span style={{ color: '#1EC6BC' }}>
										$ {calculate(form.subscription, false).toLocaleString('en-US')} MXN
									</span>
								</div>
							</div>
							<div className="w-full md:w-3/3 pt-28 md:pr-6">
								<div className={classes.subTitle}>
									Inscripción{' '}
									<span style={{ color: '#1EC6BC' }}>
										$ {(suscriptionCount * 2000).toLocaleString('en-US')} MXN
									</span>
								</div>
							</div>
							<div className="w-full md:w-3/3 pt-28 md:pr-6">
								<div className={classes.subTitle} style={{ fontSize: 18 }}>
									TOTAL{' '}
									<span style={{ color: '#1EC6BC' }}>
										$ {calculate(form.subscription, true).toLocaleString('en-US')} MXN
									</span>
								</div>
							</div>

							<Button
								className={clsx(classes.button, classes.buttonFill)}
								variant="contained"
								color="primary"
								type="submit"
							>
								Continuar con el pago
							</Button>
						</>
					</Card>
				</Formsy>
			</FuseAnimateGroup>
		</div>
	);
}
