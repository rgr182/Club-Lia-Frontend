import FuseAnimate from '@fuse/core/FuseAnimate';
import { Box, Modal } from '@material-ui/core';
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
import Auth0LoginTab from './tabs/Auth0LoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import JWTLoginTab from './tabs/JWTLoginTab';

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
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
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
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center'
						)}
						square
						elevation={0}
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									<img className="logo-icon w-49" src="assets/images/logos/clublia.png" alt="logo" />
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

							<Tabs
								value={selectedTab}
								onChange={handleTabChange}
								variant="fullWidth"
								className="w-full mb-32"
							>
								{/*<Tab*/}
								{/*	icon={*/}
								{/*		<img*/}
								{/*			className="h-40 p-4 bg-black rounded-12"*/}
								{/*			src="assets/images/logos/jwt.svg"*/}
								{/*			alt="firebase"*/}
								{/*		/>*/}
								{/*	}*/}
								{/*	className="min-w-0"*/}
								{/*	label="JWT"*/}
								{/*/>*/}
								{/*<Tab*/}
								{/*	icon={*/}
								{/*		<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase" />*/}
								{/*	}*/}
								{/*	className="min-w-0"*/}
								{/*	label="Firebase"*/}
								{/*/>*/}
								{/*<Tab*/}
								{/*	icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0" />}*/}
								{/*	className="min-w-0"*/}
								{/*	label="Auth0"*/}
								{/*/>*/}


							</Tabs>

							{selectedTab === 0 && <JWTLoginTab />}
							{selectedTab === 1 && <FirebaseLoginTab />}
							{selectedTab === 2 && <Auth0LoginTab />}
						</CardContent>

						{/*<div className="flex flex-col items-center justify-center pb-32">*/}
						{/*	<div>*/}
						{/*		<span className="font-medium mr-8">No tiene una cuenta de usuario?</span>*/}
						{/*		<Link className="font-medium" to="/register">*/}
						{/*			Ir a Registro*/}
						{/*		</Link>*/}
						{/*	</div>*/}
						{/*	<Link className="font-medium mt-8" to="/">*/}

						{/*	</Link>*/}
						{/*</div>*/}
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Bienvenido a<br />
									Sistema <br /> Club LIA!
								</Typography>
							</FuseAnimate>
							<Button onClick={handleOpen}>Open modal</Button>
							<Modal
								keepMounted
								open={true}
								onClose={handleClose}
								aria-labelledby="keep-mounted-modal-title"
								aria-describedby="keep-mounted-modal-description"
							>
								<Box>
									<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
										Text in a modal
									</Typography>
									<Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
										Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
									</Typography>
								</Box>
							</Modal>

							<FuseAnimate delay={500} >
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Administración de Licencias para tu institución.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
