import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import { submitRegisterSchool } from 'app/auth/store/registerSlice';
import MenuItem from "@material-ui/core/MenuItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDeepCompareEffect } from '@fuse/hooks';
import { getMemberships } from '../store/pricingSlice';
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import {showMessage} from "../../../store/fuse/messageSlice";
import Grid from '@material-ui/core/Grid';

function TeacherRegisterTab(props) {
	const membership = props.membership;

	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if(register.errorSchool.response) {
			if (register.errorSchool.response.response.status == '422') {
				dispatch(showMessage({message:register.errorSchool.response.response.data.message,variant: 'error'}));
			}
		}
		
		if(register.successSchool){
			dispatch(showMessage({message:'Email enviado!',variant: 'success'}));
			formRef.current.reset();
		}
		
	}, [register.errorSchool,register.successSchool]);

	
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
		model.membership = membership;
		dispatch(submitRegisterSchool(model));
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="name"
					label="Nombre de la escuela"
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
									school
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
					label="Email de la escuela"
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
					className="mb-16 w-full"
					type="text"
					name="phone"
					label="Teléfono de la escuela"
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
					id="city"
					name="city"
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

				<Grid container>
					
					<Grid item xs={6} 
						className="flex flex-col w-full p-4">
						<TextFieldFormsy
							className="mb-16 h-full"
							multiline
							type="text"
							id="message"
							name="message"
							label="Mensaje personalizado"
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
						/>
					</Grid>
				
					<Grid item xs={6} 
							className="flex flex-col w-full p-4">
						<Card className="hidden md:flex justify-center p-4">
							<CardContent className="w-full">
								<Typography className="text-16">
									<b>Membresía para escuelas</b> 
								</Typography>
								{Memberships[6] ?
								<Typography className="text-14" color="textSecondary">
									${membership == "gratis" ? Memberships[6].price : (membership == "mensual" ? Memberships[7].price : Memberships[8].price)}
								</Typography>
								:<></>}
								<Typography className="text-16">
									{membership}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Contáctanos
				</Button>
			</Formsy>
		</div>
	);
}

export default TeacherRegisterTab;
