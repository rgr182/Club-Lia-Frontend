import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegisterParentTeacher } from 'app/auth/store/registerSlice';
import { membershipPayment } from 'app/auth/store/registerSlice';
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { getMemberships } from '../store/pricingSlice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { useDeepCompareEffect } from '@fuse/hooks';
import {showMessage} from "../../../store/fuse/messageSlice";

const useStyles = makeStyles(theme => ({
	divContainer:{flexGrow:1}
}));

function TeacherRegisterTab(props) {
	const membership = props.membership;


	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordC, setShowPasswordC] = useState(false);
	const [modelPayment, setModelPayment] = useState("");
	const classes = useStyles();
	const formRef = useRef(null);

	useEffect(() => {
		if(register.error.response) {
			if (register.error.response.response.status == '422') {
				dispatch(showMessage({message:register.error.response.response.data.message,variant: 'error'}));
			}else if(register.error.response.response.status == '400') {
				dispatch(showMessage({message:register.error.response.response.data.message,variant: 'error'}));
			}
		}
		
		if(register.success){
			dispatch(showMessage({message:'Usuario registrado!',variant: 'success'}));
			if(modelPayment.id_licenses_type !== 4){
				dispatch(membershipPayment(modelPayment));
			}else{
				window.location.href = './login';
			}
		}
		
	}, [register.error,register.success]);
	
	useDeepCompareEffect(() => {
		dispatch(getMemberships());
	}, [dispatch]);

	const Memberships = useSelector(({ PricingApp }) => PricingApp.pricing.memberships.response);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		model.role_id = 28;
		model.title = "Membresía " + membership;
		model.description = "Membresía "+membership+" para los servicios de ClubLIA";
		model.unit_price = membership == "gratis" ? Memberships[3].price : (membership == "mensual" ? Memberships[4].price : Memberships[5].price);
		model.id_licenses_type = membership == "gratis" ? 4 : (membership == "mensual" ? 5 : 6);
		model.quantity = 1;
		setModelPayment(model);
		dispatch(submitRegisterParentTeacher(model));
	}

	return (
		<div className={clsx(classes.divContainer,"w-full items-center justify-center")}>
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
							label="Nombre del maestro"
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
							label="Apellido/s del maestro"
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
							label="Email del maestro"
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
							label="Username del maestro"
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
						
						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="password"
							label="Password del maestro"
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
					</Grid>

					<Grid item xs={6} 
						className="flex flex-col w-full p-4">
						
						<TextFieldFormsy
							className="mb-16 w-full"
							type="text"
							name="phone"
							label="Teléfono del maestro"
							validations={{
								isLength: 10
							}}
							validationErrors={{
								isLength: 'Character length is 10'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											phone_iphone
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						
						<SelectFormsy
							id="country"
							name="country"
							width="100%"
							label="País"
							fullWidth
							variant="outlined"
							className="mb-16"
							value={'México'}
						>
							<MenuItem key={'México'} value="México">México</MenuItem>
						</SelectFormsy>

						<SelectFormsy
							id="state"
							name="state"
							width="100%"
							label="Estado *"
							fullWidth
							variant="outlined"
							className="mb-16"
							required
						>
							<MenuItem key={'Aguascalientes'} value="Aguascalientes">Aguascalientes</MenuItem>
							<MenuItem key={'Baja California'} value="Baja California">Baja California</MenuItem>
							<MenuItem key={'Baja California Sur'} value="Baja California Sur">Baja California Sur</MenuItem>
							<MenuItem key={'Campeche'} value="Campeche">Campeche</MenuItem>
							<MenuItem key={'Chiapas'} value="Chiapas">Chiapas</MenuItem>
							<MenuItem key={'Chihuahua'} value="Chihuahua">Chihuahua</MenuItem>
							<MenuItem key={'CDMX'} value="CDMX">Ciudad de México</MenuItem>
							<MenuItem key={'Coahuila'} value="Coahuila">Coahuila</MenuItem>
							<MenuItem key={'Colima'} value="Colima">Colima</MenuItem>
							<MenuItem key={'Durango'} value="Durango">Durango</MenuItem>
							<MenuItem key={'Estado de México'} value="Estado de México">Estado de México</MenuItem>
							<MenuItem key={'Guanajuato'} value="Guanajuato">Guanajuato</MenuItem>
							<MenuItem key={'Guerrero'} value="Guerrero">Guerrero</MenuItem>
							<MenuItem key={'Hidalgo'} value="Hidalgo">Hidalgo</MenuItem>
							<MenuItem key={'Jalisco'} value="Jalisco">Jalisco</MenuItem>
							<MenuItem key={'Michoacán'} value="Michoacán">Michoacán</MenuItem>
							<MenuItem key={'Morelos'} value="Morelos">Morelos</MenuItem>
							<MenuItem key={'Nayarit'} value="Nayarit">Nayarit</MenuItem>
							<MenuItem key={'Nuevo León'} value="Nuevo León">Nuevo León</MenuItem>
							<MenuItem key={'Oaxaca'} value="Oaxaca">Oaxaca</MenuItem>
							<MenuItem key={'Puebla'} value="Puebla">Puebla</MenuItem>
							<MenuItem key={'Querétaro'} value="Querétaro">Querétaro</MenuItem>
							<MenuItem key={'Quintana Roo'} value="Quintana Roo">Quintana Roo</MenuItem>
							<MenuItem key={'San Luis Potosí'} value="San Luis Potosí">San Luis Potosí</MenuItem>
							<MenuItem key={'Sinaloa'} value="Sinaloa">Sinaloa</MenuItem>
							<MenuItem key={'Sonora'} value="Sonora">Sonora</MenuItem>
							<MenuItem key={'Tabasco'} value="Tabasco">Tabasco</MenuItem>
							<MenuItem key={'Tamaulipas'} value="Tamaulipas">Tamaulipas</MenuItem>
							<MenuItem key={'Tlaxcala'} value="Tlaxcala">Tlaxcala</MenuItem>
							<MenuItem key={'Veracruz'} value="Veracruz">Veracruz</MenuItem>
							<MenuItem key={'Yucatán'} value="Yucatán">Yucatán</MenuItem>
							<MenuItem key={'Zacatecas'} value="Zacatecas">Zacatecas</MenuItem>
						</SelectFormsy>

						<SelectFormsy
							id="level"
							name="level"
							width="100%"
							label="Maestro de: *"
							fullWidth
							variant="outlined"
							className="mb-16"
							required
						>
							<MenuItem key={1} value="1">preescolar</MenuItem>
							<MenuItem key={2} value="2">primaria</MenuItem>
							<MenuItem key={3} value="3">secundaria</MenuItem>
						</SelectFormsy>

						<Card className="hidden md:flex justify-center p-4">
							<CardContent className="w-full">
								<Typography className="text-16">
									<b>Membresía para maestros</b> 
								</Typography>
								{Memberships[3] ?
								<Typography className="text-14" color="textSecondary">
									${membership == "gratis" ? Memberships[3].price : (membership == "mensual" ? Memberships[4].price : Memberships[5].price)}
								</Typography>
								:<></>}
								<Typography className="text-16">
									{membership}
								</Typography>
								
							</CardContent>
						</Card>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mx-auto mt-16 normal-case"
							aria-label="REGISTER"
							disabled={!isFormValid}
							value="legacy"
							>
							Registrar usuario
						</Button>
					</Grid>
				</Grid>
			</Formsy>
		</div>
	);
}

export default TeacherRegisterTab;
