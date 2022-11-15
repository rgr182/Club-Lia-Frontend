import { useForm } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {showMessage} from "../../../store/fuse/messageSlice";
import {
	closeUpdateDeliveryDialog, submitUploadFile
} from './store/deliverySlice';
import { getActivities } from './store/activitiesSlice'
// import MenuItem from "@material-ui/core/MenuItem";
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
// import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const defaultFormState = {
	id: '',
    name: '',
	group_id: '',
    finish_date: '',	
    groupList: '',
	theme: '',
	instructions: '',
	file_path: '',
	url_path: '',
};

function DeliveryUpdateDialog(props) {
    const dispatch = useDispatch();
	const formOrigin = useSelector(({ ActivitiesApp }) => ActivitiesApp.delivery.deliveryUpdateDialog.data);
	const deliveryUpdateDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.delivery.deliveryUpdateDialog);
	const delivery = useSelector(({ ActivitiesApp }) => ActivitiesApp.delivery.delivery);
	const role = useSelector(({ auth }) => auth.user.role);

	const { form, handleChange ,setForm} = useForm(defaultFormState);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileType, setFileType] = useState('file');
	///Getting date time
	var today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2)
	+ 'T' + ('0'+( today.getHours() + 1)).slice(-2) + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

	const [values, setValues] = React.useState({
		// showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	// const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);

	
	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
		// /**
		//  * Dialog type: 'edit'
		//  */
			setForm({ ...deliveryUpdateDialog.data });
		
	}, [deliveryUpdateDialog.data, deliveryUpdateDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (deliveryUpdateDialog.props.open) {
			initDialog();
		}
		setFileType(formOrigin ? formOrigin.url_path ? 'url' : 'file' : 'file');
	}, [deliveryUpdateDialog.props.open, initDialog]);

	useEffect(() => {
		if (delivery.error) {

			if (delivery.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: delivery.error.response.data.message, variant: 'error'}));
			} else 
			{
				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: 'No se pudo añadir la tarea.', variant: 'error'}));
			}
		}

		if(delivery.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));
            dispatch(getActivities(role));

			closeComposeDialog();
		}

	}, [delivery.error,delivery.success]);
    
	function closeComposeDialog() {
        dispatch(closeUpdateDeliveryDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

        dispatch(submitUploadFile(form, formOrigin, selectedFile, fileType));
		setSelectedFile(null)

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
			{...deliveryUpdateDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full ">
					<Typography variant="subtitle1" color="inherit" >
                        {formOrigin ? formOrigin.name : form.name}
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
					{ form.instructions== '' ? null
					:
						<TextFieldFormsy
							fullWidth
							multiline
							rows={4}
							className="mb-16"
							type="text"
							name="instructions"
							label="Notas del profesor"
							id="instructions"
							value={ formOrigin ? formOrigin.instructions : form.instructions}
							InputProps={{
								readOnly: true,
							}}
							variant="outlined"
						/>
					}
					
					<RadioGroup aria-label="fileType" name="fileType" value={fileType} onChange={e => setFileType(e.target.value)} className="flex md:overflow-hidden flex-row">
						<FormControlLabel value="file" control={<Radio />} label="Subir archivo" className="mb-8"/>
						<FormControlLabel value="url" control={<Radio />} label="Url del archivo" className="mb-8"/>
					</RadioGroup>
					{
						fileType == 'file' ?
							<>
								<TextFieldFormsy
									fullWidth
									className="mb-16"
									type="text"
									name="file_path"
									label="Archivo"
									id="file_path"
									value={formOrigin ? formOrigin.file_path ? formOrigin.file_path.slice(formOrigin.file_path.indexOf('_')+1) : '' : ''}
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
								<input
									fullWidth
									className="mb-16"
									type="file"
									name="file"
									id="file"
									onChange={(e) => setSelectedFile(e.target.files[0])}
									// onChange={handleChange}
									variant="outlined"
								/>
							</>
							:
							null
					}
					{
						fileType == 'url' ?
							<TextFieldFormsy
								fullWidth
								className="mb-16"
								type="text"
								name="url_path"
								label="URL"
								id="url_path"
								value={formOrigin ? formOrigin.url_path : form.url_path}
								onChange={handleChange}
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
							:
							null
					}						
		
					{values.loading && <LinearProgress />}

				</DialogContent>
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
			</Formsy>
		</Dialog>
	);
}

export default DeliveryUpdateDialog;
