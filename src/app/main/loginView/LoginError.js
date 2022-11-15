import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
	circle:{position:"absolute",top:"10%",bottom:"10%",left:0,right:"75%",zIndex:2},
	buttons_mobile_view:{width:"100%", position:"absolute",top:"10%",zIndex:0},
	circle_image:{width:100},
	circle_image_horizontal:{maxHeight:"100%",padding:0},
	textButton:{position:"absolute",justifyContent:"center",alignSelf:"center",color:"#FFF"},
	divCard:{flexDirection:"row",zIndex:2},
	divFooter:{zIndex:1,height:"10%"},
	footerStyle:{width:"100%",alignSelf:"end"},
	leftSection: {},
	rightSection: {borderRadius:15},
	loginLeftSection:{height:"100%"},
	loginLeftSectionImg:{height:"30%"}
}));




function LoginError(props) {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const [widthFlag, setFlag] = useState(true);
	const [selectedUserType, setUserType] = useState(1);
	
    const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search); 
	const messageError = params.get('message');

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<>
		<div
			className={clsx(
				selectedUserType == 1 ? classes.root_alumnos : selectedUserType == 2 ? classes.root_maestros : selectedUserType == 3 ? classes.root_padres : classes.root_escuelas,
				'flex flex-col flex-fixed flex-auto justify-center flex-shrink-0 items-center'
			)}
		>
			<div className={clsx(
				selectedUserType == 1 ? classes.image_overlay_alumnos : selectedUserType == 2 ? classes.image_overlay_maestros : selectedUserType == 3 ? classes.image_overlay_padres : classes.image_overlay_escuelas
				)}/>

			<FuseAnimate animation="transition.slideUpIn" delay={400}>
					<div className='flex flex-col w-full p-80 m-80'>
						<Typography fontFamily variant="h1" color="inherit" className="font-400 leading-tight justify-center p-80 m-80" class="home-title">
							<div className={"grobold"}>
								{messageError}
							</div>
							<Link className={"grobold"} to="/login">Regresar al Login</Link>

						</Typography>
					
				</div>
			</FuseAnimate>

		</div>
		</>
	);			
}

export default LoginError;
