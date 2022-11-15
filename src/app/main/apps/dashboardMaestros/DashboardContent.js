import React, { useEffect, useState } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from './store/clasesSlice';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button, CircularProgress, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        width: "100%",
        height: "100px",
        background: "white"
    },
    footer: {
        width: "100%",
        height: "100px",
        background: "white"
    },
    divContent: {
        height: "220px",
        overflow: "auto"
    },
    divContentD: {
        height: "220px",
        overflow: "auto"
    },
    card: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
        margin: "5px 5px 25px 5px",
        borderRadius: '10px',
        fontFamily: "Poppins",
        fontStyle: "normal",
        color: '#353535',
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)"
    },
    divTop: {        
        width: "100%",        
        display: "flex",
        justifyContent: "end",
        alignContent: "end"
    },    
    grupo: {
        marginStart: "15px",
        width: "100px",
        borderRadius: "4px",
        background: "white",
        height: "25px"
    },
    tableDashboard: {
        textAlign: "center",        
        width: "100%"
    },    
    table: {
        padding: "25px",        
        textAlign: "center"
    },
    thead: {        
        color: "white",
        height: "30px"
    },
    th: {
        border: "solid white 4px",
        background: "#60CEFF"
    },
    thLeft: {
        border: "solid white 4px",
        background: "#60CEFF",
        borderTopLeftRadius: "13px",
        borderBottomLeftRadius: "13px",
        height: "30px"
    },
    thRight: {
        border: "solid white 4px",
        background: "#60CEFF",
        borderTopRightRadius: "13px",
        borderBottomRightRadius: "13px",
        height: "30px"
    },
    divDashboard: {
        width: "100%",
        display: "flex",
        justifyContent: "end"
    },
    btnDashboard: {
        height: "25px !important",
        marginTop: "10px",
        backgroundColor: "#5557BD", 
        color: "white"       
    },
    iconPlus: {
        marginStart: "5px"
    },
    select: {        
        width: "200px",
        borderRadius: "10px",
        background: "transparent",
        color: "#353535",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #60CEFF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        '&:before, &:after, &:focus': {
            border: 'solid transparent 0px',
            content: 'none'
        }
    },    
    inputLabel: {
        paddingLeft: "10px",
        fontFamily: 'Poppins',
        color: '#353535'
    },
    divSelect: {
        width: "30px"        
    },
    tableComunidad: {
        marginTop: "10px"
    },
    h1: {
        marginStart: "15px"        
    },
    screen: {
        width: "100%",
        height: "100%"
    },
    title: {
        color: "#00B1FF",
        marginTop: "15px",
        marginBottom: "15px",
        fontSize: "20px",
        // fontWeight: "bold",
        marginLeft: "4px",
        fontFamily: `'grobold', 'rager'`    
    },
    td: {
        height: "30px",
        border: "solid white 4px",
        background: "#F5F5F5"
    },
    tdB: {
        height: "30px",
        border: "solid white 4px",
        background: "white",
        width: '140px'
    },
    tdGroup: {
        height: "30px",
        border: "solid white 4px",
        background: "#F5F5F5",
        width: '140px'
    },
    tdBGroup: {
        height: "30px",
        border: "solid white 4px",
        background: "white"
    },
    divCursos: {        
        display: "flex",
        flexWrap: "wrap"
    },
    divImgCursos: {
        display: "flex",
        height: "100px"
    },
    divPadding: {
      padding: '30px'  
    },
    imgCursos: {
        height: "140px",
        width: "275px",
        backgroundSize: "cover",
        borderRadius: '5px'
    },
    divComunidad: {
        width: "100%",
        height: "120px",
        marginBottom: "5px",
        overflow: 'auto',
        marginTop: '25px'
        // border: "solid #00B1FF 4px"
    },
    divIconsComunidad: {
        width: "100%",
        height: "50px",
        marginBottom: "5px"
    },
    titleCourse: {
        paddingLeft: '10px',
        paddingTop: '5px',
        marginTop: "40px"
    },
    titleEvent: {
        paddingTop: '5px',
        marginTop: "40px"
    },
    tdLeftAll: {
        height: "30px",
        border: "solid white 4px",
        background: "#F5F5F5",
        textAlign: "start",
        paddingLeft: "10px",
        borderTopLeftRadius: '13px',
        borderBottomLeftRadius: '13px'
    },
    tdLeftAllB: {
        height: "30px",
        border: "solid white 4px",
        background: "white",
        textAlign: "start",
        paddingLeft: "10px",
        borderTopLeftRadius: '13px',
        borderBottomLeftRadius: '13px'
    },
    tdRight: {
        height: "30px",
        border: "solid white 4px",
        background: "#F5F5F5",
        borderTopRightRadius: '13px',
        borderBottomRightRadius: '13px'
    },
    tdRightB: {
        height: "30px",
        border: "solid white 4px",
        background: "white",
        borderTopRightRadius: '13px',
        borderBottomRightRadius: '13px'
    },
    divProgressBar: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center"
    },
    progressBar: {
        width: "75%",
        height: "8px",
        borderRadius: "15px",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
        marginBottom: '1px'
    },
    icon: {
        height: "39px",
        width: "39px"
    },
    h2div: {
        color: '353535',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '59%',
        margin: '6px',
        background: '#F5F5F5',
        borderRadius:'15px'
    },
    h3div: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '59%',
        // margin: '6px',
        background: '#F5F5F5',
        borderRadius:'15px'
    },
    mensajes: {
        marginBottom: "20px",
        marginStart: "10px"
    },
    iconComunidad: {
        height: "20px",
        marginBottom: "20px",
        width: "20px"
    },
    divCom: {
        display: "flex",
        marginStart: "15px"
    },
    divMensajes: {
        width: '100%',
        overflow: 'auto',
        height: '105px'
    },
    buttonModalR: {
        background: '#FF2F54' 
    },
    buttonModalG: {
        background: '#60CEFF'
    },
    loading: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        alignContent: 'center',
        width: "100%",
        height: "570px",
        padding: "20px",
        margin: "5px 5px 25px 5px",
        borderRadius: '10px',
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)"
    },
    button: {
        alignContent: "center",
        textAlign: "center",
        // width: "100%",
        borderRadius: "45px",
        background: "transparent",
        color: "#353535",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #00B1FF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        paddingLeft: '10px',
        paddingRight: '10px',
        textTransform: 'none',
        fontWeight: 'normal',
        '&:hover': {
            background: "#00B1FF1A",
        },
    },
}));

