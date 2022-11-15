// import { useForm } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils/FuseUtils';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { submitCreateHomework } from './store/homeworkSlice';
// import {showMessage} from "../../../store/fuse/messageSlice";
// import InputLabel from '@material-ui/core/InputLabel';


// import {
// 	removeHomework,
// 	closeNewHomeworkDialog,
// 	closeEditHomeworkDialog,
// 	submitUpdateHomework,
// 	downloadHomework
// } from './store/homeworkSlice';
// import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
// import Formsy from "formsy-react";

// const defaultFormState = {
// 	id: '',
// 	status: '',
// 	score: ''    
// };

// function HomeworkDialog(props) {
//     const dispatch = useDispatch();
//     // const homeworkDialog = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog);
// 	const formOrigin = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog.data);
// 	const homework = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homework);
// 	const teachers = useSelector(({ HomeworksApp }) => HomeworksApp.teachers.data);
// 	const { form, handleChange, setForm} = useForm(defaultFormState);

// 	const [values, setValues] = React.useState({
// 		loading : false
// 	});
// 	const [isFormValid, setIsFormValid] = useState(false);
// 	const formRef = useRef(null);


// 	function disableButton() {
// 		setIsFormValid(false);
// 	}

// 	const initDialog = useCallback(() => {
// 		// /**
// 		//  * Dialog type: 'edit'
// 		//  */
// 		if ((homeworkDialog.type === 'edit')&& homeworkDialog.data) {
// 			setForm({ ...homeworkDialog.data });
// 		}


// 		/**
// 		 * Dialog type: 'new'
// 		 */
// 		if (homeworkDialog.type === 'new') {
// 			setForm({
// 				...defaultFormState,
// 				...homeworkDialog.data,
// 				id: FuseUtils.generateGUID()
// 			});
// 		}
// 	}, [homeworkDialog.data, homeworkDialog.type, setForm]);

// 	useEffect(() => {
// 		/**
// 		 * After Dialog Open
// 		 */
// 		if (homeworkDialog.props.open) {
// 			initDialog();
// 		}
// 	}, [homeworkDialog.props.open, initDialog]);

// 	useEffect(() => {
// 		if (homework.error) {

// 			if (homework.error.response.request.status == '500') {
// 				setValues({...values, loading: false});
// 				dispatch(showMessage({message: homework.error.data.message, variant: 'error'}));
// 			} else 
// 			{

// 				disableButton();
// 				setValues({...values, loading: false});
				
// 				if (homework.error.response.data.message.schoolId){
// 					dispatch(showMessage({message: 'El usuario no tiene escuela', variant: 'error'}));
// 				}
// 				else{
// 					if (homework.error.response.data.message.includes("No query results")){
// 						dispatch(showMessage({message: 'Grupo invalido. Contacta al administrador.', variant: 'error'}));
// 					}
// 					else{
// 						dispatch(showMessage({message: homework.error.response.data.message, variant: 'error'}));
// 					}
// 				}
// 			}
// 		}

// 		if(homework.success){
// 			setValues({ ...values, loading: false });
// 			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

// 			closeComposeDialog();
// 		}
// 	}, [homework.error,homework.success]);
    
// 	function closeComposeDialog() {
//         return (homeworkDialog.type === 'edit' )? dispatch(closeEditHomeworkDialog()) : dispatch(closeNewHomeworkDialog());
// 	}

// 	function handleSubmit(event) {
// 		console.log(event);
// 		setValues({ ...values, loading: true });
// 		event.preventDefault();

// 		if (homeworkDialog.type === 'new') {
// 			dispatch(submitCreateHomework(form));
// 		}
// 		else 
// 		if (homeworkDialog.type === 'edit'){
// 			dispatch(submitUpdateHomework(form,formOrigin));
// 		}
// 	}

// 	function handleRemove() {
// 		dispatch(removeHomework(formOrigin.id));
// 		closeComposeDialog();
// 	}
// 	function enableButton() {
// 		setIsFormValid(true);
// 	} 
// 	function validateForm (values) {
// 		setForm(values);
// 	}
// 	const datos = () => {
// 		console.log(form);
// 	}
// 	return (
// 		<Dialog
// 			classes={{
// 				paper: 'm-24 rounded-8'
// 			}}
// 			{...homeworkDialog.props}
// 			onClose={closeComposeDialog}
// 			fullWidth
// 			maxWidth="xs"
// 		>
// 			<AppBar position="static" elevation={1}>
// 				<Toolbar className="flex w-full">
// 					<Typography variant="subtitle1" color="inherit">
// 						{homeworkDialog.type === 'new' && 'Nuevo Grupo'}
// 						{homeworkDialog.type === 'edit' && 'Calificar alumno'}
// 					</Typography>
// 				</Toolbar>
// 					<div className="flex flex-col items-center justify-center pb-24">
// 						{homeworkDialog.type === 'edit' && (
// 							<Typography variant="h6" color="inherit" className="pt-8">
// 								{form.name}
// 							</Typography>
// 						)}
// 					</div>
// 			</AppBar>
// 			<Formsy
// 				onValidSubmit={handleSubmit}
// 				onChange={validateForm}
// 				onValid={enableButton}
// 				onInvalid={disableButton}
// 				ref={formRef}
// 				className="flex flex-col md:overflow-hidden"
// 			>
// 				<DialogContent classes={{ root: 'p-24' }}>
// 					<TextFieldFormsy
// 						fullWidth
// 						className="mb-24"
// 						type="text"
// 						name="user_name"
// 						label="Nombre del Alumno"
// 						id="user_name"
// 						value={form.user_name}
// 						onChange={handleChange}
// 						InputProps={{
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									<Icon className="text-20" color="action">
// 										person_outline
// 									</Icon>
// 								</InputAdornment>
// 							),
// 							readOnly: true,
// 						}}
// 						variant="outlined"
// 						required
// 					/>

