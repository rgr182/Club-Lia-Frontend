import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth0RegisterTab from './tabs/Auth0RegisterTab';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';
import ParentRegisterTab from './tabs/ParentRegisterTab';
import SchoolRegisterTab from './tabs/SchoolRegisterTab';
import TeacherRegisterTab from './tabs/TeacherRegisterTab';
import reducer from './store';
import Grid from '@material-ui/core/Grid';
import MenuItem from "@material-ui/core/MenuItem";
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../../../styles/newdesign.css';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { registerSupport } from './store/registerSlice';
import { showMessage } from '../../store/fuse/messageSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { fromPairs } from 'lodash';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
        color: '#353535',
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
    title: {
		fontFamily: 'wendyone',
		fontSize: '30px',
		color: '#4457FF',
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
        fontWeight: 700,
	},
    labelTitle: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#4457FF',
        fontWeight: 700,
	},
    label: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#353535',
        fontWeight: 700,
	},
    label2: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#353535',
	},
    required: {
        color: '#4457FF',
    },
	cardContentStyle:{flexGrow:1},
	textField: {
		maxWidth: '333px',
        width: '100%',
		minWidth: '240px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		/* '& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '15px',
			background: 'transparent',
			color: '#353535',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid #00B1FF 3px'
			} */
        '& .MuiInput-root': {
            width: '95%',
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "white",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
		},
		/* '& .MuiInput-root.Mui-error': {
			borderColor: '#FF2F54',
			color: '#FF2F54',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#FF2F54'
			}
		}, */
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
    textFieldDisabled: {
        '& .MuiInput-root.Mui-disabled': {
			borderColor: '#00B1FF',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#00B1FF'
			}
		},
    },
	textField2: {
		maxWidth: '433px',
		minWidth: '300px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '10px',
			background: 'transparent',
			color: 'black',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid #00B1FF 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
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
    textField3: {
		minWidth: '300px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '10px',
			background: 'transparent',
			color: 'black',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid #00B1FF 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
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
    button: {
		alignContent: 'center',
		textAlign: 'center',
		width: '150px',
		borderRadius: '45px',
		background: 'transparent',
		color: '#00B1FF',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #00B1FF 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: '#60CEFF',
			color: '#fff',
			borderColor: '#60CEFF'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonFill: {
		background: '#60CEFF',
		color: '#fff',
		border: 'solid #60CEFF 3px',
		'&:hover': {
			backgroundColor: '#00B1FF',
			borderColor: '#00B1FF'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
    textFieldButton: {
        backgroundColor: 'transparent',
        width: "23vw",
        borderRadius: "15px",
        background: "transparent",
        height: "35px",
        marginTop: "8px",
        marginRight: "10px",
        border: "solid #BEBEBE 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        fontWeight: 'normal',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '&:before, &:after, &:focus, &:hover, &:focus-visible': {
            border: "solid #00B1FF 3px",
            outlineColor: '#00B1FF',
            backgroundColor: 'transparent'
        },
        '& .MuiButton-label': {
            justifyContent: 'left',
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE !important',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    checkbox: {
        fontWeight: '700',
        '& .MuiTypography-root': {
            fontFamily: 'Poppins',
            fontWeight: '700',
            fontSize: '15px !important'
        }
    }
}));

const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { isDisabled }) => {
        return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "green",
        color: "#FFF",
        cursor: isDisabled ? "not-allowed" : "default"
        };
    }

  }

const defaultFormState= {
    name: '',
    email: '',
    phone_number: '',
    country:'México',
    state: '',
    support: '',
    supportStudents: '',
    supportAmount: '',
    institution: '',
    businessName: '',
    position: '',
    instructions: '',
    publish_donors: 0,
    publish_logo: 0,
    publish_both: false,
    publish: ''
};

let loading = false;

