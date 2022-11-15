import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MenuItem from "@material-ui/core/MenuItem";
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import Select from '@material-ui/core/Select';
import { registerTeacherCourse } from './store/registerSlice';
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
    textField: {
        width: '100%',
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
    select: {
        alignContent: "left",
        textAlign: "left",
        width: "100%",
        marginTop: "8px",
        marginRight: "7px",
        '& .MuiSelect-select': {
            borderRadius: "15px",
            background: "transparent",
            color: "#353535",
            height: "18px",
            border: "solid #BEBEBE 3px",
            fontFamily: 'Poppins',
            padding: '6px 3px',
            fontFamily: 'Poppins',
            '&:before, &:after, &:focus': {
                backgroundColor: 'transparent',
                border: "solid #BEBEBE 3px",
                content: 'none'
            },
            '&:hover': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover': {
                borderColor: 'transparent'
            },
        },
        '&:before, &:after, &:focus': {
            border: 'transparent',
            content: 'none'
        },
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
};
let loading = false;

function CursosMaestro(props) {
    const dispatch = useDispatch();
    const routeParams = useParams(); // returns the URL query String
    const classes = useStyles();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const { form, setForm, handleChange } = useForm(defaultFormState);
    const parentRegister = useSelector(({ PricingApp }) => PricingApp.register.register);
    const coursesList = useSelector(({ PricingApp }) => PricingApp.courses.data);

    const [course, setCourse] = useState('');
    const onlyLettersRegex = /^[a-z, áéíóú]+$/i;
    const onlyNumbersRegex = /^[0-9]*$/i;

    const formRef = useRef(null);

    function goBack() {
        props.history.goBack();
    }

    useEffect(() => {
        if (routeParams.id) {
            dispatch(getCourses(routeParams.id));
        }
    }, [routeParams,]);

    useEffect(() => {
        setCourse('');
        if (coursesList.length > 0) {
            const curso = coursesList.find(element => element.id == routeParams.id);
            // evitar que un maestro compre un curso de alumno
            if (curso && curso.keywords != 'programacion') {
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
            console.log(parentRegister.response.data);
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

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(event) {
        loading = true;
        disableButton();
        form.role_id = 28;
        form.course = course;
        dispatch(registerTeacherCourse(form));
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
                        <div className='flex flex-col w-full text-left py-20'>
                            <Typography className={clsx(classes.labelTitle, 'font-bold  w-full')} /* style={{ fontSize: '30px' }} */>
                                Cursos
                            </Typography>
                            <Typography className={clsx(classes.label, 'font-bold w-full pt-8 pb-16')}/* className={clsx(classes.text, 'font-bold w-full py-8')} */>
                                Elige el curso que prefieras
                            </Typography>
                            <div className='flex flex-wrap'>
                                <div className="w-full sm:w-1 md:w-1/3 md:pr-20">
                                    <Typography className={classes.label}>
                                        Curso <span className={classes.required}>*</span>
                                    </Typography>
                                    {coursesList ? (
                                        coursesList.length > 0 ?
                                            <Select
                                                id="group_id"
                                                name="group_id"
                                                value={course}
                                                onChange={ev => { setCourse(ev.target.value) }}
                                                className={classes.select}
                                            >
                                                {coursesList.map((row) => (
                                                    <MenuItem className='poppins' key={row.name} value={row}>{row.name}</MenuItem>
                                                ))}
                                            </Select>
                                            :
                                            <Typography className={clsx(classes.warnig, 'poppins pt-20')}>
                                                No se han encontrado cursos
                                            </Typography>
                                    ) : (
                                        <Typography variant="h4" ><Skeleton /></Typography>
                                    )}
                                </div>

                            </div>
                            {course ?
                                <div className='sm:inline-flex w-full text-left py-28'>
                                    <img className='pr-20 pb-20 sm:pb-0' src={course.card_image_url == "/assets/defaults/default-product-card.png" ? 'assets/images/dashboard/course.png' : course.card_image_url} style={{ width: '248px', height: '150px' }} />

                                    <div>
                                        <strong className={classes.labelTitle} style={{color: '#4249F8'}}>${course.price} MXN</strong>
                                        <strong className={clsx(classes.whiteText, classes.blueBackground)}>Acceso ilimitado</strong>

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

                        <Typography className={clsx(classes.labelTitle, 'pt-20')}>
                            DATOS PERSONALES
                        </Typography>
                        <Typography className={classes.label}>
                            Por favor, llena los siguientes campos con tus datos
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
                                Confirma tu constraseña <span className={classes.required}>*</span>
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

                        {course &&
                            <div className='flex flex-wrap w-full flex-row py-12 poppins'>
                                <div className="w-1/2 text-right pr-20 pt-20"><strong>Total:</strong></div>
                                <div className="w-1/2 pt-20"><strong className={classes.labelTitle}>{' '}${course.price} MXN</strong></div>
                            </div>
                        }

                        <div className="flex flex-wrap flex-col w-full pt-40 justify-left align-center items-center mb-28">
                            <div className="flex flex-wrap flex-col w-full pt-40 justify-left sm:w-1 md:w-1/3">
                                <Typography className={classes.label}><span className={classes.required}>* </span>Campos obligatorios</Typography>
                                <Typography className={classes.label}>
                                    <Checkbox required></Checkbox>He leído y acepto los
                                    <a href={process.env.REACT_APP_BRANDING_PAGE + '/terminos-y-condiciones/'}
                                        target="_blank"
                                        underline='hover'
                                        style={{ backgroundColor: 'transparent', color: '#5667ff', border: 0 }}
                                        disableRipple> Términos y condiciones</a>
                                </Typography>
                                <Typography className={classes.label}>
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
                            disabled={!isFormValid || !course}
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

export default CursosMaestro;
