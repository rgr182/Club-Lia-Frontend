import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FuseAnimate from '@fuse/core/FuseAnimate';
import BackButton from '../preescolar/components/BackButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FirebaseEvent } from 'app/main/firebase/FirebaseEvents';
import GalaxyIsland from './components/GalaxyIsland';

const useClasses = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	imgClass: {
		width: 350,
		height: 350
	},
	imgClassCenter: {
		width: 340,
		height: 340,
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	backgorundScreen: {
		flex: 1,
		backgroundImage: 'url(assets/images/mygalaxies/background.png)',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	},
	imageFlexContainer: {
		display: 'flex',
		width: '100%',
		zIndex: 1,
		['@media (max-width: 800px)']: {
			flexDirection: 'column'
		}
	},
	imageFlexContainerSecond: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		zIndex: -1,
		marginTop: -100,
		['@media (max-width: 800px)']: {
			flexDirection: 'column',
			zIndex: 'auto',
			marginTop: 0
		}
	},
	clubVerdeImg: {
		width: 340,
		height: 340,
		flexDirection: 'column',
		['@media (max-width: 800px)']: {
			float: 'unset',
			marginRight: 0
		}
	},
	clubFelicidadImg: {
		width: 350,
		height: 350,
		flexDirection: 'column',
		['@media (max-width: 800px)']: {
			float: 'unset',
			marginLeft: 0
		}
	},
	clubArteImg: {
		width: 350,
		height: 350,
		float: 'right',
		['@media (max-width: 800px)']: {
			float: 'unset'
		}
	},
	clubLetrasImg: {
		width: 350,
		height: 350,
		float: 'left',
		['@media (max-width: 800px)']: {
			float: 'unset'
		}
	},
	imgLia: {
		zIndex: 3,
		width: '80px',
		textAlign: 'center',
		alignSelf: 'center'
	},
	buttonDialog: {
		alignContent: 'center',
		textAlign: 'center',
		width: '150px',
		borderRadius: '45px',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',

		background: '#f32773',
		color: '#fff',

		'&:hover': {
			background: '#6652e7',
			color: '#fff',
			borderColor: '#60CEFF'
		}
	},
	Text: {
		width: 340,
		fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '30px' : '22px'),
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: 'center',
		alignSelf: 'center'
	},
	TextDialog: {
		fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '30px' : '22px'),
		color: '#6652e7',
		text: 'center',
		alignSelf: 'center'
	}
}));

