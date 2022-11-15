import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function MaintenancePage() {
	const classes = useStyles();
	const role = useSelector(({ auth }) => auth.user.role);

	return (
		role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' ||
		role == 'maestro' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Escuela-I' ||
		role == 'Escuela-M' || role == 'Escuela-A' || role == 'Maestro-I' ||  role == 'Maestro-M' || role == 'Maestro-A' || 
		role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria' ?
			<div
				style={{
					backgroundImage: `url("assets/images/backgrounds/Maestro6.png")`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '100%',
				}}
			></div>
		:
			<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
				<div className="flex flex-col items-center justify-center w-full">
					<Grow in>
						<Card className="w-full max-w-384 rounded-8">
							<CardContent className="flex flex-col items-center justify-center text-center p-48">
								<img className="w-128 m-32" src="assets/images/logos/clublia.png" alt="logo"/>
								<Typography variant="h4" color="inherit" className="font-800 leading-tight">
									Bienvenido a
									Sistema ClubLIA!
								</Typography>
							</CardContent>
						</Card>
					</Grow>
				</div>
			</div>

	);

}

export default MaintenancePage;
