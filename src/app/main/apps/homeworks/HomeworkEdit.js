import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, ButtonGroup, Card, Collapse, FormControlLabel, Grid, Icon, IconButton, makeStyles, Snackbar, Switch, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { openEditHomeworkDialog, selectHomeworks, downloadHomework, submitUpdateHomework } from './store/homeworkSlice';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useDispatch, useSelector } from 'react-redux';
import './sellos/homeworks.css';
import FuseUtils from '@fuse/utils';
import { useForm } from '@fuse/hooks';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useParams } from 'react-router-dom';
import {showMessage} from "../../../store/fuse/messageSlice";
import { Link } from 'react-router-dom';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import { useDeepCompareEffect } from '@fuse/hooks';
import { openNewHomeworkDialog, getHomeworks } from './store/homeworkSlice';
import { getTeacherInfo } from './store/teacherSlice';
import { submitUpdateActivity } from '../activities/store/activitiesSlice';
import { openUpdateDeliveryDialog } from '../activities/store/deliverySlice';
import { getActivities, getSubjects, selectActivities } from '../activities/store/activitiesSlice';
import { getCategories, selectCategories } from '../activities/store/categoriesSlice';
import { getGroups } from '../activities/store/groupSlice';
import Edit from '@material-ui/icons/Edit';
import Formsy from "formsy-react";
import axios from 'axios';
import { getElementById } from 'domutils';

const defaultFormState = {
	id: '',
	status: '',
	score: ''
};

const defaultFormState2 = {
	file_path: '',
	finish_date: '',
	instructions: '',
	is_active: true,
	name: '',
    file_path: ''
}

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        width: '100%'
    },
    card: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px 20px 20px 20px",
        margin: "5px 5px 25px 5px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)"
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
    regresar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'left',
        marginRight: '10px'
    },
    titulo: {
        width: '100%',
        textAlign: 'center',
        color: "#00B1FF",
        fontSize: "20px",
        fontWeight: "bold"
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
    divTareas: {
        paddingTop: '30px',
        height: '225px',
        overflow: 'auto'
    },
    tareas: {
        width: '98%',        
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(2, 1fr)'
    },
    tarea: {
        width: '95%',
        margin: '2px 20px 20px 0px',
        height: '70px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'left',        
        '-webkit-box-shadow': '0px 0px 10px rgba(43, 25, 166, 0.2)',
        'box-shadow': '0px 0px 10px rgba(43, 25, 166, 0.2)',
        paddingLeft: '18px',
        margin: '0px 10px 10px 10px'
    },
    notas: {
        width: '97.5%',
        background: '#FFFCE4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '97px',
        'box-shadow': '0px 0px 0px transparent',
        marginTop: '30px',
        borderRadius: '18px'
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
        color: '#353535'
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
        background: 'lightgray',
        padding: '5px'
    }, 
    nameStudent: {
        marginRight: '45px'
    },
    none: {
        display: 'none'
    }
}));

