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


const useStyles = makeStyles(theme => ({
	root: {
		/* background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText */
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
        width: '300px',
		minWidth: '240px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '15px',
			background: 'transparent',
			color: '#353535',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid #00B1FF 3px'
			}
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
    support: '2',
    supportStudents: '',
    supportAmount: '',
    company: '',
    businessName: '',
    position: '',
    instructions: ''
};

let loading = false;

function RegistroVoluntario(props) {
    const dispatch = useDispatch();
	const routeParams = useParams(); // returns the URL query String
	const classes = useStyles();
	const [isFormValid, setIsFormValid] = useState(false);
    const { form, setForm, handleChange } = useForm(defaultFormState);
    const parentRegister = useSelector(({ PricingApp }) => PricingApp.register.register);
    const onlyLettersRegex = /^[a-z, ]+$/i;
    const onlyNumbersRegex = /^[0-9]*$/i;

    const formRef = useRef(null);

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
            loading = false;
            var formAux = form;
            formAux.company = null;
            formAux.businessName = null;
            formAux.position = null;
            formAux.name = null;
            formAux.email = null;
            formAux.phone_number = null;
            formAux.instructions = null;
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
        var children = form.children;
        setForm({ ...values, children: children });
	}
    function handleSubmit(event) {
        loading = true;
        var formAux = form;
            formAux.support = '2';
            setForm({ ...formAux });
        console.log('aqui',form);
        disableButton();
        dispatch(registerSupport(form));
	}
    console.log(form);

	return (
		<div>
            <Navbar />
            <Sidebar />
			<FuseAnimate animation="transition.expandIn">
                    <div className={clsx(classes.root, 'md:pt-160 p-60 lg:px-256')}>


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
                                Participa con un voluntariado corporativo
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

                            <div className="flex flex-wrap flex-col w-full">

                                <Typography className={classes.label}>
                                    Por favor, llena los siguientes campos con tus datos
                                </Typography>

                            </div>

                            <div className="w-full sm:w-1 md:w-1/3 py-12 pt-40">
                                <Typography className={classes.label}>
                                    Organización/Institución <span className={classes.required}>*</span>
                                </Typography>
                                <TextFieldFormsy
                                    className={classes.textField}
                                    type="text"
                                    name="company"
                                    value={form.company}
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12 pt-40">
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12 pt-40">
                                <Typography className={classes.label}>
                                    Puesto/Cargo<span className={classes.required}>*</span>
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12">
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12">
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

                            <div className="w-full sm:w-1 md:w-1/3 py-12">

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

export default RegistroVoluntario;
