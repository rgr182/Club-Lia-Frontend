import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { submitCreateSubject } from './store/subjectSlice';
import clsx from 'clsx';
import { showMessage } from "../../../../store/fuse/messageSlice";
import {
    closeNewSubjectDialog,
    closeEditSubjectDialog,
    submitCreateSubject,
    submitUpdateSubject,
    registerReset,
    setSubjectsAdded
} from './store/subjectSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../../@fuse/core/formsy/SelectFormsy";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
        width: "100%",
        height: "35px",
        marginTop: "4px",
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
    titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
    },
    label: {
        fontFamily: "Poppins",
        fontSize: "15px",
        color: '#353535'
    },
    button: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "124px",
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
    buttonCancel: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "124px",
        borderRadius: "45px",
        background: "transparent",
        color: "#FF2F54",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #FF2F54 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: "#FF2F54",
            color: "#fff",
            borderColor: "#FF2F54",

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

}));

const defaultFormState = {
    custom_name: '',
    subject_id: '',
    group_id: '',
    activities: 0,
    description: ''

};

function SubjectDialog(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const subjectDialog = useSelector(({ GroupApp }) => GroupApp.subject.subjectDialog);
    const formOrigin = useSelector(({ GroupApp }) => GroupApp.subject.subjectDialog.data);
    const subject = useSelector(({ GroupApp }) => GroupApp.subject.subject);
    const subjectList = useSelector(({ GroupApp }) => GroupApp.subject.subjectList.data);
    const groups = useSelector(({ GroupApp }) => GroupApp.subject.groups.data);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const subjectsAdded = useSelector(({ GroupApp }) => GroupApp.subject.subjectsAdded);
    const routeParams = useParams();

    const [values, setValues] = React.useState({
        loading: false
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    function disableButton() {
        setIsFormValid(false);
    }

    const initDialog = useCallback(() => {
        // /**
        //  * Dialog type: 'edit'
        //  */
        if ((subjectDialog.type === 'edit') && subjectDialog.data) {
            setForm({ ...subjectDialog.data });
        }


        /**
         * Dialog type: 'new'
         */
        if (subjectDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...subjectDialog.data,
                id: FuseUtils.generateGUID()
            });
        }
    }, [subjectDialog.data, subjectDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (subjectDialog.props.open) {
            initDialog();
        }
    }, [subjectDialog.props.open, initDialog]);

    useEffect(() => {
        if (subjectsAdded.status == true) {
            dispatch(showMessage({ message: 'Materia Agregada.', variant: 'info' }));
            setValues({ ...values, loading: false });
            closeComposeDialog();
        }
    }, [subjectsAdded.status]);

    function closeComposeDialog() {
        return (subjectDialog.type === 'edit') ? dispatch(closeEditSubjectDialog()) : dispatch(closeNewSubjectDialog());
        // return  dispatch(closeNewSubjectDialog());
    }

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();

        let newGroup = {
            subject_id: form.subject.id,
            custom_name: form.custom_name,
            custom_color: form.subject.base_color,
            description: form.description,
            
        };
        
        dispatch(setSubjectsAdded(newGroup));
    }


    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        setForm(values);
    }
    return (
        <Dialog
            classes={{
                paper: 'm-24 rounded-12'
            }}
            {...subjectDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full text-center items-center justify-center">
                    <Typography className={classes.titleDialog} color="inherit">
                        {subjectDialog.type === 'new' && 'Añadir Materia'}
                        {subjectDialog.type === 'edit' && 'Editar Materia'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Formsy
                onValidSubmit={handleSubmit}
                onChange={validateForm}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col md:overflow-hidden"
            >
                <DialogContent classes={{ root: 'p-24' }}>

                    <div className="w-full pt-12 px-20">
                        <Typography className={classes.label}>
                        Nombre de la materia <span className={classes.required}>*</span>
                        </Typography>
                        <TextFieldFormsy
                            fullWidth
                            className={classes.textField}
                            type="text"
                            name="custom_name"
                            // label="Nombre de la materia"
                            id="custom_name"
                            value={form.custom_name || ''}
                            onChange={handleChange}
                            validations={{
                                minLength: 2,
                                maxLength: 30,
                            }}
                            validationErrors={{
                                minLength: 'El minimo de caracteres permitidos es 4',
                                maxLength: 'El máximo de caracteres permitidos es 30'
                            }}
                            className={classes.textField}
                            required
                        />
                    </div>
                    <div className="w-full pt-12 px-20">
                        <Typography className={classes.label}>
                        Materia Base <span className={classes.required}>*</span>
                        </Typography>
                        <SelectFormsy
                            id="subject"
                            name="subject"
                            width="100%"
                            value={form.subject}
                            onChange={handleChange}
                            // label="Materia Base"
                            fullWidth
                            className={classes.textField}
                            required
                        >
                            {subjectList.map((row) => (
                                <MenuItem key={row.id} value={row}>{row.name}</MenuItem>
                            ))
                            }
                        </SelectFormsy>
                    </div>
                    <div className="w-full pt-12 mb-40 px-20">
                        <Typography className={classes.label}>
                        Descripción
                        </Typography>

                        <TextFieldFormsy
                            fullWidth
                            multiline
                            type="text"
                            name="description"
                            id="custom_name"
                            value={form.description || ''}
                            rows={4}
                            validations={{
                                maxLength: 150
                            }}
                            validationErrors={{
                                maxLength: 'El máximo de carácteres permitidos es 150'
                            }}
                            onChange={handleChange}
                            className={classes.textField}
                        />
                    </div>

                </DialogContent>

                {values.loading && <LinearProgress />}

                {subjectDialog.type === 'new' ? (
                    <DialogActions className="p-8 w-full">
                        <div className="flex w-full px-16 text-center items-center justify-center p-12">
                            <Button className={classes.buttonCancel} 
                            onClick={() => dispatch(closeNewSubjectDialog())}
                            >Cancelar</Button>
                            <Button
                                className={clsx(classes.button, classes.buttonFill)}
                                onClick={handleSubmit}
                                disabled={(values.loading || !isFormValid)}
                            >
                                Agregar
							</Button>
                        </div>
                    </DialogActions>
                )
                : null
                }
                {subjectDialog.type === 'edit' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={(values.loading || !isFormValid)}
                            >
                                Actualizar
							</Button>
                        </div>
                    </DialogActions>
                )
                    : null
                }
            </Formsy>
        </Dialog>
    );
}

export default SubjectDialog;
