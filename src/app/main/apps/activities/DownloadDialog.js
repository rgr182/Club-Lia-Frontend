import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDownloadDialog, getGroupUsers, getGroupHomeworks } from './store/activitiesSlice.js';
import MenuItem from "@material-ui/core/MenuItem";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Download from './Download';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultFormState = {
    user_id: '',
};

function DownloadDialog(props) {
    const dispatch = useDispatch();
    const downloadDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.downloadDialog);
    const groupUsers = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.groupUsers.data);
    const groupHomeworks = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.groupHomeworks.data);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [downloadType, setDownloadType] = useState('group');
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const formRef = useRef(null);

    function disableButton() {
        setIsFormValid(false);
    }

    useEffect(() => {
        if (downloadDialog.props.open) {
            setForm({ user_id: '' });
            dispatch(getGroupUsers(props.form.group_id || 0));
        }
    }, [downloadDialog.props.open]);

    useEffect(() => {
        if (downloadDialog.props.open) {
            setLoading(true);

            const params = {
                downloadType: downloadType,
                user_id: downloadType == 'group' ? null : form.user_id,
                group_id: props.form.group_id,
                from: props.form.from,
                until: props.form.until
            }

            dispatch(getGroupHomeworks(params)).then(() => {
                setLoading(false);
            });
        }
    }, [form, downloadType, downloadDialog.props.open]);

    useEffect(() => {
        if (groupHomeworks[0] && groupHomeworks[0].length > 0) {
            setNoData(false);
        } else {
            setNoData(true);
        }
    }, [groupHomeworks]);

    function closeComposeDialog() {
        return dispatch(closeDownloadDialog())
    }

    function handleSubmit(event) {
        event.preventDefault();
        return dispatch(closeDownloadDialog());
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
                paper: 'm-24 rounded-8'
            }}
            {...downloadDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        Descargar calificaciones
                    </Typography>
                </Toolbar>
            </AppBar>
            <Formsy
                onChange={validateForm}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col md:overflow-hidden"
            >
                <DialogContent classes={{ root: 'p-24' }}>

                    <RadioGroup aria-label="downloadType" name="downloadType" value={downloadType} onChange={e => setDownloadType(e.target.value)} className="flex md:overflow-hidden flex-row">
                        <FormControlLabel value="group" control={<Radio />} label="Reporte grupal" className="mb-8" />
                        <FormControlLabel value="user" control={<Radio />} label="Reporte por alumno" className="mb-8" />
                    </RadioGroup>

                    {downloadType == 'user' ?
                        (groupUsers && groupUsers.length > 0) &&
                        <SelectFormsy
                            id="user_id"
                            name="user_id"
                            width="100%"
                            value={form.user_id || ''}
                            onChange={handleChange}
                            label="Alumno"
                            fullWidth
                            variant="outlined"
                            className="mb-24 MuiInputBase-fullWidth"
                            required
                            validationErrors={{
                                required: 'Selecciona alguna de las opciones'
                            }}
                        >
                            {groupUsers.map((row) => (
                                <MenuItem key={row.user_id} value={row.user_id}>{row.name}</MenuItem>
                            ))}
                        </SelectFormsy>
                        :
                        null
                    }

                </DialogContent>
                <DialogActions className="justify-right p-8">
                    <div className="px-16">
                        {isFormValid &&
                            (loading ?
                                <CircularProgress color="secondary" />
                                :
                                noData ?
                                    <Typography style={{ color: '#A5A5A5' }}>No hay datos disponibles para exportar</Typography>
                                    :
                                    <Download
                                        onClick={handleSubmit}
                                        downloadType={downloadType}
                                    />
                            )
                        }
                    </div>
                </DialogActions>
            </Formsy>
        </Dialog>
    );
}

export default DownloadDialog;