export default function CenteredGrid() {
	const classes = useClasses(nivel);
	const history = useHistory();

	const user = useSelector(({ auth }) => auth.user);
	const grade = useSelector(({ auth }) => auth.user.grade);
	let role = useSelector(({ auth }) => auth.user.role);

	if (user.role !== 'alumno' && user.role !== 'alumno_secundaria' && user.role !== 'preescolar') {
		user.data.level_id === 1
			? (role = 'preescolar')
			: user.data.level_id === 2
			? (role = 'alumno')
			: (role = 'alumno_secundaria');
	}
	const nivel =
		(role === 'alumno' && user.grade > 3) || role === 'alumno_secundaria' ? 2 : role === 'preescolar' ? 0 : 1;
	const limited = user.role === 'Alumno-I';

	const [openDialog, setOpenDialog] = useState(false);

	function handleOpen(disabled, island) {
		if (disabled) {
			setOpenDialog(true);
			return;
		}
		// logFirebaseEvent(island.event, user);
		history.push(island.to);
	}

	const handleClose = () => {
		// Modal of confirm Delete Resource Disabled
		setOpenDialog(false);
	};

	return (
		<div className={classes.backgorundScreen}>
			<div style={{ marginTop: 0 }}>
				<FuseAnimate animation="transition.slideUpBigIn" duration={2000}>
					<div
						className={
							(classes.imageFlexContainer, 'flex flex-1 items-center justify-center flex-wrap flex-row')
						}
					>
						<div className="w-full flex-wrap sm:w-1/2 md:w-1/4 text-center items-center justify-center flex-col">
							<GalaxyIsland
								buttonClass={classes.clubVerdeImg}
								textClass={classes.Text}
								opacity={limited ? 0.5 : 1}
								onClick={() =>
									handleOpen(limited, {
										to: '/apps/galaxies/clubs/verde',
										event: FirebaseEvent.GREEN_GALAXY.value
									})
								}
								imageSrc="assets/images/mygalaxies/club-verde.png"
								label="Club Verde"
							/>
						</div>
						{(nivel === 2 || (nivel === 1 && grade === 3)) && (
							<div className="w-full flex-wrap sm:w-1/2 md:w-1/4 text-center items-center justify-center flex-col">
								<GalaxyIsland
									buttonClass={classes.clubFelicidadImg}
									textClass={classes.Text}
									opacity={limited ? 0.5 : 1}
									onClick={() =>
										handleOpen(limited, {
											to: '/apps/galaxies/clubs/felicidad',
											event: FirebaseEvent.HAPPY_GALAXY.value
										})
									}
									imageSrc="assets/images/mygalaxies/club-felicidad.png"
									label="Club de la Felicidad"
								/>
							</div>
						)}
					</div>
				</FuseAnimate>

				<FuseAnimate animation="transition.slideUpBigIn" duration={2000}>
					<div
						className={
							(classes.imageFlexContainerSecond,
							'flex flex-1 items-center justify-center flex-wrap flex-row')
						}
					>
						{nivel === 2 && (
							<div className="w-full flex-wrap sm:w-1/2 md:w-1/4 text-center items-center justify-center flex-col">
								<GalaxyIsland
									buttonClass={classes.clubArteImg}
									textClass={classes.Text}
									opacity={limited ? 0.5 : 1}
									onClick={() =>
										handleOpen(limited, {
											to: '/apps/galaxies/clubs/arte',
											event: FirebaseEvent.ART_GALAXY.value
										})
									}
									imageSrc="assets/images/mygalaxies/club-arte.png"
									label="Club de Arte"
								/>
							</div>
						)}

						<div className="w-full flex-wrap sm:w-1/2 md:w-1/4 text-center items-center justify-center flex-col">
							<GalaxyIsland
								buttonClass={classes.imgClassCenter}
								textClass={classes.Text}
								opacity={1}
								onClick={() =>
									handleOpen(false, {
										to: '/apps/galaxies/clubs/futuro',
										event: FirebaseEvent.FUTURE_GALAXY.value
									})
								}
								imageSrc="assets/images/mygalaxies/club-futuro.png"
								label="Club del Futuro"
							/>
						</div>
						<div className="w-full flex-wrap sm:w-1/2 md:w-1/4 text-center items-center justify-center flex-col">
							<GalaxyIsland
								buttonClass={classes.clubLetrasImg}
								textClass={classes.Text}
								opacity={limited ? 0.5 : 1}
								onClick={() =>
									handleOpen(limited, {
										to: '/apps/galaxies/clubs/letras',
										event: FirebaseEvent.LETTER_GALAXY.value
									})
								}
								imageSrc="assets/images/mygalaxies/club-letras.png"
								label="Club de Letras"
							/>
						</div>
					</div>
				</FuseAnimate>
				<BackButton goBack={history.goBack} />

				{/* Modal */}
				<Dialog
					classes={{
						paper: 'm-24 rounded-12 pt-32 pb-32'
					}}
					open={openDialog}
					onClose={handleClose}
					fullWidth
					maxWidth="xs"
				>
					<img className={clsx(classes.imgLia)} src={'assets/images/logos/logoComunidad.png'} />
					<DialogContent classes={{ root: 'p-28 text-center' }}>
						<Typography className={clsx(classes.TextDialog)}>
							Diviértete al máximo y adquiere una membresía mensual o anual.
						</Typography>
					</DialogContent>
					<div className="flex flex-wrap flex-row w-full justify-center">
						<Button
							className={clsx(classes.buttonDialog)}
							variant="contained"
							color="primary"
							onClick={handleClose}
							autoFocus
						>
							<Typography className={clsx(classes.Text)}>Cerrar</Typography>
						</Button>
					</div>
				</Dialog>
			</div>
		</div>
	);
}