function RegistroApoyar(props) {
    const dispatch = useDispatch();
	const routeParams = useParams(); // returns the URL query String
	const classes = useStyles();
	const [isFormValid, setIsFormValid] = useState(false);
	const [support, setSupport] = useState(1);
    const { form, setForm, handleChange } = useForm(defaultFormState);
    const parentRegister = useSelector(({ PricingApp }) => PricingApp.register.register);
    const onlyLettersRegex = /^[a-z, áéíóúñÑ]+$/i;
    const onlyNumbersRegex = /^[0-9]*$/i;

    const formRef = useRef(null);

    const [file, setFile] = useState('');

    useDeepCompareEffect(() => {
        if(routeParams.type){
            var formAux = form;
            formAux.role_id = routeParams.type;
            setForm({ ...formAux });
        }
	}, [dispatch]);

    function goBack(){
		props.history.goBack();
	}

    useEffect(() => {
        if (parentRegister.error) {
            dispatch(showMessage({ message: parentRegister.error.response.data.message, variant: 'error' }));
            enableButton();
            loading = false;
        }

        if (parentRegister.success) {
            dispatch(showMessage({ message: parentRegister.response.message, variant: 'success' }));
            console.log('aqui 2', parentRegister);
            /* if(parentRegister.response.data.init_point){ */
                if (parentRegister.response.data.order) {
                    localStorage.setItem('id_parent', parentRegister.response.data.id_parent);
                    localStorage.setItem('id_order', parentRegister.response.data.order);
                } else {
                    localStorage.removeItem('id_parent');
                    localStorage.removeItem('id_order');
                }
                setTimeout(() => {
    
                    window.open(parentRegister.response.data.init_point, "_self");
    
                }, 1000);
            
            
            loading = false;
            var formAux = form;
            formAux.institution = null;
            formAux.businessName = null;
            formAux.position = null;
            formAux.name = null;
            formAux.email = null;
            formAux.phone_number = null;
            formAux.instructions = null;
            formAux.supportStudents = null;
            formAux.supportAmount = null;
            formAux.publish_donors = false;
            formAux.publish_logo = false;
            formAux.publish_both = false;
            formAux.publish = null;
            setForm({ ...formAux });

        }
    }, [parentRegister.error, parentRegister.success]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm (values) {
        if(values.country)
        setForm({ ...values});
	}
   /*  function validateForm2 (values) {
        setForm({ ...values, country : 'México' });
	} */
    function handleSubmit(event) {
        loading = true;
        form.support = support;
        disableButton();
        if(form.publish == '1'){
            var formAux = form;
            formAux.publish_donors = true;
            formAux.publish_logo = false;
            formAux.publish_both = false;
            setForm({ ...formAux });

        }
        if(form.publish == '2'){
            var formAux = form;
            formAux.publish_donors = false;
            formAux.publish_logo = true;
            formAux.publish_both = false;
            setForm({ ...formAux });
        }
        if(form.publish == '3'){
            var formAux = form;
            formAux.publish_donors = false;
            formAux.publish_logo = false;
            formAux.publish_both = true;
            setForm({ ...formAux });
        }

        dispatch(registerSupport(form, file));
	}
    console.log(form);

	return (
		<div>
            <Navbar />
            <Sidebar />
			<FuseAnimate animation="transition.expandIn" id='create-course-form'>
                <div className={clsx(classes.root, 'md:pt-160 p-6 0 lg:px-256')}>

                        <div className="flex flex-wrap flex-row w-full">
                            <div className=" flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col text-left">
                                <Button
                                    disableRipple
                                    component={Link}
                                    onClick={goBack}
                                    uppercase="false"
                                    style={{
                                        backgroundColor: 'transparent',
                                        textTransform: 'none',
                                        justifyContent: 'left',
                                        fontFamily: 'poppins',
                                        fontStyle: 'normal'
                                    }}
                                >
                                    {'< Regresar'}
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap flex-col w-full">
                            <Typography className={classes.title}>
                                Dona una Membresía LIA de reforzamiento académico
                            </Typography>
                        </div>

                        <Formsy
                            onValidSubmit={handleSubmit}
                            onChange={validateForm}
                            onValid={enableButton}
                            onInvalid={disableButton}
                            ref={formRef}
                            className="flex flex-wrap w-full flex-row items-center justify-center pt-12 inline-block"
                        >
                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                                <Typography className={classes.label}>
                                    ¿A cuántos niños te gustaría apoyar? <span className={classes.required}>*</span>
                                </Typography>
                                <SelectFormsy
                                    className={classes.textField}
                                    id="support"
                                    name="support"
                                    value={support}
                                    onChange={ev => setSupport(ev.target.value)}
                                    defaultFormState
                                    required
                                    >
                                        <MenuItem className='poppins' value={1}>De 1 a 10</MenuItem>
                                        <MenuItem className='poppins' value={2}>Mas de 10</MenuItem>
                                        <MenuItem className='poppins' value={3}>Quiero apoyar con un monto de dinero</MenuItem>
                                </SelectFormsy >
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">

                                 { support == 1 ?
                                <>
                                <Typography className={classes.label}>
                                    Elige una opción
                                </Typography>
                                <SelectFormsy
                                    className={classes.textField}
                                    id="supportStudents"
                                    name="supportStudents"
                                    value={form.supportStudents}
                                    onChange={handleChange}
                                    >
                                        <MenuItem className='poppins' value={1}>1</MenuItem>
                                        <MenuItem className='poppins' value={2}>2</MenuItem>
                                        <MenuItem className='poppins' value={3}>3</MenuItem>
                                        <MenuItem className='poppins' value={4}>4</MenuItem>
                                        <MenuItem className='poppins' value={5}>5</MenuItem>
                                        <MenuItem className='poppins' value={6}>6</MenuItem>
                                        <MenuItem className='poppins' value={7}>7</MenuItem>
                                        <MenuItem className='poppins' value={8}>8</MenuItem>
                                        <MenuItem className='poppins' value={9}>9</MenuItem>
                                        <MenuItem className='poppins' value={10}>10</MenuItem>
                                </SelectFormsy >
                                </>
                                :
                                <></>
                                }

                                { support == 3?
                                <>
                                    <Typography className={classes.label}>
                                        Escribe un monto en MXN
                                    </Typography>
                                    <TextFieldFormsy
                                    className={classes.textField}
                                    type="number"
                                    name="supportAmount"
                                    value={form.supportAmount}
                                    onChange={handleChange}
                                    validations={{
                                        onlyNumbers: function(values, value){
                                            console.log(value);
                                            if(value){
                                                return onlyNumbersRegex.test(value);
                                              }
                                              return true;
                                        }
                                    }}
                                    validationErrors={{
                                        onlyNumbers: 'Ingresa únicamente números'
                                    }}
                                    />
                                </>
                                :
                                <></>
                                } 
                            </div>


                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
                                { support == 1 || support == 3 ?
                                <>
                                <Typography className={classes.label}>
                                    Total:
                                </Typography>
                                { support == 1 ? 
                                    <Typography className={classes.label}>
                                        $ { form.supportStudents ? (form.supportStudents * 3600 ): 0} MXN
                                    </Typography>
                                    :
                                    <Typography className={classes.label}>
                                        $ { form.supportAmount ? form.supportAmount : 0} MXN
                                    </Typography>
                                }
                                </>
                                :
                                <></>
                                }
                            </div>

                            <div className="flex flex-wrap flex-col w-full">

                                <Typography className={classes.label}>
                                    Por favor, llena los siguientes campos con tus datos
                                </Typography>

                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                                <Typography className={classes.label}>
                                    Organización/Institución <span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="institution"
                                    value={form.institution}
                                    onChange={handleChange}
                                    validations={{
                                        maxLength: 300,
                                    }}
                                    validationErrors={{
                                        maxLength: 'El máximo de caracteres es 300',
                                    }}
                                    required
                                />
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
                                <Typography className={classes.label}>
                                    Razón Social<span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="businessName"
                                    value={form.businessName}
                                    onChange={handleChange}
                                    validations={{
                                        minLength: 3,
                                        maxLength: 300,
                                        /* includesSChars: function(values, value){
                                            console.log(value);
                                            if(value){
                                                return onlyLettersRegex.test(value);
                                              }
                                              return true;
                                        } */
                                    }}
                                    validationErrors={{
                                        minLength: 'El mínimo de caracteres es 3',
                                        maxLength: 'El máximo de caracteres es 300',
                                        //includesSChars: 'No se permiten caracteres especiales'
                                    }}
                                    required
                                />
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
                                <Typography className={classes.label}>
                                    Puesto/Cargo <span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    validations={{
                                        minLength: 3,
                                        maxLength: 300,
                                        includesSChars: function(values, value){
                                            console.log(value);
                                            if(value){
                                                return onlyLettersRegex.test(value);
                                              }
                                              return true;
                                        }
                                    }}
                                    validationErrors={{
                                        minLength: 'El mínimo de caracteres es 3',
                                        maxLength: 'El máximo de caracteres es 300',
                                        includesSChars: 'No se permiten caracteres especiales'
                                    }}
                                    required
                                />
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                                <Typography className={classes.label}>
                                    Nombre completo <span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    validations={{
                                        minLength: 3,
                                        maxLength: 150,
                                        includesSChars: function(values, value){
                                            console.log(value);
                                            if(value){
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
                                <Typography className={classes.label}>
                                    Correo <span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    validations="isEmail"
                                    validationErrors={{
                                        isEmail: 'Por favor ingresa un correo válido'
                                    }}
                                    required
                                />
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">

                                <Typography className={classes.label}>
                                    Teléfono <span className={classes.required}>*</span>
                                </Typography>

                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    validations={{
                                        maxLength: form.country == 'México' ? 10 : 15,
                                        onlyNumbers: function(values, value){
                                            console.log(value);
                                            if(value){
                                                return onlyNumbersRegex.test(value);
                                              }
                                              return true;
                                        }
                                    }}
                                    validationErrors={{
                                        maxLength: form.country == 'México' ?
                                        'El máximo de caracteres es 10'
                                        : 'El máximo de caracteres es 15',
                                        onlyNumbers: 'Ingresa únicamente números'
                                    }}
                                    required
                                />
                            </div>

                            { support != 2?

                            <>
                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                            <Typography className={classes.label}>
                                País <span className={classes.required}>*</span>
                            </Typography>
                            <TextFieldFormsy
                                className={classes.textField}
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">

                                <Typography className={classes.label}>
                                    Estado <span className={classes.required}>*</span>
                                </Typography>

                                { form.country === 'México' ?
                                    <SelectFormsy
                                        className={classes.textField}
                                        id="state"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem className='poppins' key={'Aguascalientes'} value="Aguascalientes">Aguascalientes</MenuItem>
                                        <MenuItem className='poppins' key={'Baja California'} value="Baja California">Baja California</MenuItem>
                                        <MenuItem className='poppins' key={'Baja California Sur'} value="Baja California Sur">Baja California Sur</MenuItem>
                                        <MenuItem className='poppins' key={'Campeche'} value="Campeche">Campeche</MenuItem>
                                        <MenuItem className='poppins' key={'Chiapas'} value="Chiapas">Chiapas</MenuItem>
                                        <MenuItem className='poppins' key={'Chihuahua'} value="Chihuahua">Chihuahua</MenuItem>
                                        <MenuItem className='poppins' key={'CDMX'} value="CDMX">Ciudad de México</MenuItem>
                                        <MenuItem className='poppins' key={'Coahuila'} value="Coahuila">Coahuila</MenuItem>
                                        <MenuItem className='poppins' key={'Colima'} value="Colima">Colima</MenuItem>
                                        <MenuItem className='poppins' key={'Durango'} value="Durango">Durango</MenuItem>
                                        <MenuItem className='poppins' key={'Estado de México'} value="Estado de México">Estado de México</MenuItem>
                                        <MenuItem className='poppins' key={'Guanajuato'} value="Guanajuato">Guanajuato</MenuItem>
                                        <MenuItem className='poppins' key={'Guerrero'} value="Guerrero">Guerrero</MenuItem>
                                        <MenuItem className='poppins' key={'Hidalgo'} value="Hidalgo">Hidalgo</MenuItem>
                                        <MenuItem className='poppins' key={'Jalisco'} value="Jalisco">Jalisco</MenuItem>
                                        <MenuItem className='poppins' key={'Michoacán'} value="Michoacán">Michoacán</MenuItem>
                                        <MenuItem className='poppins' key={'Morelos'} value="Morelos">Morelos</MenuItem>
                                        <MenuItem className='poppins' key={'Nayarit'} value="Nayarit">Nayarit</MenuItem>
                                        <MenuItem className='poppins' key={'Nuevo León'} value="Nuevo León">Nuevo León</MenuItem>
                                        <MenuItem className='poppins' key={'Oaxaca'} value="Oaxaca">Oaxaca</MenuItem>
                                        <MenuItem className='poppins' key={'Puebla'} value="Puebla">Puebla</MenuItem>
                                        <MenuItem className='poppins' key={'Querétaro'} value="Querétaro">Querétaro</MenuItem>
                                        <MenuItem className='poppins' key={'Quintana Roo'} value="Quintana Roo">Quintana Roo</MenuItem>
                                        <MenuItem className='poppins' key={'San Luis Potosí'} value="San Luis Potosí">San Luis Potosí</MenuItem>
                                        <MenuItem className='poppins' key={'Sinaloa'} value="Sinaloa">Sinaloa</MenuItem>
                                        <MenuItem className='poppins' key={'Sonora'} value="Sonora">Sonora</MenuItem>
                                        <MenuItem className='poppins' key={'Tabasco'} value="Tabasco">Tabasco</MenuItem>
                                        <MenuItem className='poppins' key={'Tamaulipas'} value="Tamaulipas">Tamaulipas</MenuItem>
                                        <MenuItem className='poppins' key={'Tlaxcala'} value="Tlaxcala">Tlaxcala</MenuItem>
                                        <MenuItem className='poppins' key={'Veracruz'} value="Veracruz">Veracruz</MenuItem>
                                        <MenuItem className='poppins' key={'Yucatán'} value="Yucatán">Yucatán</MenuItem>
                                        <MenuItem className='poppins' key={'Zacatecas'} value="Zacatecas">Zacatecas</MenuItem>
                                    </SelectFormsy>
                                    :
                                    <TextFieldFormsy
                                        className={classes.textField}
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        validations={{
                                            minLength: 2,
                                            maxLength: 30
                                        }}
                                        validationErrors={{
                                            minLength: 'Min character length is 4'
                                        }}
                                        required
                                    />
                                }
                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12"></div>
                            <div className="flex flex-wrap w-full flex-col align-left justify-left py-12 mb-24">
                            <Typography className={classes.label}>¿Deseas que publiquemos en nuestra página tu donación?</Typography>
                            <Typography className={classes.label}>
                                        <RadioGroup
                                            name="publish"
                                             value={form.publish}
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel className={classes.checkbox}  value='1' control={<Radio />} label="Si" />
                                            <FormControlLabel className={classes.checkbox}  value='2' control={<Radio />} label="Sólo razón social" />
                                            <FormControlLabel className={classes.checkbox}  value='3' control={<Radio />} label="Ninguno" />
                                        </RadioGroup>
                            </Typography>
                            </div>
                            </>
                            :
                            <></>
                            } 


                            { support != 2 ?

                            <div className="flex flex-wrap w-full flex-col align-left justify-left py-12 mb-24">
                            <Typography className={classes.label}>
                                    <div style={{ display: "contents" }}>
                                        <input 
                                            style={{ display: 'none' }}
                                            id="raised-button-file6"
                                            type="file"
                                           
                                            accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                        />
                                        <label htmlFor="raised-button-file6">
                                            <Button  className={classes.textFieldButton}  >
                                                {file ? file.name : ''}
                                            </Button>
                                        </label>
                                    </div>
                                    <div style={{ display: "contents" }}>
                                        <input id="raised-button-file5" 
                                        style={{ display: 'none' }} 
                                        type="file" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"/>
                                        <label htmlFor="raised-button-file5">
                                            <Button className={clsx(classes.button, classes.buttonFill)} component="span" >
                                                Subir
                                            </Button>
                                        </label>
                                    </div>
                            </Typography>
                            </div>
                            :
                            <div className="flex flex-wrap w-full flex-col align-left justify-left py-12 mb-24">
                                <Typography className={classes.label}>
                                    Mensaje <span className={classes.required}>*</span>
                                </Typography>

                                <TextFieldFormsy
                                        multiline
                                        type="text"
                                        name="instructions"
                                        id="instructions"
                                        value={form.instructions}
                                        onChange={handleChange}
                                        validations={{
                                            maxLength: 400
                                        }}
                                        validationErrors={{
                                            maxLength: 'El máximo de carácteres permitidos es 400'
                                        }}
                                        className={classes.textField3}
                                        rowsMax={7}
                                        rows={7}
                                        required
                                    />
                            </div>
                            }


                            <div className="flex flex-wrap flex-col w-full pt-40 justify-left align-center items-center mb-28">
                                <div className="flex flex-wrap flex-col w-full pt-40 justify-left sm:w-1 md:w-1/3">
                                    <Typography className={classes.label2}><span className={classes.required}>*</span>Campos obligatorios</Typography>
                                    <Typography className={classes.label2}>
                                        <Checkbox required></Checkbox>He leído y acepto los
                                        <a href={process.env.REACT_APP_BRANDING_PAGE + '/terminos-y-condiciones/'}
                                            target="_blank"
                                            underline='hover'
                                            style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                            disableRipple> Términos y condiciones</a>
                                    </Typography>
                                    <Typography className={classes.label2}>
                                        <Checkbox required></Checkbox>He leído y acepto el
                                        <a href={process.env.REACT_APP_BRANDING_PAGE + '/politicas-de-privacidad/'}
                                            target="_blank"
                                            underline='hover'
                                            style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                            disableRipple> Aviso de privacidad</a>
                                    </Typography>
                                </div>
                            </div>

                            <Button
                                className={clsx(classes.button, classes.buttonFill)}
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isFormValid}
                                onClick={() => {
                                    // setValues({loa   dingDialog: true})
                                    // dispatch(duplicateGroup(routeParams.id))
                                }}
                                autoFocus
                            >
                                Continuar
                            </Button>

                        </Formsy>
                        { loading &&
							 <div className="w-full mt-12">
							 	<LinearProgress color="secondary" />
							 </div>}
                    </div>
            </FuseAnimate>
            <Footer />
        </div>
	);
}

export default RegistroApoyar;
