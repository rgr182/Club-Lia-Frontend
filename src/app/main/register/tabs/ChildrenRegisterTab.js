
import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { membershipPayment, registerNewChildren, submitRegisterChild } from 'app/auth/store/registerSlice';
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import {showMessage} from "../../../store/fuse/messageSlice";

const useStyles = makeStyles(theme => ({
	divContainer:{flexGrow:1}
}));

function ChildrenRegisterTab(props) { 
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordC, setShowPasswordC] = useState(false);
	const [childrenCounter, setchildrenCounter] = useState(1);
	
	const parentModel = props.parentModel;
	const parentId = localStorage.getItem('id_parent');

	const classes = useStyles();
	const formRef = useRef(null);

    useEffect(() => {
		if(register.errorChild.response) {
			if (register.errorChild.response.response.status == '422') {
				dispatch(showMessage({message:register.errorChild.response.response.data.message,variant: 'error'}));
			}
		}
		
		if(register.successChild){
			if(+parentModel.children === childrenCounter){
				if(parentModel.unit_price !== 0){
					parentModel.quantity = childrenCounter;
					dispatch(membershipPayment(parentModel));
				}else{
					window.location.href = './login';
				}
			}else{
				formRef.current.reset();
				setchildrenCounter(childrenCounter+1);
				dispatch(registerNewChildren());
			}
			dispatch(showMessage({message:'Usuario registrado!',variant: 'success'}));
		}
		
	}, [register.errorChild,register.successChild]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
        model.tutor_id = parentId;
        dispatch(submitRegisterChild(model));
	}

    return(
        <div className={clsx(classes.divContainer,"w-full items-center justify-center")}>
			<Typography color="textSecondary" className="leading-tight m-10">
                Registro de alumno #{childrenCounter}
            </Typography>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<Grid container>
					<Grid item xs={6} 
						className="flex flex-col w-full p-4">
						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="name"
							label="Nombre del alumno"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
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
							name="lastName"
							label="Apellido/s del alumno"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
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
							label="Email del alumno"
							validations="isEmail"
							validationErrors={{
								isEmail: 'Please enter a valid email'
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
						/>
						
                        <TextFieldFormsy
							className="mb-16"
							type="text"
							name="username"
							label="Username del alumno"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											account_circle
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

					</Grid>

					<Grid item xs={6} 
						className="flex flex-col w-full p-4">
                        
                        <TextFieldFormsy
							className="mb-16"
							type="password"
							name="password"
							label="Password del alumno"
							validations={"equalsField:password-confirm",{
								minLength: 3
							}}
							validationErrors={{
								equalsField: 'Passwords do not match',
								minLength: 'El mínimo de caracteres es 3'
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
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="password-confirm"
							label="Confirma password"
							validations="equalsField:password"
							validationErrors={{
								equalsField: 'Passwords do not match'
							}}
							InputProps={{
								className: 'pr-2',
								type: showPasswordC ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPasswordC(!showPasswordC)}>
											<Icon className="text-20" color="action">
												{showPasswordC ? 'visibility' : 'visibility_off'}
											</Icon>
										</IconButton>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
						
                        <SelectFormsy
							id="level"
							name="level"
							width="100%"
							label="Alumno de: *"
							fullWidth
							variant="outlined"
							className="mb-16"
							required
						>
							<MenuItem key={1} value="1">preescolar</MenuItem>
							<MenuItem key={2} value="2">primaria</MenuItem>
							<MenuItem key={3} value="3">secundaria</MenuItem>
						</SelectFormsy>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mx-auto mt-16 normal-case"
							aria-label="REGISTER"
							disabled={!isFormValid}
							value="legacy"
							>
							Register
						</Button>
					</Grid>
				</Grid>
			</Formsy>
		</div>
    )
}export default ChildrenRegisterTab;