// 					<TextFieldFormsy
// 						fullWidth
// 						className="mb-16"
// 						type="text"
// 						name="status"
// 						label="Estado"
// 						id="status"
// 						value={form.status}
// 						onChange={handleChange}
// 						InputProps={{
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									<Icon className="text-20" color="action">
// 										donut_large
// 									</Icon>
// 								</InputAdornment>
// 							),
// 							readOnly: true,
// 						}}
// 						variant="outlined"
// 						required
// 					/>

// 					{form.file_path ?
// 						<>
// 							<InputLabel className="pt-8">Archivos</InputLabel>
// 							{Array.isArray(form.file_path) ?
// 								form.file_path.map((file) => (
// 									<div className="flex flex-row  justify-between items-center">
// 										<Typography color="inherit" >
// 											{file.slice(file.indexOf('_')+1)}
// 										</Typography>
// 										<IconButton
// 											onClick={ev => {
// 												ev.stopPropagation();
// 												dispatch(downloadHomework(file.replace('public', '')));
// 											}}
// 										>
// 											<Icon>save_alt</Icon>
// 										</IconButton>
// 									</div>
// 								))
// 							:
// 							<div className="flex flex-row justify-between items-center">
// 								<Typography color="inherit">
// 									{form.file_path.slice(form.file_path.indexOf('_')+1)}
// 								</Typography>
// 								<IconButton
// 									onClick={ev => {
// 										ev.stopPropagation();
// 										dispatch(downloadHomework(form.file_path.replace('public', '')));
// 									}}
// 								>
// 									<Icon>save_alt</Icon>
// 								</IconButton>
// 							</div>}
// 						</>
// 					:
// 						null
// 					}

// 					{form.url_path ?
// 						<>
// 							<InputLabel className="pt-16">URLs</InputLabel>
// 							{form.url_path[0].value ?
// 								form.url_path.map((url) => (
// 									<div className="flex flex-row  justify-between items-center">
// 										<Typography>
// 											{url.value.length >= 45 ? url.value.substr(0, 45)+ '...' : url.value}
// 										</Typography>
// 										<IconButton
// 											onClick={ev => {
// 												ev.stopPropagation();
// 												navigator.clipboard.writeText(url.value);
// 												dispatch(showMessage({message: 'Enlace copiado'}));
// 											}}
// 										>
// 											<Icon>link</Icon>
// 										</IconButton>
// 									</div>
// 								))
// 							:
// 							<div className="flex flex-row justify-between items-center">
// 								<Typography color="inherit">
// 									{form.url_path.length >= 45 ? form.url_path.substr(0, 45)+ '...' : form.url_path}
// 								</Typography>
// 								<IconButton
// 									onClick={ev => {
// 										ev.stopPropagation();
// 										navigator.clipboard.writeText(form.url_path);
// 										dispatch(showMessage({message: 'Enlace copiado'}));
// 									}}
// 								>
// 									<Icon>link</Icon>
// 								</IconButton>
// 							</div>}
// 						</>
// 					:
// 						null
// 					}

// 					<TextFieldFormsy
// 						type='number'
// 						step="0.1"
// 						min='0'
// 						max='10'
// 						fullWidth
// 						className="mb-16 mt-16"
// 						type="text"
// 						name="score"
// 						label="Calificación"
// 						id="score"
// 						value={form.score}
// 						onChange={handleChange}
// 						validations={{ 
// 							isNumber: function(values, value){
// 								return value >= 0 && value <= 10 ? true : 'La calificación debe ser un numero entre 0 y 10'
// 							}
// 						}}
// 						InputProps={{
// 							endAdornment: (
// 								<InputAdornment position="end">
// 									<Icon className="text-20" color="action">
// 										grade
// 									</Icon>
// 								</InputAdornment>
// 							)
// 						}}
// 						variant="outlined"
// 						required
// 					/>

// 				</DialogContent>
                
//                 { homeworkDialog.type === 'edit' ? (
// 					<DialogActions className="justify-between p-8">
// 						<div className="px-16">
// 							<Button
// 								variant="contained"
// 								color="primary"
// 								type="submit"
// 								onClick={handleSubmit}
// 								disabled={(values.loading || !isFormValid)}
// 							>
// 								Calificar
// 							</Button>							
// 						</div>
// 					</DialogActions> 
// 				)
// 				: null
// 				}
// 				<Button onClick={datos}>Hola</Button>
// 			</Formsy>
// 		</Dialog>
// 	);
// }

// export default HomeworkDialog;
