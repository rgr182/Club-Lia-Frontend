import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddToGroupsDialog, getStudentGroupsIsNotIn } from '../store/studentSlice';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Formsy from "formsy-react";
import { useParams } from 'react-router-dom';
import GroupsListDialog from './GroupsListDialog';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
    },
    input: {
        height: '40px',
        width: '98%',
        borderRadius: '25px',
        alignSelf: "center"
    },
}));

const defaultFormState = {
};

function AddToGroupsDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const routeParams = useParams();

    const addToGroupsDialog = useSelector(({ GroupsApp }) => GroupsApp.student.addToGroupsDialog);
    const mainTheme = useSelector(selectMainTheme);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [searchText, setSearchText] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    const [values, setValues] = React.useState({
        loading: false
    });

    function closeComposeDialog() {
        return dispatch(closeAddToGroupsDialog());
    }

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (addToGroupsDialog.props.open) {
            dispatch(getStudentGroupsIsNotIn(routeParams.id));
            setForm({ ...defaultFormState });
        }
    }, [addToGroupsDialog.props.open]);

    function handleSubmit(event) {
        setValues({ ...values, loading: true });
        event.preventDefault();
    }
    function enableButton() {
        setIsFormValid(true);
    }
    function validateForm(values) {
        setForm(values);
    }
    function disableButton() {
        setIsFormValid(false);
    }

    return (
        <Dialog
            classes={{
                paper: 'rounded-8',
            }}
            {...addToGroupsDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}  >
                <Toolbar className="flex w-full justify-between">
                    <div className="flex w-full text-center items-center justify-center">
                        <Typography className={classes.titleDialog} color="inherit">
                            Añadir a grupo
                        </Typography>
                    </div>
                    <IconButton style={{ backgroundColor: '#fff' }} onClick={() => closeComposeDialog()} size="small">
                        <Icon style={{ color: '#00B1FF', fontWeight: 'bold' }}>close</Icon>
                    </IconButton>
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
                    <GroupsListDialog searchText={searchText} />
                </DialogContent>
                {values.loading && <LinearProgress />}
            </Formsy>
        </Dialog>
    );
}

export default AddToGroupsDialog;
