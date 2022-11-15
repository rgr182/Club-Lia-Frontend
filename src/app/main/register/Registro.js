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
import { registerParent } from './store/registerSlice';
import { showMessage } from '../../store/fuse/messageSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Skeleton } from '@material-ui/lab';
import { getCourses, resetList } from './store/coursesSlice';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: '#353535',
    },
    rightSection: {
        background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText
    },
    title: {
        fontFamily: 'Poppins',
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
    labelSimple: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#353535',
    },
    cardContentStyle: { flexGrow: 1 },
    textField: {
        //maxWidth: '333px',
        //width: '300px',
        width: '100%',
        //minWidth: '240px',
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
    whiteText: {
        color: '#fff',
        fontFamily: 'poppins',
        fontSize: '15px',
    },
    buttonRed: {
        width: "128px",
        borderRadius: "26px",
        background: 'linear-gradient(180deg, #EB32A5 0%, #F42771 100%)',
        '&:hover': {
            background: 'linear-gradient(to bottom, #dd2898, #cf2081, #bf1b6c, #ae1959, #9d1848)',
            // background: 'linear-gradient(to bottom, #dd2898, #cf2081)'
        },
    },
    blueBackground: {
        backgroundColor: '#60CEFF',
        borderRadius: '6px',
        padding: '2px 10px',
        margin: '10px',
        fontSize: '13px'
    },
    headerImage: {
        backgroundSize: 'contain',
        backgroundImage: 'url("assets/images/backgrounds/miembro-cursos.svg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ['@media (max-width: 800px)']: {
            backgroundSize: 'cover',
            borderRadius: '14px',
            padding: '10px',
        },
    },
    required: {
        color: '#4457FF',
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

const defaultFormState = {
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country: 'México',
    state: '',
    username: '',
    password: '',
    c_password: '',
    role_id: '',
    children: [
        {
            name: '',
            last_name: '',
            level: '',
            grade: '',
            username: '',
            password: '',
            c_password: ''
        }]
};
const defaultSonState = {
    name: '',
    last_name: '',
    level: '',
    grade: '',
    username: '',
    password: '',
    c_password: ''
};
let loading = false;

function Registro(props) {
    const dispatch = useDispatch();
    const routeParams = useParams(); // returns the URL query String
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const [isCourse, setIsCourse] = useState(true);
    const { form, setForm, handleChange } = useForm(defaultFormState);
    const parentRegister = useSelector(({ PricingApp }) => PricingApp.register.register);
    const coursesList = useSelector(({ PricingApp }) => PricingApp.courses.data);

    const [course, setCourse] = useState('');
    const onlyLettersRegex = /^[a-z, áéíóúñÑ]+$/i;
    const onlyNumbersRegex = /^[0-9]*$/i;

    const formRef = useRef(null);

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    useDeepCompareEffect(() => {
        if (routeParams.type) {
            var formAux = form;
            formAux.role_id = routeParams.type;
            setForm({ ...formAux });
        }
    }, [dispatch]);

    function goBack() {
        props.history.goBack();
    }

    function newSon() {

        const children = [...form.children, defaultSonState];
        setForm({ ...form, children });
    }

    function deleteSon(index) {
        setForm({ ...form, children: form.children.filter((item, ind) => ind !== index) });
    }

    useEffect(() => {
        if (routeParams.id) {
            setIsCourse(true);
            dispatch(getCourses(routeParams.id));
        } else {
            setIsCourse(false);
        }
    }, [routeParams,]);

    useEffect(() => {
        setCourse('');
        if (coursesList.length > 0) {
            const curso = coursesList.find(element => element.id == routeParams.id);
            // evitar que un alumno compre un curso de maestro
            if (curso && curso.keywords != 'Maestros') {
                setCourse(curso);
            } else {
                dispatch(resetList());
            }
        }
    }, [coursesList]);

    useEffect(() => {
        if (parentRegister.error) {
            dispatch(showMessage({ message: parentRegister.error.response.data.message, variant: 'error' }));
            enableButton();
            loading = false;
        }

        if (parentRegister.success) {
            dispatch(showMessage({ message: parentRegister.response.message, variant: 'success' }));
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
        }
    }, [parentRegister.error, parentRegister.success]);

    function handleChangeSelect(e, field) {

        // ------ Getting values from input

        let { value } = e.target;
        let name = field;

        // ------ Adding value to Form
        var formAux = form;
        formAux[name] = value;
        setForm({ ...formAux });
    }

    function handleInput(e, index) {

        // ------ Getting values from input
        let { name, value, id } = e.target;

        // ------ Replacing children data and adding to Form
        var children = form.children;
        // children[index][name] = value;
        children[index] = { ...children[index], [name]: value }

        setForm({ ...form, children: children });
    }

    function handleInputSelect(e, index, field) {
        // ------ Getting values from input
        let { value } = e.target;
        let name = field;

        // ------ Replacing children data and adding to Form
        var children = form.children;
        children[index] = { ...children[index], [name]: value }

        setForm({ ...form, children: children });
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        var children = form.children;
        setForm({ ...values, children: children });
    }
    function handleSubmit(event) {
        loading = true;
        disableButton();
        if (isCourse) {
            form.role_id = 31;
            form.course = course;
        }
        dispatch(registerParent(form));
    }

    return (
        <div>
            <Navbar />
            <Sidebar />
            <FuseAnimate animation="transition.expandIn">
                <div className={clsx(classes.root, 'md:pt-160 p-60 lg:px-256')}>
                    <div className="flex flex-wrap flex-row w-full">
                        <div className=" flex w-full xs:w-1 sm:w-1/3 md:w-1/3 flex-col text-left">
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
                                    fontStyle: 'normal',
                                    padding: '0'
                                }}
                            >
                                {'< Regresar'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap flex-col w-full">
                        {!isCourse ?
                            <Typography className={classes.title}>
                                ¡Bienvenido a Club LIA!
                            </Typography>
                            :
                            <div className='text-center items-center justify-center' >
                                <Typography className={clsx(classes.labelTitle)} style={{ fontSize: '30px' }}>
                                    Bienvenido a Cursos LIA U
                                </Typography>
                                <Typography className={clsx(classes.label, 'py-8')}>
                                    Si aún no eres miembro, llena el siguiente formulario para continuar
                                </Typography>
                                <div className={clsx(classes.headerImage, 'flex flex-col w-full text-center items-center justify-center  sm:h-160 xl:h-208 mb-40')}>
                                    <Typography className={classes.whiteText}>
                                        <strong style={{fontSize: '18px'}}>¿Ya eres miembro?</strong><br />
                                        Accede a tu cuenta para ver o conocer todos los cursos disponibles<br />
                                        <br />
                                    </Typography>

                                    <Button to={`/login`} component={Link} className={clsx(classes.whiteText, classes.buttonRed, "normal-case mt-10")}>
                                        Acceder
                                    </Button>
                                </div>
                            </div>
                        }


                        <Typography className={classes.labelTitle}>
                            DATOS PERSONALES
                        </Typography>
                        <Typography className={classes.label}>
                            Por favor, llena los siguientes campos con tus datos(padre o tutor)
                        </Typography>

                    </div>

                    <Formsy
                        onValidSubmit={handleSubmit}
                        // onChange={validateForm}
                        onValid={enableButton}
                        onInvalid={disableButton}
                        ref={formRef}
                        className="flex flex-wrap w-full flex-row items-center justify-center pt-12 inline-block"
                    >

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                            <Typography className={classes.label}>
                                Nombre(s) <span className={classes.required}>*</span>
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
                            <Typography className={classes.label}>
                                Apellido(s) <span className={classes.required}>*</span>
                            </Typography>
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
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
                                    onlyNumbers: function (values, value) {
                                        if (value) {
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">

                            <Typography className={classes.label}>
                                Estado <span className={classes.required}>*</span>
                            </Typography>

                            {form.country === 'México' ?
                                <SelectFormsy
                                    className={classes.textField}
                                    id="state"
                                    name="state"
                                    value={form.state}
                                    onChange={e => handleChangeSelect(e, "state")}
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                            <Typography className={classes.label}>
                                Crea un usuario <span className={classes.required}>*</span>
                            </Typography>
                            <TextFieldFormsy
                                className={classes.textField}
                                type="text"
                                name="username"
                                value={form.username}
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
                                Crea una contraseña <span className={classes.required}>*</span>
                            </Typography>
                            <TextFieldFormsy
                                className={classes.textField}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                validations={{
                                    minLength: 8,
                                    maxLength: 30
                                }}
                                validationErrors={{
                                    minLength: 'El mínimo de caracteres es 8'
                                }}
                                InputProps={{
                                    className: 'pr-2',
                                    type: showPassword ? 'text' : 'password',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
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

                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
                            <Typography className={classes.label}>
                                Confirma tu contraseña <span className={classes.required}>*</span>
                            </Typography>
                            <TextFieldFormsy
                                className={classes.textField}
                                type="password"
                                name="c_password"
                                onChange={handleChange}
                                validations={{
                                    minLength: 8,
                                    maxLength: 30
                                }}
                                validationErrors={{
                                    minLength: 'El mínimo de caracteres es 8'
                                }}
                                InputProps={{
                                    className: 'pr-2',
                                    type: showPasswordC ? 'text' : 'password',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPasswordC(!showPasswordC)}>
                                                <Icon className="text-20" color="action">
                                                    {showPasswordC ? 'visibility' : 'visibility_off'}
                                                </Icon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                required
                            />
                        </div>

                        {!isCourse ?
                            <>
                                <div className="flex flex-wrap flex-col w-full pt-40">

                                    <Typography className={classes.labelTitle}>
                                        MEMBRESÍAS
                                    </Typography>
                                    <Typography className={classes.label}>
                                        Por favor, llena los siguientes campos con los datos de {isCourse ? 'tus hijos/as' : 'tu hijo/a'}
                                    </Typography>

                                </div>

                                <div className="flex flex-wrap w-full flex-col align-left justify-left py-12 mb-24">
                                    <Typography className={classes.label}>
                                        Tipo de Membresía <span className={classes.required}>*</span>
                                    </Typography>
                                    <div className="w-full md:w-1/3 md:pr-20">
                                        <SelectFormsy
                                            className={classes.textField}
                                            id="role_id"
                                            name="role_id"
                                            value={form.role_id}
                                            onChange={e => handleChangeSelect(e, "role_id")}
                                            required
                                        >
                                            <MenuItem className='poppins' key={'padreI'} value={31}>Alumno Invitado</MenuItem>
                                            <MenuItem className='poppins' key={'padreM'} value={32}>Alumno Mensual</MenuItem>
                                            <MenuItem className='poppins' key={'padreA'} value={33}>Alumno Anual</MenuItem>
                                        </SelectFormsy >
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='flex flex-col w-full text-left py-20'>
                                    <Typography className={clsx(classes.labelTitle, 'font-bold  w-full ')} /* style={{ fontSize: '30px' }} */>
                                        Cursos
                                    </Typography>
                                    <Typography className={clsx(classes.label, 'font-bold w-full pt-8 pb-16')}/* className={clsx(classes.text, 'font-bold w-full py-8')} */>
                                        Elige el curso que prefieras
                                    </Typography>
                                    <div className='flex flex-wrap'>
                                        <div className="w-full sm:w-1 md:w-1/4">
                                            <>
                                                <Typography className={classes.label}>
                                                    Curso <span className={classes.required}>*</span>
                                                </Typography>
                                                {coursesList ? (
                                                    coursesList.length > 0 ?
                                                        <SelectFormsy
                                                            id="group_id"
                                                            name="group_id"
                                                            value={course}
                                                            onChange={ev => { setCourse(ev.target.value) }}
                                                            className={classes.textField}
                                                        >
                                                            {coursesList.map((row) => (
                                                                <MenuItem className='poppins' key={row.name} value={row}>{row.name}</MenuItem>
                                                            ))}
                                                        </SelectFormsy>
                                                        :
                                                        <Typography className={clsx(classes.warnig, 'poppins pt-20')}>
                                                            No se han encontrado cursos
                                                        </Typography>
                                                ) : (
                                                    <Typography variant="h4" ><Skeleton /></Typography>
                                                )}
                                            </>
                                        </div>

                                    </div>
                                    {course ?
                                        <div className='sm:inline-flex w-full text-left py-28'>
                                            <img className='pr-20 pb-20 sm:pb-0' src={course.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : course.card_image_url} style={{ width: '248px', height: '150px' }} />
                                            <div>
                                                <strong className={classes.labelTitle}  style={{color: '#4249F8'}}>${course.price} MXN</strong>
                                                <strong className={clsx(classes.whiteText, classes.blueBackground)}>Acceso ilimitado (por hijo)</strong>

                                                <Typography className={clsx(classes.label, 'pt-10 font-normal')}>
                                                    <strong className={classes.labelTitle}>{course.name}</strong><br />
                                                    {course.description}
                                                </Typography>
                                                {/* <Button className={clsx(classes.whiteText, classes.buttonRed, "normal-case mt-10")}>
                                                    Ver más
                                                </Button> */}
                                            </div>
                                        </div>
                                        :
                                        <div />
                                    }

                                </div>
                                <div className={'w-full items-center justify-center'}>
                                    <Typography className={clsx(classes.label)}>
                                        Por favor, llena los siguientes campos con los datos de tus hijos/as
                                    </Typography>
                                </div>
                            </>
                        }

                        {/* -------------Children form-------------*/}

                        {form.children && form.children.length > 0 ? (
                            <>
                                {form.children && form.children.map((child, index) => (
                                    <div className="flex flex-wrap flex-row w-full border-b-1 pb-48" name="sons">
                                        <div className="w-full sm:w-1 md:w-1/3 py-12  md:pr-20">
                                            <Typography className={classes.label}>
                                                Nombre(s) <span className={classes.required}>*</span>
                                            </Typography>
                                            <TextFieldFormsy
                                                className={classes.textField}
                                                type="text"
                                                name={"name"}
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
                                                Apellido(s) <span className={classes.required}>*</span>
                                            </Typography>
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
                                                validationErrors={{
                                                    minLength: 'El mínimo de caracteres es 3',
                                                    maxLength: 'El máximo de caracteres es 150',
                                                    includesSChars: 'No se permiten caracteres especiales'
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className="w-full sm:w-1 md:w-1/3 py-12  md:pl-20">
                                            <Typography className={classes.label}>
                                                Nivel Educativo <span className={classes.required}>*</span>
                                            </Typography>
                                            <SelectFormsy
                                                className={classes.textField}
                                                id="level"
                                                name="level"
                                                value={form.children[index].level}
                                                onChange={e => handleInputSelect(e, index, "level")}
                                            // required
                                            >
                                                <MenuItem className='poppins' key={1} value={1}>preescolar</MenuItem>
                                                <MenuItem className='poppins' key={2} value={2}>primaria</MenuItem>
                                                <MenuItem className='poppins' key={3} value={3}>secundaria</MenuItem>
                                            </SelectFormsy>
                                        </div>

                                        <div className="w-full sm:w-1 md:w-1/3 py-12  md:pr-20">
                                            <Typography className={classes.label}>
                                                Grado <span className={classes.required}>*</span>
                                            </Typography>
                                            <SelectFormsy
                                                className={classes.textField}
                                                id="grade"
                                                name="grade"
                                                value={form.children[index].grade}
                                                onChange={e => handleInputSelect(e, index, "grade")}
                                                required
                                            >

                                                <MenuItem className='poppins' key={'grade1'} value={1}>1°</MenuItem>
                                                <MenuItem className='poppins' key={'grade2'} value={2}>2°</MenuItem>
                                                <MenuItem className='poppins' key={'grade3'} value={3}>3°</MenuItem>
                                                {child.level == 2 ? <MenuItem className='poppins' key={'grade4'} value={4}>4°</MenuItem> : null}
                                                {child.level == 2 ? <MenuItem className='poppins' key={'grade5'} value={5}>5°</MenuItem> : null}
                                                {child.level == 2 ? <MenuItem className='poppins' key={'grade6'} value={6}>6°</MenuItem> : null}
                                            </SelectFormsy >
                                        </div>

                                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:px-20">
                                            <Typography className={classes.label}>
                                                Correo electrónico (de tu hijo/a) <span className={classes.required}>*</span>
                                            </Typography>
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
                                        </div>
                                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pl-20">
                                            <div className='message-form-1'>
                                                Recuerda: Por cada hijo, el correo deberá de ser distinto
                                            </div>
                                        </div>


                                        <div className="w-full sm:w-1 md:w-1/3 py-12 md:pr-20">
                                            <Typography className={classes.label}>
                                                Crea un usuario para tu hijo <span className={classes.required}>*</span>
                                            </Typography>
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
                                            <Typography className={classes.label}>
                                                Crea una contraseña <span className={classes.required}>*</span>
                                            </Typography>
                                            <TextFieldFormsy
                                                className={classes.textField}
                                                type="password"
                                                name="password"
                                                value={form.children[index].password}
                                                onChange={e => handleInput(e, index)}
                                                validations={{
                                                    minLength: 8,
                                                    maxLength: 30
                                                }}
                                                validationErrors={{
                                                    minLength: 'El mínimo de caracteres es 8'
                                                }}
                                                InputProps={{
                                                    className: 'pr-2',
                                                    type: showPassword ? 'text' : 'password',
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
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

                                        <div className="w-full sm:w-1 md:w-1/3 py-12  md:pl-20">
                                            <Typography className={classes.label}>
                                                Confirma tu contraseña <span className={classes.required}>*</span>
                                            </Typography>
                                            <TextFieldFormsy
                                                className={classes.textField}
                                                type="password"
                                                name="c_password"
                                                value={form.children[index].c_password}
                                                onChange={e => handleInput(e, index)}
                                                validations={{
                                                    minLength: 8,
                                                    maxLength: 30
                                                }}
                                                validationErrors={{
                                                    minLength: 'El mínimo de caracteres es 8'
                                                }}
                                                InputProps={{
                                                    className: 'pr-2',
                                                    type: showPasswordC ? 'text' : 'password',
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShowPasswordC(!showPasswordC)}>
                                                                <Icon className="text-20" color="action">
                                                                    {showPasswordC ? 'visibility' : 'visibility_off'}
                                                                </Icon>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                required
                                            />
                                        </div>

                                        { form.children.length > 1
                                            // && index == (form.children.length - 1) 
                                            ?
                                            <div className="flex flex-wrap w-full flex-row align-center justify-center py-12">
                                                <Button
                                                    style={{

                                                        width: '124px'
                                                    }}
                                                    className="btnLimpiar"
                                                    onClick={() => {
                                                        deleteSon(index)
                                                    }}>
                                                    Borrar
                                                </Button>
                                            </div>
                                            : null
                                        }
                                    </div>
                                ))}
                            </>
                        )
                            : null
                        }
                        <div className="flex flex-wrap w-full flex-row align-left justify-left py-12">

                            {isCourse &&
                                <Button
                                    disableRipple
                                    style={{ backgroundColor: 'transparent', textTransform: 'none' }}
                                    color="secondary"
                                    onClick={() => {
                                        newSon()

                                    }}>
                                    <Icon color="#60CEFF" className="mr-4">add_circle</Icon>
                                    <Typography className={classes.label}>
                                        Añadir otro hijo
                                    </Typography>
                                </Button>
                            }
                        </div>

                        {(isCourse && course) &&
                            <div className='flex flex-wrap w-full flex-row py-12 poppins'>
                                <div className="w-1/2 text-right pr-20 font-normal" style={{ fontSize: '13px' }}><strong>{form.children ? form.children.length : 0}</strong> {course.name}</div>
                                <div className="w-1/2 opacity-50"><strong className={classes.labelTitle}>{' '}${course.price} MXN</strong></div>
                                <div className="w-1/2 text-right pr-20 pt-20"><strong>Total:</strong></div>
                                <div className="w-1/2 pt-20"><strong className={classes.labelTitle}>{' '}${course.price * (form.children ? form.children.length : 0)} MXN</strong></div>
                            </div>
                        }

                        <div className="flex flex-wrap flex-col w-full pt-40 justify-left align-center items-center mb-28">
                            <div className="flex flex-wrap flex-col w-full pt-40 justify-left sm:w-1 md:w-1/3">
                                <Typography className={classes.labelSimple}><span className={classes.required}>* </span>Campos obligatorios</Typography>
                                <Typography className={classes.labelSimple}>
                                    <Checkbox required></Checkbox>He leído y acepto los
                                    <a href={process.env.REACT_APP_BRANDING_PAGE+'/terminos-y-condiciones/'}
                                        target="_blank"
                                        underline='hover'
                                        style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                        disableRipple> Términos y condiciones</a>
                                </Typography>
                                <Typography className={classes.labelSimple}>
                                    <Checkbox required></Checkbox>He leído y acepto el
                                    <a href={process.env.REACT_APP_BRANDING_PAGE+'/politicas-de-privacidad/'}
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
                            disabled={!isCourse ? !isFormValid : (!isFormValid || !course)}
                            onClick={() => {
                                // setValues({loadingDialog: true})
                                // dispatch(duplicateGroup(routeParams.id))
                            }}
                            autoFocus
                        >
                            Continuar
                        </Button>

                    </Formsy>
                    {loading &&
                        <div className="w-full mt-12">
                            <LinearProgress color="secondary" />
                        </div>
                    }
                </div>
            </FuseAnimate>
            <Footer />
        </div>
    );
}

export default Registro;
