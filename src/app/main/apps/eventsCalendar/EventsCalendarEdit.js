import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import _ from '@lodash';
import axios from 'axios';
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse/core/formsy";
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import { showMessage } from "../../../store/fuse/messageSlice";
import {
    getSubjects,
    getGroups,
} from './store/calendarSlice.js';
import { getCategoriesResources } from './store/categoriesResourcesSlice';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import {
    Typography,
    MenuItem,
    LinearProgress,
    Card,
    Button,
    Dialog,
    DialogContent,
    Icon,
    IconButton,
    Radio,
    Paper,
    RadioGroup,
    Tooltip,
    Checkbox,
    FormControlLabel,
    CircularProgress
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { submitEvent, removeEvent, updateEvent } from './store/eventsSlice';
import BackButtonDialog from '../components/BackButtonDialog';
import DeleteButtonDialog from '../components/DeleteButtonDialog';
import BackLink from 'app/ui/BackLink';

const useStyles = makeStyles(theme => ({
    card: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
        margin: "5px 5px 25px 5px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)",
    },
    required: {
        color: '#00B1FF',
        display: 'inline-block'
    },
    form: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px", // quita este pls
        margin: "5px 5px 25px 5px", // este tambien pls
    },
    title: {
        color: "#00B1FF",
        fontFamily: `'grobold', 'rager'`,
        fontSize: "20px",
    },
    label: {
        fontFamily: "Poppins",
        fontSize: "15px",
    },
    section: {
        fontFamily: "Poppins",
        fontSize: "16px",
        color: "#00B1FF",
    },
    warnig: {
        fontFamily: "Poppins",
        fontSize: "13px",
        color: "#BEBEBE"
    },
    mini: {
        fontFamily: "Poppins",
        fontSize: "9px",
        color: "#BEBEBE",
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    itemOverflow: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    select: {
        alignContent: "left",
        textAlign: "left",
        width: "100%",
        marginTop: "8px",
        marginRight: "7px",
        '& .MuiSelect-select': {
            borderRadius: "10px",
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
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& .MuiSelect-select.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
    },
    menuItem: {
        fontFamily: 'Poppins',
    },
    '& .hr': {
        display: 'block',
        height: '1px',
        borderTop: '1px solid #BEBEBE',
        marginLeft: '20px',
        marginTop: '20px'
    },
    itemsDiv: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "left",
        width: "100%",
        '& .MuiTypography-body1': {
            fontFamily: 'Poppins',
        }
    },
    itemsDiv2: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "left",
        width: "100%",
        height: "100%",
    },
    fontLabel: {
        '& .MuiTypography-body1': {
            fontFamily: 'Poppins',
            color: '#353535'
        }
    },
    textField: {
        width: "100%",
        height: "35px",
        marginTop: "8px",
        alignContent: "left",
        textAlign: "left",
        '& .MuiInput-root': {
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "transparent",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiSvgIcon-root': {
            color: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    textFieldButton: {
        backgroundColor: 'transparent',
        width: "100%",
        borderRadius: "10px",
        background: "transparent",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #BEBEBE 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        fontWeight: 'normal',
        color: '#353535',
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
    button: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        borderRadius: "45px",
        background: "transparent",
        color: "#00B1FF",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #00B1FF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: "#60CEFF",
            color: "#fff",
            borderColor: "#60CEFF",

        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    buttonRed: {
        color: "#FF2F54",
        border: "solid #FF2F54 3px",
        '&:hover': {
            background: "#FF2F54",
            borderColor: "#FF2F54",
        },
    },
    buttonFill: {
        background: "#60CEFF",
        color: "#fff",
        border: "solid #60CEFF 3px",
        '&:hover': {
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    resourceIcons: {
        padding: '5px',
        height: '100%',
        position: 'absolute',
        left: '5px'
    },
    closeButton: {
        position: 'absolute',
        right: '5px',
        color: '#BEBEBE',
        fontWeight: 'bold'
    },
    resourceName: {
        color: '#353535',
        width: '350px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    blueButton: {
        backgroundColor: '#00B1FF',
        '&:hover': {
            backgroundColor: '#00B1FFCC',
        },
    },
    yellowButton: {
        backgroundColor: '#F4B335',
        '&:hover': {
            backgroundColor: '#F4B335CC',
        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
    redButton: {
        backgroundColor: '#FF2F54',
        '&:hover': {
            backgroundColor: '#FF2F54CC',
        },
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            color: '#BEBEBE',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            color: '#00B1FF',
            backgroundColor: '#DFF5FF'
        }
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
        position: 'relative'
    }
}));

const defaultFormState = {
    id: '',
    description: '',
    week: false,
    group_id: ''
};

function EventsCalendarEdit(props) {

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const routeParams = useParams();
    const history = useHistory();

    const groups = useSelector(({ EventsCalendarEditApp }) => EventsCalendarEditApp.calendar.groups.data);
    const subjects = useSelector(({ EventsCalendarEditApp }) => EventsCalendarEditApp.calendar.subjects.data.calendars);
    const categories = useSelector(({ EventsCalendarEditApp }) => EventsCalendarEditApp.categoriesResources.data);
    const event = useSelector(({ EventsCalendarEditApp }) => EventsCalendarEditApp.event.event);
    const group_id = useSelector(({ EventsCalendarEditApp }) => EventsCalendarEditApp.calendar.group.group);


    const [dataEvent, setDataEvent] = useState(null);
    const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

    const formRef = useRef(null);
    const urlInputRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [disabledForm, setDisabledForm] = useState(false);

    const [openBackDialog, setOpenBackDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openCopyDialog, setOpenCopyDialog] = useState(null);

    const [liaSubjects, setLiaSubjects] = React.useState([]);
    const [filteredData, setFilteredData] = useState(null);

    const [resourceName, setResourceName] = React.useState([]);

    const [bloque, setBloque] = useState(0);
    const [category, setCategory] = useState(0);

    const [page, setPage] = React.useState(1);

    var startDate = null;
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [week, setWeek] = useState(false);
    const [days, setDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
    });

    const [values, setValues] = React.useState({
        loading: false,
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    var today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)
        + 'T' + ('0' + (today.getHours() + 1)).slice(-2) + ':' + ('0' + (today.getMinutes() + 1)).slice(-2);

    useEffect(() => {
        if (!groups || groups.length <= 0) {
            dispatch(getGroups());
        }
        if (!categories || categories.length <= 0) {
            dispatch(getCategoriesResources());
        }

        setFilteredData(null);
        setPage(1);
        setBloque(0);
        setCategory(0);
        setResourceName([]);
        setLiaSubjects([]);
        setDataEvent(null);
        setOpenCopyDialog(null);

        setForm({
            ...defaultFormState,
        });

    }, [routeParams.id,]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {

        startDate = new Date(selectedDate);
        setSelectedStartDate(startDate);
        setSelectedEndDate(startDate);

    }, [selectedDate]);

    const handleEndChange = (date) => {
        setSelectedEndDate(date);
    };

    useEffect(() => {
        if (groups && groups.length > 0) {
            setDisabledForm(false);
            if (routeParams.calendar_id && routeParams.event_id) {
                setValues({ ...values, loadingActivity: true });
                var access_token = window.localStorage.getItem('jwt_access_token');
                axios.get(process.env.REACT_APP_API+'/google/calendars/events', {
                    params: {calendar_id: routeParams.calendar_id, event_id: routeParams.event_id},
                    headers: {'Authorization': `Bearer ${access_token}`},
                }).then(response => {
                    if (response.data && response.data.data) {
                        setDisabledForm(true);
                        setDataEvent(response.data.data);
                        setEventDataForm(response.data.data);
                    }
                    setValues({ ...values, loadingActivity: false });
                }).catch(error => {
                    setValues({ ...values, loadingActivity: false });
                });
            }
        }
    }, [routeParams, groups,]);

    function setEventDataForm(data) {

        var descripcion = data.description.split('>',2)[1];
        descripcion = descripcion.split('<',1)[0];
        const dataForm = {
            group_id: data.group_id,
            description: descripcion,
        }
        setSelectedDate(data.start);
        setSelectedStartDate(data.start);
        setSelectedEndDate(data.end);
        setForm({ ...dataForm });
    }

    useEffect(() => {
        if (groups && groups.length > 0 && group_id && group_id != 0 && !isNaN(parseInt(group_id))) {
            setInForm('group_id', group_id);
        }
    }, [groups, group_id,]);

    useEffect(() => {
        if (form.group_id) {
            dispatch(getSubjects({ group_id: form.group_id }));
        }
    }, [form.group_id]);

    useEffect(() => {
        function getFilteredArray() {
            setPage(1);
            if (bloque === 0 && category === 0) {
                return liaSubjects;
            }
            return _.filter(liaSubjects, item => {
                if ((item.bloque == bloque || bloque == 0) && (item.id_category == category || category == 0)) {
                    return item;
                }
                return false;
            });
        }

        if (liaSubjects) {
            setFilteredData(getFilteredArray());
        }
    }, [liaSubjects, bloque, category]);

    useEffect(() => {
        if (event.error) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Error al crear el evento!', variant: 'error' }));
        }
        if (event.success) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
            history.push("/apps/eventscalendar/" + form.group_id);
        }
    }, [event.error, event.success]);

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();

        if (dataEvent) {
            dispatch(updateEvent(form, selectedStartDate, selectedEndDate, resourceName, routeParams.calendar_id, routeParams.event_id));
        } else {
            dispatch(submitEvent(form, selectedDate, selectedStartDate, selectedEndDate, week, days, resourceName));
        } 
        

    }

    function handleGroupChange(event) {
        handleChange(event);
        setResourceName([]);
        setLiaSubjects([]);
    }

    useEffect(() => {
        if (subjects && subjects.length > 0) {
            if (dataEvent && dataEvent.id) {
                const materia = subjects.find(element => element.id == dataEvent.id);
                materia && materia.id ? setInForm('id', materia.id) : setInForm('id', '');
            } else {
                setInForm('id', '');
            }
        }
    }, [subjects, dataEvent]);

    function handleCheckboxChange(item) {
        if (resourceName.indexOf(item) > -1) {
            setResourceName(resourceName.filter(resource => resource !== item));
        } else {
            setResourceName(resources => [...resources, item]);
        }
    }

    function handleRemove() {
        dispatch(removeEvent({calendar_id: routeParams.calendar_id, event_id: routeParams.event_id})).then(() => {
            setOpenDeleteDialog(false);
            history.push("/apps/eventscalendar/" + form.group_id);
        });
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        if (form.id){
            setIsFormValid(true);
        }
    }

    function validateForm(values) {
        setForm(values);
    }

    useEffect(() => {
        if (form.id && form.group_id) {
            getAttachments();
        }
    }, [form.id]);

    const getAttachments = () => {
        if (typeof form.id === 'number') {
            var access_token = window.localStorage.getItem('jwt_access_token');
            axios.get(process.env.REACT_APP_API + '/filtro', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                params: { id: form.id }
            })
                .then((res) => {
                    if (res.status == 200) {
                        setBloque(0);
                        setCategory(0);
                        setLiaSubjects([...res.data.data]);
                        setResourceName([]);
                        if (dataEvent && dataEvent.description) {
                            var recursos = dataEvent.description.split('*');
                            recursos = JSON.parse(recursos[2]);
                            if (recursos) {
                                for (var i = 0; i < recursos.length; i++) {
                                    var objResult = res.data.data.find(obj => {
                                        return obj.url_resource == recursos[i].url && obj.name == recursos[i].name;
                                    });
                                    if (objResult) {
                                        setResourceName(recursos => [...recursos, objResult]);
                                    }
                                }
                            }
                        }
                    } else {
                        alert('No se pudo consultar el material de apoyo');
                    }
                }).catch((error) => {
                    alert('No se pudo obtener el material de apoyo');
                });
        }
    }

    const onBack = env => { 
        env.preventDefault(); 
        !disabledForm ? setOpenBackDialog(true) : props.history.goBack(); 
    }
    
    return (

        <div>
            <BackButtonDialog 
                openBackDialog={openBackDialog} 
                setOpenBackDialog={setOpenBackDialog} 
                goBack={props.history.goBack}
            />
            <DeleteButtonDialog 
                openDeleteDialog={openDeleteDialog} 
                setOpenDeleteDialog={setOpenDeleteDialog} 
                handleRemove={handleRemove} 
                texto={'este evento'}
            />
            <FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >
                <Formsy
                    onValidSubmit={handleSubmit}
                    onChange={validateForm}
                    onValid={enableButton}
                    onInvalid={disableButton}
                    ref={formRef}
                    className={classes.form}
                >
                    <Card elevation={1} className={classes.card}>
                        {values.loadingActivity || !groups ?
                            <div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
                                <div className="text-20 mb-16">
                                    Consultando información...
                                </div>
                                <CircularProgress color="primary" />
                            </div>
                            :
                            <>
                                <BackLink onBack={onBack} />
                                <div className="w-full sm:w-1 md:w-1/3 text-center p-12 px-40">
                                    <Typography className={classes.title}>
                                        {dataEvent ? !disabledForm ? 'Editar Clase' : 'Ver Clase' : 'Crear Clase'}
                                    </Typography>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3 text-right p-12 px-40">
                                    {dataEvent &&
                                        <div className="pb-12">
                                            <Tooltip title={<div style={{ fontSize: '13px' }}>Editar</div>}>
                                                <span>
                                                    <IconButton className={clsx(classes.yellowButton, 'mx-6')} disabled={!disabledForm} onClick={() => setDisabledForm(!disabledForm)}>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.15659 2.68652H2.59035C2.16857 2.68652 1.76405 2.85408 1.4658 3.15233C1.16755 3.45058 1 3.85509 1 4.27688V15.4093C1 15.8311 1.16755 16.2356 1.4658 16.5339C1.76405 16.8321 2.16857 16.9997 2.59035 16.9997H13.7228C14.1446 16.9997 14.5491 16.8321 14.8474 16.5339C15.1456 16.2356 15.3132 15.8311 15.3132 15.4093V9.84311" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M14.1203 1.49406C14.4367 1.17772 14.8657 1 15.3131 1C15.7605 1 16.1895 1.17772 16.5059 1.49406C16.8222 1.8104 16.9999 2.23945 16.9999 2.68682C16.9999 3.1342 16.8222 3.56325 16.5059 3.87959L8.9517 11.4338L5.771 12.2289L6.56617 9.04824L14.1203 1.49406Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title={<div style={{ fontSize: '13px' }}>Eliminar</div>}>
                                                <span>
                                                    <IconButton className={clsx(classes.redButton, 'mx-6')} onClick={() => setOpenDeleteDialog(true)}>
                                                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 4.55566H2.77778H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M5.4445 4.55556V2.77778C5.4445 2.30628 5.6318 1.8541 5.9652 1.5207C6.2986 1.1873 6.75078 1 7.22228 1H10.7778C11.2493 1 11.7015 1.1873 12.0349 1.5207C12.3683 1.8541 12.5556 2.30628 12.5556 2.77778V4.55556M15.2223 4.55556V17C15.2223 17.4715 15.035 17.9237 14.7016 18.2571C14.3682 18.5905 13.916 18.7778 13.4445 18.7778H4.55561C4.08411 18.7778 3.63193 18.5905 3.29853 18.2571C2.96513 17.9237 2.77783 17.4715 2.77783 17V4.55556H15.2223Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M7.22217 9V14.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M10.7778 9V14.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </div>
                                    }
                                    {groups ?
                                        <SelectFormsy
                                            id="group_id"
                                            name="group_id"
                                            value={form.group_id}
                                            onChange={(ev) => { handleGroupChange(ev) }}
                                            className={classes.select}
                                            displayEmpty
                                            required
                                            renderValue={
                                                form.group_id != '' ? undefined : () => <div>Seleccionar grupo <span className={classes.required}>*</span></div>
                                            }
                                            disabled={disabledForm}
                                        >
                                            {groups.map((row) => (
                                                <MenuItem className={classes.menuItem} key={row.name} value={row.id}>{row.name}</MenuItem>
                                            ))}
                                        </SelectFormsy>
                                        :
                                        <CircularProgress color="primary" />
                                    }
                                </div>
                                <div className="w-full pt-12"></div>

                                <div className="w-full sm:w-1 md:w-1/3 pt-12 px-40">
                                    <Typography className={classes.label}>Materia <span className={classes.required}>*</span></Typography>
                                    {subjects && subjects.length ?
                                        <SelectFormsy
                                            id="id"
                                            name="id"
                                            value={form.id || ''}
                                            onChange={event => {
                                                handleChange(event);
                                                setResourceName([]);
                                                setLiaSubjects([]);
                                            }}
                                            className={classes.select}
                                            displayEmpty
                                            renderValue={form.id != '' ? undefined : () => <div>Seleccionar materia</div>}
                                            required
                                            disabled={disabledForm}
                                        >
                                            {subjects.map((row) => (
                                                <MenuItem className={classes.menuItem} key={row.custom_name} value={row.id}>{row.custom_name}</MenuItem>
                                            ))}
                                        </SelectFormsy>
                                        :
                                        form && form.group_id ?
                                            <Typography className={clsx(classes.warnig, 'pt-12')}>
                                                Es necesario crear materias para este grupo <span className={classes.required}>*</span>
                                            </Typography>
                                            :
                                            <Typography className={clsx(classes.warnig, 'pt-12')}>
                                                No se ha seleccionado un grupo
                                            </Typography>
                                    }
                                </div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className="w-full sm:w-1 md:w-1/3 pt-12 px-40">
                                        <Typography className={classes.label}>
                                            Fecha <span className={classes.required}>*</span>
                                        </Typography>

                                        <KeyboardDatePicker
                                            disableToolbar
                                            format="yyyy-MM-dd"
                                            name="start"
                                            id="start"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className={classes.textField}
                                            required
                                            disabled={disabledForm}
                                            invalidDateMessage={'Fecha inválida'}
                                        />


                                    </div>

                                    <div className="w-full flex flex-wrap sm:w-1 md:w-1/3 pt-12 px-40">
                                        <div className="w-1/2 pr-6">
                                            <Typography className={classes.label}>
                                                Inicio <span className={classes.required}>*</span>
                                            </Typography>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="start"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                className={classes.textField}
                                                required
                                                disabled={disabledForm}
                                                invalidDateMessage={'Hora inválida'}
                                            />
                                        </div>
                                        <div className="w-1/2 pl-6">
                                            <Typography className={classes.label}>
                                                Cierre <span className={classes.required}>*</span>
                                            </Typography>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="end"
                                                value={selectedEndDate}
                                                onChange={handleEndChange}
                                                className={classes.textField}
                                                required
                                                disabled={disabledForm}
                                                invalidDateMessage={' '}
                                            />
                                        </div>
                                    </div>
                                </MuiPickersUtilsProvider>
                                <div className="w-full"></div>
                                <div className="w-full pb-12 px-40" style={{ height: '180px' }}>
                                    <Typography className={classes.label}>Descripción</Typography>
                                    <TextFieldFormsy
                                        multiline
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        validations={{
                                            maxLength: 400
                                        }}
                                        validationErrors={{
                                            maxLength: 'El máximo de carácteres permitidos es 400'
                                        }}
                                        className={classes.textField}
                                        rowsMax={7}
                                        rows={7}
                                        disabled={disabledForm}
                                    />
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full pt-12 px-40">
                                    <Typography className={classes.section}>Actividades LIA</Typography>
                                </div>
                                <div className="w-full"></div>
                                {!form.id ?
                                    <div className="w-full pt-12 px-40">
                                        <Typography className={clsx(classes.warnig, 'pt-12')}>No se ha seleccionado una materia</Typography>
                                    </div>
                                    :
                                    liaSubjects.length <= 0 ?
                                        <div className="w-full pt-12 px-40">
                                            <Typography className={clsx(classes.warnig, 'pt-12')}>No hay actividades para esta materia</Typography>
                                        </div>
                                        :
                                        <>
                                            <div className="w-full pt-6 px-40" style={{ color: '#353535', fontSize: '13px' }}>Máximo 5 actividades</div>
                                            <div className="w-full sm:w-1 md:w-1/3 p-12 px-40">
                                                <SelectFormsy
                                                    id="bloque"
                                                    name="bloque"
                                                    value={bloque}
                                                    onChange={ev => setBloque(ev.target.value)}
                                                    className={classes.select}
                                                    renderValue={
                                                        bloque != 0 ? undefined : () => <div style={{ color: '#353535' }}>Selecciona un bloque</div>
                                                    }
                                                >
                                                    <MenuItem className={classes.menuItem} key={'todos'} value={0}>Todos</MenuItem>
                                                    <MenuItem className={classes.menuItem} key={'bloque1'} value={1}>Bloque 1</MenuItem>
                                                    <MenuItem className={classes.menuItem} key={'bloque2'} value={2}>Bloque 2</MenuItem>
                                                    <MenuItem className={classes.menuItem} key={'bloque3'} value={3}>Bloque 3</MenuItem>
                                                </SelectFormsy>
                                            </div>
                                            <div className="w-full sm:w-1 md:w-1/3 p-12 px-40">
                                                {categories &&
                                                    <SelectFormsy
                                                        id="id_category"
                                                        name="id_category"
                                                        value={category}
                                                        onChange={ev => setCategory(ev.target.value)}
                                                        className={classes.select}
                                                        renderValue={
                                                            category != 0 ? undefined : () => <div style={{ color: '#353535' }}>Selecciona un tipo de actividad</div>
                                                        }
                                                    >
                                                        <MenuItem className={classes.menuItem} key={'todos2'} value={0}>Todos</MenuItem>
                                                        {categories.map((row) => (
                                                            <MenuItem className={classes.menuItem} key={row.name} value={row.id}>{row.name}</MenuItem>
                                                        ))
                                                        }
                                                    </SelectFormsy>
                                                }
                                            </div>
                                            <div className="w-full sm:w-1 md:w-1/3 p-12 px-40"></div>
                                            <div className="w-full"></div>
                                            {filteredData.length > 0 ?
                                                <>
                                                    <div className={classes.itemsDiv}>
                                                        {filteredData.slice((page - 1) * 9, ((page - 1) * 9) + 9).map((item) => (
                                                            (bloque == 0 || item.bloque == bloque) &&
                                                            (category == 0 || item.id_category == category) &&

                                                            <React.Fragment key={item.name + item.id}>
                                                                <Tooltip
                                                                    title={
                                                                        <p><strong>{item.name}</strong><br />{item.description ? item.description : ''}</p>

                                                                    }
                                                                >
                                                                    <span className="w-full sm:w-1 md:w-1/3 p-12 px-40">
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={resourceName.indexOf(item) > -1}
                                                                                    onChange={(ev) => handleCheckboxChange(item)}
                                                                                    disabled={disabledForm || (resourceName.indexOf(item) <= -1 && resourceName.length >= 5)}
                                                                                />
                                                                            }
                                                                            label={item.name.length <= 60 ? item.name : `${item.name.substr(0, 60)}...`}
                                                                        />
                                                                        <Typography className={clsx(classes.mini, 'ml-20')}>
                                                                            {item.description ? item.description : '.'}
                                                                        </Typography>
                                                                        <hr className="ml-20 pt-6" />
                                                                    </span>
                                                                </Tooltip>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    <Pagination
                                                        count={Math.floor(filteredData.length / 9) + 1}
                                                        page={page}
                                                        onChange={handlePageChange}
                                                        size="small"
                                                        className={classes.pagination}
                                                    />
                                                </>
                                                :
                                                <div className="w-full pt-12 px-40">
                                                    <Typography className={clsx(classes.warnig, 'pt-12')}>
                                                        No hay actividades de esa categoría o bloque
                                                    </Typography>
                                                </div>
                                            }
                                        </>
                                }
                                <div className="w-full"></div>
                                
                                
                                <div className="w-full pt-12 px-40">
                                    <Typography className={classes.section}>Recursos para esta tarea</Typography>
                                </div>
                                <div className="w-full"></div>
                                <div className={classes.itemsDiv}>
                                    {((!resourceName || resourceName.length <= 0)) &&
                                        <div className="w-full pt-12 px-40">
                                            <Typography className={clsx(classes.warnig, 'pt-12')}>No se han elegido recursos para esta tarea</Typography>
                                        </div>
                                    }
                                    {(categories && categories.length > 0 && resourceName && resourceName.length > 0) &&
                                        resourceName.map(item => (
                                            <div key={item.name} className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                                <Paper className={classes.resourceItem} elevation={3}>
                                                    <img className={classes.resourceIcons} src={'assets/images/resources/iconos/' + categories.find(element => element.id == item.id_category).name.replace('ó', 'o').replace('á', 'a') + '.svg'} />
                                                    {item.name}
                                                    <IconButton disabled={disabledForm} className={classes.closeButton} onClick={() => handleCheckboxChange(item)}>
                                                        <Icon>close</Icon>
                                                    </IconButton>
                                                </Paper>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="w-full"></div>
                                {!disabledForm &&
                                    <div className="w-full pt-12 px-40">
                                        <div className={classes.itemsDiv}>
                                            <div className="w-full sm:w-1 md:w-1/4 md:pl-20"></div>
                                            <div className="w-full sm:w-1 md:w-1/2 md:px-160">
                                                <Button
                                                    className={clsx(classes.button, classes.buttonFill)}
                                                    onClick={event => handleSubmit(event)}
                                                    type="submit"
                                                    disabled={(values.loading || !isFormValid || disabledForm)}
                                                >
                                                    {!dataEvent ? 'Crear clase' : 'Guardar'}
                                                </Button>
                                            </div>
                                            <div className="w-full sm:w-1 md:w-1/4 md:pl-20"></div>
                                        </div>
                                    </div>
                                }
                                <div className="w-full pt-20">
                                    {values.loading && <LinearProgress />}
                                </div>
                            </>
                        }
                    </Card>
                </Formsy>
            </FuseAnimateGroup>
        </div>
    )
}

export default withReducer('EventsCalendarEditApp', reducer)(EventsCalendarEdit);
