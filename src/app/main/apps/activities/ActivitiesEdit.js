import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, useHistory } from 'react-router-dom';
import _ from '@lodash';
import axios from 'axios';
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse/core/formsy";
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import { showMessage } from "../../../store/fuse/messageSlice";
import {
    submitCreateActivity,
    submitUpdateActivity,
    removeActivity,
    getSubjects,
    duplicateActivity,
} from './store/activitiesSlice.js';
import { getGroups } from './store/groupSlice';
import { getCategoriesResources } from './store/categoriesResourcesSlice';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
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
    CircularProgress,
    DialogActions,
    Toolbar,
    AppBar
} from '@material-ui/core';
import DeleteButtonDialog from '../components/DeleteButtonDialog';
import CopyButtonDialog from '../components/CopyButtonDialog';
import BackLink from 'app/ui/BackLink';
import { FileConfig, validFile } from 'app/utils/FileConfig';

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
        borderRadius: '10px'
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
        padding: "20px",
        margin: "5px 5px 25px 5px",
    },
    title: {
        color: "#00B1FF",
        fontFamily: `'grobold', 'rager'`,
        fontSize: "20px",
    },
    label: {
        fontFamily: "Poppins",
        fontSize: "15px",
        color: "#353535"
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
    buttonRed: {
        color: "#FF2F54",
        border: "solid #FF2F54 3px",
        '&:hover': {
            background: "#FF2F54",
            borderColor: "#FF2F54",
        },
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
    pagination: {
        '& .MuiPaginationItem-root': {
            color: '#BEBEBE',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            color: '#00B1FF',
            backgroundColor: '#DFF5FF'
        }
    },
    dialogFont: {
        fontSize: '20px',
        color: '#00B1FF',
        fontFamily: 'Poppins'
    },
    redButton: {
        backgroundColor: '#FF2F54',
        '&:hover': {
            backgroundColor: '#FF2F54CC',
        },
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
    },
    iconYellow: {
        fontSize: '80px',
        color: '#F4B335'
    },
}));

const defaultFormState = {
    id: '',
    name: '',
    group_id: '',
    finish_date: '',
    publish_date: '',
    theme: '',
    instructions: '',
    is_active: 1,
    file_path: '',
    subject_id: ''
};

