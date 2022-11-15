import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
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
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../../../../@fuse/core/formsy';
import {
	closeNewResourceDialog,
	closeEditResourceDialog,
	submitCreateResource,
	submitUpdateResource,
	removeResource
} from './store/resourcesSlice.js';
import { showMessage } from '../../../store/fuse/messageSlice';
import SelectFormsy from '../../../../@fuse/core/formsy/SelectFormsy';

const defaultFormState = {
	id: '',
	bloque: '',
	level: '',
	grade: '',
	url_resource: '',
	id_category: '',
	id_materia_base: '',
	name: '',
	description: ''
};

function ResourceDialog(props) {
	const dispatch = useDispatch();
	const formOrigin = useSelector(({ ResourcesApp }) => ResourcesApp.resources.resourceDialog.data);
	const resourceDialog = useSelector(({ ResourcesApp }) => ResourcesApp.resources.resourceDialog);
	const categories = useSelector(({ ResourcesApp }) => ResourcesApp.categories.data);
	const subjects = useSelector(({ ResourcesApp }) => ResourcesApp.subjects.data);
	const resource = useSelector(({ ResourcesApp }) => ResourcesApp.resources.resource);

	const { form, handleChange, setForm } = useForm(defaultFormState);

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
		if (resourceDialog.type === 'edit' && resourceDialog.data) {
			setForm({ ...resourceDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (resourceDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...resourceDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [resourceDialog.data, resourceDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (resourceDialog.props.open) {
			initDialog();
		}
	}, [resourceDialog.props.open, initDialog]);

	useEffect(() => {
		if (resource.error) {
			if (resource.error.response.request.status == '500') {
				setValues({ ...values, loading: false });
				dispatch(showMessage({ message: resource.error.response.data.message, variant: 'error' }));
			} else {
				disableButton();
				setValues({ ...values, loading: false });
				dispatch(showMessage({ message: resource.error.response.data.message, variant: 'error' }));
			}
		}

		if (resource.success) {
			setValues({ ...values, loading: false });
			dispatch(showMessage({ message: 'Operación exitosa!', variant: 'success' }));

			closeComposeDialog();
		}
	}, [resource.error, resource.success]);

	function closeComposeDialog() {
		return resourceDialog.type === 'edit'
			? dispatch(closeEditResourceDialog())
			: dispatch(closeNewResourceDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (resourceDialog.type === 'new') {
			dispatch(submitCreateResource(form));
		} else if (resourceDialog.type === 'edit') {
			dispatch(submitUpdateResource(form, formOrigin));
		}
	}

	function handleRemove() {
		dispatch(removeResource(formOrigin.id));
		closeComposeDialog();
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
			{...resourceDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{resourceDialog.type === 'new' && 'Nuevo Recurso'}
						{resourceDialog.type === 'edit' && 'Editar Recurso'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
					{resourceDialog.type === 'edit' && (
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
						label="Nombre del Recurso"
						id="name"
						value={form.name}
						onChange={handleChange}
						validations={{
							minLength: 2,
							maxLength: 100
						}}
						validationErrors={{
							minLength: 'El minimo de caracteres permitidos es 4',
							maxLength: 'El máximo de caracteres permitidos es 100'
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
					<SelectFormsy
						id="bloque"
						name="bloque"
						width="100%"
						value={form.bloque}
						onChange={handleChange}
						label="Bloque"
						fullWidth
						variant="outlined"
						className="mb-16 MuiInputBase-fullWidth"
						required={resourceDialog.type !== 'edit'}
					>
						<MenuItem key="bloque1" value={1}>
							1
						</MenuItem>
						<MenuItem key="bloque2" value={2}>
							2
						</MenuItem>
						<MenuItem key="bloque3" value={3}>
							3
						</MenuItem>
					</SelectFormsy>

					<SelectFormsy
						id="level"
						name="level"
						width="100%"
						value={form.level}
						onChange={handleChange}
						label="Nivel"
						fullWidth
						variant="outlined"
						className="mb-16 MuiInputBase-fullWidth"
						required={resourceDialog.type !== 'edit'}
					>
						<MenuItem key="level1" value={1}>
							Preescolar
						</MenuItem>
						<MenuItem key="level2" value={2}>
							Primaria
						</MenuItem>
						<MenuItem key="level3" value={3}>
							Secundaria
						</MenuItem>
					</SelectFormsy>

					<SelectFormsy
						id="grade"
						name="grade"
						width="100%"
						value={form.grade}
						onChange={handleChange}
						label="Grado"
						fullWidth
						variant="outlined"
						className="mb-16 MuiInputBase-fullWidth"
						required={resourceDialog.type !== 'edit'}
					>
						<MenuItem key="grade1" value={1}>
							1°
						</MenuItem>
						<MenuItem key="grade2" value={2}>
							2°
						</MenuItem>
						<MenuItem key="grade3" value={3}>
							3°
						</MenuItem>
						{form.level == 2 ? (
							<MenuItem key="grade4" value={4}>
								4°
							</MenuItem>
						) : null}
						{form.level == 2 ? (
							<MenuItem key="grade5" value={5}>
								5°
							</MenuItem>
						) : null}
						{form.level == 2 ? (
							<MenuItem key="grade6" value={6}>
								6°
							</MenuItem>
						) : null}
					</SelectFormsy>

					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="url_resource"
						label="URL"
						id="url_resource"
						value={formOrigin ? formOrigin.url_resource : form.url_resource}
						onChange={handleChange}
						required
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										link
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						validations={{
							maxLength: 255
						}}
						validationErrors={{
							maxLength: 'El máximo de carácteres permitidos es 255'
						}}
					/>
					{categories && categories.length > 0 ? (
						<SelectFormsy
							id="id_category"
							name="id_category"
							value={form.id_category}
							onChange={handleChange}
							label="Categoría"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							required={resourceDialog.type !== 'edit'}
						>
							{categories.map(row => (
								<MenuItem key={`category${row.id}`} value={row.id}>
									{row.name}
								</MenuItem>
							))}
						</SelectFormsy>
					) : (
						<CircularProgress color="secondary" />
					)}

					{subjects && subjects.length > 0 ? (
						<SelectFormsy
							id="id_materia_base"
							name="id_materia_base"
							value={form.id_materia_base}
							onChange={handleChange}
							label="Materia"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							required={resourceDialog.type !== 'edit'}
						>
							{subjects.map(row => (
								<MenuItem key={`subject${row.id}`} value={row.id}>
									{row.name}
								</MenuItem>
							))}
						</SelectFormsy>
					) : (
						<CircularProgress color="secondary" />
					)}

					<TextFieldFormsy
						fullWidth
						multiline
						rows={4}
						className="mb-16"
						type="text"
						name="description"
						label="Descripción"
						id="description"
						value={form.description}
						onChange={handleChange}
						variant="outlined"
						validations={{
							maxLength: 400
						}}
						validationErrors={{
							maxLength: 'El máximo de carácteres permitidos es 400'
						}}
					/>

					{values.loading && <LinearProgress />}
				</DialogContent>
				{resourceDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={values.loading || !isFormValid}
							>
								Agregar
							</Button>
						</div>
					</DialogActions>
				) : null}

				{resourceDialog.type === 'edit' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={values.loading || !isFormValid}
							>
								Guardar
							</Button>
						</div>

						<IconButton onClick={handleRemove} disabled={values.loading}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				) : null}
			</Formsy>
		</Dialog>
	);
}

export default ResourceDialog;
