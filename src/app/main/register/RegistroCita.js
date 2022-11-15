import axios from 'axios';
import Formsy from 'formsy-react';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { showMessage } from "../../store/fuse/messageSlice";
import logo from './global-chooling-images/logo-global.png';
import banner from './global-chooling-images/banner-form-gs.png';
import { SelectFormsy, TextFieldFormsy } from '@fuse/core/formsy';
import { openTokenDialog, closeTokenDialog } from '../apps/eventsCalendar/store/tokenSlice';
import { Button, Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, useMediaQuery } from '@material-ui/core';
import { submitAppointment } from '../apps/eventsCalendar/store/eventsSlice';


const useStyles = makeStyles(theme => ({
    textField: {        
        width: '90%',
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
    textArea: {        
        width: '90%',
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
    checkbox: {
        '& .MuiTypography-root': {
            fontFamily: 'Poppins'
        }
    },
    /*nuevos estilos */
    invitado: {
		width: '300px',
		borderRadius: '15px',
		height: '41px',
		background:  '#162661',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Poppins',
		textAlign: 'center',
		marginBottom: '25px',
	},
	invitado1: {
		width: '300px',
		height: 'auto',
		borderBottomRightRadius: '18px',
		background: '#ffffff',
		WebkitBoxShadow: '-10px 12px 0px 2px  #162661',
		boxShadow: '-10px 12px 0px 2px  #162661',
		border: '5px solid  #162661',
		borderRadius: '15px',
		zIndex: '3',
		textAlign: 'center',
		marginBottom: '50px',
	},
	btnCita: {
		fontFamily: 'Poppins',
		fontStyle: 'normal', 
		fontWeight: '700', 
		fontSize: '16px', 
		lineHeight: '24px', 
		color: '#FFFFFF', 
		width: '225px', 
		height: '40px', 
		background: 'linear-gradient(180deg, #00ABC3 0%, #0068B4 100%)', 
		borderRadius: '26px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
        '&:hover': {
            background: 'linear-gradient(180deg, #028091 0%, #035794 100%)',
        },
	}
}));
 
var dataInsert = {
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: '',
    grades: '',
    education_program: '',
    additional_information: '',
    requires_sep: '',
    start_date: '',
    date: '',
    hour: '',
    status: 'En proceso',
}

function RegistroCita(props) {
    const classes = useStyles();    
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState(0);
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(min-width:900px)', { noSsr: true });  // Responsive

    // Hooks for checkbox    
    const [checkOne, setCheckOne] = useState([]);
    const [checkTwo, setCheckTwo] = useState([]);    
    const [elements, setElements] = useState([]);
    const [elements2, setElements2] = useState([]);
    const [elements3, setElements3] = useState([]);
    const [terminos, setTerminos] = useState([]);
    // Hooks validate form
    const [bandera, setBandera] = useState(false);    
    const [bandera2, setBandera2] = useState(false);    
    const [newchangeHour, setNewChangeHour] = useState(0);

    // Events information

    const [dis1, setDis1] = useState(false);
    const [dis2, setDis2] = useState(false);
    const [dis3, setDis3] = useState(false);
    const [dis4, setDis4] = useState(false);

    // Appointment validation (date and hour)
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"];
    var step1 = new Date();
    var mon = step1.getUTCFullYear() + '-' + (Number.parseInt(step1.getMonth()) > 9 ? (step1.getMonth() + 1) : "0" + (step1.getMonth() + 1)) + '-' + (Number.parseInt(step1.getDate()) > 9 ? (step1.getDate()) : "0" + (step1.getDate()));
    var tue = step1.getUTCFullYear() + '-' + (Number.parseInt(step1.getMonth()) > 9 ? (step1.getMonth() + 1) : "0" + (step1.getMonth() + 1)) + '-' + (Number.parseInt(step1.getDate() + 1) > 9 ? (step1.getDate() + 1) : "0" + (step1.getDate() + 1));
    var wed = step1.getUTCFullYear() + '-' + (Number.parseInt(step1.getMonth()) > 9 ? (step1.getMonth() + 1) : "0" + (step1.getMonth() + 1)) + '-' + (Number.parseInt(step1.getDate() + 2) > 9 ? (step1.getDate() + 2) : "0" + (step1.getDate() + 2));
    var thu = step1.getUTCFullYear() + '-' + (Number.parseInt(step1.getMonth()) > 9 ? (step1.getMonth() + 1) : "0" + (step1.getMonth() + 1)) + '-' + (Number.parseInt(step1.getDate() + 3) > 9 ? (step1.getDate() + 3) : "0" + (step1.getDate() + 3));        
    var lunes = new Date(mon);
    var martes = new Date(tue);
    var miercoles = new Date(wed);
    var jueves = new Date(thu);
    var diaActual = dias[(lunes.getDay())];


    useEffect(() => {
        switch(diaActual){        
            case "Martes": 
                setDis1(true);
                setNewChangeHour(1);
                break;
            case "Miércoles": 
                setDis1(true);
                setDis2(true);
                setNewChangeHour(2);
                break;
            case "Jueves": 
                setDis1(true);
                setDis2(true);
                setDis3(true);
                setNewChangeHour(3);
                break;
            case "Viernes": 
                setDis1(true);
                setDis2(true);
                setDis3(true);
                setDis4(true);
                setNewChangeHour(4);
                break;
            case "Lunes":
                setDis1(false);
                setDis2(false);
                setDis3(false);
                setDis4(false);
                setNewChangeHour(0);
                break;
        }
    }, []);

    const a1 = [ mon + "T09:30", mon + "T10:30", mon + "T11:30", mon + "T12:30", mon + "T15:30", tue + "T10:30", tue + "T11:30", tue + "T12:30", tue + "T18:00", wed + "T09:30", wed + "T10:30", wed + "T11:30", wed + "T12:30", wed + "T15:30", thu + "T10:30", thu + "T11:30", thu + "T12:30", thu + "T18:00"];

    useEffect(()=> {
        dispatch(openTokenDialog());
        setElements(document.querySelectorAll('#checked'));        
        setElements2(document.querySelectorAll('#checked2'));        
        setElements3(document.querySelectorAll('#checked3'));  
        setTerminos(document.querySelectorAll('#habilitar'));        
        window.addEventListener('scroll', listenScroll, true);     
        axios.post(process.env.REACT_APP_API + '/refreshTokenAppointment').then(data => {
            // console.log(data);
        }); 
        axios.get(process.env.REACT_APP_API + '/getListEvents').then(data => {            
            console.log(data);
            if(data){
                for (var i = 0; i < 4; i++) {                    
                    for (var j = 0; j < data.data.length; j++) {                        
                        if (a1[i] === data.data[j].start.dateTime.slice(0, 16)){
                            console.log("Lunes: " + a1[i]);
                        }
                    }
                }                
                for (var b = 5; b < 8; b++) {                    
                    for (var j = 0; j < data.data.length; j++) {
                        if (a1[b] === data.data[j].start.dateTime.slice(0, 16)){
                            console.log("Martes: " + a1[b]);
                        }
                    }
                }                
                for (var c = 9; c < 13; c++) {                    
                    for (var j = 0; j < data.data.length; j++) {
                        if (a1[c] === data.data[j].start.dateTime.slice(0, 16)){
                            console.log("Miercoles: " + a1[c]);
                        }
                    }
                }                
                for (var d = 14; d < 17; d++) {                    
                    for (var j = 0; j < data.data.length; j++) {
                        console.log(data.data[j].start.dateTime.slice(0,16));
                        if (a1[d] === data.data[j].start.dateTime.slice(0, 16)){
                            console.log("Jueves: " + a1[d]);
                        }
                    }
                }                
            }
        });
    }, []);
    

    // Logo animation
    const listenScroll = (e) => {     
        setScroll(e.target.scrollTop);
    } 
    
    
    useEffect(()=> {        
        // grades
        for(let i=0; i<elements.length; i++){
            elements[i].addEventListener('click', function(e) {                
                var position = checkOne.findIndex(item => item.grade === e.target.value);
                if(e.target.checked === true){                                        
                    checkOne.push({ id: i, grade: e.target.value }); 
                    console.log(checkOne);                                       
                }else{
                    checkOne.splice(position, 1);   
                    console.log(checkOne);                 
                }  
                dataInsert.grades = JSON.stringify(checkOne);                 
            }, true);
        }                            
    }, [elements]);
    
    // education program
    useEffect(() => {
        for(let i=0; i<elements2.length; i++){
            elements2[i].addEventListener('click', function(e) {                
                var position = checkTwo.findIndex(item => item.program === e.target.value);
                if(e.target.checked === true){                                        
                    checkTwo.push({ id: i, program: e.target.value });
                    console.log(checkTwo);                                        
                }else{
                    checkTwo.splice(position, 1);
                    console.log(checkTwo);                    
                }  
                dataInsert.education_program = JSON.stringify(checkTwo);                 
            }, true);
        }
    }, [elements2]);
    
    // SEP is required
    useEffect(() => {        
        for(let i=0; i<elements3.length; i++){
            elements3[i].addEventListener('click', function(e) {                                
                if(e.target.checked === true){                    
                    dataInsert.requires_sep = e.target.value;
                }
            }, true);
        }    
    }, [elements3]);
    
    var number = 0;
    useEffect(() => {
        for(let i=0; i<terminos.length; i++){
            terminos[i].addEventListener('click', function() {
                if(terminos[i].checked) {
                    number++;
                }else{
                    number--;
                }
                if(number === 2) {
                    setBandera2(true);
                }else{
                    setBandera2(false);
                }
            });
        }
    }, [terminos]);
    
    // Open menu when is responsive
    const handleClick = () => {
        setOpen(!open);
    }    

    // Save all information
    const handleSubmit = () => {
        if(dataInsert.name === '' || dataInsert.last_name === '' || dataInsert.email === '' || dataInsert.phone_number === '' || dataInsert.city === '' || dataInsert.grades === '' || dataInsert.education_program === '' || dataInsert.requires_sep === '' || dataInsert.start_date === '' || dataInsert.date === '' || dataInsert.hour === '' || dataInsert.education_program === "[]" || dataInsert.grades === "[]"){
            dispatch(showMessage({ message: 'Completa los campos obligatorios', variant: 'error' }));
        }else{
            axios.post(process.env.REACT_APP_API + '/insertDataAppointment', dataInsert).then(data => {
                dispatch(showMessage({ message: 'Su información fue enviada con éxito', variant: 'success' }));
                if(data){
                    axios.post(process.env.REACT_APP_API+'/appointmentEmail', { url: data.data.data.hangoutLink, name: dataInsert.name, date: dataInsert.date, hour: dataInsert.hour}).then(newdata => {
                        if(newdata){
                            console.log(newdata.data.data.hangoutLink);
                            window.location.reload();
                        }
                    })
                }
            });
        }
    }

    function disableButton() {        
        setBandera(false);      
    }
    
    function enableButton() {
        setBandera(true);           
    }

    const changeHour = (e, day) => {
        setNewChangeHour(e);
        dataInsert.date = day;
    }

    const changeTime = (e) => {
        dataInsert.hour = e;
    }

    return (
        <>			
            {
            matches ? (

                <div className="nav-gs" style={{display: 'flex'}}>
                    <div className='center-gs' style={{height: '100%', width: '40%'}}>
                        <a href='#' className='nav-link-gs'>Inicio</a>
                        <a href='#' className='nav-link-gs'>Quiénes somos</a>
                        <a href='#' className='nav-link-gs'>Precios</a>
                        <a href='#' className='nav-link-gs'>Preguntas frecuentes</a>
                    </div>
                    <div className='center-gs' style={{height: '100%', width: '20%'}}>
                        <img className={scroll > 0 ? 'nav-logo-gs-min' : 'nav-logo-gs-max'} src={logo}/>
                    </div>
                    <div className='center-gs' style={{height: '100%', width: '40%'}}>
                        <button className='nav-button-gs'>Programar cita</button>
                        <a href='#' className='nav-link-gs'>Acceso a comunidad</a>
                    </div>
                </div>
            ) :
            (
                <div className="nav-gs" style={{display: 'flex'}}>
                    <div className='center-gs' style={{height: '100%', width: '40%'}}>
                        <img className={'nav-logo-gs-min'} src={logo}/>
                    </div>
                    <div className='center-gs' style={{height: '100%', width: '60%', left: '25%', position: 'relative'}}>
                        <div className='border-button-gs'>
                            <button className='nav-button-gs center-gs' onClick={handleClick}>
                                <svg class="ast-mobile-svg ast-menu2-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28"><path d="M24 21v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 13v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 5v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1z"></path></svg>  
                            </button>                    
                        </div>
                        <div className={open ? 'nav-menu-gs-on' :  'nav-menu-gs-off'}>
                            <div style={{position: 'relative', left: '0', width: '100%', display: 'flex', justifyContent: 'right', padding: '4%'}}>
                                <button className='exit-gs-menu center-gs' onClick={(e) => setOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <hr className='hr-gs'/>
                            <a href='#' className='nav-link-gs'>Inicio</a>
                            <hr className='hr-gs'/>
                            <a href='#' className='nav-link-gs'>Quiénes somos</a>
                            <hr className='hr-gs'/>
                            <a href='#' className='nav-link-gs'>Precios</a>
                            <hr className='hr-gs'/>
                            <a href='#' className='nav-link-gs'>Preguntas frecuentes</a>
                            <hr className='hr-gs'/>
                            <button className='button-cita-gs'>Programar cita</button>
                        </div>
                    </div>
                </div>
            )
        } 
            <div className='banner-gs center-gs' style={{backgroundImage: `url(${banner})`}}>
                <div id="prueba" className={ matches ? 'banner-title-gs center-gs' : 'banner-title-gs bottom-gs'}>Programa tu cita</div>
            </div>
            <div style={{marginLeft: '15%', marginRight: '15%'}}>
                <Formsy     
                    onSubmit={handleSubmit}                                
                    onValid={enableButton}
                    onInvalid={disableButton}                                        
                >
                    <div className={matches ? 'subtitle-gs center-gs' : 'subtitle-gs center-gs top-gs'} style={{marginTop: '10%'}}>¡Bienvenido a Global Schooling!</div>
                    <div className='subtitle-min-gs'>DATOS PERSONALES</div>                
                    <div className='text-gs'>Por favor, llena los siguientes campos con tus datos (padre o tutor)</div>                
                    <div style={{marginTop: '2%'}}>
                        <div className='flex flex-wrap flex-row w-full' style={{marginBottom: '2%'}}>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Nombre(s)<strong className='strong-gs'>*</strong></div>
                                <TextFieldFormsy className={classes.textField} name="nombre" onChange={(e) => dataInsert.name = e.target.value} required
                                    validations={{
                                        maxLength: 150,
                                    }}
                                    validationErrors={{                                        
                                        maxLength: 'El máximo de caracteres permitidos es 150'
                                    }}
                                ></TextFieldFormsy>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Apellido(s)<strong className='strong-gs'>*</strong></div>
                                <TextFieldFormsy className={classes.textField} name="apellido" onChange={(e) => dataInsert.last_name = e.target.value} required
                                    validations={{
                                        maxLength: 150,
                                    }}
                                    validationErrors={{                                        
                                        maxLength: 'El máximo de caracteres permitidos es 150'
                                    }}
                                ></TextFieldFormsy>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Correo<strong className='strong-gs'>*</strong></div>
                                <TextFieldFormsy className={classes.textField} name="correo"
                                    validations={{
                                        isEmail: 'isEmail'
                                    }}
                                    validationErrors={{
                                        isEmail: 'no es un correco electronico'
                                    }}
                                    onChange={(e) => dataInsert.email = e.target.value}
                                    required
                                ></TextFieldFormsy>
                            </div>
                        </div>
                        <div className='flex flex-wrap flex-row w-full pb-20'>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Teléfono<strong className='strong-gs'>*</strong></div>
                                <TextFieldFormsy className={classes.textField} name="telefono"
                                    validations={{
                                        isNumeric: true,
                                        maxLength: 10
                                    }}
                                    validationErrors={{
                                        isNumeric: 'No es un numero',
                                        maxLength: 'El máximo de caracteres permitidos es 10'
                                    }}
                                    onChange={(e) => dataInsert.phone_number = e.target.value}
                                    required
                                ></TextFieldFormsy>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Ciudad de residencia<strong className='strong-gs'>*</strong> (en México)</div>
                                <TextFieldFormsy className={classes.textField} name="residencia" onChange={(e) => dataInsert.city = e.target.value} required
                                    validations={{
                                        maxLength: 150,
                                    }}
                                    validationErrors={{                                        
                                        maxLength: 'El máximo de caracteres permitidos es 150'
                                    }}
                                ></TextFieldFormsy>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>                                
                            </div>
                        </div>
                    </div>
                    <div className='subtitle-min-gs'>DATOS DEL ALUMNO/A (OS/AS)</div>
                    <div className='text-light-gs' style={{marginBottom: '3%', marginTop: '1%'}}>Por favor, llena los siguientes campos con los datos de tus hijos/as</div>
                    <div className='text-gs' style={{marginTop: '1%'}}>Selecciona los grados escolares de tu interés (a inscribir) <strong className='strong-gs'>*</strong></div>
                    <div style={{marginBottom: '4%', width: '100%'}} className="grid-gs">
                        <FormControlLabel className={classes.checkbox} label="1° de primaria" control={<Checkbox id="checked" value="1° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="2° de primaria" control={<Checkbox id="checked" value="2° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="3° de primaria" control={<Checkbox id="checked" value="3° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="4° de primaria" control={<Checkbox id="checked" value="4° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="5° de primaria" control={<Checkbox id="checked" value="5° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="6° de primaria" control={<Checkbox id="checked" value="6° de primaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="1° de secundaria" control={<Checkbox id="checked" value="1° de secundaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="2° de secundaria" control={<Checkbox id="checked" value="2° de secundaria" />}/>
                        <FormControlLabel className={classes.checkbox} label="3° de secundaria" control={<Checkbox id="checked" value="3° de secundaria" />}/>
                    </div>
                    <div className='text-gs' style={{marginTop: '1%'}}>¿Actualmente está inscrito a algún programa educativo? (Puedes seleccionar más de una opción) <strong className='strong-gs'>*</strong></div>
                    <div style={{marginBottom: '4%', width: '100%'}} className='grid-2-gs'>
                        <FormControlLabel className={classes.checkbox} label="Escuela pública" control={<Checkbox value="Escuela pública" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Escuela privada" control={<Checkbox value="Escuela privada" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Escuela presencial" control={<Checkbox value="Escuela presencial" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Escuela en línea" control={<Checkbox value="Escuela en línea"/>} id="checked2"/>
                        <FormControlLabel className={classes.checkbox} label="Homeschool" control={<Checkbox value="Homeschool" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Sin escuela" control={<Checkbox value="Sin escuela" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Programa americano" control={<Checkbox value="Programa americano" id="checked2"/>}/>
                        <FormControlLabel className={classes.checkbox} label="Otra plataforma de contenido sin clases" control={<Checkbox value="Otra plataforma de contenido sin clases" id="checked2"/>}/>                        
                    </div>
                    <div className='text-gs' style={{marginTop: '2%'}}>Información adicional</div>
                    <div style={{width: '100%'}}>
                        <textarea className='textarea-gs' onChange={(e) => dataInsert.additional_information = e.target.value} maxLength='500'></textarea>
                    </div>
                    <div style={{marginTop: '2%'}}>
                        <div className='flex flex-wrap flex-row w-full' style={{marginBottom: '2%', marginTop: '4%'}}>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>¿Requiere acreditación SEP?<strong className='strong-gs'>*</strong></div>
                                <div>
                                    <RadioGroup>
                                        <div className='flex'>
                                            <FormControlLabel value={1} className={classes.checkbox} label="Si" control={<Radio value="Si" id="checked3"/>} />
                                            <FormControlLabel value={2} className={classes.checkbox} label="No" control={<Radio value="No" id="checked3"/>} />
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Fecha de inicio<strong className='strong-gs'>*</strong></div>
                                <SelectFormsy value="Elige una opción" className={classes.textField} name="fecha_de_inicio" onChange={(e) => dataInsert.start_date = e.target.value}>
                                    <MenuItem style={{fontFamily: 'Poppins'}} value="Elige una opción">Elige una opción</MenuItem>
                                    <MenuItem style={{fontFamily: 'Poppins'}} value="Inmediato (Ciclo actual)">Inmediato (Ciclo actual)</MenuItem>
                                    <MenuItem style={{fontFamily: 'Poppins'}} value="Siguiente ciclo escolar">Siguiente ciclo escolar</MenuItem>
                                </SelectFormsy>
                            </div>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                
                            </div>
                        </div>
                        <div className='subtitle-min-gs' style={{marginTop: '4%', marginBottom: '1%'}}>AGENDAR CITA</div>
                        <div className='flex flex-wrap flex-row w-full pb-20'>
                            <div className='w-full sm:w-1 md:w-1/3'>
                                <div className='text-gs'>Fecha<strong className='strong-gs'>*</strong></div>
                                <SelectFormsy value="Elige una opción" className={classes.textField} name="fecha">
                                    <MenuItem style={{fontFamily: 'Poppins'}} value="Elige una opción">{ dis4 === true ? "No hay citas disponibles" : "Elige una opción" }</MenuItem>
                                    <MenuItem disabled={dis1} style={{fontFamily: 'Poppins'}} id="Monday" onClick={(e) => changeHour(0, "Monday")} value="Monday">Lunes</MenuItem>
                                    <MenuItem disabled={dis2} style={{fontFamily: 'Poppins'}} id="Tuesday" onClick={(e) => changeHour(1, "Tuesday")} value="Tuesday">Martes</MenuItem>
                                    <MenuItem disabled={dis3} style={{fontFamily: 'Poppins'}} id="Wednesday" onClick={(e) => changeHour(2, "Wednesday")} value="Wednesday">Miércoles</MenuItem>
                                    <MenuItem disabled={dis4} style={{fontFamily: 'Poppins'}} id="Thursday" onClick={(e) => changeHour(3, "Thursday")} value="Thursday">Jueves</MenuItem>
                                </SelectFormsy>
                            </div>
                            {
                                newchangeHour === 0 ? (
                                    <div className='w-full sm:w-1 md:w-1/3'>
                                        <div className='text-gs'>Hora<strong className='strong-gs'>*</strong></div>
                                        <SelectFormsy value="Elige una opción" className={classes.textField} name="hora">
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="Elige una opción">Elige una opción</MenuItem>
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="09:30:00" onClick={(e) => changeTime("09:30:00")}>9:30</MenuItem>
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="10:30:00" onClick={(e) => changeTime("10:30:00")}>10:30</MenuItem>
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="11:30:00" onClick={(e) => changeTime("11:30:00")}>11:30</MenuItem>
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="12:30:00" onClick={(e) => changeTime("12:30:00")}>12:30</MenuItem>
                                            <MenuItem style={{fontFamily: 'Poppins'}} value="01:30:00" onClick={(e) => changeTime("15:30:00")}>15:30</MenuItem>
                                        </SelectFormsy>
                                    </div>
                                ): null
                            }
                            {
                                newchangeHour === 1 ? (
                                    <div className='w-full sm:w-1 md:w-1/3'>
                                        <div className='text-gs'>Hora<strong className='strong-gs'>*</strong></div>
                                        <SelectFormsy value="Elige una opción" className={classes.textField} name="hora">
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="Elige una opción">Elige una opción</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="10:30:00" onClick={(e) => changeTime("10:30:00")}>10:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="11:30:00" onClick={(e) => changeTime("11:30:00")}>11:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="12:30:00" onClick={(e) => changeTime("12:30:00")}>12:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="06:00:00" onClick={(e) => changeTime("18:00:00")}>18:00</MenuItem>
                                        </SelectFormsy>
                                    </div>
                                ) : null
                            }
                            {
                                newchangeHour === 2 ? (
                                    <div className='w-full sm:w-1 md:w-1/3'>
                                        <div className='text-gs'>Hora<strong className='strong-gs'>*</strong></div>
                                        <SelectFormsy value="Elige una opción" className={classes.textField} name="hora">
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="Elige una opción">Elige una opción</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="09:30:00" onClick={(e) => changeTime("09:30:00")}>9:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="10:30:00" onClick={(e) => changeTime("10:30:00")}>10:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="11:30:00" onClick={(e) => changeTime("11:30:00")}>11:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="12:30:00" onClick={(e) => changeTime("12:30:00")}>12:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="01:30:00" onClick={(e) => changeTime("13:30:00")}>15:30</MenuItem>
                                        </SelectFormsy>
                                    </div>
                                ) : null
                            }
                            {
                                newchangeHour === 3 ? (
                                    <div className='w-full sm:w-1 md:w-1/3'>
                                        <div className='text-gs'>Hora<strong className='strong-gs'>*</strong></div>
                                        <SelectFormsy value="Elige una opción" className={classes.textField} name="hora">
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="Elige una opción">Elige una opción</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="10:30:00" onClick={(e) => changeTime("10:30:00")}>10:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="11:30:00" onClick={(e) => changeTime("11:30:00")}>11:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="12:30:00" onClick={(e) => changeTime("12:30:00")}>12:30</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Poppins' }} value="06:00:00" onClick={(e) => changeTime("18:00:00")}>18:00</MenuItem>
                                        </SelectFormsy>
                                    </div>
                                ) : null
                            }                            
                            {
                                newchangeHour === 4 ? (
                                    <div className='w-full sm:w-1 md:w-1/3'>
                                        
                                    </div>
                                ) : null
                            }                            
                            <div className='w-full sm:w-1 md:w-1/3'>                                
                            </div>
                        </div>
                    </div>
                    {
                        matches ? (
                            <div className='center-gs'>
                                <div style={{width: '340px', margin: '10%'}}>
                                    <div className='terms-gs' style={{marginLeft: '5%'}}>
                                        <strong className='strong-bottom-gs'>*</strong>Campos obligatorios
                                    </div>
                                    <div className='flex terms-gs' style={{alignItems: 'center'}}>
                                        <Checkbox id='habilitar' />
                                        <div style={{marginRight: '5px'}}>He leído y acepto los</div>                                
                                        <a href="https://dev.clublia.com/terminos-y-condiciones/" style={{textDecoration: 'none'}}><strong>Términos y condiciones</strong></a>
                                    </div>
                                    <div className='flex terms-gs' style={{alignItems: 'center'}}>
                                        <Checkbox id='habilitar' />
                                        <div style={{marginRight: '5px'}}>He leído y acepto el</div>                                
                                        <a href="https://dev.clublia.com/politicas-de-privacidad/" style={{textDecoration: 'none'}}><strong>Aviso de privacidad</strong></a>
                                    </div>
                                    <div className='center-gs' style={{marginTop: '10%'}}>
                                        <Button type='submit' className='btn-submit-gs' disabled={bandera && bandera2 ? false : true}>Continuar</Button>
                                        {/* <Button className='btn-submit-gs' onClick={(e) => handleSubmit()}>Continuar</Button> */}
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div className='flex flex-wrap flex-col justify-left' style={{position: 'relative', right: '65px', marginBottom: '100px', marginTop: '50px'}}>
                                <div style={{width: '340px', margin: '10%'}}>
                                    <div className='terms-gs' style={{marginLeft: '5%'}}>
                                        <strong className='strong-bottom-gs'>*</strong>Campos obligatorios
                                    </div>
                                    <div className='flex terms-gs' style={{alignItems: 'center'}}>
                                        <Checkbox id='habilitar'/>
                                        <div style={{marginRight: '5px'}}>He leído y acepto los</div>                                
                                        <a href="https://dev.clublia.com/terminos-y-condiciones/" style={{textDecoration: 'none'}}><strong>Términos y condiciones</strong></a>
                                    </div>
                                    <div className='flex terms-gs' style={{alignItems: 'center'}}>
                                        <Checkbox id='habilitar'/>
                                        <div style={{marginRight: '5px'}}>He leído y acepto el</div>                                
                                        <a href="https://dev.clublia.com/politicas-de-privacidad/" style={{textDecoration: 'none'}}><strong sytle={{color: '#38c5db'}}>Aviso de privacidad</strong></a>
                                    </div>
                                    <div className='center-gs' style={{marginTop: '10%'}}>
                                        {/* <Button className='btn-submit-gs' onClick={(e) => handleSubmit()}>Continuar</Button> */}
                                        <Button type='submit' className='btn-submit-gs' disabled={bandera && bandera2 ? false : true}>Continuar</Button>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </Formsy>
            </div>
            <div className={matches ? 'footer-gs' : 'footer-gs p-28'}>
                <div style={{marginTop: '4%'}}>
                    <div className='center-gs'>
                        <div className='center-gs' style={{marginRight: '1%'}}>
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2949 26.9996C13.767 26.9996 13.2406 26.9996 12.7126 26.9996C12.6266 26.9845 12.5422 26.9649 12.4562 26.9528C11.9599 26.8864 11.4607 26.8472 10.9704 26.7537C8.02006 26.1835 5.5252 24.7835 3.50397 22.5629C1.7467 20.632 0.644078 18.3722 0.206648 15.7941C0.12067 15.2947 0.0678771 14.7894 0 14.287C0 13.759 0 13.2326 0 12.7046C0.0165922 12.611 0.0346927 12.519 0.0482682 12.4255C0.113128 11.9382 0.152346 11.4464 0.245866 10.9652C0.803966 8.08087 2.13737 5.60685 4.30793 3.62763C7.64749 0.578857 11.5828 -0.545012 16.0296 0.243959C18.9603 0.764408 21.4507 2.16434 23.4432 4.37286C26.2518 7.4865 27.4103 11.1583 26.8718 15.3174C26.4555 18.5366 25.0044 21.2565 22.6136 23.456C20.6769 25.2376 18.4022 26.3509 15.8048 26.7944C15.304 26.8774 14.7987 26.9317 14.2949 26.9996ZM6.39855 9.60752C6.3729 10.6846 6.64291 11.371 6.93402 12.0499C7.67313 13.7771 8.75313 15.2721 10.0715 16.5981C11.8076 18.342 13.7851 19.7027 16.1759 20.3967C17.0749 20.6576 17.9437 20.5792 18.7899 20.1779C19.4174 19.8807 19.8714 19.3754 20.3511 18.9002C20.7055 18.5487 20.7055 18.2575 20.3541 17.903C19.5742 17.1171 18.7914 16.3341 18.007 15.5527C17.6586 15.2057 17.3569 15.2088 17.0085 15.5587C16.5801 15.9887 16.1593 16.4247 15.7309 16.8531C15.2211 17.3615 14.6056 17.4037 14.0174 16.9828C12.5045 15.9012 11.1922 14.6159 10.0805 13.1239C9.61592 12.5009 9.65514 11.905 10.2012 11.3529C10.6401 10.9094 11.0851 10.4719 11.524 10.0284C11.8544 9.69351 11.8589 9.39632 11.5316 9.06595C10.7397 8.26793 9.94324 7.47292 9.14531 6.68094C8.82553 6.36263 8.52687 6.36414 8.20257 6.6749C7.9552 6.91174 7.71536 7.15613 7.47553 7.40202C6.7862 8.10048 6.41816 8.94074 6.39855 9.60752Z" fill="white" />
                            </svg>
                        </div>
                        <div className='text-footer-gs'>55 7031 7876</div>
                    </div>
                </div>
                <div className='center-gs' style={{marginTop: '3%'}}>
                    <a className='text-footer-gs' style={{textDecoration: 'none', marginLeft: '2%', marginRight: '2%'}} href="https://dev.clublia.com/blog/">Blog</a>
                    <a className='text-footer-gs' style={{textDecoration: 'none', marginLeft: '2%', marginRight: '2%'}} href="https://test.clublia.com/">Comunidad</a>                    
                    <a className='text-footer-gs' style={{textDecoration: 'none', marginLeft: '2%', marginRight: '2%'}} href="https://clublia.com/">Club LIA</a>
                </div>
                <div className='center-gs' style={{marginTop: '2%'}}>
                    <div style={{margin: '1%'}} id="icon-gs" onClick={() => window.location.href = 'https://www.facebook.com/ClubLIA/'}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.8333 0C19.6458 0 20.4479 0 21.25 0C21.3542 0.0208333 21.4479 0.0520833 21.5521 0.0625C24.5521 0.291667 27.3854 1.125 29.9688 2.66667C35.2917 5.82292 38.5521 10.4375 39.6979 16.5208C39.8333 17.25 39.9062 17.9792 40 18.7083C40 19.5104 40 20.3229 40 21.125C39.8958 21.8854 39.8229 22.6458 39.6875 23.3958C38.8021 28.2813 36.4792 32.375 32.5833 35.4375C26.875 39.9375 20.4375 41.1771 13.5521 38.8021C6.23958 36.2813 1.875 31.0104 0.3125 23.4375C0.166667 22.7083 0.104167 21.9479 0 21.2083C0 20.375 0 19.5417 0 18.7083C0.104167 17.9792 0.177083 17.2396 0.302083 16.5208C1.69792 8.4375 8.04167 1.94792 16.0938 0.395833C17 0.21875 17.9167 0.125 18.8333 0ZM21.9583 17C21.9583 16.1875 21.9479 15.4375 21.9583 14.6875C21.9688 13.9271 22.2812 13.5938 23.0417 13.5625C23.7396 13.5312 24.4479 13.5208 25.1458 13.5208C25.5 13.5208 25.6875 13.3646 25.6875 13.0104C25.6875 12.0104 25.6875 11.0104 25.6771 10.0104C25.6771 9.64583 25.4896 9.45833 25.1146 9.45833C24.1562 9.45833 23.1875 9.42708 22.2292 9.47917C19.7292 9.61458 18.0312 11.0208 17.6146 13.3958C17.4375 14.4063 17.5208 15.4688 17.4896 16.5C17.4792 16.6667 17.4896 16.8229 17.4896 17.0104C16.5833 17.0104 15.7396 17.0104 14.8958 17.0104C14.5625 17.0104 14.3229 17.1354 14.3125 17.4896C14.3021 18.6042 14.3021 19.7292 14.3125 20.8438C14.3125 21.1563 14.5 21.3125 14.8125 21.3125C15.4375 21.3125 16.0625 21.3125 16.6875 21.3125C16.9479 21.3125 17.1979 21.3125 17.4896 21.3125C17.4896 21.5208 17.4896 21.6771 17.4896 21.8333C17.4896 24.4479 17.4896 27.0521 17.4896 29.6667C17.4896 30.3854 17.5729 30.4583 18.3021 30.4688C19.2292 30.4688 20.1458 30.4688 21.0729 30.4688C21.8438 30.4688 21.9271 30.375 21.9271 29.625C21.9271 27.0104 21.9271 24.4063 21.9271 21.7917C21.9271 21.6458 21.9375 21.4896 21.9479 21.3125C22.9688 21.3125 23.9375 21.3125 24.9167 21.3125C25.4479 21.3125 25.5521 21.2083 25.5521 20.6667C25.5521 19.6771 25.5521 18.6875 25.5521 17.7083C25.5521 17.1146 25.4479 17.0104 24.8438 17.0104C23.8958 16.9896 22.9479 17 21.9583 17Z" fill="white" />
                        </svg>
                    </div>
                    <div style={{margin: '1%'}} id="icon-gs" onClick={() => window.location.href = 'https://www.youtube.com/channel/UCFo-_bOfYcWtCZ0IAHm1QOA'}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="white" />
                            <path d="M7 21.5802C7 20.5214 7 19.4633 7 18.4044C7.01321 18.3244 7.03341 18.2444 7.03884 18.1636C7.14217 16.7877 7.23461 15.4104 7.34804 14.0353C7.44592 12.8475 8.54286 11.7311 9.71282 11.6084C10.7569 11.4988 11.8003 11.3901 12.8451 11.2945C15.1851 11.0801 17.5312 10.997 19.8804 11.0001C23.1246 11.004 26.3548 11.2277 29.5788 11.5889C30.8039 11.7265 31.9335 12.7729 32.0485 13.9677C32.1984 15.53 32.3212 17.0977 32.3825 18.6654C32.4781 21.1141 32.332 23.5573 32.0594 25.9928C31.9281 27.1682 30.835 28.2745 29.6759 28.3755C27.6095 28.5557 25.5446 28.7522 23.475 28.8835C20.6418 29.0622 17.8039 29.0249 14.9722 28.8424C13.2413 28.7305 11.5151 28.5386 9.78662 28.3817C8.58325 28.2721 7.46534 27.2016 7.35425 25.9983C7.2284 24.6411 7.14605 23.2792 7.0435 21.9197C7.03418 21.8063 7.01476 21.6936 7 21.5802ZM17.5902 24.2247C19.7235 22.803 21.8148 21.4093 23.938 19.9939C21.8102 18.5753 19.7157 17.1793 17.5902 15.7623C17.5902 18.6025 17.5902 21.3852 17.5902 24.2247Z" fill="#162661" />
                        </svg>
                    </div>
                </div>
                <div className='center-gs' style={{marginTop: '2%', paddingBottom: '4%'}}>
                    <a className='text-footer-gs' style={{textDecoration: 'none', color: 'white'}} href="https://dev.clublia.com/terminos-y-condiciones/">Términos y condiciones</a>
                    <p className='text-footer-gs' style={{color: 'white', marginLeft: '1%', marginRight: '1%'}}>|</p>
                    <a className='text-footer-gs' style={{textDecoration: 'none', color: 'white'}} href="https://dev.clublia.com/politicas-de-privacidad/">Políticas de privacidad</a>
                </div>
            </div>
        </>
    );
}

export default RegistroCita;