function ActivitiesEdit(props) {

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const routeParams = useParams();
    const history = useHistory();

    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
    const subjects = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.subjects.data);
    const categories = useSelector(({ ActivitiesApp }) => ActivitiesApp.categoriesResources.data);
    const activity = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activity);

    const [dataActivity, setDataActivity] = useState(null);
    const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

    const formRef = useRef(null);
    const urlInputRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [disabledForm, setDisabledForm] = useState(false);

    const [openBackDialog, setOpenBackDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openCopyDialog, setOpenCopyDialog] = useState(null);
    const [openD, setOpenD] = useState(false);

    const [liaSubjects, setLiaSubjects] = React.useState([]);
    const [filteredData, setFilteredData] = useState(null);

    const [resourceName, setResourceName] = React.useState([]);
    const [toDeleteFiles, setToDeleteFiles] = React.useState([]);

    const [bloque, setBloque] = useState(0);
    const [category, setCategory] = useState(0);

    const [page, setPage] = React.useState(1);

    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');

    const [file, setFile] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [publishDate, setPublishDate] = useState("0");

    const [values, setValues] = React.useState({
        loading: false,
        loadingActivity: false,
        loadingDialog: false
    });

    const [fileError, setFileError] = useState();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    var today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)
        + 'T' + ('0' + (today.getHours() + 1)).slice(-2) + ':' + ('0' + (today.getMinutes() + 1)).slice(-2);
    
    var tomorrow = today;
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ('0' + (tomorrow.getDate())).slice(-2)+ 'T00:00';

    useEffect(() => {
        if (!groups || groups.length <= 0) {
            dispatch(getGroups());
        }
        if (!categories || categories.length <= 0) {
            dispatch(getCategoriesResources());
        }

        setOpenCopyDialog(null); 
        setFilteredData(null);
        setPage(1);
        setBloque(0);
        setCategory(0);
        setResourceName([]);
        setLiaSubjects([]);
        setTags([]);
        setTag('');
        setSelectedFiles([]);
        setFile('');
        setDataActivity(null);
        setToDeleteFiles([]);
        setPublishDate("0");

        setForm({ ...defaultFormState });
    }, [routeParams.id,]);

    useEffect(() => {
        if (groups && groups.length > 0) {
            setDisabledForm(false);
            if (routeParams.id && !isNaN(parseInt(routeParams.id))) {
                setValues({ ...values, loadingActivity: true });
                var access_token = window.localStorage.getItem('jwt_access_token');
                axios.get(process.env.REACT_APP_API + '/actividades/actividad/' + routeParams.id, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                }).then((res) => {
                    
                    if (res.data.data.teacher_id == uuid) {
                        setDisabledForm(true);
                        setDataActivity(res.data.data);
                        setActivityDataForm(res.data.data);
                    }
                    setValues({ ...values, loadingActivity: false });
                }).catch((error) => {
                    setValues({ ...values, loadingActivity: false });
                });
            }
        }
    }, [routeParams.id, groups,]);

    function setActivityDataForm(data) {
        const dataForm = {
            id: data.id,
            name: data.name,
            group_id: data.group_id,
            finish_date: data.finish_date.substring(0, 16),
            publish_date: data.public_day,
            instructions: data.instructions,
            is_active: data.is_active
        }
        setPublishDate(data.is_active != 0 ? '0' : '1');
        setForm({ ...dataForm });
        if (data.url_path) {
            data.url_path[0].value ? setTags(data.url_path) : setTags(elements => [...elements, { value: data.url_path }]);
        }
        if (data.file_path) {
            data.file_path.forEach(path => {
                setSelectedFiles(elements => [...elements, { name: path }]);
            })
        }
    }

    useEffect(() => {
        if (form.group_id){
            dispatch(getSubjects(form.group_id || 0));
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
        if (activity.error) {
            if (activity.error.response.request.status == '500') {
                setValues({ ...values, loading: false });
                dispatch(showMessage({ message: activity.error.response.data.message, variant: 'error' }));
            } else {
                disableButton();
                setValues({ ...values, loading: false });
                dispatch(showMessage({ message: activity.error.response.data.message, variant: 'error' }));
            }
        }
        if (activity.success) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));
            history.push("/apps/actividades");
        }
    }, [activity.error, activity.success]);

    function handleSubmit(event, isActive) {
        setOpenBackDialog(false);
        setValues({ ...values, loading: true });
        event.preventDefault();

        var liaResources = [];
        resourceName.forEach(element => {
            liaResources.push(element.id);
        });

        form.url_path = [];
        tags.forEach(element => {
            form.url_path.push(element);
        });

        var archivos = [];
        selectedFiles.forEach(element => {
            element.type && archivos.push(element);
        });

        if (publishDate == 1) {
            form.is_active = 0;
        } else {
            form.is_active = isActive;
            form.publish_date = '';
        }

        if (dataActivity) {
            // editActivity
            dispatch(submitUpdateActivity(form, dataActivity, archivos, liaResources, toDeleteFiles));
        } else {
            // newActivity
            dispatch(submitCreateActivity(form, archivos, liaResources));
        }

    }

    function handleGroupChange(event) {
        handleChange(event);
        setResourceName([]);
        setLiaSubjects([]);
    }

    useEffect(() => {
        if (subjects && subjects.length > 0) {
            if (dataActivity && dataActivity.subject_id) {
                const materia = subjects.find(element => element.id == dataActivity.subject_id);
                materia && materia.id ? setInForm('subject_id', materia.id) : setInForm('subject_id', '');
            } else {
                setInForm('subject_id', '');
            }
        }
    }, [subjects, dataActivity]);

    function setNewSelectedFile(newFile) {
        setSelectedFiles([...selectedFiles, newFile]);
        setFile('');
    }

    function setNewTag(newTag) {
        setTags(tags => [...tags, { value: newTag }]);
        setTag('');
    }

    function handleCheckboxChange(item) {
        if (resourceName.indexOf(item) > -1) {
            setResourceName(resourceName.filter(resource => resource !== item));
        } else {
            setResourceName(resources => [...resources, item]);
        }
    }

    function removeTag(tagValue) {
        setTags(tags.filter(item => item.value !== tagValue));
    }

    function removeSelectedFile(selectedfile) {
        if (!selectedfile.type) {
            setToDeleteFiles(items => [...items, selectedfile.name.split('/')[selectedfile.name.split('/').length - 1]]);
        }
        setSelectedFiles(selectedFiles.filter(item => item !== selectedfile));
    }

    function handleRemove() {
        dispatch(removeActivity(dataActivity.id)).then(() => {
            setOpenDeleteDialog(false);
            history.push("/apps/actividades");
        });

    }
    function copyActivity(id) {
        dispatch(duplicateActivity(id)).then(res => {
            setValues({loadingDialog: false});
            setOpenD(false);
            if (res && res.message == 200) {
                setOpenCopyDialog(res.data.id);
            } else {
                setOpenCopyDialog(null);
                dispatch(showMessage({ message: "No se pudo duplicar la acividad", variant: 'error' }));
            }
        });
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

    useEffect(() => {
        if (form.subject_id && form.group_id) {
            getAttachments();
        }
    }, [form.subject_id]);

    const getAttachments = () => {
        if (typeof form.subject_id === 'number') {
            var access_token = window.localStorage.getItem('jwt_access_token');
            axios.get(process.env.REACT_APP_API + '/filtro', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                params: { id: form.subject_id }
            })
                .then((res) => {
                    if (res.status == 200) {
                        setBloque(0);
                        setCategory(0);
                        setLiaSubjects([...res.data.data]);
                        setResourceName([]);
                        if (dataActivity && dataActivity.resources && dataActivity.resources != 'null' && dataActivity.resources != 'NULL') {
                            const resources = dataActivity.resources.split(',');
                            for (var i = 0; i < resources.length; i++) {
                                var objResult = res.data.data.find(obj => {
                                    return obj.id == resources[i]
                                });
                                if (objResult) {
                                    setResourceName(recursos => [...recursos, objResult]);
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

    function onSelectFile(file, method) {        
        setFileError(null);
        const errorMessage = validFile(FileConfig.teacherHomework, file);
        if(!errorMessage) {
            method(file);
        } else {
            setFileError(errorMessage);
        }
    }

    return (

        <div>
            <Dialog classes={{ paper: 'm-24 rounded-8' }} open={openBackDialog} onClose={() => setOpenBackDialog(false)} maxWidth="sm">
                <DialogContent classes={{ root: 'p-40' }}>
                    <div className="flex">
                        <div className="pr-20 ">
                            <Icon className={classes.iconYellow}>report_problem_outlined</Icon>
                        </div>
                        <div className={classes.dialogFont}>
                            ¿Seguro que deseas salir de esta pantalla? Si no guardas los cambios, se perderá toda la información
                        </div>
                    </div>
                    <div className="flex px-80 pt-10">
                        {!dataActivity || dataActivity.is_active == 2 ?
                            publishDate != 1 ? // Crear Tarea
                                <Button
                                    className={classes.button}
                                    onClick={event => handleSubmit(event, 2)}
                                    disabled={(values.loading || !isFormValid || disabledForm)}
                                >
                                    Guardar borrador
                                </Button>
                                :
                                <Button
                                    className={clsx(classes.button, classes.buttonFill)}
                                    onClick={event => handleSubmit(event, 1)}
                                    type="submit"
                                    disabled={(values.loading || !isFormValid || disabledForm)}
                                >
                                    Crear Tarea
                                </Button>
                            :
                            <Button
                                className={clsx(classes.button, classes.buttonFill)}
                                onClick={event => handleSubmit(event, 1)}
                                disabled={(values.loading || !isFormValid || disabledForm)}
                            >
                                Guardar
                            </Button>
                        }
                        <Button className={clsx(classes.button, classes.buttonRed)} onClick={() => props.history.goBack()}>Salir</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <DeleteButtonDialog 
                openDeleteDialog={openDeleteDialog} 
                setOpenDeleteDialog={setOpenDeleteDialog} 
                handleRemove={handleRemove} 
                texto={'esta actividad'}
            />
            <CopyButtonDialog 
                openCopyDialog={openCopyDialog} 
                setOpenCopyDialog={setOpenCopyDialog} 
                toText={`/apps/editarActividades/${openCopyDialog}`} 
                texto={`La tarea ha sido duplicada con éxito, ¿Quieres verla?${!disabledForm ? ' Los cambios sin guardar serán eliminados.' : ''}`}
            />

            {/* ------------- Confirm Duplicate Dialog -----------*/}
			<Dialog
				classes={{paper: 'm-24 rounded-12'}}
				open={openD}
				onClose={() => setOpenD(false)}
			>
				<AppBar position="static" elevation={1}>
					<Toolbar className="flex w-full text-center items-center justify-center">
						<Typography className='poppins text-20' color="inherit">
							{'Duplicar tarea'}
                    	</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'pt-40 pl-24 pr-24' }}>¿Está seguro que desea duplicar esta actividad?</DialogContent>
				<DialogActions className="justify-between p-16">
					<div className="flex w-full px-16 text-center items-center justify-center p-12">
						<Button
                            className={clsx(classes.button, classes.buttonRed)}
							disabled={values.loadingDialog}
							onClick={() => setOpenD(false)}
						>
							Cancelar
						</Button>
						<Button
							className={clsx(classes.button, classes.buttonFill)}
							disabled={values.loadingDialog}
							color="primary"
							onClick={() => {
								setValues({loadingDialog: true});
                                copyActivity(dataActivity.id);
							}}
							autoFocus
						>
							Aceptar
						</Button>
					</div>
				</DialogActions>
				{ values.loadingDialog ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
			</Dialog>
            
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
                                        {dataActivity ? dataActivity.name : 'Crear Nueva Tarea'}
                                    </Typography>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3 text-right p-12 px-40">
                                    {dataActivity &&
                                        <div className="pb-12">
                                            <Tooltip title={<div style={{ fontSize: '13px' }}>Copiar</div>}>
                                                <span>
                                                    <IconButton className={clsx(classes.blueButton, 'mx-6')} onClick={() => setOpenD(true)}>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.4001 6.6001H8.2001C7.31644 6.6001 6.6001 7.31644 6.6001 8.2001V15.4001C6.6001 16.2838 7.31644 17.0001 8.2001 17.0001H15.4001C16.2838 17.0001 17.0001 16.2838 17.0001 15.4001V8.2001C17.0001 7.31644 16.2838 6.6001 15.4001 6.6001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M3.4 11.4H2.6C2.17565 11.4 1.76869 11.2314 1.46863 10.9314C1.16857 10.6313 1 10.2243 1 9.8V2.6C1 2.17565 1.16857 1.76869 1.46863 1.46863C1.76869 1.16857 2.17565 1 2.6 1H9.8C10.2243 1 10.6313 1.16857 10.9314 1.46863C11.2314 1.76869 11.4 2.17565 11.4 2.6V3.4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
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
                                    <Typography className={classes.label}>
                                        Nombre de la tarea <span className={classes.required}>*</span>
                                    </Typography>
                                    <TextFieldFormsy
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        validations={{
                                            minLength: 2,
                                            maxLength: 50,
                                        }}
                                        validationErrors={{
                                            minLength: 'El mínimo de caracteres permitidos es 2',
                                            maxLength: 'El máximo de caracteres permitidos es 50'
                                        }}
                                        className={classes.textField}
                                        required
                                        disabled={disabledForm}
                                    />
                                </div>
                                <div className="w-full sm:w-1 md:w-1/3 pt-12 px-40">
                                    <Typography className={classes.label}>Materia <span className={classes.required}>*</span></Typography>
                                    {subjects && subjects.length ?
                                        <SelectFormsy
                                            id="subject_id"
                                            name="subject_id"
                                            value={form.subject_id || ''}
                                            onChange={event => {
                                                handleChange(event);
                                                setResourceName([]);
                                                setLiaSubjects([]);
                                            }}
                                            className={classes.select}
                                            displayEmpty
                                            renderValue={form.subject_id != '' ? undefined : () => <div>Seleccionar materia</div>}
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
                                <div className="w-full sm:w-1 md:w-1/3 pt-12 px-40">
                                    <Typography className={classes.label}>
                                        Fecha de entrega <span className={classes.required}>*</span>
                                    </Typography>
                                    <TextFieldFormsy
                                        type="datetime-local"
                                        name="finish_date"
                                        id="finish_date"
                                        value={form.finish_date ? form.finish_date.replace(" ", "T") : form.finish_date}
                                        onChange={handleChange}
                                        inputProps={{
                                            min: form.publish_date ? form.publish_date + "T00:00:00" : date
                                        }}
                                        className={classes.textField}
                                        required
                                        disabled={disabledForm}
                                    />
                                    <div style={{ width: '280px' }}>
                                        <Typography className={clsx(classes.warnig, 'pt-4')}>
                                            Esta tarea estrá visible hasta la fecha de vencimiento
                                        </Typography>
                                    </div>
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full pb-12 px-40" style={{ height: '180px' }}>
                                    <Typography className={classes.label}>Descripción</Typography>
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
                                {!form.subject_id ?
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
                                                        count={Math.floor(filteredData.length / 9) + (filteredData.length % 9 != 0 ? 1 : 0)}
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
                                <div className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                    <Typography className={classes.section}>Adjuntar archivo</Typography>
                                    <div className="pt-6" style={{ color: '#353535', fontSize: '13px' }}>Máximo 7 archivos</div>
                                    {fileError && (<Alert severity="error">{fileError}</Alert>)}
                                    <div className={classes.itemsDiv}>
                                        <div className="w-full sm:w-1 md:w-3/4">
                                            <input
                                                style={{ display: 'none' }}
                                                id="raised-button-file3"
                                                type="file"
                                                accept={[...FileConfig.teacherHomework.image.accepted, ...FileConfig.teacherHomework.documents.accepted]}
                                                onChange={(e) => onSelectFile(e.target.files[0], setFile)}
                                                disabled={disabledForm}
                                            />
                                            <label htmlFor="raised-button-file3">
                                                <Button disabled={disabledForm} component="span" className={classes.textFieldButton} style={{ color: file ? '#353535' : '#A2A2A2' }}>
                                                    {file ? file.name : 'Examinar archivo...'}
                                                </Button>
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-1 md:w-1/4 md:pl-20">
                                            <Button className={classes.button} onClick={() => { setNewSelectedFile(file) }} disabled={!file || selectedFiles.length >= 7 || disabledForm}>Subir</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                    <Typography className={classes.section}>Agregar URL</Typography>
                                    <div className="pt-6" style={{ color: '#353535', fontSize: '13px' }}>Máximo 5 URL</div>
                                    <div className={classes.itemsDiv}>
                                        <div className="w-full sm:w-1 md:w-3/4">
                                            <TextFieldFormsy
                                                type="text"
                                                name="url"
                                                id="url"
                                                value={tag}
                                                onChange={e => setTag(e.target.value)}
                                                className={classes.textField}
                                                placeholder="Coloca aquí la URL"
                                                validations={{
                                                    maxLength: 255,
                                                    isUrl: 'isUrl'
                                                }}
                                                validationErrors={{
                                                    maxLength: 'El máximo de carácteres permitidos es 255',
                                                    isUrl: 'La URL ingresada no es válida'
                                                }}
                                                ref={urlInputRef}
                                                disabled={disabledForm}
                                            />
                                        </div>
                                        <div className="w-full sm:w-1 md:w-1/4 md:pl-20">
                                            <Button
                                                className={classes.button}
                                                onClick={() => setNewTag(tag)}
                                                disabled={!tag || !urlInputRef.current.state.isValid || disabledForm || tags.length >= 5}
                                            >
                                                Subir
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full pt-12 px-40">
                                    <Typography className={classes.section}>Recursos para esta tarea</Typography>
                                </div>
                                <div className="w-full"></div>
                                <div className={classes.itemsDiv}>
                                    {((!selectedFiles || selectedFiles.length <= 0) && (!tags || tags.length <= 0) && (!resourceName || resourceName.length <= 0)) &&
                                        <div className="w-full pt-12 px-40">
                                            <Typography className={clsx(classes.warnig, 'pt-12')}>No se han elegido recursos para esta tarea</Typography>
                                        </div>
                                    }
                                    {(selectedFiles && selectedFiles.length > 0) &&
                                        selectedFiles.map(item => (
                                            <div key={item.name} className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                                <Paper className={classes.resourceItem} elevation={3}>
                                                    <img
                                                        className={classes.resourceIcons}
                                                        src={"assets/images/logos/" +
                                                            ((item.name.split('.')[item.name.split('.').length - 1] == "jpg" || item.name.split('.')[item.name.split('.').length - 1] == "png" || item.name.split('.')[item.name.split('.').length - 1] == "svg" || item.name.split('.')[item.name.split('.').length - 1] == "ico" || item.name.split('.')[item.name.split('.').length - 1] == "jpeg") ?
                                                                "recurso-imagen.svg" :
                                                                ((item.name.split('.')[item.name.split('.').length - 1] == "mp4" || item.name.split('.')[item.name.split('.').length - 1] == "gif" || item.name.split('.')[item.name.split('.').length - 1] == "mpg" || item.name.split('.')[item.name.split('.').length - 1] == "3gp" || item.name.split('.')[item.name.split('.').length - 1] == "avi" || item.name.split('.')[item.name.split('.').length - 1] == "wmv") ?
                                                                    "recurso-video.svg" :
                                                                    ((item.name.split('.')[item.name.split('.').length - 1] == "docx" || item.name.split('.')[item.name.split('.').length - 1] == "doc") ?
                                                                        "recurso-word.svg" :
                                                                        ((item.name.split('.')[item.name.split('.').length - 1] == "xlsx" || item.name.split('.')[item.name.split('.').length - 1] == "xml" || item.name.split('.')[item.name.split('.').length - 1] == "csv") ?
                                                                            "recurso-excel.svg" :
                                                                            ((item.name.split('.')[item.name.split('.').length - 1] == "pptx" || item.name.split('.')[item.name.split('.').length - 1] == "ppt") ?
                                                                                "recurso-powerpoint.svg" :
                                                                                (item.name.split('.')[item.name.split('.').length - 1] == "pdf" ?
                                                                                    "recurso-pdf.svg" :
                                                                                    "Otro.svg"))))))
                                                        }
                                                    />
                                                    {item.type ? item.name : item.name.split('/')[item.name.split('/').length - 1].split(/_(.+)/)[1]}
                                                    <IconButton disabled={disabledForm} className={classes.closeButton} onClick={() => removeSelectedFile(item)}>
                                                        <Icon>close</Icon>
                                                    </IconButton>
                                                </Paper>
                                            </div>
                                        ))
                                    }
                                    {(tags && tags.length > 0) &&
                                        tags.map(item => (
                                            <div key={item.value} className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                                <Paper className={classes.resourceItem} elevation={3}>
                                                    <img className={classes.resourceIcons} src='assets/images/logos/recurso-enlace.svg' />
                                                    {item.value}
                                                    <IconButton disabled={disabledForm} className={classes.closeButton} onClick={() => removeTag(item.value)}>
                                                        <Icon>close</Icon>
                                                    </IconButton>
                                                </Paper>
                                            </div>
                                        ))
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
                                <div className="w-full pt-12 px-40">
                                    <Typography className={classes.section}>Publicación de la tarea</Typography>
                                </div>
                                <div className="w-full"></div>
                                <div className="w-full sm:w-1 md:w-1/2 p-12 px-40">
                                    <RadioGroup className={classes.fontLabel} defaultValue={publishDate} >
                                        <FormControlLabel disabled={disabledForm} value="0" onClick={(ev) => { setInForm('publish_date', ''); setPublishDate(ev.target.value); }} control={<Radio size="small" />} label="Ahora" />
                                        <div className={classes.itemsDiv}>
                                            <div className="w-full sm:w-1 md:w-1/2">
                                                <FormControlLabel
                                                    disabled={disabledForm}
                                                    value="1"
                                                    onClick={(ev) => setPublishDate(ev.target.value)}
                                                    control={<Radio size="small" />}
                                                    label={<div>Fecha de publicación <span className={classes.required}>*</span></div>}
                                                />
                                            </div>
                                            {publishDate == 1 &&
                                                <div className="w-full sm:w-1 md:w-1/2">
                                                    <TextFieldFormsy
                                                        disabled={disabledForm}
                                                        type="date"
                                                        name="publish_date"
                                                        id="publish_date"
                                                        value={form.publish_date ? form.publish_date.replace(" ", "T") : form.publish_date}
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            min: tomorrowDate.split("T", 1)[0],
                                                            max: form.finish_date ? form.finish_date.split("T", 1)[0] : form.finish_date
                                                        }}
                                                        className={classes.textField}
                                                        required
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="w-full sm:w-1 md:w-1/2 p-12 px-40"></div>
                                <div className="w-full"></div>
                                {!disabledForm &&
                                    <div className="w-full pt-12 px-40">
                                        <div className={classes.itemsDiv}>
                                            <div className="w-full sm:w-1 md:w-1/4 md:pl-20"></div>
                                            {!dataActivity || dataActivity.is_active == 2 ?
                                                <>
                                                    <div className="w-full sm:w-1 md:w-1/4 md:pl-20">
                                                        {publishDate != 1 &&
                                                            <Button
                                                                className={classes.button}
                                                                onClick={event => handleSubmit(event, 2)}
                                                                disabled={(values.loading || !isFormValid || disabledForm)}
                                                            >
                                                                Guardar borrador
                                                            </Button>
                                                        }
                                                    </div>

                                                    <div className="w-full sm:w-1 md:w-1/4 md:pl-20">
                                                        <Button
                                                            className={clsx(classes.button, classes.buttonFill)}
                                                            onClick={event => handleSubmit(event, 1)}
                                                            type="submit"
                                                            disabled={(values.loading || !isFormValid || disabledForm)}
                                                        >
                                                            Crear Tarea
                                                        </Button>
                                                    </div>
                                                </>
                                                :
                                                <div className="w-full sm:w-1 md:w-1/2 md:px-160">
                                                    <Button
                                                        className={clsx(classes.button, classes.buttonFill)}
                                                        onClick={event => handleSubmit(event, 1)}
                                                        disabled={(values.loading || !isFormValid || disabledForm)}
                                                    >
                                                        Guardar
                                                    </Button>
                                                </div>
                                            }
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

export default withReducer('ActivitiesApp', reducer)(ActivitiesEdit);
