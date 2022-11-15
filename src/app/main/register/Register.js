import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth0RegisterTab from './tabs/Auth0RegisterTab';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';
import ParentRegisterTab from './tabs/ParentRegisterTab';
import SchoolRegisterTab from './tabs/SchoolRegisterTab';
import TeacherRegisterTab from './tabs/TeacherRegisterTab';
import reducer from './store';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	cardContentStyle:{flexGrow:1}
}));

function Register(props) {
	const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search); 
	const type = params.get('type'); 
	const membership = params.get('membership');
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					
					<div
						className={clsx(classes.rightSection, 'flex flex-col w-full max-w-sm items-center justify-center')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Bienvenido a<br />
									Sistema <br /> Club LIA!
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									{type == "maestro" ? "Registro como usuario maestro." : type == "padre" ? "Registro como usuario padre." : "Ponte en contacto con nosotros para crear tu usuario escuela."}
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle2" color="inherit">
									Administración de Licencias para tu institución.
								</Typography> 
							</FuseAnimate>
						</div>
					</div>
					
					<Card
						className={clsx(
							classes.leftSection,'hidden md:flex flex-1 justify-center px-64 py-32'
						)}
						square
						elevation={0}
					>
						<CardContent className={clsx(classes.cardContentStyle,"flex flex-col items-center justify-center w-full")}>
							<FuseAnimate delay={300}>
								<div className="flex items-center justif-center mb-32">
									<img className="logo-icon w-50" src="assets/images/logos/clublia.png" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">

										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>

										</Typography>
									</div>
								</div>
							</FuseAnimate>
							<div className="flex flex-col w-full items-center justify-center pb-32">
								{type == "maestro" ? <TeacherRegisterTab membership={membership}/> : 
								type == "padre" ? <ParentRegisterTab membership={membership}/> : 
												<SchoolRegisterTab membership={membership}/>}
							</div>
							<div className="flex flex-col items-center justify-center pb-32">
								<div>
									<span className="font-medium mr-8">Ya tiene una cuenta de usuario?</span>
									<Link className="font-medium" to="/login">
										Entrar
									</Link>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Register;
