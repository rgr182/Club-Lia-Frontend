import { Box, Button, ButtonGroup, Card, Checkbox, CircularProgress, Collapse, FormControlLabel, Grid, Icon, IconButton, List, ListItem, makeStyles, Paper, Snackbar, Switch, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { openEditHomeworkDialog, selectHomeworks, downloadHomework, submitUpdateHomework, badgesHomework } from './store/homeworkSlice';
import { submitUpdateActivity } from '../activities/store/activitiesSlice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BackButtonDialog from '../components/BackButtonDialog';
import { TextFieldFormsy } from "../../../../@fuse/core/formsy";
import { showMessage } from "../../../store/fuse/messageSlice";
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import Formsy from "formsy-react";
import { isString } from 'lodash';
import './sellos/homeworks.css';
import axios from 'axios';
import reducer from './store';
import withReducer from 'app/store/withReducer';

const defaultFormState = {
    id: '',
    status: '',
    score: ''
};

const badges_relations = {
    badge_id: '',
    task_id: '',
    student_id: '',
    teacher_id: '',
    badges: ''
}

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        width: '100%'
    },

    card2: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px 20px 20px 20px",
        margin: "28px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)",
        height: '250px'
    },
    conteiner: {
        paddingLeft: '14px',
        paddingRight: '14px'
    },
    tituloWithImage: {
        width: '100%',
        color: "#00B1FF",
        fontSize: "20px",
        fontWeight: "bold",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    subtitulo: {
        color: "#00B1FF",
        width: '100%',
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: '25px'
    },
    subtituloC: {
        color: "#00B1FF",
        width: '35%',
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: '25px'
    },
    subtituloA: {
        color: "#00B1FF",
        width: '65%',
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: '25px',
        marginLeft: '40px'
    },
    nombreTarea: {
        color: '#353535',
        marginTop: '10px'
    },
    GridTareas: {
        paddingTop: '30px',
        height: '225px',
        overflow: 'auto'
    },
    tareas: {
        width: '98%',
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(2, 1fr)',
        marginTop: '10px'
    },
    tarea: {
        width: '100%',
        height: '70px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'left',
        '-webkit-box-shadow': '0px 0px 10px rgba(43, 25, 166, 0.2)',
        'box-shadow': '0px 0px 10px rgba(43, 25, 166, 0.2)',
        margin: '0px 0px 10px 0px',
        wordWrap: 'break-word',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '20px'
    },
    notas: {
        width: '100%',
        background: '#FFFCE4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '97px',
        'box-shadow': '0px 0px 0px transparent',
        marginTop: '20px',
        borderRadius: '18px',
        padding: '15px'
    },
    sellos: {
        width: '90%',
        height: '99px',
        marginTop: '30px',
        border: 'solid transparent 0px',
        'box-shadow': '0px 0px 0px transparent',
        '&:hover': {
            overflow: 'auto'
        }
    },
    calificar: {
        height: '97px',
        'box-shadow': '0px 0px 0px transparent',
        borderRadius: '18px',
        width: '100%',
        padding: '34px 8px 8px 0px',
        color: '#353535',
    },
    agregarSellos: {
        background: '#FFFCE4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '97px',
        'box-shadow': '0px 0px 0px transparent',
        marginTop: '30px',
        borderRadius: '18px'
    },
    asterisco: {
        color: '#00B1FF',
        paddingLeft: '5px'
    },
    textArea: {
        border: 'solid rgba(43, 25, 166, 0.2) 3px',
        borderRadius: "8px",
        marginTop: '8px',
        padding: '5px',
        fontFamily: 'Poppins'
    },
    buttons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '25px'
    },
    cancelar: {
        borderRadius: '28px',
        width: '124px',
        height: '34px',
        border: 'solid #FF2F54 2px',
        color: '#FF2F54',
        marginRight: '15px',
        '&:hover': {
            background: '#FF2F54',
            color: 'white'
        }
    },
    enviar: {
        borderRadius: '28px',
        width: '124px',
        height: '34px',
        background: '#60CEFF',
        border: 'solid #60CEFF 2px',
        color: 'white',
        marginLeft: '15px',
        '&:hover': {
            background: '#00B1FF'
        }
    },
    img: {
        borderRadius: '50%',
        width: '35px',
        height: '35px',
        marginRight: '10px',
        background: 'lightgray'
    },
    nameStudent: {
        marginRight: '45px'
    },
    none: {
        display: 'none'
    },
    resourceItem: {
        flexWrap: "wrap",
        justifyContent: "left",
        width: "100%",
        height: 65,
        lineHeight: '65px',
        borderRadius: '10px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        padding: '0 75px',
        position: 'relative',
        transition: '0.3s',
        '&:hover': {
            backgroundColor: '#F5F5F5',
            cursor: 'pointer'
        },
        '&:active': {
            backgroundColor: '#BEBEBE',
            backgroundSize: '100%',
            transition: 'background 0s',
        }
    },
    resourceIcons: {
        padding: '5px',
        height: '100%',
        position: 'absolute',
        left: '5px'
    },
}));

