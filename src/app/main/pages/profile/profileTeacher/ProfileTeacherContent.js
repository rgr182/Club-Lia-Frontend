import React, { useEffect, useState, useRef, useCallback } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
	Card,
	makeStyles,
	Button,
	MenuItem,
	Icon,
	IconButton,
	Tooltip,
	CircularProgress,
	MuiThemeProvider,
	createMuiTheme,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Zoom,
	RadioGroup,
	Radio,
	FormControl,
	LinearProgress
} from '@material-ui/core';
import { showMessage } from '../../../../store/fuse/messageSlice';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import FilesTable from './FilesTable';
import {
	getProfile,
	setEnableEdit,
	openFileDialog,
	statusprofileUpdate,
	removeContact,
	profileUpdate
} from '../store/profileSlice';
import { useForm } from '@fuse/hooks';
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FileDialog from './FileDialog';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import DeleteButtonDialog from '../../../apps/components/DeleteButtonDialog';
import mexicoStates from './MexicoStates.json';
import StatusBadge from 'app/main/apps/users/components/StatusBadge';
import { IUserStatus } from 'app/main/apps/users/models/UserModel';
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
		color: theme.palette.primary.light,
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
	// admin validation
	status: 'no verificado',
	comments: '',
	// teacher data
	name: '',
	last_name: '',
	email: '',
	phone_number: '',
	username: '',
	country: '',
	school: '',
	subjects: ''
};

function FileButton({ file, setFile, index }) {
	const classes = useStyles();
	const [fileAux, setFileAux] = useState(null);

	return (
		<div className="w-full" key={'button-file-' + index}>
			<div className="flex items-center">
				<div className="flex text-left w-full sm:w-512">
					<input
						style={{ display: 'none' }}
						id={'raised-button-file-' + index}
						type="file"
						onChange={e => setFileAux(e.target.files[0])}
						accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
					/>
					<label htmlFor={'raised-button-file-' + index} className="w-full">
						<Button
							className={clsx(classes.textFieldButton, 'w-full')}
							component="span"
							style={{ color: fileAux ? '#353535' : '#A2A2A2' }}
						>
							{fileAux ? fileAux.name : 'Examinar'}
						</Button>
					</label>
					<Button
						onClick={e => setFile(fileAux)}
						className={clsx(classes.buttonFill, classes.buttonSubir)}
						disabled={!(fileAux && !file)}
					>
						Subir
					</Button>
				</div>
				{file && (
					<Tooltip title={<div style={{ fontSize: '13px' }}>Eliminar</div>}>
						<span>
							<IconButton
								className={clsx(classes.redButton, 'ml-20 p-8 mt-6')}
								onClick={e => {
									setFile(null);
									setFileAux(null);
								}}
							>
								<svg
									width="18"
									height="20"
									viewBox="0 0 18 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 4.55566H2.77778H17"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M5.4445 4.55556V2.77778C5.4445 2.30628 5.6318 1.8541 5.9652 1.5207C6.2986 1.1873 6.75078 1 7.22228 1H10.7778C11.2493 1 11.7015 1.1873 12.0349 1.5207C12.3683 1.8541 12.5556 2.30628 12.5556 2.77778V4.55556M15.2223 4.55556V17C15.2223 17.4715 15.035 17.9237 14.7016 18.2571C14.3682 18.5905 13.916 18.7778 13.4445 18.7778H4.55561C4.08411 18.7778 3.63193 18.5905 3.29853 18.2571C2.96513 17.9237 2.77783 17.4715 2.77783 17V4.55556H15.2223Z"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M7.22217 9V14.3333"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M10.7778 9V14.3333"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</IconButton>
						</span>
					</Tooltip>
				)}
			</div>
		</div>
	);
}

