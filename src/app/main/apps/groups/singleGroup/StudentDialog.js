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
    closeNewStudentDialog,
    closeEditStudentDialog,
    setStudentsAdded,
    setStudentsSearchText
} from './store/studentsSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../../@fuse/core/formsy/SelectFormsy";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StudentsListDialog from './StudentsListDialog';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';

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
        color: "#353535"
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
    input: {
        height: '40px',
        width: '98%',
        borderRadius: '25px',
        alignSelf: "center"
    },
    thead: {
        border: "solid white 4px",
        background: "#60CEFF",
        borderRadius: "13px",
        // borderTopLeftRadius: "13px",
        // borderBottomLeftRadius: "13px",
        height: "40px"
    },
    tdWhite: {
        border: "solid white 4px",
        background: "#F5F5F5",
        textAlign: "start",
        paddingLeft: "10px",
        borderTopLeftRadius: '13px',
        borderBottomLeftRadius: '13px',
        height: "40px",
        flexDirection: "row",
    },
    tdBlue: {
        border: "solid white 4px",
        background: "white",
        textAlign: "start",
        paddingLeft: "10px",
        borderTopLeftRadius: '13px',
        borderBottomLeftRadius: '13px',
        height: "40px"
    },

}));

const defaultFormState = {
    custom_name: '',
    subject_id: '',
    group_id: '',
    activities: 0,
    description: ''

};
let dataList = [];
let idSelected = [];

function StudentDialog(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const studentDialog = useSelector(({ GroupApp }) => GroupApp.students.studentDialog);
    const students = useSelector(({ GroupApp }) => GroupApp.students.data);
	const searchText = useSelector(({ GroupApp }) => GroupApp.students.searchText);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const subjectsAdded = useSelector(({ GroupApp }) => GroupApp.subject.subjectsAdded);
	const mainTheme = useSelector(selectMainTheme);

    const routeParams = useParams();
    console.log(routeParams);

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
        if ((studentDialog.type === 'edit') && studentDialog.data) {
            setForm({ ...studentDialog.data });
        }


        /**
         * Dialog type: 'new'
         */
        if (studentDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...studentDialog.data,
                id: FuseUtils.generateGUID()
            });
        }
    }, [studentDialog.data, studentDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (studentDialog.props.open) {
            initDialog();
        }
    }, [studentDialog.props.open, initDialog]);

    useEffect(() => {
        if (subjectsAdded.status == true) {
            setValues({ ...values, loading: false });
            dispatch(showMessage({ message: 'Materia Agregada.', variant: 'info' }));
            closeComposeDialog();
        }
    }, [subjectsAdded.status]);

    function closeComposeDialog() {
        return (studentDialog.type === 'edit') ? dispatch(closeEditStudentDialog()) : dispatch(closeNewStudentDialog());
        // return  dispatch(closeNewSubjectDialog());
    }

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();
        // dispatch(setStudentsAdded(newGroup));
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
            {...studentDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            // maxWidth="xs"
        >
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full text-center items-center justify-center">
                    <Typography className={classes.titleDialog} color="inherit">
                        {studentDialog.type === 'new' && 'Añadir Alumno'}
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
                   <StudentsListDialog />
                </DialogContent>

                {values.loading && <LinearProgress />}

            </Formsy>
        </Dialog>
    );
}

export default StudentDialog;