function ActivitiesGrade(props) {

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const history = useHistory();
    const homework = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homework);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [form2, setForm2] = useState([]);
    const [number, setNumber] = useState();
    const [image, setImage] = useState('');
    const [nameStudent, setNameStudent] = useState('');
    const [nameTarea, setNameTarea] = useState('');
    const [tareaId, setTareaId] = useState();
    const [notas, setNotas] = useState('');
    const [datosInsert, setDatosInsert] = useState([]);
    const [finishDate, setFinishDate] = useState("");
    const teacher = useSelector(({ auth }) => auth.user.data.uuid);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [enviar, setEnviar] = useState(false);
    const [textArea, setTextArea] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);
    const formRef = useRef(null);
    const [sellosArray, setSellosArray] = useState([]);
    const url = window.location.search;
    const URLParams = new URLSearchParams(url);
    const [badgeChange, setBadgeChange] = useState(false);
    const [math, setMath] = useState(0);
    const [openBackDialog, setOpenBackDialog] = useState(false);
    const [badge1, setBadge1] = useState(false);
    const [badge2, setBadge2] = useState(false);
    const [badge3, setBadge3] = useState(false);
    const [badge4, setBadge4] = useState(false);
    const [badge5, setBadge5] = useState(false);
    const [badge6, setBadge6] = useState(false);
    const [badge7, setBadge7] = useState(false);
    const [badge8, setBadge8] = useState(false);
    const [badge9, setBadge9] = useState(false);
    const [badge10, setBadge10] = useState(false);

    function disableButton() {
        setIsFormValid(false);
    }

    useEffect(() => {
        var idTarea = URLParams.get('id');
        var idActivity = URLParams.get('activity');
        setTareaId(Number.parseInt(idActivity));
        if (!idTarea || isNaN(parseInt(idTarea)) || !idActivity) {
            history.push("/pages/errors/error-404");
        }
        axios.get(process.env.REACT_APP_API + `/tarea/${Number.parseInt(idTarea)}`).then(data => {
            setBandera(true);
            setDatosInsert(data.data.data);
            setForm(data.data.data);
            setNotas(data.data.data.instructions);
            setNameStudent(data.data.data.teachers_name);
            setImage(data.data.data.avatar);
            setFinishDate(`${data.data.data.finish_date.slice(0, 4)} / ${data.data.data.finish_date.slice(6, 7)} / ${data.data.data.finish_date.slice(8, 10)}`);
            badges_relations.student_id = data.data.data.student_id;
        });
        axios.get(process.env.REACT_APP_API + `/actividades/actividad/${Number.parseInt(idActivity)}`).then(data => {
            setBandera2(true);
            setNameTarea(data.data.data.name);
            setForm2(data.data.data);
            var url = data.data.data.url_path ? data.data.data.url_path : '';
        });

    }, []);

    useEffect(() => {
        var idActivity = URLParams.get('activity');
        if (badges_relations.student_id) {
            axios.get(process.env.REACT_APP_API + `/getBadge`, {
                params: {
                    task_id: Number.parseInt(idActivity),
                    student_id: badges_relations.student_id,
                    teacher_id: teacher
                }
            }).then(data => {
                var clear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                for (let i = 0; i < clear.length; i++) {
                    var p = document.getElementById(`${i}`);
                    if (p) {
                        p.className = `sello${i}`;
                        switch (clear[i]) {
                            case 1: setBadge1(false); break;
                            case 2: setBadge2(false); break;
                            case 3: setBadge3(false); break;
                            case 4: setBadge4(false); break;
                            case 5: setBadge5(false); break;
                            case 6: setBadge6(false); break;
                            case 7: setBadge7(false); break;
                            case 8: setBadge8(false); break;
                            case 9: setBadge9(false); break;
                            case 10: setBadge10(false); break;
                        }
                    }
                }
                if (data.data) {
                    var insignias = data.data[0] ? JSON.parse(data.data[0].badges_data) : [];
                    console.log(insignias);
                    setSellosArray(insignias ? insignias : []);
                    if(insignias){                    
                        for (let i = 0; i < insignias.length; i++) {
                            var elementList = document.getElementById(insignias[i].badge_id);
                            elementList.className = `sello${insignias[i].badge_id}_1`;
                            document.getElementById('sello' + insignias[i].badge_id).checked = true;
                            switch (insignias[i].badge_id) {
                                case 1: setBadge1(true); break;
                                case 2: setBadge2(true); break;
                                case 3: setBadge3(true); break;
                                case 4: setBadge4(true); break;
                                case 5: setBadge5(true); break;
                                case 6: setBadge6(true); break;
                                case 7: setBadge7(true); break;
                                case 8: setBadge8(true); break;
                                case 9: setBadge9(true); break;
                                case 10: setBadge10(true); break;
                            }
                        }
                    }
                }
            });
        }
    }, [badges_relations.student_id]);

    useEffect(() => {
        if (datosInsert) {
            if (Number.parseInt(form.score) > 10 || Number.parseInt(form.score) < 0) {
                setEnviar(false);
            } else {
                if (form.score) {
                    if (form.score === number && Number.parseInt(form.score) < 10 && Number.parseInt(form.score) >= 0) {
                        setEnviar(false);
                    } else {
                        setEnviar(true);
                    }
                }
            }
        }
    }, [form.score]);

    function handleSubmit(event) {
        if (badges_relations.badge_id === '') {

        } else {
            axios.post(process.env.REACT_APP_API + '/badges', badges_relations).then(response => {
                const data = response.data.data;
            });
        }
        var number = {
            target: {
                value: "0"
            }
        }
        dispatch(submitUpdateHomework(form, datosInsert));
        setNotas(textArea);
    }

    useEffect(() => {
        if (homework.error) {
            if (homework.error.response.request.status == '500') {
                dispatch(showMessage({ message: homework.error.data.message, variant: 'error' }));
            } else {
                disableButton();
                if (homework.error.response.data.message.schoolId) {
                    dispatch(showMessage({ message: 'El usuario no tiene escuela', variant: 'error' }));
                }
                else {
                    if (homework.error.response.data.message.includes("No query results")) {
                        dispatch(showMessage({ message: 'Grupo invalido. Contacta al administrador.', variant: 'error' }));
                    }
                    else {
                        dispatch(showMessage({ message: 'Ha ocurrido un error!', variant: 'error' }));
                    }
                }
            }
        }
        if (homework.success) {
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
            history.push("/apps/tareas/" + URLParams.get('activity') + '/' + URLParams.get('name'));
        }
    }, [homework.error, homework.success]);

    const handleChangeNotes = (text) => {
        setTextArea(text.target.value);
    }

    const handleListItemClick = (event, index) => {
        var elementList = document.getElementById(index);
        var checkbox = document.getElementById('sello' + index);
        switch (index) {
            case 1: setBadge1(!badge1); break;
            case 2: setBadge2(!badge2); break;
            case 3: setBadge3(!badge3); break;
            case 4: setBadge4(!badge4); break;
            case 5: setBadge5(!badge5); break;
            case 6: setBadge6(!badge6); break;
            case 7: setBadge7(!badge7); break;
            case 8: setBadge8(!badge8); break;
            case 9: setBadge9(!badge9); break;
            case 10: setBadge10(!badge10); break;
        }
        if (checkbox.checked === false) {
            elementList.className = `sello${index}`;
            var position = sellosArray.findIndex(badge => badge.badge_id === index);
            sellosArray.splice(position, 1);            
        } else {
            sellosArray.push({ badge_id: index });
            elementList.className = `sello${index}_1`;
        }
        badges_relations.teacher_id = teacher;
        badges_relations.task_id = tareaId;
        badges_relations.badge_id = Number.parseInt(index);
        badges_relations.badges_data = JSON.stringify(sellosArray);
        if (sellosArray.length > 5) {
            setEnviar(false);
            dispatch(showMessage({ message: "Solo puedes enviar 5 sellos", variant: 'error' }));
        } else {
            setEnviar(true);
        }
    }

    return (
        <Grid>
            <FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >
                {
                    bandera && bandera2 === true ?
                        form2 && form !== [] ?
                            <Grid conteiner className="contenedorTarea">
                                <Grid className='head'>
                                    <Grid item className="btnRegresar">
                                        <BackButtonDialog
                                            openBackDialog={openBackDialog}
                                            setOpenBackDialog={setOpenBackDialog}
                                            goBack={props.history.goBack}
                                        />
                                        <Button onClick={env => { setOpenBackDialog(true) }} style={{ textTransform: 'none' }}><Icon>{'chevron_left'}</Icon>Regresar</Button>
                                    </Grid>
                                    <Grid item className="nameTarea">
                                        <Grid>
                                            <Grid className="nameAndAvatar">
                                                <img src={image ? image : 'https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png'} className="avatar" />
                                                <h2 className="nameStudent">{nameStudent ? nameStudent : 'Nombre del alumno'}</h2>
                                            </Grid>
                                            <Typography variant='h6' className="subtitleBlack">{nameTarea ? nameTarea : 'Nombre de la tarea'}</Typography>
                                            <Typography variant='subtitle1' className="subtitleBlack">{finishDate ? finishDate : 'Fecha de entrega'}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="contenido">
                                    <Grid className="w-full">
                                        <Grid className="subtitleBlue">
                                            <h3>Elementos entregados</h3>
                                        </Grid>
                                        {datosInsert && (datosInsert.activityURL || datosInsert.activityFile) ?
                                            <Grid container spacing={4} className="py-12">
                                                {datosInsert.activityURL &&
                                                    <>
                                                        {datosInsert.activityURL[0].value ?
                                                            datosInsert.activityURL.map((url, index) => (
                                                                <Grid key={url.value} item xs={12} sm={6}>
                                                                    <Paper
                                                                        className={classes.resourceItem}
                                                                        elevation={3}
                                                                        onClick={ev => {
                                                                            ev.stopPropagation();
                                                                            navigator.clipboard.writeText(url.value);
                                                                            dispatch(showMessage({ message: 'Enlace copiado' }));
                                                                        }}
                                                                    >
                                                                        <img className={classes.resourceIcons} src={'assets/images/logos/recurso-enlace.svg'} />
                                                                        {url.value}
                                                                    </Paper>
                                                                </Grid>
                                                            ))
                                                            :
                                                            <Grid item xs={12} sm={6}>
                                                                <Paper
                                                                    className={classes.resourceItem}
                                                                    elevation={3}
                                                                    onClick={ev => {
                                                                        ev.stopPropagation();
                                                                        navigator.clipboard.writeText(datosInsert.activityURL);
                                                                        dispatch(showMessage({ message: 'Enlace copiado' }));
                                                                    }}
                                                                >
                                                                    <img className={classes.resourceIcons} src={'assets/images/logos/recurso-enlace.svg'} />
                                                                    {datosInsert.activityURL}
                                                                </Paper>
                                                            </Grid>
                                                        }
                                                    </>
                                                }
                                                {datosInsert.activityFile &&
                                                    <>
                                                        {
                                                            Array.isArray(datosInsert.activityFile) ?
                                                                datosInsert.activityFile.map((file, index) => (
                                                                    <Grid key={file} item xs={12} sm={6}>
                                                                        <Paper
                                                                            className={classes.resourceItem}
                                                                            elevation={3}
                                                                            onClick={ev => {
                                                                                ev.stopPropagation();
                                                                                dispatch(downloadHomework(file.replace('public', '')));
                                                                            }}
                                                                        >
                                                                            <img
                                                                                className={classes.resourceIcons}
                                                                                src={"assets/images/logos/" +
                                                                                    ((file.split('.')[file.split('.').length - 1] == "jpg" || file.split('.')[file.split('.').length - 1] == "png" || file.split('.')[file.split('.').length - 1] == "svg" || file.split('.')[file.split('.').length - 1] == "ico" || file.split('.')[file.split('.').length - 1] == "jpeg") ?
                                                                                        "recurso-imagen.svg" :
                                                                                        ((file.split('.')[file.split('.').length - 1] == "mp4" || file.split('.')[file.split('.').length - 1] == "gif" || file.split('.')[file.split('.').length - 1] == "mpg" || file.split('.')[file.split('.').length - 1] == "3gp" || file.split('.')[file.split('.').length - 1] == "avi" || file.split('.')[file.split('.').length - 1] == "wmv") ?
                                                                                            "recurso-video.svg" :
                                                                                            ((file.split('.')[file.split('.').length - 1] == "docx" || file.split('.')[file.split('.').length - 1] == "doc") ?
                                                                                                "recurso-word.svg" :
                                                                                                ((file.split('.')[file.split('.').length - 1] == "xlsx" || file.split('.')[file.split('.').length - 1] == "xml" || file.split('.')[file.split('.').length - 1] == "csv") ?
                                                                                                    "recurso-excel.svg" :
                                                                                                    ((file.split('.')[file.split('.').length - 1] == "pptx" || file.split('.')[file.split('.').length - 1] == "ppt") ?
                                                                                                        "recurso-powerpoint.svg" :
                                                                                                        (file.split('.')[file.split('.').length - 1] == "pdf" ?
                                                                                                            "recurso-pdf.svg" :
                                                                                                            "Otro.svg"))))))
                                                                                }
                                                                            />
                                                                            {file.slice(file.indexOf('_') + 1)}
                                                                        </Paper>
                                                                    </Grid>
                                                                ))
                                                                :
                                                                <Grid item xs={12} sm={6}>
                                                                    <Paper
                                                                        className={classes.resourceItem}
                                                                        elevation={3}
                                                                        onClick={ev => {
                                                                            ev.stopPropagation();
                                                                            dispatch(downloadHomework(datosInsert.activityFile.replace('public', '')));
                                                                        }}
                                                                    >
                                                                        <img
                                                                            className={classes.resourceIcons}
                                                                            src={"assets/images/logos/" +
                                                                                ((datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "jpg" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "png" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "svg" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "ico" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "jpeg") ?
                                                                                    "recurso-imagen.svg" :
                                                                                    ((datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "mp4" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "gif" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "mpg" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "3gp" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "avi" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "wmv") ?
                                                                                        "recurso-video.svg" :
                                                                                        ((datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "docx" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "doc") ?
                                                                                            "recurso-word.svg" :
                                                                                            ((datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "xlsx" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "xml" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "csv") ?
                                                                                                "recurso-excel.svg" :
                                                                                                ((datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "pptx" || datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "ppt") ?
                                                                                                    "recurso-powerpoint.svg" :
                                                                                                    (datosInsert.activityFile.split('.')[datosInsert.activityFile.split('.').length - 1] == "pdf" ?
                                                                                                        "recurso-pdf.svg" :
                                                                                                        "Otro.svg"))))))
                                                                            }
                                                                        />
                                                                        {datosInsert.activityFile.slice(form.file_path.indexOf('_') + 1)}
                                                                    </Paper>
                                                                </Grid>
                                                        }
                                                    </>
                                                }
                                            </Grid>
                                            :
                                            <Grid className='message'>
                                                No se encontró material disponible
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid className="w-full">
                                        <Grid className="subtitleBlue">
                                            <h3>Notas del alumno</h3>
                                        </Grid>
                                        <Card elevation={1} className={classes.notas}>{notas ? notas : 'No hay notas disponibles'}</Card>
                                    </Grid>
                                    <Grid className="w-full">
                                        <Grid className="flex w-full">
                                            <Grid className={classes.subtituloC}>
                                                <Grid>
                                                    <h3>Calificar tarea</h3>
                                                    <Grid className={classes.calificar}>
                                                        <Grid className="flex">
                                                            <h4>Calificación</h4><h4 className={classes.asterisco}> *</h4>
                                                        </Grid>
                                                        <Formsy
                                                            onValidSubmit={handleSubmit}
                                                            onInvalid={disableButton}
                                                            ref={formRef}
                                                        >
                                                            <TextFieldFormsy
                                                                type='number'
                                                                min='0'
                                                                max='10'
                                                                name="score"
                                                                id="score"
                                                                className='inputCalificar'
                                                                value={form.score ? form.score : ''}
                                                                onChange={handleChange}
                                                                validations={{
                                                                    isNumber: function (values, value) {
                                                                        return value >= 0 && value <= 10 ? true : 'La calificación debe ser un numero entre 0 y 10'
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                            <TextFieldFormsy
                                                                className={classes.none}
                                                                type="text"
                                                                name="status"
                                                                label="Estado"
                                                                id="status"
                                                                value={form.status ? form.status : ''}
                                                                onChange={handleChange}
                                                                validations={{
                                                                    isNumber: function (values, value) {
                                                                        return value >= 0 && value <= 10 ? true : 'La calificación debe ser un numero entre 0 y 10'
                                                                    }
                                                                }}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                required
                                                            />
                                                            <TextFieldFormsy
                                                                className={classes.none}
                                                                type="text"
                                                                name="user_name"
                                                                label="Nombre del Alumno"
                                                                id="user_name"
                                                                value={form.user_name ? form.user_name : ''}
                                                                onChange={handleChange}
                                                                validations={{
                                                                    isNumber: function (values, value) {
                                                                        return value >= 0 && value <= 10 ? true : 'La calificación debe ser un numero entre 0 y 10'
                                                                    }
                                                                }}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                required
                                                            />
                                                        </Formsy>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid className={classes.subtituloA}>
                                                <Grid>
                                                    <h3>Agregar sellos</h3>
                                                </Grid>
                                                <Grid elevation={1} className='sellos'>
                                                    <div className="divSello">
                                                        <Button className='sello1' id="1"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge1} onClick={(event) => handleListItemClick(event, 1)} id="sello1" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello2' id="2"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge2} onClick={(event) => handleListItemClick(event, 2)} id="sello2" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello3' id="3"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge3} onClick={(event) => handleListItemClick(event, 3)} id="sello3" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello4' id="4"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge4} onClick={(event) => handleListItemClick(event, 4)} id="sello4" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello5' id="5"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge5} onClick={(event) => handleListItemClick(event, 5)} id="sello5" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello6' id="6"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge6} onClick={(event) => handleListItemClick(event, 6)} id="sello6" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello7' id="7"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge7} onClick={(event) => handleListItemClick(event, 7)} id="sello7" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello8' id="8"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge8} onClick={(event) => handleListItemClick(event, 8)} id="sello8" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello9' id="9"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge9} onClick={(event) => handleListItemClick(event, 9)} id="sello9" />
                                                    </div>
                                                    <div className="divSello">
                                                        <Button className='sello10' id="10"></Button>
                                                        <input type="checkbox" className="btnSelloStyle" checked={badge10} onClick={(event) => handleListItemClick(event, 10)} id="sello10" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="w-full">
                                            <Grid className={classes.subtitulo}>
                                                <h3>Dejar una nota</h3>
                                            </Grid>

                                            <TextareaAutosize
                                                className={classes.textArea}
                                                aria-label="empty textarea"
                                                style={{ width: '100%', height: '100px' }}
                                                fullWidth
                                                // className={classes.textArea}
                                                type="text"
                                                name="instructions"
                                                label="Notas del profesor"
                                                id="instructions"
                                                value={textArea}
                                                onChange={handleChangeNotes}
                                            />
                                        </Grid>
                                        <Grid className={classes.buttons}>
                                            <Button className={classes.cancelar} variant="outlined" onClick={() => window.history.back()} style={{ textTransform: 'none' }}>Cancelar</Button>
                                            <Button className={classes.enviar} onClick={handleSubmit} disabled={enviar === false} style={{ textTransform: 'none' }}>Enviar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                            :
                            <Card elevation={1} className={classes.card2}>
                                <Grid className={classes.regresar}>
                                    <Button to={'/apps/actividades/all'} component={Link} style={{ textTransform: 'none' }}><Icon>{'chevron_left'}</Icon>Regresar</Button>
                                </Grid>
                                <Grid className="flex flex-1 items-center justify-center h-full">
                                    <Typography color="textSecondary" variant="h5">
                                        No hay registros que mostrar!
                                    </Typography>
                                </Grid>
                            </Card>
                        :
                        (
                            <Card elevation={1} className="contenedorTareaLoading">
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
        </Grid>
    )
}

export default withReducer('HomeworksApp', reducer)(ActivitiesGrade);