export default function ProfileTeacherContent(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const routeParams = useParams();
	const history = useHistory();

	const role = useSelector(({ auth }) => auth.user.role);
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	const enableEdit = useSelector(({ ProfileApp }) => ProfileApp.profile.enableEdit);
	const profileData = useSelector(({ ProfileApp }) => ProfileApp.profile.profileData);
	const profileStatus = useSelector(({ ProfileApp }) => ProfileApp.profile.profileStatus);

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingForm, setLoadingForm] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [countries, setCountries] = useState(null);
	const [states, setStates] = useState(null);
	const [cities, setCities] = useState(null);
	const [levelSchool, setLevelSchool] = useState('Preescolar');
	const [formState, setFormState] = useState('');
	const [formCity, setFormCity] = useState('');
	const [key, setKey] = useState(20);
	const [interesesArray, setInteresesArray] = useState([false, false, false, false, false, false]);
	const [gradeArray, setGradeArray] = useState([false, false, false, false, false, false]);
	const [formFiles, setFormFiles] = useState([]);
	const [indexFiles, setIndexFiles] = useState(1);
	const [dataNumber, setDataNumber] = useState(1);
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [file3, setFile3] = useState(null);
	const [file4, setFile4] = useState(null);
	const [file5, setFile5] = useState(null);
	const [atLeastThreeFiles, setAtLeastThreeFiles] = useState(false);
	const [toDeleteFiles, setToDeleteFiles] = useState([]);

	const formRef = useRef(null);
	const divRef = useRef(null);
	const onlyLettersRegex = /^[a-z, áéíóúñÑ]+$/i;
	const onlyNumbersRegex = /^[0-9]*$/i;

	const interesesValues = [
		'Comunidad LIA',
		'Cursos LIA U',
		'Certificación LIA docente Creador',
		'Instructor / Autor LIA U',
		'Maestro Global Schooling'
	];

	const gradeValues = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'];

	const columns = React.useMemo(
		() => [
			{
				Header: 'Documento',
				accessor: 'name',
				sortable: true,
				Cell: ({ row }) => {
					return row.original.name.split('/')[row.original.name.split('/').length - 1].split(/_(.+)/)[1];
				}
			},
			{
				Header: 'Fecha de subida',
				accessor: 'date',
				sortable: true,
				Cell: ({ row }) => {
					return row.original.date.replaceAll('-', '/');
				}
			},
			{
				Header: ({ selectedFlatRows }) => {
					return (
						selectedFlatRows.length > 0 && (
							<IconButton className="p-0" onClick={ev => removeFiles(selectedFlatRows)}>
								<Icon className="text-left text-white">delete</Icon>
							</IconButton>
						)
					);
				},
				id: 'Delete',
				width: 128,
				Cell: ({ row }) => {
					return <div />;
				},
				className: 'justify-center',
				sortable: false
			}
		],
		[dispatch, formFiles, setFormFiles, setToDeleteFiles]
	);

	function removeFiles(flatRows) {
		let arrayAux = formFiles;
		flatRows.forEach(flatRow => {
			setToDeleteFiles(items => [
				...items,
				flatRow.original.name.split('/')[flatRow.original.name.split('/').length - 1]
			]);
			arrayAux = arrayAux.filter(item => item.name !== flatRow.original.name);
		});
		setFormFiles(arrayAux);
	}

	useEffect(() => {
		if (profileStatus.error) {
			if (profileStatus.error.response.request.status == '500') {
				setLoadingForm(false);
				dispatch(showMessage({ message: profileStatus.error.response.data.message, variant: 'error' }));
			} else {
				setLoadingForm(false);
				dispatch(showMessage({ message: profileStatus.error.response.data.message, variant: 'error' }));
			}
		}
		if (profileStatus.success) {
			resetForm();
			enableButton();
			setLoadingForm(false);
			divRef.current.scrollIntoView();
			dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
		}
	}, [profileStatus.error, profileStatus.success]);

	useEffect(() => {
		resetForm();

		if (role != 'admin') {
			!countries && getCountries();
			setLoading(true);
			dispatch(getProfile()).then(() => {
				setLoading(false);
			});
		} else {
			if (routeParams.id && !isNaN(parseInt(routeParams.id))) {
				setLoading(true);
				dispatch(getProfile(routeParams.id)).then(() => {
					setLoading(false);
				});
			} else {
				history.push('/apps/dashboardmaestros');
			}
		}
	}, []);

	useEffect(() => {
		if (profileData) {
			profileData.files && setFormFiles(profileData.files);
			if (role != 'admin') {
				const data = {
					// admin validation
					status: profileData.status,
					comments: profileData.comments ? profileData.comments : '',
					// teacher data
					name: profileData.name,
					last_name: profileData.last_name,
					email: profileData.email,
					phone_number: profileData.phone_number,
					username: profileData.username,
					school_name: profileData.school_name,
					subjects: profileData.intereses,
					country: form.country,
					level_school: profileData.level_school
				};
				setForm(data);
				if (
					profileData.level_school &&
					['Preescolar', 'Primaria', 'Secundaria'].indexOf(profileData.level_school) < 0
				) {
					if (profileData.level_school != 'Preparatoria') {
						handleChangeLevel('Otro', 4);
					} else {
						handleChangeLevel(profileData.level_school, 5);
					}
				} else {
					profileData.level_school
						? handleChangeLevel(profileData.level_school, profileData.level_id)
						: handleChangeLevel('Preescolar', 1);
				}
				var arrayG = [false, false, false, false, false, false];
				if (profileData.grade && profileData.grade[0].nombre) {
					profileData.grade.forEach(item => {
						arrayG[item.id] = true;
					});
				}
				setGradeArray(arrayG);
				var arrayD = [false, false, false, false, false, false];
				if (profileData.document_type && profileData.document_type[0].nombre) {
					profileData.document_type.forEach(item => {
						arrayD[item.id] = true;
					});
				}
				setInteresesArray(arrayD);
			} else {
				const data = {
					// admin validation
					status: profileData.status,
					comments: profileData.comments ? profileData.comments : ''
				};
				setForm(data);
			}
		}
	}, [profileData]);

	useEffect(() => {
		if (role != 'admin') {
			if (countries && countries.length > 0) {
				if (profileData && profileData.country) {
					form.country = profileData.country;
					if (profileData.country == 'Mexico') {
						setFormState(profileData.state);
						setFormCity(profileData.city);
					} else {
						getStates(profileData.country);
					}
				} else {
					form.country = 'Mexico';
					getStates('Mexico');
				}
			}
		}
	}, [countries, profileData]);

	useEffect(() => {
		if (form?.country != 'Mexico' && profileData && profileData.state) {
			if (states && states.length > 0) {
				const estado = states.find(element => element.name == profileData.state);
				if (estado) {
					setFormState(profileData.state);
					getCities(profileData.state);
				}
			}
		}
	}, [states, profileData]);

	useEffect(() => {
		if (form?.country != 'Mexico' && profileData && profileData.city) {
			if (cities && cities.length > 0) {
				const ciudad = cities.find(element => element == profileData.city);
				if (ciudad) {
					setFormCity(profileData.city);
				}
			}
		}
	}, [cities, profileData]);

	useEffect(() => {
		var count = formFiles.length ? formFiles.length : 0;
		file1 && count++;
		file2 && count++;
		file3 && count++;
		file4 && count++;
		file5 && count++;
		setAtLeastThreeFiles(count >= 3);
	}, [file1, file2, file3, file4, file5, formFiles]);

	function getCountries() {
		axios
			.get('https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode')
			.then(data => {
				function SortArray(x, y) {
					if (x.name < y.name) {
						return -1;
					}
					if (x.name > y.name) {
						return 1;
					}
					return 0;
				}
				var sort = data.data.data.sort(SortArray);
				setCountries(sort);
			});
	}

	function getStates(name) {
		cleanCountryChange();
		axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: name }).then(data => {
			setStates(data.data.data.states);
		});
	}

	function getCities(name) {
		cleanStateChange();
		axios
			.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country: form.country, state: name })
			.then(data => {
				setCities(data.data.data);
			});
	}

	function cleanCountryChange() {
		setFormState('');
		setFormCity('');
		setCities(null);
		setStates(null);
	}

	function cleanStateChange() {
		setFormCity('');
		setCities(null);
	}

	function resetForm() {
		enableEdit && dispatch(setEnableEdit(false));
		setIndexFiles(1);
		setFormFiles([]);
		setToDeleteFiles([]);
		file1 && setFile1(null);
		file2 && setFile2(null);
		file3 && setFile3(null);
		file4 && setFile4(null);
		file5 && setFile5(null);
		atLeastThreeFiles && setAtLeastThreeFiles(false);
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
		form.id = routeParams.id;
		dispatch(statusprofileUpdate({ dataForm: form }));
	}

	function handleSubmitInfo(event) {
		event.preventDefault();
		disableButton();
		setLoadingForm(true);

		var auxGrade = [];
		if (dataNumber != 4) {
			gradeArray.forEach((item, index) => {
				if (dataNumber == 1 || dataNumber == 3) {
					item && index < 3 && auxGrade.push({ id: index, nombre: gradeValues[index] });
				} else {
					item && auxGrade.push({ id: index, nombre: gradeValues[index] });
				}
			});
		}

		var auxIntereses = [];
		if (interesesArray[0]) {
			interesesValues.forEach((item, index) => {
				auxIntereses.push({ id: index + 1, nombre: item });
			});
		} else {
			interesesArray.forEach((item, index) => {
				if (item) {
					item && auxIntereses.push({ id: index, nombre: interesesValues[index - 1] });
				}
			});
		}

		var auxFiles = [];
		file1 && auxFiles.push(file1);
		file2 && auxFiles.push(file2);
		file3 && auxFiles.push(file3);
		file4 && auxFiles.push(file4);
		file5 && auxFiles.push(file5);

		form.files = auxFiles;
		form.state = formState;
		form.city = formCity;
		form.grade = auxGrade.length > 0 ? JSON.stringify(auxGrade) : null;
		form.document_type = auxIntereses.length > 0 ? JSON.stringify(auxIntereses) : null;
		form.toDeleteFiles = toDeleteFiles;
		form.level_id = dataNumber < 4 ? dataNumber : 2;
		if (dataNumber != 4) form.level_school = levelSchool;

		dispatch(profileUpdate({ data: form }));
	}

	function setInterest(index) {
		if (index == 0) {
			setInteresesArray([!interesesArray[0], false, false, false, false, false]);
		} else {
			var array = interesesArray;
			array[index] = !array[index];
			array[0] = false;
			setInteresesArray(array);
			setKey(Math.random());
		}
	}

	const handleChangeLevel = (nivel, id) => {
		nivel === 'Otro' ? setLevelSchool('') : setLevelSchool(nivel);
		setDataNumber(id);
		setGradeArray([false, false, false, false, false, false]);
	};

	const changeLevel = index => {
		var array = gradeArray;
		array[index] = !array[index];
		setGradeArray(array);
		setKey(Math.random());
	};

	function handleRemove() {
		dispatch(removeContact(profileData.uuid)).then(() => {
			setOpenDeleteDialog(false);
			history.push('/apps/dashboardmaestros');
		});
	}

	const onBack = env => {
		env.preventDefault();
		history.goBack();
	};

	return (
		<>
			<DeleteButtonDialog
				openDeleteDialog={openDeleteDialog}
				setOpenDeleteDialog={setOpenDeleteDialog}
				handleRemove={handleRemove}
				texto={'este usuario'}
			/>
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
							) : !profileData ? (
								<div
									style={{ height: '600px' }}
									className="flex flex-1 flex-col items-center justify-center"
								>
									<div className="text-20 mb-16">No se encontró información del maestro.</div>
								</div>
							) : (
								<>
									<BackLink onBack={onBack} />
									<div className="w-full text-center pt-10">
										<h2 className={classes.title}>
											{role == 'admin'
												? profileData.name + ' ' + profileData.last_name
												: 'Mi cuenta'}
										</h2>
									</div>
									<div className="w-full text-center pt-10">Estatus</div>
									<div className="w-full text-center pt-8 flex justify-center">
										<StatusBadge status={profileData.status} />
									</div>
									{role != 'admin' ? (
										profileData.comments ? (
											<div
												className={clsx(
													classes.blueLabel,
													'w-full text-center mt-16 p-20 font-semibold'
												)}
											>
												<label>{profileData.comments}</label>
											</div>
										) : (
											<>
												{profileData.status != 'aceptado' && (
													<div
														className={clsx(
															classes.blueLabel,
															'w-full text-center mt-16 p-20 font-semibold'
														)}
													>
														<label>
															Una vez que se validen tus datos, podrás acceder a todos los
															beneficios de la plataforma.
														</label>
													</div>
												)}
											</>
										)
									) : (
										<div />
									)}
									{/*-------------------------INFORMACIÓN DE LA CUENTA-----------------------------*/}
									<div className="w-full md:w-1/2 pt-32 font-semibold">
										<h2 className={classes.subTitle}>INFORMACIÓN DE LA CUENTA</h2>
									</div>
									<div className="w-full md:w-1/2 pt-32 text-right">
										{role != 'admin' && (
											<Tooltip title={<div style={{ fontSize: '13px' }}>Editar</div>}>
												<span>
													<IconButton
														className={clsx(classes.yellowButton, 'mx-6')}
														disabled={enableEdit || profileData.status == 'no verificado'}
														onClick={() => dispatch(setEnableEdit(true))}
													>
														<svg
															width="18"
															height="18"
															viewBox="0 0 18 18"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M8.15659 2.68652H2.59035C2.16857 2.68652 1.76405 2.85408 1.4658 3.15233C1.16755 3.45058 1 3.85509 1 4.27688V15.4093C1 15.8311 1.16755 16.2356 1.4658 16.5339C1.76405 16.8321 2.16857 16.9997 2.59035 16.9997H13.7228C14.1446 16.9997 14.5491 16.8321 14.8474 16.5339C15.1456 16.2356 15.3132 15.8311 15.3132 15.4093V9.84311"
																stroke="white"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
															/>
															<path
																d="M14.1203 1.49406C14.4367 1.17772 14.8657 1 15.3131 1C15.7605 1 16.1895 1.17772 16.5059 1.49406C16.8222 1.8104 16.9999 2.23945 16.9999 2.68682C16.9999 3.1342 16.8222 3.56325 16.5059 3.87959L8.9517 11.4338L5.771 12.2289L6.56617 9.04824L14.1203 1.49406Z"
																stroke="white"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
															/>
														</svg>
													</IconButton>
												</span>
											</Tooltip>
										)}
									</div>
									{!enableEdit ? (
										<>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">Nombre</div>
												<div>{profileData.name + ' ' + profileData.last_name}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">Correo</div>
												<div>{profileData.email}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pl-6">
												<div className="font-semibold">Teléfono</div>
												<div>{profileData.phone_number ? profileData.phone_number : '-'}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">Usuario</div>
												<div>{profileData.username}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">País</div>
												<div>{profileData.country ? profileData.country : '-'}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pl-6">
												<div className="font-semibold">Estado</div>
												<div>{profileData.state ? profileData.state : '-'}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">Ciudad</div>
												<div>{profileData.city ? profileData.city : '-'}</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">Escuela o empresa</div>
												<div>{profileData.school_name ? profileData.school_name : '-'}</div>
											</div>
											<div className="w-full md:w-1/3 md:pt-28 md:pl-6"></div>
											<div className="w-full pt-28">
												<div className="font-semibold">
													Materias que imparte{role != 'admin' && 's'}
												</div>
												<div>{profileData.intereses ? profileData.intereses : '-'}</div>
											</div>
											<div className="w-full pt-28">
												<div className="font-semibold">Opciones de interés</div>
												<div>
													{profileData.document_type && profileData.document_type.length > 0
														? profileData.document_type.map((item, index) => (
																<span key={item.nombre}>
																	{item.nombre +
																		(index < profileData.document_type.length - 1
																			? ', '
																			: '')}
																</span>
														  ))
														: '-'}
												</div>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">Nivel</div>
												<div>{profileData.level_school ? profileData.level_school : '-'}</div>
											</div>
											<div className="w-full md:w-2/3 pt-28 md:px-12">
												<div className="font-semibold">Grado (s)</div>
												<div>
													{profileData.grade &&
													profileData.grade.length > 0 &&
													profileData.grade != 'null'
														? profileData.grade[0].nombre
															? profileData.grade.map((item, index) => (
																	<span key={item.nombre}>
																		{item.nombre +
																			(index < profileData.grade.length - 1
																				? ', '
																				: '')}
																	</span>
															  ))
															: profileData.grade
														: '-'}
												</div>
											</div>
										</>
									) : (
										<>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">
													Nombre <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="name"
													value={form.name}
													onChange={handleChange}
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
													validationErrors={{
														minLength: 'El mínimo de caracteres es 3',
														maxLength: 'El máximo de caracteres es 150',
														includesSChars: 'No se permiten caracteres especiales'
													}}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">
													Apellido <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="last_name"
													value={form.last_name}
													onChange={handleChange}
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
													validationErrors={{
														minLength: 'El mínimo de caracteres es 3',
														maxLength: 'El máximo de caracteres es 150',
														includesSChars: 'No se permiten caracteres especiales'
													}}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pl-6">
												<div className="font-semibold">
													Correo <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="email"
													value={form.email}
													onChange={handleChange}
													validations="isEmail"
													validationErrors={{ isEmail: 'Por favor ingresa un correo válido' }}
													required
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">Teléfono</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="phone_number"
													value={form.phone_number}
													onChange={handleChange}
													validations={{
														maxLength: form.country == 'Mexico' ? 10 : 15,
														onlyNumbers: function (values, value) {
															if (value) {
																return onlyNumbersRegex.test(value);
															}
															return true;
														}
													}}
													validationErrors={{
														maxLength:
															form.country == 'Mexico'
																? 'El máximo de caracteres es 10'
																: 'El máximo de caracteres es 15',
														onlyNumbers: 'Ingresa únicamente números'
													}}
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
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
														minLength: 'Min character length is 4'
													}}
													disabled
												/>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pl-6">
												<div className="font-semibold">
													País <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<SelectFormsy
													id="country"
													name="country"
													className={classes.select}
													value={form.country || ''}
													onChange={handleChange}
													required
													displayEmpty
												>
													<MenuItem className="poppins" value="" onClick={cleanCountryChange}>
														Elige una opción
													</MenuItem>
													{countries
														? countries.map(country => (
																<MenuItem
																	className="poppins"
																	key={country.name}
																	value={country.name}
																	onClick={() => getStates(country.name)}
																>
																	{country.name}
																</MenuItem>
														  ))
														: null}
												</SelectFormsy>
											</div>
											<div className="w-full md:w-1/3 pt-28 md:pr-6">
												<div className="font-semibold">
													Estado <span style={{ color: '#4457FF' }}>*</span>
												</div>
												{form.country == 'Mexico' ? (
													<SelectFormsy
														id="state"
														name="state"
														className={classes.select}
														value={formState || ''}
														onChange={ev => setFormState(ev.target.value)}
														displayEmpty
														required
													>
														<MenuItem
															className="poppins"
															value=""
															onClick={cleanStateChange}
														>
															Elige una opción
														</MenuItem>
														{Object.keys(mexicoStates).map(state => (
															<MenuItem
																className="poppins"
																key={state}
																value={state}
																onClick={cleanStateChange}
															>
																{state}
															</MenuItem>
														))}
													</SelectFormsy>
												) : (
													<SelectFormsy
														id="state"
														name="state"
														className={classes.select}
														value={formState || ''}
														onChange={ev => setFormState(ev.target.value)}
														displayEmpty
														required
													>
														<MenuItem
															className="poppins"
															value=""
															onClick={cleanStateChange}
														>
															Elige una opción
														</MenuItem>
														{states &&
															states.map(state => (
																<MenuItem
																	className="poppins"
																	key={state.name}
																	value={state.name}
																	onClick={() => getCities(state.name)}
																>
																	{state.name}
																</MenuItem>
															))}
													</SelectFormsy>
												)}
											</div>
											<div className="w-full md:w-1/3 pt-28 md:px-12">
												<div className="font-semibold">
													Ciudad <span style={{ color: '#4457FF' }}>*</span>
												</div>
												{form.country == 'Mexico' && formState && mexicoStates[formState] ? (
													<SelectFormsy
														id="city"
														name="city"
														className={classes.select}
														value={formCity || ''}
														onChange={ev => setFormCity(ev.target.value)}
														displayEmpty
														required
													>
														<MenuItem className="poppins" value="">
															Elige una opción
														</MenuItem>
														{mexicoStates[formState].map(municipio => (
															<MenuItem
																className="poppins"
																key={municipio}
																value={municipio}
															>
																{municipio}
															</MenuItem>
														))}
													</SelectFormsy>
												) : (
													<SelectFormsy
														id="city"
														name="city"
														className={classes.select}
														value={formCity || ''}
														onChange={ev => setFormCity(ev.target.value)}
														displayEmpty
														required
													>
														<MenuItem className="poppins" value="">
															Elige una opción
														</MenuItem>
														{cities &&
															cities.map(city => (
																<MenuItem className="poppins" key={city} value={city}>
																	{city}
																</MenuItem>
															))}
													</SelectFormsy>
												)}
											</div>
											<div className="w-full md:w-1/3 pt-28">
												<div className="font-semibold">
													Escuela o empresa <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													className={classes.textField}
													type="text"
													name="school_name"
													value={form.school_name}
													onChange={handleChange}
												/>
											</div>
											<div className="w-full pt-28" style={{ height: '160px' }}>
												<div className="font-semibold">
													Materias que impartes <span style={{ color: '#4457FF' }}>*</span>
												</div>
												<TextFieldFormsy
													multiline
													type="text"
													name="subjects"
													id="subjects"
													value={form.subjects}
													onChange={handleChange}
													validations={{
														maxLength: 400
													}}
													validationErrors={{
														maxLength: 'El máximo de carácteres permitidos es 400'
													}}
													className={classes.textField}
													rowsMax={5}
													rows={5}
													required
												/>
											</div>
											<div className="w-full pt-28">
												<div className="font-semibold">
													Elige las opciones de tu interés{' '}
													<span style={{ color: '#4457FF' }}>
														(Esta información no afectará el tipo de membresía que elijas)
													</span>
												</div>
												<FormGroup className="poppins">
													<div className="flex">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[0]}
																	key={key + 'interes0'}
																	onClick={() => setInterest(0)}
																/>
															}
															label="Todos"
														/>
													</div>
													<div className="flex items-center">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[1]}
																	key={key + 'interes1'}
																	onClick={() => setInterest(1)}
																/>
															}
															label="Comunidad LIA"
														/>
														<MuiThemeProvider theme={theme}>
															<Tooltip
																className={classes.messageTooltip}
																TransitionComponent={Zoom}
																title={
																	'Inspira, conecta y potencializa en nuestra comunidad Educativa Interactiva en línea de educación básica'
																}
																placement="right-end"
															>
																<div className={classes.tooltip}>?</div>
															</Tooltip>
														</MuiThemeProvider>
													</div>
													<div className="flex items-center">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[2]}
																	key={key + 'interes2'}
																	onClick={() => setInterest(2)}
																/>
															}
															label="Cusos LIA U"
														/>
														<MuiThemeProvider theme={theme}>
															<Tooltip
																TransitionComponent={Zoom}
																title="Nuestra plataforma de cursos en línea, a tu ritmo, tiempo, aprende y desarrolla las habilidades necesarias para ser un super maestro."
																placement="right-end"
															>
																<div className={classes.tooltip}>?</div>
															</Tooltip>
														</MuiThemeProvider>
													</div>
													<div className="flex items-center">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[3]}
																	key={key + 'interes3'}
																	onClick={() => setInterest(3)}
																/>
															}
															label="Certificación LIA docente Creador"
														/>
														<MuiThemeProvider theme={theme}>
															<Tooltip
																TransitionComponent={Zoom}
																title="Docente Creador Con esta certificación, podrás crear contenido para nuestra comunidad recibiendo el crédito como maestro creador LIA, imagina compartir tu trabajo con miles de personas."
																placement="right-end"
															>
																<div className={classes.tooltip}>?</div>
															</Tooltip>
														</MuiThemeProvider>
													</div>
													<div className="flex items-center">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[4]}
																	key={key + 'interes4'}
																	onClick={() => setInterest(4)}
																/>
															}
															label="Instructor / Autor LIA U"
														/>
														<MuiThemeProvider theme={theme}>
															<Tooltip
																TransitionComponent={Zoom}
																title="Tus capacidades y habilidades llevadas al máximo, conviértete en un instructor LIA, en donde podrás subir tus cursos e impartirlos a nuestra comunidad en línea a maestros, papás, y público en general."
																placement="right-end"
															>
																<div className={classes.tooltip}>?</div>
															</Tooltip>
														</MuiThemeProvider>
													</div>
													<div className="flex items-center">
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={interesesArray[5]}
																	key={key + 'interes5'}
																	onClick={() => setInterest(5)}
																/>
															}
															label="Maestro Global Schooling"
														/>
														<MuiThemeProvider theme={theme}>
															<Tooltip
																TransitionComponent={Zoom}
																title="Únete al equipo de instructores global impartiendo clases a los alumnos de nuestra escuela en línea de primaria y secundaria."
																placement="right-end"
															>
																<div className={classes.tooltip}>?</div>
															</Tooltip>
														</MuiThemeProvider>
													</div>
												</FormGroup>
											</div>
											{
												<div className="w-full pt-28">
													<div className="font-semibold">
														Nivel educativo <span style={{ color: '#4457FF' }}>*</span>
													</div>
													<FormControl>
														<RadioGroup
															defaultValue={dataNumber.toString()}
															style={{ fontFamily: 'Poppins', display: 'flex' }}
															aria-labelledby="demo-radio-buttons-group-label"
															name="radio-buttons-group"
														>
															<div
																className={classes.labelRoot}
																style={{ display: 'flex', overflowX: 'auto' }}
															>
																<FormControlLabel
																	value="1"
																	id="c1"
																	className={clsx(
																		dataNumber == 1
																			? classes.componenteEduativo
																			: classes.checkbox2,
																		'sm:pr-10'
																	)}
																	onClick={e => handleChangeLevel('Preescolar', 1)}
																	control={<Radio />}
																	label="Preescolar"
																/>
																<FormControlLabel
																	value="2"
																	id="c2"
																	className={clsx(
																		dataNumber == 2
																			? classes.componenteEduativo
																			: classes.checkbox2,
																		'sm:pr-10'
																	)}
																	onClick={e => handleChangeLevel('Primaria', 2)}
																	control={<Radio />}
																	label="Primaria"
																/>
																<FormControlLabel
																	value="3"
																	id="c3"
																	className={clsx(
																		dataNumber == 3
																			? classes.componenteEduativo
																			: classes.checkbox2,
																		'sm:pr-10'
																	)}
																	onClick={e => handleChangeLevel('Secundaria', 3)}
																	control={<Radio />}
																	label="Secundaria"
																/>
																<FormControlLabel
																	value="5"
																	id="c5"
																	className={clsx(
																		dataNumber == 5
																			? classes.componenteEduativo
																			: classes.checkbox2,
																		'sm:pr-10'
																	)}
																	onClick={e => handleChangeLevel('Preparatoria', 5)}
																	control={<Radio />}
																	label="Preparatoria"
																/>
																<FormControlLabel
																	value="4"
																	id="c4"
																	className={clsx(
																		dataNumber == 4
																			? classes.componenteEduativo
																			: classes.checkbox2,
																		'sm:pr-10'
																	)}
																	onClick={e => handleChangeLevel('Otro', 4)}
																	control={<Radio />}
																	label="Otro"
																/>
															</div>
														</RadioGroup>
													</FormControl>
												</div>
											}
											<div className={clsx(classes.grayBackground, 'w-full p-28')}>
												<div className="font-semibold pb-10">
													{dataNumber != 4 ? (
														'Grado'
													) : (
														<>
															Indicar nivel<span style={{ color: '#4457FF' }}> *</span>
														</>
													)}
												</div>
												{dataNumber == 4 ? (
													<TextFieldFormsy
														className={clsx(classes.textField, 'w-full sm:w-400')}
														style={{ backgroundColor: '#fff' }}
														type="text"
														name="level_school"
														value={form.level_school}
														onChange={handleChange}
														validations={{
															maxLength: 60
														}}
														validationErrors={{
															minLength: 'Min character length is 60'
														}}
														required
													/>
												) : (
													<div className={classes.checkboxGrid}>
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={gradeArray[0]}
																	key={key + 'grade0'}
																	id="checked2"
																/>
															}
															onClick={() => changeLevel(0)}
															label="Primero"
														/>
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={gradeArray[1]}
																	key={key + 'grade1'}
																	id="checked2"
																/>
															}
															onClick={() => changeLevel(1)}
															label="Segundo"
														/>
														<FormControlLabel
															className={classes.checkbox}
															control={
																<Checkbox
																	checked={gradeArray[2]}
																	key={key + 'grade2'}
																	id="checked2"
																/>
															}
															onClick={() => changeLevel(2)}
															label="Tercero"
														/>
														{(dataNumber == 2 || dataNumber == 5) && (
															<>
																<FormControlLabel
																	className={classes.checkbox}
																	control={
																		<Checkbox
																			checked={gradeArray[3]}
																			key={key + 'grade3'}
																			id="checked2"
																		/>
																	}
																	onClick={() => changeLevel(3)}
																	label="Cuarto"
																/>
																<FormControlLabel
																	className={classes.checkbox}
																	control={
																		<Checkbox
																			checked={gradeArray[4]}
																			key={key + 'grade4'}
																			id="checked2"
																		/>
																	}
																	onClick={() => changeLevel(4)}
																	label="Quinto"
																/>
																<FormControlLabel
																	className={classes.checkbox}
																	control={
																		<Checkbox
																			checked={gradeArray[5]}
																			key={key + 'grade5'}
																			id="checked2"
																		/>
																	}
																	onClick={() => changeLevel(5)}
																	label="Sexto"
																/>
															</>
														)}
													</div>
												)}
											</div>
										</>
									)}
									{/*--------------------------MEMBRESÍA-----------------------------*/}
									<div className="w-full pt-80 font-semibold">
										<h2 className={classes.subTitle}>MEMBRESÍA</h2>
									</div>
									<div className="w-full md:w-1/3 pt-28">
										<div className="font-semibold">Tipo de membresía</div>
										<div>
											{profileData.membership ? profileData.membership : 'Maestro invitado'}
										</div>
									</div>
									<div className="w-full md:w-1/3 pt-28">
										<div className="font-semibold">Inicio de suscripción</div>
										<div>
											{profileData.created_at
												? profileData.created_at.split('T')[0].replaceAll('-', '/')
												: '-'}
										</div>
									</div>
									<div className="w-full md:w-1/3 md:pt-28"></div>
									{/* <div className="w-full pt-28">
                                        <Button
                                            className={clsx(classes.button, 'px-10')}
                                        >
                                            Cambiar contraseña
                                        </Button>
                                    </div> */}
									{/*-------------------------DOCUMENTOS-----------------------------*/}
									<div className="w-full pt-80 font-semibold">
										<h2 className={classes.subTitle}>DOCUMENTOS</h2>
									</div>
									<div className="w-full pt-28">
										{formFiles && formFiles.length > 0 && formFiles[0].name ? (
											<FilesTable
												columns={columns}
												data={formFiles}
												onRowClick={(ev, row) => {
													if (row) {
														ev.stopPropagation();
														let filetype = row.original.name.split('.').pop();
														dispatch(
															openFileDialog({ name: row.original.name, type: filetype })
														);
													}
												}}
											/>
										) : (
											<div className="h-full">
												<div className="mb-16">No se han subido archivos.</div>
											</div>
										)}
									</div>
									{enableEdit && (
										<>
											<div className="w-full pt-28">
												La seguridad es muy importante para nosotros, queremos que formes parte
												de nuestra comunidad.
												<br />
												Por favor, compártenos al menos{' '}
												<span style={{ color: '#4457FF' }}>3 documentos</span> de tu elección
												que te acrediten como maestro para poderte autorizar.
												<br />
												<br />
												Título profesional
												<br />
												Cédula profesional
												<br />
												Certificado de terminación de estudios
												<br />
												Carta pasante
												<br />
												Credencial actual o carta de trabajo
												<br />
												Certificaciones u otros documentos
												<br />
												CV
												<br />
												<br />
												Documento (Formatos permitidos: .pdf, .jpg, .png, .jpeg.)
											</div>
											{formFiles.length < 5 && (
												<FileButton index={'button1'} file={file1} setFile={setFile1} />
											)}
											{indexFiles > 1 && (
												<FileButton index={'button2'} file={file2} setFile={setFile2} />
											)}
											{indexFiles > 2 && (
												<FileButton index={'button3'} file={file3} setFile={setFile3} />
											)}
											{indexFiles > 3 && (
												<FileButton index={'button4'} file={file4} setFile={setFile4} />
											)}
											{indexFiles > 4 && (
												<FileButton index={'button5'} file={file5} setFile={setFile5} />
											)}
											<div className="w-full flex pt-28">
												{indexFiles < 5 - formFiles.length && (
													<div className="flex items-center">
														<button
															className={clsx(
																classes.buttonFill,
																classes.buttonPlus,
																'mr-10'
															)}
															type="file"
															onClick={ev => {
																ev.preventDefault();
																setIndexFiles(indexFiles + 1);
															}}
														>
															<Icon>add</Icon>
														</button>
														Anadir otro archivo
													</div>
												)}
											</div>
											<div className="w-full pt-28 text-center ">
												<Button
													className={clsx(classes.button, classes.buttonFill, 'px-56')}
													onClick={handleSubmitInfo}
													disabled={!(isFormValid && atLeastThreeFiles)}
												>
													Actualizar información
												</Button>
											</div>
										</>
									)}

									{/*-------------------------VALIDAR-----------------------------*/}
									{role == 'admin' && (
										<>
											<div className="w-full pt-80 font-semibold">
												<h2 className={classes.subTitle}>VALIDAR</h2>
											</div>
											<div className="w-full md:w-1/4 pt-28 md:pr-10">
												<SelectFormsy
													id="status"
													name="status"
													value={form.status}
													onChange={handleChange}
													className={classes.select}
													required
												>
													{Object.values(IUserStatus).map(s => (
														<MenuItem className="poppins" value={s.value}>
															{s.displayValue}
														</MenuItem>
													))}
												</SelectFormsy>
											</div>
											<div className="w-full md:w-3/4 pt-28 md:pl-10" style={{ height: '180px' }}>
												<TextFieldFormsy
													multiline
													type="text"
													name="comments"
													id="comments"
													value={form.comments}
													onChange={handleChange}
													validations={{
														maxLength: 255
													}}
													validationErrors={{
														maxLength: 'El máximo de carácteres permitidos es 255'
													}}
													className={classes.textField}
													rowsMax={7}
													rows={7}
													required={form.status != 'aceptado'}
												/>
											</div>
											<div className="w-full md:w-1/3  pt-28">
												<Button
													className={clsx(classes.button, classes.buttonRed, 'px-10')}
													onClick={() => setOpenDeleteDialog(true)}
												>
													Dar de baja a este usuario
												</Button>
											</div>
											<div className="w-full md:w-1/3 pt-28 text-center">
												<Button
													className={clsx(classes.button, classes.buttonFill, 'px-56')}
													onClick={handleSubmit}
													disabled={!isFormValid}
												>
													Actualizar estatus
												</Button>
											</div>
											<div className="w-full md:w-1/3 md:pt-28"></div>
										</>
									)}
								</>
							)}
							<div className="w-full pt-80">{loadingForm && <LinearProgress />}</div>
						</Card>
					</Formsy>
				</FuseAnimateGroup>
				<FileDialog />
			</div>
		</>
	);
}
