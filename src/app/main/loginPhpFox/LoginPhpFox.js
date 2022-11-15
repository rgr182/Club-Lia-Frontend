import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
	root_alumnos: {
		backgroundImage: "url(assets/images/login/bg_alumnos.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_maestros: {
		backgroundImage: "url(assets/images/login/bg_maestros.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_padres: {
		backgroundImage: "url(assets/images/login/bg_padres.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_escuelas: {
		backgroundImage: "url(assets/images/login/bg_escuelas.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},

	image_overlay_alumnos:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(148,88,183,0.8)',},
	image_overlay_maestros:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgb(208,66,55,0.7)',},
	image_overlay_padres:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(231,162,63,0.7)',},
	image_overlay_escuelas:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(34,79,245,0.7)',},
	
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));
function getUrl(redirect){
	axios
	.post(process.env.REACT_APP_API+'/usuario_p/login')
	.then(response => {
		if (response.data) {

			switch(redirect.redirectValue.data){
				case ('misgrupos'):
					window.location.href = response.data + '::groups';
					break;
				case ('onlinelia'):
					window.location.href = response.data + '::video';
					break;
				case ('recursoslia'):
					window.location.href = response.data + '::recursos-digitales';
					break;
				case ('misherramientas'):
					window.location.href = response.data + '::mis-herramientas';
					break;
				case ('experienciaslia'):
					window.location.href = response.data + '::event';
					break;
				default:
					window.location.href = response.data;
			}

		} else {

		}
	})
	.catch(error => {
	});

}

function LoginPhpFox() {
	const classes = useStyles();
	const redirect = useSelector(({ auth }) => auth.redirect);
	
	getUrl(redirect);
	const role = useSelector(({ auth }) => auth.user.role);

	return (
		<div
		className={clsx((role == "admin" || role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A') ? classes.root_alumnos : (role == 'maestro' || role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Maestro-I' || role == 'Maestro-M' || role == 'Maestro-A' || role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria') ? classes.root_maestros : (role === "padre" || role === "Padre-I" || role === "Padre-M" || role === "Padre-A") ? classes.root_padres :classes.root_escuelas,
			'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
		)}
	>
		<div className={clsx((role == "admin" || role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A') ? classes.image_overlay_alumnos : (role == 'maestro' || role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Maestro-I' || role == 'Maestro-M' || role == 'Maestro-A' || role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria') ? classes.image_overlay_maestros : (role === "padre" || role === "Padre-I" || role === "Padre-M" || role === "Padre-A") ? classes.image_overlay_padres :classes.image_overlay_escuelas)}/>
			<FuseAnimate animation="transition.expandIn">
				<div className={clsx("flex w-full max-w-400 md:max-w-3xl rounded-12 overflow-hidden justify-center")}>
					
					<img className="logo-icon w-49" src="assets/images/logos/clublia.png" alt="logo" />
									
				</div>

			</FuseAnimate>
					<CircularProgress color="secondary" />
		</div>
	);
}

export default LoginPhpFox;
