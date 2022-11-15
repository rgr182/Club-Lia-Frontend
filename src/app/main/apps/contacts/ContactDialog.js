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
import { submitCreateContact,submitUpdateContact, submitUpdateContactGroup, submitAddContactToGroup } from './store/userSlice';

import {
	removeContact,
	updateContact,
	addContact,
	closeNewContactDialog,
	closeEditContactDialog,
	sendEmail
} from './store/contactsSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import {
    FuseChipSelectFormsy
} from '@fuse/core/formsy';
import {showMessage} from "../../../store/fuse/messageSlice";
import { SignalCellularNull } from '@material-ui/icons';
import Select from 'react-select';

const defaultFormState = {
	uuid : '',
	name: '',
	last_name: '',
	avatar: 'assets/images/avatars/profile.jpg',
	second_last_name: '',
	id_school: '',
	email : '',
	grade: '',
	active: '',
	password :'',
	childrens: 1,
};

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
	const formOrigin = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog.data);
	const users = useSelector(({ contactsApp }) => contactsApp.contacts.ids);
	const schools = useSelector(({ contactsApp }) => contactsApp.schools);
	const roles = useSelector(({ contactsApp }) => contactsApp.roles);
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const groupList = useSelector(({ contactsApp }) => contactsApp.groups.data);
	const tutor = useSelector(({ contactsApp }) => contactsApp.parents.data);
	

	const { form, handleChange ,setForm} = useForm(defaultFormState);

	const [values, setValues] = React.useState({
		showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);


	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
				/**
		 * Dialog type: 'edit'
		 */
		if ((contactDialog.type === 'edit' || contactDialog.type === 'editGroup' )&& contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'massiveMessage'
		 */
		if ((contactDialog.type === 'massiveMessage')&& contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'addToGroup'
		 */
		if ((contactDialog.type === 'addToGroup')&& contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	useEffect(() => {
		if (user.error) {
			if (user.error.code == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: user.error.message, variant: 'error'}));
			} else if (user.error.response) {
				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: user.error.response.data.message, variant: 'error'}));

			}
		}

		if(user.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

			closeComposeDialog();
		}
	}, [user.error,user.success]);
	function closeComposeDialog() {
		return (contactDialog.type === 'edit' || contactDialog.type === 'editGroup')?  dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(submitCreateContact(form));
		}
		else if (contactDialog.type === 'massiveMessage'){
			var data = {...form, uuids:formOrigin}
			dispatch(sendEmail(data));
			closeComposeDialog();
			setValues({ ...values, loading: false });
		}
		else if (contactDialog.type === 'edit'){
			dispatch(submitUpdateContact(form,formOrigin));
		}
		else if (contactDialog.type === 'addToGroup'){
			dispatch(submitAddContactToGroup(form,formOrigin));
		} 
		else {
			dispatch(submitUpdateContactGroup(form,formOrigin));
		}
	}

	function handleRemove() {
		dispatch(removeContact(formOrigin.uuid));
		closeComposeDialog();
	}
	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm (values) {
		setForm(values);
	}
	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' && 'Nuevo Usuario'}
						{contactDialog.type === 'edit' && 'Editar Usuario'}
						{contactDialog.type === 'editGroup' && 'Editar '+ formOrigin.length+' usuario(s)'}
						{contactDialog.type === 'massiveMessage' && 'Crear mensaje para Usuarios'}
						{contactDialog.type === 'addToGroup' && 'Añadir usuarios a un grupo'}
					</Typography>
				</Toolbar>
				{(contactDialog.type !== 'editGroup' && contactDialog.type !== 'massiveMessage' && contactDialog.type !== 'addToGroup') && (
					<div className="flex flex-col items-center justify-center pb-24">
						<Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
						{contactDialog.type === 'edit' && (
							<Typography variant="h6" color="inherit" className="pt-8">
								{form.name}
							</Typography>
						)}
					</div>
				)}
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
					{contactDialog.type !== 'editGroup' && contactDialog.type !== 'massiveMessage' && contactDialog.type !== 'addToGroup' &&
					(
						<div>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="name"
								value={form.name}
								label="Nombre"
								validations={{
									minLength: 2
								}}
								validationErrors={{
									minLength: 'El mínimo de caracteres es 4'
								}}
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								autoFocus
								variant="outlined"
								required
							/>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="last_name"
								value={form.last_name}
								label="Apellido(s)"
								validations={{
									minLength: 4
								}}
								validationErrors={{
									minLength: 'El mínimo de caracteres es 4'
								}}
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>

							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="email"
								value={form.email}
								label="Email"
								validations="isEmail"
								validationErrors={{
									isEmail: 'Email invalido.'
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												email
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
								fullWidth
							/>
						</div>
					)}
					{contactDialog.type === 'new' && (
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="username"
						label="Username"
						id="username"
						value={form.username}
						validations={{
							minLength: 4,
							includesSpaces: function(values, value){
								if (value){
									return !value.includes(" ");
								}
								return true;
							}
						}}
						validationErrors={{
							minLength: 'Min character length is 4',
							includesSpaces: 'El nombre de usuario no puede contener espacios'
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
					)
					}
					{contactDialog.type !== 'massiveMessage' && contactDialog.type !== 'addToGroup' && (
					<>
						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="password"
							id="password"
							label="Password"
							validations={{
								minLength: 3
							}}
							validationErrors={{
								minLength: 'Min character length is 3'
							}}
							InputProps={{
								className: 'pr-2',
								type: showPassword ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword(!showPassword)}>
											<Icon className="text-20" color="action">
												{showPassword ? 'visibility' : 'visibility_off'}
											</Icon>
										</IconButton>
									</InputAdornment>
								)
							}}

							variant="outlined"
							fullWidth
						/>

						<SelectFormsy
							id="grade"
							name="grade"
							width="100%"
							value={form.grade}
							onChange={handleChange}
							label="Grado"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							// required
						>
							<MenuItem key={'grade1'} value={1}>1</MenuItem>
							<MenuItem key={'grade2'} value={2}>2</MenuItem>
							<MenuItem key={'grade3'} value={3}>3</MenuItem>
							<MenuItem key={'grade4'} value={4}>4</MenuItem>
							<MenuItem key={'grade5'} value={5}>5</MenuItem>
							<MenuItem key={'grade6'} value={6}>6</MenuItem>
						</SelectFormsy>
						{schools.length > 0 ?
							<SelectFormsy
								id="school_id"
								name="school_id"
								value={form.school_id}
								onChange={handleChange}
								label="Escuela"
								fullWidth

								variant="outlined"
								className="mb-24 MuiInputBase-fullWidth"
								required={ contactDialog.type === 'editGroup' ? false : true}
							>
								{schools.map((row) =>(<MenuItem key={'school'+row.id} value={row.id}>{row.School}</MenuItem>))}
							</SelectFormsy>:
							<CircularProgress color="secondary"/>
						}
						{roles.length > 0 ?
							<SelectFormsy
								id="role_id"
								name="role_id"
								value={form.role_id}
								onChange={handleChange}
								label="Rol"
								fullWidth
								variant="outlined"
								className="mb-24 MuiInputBase-fullWidth"
								required={ contactDialog.type === 'editGroup' ? false : true}
							>
								{roles.map((row) =>(<MenuItem key={'role'+row.id} value={row.id}>{row.name}</MenuItem>))}
							</SelectFormsy>:
							<CircularProgress color="secondary"/>
						}
							{([10,31,32,33].indexOf(form.role_id) > -1) && contactDialog.type !== 'editGroup' ?
								

												// <SelectFormsy
												// 	id="childrens_id"
												// 	name="childrens_id"
												// 	value={form.childrens_id[0]}
												// 	onChange={handleChange}
												// 	label="Hijo"
												// 	fullWidth
												// 	variant="outlined"
												// 	className="mb-24 MuiInputBase-fullWidth"
												// 	required={contactDialog.type === 'editGroup' ? false : true}
												// >
												// 	{tutor.students.map((row) => (
												// 		<MenuItem key={'childrens_id' + row.id} value={row.id}>{row.name} {row.last_name}</MenuItem>
												// 	))}
												// </SelectFormsy>
												<Select
													id="childrens_id"
													name="childrens_id"
													value={form.childrens_id}
													className="mb-24 MuiInputBase-fullWidth"
													placeholder="Hijo(s)"
													fullWidth
													variant="outlined"
													label='Hijo(s)'
													textFieldProps={{
														label: 'Hijo(s)',
														InputLabelProps: {
															shrink: true
														},
														variant: 'standard'
													}}
													onChange={e => setForm({...form, childrens_id: e})}
													options={tutor.students.map(item => ({
														value: item.id,
														label: item.name + ' ' + item.last_name
													}))}
													isMulti
												/>
								:
								null
							}
							{([5,13,6,18,19,20,21,34,35,36].indexOf(form.role_id) > -1) && contactDialog.type !== 'editGroup' ?

								<Select
									id="tutor_id"
									name="tutor_id"
									value={form.tutor_id}
									onChange={e => setForm({...form, tutor_id: e})}
									label="Tutor"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
									isClearable={true}
									// required={contactDialog.type === 'editGroup' ? false : true}
									options={tutor.tutor.map(item => ({
										value: item.id,
										label: item.name + ' ' + item.last_name
									}))}
								/>
								: null}

					</>
					)
					}
					{contactDialog.type === 'massiveMessage' && (
						<>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="subject"
								value={form.subject}
								label="Asunto"
								validations={{
									minLength: 1
								}}
								validationErrors={{
									minLength: 'El mínimo de caracteres es 1'
								}}
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												subject
											</Icon>
										</InputAdornment>
									)
								}}
								autoFocus
								variant="outlined"
								required
							/>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="message"
								label="Crear mensaje"
								validations={{
									minLength: 1
								}}
								validationErrors={{
									minLength: 'El mínimo de caracteres es 1'
								}}
								fullWidth
								variant="outlined"
								required
								multiline
								rows={4}
							/>
						</>
					)}
					{contactDialog.type === 'addToGroup' && (
						<>
						{ groupList ?

								<SelectFormsy
									id="groupList"
									name="groupList"
									width="100%"
									value={form.groupList}
									onChange={handleChange}
									label="Grupo"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
									required
								>
									{groupList.map((row) => (
										// <MenuItem key={'school'+row.id} value={row.id}>{row.School}</MenuItem>)

										<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
									))
									}
								</SelectFormsy>
								:
								<CircularProgress color="secondary" />
							}

						</>
					)}
					{values.loading && <LinearProgress />}

				</DialogContent>
				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={( values.loading || !isFormValid)}
							>
								Agregar
							</Button>
						</div>
					</DialogActions>
				) : contactDialog.type === 'massiveMessage' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={( values.loading || !isFormValid)}
							>
								Enviar
							</Button>
						</div>
					</DialogActions>
				) : contactDialog.type === 'addToGroup' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={(values.loading || !isFormValid)}
							>
								Añadir
							</Button>
						</div>
					</DialogActions>
						) : (
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
									{contactDialog.type !== 'editGroup' && contactDialog.type !== 'addToGroup' && (
										<IconButton onClick={handleRemove} disabled={(values.loading)}>
											<Icon>delete</Icon>
										</IconButton>
									)}
								</DialogActions>
							)}
			</Formsy>
		</Dialog>
	);
}

export default ContactDialog;