function ActivitiesGrade(props){
    
    const classes = useStyles(props);        
    const dispatch = useDispatch();    
	const routeParams = useParams();
    const homeworks = useSelector(selectHomeworks);           
    const [filteredData, setFilteredData] = useState([{user_name: 'Nombre del alumno', finish_date: '00/ 00 /00'}]);
    const { form, handleChange, setForm} = useForm(defaultFormState);    
    const [ form2, setForm2] = useState([]);    
    const [urls, setUrls] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [name, setName] = useState('');
    const [notas, setNotas] = useState('');
    const [file, setfile] = useState([]);
    const [resources, setResources] = useState([]);
    const homeworkDialog = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog);    
    const formOrigin = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog.data);
    const [liaSubjects, setLiaSubjects] = React.useState([]);
    const homework = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homework);    
    let searchText = useSelector(({ HomeworksApp }) => HomeworksApp.homework.searchText);	    
    const [resourceName, setResourceName] = React.useState([]);
    const [activityChanged, setActivityChanged] = useState(true);

    const [textArea, setTextArea] = useState('');
    searchText =searchText? searchText : '';        
    
	useDeepCompareEffect(() => {		     		
		dispatch(getHomeworks(routeParams));
		dispatch(getTeacherInfo());
	}, [dispatch, routeParams]);


	const [values, setValues] = React.useState({
		loading : false
	});

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);


	function disableButton() {
		setIsFormValid(false);
	}

    useEffect(() => {
		if (homework.error) {

			if (homework.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: homework.error.data.message, variant: 'error'}));
			} else 
			{

				disableButton();
				setValues({...values, loading: false});
				
				if (homework.error.response.data.message.schoolId){
					dispatch(showMessage({message: 'El usuario no tiene escuela', variant: 'error'}));
				}
				else{
					if (homework.error.response.data.message.includes("No query results")){
						dispatch(showMessage({message: 'Grupo invalido. Contacta al administrador.', variant: 'error'}));
					}
					else{
						dispatch(showMessage({message: homework.error.response.data.message, variant: 'error'}));
					}
				}
			}
		}

		if(homework.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));			
		}
	}, [homework.error,homework.success]);

    useEffect(() => {
        var array = [];        
        var array2 = [];        
		function getFilteredArray(homeworks, _searchText) {
			if (_searchText.length === 0) {
				return homeworks;
			}
			return FuseUtils.filterArrayByString(homeworks, _searchText);
		}
        setFilteredData(getFilteredArray (homeworks, searchText));		
        if(homeworks[0]){
            if(homeworks[0].url_path && homeworks[0].file_path){
                array.push([
                    { url: homeworks[0] ? homeworks[0].url_path : null }, 
                ]);
                array2.push([
                    { archivo: homeworks[0] ? homeworks[0].file_path : null }
                ])            
            }
        }
        setUrls(array[0]);	
        setArchivos(array2[0]);	

        if(homeworks[0]){
            axios.get(process.env.REACT_APP_API + `/actividades/actividad/${homeworks[0].activity_id}`).then(data => {
                setNotas(data.data.data.instructions);
                setName(data.data.data.name);
                setForm2(data.data.data);                
                defaultFormState2.name = data.data.data.name;
                defaultFormState2.finish_date = data.data.data.finish_date.replace("T", " ").slice(0, 16);
                defaultFormState2.is_active = data.data.data.is_active;
                // defaultFormState2.url_Path = data.data.data.url_path;
            });
            setForm(homeworks[0]);                      
        }        
	}, [homeworks, searchText]);

    ///////////////////////////////////////////////////////////////////////////////////

    const initDialog = useCallback(() => {		
		if ((homeworkDialog.type === 'edit')&& homeworkDialog.data) {
			setForm({ ...filteredData[0] });
            // setForm2({ ...activityDialog.data });
		}		
	}, [homeworkDialog.data, homeworkDialog.type, setForm]);

    ///////////////////////////////////////////////////////////////////////////////////

	useEffect(() => {		
		initDialog();		
	}, [homeworkDialog.data, initDialog]);

    ///////////////////////////////////////////////////////////////////////////////////
    function handleSubmit(event) {
        var url = JSON.parse(form2.url_path);
        defaultFormState2.url_path = url;
        form2.finish_date = form2.finish_date.replace("T", " ").slice(0, 16);
        
		setValues({ ...values, loading: true });
		event.preventDefault();
		dispatch(submitUpdateHomework(form,filteredData[0]));	
        dispatch(submitUpdateActivity(defaultFormState2, form2, urls, resources));	
        setTextArea([]);
	}

    ///////////////////////////////////////////////////////////////////////////////////

	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm (values) {
		setForm(values);
	}
    const handleChangeNotes = (text) => {    
        setTextArea(text.target.value);
        defaultFormState2.instructions = text.target.value;        
    }
    const habilitarInputs = () => {
        setActivityChanged(!activityChanged);
        setTextArea([]);
        console.log(activityChanged);
    }

    ///////////////////////////////////////////////////////////////////////////////////

    return(
        <div>
            <FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >          
                {
                    filteredData[0] ?                   
                        <Card elevation={1} className={classes.card}>
                            <div className={classes.regresar}>
                                <Button to={'/apps/actividades/all'} component={Link} style={{textTransform: 'none'}}><Icon>{'chevron_left'}</Icon>Regresar</Button>
                                <IconButton id="edit" onClick={habilitarInputs} className="buttonEdit" color="primary" aria-label="add to shopping cart">
                                    <Edit />
                                </IconButton> 
                            </div>
                            <div className={classes.titulo}>
                                <div className={classes.tituloWithImage}>
                                    <img src='https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png' className={classes.img} />
                                    <h2 className={classes.nameStudent}>{filteredData[0] ? filteredData[0].user_name : 'Nombre del alumno'}</h2> 
                                </div>
                                <h3 className={classes.nombreTarea}>{filteredData[0] ? name : 'Nombre de la tarea'}</h3> 
                                <h3 className={classes.nombreTarea}>{filteredData[0] ? filteredData[0].finish_date :'Fecha de entrega'}</h3>
                            </div>
                            <div className={classes.conteiner}>
                                <div className="w-full">
                                    <div className={classes.subtitulo}>
                                        <h3>Elementos entregados</h3>
                                    </div>
                                    <div className={classes.divTareas}>
                                        <div className={classes.tareas}>
                                            {
                                                urls ? urls.map((t, index) => (
                                                    <>
                                                        <Button elevation={1} className={classes.tarea}>
                                                            <img src='https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png' className={classes.img} />
                                                            {t.url}
                                                        </Button>                                                
                                                    </>
                                                )) : 
                                                    <Button elevation={1} className={classes.tarea} style={{ display: 'flex', justifyContent: 'center'}}>                                                        
                                                        No se encontraron urls disponibles
                                                    </Button>
                                            }                                
                                            {
                                                archivos ? archivos.map((t, index) => (
                                                    <>
                                                        <Button elevation={1} className={classes.tarea}>
                                                            <img src='https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png' className={classes.img} />
                                                            {t.archivo}
                                                        </Button>                                                
                                                    </>
                                                )) : 
                                                    <Button elevation={1} className={classes.tarea} style={{ display: 'flex', justifyContent: 'center' }}>
                                                        No se encontraron archivos disponibles
                                                    </Button>
                                            }                                
                                        </div>                                                                       
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className={classes.subtitulo}>
                                        <h3>Notas del alumno</h3>
                                    </div>
                                    <Card elevation={1} className={classes.notas}>{filteredData[0] ? notas : 'No hay notas disponibles'}</Card>
                                </div>
                                <div className="w-full">
                                    <div className="flex w-full">
                                        <div className={classes.subtituloC}>
                                            <div>
                                                <h3>Calificar tarea</h3>
                                                <div className={classes.calificar}>
                                                    <div className="flex">
                                                        <h4>Calificación</h4><h4 className={classes.asterisco}> *</h4>
                                                    </div>
                                                    <Formsy
                                                        onValidSubmit={handleSubmit}
                                                        onChange={validateForm}
                                                        onValid={enableButton}
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
                                                            value={form.score}
                                                            onChange={handleChange}
                                                            validations={{
                                                                isNumber: function (values, value) {
                                                                    return value >= 0 && value <= 10 ? true : 'La calificación debe ser un numero entre 0 y 10'
                                                                }
                                                            }}
                                                            required
                                                            disabled={activityChanged === false}
                                                        />                                                                                                                                                                
                                                        <TextFieldFormsy
                                                            className={classes.none}
                                                            type="text"
                                                            name="status"
                                                            label="Estado"
                                                            id="status"
                                                            value={form.status}
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
                                                            value={form.user_name}
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
                                                            disabled={activityChanged === false}
                                                        />                                            
                                                    </Formsy>
                                                </div>
                                            </div>                                                        
                                        </div>
                                        <div className={classes.subtituloA}> 
                                            <div>
                                                <h3>Agregar sellos</h3>
                                            </div>
                                            <Card elevation={1} className={classes.sellos}>                                    
                                                <Button className='btnSello' id="1"><img className='sello' id="s1" /></Button>                                    
                                                <Button className='btnSello' id="2"><img className='sello2'/></Button>                                    
                                                <Button className='btnSello' id="3"><img className='sello3'/></Button>                                    
                                                <Button className='btnSello' id="4"><img className='sello4'/></Button>                                    
                                                <Button className='btnSello' id="5"><img className='sello5'/></Button>                                    
                                                <Button className='btnSello' id="6"><img className='sello6'/></Button>                                    
                                                <Button className='btnSello' id="7"><img className='sello7'/></Button>                                    
                                                <Button className='btnSello' id="8"><img className='sello8'/></Button>                                    
                                                <Button className='btnSello' id="9"><img className='sello9'/></Button>                                   
                                                <Button className='btnSello' id="10"><img className='sello10'/></Button>                                   
                                            </Card>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className={classes.subtitulo}>
                                            <h3>Dejar una nota</h3>
                                        </div>
                                        <TextareaAutosize
                                            className={classes.textArea}
                                            aria-label="empty textarea"
                                            style={{ width: '100%', height: '100px' }}                                                                
                                            fullWidth                                                                
                                            className={classes.textArea}
                                            type="text"
                                            name="instructions"
                                            label="Notas del profesor"
                                            id="instructions"
                                            value={textArea}
                                            onChange={handleChangeNotes}     
                                            disabled={activityChanged === false}                                                           
                                        />
                                    </div>
                                    <div className={classes.buttons}>
                                        <Button className={classes.cancelar} variant="outlined" onClick={habilitarInputs}>Cancelar</Button>
                                        <Button className={classes.enviar} onClick={handleSubmit}>Enviar</Button>
                                    </div>
                                </div>                    
                            </div>
                        </Card> 
                        : 
                        <Card elevation={1} className={classes.card2}>
                            <div className={classes.regresar}>
                                <Button to={'/apps/actividades/all'} component={Link} style={{textTransform: 'none'}}><Icon>{'chevron_left'}</Icon>Regresar</Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center h-full">
                                <Typography color="textSecondary" variant="h5">
                                    No hay registros que mostrar!
                                </Typography>
                            </div>
                        </Card>
                }                 
            </FuseAnimateGroup>
        </div>
    )
}

export default ActivitiesGrade;