import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../preescolar/components/LogoutButton';
import BackButton from '../preescolar/components/BackButton';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { getSubjects } from './store/subjectsSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import Carousel from 'react-elastic-carousel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
	Text: {
		fontFamily: ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
		fontSize: ({ nivel }) => nivel == 2 ? "38px" : "28px",
		fontWeight: '500',
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	button: {
		"&:hover": {
			transform: "scale(1.2)"
		}
	},
	carousel:  ({ color, isMoreThan4 }) => ( {
		"& .rec.rec-arrow": {
			[theme.breakpoints.up("lg")]: {
				visibility: !isMoreThan4 ? 'hidden' : 'visible'
			},
			[theme.breakpoints.up("xl")]: {
				visibility: !isMoreThan4 ? 'hidden' : 'visible'
			},
			backgroundColor: `rgb( ${color}, 0.4)`,
			"&:hover": {
				backgroundColor: `rgb( ${color}, 0.8)`,
			},
			"&:focus": {
				backgroundColor: `rgb( ${color}, 1)`,
			}
		},
		"& .rec.rec-dot": {
			[theme.breakpoints.up("lg")]: {
				visibility: !isMoreThan4 ? 'hidden' : 'visible'
			},
			[theme.breakpoints.up("xl")]: {
				visibility: !isMoreThan4 ? 'hidden' : 'visible'
			},
			backgroundColor: 'transparent',
			"&:hover": {
				boxShadow: `0 0 1px 3px rgb( ${color}, 0.5)`,
			},
			"&:focus": {
				boxShadow: `0 0 1px 3px rgb( ${color}, 1)`,
			}
		},
		"& .rec-dot_active": {
			boxShadow: `0 0 1px 3px rgb( ${color}, 1)`,
		}
	}),
	imgLia: {
		// marginTop: "-90px",
		// paddingTop: "20px",
		// paddingButton: "40px",
		// height: "70px",
    // position: 'absolute',
    zIndex: 3,
		width: "80px",
		textAlign: "center",
    alignSelf: "center",
	},
	buttonDialog: {
		alignContent: 'center',
		textAlign: 'center',
		width: '150px',
		borderRadius: '45px',
		// background: 'transparent',
		// color: '#00B1FF',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		// border: 'solid #00B1FF 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',

		background: '#f32773',
		color: '#fff',

		'&:hover': {
			background: '#6652e7',
			color: '#fff',
			borderColor: '#60CEFF'
		},
		// border: 'solid #60CEFF 3px',

	},
  TextDialog: {
    // width: 100%,
		fontFamily:  ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
		fontSize: ({ nivel }) => nivel == 2 ? "30px" : "22px",
		color: '#6652e7',
		// textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextCerrar: {
		width: 340,
			fontFamily:  ({ nivel }) => nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`,
			fontSize: ({ nivel }) => nivel == 2 ? "30px" : "22px",
			color: 'white',
			textShadow: '2px 2px 2px black',
			text: "center",
			alignSelf: "center",
		},

}));


function ClubsLayout(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const subjects = useSelector(({ galaxiesApp }) => galaxiesApp.subjects.data);
	const info = useSelector(({ auth }) => auth.user);
	var role = useSelector(({ auth }) => auth.user.role);
	const grade = useSelector(({ auth }) => auth.user.grade);
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;
	const [club, setClub] = useState(0);
	const limited = info.role == 'Alumno-I' ? true : false;
	const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpen = () => {
		// Modal of confirm Delete Resource Enabled
		setOpenDialog(true);
	};

	const handleClose = () => {
		// Modal of confirm Delete Resource Disabled
		setOpenDialog(false);
	};
	const [ciencias, setCiencias] = useState('');
	const [arte, setArte] = useState('');
	const [geografia, setGeografia] = useState('');
	const [historia, setHistoria] = useState('');
	const [espanol, setEspanol] = useState('');
	const [ingles, setIngles] = useState('');
	const [matematicas, setMatematicas] = useState('');
	const [tecnologia, setTecnologia] = useState('');
	const [civismo, setCivismo] = useState('');
	const [salud, setSalud] = useState('');
	const [edSocioemocional, setEdSocioemocional] = useState('');

	const carouselRef = React.useRef(null);
	const onNextStart = (currentItem, nextItem) => {
		if (currentItem.index === nextItem.index) {
			// we hit the last item, go to first item
			carouselRef.current.goTo(0);
		}
	};
	const onPrevStart = (currentItem, nextItem) => {
		if (currentItem.index === nextItem.index) {
			// we hit the first item, go to last item
			carouselRef.current.goTo(theme.islands[club].length);
		}
	};

	useDeepCompareEffect(() => {
		dispatch(getSubjects());
		switch (routeParams.club) {
			case 'arte': {
				return setClub(0);
			};
			case 'verde': {
				return setClub(1);
			};
			case 'futuro': {
				return setClub(2);
			};
			case 'felicidad': {
				return setClub(3);
			};
			case 'letras': {
				return setClub(4);
			};
		}

	}, [dispatch,]);


	useEffect(() => {
		if (subjects) {
			for (let i = 0; i < subjects.length; i++) {
				if (subjects[i].name == 'Arte') {
					setArte(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Ciencias naturales') {
					setCiencias(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Geografía') {
					setGeografia(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Historia') {
					setHistoria(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Español') {
					setEspanol(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Inglés') {
					setIngles(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Matemáticas') {
					setMatematicas(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Tecnología y Habilidades Digitales') {
					setTecnologia(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Formación Cívica y Ética') {
					setCivismo(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Salud y Bienestar') {
					setSalud(subjects[i]);
					continue;
				}
				if (subjects[i].name == 'Educación Socioemocional') {
					setEdSocioemocional(subjects[i]);
					continue;
				}
			}
		}
	}, [subjects]);

	const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 850, itemsToShow: 3 },
        { width: 1150, itemsToShow: 4 },
    ]

	const island = {
		island2: [
			'',
			'assets/images/resources/islands/mundoLia1.png',
			'assets/images/resources/islands/mundoLia2.png'
		],
		island3: [
			'',
			'assets/images/resources/islands/misClases1.png',
			'assets/images/resources/islands/misClases2.png'
		]
	}

	const theme = {
		background: [
			'assets/images/primariaalta/BACK.png',
			'assets/images/primariaalta/BACK2.png',
			'assets/images/resources/azul.png',
			'assets/images/resources/naranja.png',
			'assets/images/resources/morado.png'
		],
		islands: [
			[ //------Arte-------
				{
					image: 'assets/images/resources/islands/Arte.png',
					label: 'ARTE',
					to: '/apps/galaxies/recursos/' + arte.id + '/' + arte.name,
					hide: true
				},
				{
					image: 'assets/images/resources/islands/Historia.png',
					label: 'HISTORIA',
					to: '/apps/galaxies/recursos/' + historia.id + '/' + historia.name,
					hide: nivel == 1 ? true :  false
				},
				{
					image: island.island3[nivel],
					label: 'MIS CLASES',
					to: '/apps/sections/calendario'
				},
				{
					image: island.island2[nivel],
					label: 'MUNDO LIA',
					to: '/loginp'
				},
			],
			[ //------Verde-------
				{
					image: 'assets/images/resources/islands/Ciencias naturales.png',
					label: 'CIENCIAS NATURALES',
					to: '/apps/galaxies/recursos/' + ciencias.id + '/' + ciencias.name
				},
				{
					image: 'assets/images/resources/islands/Geografia.png',
					label: 'GEOGRAFÍA',
					to: '/apps/galaxies/recursos/' + geografia.id + '/' + geografia.name,
					hide: nivel == 1 ? true :  false
				},
				{
					image: island.island3[nivel],
					label: 'MIS CLASES',
					to: '/apps/sections/calendario'
				},
				{
					image: island.island2[nivel],
					label: 'MUNDO LIA',
					to: '/loginp'
				},
			],
			[ //------Futuro-------
				{
					image: 'assets/images/resources/islands/Matematicas.png',
					label: 'MATEMÁTICAS',
					to: '/apps/galaxies/recursos/' + matematicas.id + '/' + matematicas.name
				},
				{
					image: 'assets/images/resources/islands/Tecnologia y Habilidades Digitales.png',
					label: 'TECNOLOGÍA Y HABILIDADES DIGITALES',
					to: '/apps/galaxies/recursos/' + tecnologia.id + '/' + tecnologia.name
				},
				{
					image: island.island3[nivel],
					label: 'MIS CLASES',
					to: '/apps/sections/calendario'
				},
				{
					image: island.island2[nivel],
					label: 'MUNDO LIA',
					to: '/loginp'
				},
			],
			[ //------Felicidad-------
				{
					image: 'assets/images/resources/islands/Formacion Civica y Etica.png',
					label: 'FORMACIÓN CÍVICA Y ÉTICA',
					to: '/apps/galaxies/recursos/' + civismo.id + '/' + civismo.name,
					hide: nivel == 1 && (grade == 2 || grade == 1) ? true :  false
				},
				{
					image: 'assets/images/resources/islands/Salud y Bienestar.png',
					label: 'SALUD Y BIENESTAR',
					to: '/apps/galaxies/recursos/' + salud.id + '/' + salud.name
				},
				{
					image: 'assets/images/resources/islands/Educacion Socioemocional.png',
					label: 'EDUCACIÓN SOCIOEMOCIONAL',
					to: '/apps/galaxies/recursos/' + edSocioemocional.id + '/' + edSocioemocional.name,
					hide: true
				},
				{
					image: island.island3[nivel],
					label: 'MIS CLASES',
					to: '/apps/sections/calendario'
				},
				{
					image: island.island2[nivel],
					label: 'MUNDO LIA',
					to: '/loginp'
				},
			],
			[ //------Letras-------
				{
					image: 'assets/images/resources/islands/Espanol.png',
					label: 'ESPAÑOL',
					to: '/apps/galaxies/recursos/' + espanol.id + '/' + espanol.name
				},
				{
					image: 'assets/images/resources/islands/Ingles.png',
					label: 'INGLÉS',
					to: '/apps/galaxies/recursos/' + ingles.id + '/' + ingles.name
				},
				{
					image: island.island3[nivel],
					label: 'MIS CLASES',
					to: '/apps/sections/calendario'
				},
				{
					image: island.island2[nivel],
					label: 'MUNDO LIA',
					to: '/loginp'
				},
			],
		],
		colors: [ '91,15,136', '8,94,112', '0,58,131', '235,195,137', '94,16,136']
	}

	// Para ocultar las flechitas en el club de la felicidad cuando solo son 4 islas en lugar de 5
	const hide2 = club == 3;
	const classes = useStyles({ nivel, color: theme.colors[club], isMoreThan4: (theme.islands[club].length > 4 && !hide2)});

	return (
		<div className="flex flex-1"
			style={{
				backgroundImage: `url(${theme.background[club]})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}>
			<FuseAnimateGroup
				className="flex flex-wrap p-64 mt-128 px-50 w-full"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				{(subjects && subjects.length > 0) &&
					<Carousel
						itemsToShow={4}
						className={clsx(classes.carousel, "text-center")}
						ref={carouselRef}
						onPrevStart={onPrevStart}
						onNextStart={onNextStart}
						disableArrowsOnEnd={false}
						breakPoints={breakPoints}
					>
						{theme.islands[club].map((boton) =>
							!boton.hide &&
							<>
								{limited && (boton.label != 'MATEMÁTICAS' && boton.label != 'MUNDO LIA' && boton.label != 'MIS CLASES') ?
									<div key={boton.label} style={{ opacity: 0.5 }}>
										<Button
											disableRipple
											className={clsx(classes.button)}
											style={{ backgroundColor: 'transparent' }}
											onClick={handleOpen}
											type="button"
										>
											<img src={boton.image} className="float" />
										</Button>
										<Button
											disableRipple
											style={{ backgroundColor: 'transparent' }}
											onClick={handleOpen}
											color="secondary"
										>
											<Typography className={clsx(classes.Text)}>
												{boton.label}
											</Typography>
										</Button>
									</div>
									:
									<div key={boton.label}>
										<Button
											disableRipple
											className={clsx(classes.button)}
											style={{ backgroundColor: 'transparent' }}
											to={boton.to}
											component={Link}
											type="button"
										>
											<img src={boton.image} className="float" />
										</Button>
										<Button
											disableRipple
											style={{ backgroundColor: 'transparent' }}
											to={boton.to}
											component={Link}
											color="secondary"
										>
											<Typography className={clsx(classes.Text)}>
												{boton.label}
											</Typography>
										</Button>
									</div>

								}
							</>
						)}
					</Carousel>
				}
				<BackButton goBack={props.history.goBack} />

				{/* Modal */}
			</FuseAnimateGroup>
				<Dialog
					classes={{
						paper: 'm-24 rounded-12 pt-32 pb-32',
					}}
					open={openDialog}
					onClose={handleClose}
					fullWidth
					maxWidth="xs"
				>
					<img className={clsx(classes.imgLia)} src={"assets/images/logos/logoComunidad.png"} />
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
							onClick={
								handleClose
							}
							autoFocus
						>
							<Typography className={clsx(classes.TextCerrar)}>
								Cerrar
							</Typography>
						</Button>
					</div>
				</Dialog>
		</div>
	);
}

export default withReducer('galaxiesApp', reducer)(ClubsLayout);
