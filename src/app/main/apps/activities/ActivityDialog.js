import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import AppBar from '@material-ui/core/AppBar';
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
import { showMessage } from "../../../store/fuse/messageSlice";
import {
	closeNewActivityDialog,
	submitCreateActivity,
	closeEditActivityDialog,
	submitUpdateActivity,
	removeActivity,
	removeFile,
	getSubjects
} from './store/activitiesSlice.js';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextFieldFormsy } from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';

const defaultFormState = {
	id: '',
	name: '',
	group_id: '',
	finish_date: '',
	groupList: '',
	theme: '',
	instructions: '',
	is_active: true,
	file_path: '',
};

function ActivityDialog(props) {
	const dispatch = useDispatch();
	const formOrigin = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog.data);
	const activityDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog);
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
	const subjects = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.subjects.data);
	const activity = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activity);
	const { form, handleChange, setForm } = useForm(defaultFormState);
	const [selectedFiles, setSelectedFiles] = useState([]);
    const [resourceName, setResourceName] = React.useState([]);
    const [liaSubjects, setLiaSubjects] = React.useState([]);
	const [bloque, setBloque] = useState(0);
    const handleChangeCheck = (event) => {
        setResourceName(event.target.value);
    };
	var today = new Date();
	const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)
		+ 'T' + ('0' + (today.getHours() + 1)).slice(-2) + ':' + ('0' + (today.getMinutes() + 1)).slice(-2);

	const [values, setValues] = React.useState({
		loading: false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	//Function to create url
	const [tags, setTags] = useState([]);

	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
		setTags([]);
		setResourceName([]);
		setLiaSubjects([]);
		setBloque(0);

		// /**
		//  * Dialog type: 'edit'
		//  */
		if ((activityDialog.type === 'edit') && activityDialog.data) {
			setForm({ ...activityDialog.data });
			getAttachments();
			try {
				handleChipChange(JSON.parse(activityDialog.data.url_path) || null);
			} catch (e) {
				handleChipChange(activityDialog.data.url_path);
			}
		}

		/**
		 * Dialog type: 'new'
		 */
		if (activityDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...activityDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [activityDialog.data, activityDialog.type, setForm]);

	function handleChipChange(val) {
		var data = [];
		if (val){
			if (val[0] && val[0].value) {
				val.forEach(element => {
					if(!element.label){
						element.label = element.value;
					}
					data.push({ label: element.label.length <= 8 ? element.label : `${element.label.substr(0, 8)}...`, value: element.value });
				});
			} else if (val != '' && val != 'undefined' ) {
				data.push({ label: val.length <= 8 ? val : `${val.substr(0, 8)}...`, value: val });
			}
		}
		setTags(data);
	}

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (activityDialog.props.open) {
			initDialog();
		}
	}, [activityDialog.props.open, initDialog]);

	useEffect(() => {
        getAttachments();
    }, [form.subject_id, bloque]);

	const getAttachments = () => {
        if(typeof form.subject_id === 'number') {
            var access_token = window.localStorage.getItem('jwt_access_token');
            axios.get(process.env.REACT_APP_API + '/filtro', {
                headers: {
                  'Authorization': `Bearer ${access_token}`
                },
                params:{ id: form.subject_id}
            })
            .then((res) => {
                if(res.status == 200) {
                    setLiaSubjects([...res.data.data]);
					if (activityDialog.type === 'edit' && form.resources) {
						const resources = form.resources.split(',');
						for (var i = 0; i < resources.length; i++) {
							var objResult = res.data.data.find(obj => {
								return obj.id == resources[i]
							});
							setResourceName(recursos => [...recursos, objResult.name]);
						}
					}
                } else {
                    alert('No se pudo consultar el material de apoyo');
                }
            })
            .catch((error) => {
                alert('No se pudo obtener el material de apoyo');
            });           
        }
    }

	useEffect(() => {
		dispatch(getSubjects(form.group_id || 0));
	}, [form.group_id]);

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
			closeComposeDialog();
		}
	}, [activity.error, activity.success]);

	function closeComposeDialog() {
		setSelectedFiles([])
		return (activityDialog.type === 'edit') ? dispatch(closeEditActivityDialog()) : dispatch(closeNewActivityDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		var liaResources = [];
        for (var i = 0; i < resourceName.length; i++) {
            var objResult = liaSubjects.find(obj => {
                return obj.name === resourceName[i]
            });
            liaResources.push(objResult.id);
        }

		form.url_path = [];
		tags.forEach(element => {
			form.url_path.push({ value: element.value });
		});

		if (activityDialog.type === 'new') {
			dispatch(submitCreateActivity(form, selectedFiles, liaResources));
			setSelectedFiles([]);
			setTags("");
		} else if (activityDialog.type === 'edit') {
			dispatch(submitUpdateActivity(form, formOrigin, selectedFiles, liaResources));
			setSelectedFiles([])
		}
	}

	function handleRemove() {
		dispatch(removeActivity(formOrigin.id));
		closeComposeDialog();
	}
	function handleRemoveFile(name, file) {
		dispatch(removeFile(name, file));
	}
	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm(values) {
		setForm(values);
	}
	const datos = () => {
		console.log(form, formOrigin, selectedFiles)
	}
	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...activityDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{activityDialog.type === 'new' && 'Nueva Actividad'}
						{activityDialog.type === 'edit' && 'Editar Actividad'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					{activityDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
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
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="name"
						label="Nombre de Actividad"
						id="name"
						value={form.name}
						onChange={handleChange}
						validations={{
							minLength: 2,
							maxLength: 30,
						}}
						validationErrors={{
							minLength: 'El minimo de caracteres permitidos es 4',
							maxLength: 'El máximo de caracteres permitidos es 30'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										star
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					{
						activityDialog.type !== 'edit' ?
							groups ?
								<SelectFormsy
									id="group_id"
									name="group_id"
									width="100%"
									value={form.group_id}
									onChange={ event => {
										handleChange(event);
										setResourceName([]);
										setLiaSubjects([]);
									}}
									label="Grupo"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
									required
								>
									{groups.map((row) => (
										<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
									))
									}
								</SelectFormsy>
								:
								<CircularProgress color="secondary" />
							:
							null
					}
					{
						activityDialog.type !== 'edit' ?
							subjects.length ?
								<SelectFormsy
									id="subject_id"
									name="subject_id"
									width="100%"
									value={form.subject_id}
									onChange={ event => {
										handleChange(event);
										setResourceName([]);
										setLiaSubjects([]);
									}}
									label="Materia"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
									required
								>
									{subjects.map((row) => (
										<MenuItem key={row.id} value={row.id}>{row.custom_name}</MenuItem>
									))
									}
								</SelectFormsy>
								:
								form.group_id ?
									<TextFieldFormsy
										fullWidth
										className="mb-16"
										type="text"
										name="subject_id"
										label="Es necesario crear materias para este grupo"
										id="subject_id"
										value={""}
										InputProps={{
											readOnly: true
										}}
										variant="outlined"
										required
									/>
									:
									null
							:
							null
					}
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						name="finish_date"
						label="Fecha de entrega"
						id="finish_date"
						type="datetime-local"
						value={form.finish_date.replace(" ", "T")}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							min: date
						}}
						variant="outlined"
						required
					/>
					<TextFieldFormsy
						fullWidth
						multiline
						rows={4}
						className="mb-16"
						type="text"
						name="instructions"
						label="Notas del profesor"
						id="instructions"
						value={form.instructions}
						onChange={handleChange}
						variant="outlined"
						validations={{
							maxLength: 400
						}}
						validationErrors={{
							maxLength: 'El máximo de carácteres permitidos es 400'
						}}
					/>
					<TextFieldFormsy
						type="hidden"
						name="is_active"
						id="is_active"
						value={form.is_active}
					/>
					<FormControl variant="outlined" className="MuiInputBase-fullWidth">
						<FormControlLabel
							control={
								<Switch checked={form.is_active}
									name="is_active"
									id="is_active"
									onChange={(event, newValue) => {
										event.target.id = 'is_active';
										event.target.value = newValue;
										handleChange(event);
									}}
								/>}
							label="Activa"
						/>
					</FormControl>
					{ liaSubjects.length <= 0 && bloque == 0  ? 
                        null 
                        : 
						<SelectFormsy
							label="Bloque"
							id="bloque"
							name="bloque"
							value={bloque}
							onChange={ ev => setBloque(ev.target.value) }
							label="Bloque"
							variant="outlined"
							className="mt-16"
						>
							<MenuItem key={'todos'} value={0}>Todos</MenuItem>
							<MenuItem key={'bloque1'} value={1}>Bloque 1</MenuItem>
							<MenuItem key={'bloque2'} value={2}>Bloque 2</MenuItem>
							<MenuItem key={'bloque3'} value={3}>Bloque 3</MenuItem>
						</SelectFormsy>
					}              
					{liaSubjects.length > 0 &&
						<SelectFormsy
							label="Recursos"
							name="recursos"
							id="recursos"
							multiple
							value={resourceName}
							onChange={handleChangeCheck}
							input={<Input />}
							renderValue={(selected) => selected.join(', ')}
							className="mt-16 MuiInputBase-fullWidth"
							variant="outlined"
						>
							{liaSubjects.map((item) => (
								(bloque == 0 || item.bloque == bloque) &&
									<MenuItem key={item.id} value={item.name}>
										<Checkbox checked={resourceName.indexOf(item.name) > -1} />
										<ListItemText primary={item.name} />
									</MenuItem>
							))}
							{(bloque != 0 && !JSON.stringify(liaSubjects).includes(`"bloque":${bloque}`)) &&
								<MenuItem disabled key={'emptyBlock'}>
									<ListItemText primary={`No hay recursos del bloque ${bloque}`} />
								</MenuItem>
							}
						</SelectFormsy>	
					}
					
					<FuseChipSelect
						className="w-full my-16 chipselect"
						value={tags}
						placeholder="Select multiple tags"
						onChange={handleChipChange}
						textFieldProps={{
							label: 'Url',
							width: '10px',
							InputLabelProps: {
								shrink: true
							},
							variant: 'outlined'
						}}
						isMulti
					/>
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="file_path"
						label="Archivo"
						id="file_path"
						value={formOrigin && formOrigin.file_path && Array.isArray(formOrigin.file_path) &&
							formOrigin.file_path.map((row) => (
								" " + row.split('/')[row.split('/').length - 1]
							))}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										attach_file
									</Icon>
								</InputAdornment>
							),
							readOnly: true,
						}}
						variant="outlined"
					/>

					{formOrigin && formOrigin.file_path && Array.isArray(formOrigin.file_path) &&
						formOrigin.file_path.map((row) => (
							<div className="flex flex-row">
								<Typography color="inherit" className="pt-8">
									{row.split('/')[row.split('/').length - 1]}
								</Typography>
								<IconButton
									onClick={() => handleRemoveFile(formOrigin.name, row.split('/')[row.split('/').length - 1])}
									disabled={(values.loading)}>
									<Icon>delete</Icon>
								</IconButton>
							</div>
						))}

					{selectedFiles.map((row) => (
						<Typography color="inherit" className="pt-8">
							{row && row.name && row.name}
						</Typography>
					))}
					<label style={{ color: 'red' }}>
						{(formOrigin && formOrigin.file_path && Array.isArray(formOrigin.file_path)) ?
							((formOrigin.file_path.length + selectedFiles.length > 6) ?
								'El máximo de archivos son 7'
								:
								'')
							:
							(selectedFiles.length > 6) && "El máximo de archivos son 7"}
					</label>
					<input
						fullWidth
						className="mb-16"
						type="file"
						name="file"
						id="file"
						onChange={(e) => { setSelectedFiles([...selectedFiles, e.target.files[0]]) }}
						variant="outlined"
						disabled={(formOrigin && formOrigin.file_path && Array.isArray(formOrigin.file_path)) ? (formOrigin.file_path.length + selectedFiles.length > 6) : (selectedFiles.length > 6)}
					/>
					{values.loading && <LinearProgress />}
				</DialogContent>
				{activityDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={(values.loading || !isFormValid)}
							>
								Agregar
							</Button>
						</div>

					</DialogActions>
				)
					: null
				}
				{activityDialog.type === 'edit' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={(values.loading || !isFormValid)}
							>
								Guardar
							</Button>
						</div>
						<Button onClick={datos}>Ver</Button>
						<IconButton onClick={handleRemove} disabled={(values.loading)}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)
					: null
				}
			</Formsy>
		</Dialog>
	);
}

export default ActivityDialog;