export default function DashboardContent(props) { 

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [last, setLast] = useState([]);
    const [top, setTop] = useState([]); 
    const [filter, setFilter] = useState([]);
    const [group, setGroup] = useState([]);
    const [cursos, setCurso] = useState([]);
    const [evento, setEvento] = useState([]);
    const [misCursos, setMisCursos] = useState([]);
    const [info, setInfo] = useState("");    
    const [infoStudent, setInfoStudent] = useState("");    
	const clases = useSelector(({ DashboardMaestrosApp }) => DashboardMaestrosApp.clases.data);
	const input = useSelector(({ fuse }) => fuse.input.texto);
	const [eventData, setEventData] = useState([]);
    const [dataTime, setDataTime] = useState([]);
	const today = new Date();
    const [comunidad, setComunidad] = useState([]);
    const [searchH, setSearchH] = useState([]);
    const [searchS, setSearchS] = useState([]);
    const [searchC, setSearchC] = useState([]);
    const [bandera, setBandera] = useState(false);
    const [loading, setLoading] = useState([]);
    const [notificaciones, setNotificaciones] = useState(0);
    const [solicitudes, setSolicitudes] = useState(0);
    const [loadingData, setLoadingData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [aux, setAux] = useState([]);
    var dataAux = [];
    const [arrayHour, setArrayHour] = useState([]);
    const [img, setImg] = useState([
        {img: 'assets/images/dashboard/campana.png'},
        {img: 'assets/images/dashboard/friends.png'},
        {img: 'assets/images/dashboard/course.png'},
        {img: 'assets/images/dashboard/share.png'}, 
        {img: 'assets/images/dashboard/likes.png'},
        {img: 'assets/images/dashboard/friends.png'},
        {img: 'assets/images/dashboard/house.png'}
    ]);

    const students = () => {
        setBandera(false); 
        axios.get(process.env.REACT_APP_API + '/dashboard/info').then(data => {  
            var cursos = data.data.data[1]["lia-u"][1]["courses "]; 
            var eventos = data.data.data[2].mundolia[2].eventos;           
            setNotificaciones(data.data.data[2].mundolia[0].notificaciones);
            setSolicitudes(data.data.data[2].mundolia[1].solicitudes);
            var arrayEventos = [];       
            var arrayCursos = [];     
            for(let i in cursos){
                arrayCursos.push(cursos[i]);
            }   
            for(let i=0; i < eventos.length; i++){
                var fechaEvento = new Date(eventos[i].start_time * 1000).toUTCString();
                var fecha = fechaEvento.slice(8, 11);
                var dia = fechaEvento.slice(0,3);
                var time = Number.parseInt(fechaEvento.slice(17, 19));
                var img = eventos[i].image_path;
                if(eventos){
                    switch(fecha){
                        case "Jan": var newMonth = "Enero";  break;
                        case "Feb": var newMonth = "Febrero";  break;
                        case "Mar": var newMonth = "Marzo";  break;
                        case "Apr": var newMonth = "Abril";  break;
                        case "May": var newMonth = "Mayo";  break;
                        case "Jun": var newMonth = "Junio";  break;
                        case "Jul": var newMonth = "Julio";  break;
                        case "Aug": var newMonth = "Agosto";  break;
                        case "Sep": var newMonth = "Septiembre";  break;
                        case "Oct": var newMonth = "Octubre";  break;
                        case "Nov": var newMonth = "Noviembre";  break;
                        case "Dec": var newMonth = "Diciembre";  break;
                    }      
                    switch(dia){
                        case "Sun": var newDay = "Lunes";  break;
                        case "Mon": var newDay = "Martes";  break;
                        case "Tue": var newDay = "Miercoles";  break;
                        case "Wed": var newDay = "Jueves";  break;
                        case "Thu": var newDay = "Viernes";  break;
                        case "Fri": var newDay = "Sabado";  break;
                        case "Sat": var newDay = "Domingo";  break;
                    }      
                }
                if(img){
                    var imgName = img.slice(0,40);
                    var imgEnd = img.slice(42, 46);
                    if(time >= 0 && time <= 11){
                        arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + 'PF.Base/file/pic/event/' + imgName + imgEnd, title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + time + ':' + fechaEvento.slice(20,23) + ' a. m.'});
                    }else{
                        arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + 'PF.Base/file/pic/event/' + imgName + imgEnd, title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + (time - 12) + ':' + fechaEvento.slice(20,23) + ' p. m.'});
                    }
                } else {
                    if(time >= 0 && time <= 11){
                        arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + "PF.Site/Apps/core-events/assets/image/no_image.png", title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + time + ':' + fechaEvento.slice(20,23) + ' a. m.'});
                    }else{
                        arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + "PF.Site/Apps/core-events/assets/image/no_image.png", title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + (time - 12) + ':' + fechaEvento.slice(20,23) + ' p. m.'});
                    }
                }                       
            } 
            var tareas = data.data.data[0].actividades.lastHomeworks;
            var students = data.data.data[0].actividades.topHomeworks;
            setMisCursos(data.data.data[1]["lia-u"][0]["enrollments"].items);   
            setComunidad(data.data.data[2].mundolia[3].group_feeds);      
            setSearchH(tareas);
            setSearchS(students);
            if(tareas.length > 5){
                var tareasLimit = tareas.slice(0,5);
                setLast(tareasLimit);
                setBandera(true);
            }else{
                setLast(tareas);
                setBandera(true);
            }  
            setTop(data.data.data[0].actividades); 
            setFilter(data.data.data[0].actividades.topHomeworks); 
            setEvento(arrayEventos);     
            setCurso(arrayCursos);
            setLoading(data.data.data);
        });
        axios.get(process.env.REACT_APP_API + '/grupos').then(data => {
            setGroup(data.data.data);
        });
    } 

    var clasesInfo = [];

    useEffect(()=> {
        var array = [];
        var arrayS = [];
        if(searchH.length > 0){
            searchH.filter((elemento)=> {
                if(elemento.name.toString().toLowerCase().includes(input.toLowerCase())){
                    array.push(elemento);
                }
            }); 
            searchS.filter((elemento)=> {
                if(elemento.name.toString().toLowerCase().includes(input.toLowerCase())){
                    arrayS.push(elemento);
                }
            });
            setFilter(arrayS);
            if(array.length > 4){
                setLast(array.slice(0,5));
            }else{
                setLast(array);
            }
        }
        if(searchC.length > 0){
            var arrayC = [];
            searchC.filter((elemento)=> {
                if(elemento.name.toString().toLowerCase().includes(input.toLowerCase())){
                    arrayC.push(elemento);
                }
            })
            setDataTime(arrayC);
        }
    }, [input])

    useEffect(() => {   
        setEventData([]);    
        if (clases != null && clases.length > 0) {
            dispatch(getEvents(events => {
                setEventData(eventData => [...eventData, ...events])
            }, process.env.REACT_APP_CALENDAR_KEY, clases));
        }  
        students();
    }, [clases, dispatch]);

    useEffect(() => { 
        setArrayHour([]);
        setDataTime([]);
        setSearchC([]);
        if (eventData != null && eventData.length > 0) {
            dataAux = eventData.filter( (i, index) => i.start > today && eventData.indexOf(i) === index ).sort( (a, b) => a.start > b.start ? 1 : -1 ).slice(0, 5);
        }
        for(let i = 0; i < dataAux.length; i++) {
            var infoDate = dataAux[i].start;
            if(infoDate){   
                var fechaSlice = infoDate.toString().slice(0, 15);
                var month = fechaSlice.slice(4, 7);    
                switch(month){
                    case "Jan": var newMonth = "Ene";  break;
                    case "Feb": var newMonth = "Feb";  break;
                    case "Mar": var newMonth = "Mar";  break;
                    case "Apr": var newMonth = "Abr";  break;
                    case "May": var newMonth = "Mayo";  break;
                    case "Jun": var newMonth = "Jun";  break;
                    case "Jul": var newMonth = "Jul";  break;
                    case "Aug": var newMonth = "Ago";  break;
                    case "Sep": var newMonth = "Sep";  break;
                    case "Oct": var newMonth = "Oct";  break;
                    case "Nov": var newMonth = "Nov";  break;
                    case "Dec": var newMonth = "Dic";  break;
                }                   
                var horaSlice = infoDate.toString().slice(16, 21);
                var horaPrueba = infoDate.toString().slice(18, 21)
                var horaInt = Number.parseInt(horaSlice.slice(0, 2));
            }
            if (horaInt >= 0 && horaInt <= 11) {
                clasesInfo.push({name: dataAux[i].title, group: dataAux[i].group, hour: horaInt + horaPrueba + ' a. m.', date: fechaSlice.slice(8, 10) + '/ ' + newMonth + ' /' + fechaSlice.slice(10, 15) });
            } else {
                clasesInfo.push({name: dataAux[i].title, group: dataAux[i].group, hour: (horaInt - 12) + horaPrueba + ' p. m.', date: fechaSlice.slice(8, 10) + '/ ' + newMonth + ' /' + fechaSlice.slice(10, 15) });
            }                   
        }
        setDataTime(clasesInfo);
        setSearchC(clasesInfo);
    }, [eventData]); 

    const studentsFilter = (id) => {                              
        if(id.target.value === 1){            
            setFilter(top.downHomeworks);          
        }else{
            setFilter(top.topHomeworks);
        }     
        setInfoStudent(id.target.value);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
    const groupsFilter = (id) => {
        setBandera(false);
        setInfo(id.target.value);
        var idS = id.target.value;        
        if(id.target.value === 1){
            students(id.target.value);    
        }else{
            if(idS){
                axios.get(process.env.REACT_APP_API + `/dashboard/info?idGroup=${idS}`).then(data => {            
                    var cursos = data.data.data[1]["lia-u"][1]["courses "]; 
                    var eventos = data.data.data[2].mundolia[2].eventos;           
                    var arrayEventos = [];       
                    var arrayCursos = [];  
                    setLoadingData(data.data.data);   
                    for(let i in cursos){
                        arrayCursos.push(cursos[i]);
                    }   
                    for(let i=0; i < eventos.length; i++){
                        var fechaEvento = new Date(eventos[i].start_time * 1000).toUTCString();
                        var fecha = fechaEvento.slice(8, 11);
                        var dia = fechaEvento.slice(0,3);
                        var time = Number.parseInt(fechaEvento.slice(17, 19));
                        var img = eventos[i].image_path;
                        if(eventos){
                            switch(fecha){
                                case "Jan": var newMonth = "Enero";  break;
                                case "Feb": var newMonth = "Febrero";  break;
                                case "Mar": var newMonth = "Marzo";  break;
                                case "Apr": var newMonth = "Abril";  break;
                                case "May": var newMonth = "Mayo";  break;
                                case "Jun": var newMonth = "Junio";  break;
                                case "Jul": var newMonth = "Julio";  break;
                                case "Aug": var newMonth = "Agosto";  break;
                                case "Sep": var newMonth = "Septiembre";  break;
                                case "Oct": var newMonth = "Octubre";  break;
                                case "Nov": var newMonth = "Noviembre";  break;
                                case "Dec": var newMonth = "Diciembre";  break;
                            }      
                            switch(dia){
                                case "Sun": var newDay = "Lunes";  break;
                                case "Mon": var newDay = "Martes";  break;
                                case "Tue": var newDay = "Miercoles";  break;
                                case "Wed": var newDay = "Jueves";  break;
                                case "Thu": var newDay = "Viernes";  break;
                                case "Fri": var newDay = "Sabado";  break;
                                case "Sat": var newDay = "Domingo";  break;
                            }      
                        }
                        if(img){
                            var imgName = img.slice(0,40);
                            var imgEnd = img.slice(42, 46);
                            if(time >= 0 && time <= 11){
                                arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + 'PF.Base/file/pic/event/' + imgName + imgEnd, title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + time + ':' + fechaEvento.slice(20,23) + ' a. m.'});
                            }else{
                                arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + 'PF.Base/file/pic/event/' + imgName + imgEnd, title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + (time - 12) + ':' + fechaEvento.slice(20,23) + ' p. m.'});
                            }
                        } else {
                            if(time >= 0 && time <= 11){
                                arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + "PF.Site/Apps/core-events/assets/image/no_image.png", title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + time + ':' + fechaEvento.slice(20,23) + ' a. m.'});
                            }else{
                                arrayEventos.push({ img: process.env.REACT_APP_API.slice(0, 30) + 'comunidad/' + "PF.Site/Apps/core-events/assets/image/no_image.png", title: eventos[i].title, date: newDay + ' ' + fechaEvento.slice(5,8) + newMonth + ' | ' + (time - 12) + ':' + fechaEvento.slice(20,23) + ' p. m.'});
                            }
                        }                        
                    }
                    var tareas = data.data.data[0].actividades.lastHomeworks;
                    var students = data.data.data[0].actividades.topHomeworks;
                    setMisCursos(data.data.data[1]["lia-u"][0]["enrollments"].items);   
                    setComunidad(data.data.data[2].mundolia[3].group_feeds);
                    setSearchH(tareas);
                    setSearchS(students);
                    if(tareas.length > 5){
                        var tareasLimit = tareas.slice(0,4);
                        setLast(tareasLimit);
                        setBandera(true);
                    }else{
                        setLast(tareas);
                        setBandera(true);                       
                    }     
                    setTop(data.data.data[0].actividades); 
                    setFilter(data.data.data[0].actividades.topHomeworks); 
                    setEvento(arrayEventos);     
                    setCurso(arrayCursos);
                });  
            }
        } 
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '4px solid #60CEFF',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px'
    };

    return (
        <div>    
            <FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >    

            {
                loading.length !== 0 ? (

                    <Card elevation={1} className={classes.card}>                                   
                        <div className={classes.divTop}>  
                        </div>        
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <h2 className={classes.title}>
                                Ultimas tareas asignadas
                            </h2> 
                            <div className={classes.divContent}>
                                <Table className="tables">
                                    <TableHead className="tablesHead">
                                        <TableRow>
                                            <TableCell className="tablesTh colorAndPadding">Tarea</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">Pendientes por revisar</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">No recibidas</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        bandera === true ?
                                            <>
                                                <TableBody>
                                                    {
                                                        last ? last.map((data, index) => (
                                                            <TableRow>
                                                                {
                                                                    data.name.length > 25 ? 
                                                                        <Tooltip title={data.name} placement={'top'}>
                                                                            <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{index + 1}. {data.name.slice(0, 25) + '...'}</TableCell>
                                                                        </Tooltip>
                                                                    :
                                                                    <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{index + 1}. {data.name}</TableCell>
                                                                }                                                        
                                                                <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.Entregado}</TableCell>
                                                                <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.NoEntregado}</TableCell>
                                                            </TableRow>
                                                        )) : null
                                                    }
                                                </TableBody>
                                            </>
                                            :
                                        null
                                    }
                                </Table>
                                { bandera === false ? 
                                    <div className="loadingDashbord">
                                        <div className='text-center'>
                                            <h2>Cargando</h2>
                                            <LinearProgress style={{ marginTop: '15px', width: '300px' }} />
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                {last.length === 0 && bandera === true ? <div className={classes.h2div}><h2>No hay tareas para mostrar</h2></div> : null}
                            </div>    
                        </div>            
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <div className='flex flex-wrap'>
                                <div className="sm:w-1/2 md:w-1/2">
                                    <h2 className={classes.title}>
                                        Próximas clases
                                    </h2> 
                                </div>
                                <div className="sm:w-1/2 md:w-1/2" style={{ justifyContent: 'right', display: 'flex' }}>
                                    <Select                                 
                                            className="selectDashbord"                                                
                                            onChange={groupsFilter}    
                                            displayEmpty  
                                            value={info}                                                     
                                        >                
                                            <MenuItem className='menuItem' value="" disabled>Grupos...</MenuItem>
                                            <MenuItem className='menuItem' value={1}>Todos los grupos</MenuItem>
                                            {
                                                group ? group.map(g => (
                                                    <MenuItem className='menuItem' value={g.id}>{g.name}</MenuItem>
                                                ))
                                                :  null
                                            }                                 
                                    </Select>    
                                </div>                                
                            </div>
                            <div className={classes.divContent}>
                                <Table className="tables">
                                    <TableHead className="tablesHead">
                                        <TableRow>
                                            <TableCell className="tablesTh colorAndPadding">Clase</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">Grupo</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">Fecha</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">Hora</TableCell>
                                        </TableRow>
                                    </TableHead>
                                        {
                                            bandera === true ?
                                                <>
                                                    <TableBody>
                                                        {
                                                            dataTime ? dataTime.map((data, index) => (
                                                                <TableRow>                                                                
                                                                    {
                                                                        data.group.length > 21 ? 
                                                                            <Tooltip title={data.name} placement={'top'}>
                                                                                <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{data.name.slice(0, 21) + '...'}</TableCell>
                                                                            </Tooltip>
                                                                        :
                                                                        <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{data.name}</TableCell>
                                                                    }
                                                                    {
                                                                        data.group.length > 13 ? 
                                                                            <Tooltip title={data.group} placement={'top'}>
                                                                                <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.group.slice(0, 13) + '...'}</TableCell>
                                                                            </Tooltip>
                                                                        :
                                                                        <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.group}</TableCell>
                                                                    }
                                                                    <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.date}</TableCell>
                                                                    <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.hour}</TableCell>
                                                                </TableRow>
                                                            )) :
                                                                null
                                                        }
                                                    </TableBody>
                                                </>
                                                :
                                                null
                                        }
                                </Table>
                                { bandera === false ? 
                                    <div className="loadingDashbord">
                                        <div className='text-center'>
                                            <h2>Cargando</h2>
                                            <LinearProgress style={{ marginTop: '15px', width: '300px' }} />
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                { dataTime.length === 0 && bandera === true ? <div className={classes.h2div}><h2>No hay clases para mostrar</h2></div>: null}
                            </div>    
                        </div>            
                        
                        <div className="w-full p-12">
                            <div className="flex flex-wrap">
                                <div className="sm:w-1/2 md:w-1/2">
                                    <h2 className={classes.title}>
                                        Alumnos
                                    </h2>
                                </div>
                                <div className="sm:w-1/2 md:w-1/2" style={{ justifyContent: 'right', display: 'flex' }}>
                                    <Select
                                        className="selectDashbord"
                                        onChange={studentsFilter}
                                        displayEmpty
                                        value={infoStudent}
                                    >
                                        <MenuItem className={classes.menuItem} value="" disabled>Alumnos...</MenuItem>
                                        <MenuItem value={1}>Mayores promedios</MenuItem>
                                        <MenuItem value={0}>Menores promedios</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className={classes.divContent}>                                                               
                                    <Table className="tables">
                                        <TableHead className="tablesHead">
                                            <TableRow>
                                                <TableCell className="tablesTh colorAndPadding" style={{ width: '350px' }}>Alumno</TableCell>
                                                <TableCell className="tablesTh colorAndPadding">Grupo</TableCell>
                                                <TableCell className="tablesTh colorAndPadding" style={{ width: '165px' }}>Tareas entregadas</TableCell>
                                                <TableCell className="tablesTh colorAndPadding" style={{ width: '165px' }}>Tareas pendientes</TableCell>
                                                <TableCell className="tablesTh colorAndPadding">Promedio</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            bandera === true ?
                                                <>
                                                    <TableBody>
                                                        {
                                                            filter ?
                                                                filter.map((data, index) => (
                                                                    <TableRow>
                                                                        {
                                                                            data.full_name.length > 44 ?
                                                                                <Tooltip title={data.full_name} placement={'top'}>                                                                                
                                                                                    <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>
                                                                                        <div className='flex'>
                                                                                            {index + 1}. <Avatar className='mx-8 pl-4 avatarDashbord' src={data.avatar ? data.avatar : "assets/images/avatars/bootFace.png"}/> { data.full_name.slice(0, 40) + '...'}
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </Tooltip>
                                                                        :                                                                                                                                                              
                                                                                <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>
                                                                                    <div className='flex'>
                                                                                        {index + 1}. <Avatar className='mx-8 pl-4 avatarDashbord' src={data.avatar ? data.avatar : "assets/images/avatars/bootFace.png"}/> { data.full_name}
                                                                                    </div>
                                                                                </TableCell>                                                                                
                                                                        }
                                                                        {
                                                                            data.group.length > 16 ? 
                                                                                <Tooltip title={data.group} placement={'top'}>                                                                                
                                                                                    <TableCell className={index % 2 === 0 ? "tablesTdB gruposDashbord centerData" : "tablesTd gruposDashbord centerData"}>
                                                                                            {data.group.slice(0, 15) + '...'}
                                                                                    </TableCell>
                                                                                </Tooltip>
                                                                            :                                                                        
                                                                                <TableCell className={index % 2 === 0 ? "tablesTdB gruposDashbord centerData" : "tablesTd gruposDashbord centerData"}>
                                                                                        {data.group}
                                                                                </TableCell>                                                                        
                                                                        }
                                                                        <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.Entregado}</TableCell>
                                                                        <TableCell className={index % 2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}>{data.NoEntregado}</TableCell>
                                                                        <TableCell className={index % 2 === 0 ? "tablesTdB centerData promedioDashbord" : "tablesTd centerData promedioDashbord"}>{(parseFloat(data.promedio)).toFixed(2)}</TableCell>
                                                                    </TableRow>
                                                                )) :
                                                                null
                                                        }
                                                    </TableBody>
                                                </>
                                                :
                                                null
                                        }
                                    </Table>
                                { bandera === false ? 
                                    <div className="loadingDashbord">
                                        <div className='text-center'>
                                            <h2>Cargando</h2>
                                            <LinearProgress style={{ marginTop: '15px', width: '300px' }} />
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                { filter.length === 0 && bandera === true ? <div className={classes.h2div}><h2>No hay alumnos para mostrar</h2></div>: null}
                            </div>    
                        </div>            
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <h2 className={classes.title}>
                                Mis cursos
                            </h2> 
                            <div className={classes.divContent}>
                                <Table className="tables">
                                    <TableHead className="tablesHead">
                                        <TableRow>
                                            <TableCell className="tablesTh colorAndPadding">Mis cursos</TableCell>
                                            <TableCell className="tablesTh colorAndPadding">Avances</TableCell>                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            misCursos ? misCursos.map((m, index) => (
                                                <TableRow>
                                                    {
                                                        m.course_name.length > 40 ?
                                                            <Tooltip title={m.course_name} placement={'top'}>
                                                                <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{index + 1}. {m.course_name.slice(0, 40) + '...'}</TableCell>
                                                            </Tooltip>
                                                            :
                                                            <TableCell className={index % 2 === 0 ? "tablesTdB" : "tablesTd"}>{index + 1}. {m.course_name}</TableCell>
                                                    }                                                      
                                                    <TableCell className={index%2 === 0 ? "tablesTdB centerData" : "tablesTd centerData"}> 
                                                        <div className={classes.divProgressBar}>
                                                            <div className={classes.progressBar}>
                                                                <LinearProgress className={classes.progressBar} variant="determinate" value={m.percentage_completed * 100}/>
                                                            </div>
                                                            <Typography>
                                                                {Math.trunc(m.percentage_completed * 100) + "%"}
                                                            </Typography>                                                        
                                                        </div>      
                                                    </TableCell>
                                                </TableRow>
                                            )): 
                                            null
                                        }                            
                                    </TableBody>
                                </Table>
                                { misCursos.length === 0 ? <div className={classes.h2div}><h2>No hay cursos para mostrar</h2></div>: null}
                            </div>    
                        </div>            
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <div className="flex w-full justify-between">
                                <h2 className={classes.title}>
                                    Cursos para tí 
                                </h2>
                                <Button className={classes.button} to={`/apps/teachercourses`} component={Link} >
                                    Ver más +
                                </Button>
                            </div>
                            <div className={classes.divContent}>
                                <div className={classes.divCursos}>
                                    { 
                                        cursos ? cursos.map(c => (
                                            <div className="w-full sm:w-1/2 md:w-1/2 p-6 text-center">
                                                <div className={classes.divImgCursos}>                                    
                                                    <img className={classes.imgCursos} src={c.course_card_image_url === "/assets/defaults/default-product-card.png" ? img[2].img : c.course_card_image_url}/>
                                                </div>
                                                <p className={classes.titleCourse}>{c.name}</p>
                                            </div>  
                                        )): null
                                    } 
                                </div>                                
                                { cursos.length === 0 ? <div className={classes.h2div}><h2>No hay cursos para mostrar</h2></div>: null}                 
                            </div>
                        </div>                    
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <h2 className={classes.title}>
                                Eventos LIA
                            </h2>
                            <div className={classes.divContentD}>
                                <div className={classes.divCursos}>
                                    {
                                        evento ? evento.map(e => (
                                            <div className="w-full sm:w-1/2 md:w-1/2 p-6">
                                                <div className={classes.divImgCursos}>
                                                    <img className={classes.imgCursos} src={e.img} />
                                                </div>
                                                <h4 className={classes.titleEvent}>{e.title}</h4>
                                                <h4>{e.date}</h4>
                                            </div>
                                        )) : null
                                    }
                                </div>                    
                                {evento.length === 0 ? <div className={classes.h2div}><h2>No hay eventos para mostrar</h2></div> : null}
                            </div>
                        </div>    
                        <div className="w-full sm:w-1 md:w-1/2 p-12">
                            <h2 className={classes.title}>
                                Mi Comunidad                                
                            </h2> 
                            <div className={classes.divContentD}>
                                <div className={classes.divComunidad} style={{ marginTop: '0px' }}> 
                                    <div className={classes.divMensajes}>
                                        {
                                            comunidad ? comunidad.map(c => (
                                                <div className={classes.divCom}><img src={c.type === "text" ? img[3].img : c.type === "photo" ? 'assets/images/iconsHomework/image.png' : img[3].img} className={classes.iconComunidad}/><h4 className={classes.mensajes}>{c.full_name} <strong>publico</strong> {c.type === "text" ? "un mensaje" : c.type === "photo" ? "una imagen" : "contenido"} en el grupo {c.title}</h4></div>
                                            )): null
                                        }                 
                                    { comunidad.length === 0 ? <div className={classes.h2div} style={{ height: '92px' }}><h2>No hay notificaciones para mostrar</h2></div> : null}
                                    </div>
                                </div>
                                <div className={classes.divIconsComunidad}>
                                    <div className="w-full flex flex-wrap">
                                        <div className="w-full sm:w-1/2 md:w-1/2 icon">
                                            <Badge badgeContent={notificaciones} color="primary" className="badgeUsers">                                                
                                                <img src={img[0].img} className={classes.icon}/>
                                            </Badge>
                                        </div>               
                                        {/* <div className="w-full sm:w-1/3 md:w-1/3 icon">
                                            <img src={img[2].img} className={classes.icon}/>
                                        </div>                */}
                                        <div className="w-full sm:w-1/2 md:w-1/2 icon">
                                            <Badge badgeContent={solicitudes} color="primary" className="badgeUsers">                                                
                                                <img src={img[1].img} className={classes.icon}/>
                                            </Badge>
                                        </div>               
                                    </div>
                                </div> 
                            </div>    
                        </div>      
                    </Card> 
                )
                :
                (
                    <Card elevation={1} className={classes.loading}>
                        <div>
                            <h2>Cargando</h2>
                            <div 
                                style={{ 
                                    display: 'flex',
                                    justifyContent: 'center', 
                                    alignContent: 'center',
                                    marginTop: '15px'
                                }}
                            >
                                <CircularProgress />
                            </div>
                        </div>
                    </Card>
                )
            }                       
            </FuseAnimateGroup>
        </div> 
    )
}