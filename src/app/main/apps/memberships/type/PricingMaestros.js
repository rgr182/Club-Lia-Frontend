import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { storeOrder } from 'app/auth/store/registerSlice';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
	header: {
		height: 600,
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	badge: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.error.main)
	},
	textTitle: {
		color: "#e90a03",
	},
	priceText: {
		fontWeight:"bold",
		fontSize:"20px"
	},
	textRegistro: {
		fontWeight:"bold",
		fontSize:"26px"
	},
	price: {
		backgroundColor: "#e90a03",
		color: theme.palette.getContrastText(theme.palette.primary[600])
	},
	backColButton: {
		backgroundColor: "#e90a03",
	},
	textButton: {
		color: "#FFF",
		fontSize:"16px"
	},
	img: {
		width:"100%"
	}
}));



function PricingMaestros(props) {
	const price1 = props.price1;
	const price2 = props.price2;
	const price3 = props.price3;

	const classes = useStyles();
	const dispatch = useDispatch();
	const Membership = useSelector(({ PricingApp }) => PricingApp.pricing.RegisterScreen);

	// const RegisterScreen = useSelector(({ PricingApp }) => PricingApp.pricing);
	// console.log(RegisterScreen);

	function handleSubmit(event) {
		var model = {'id_licenses_type':event == "mensual" ? 5 : 6};
		dispatch(storeOrder(model));
	}


	return (
		<div>
			<div className={clsx(classes.header, 'flex')}>
				<div className="w-full">
					<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
						<img  src="assets/images/pricing/fondo_rojo.png" className={clsx(classes.img)} alt="circle"/>
					</FuseAnimate>
				</div>
			</div>

			<div className="w-full -mt-192 flex-end">
				<div className="w-full max-w-4xl mx-auto justify-end">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
						className="flex flex-wrap justify-end"
					>

						{/* -----------------------------GRATIS------------------------------- */}

						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="rounded-8">
								<div className="p-32 text-center">
									<Typography className={clsx(classes.textRegistro)}>
											Registro
									</Typography>
									<Typography className={clsx(classes.textTitle,"text-32")}>
										<div className={"grobold"}>
											INVITADO
										</div>
									</Typography>
								</div>

								<CardContent className="p-0">
                                    <div className={clsx(classes.price, 'flex items-end justify-center py-16 px-32')}>
										<Typography color="inherit" className={clsx(classes.priceText)}>
											Sin Costo
										</Typography>
									</div>

									<div className="flex flex-col p-10">
                                        <Typography className="mb-16">
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											    Recursos digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Canal LIA 
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast LIA 
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo LIA 
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Presenciar Experiencias LIA (limitadas)
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Grupos especializados para Maestros (limitado)
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Webinars
										</Typography>
                                        <Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Entrevistas
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Cursos abiertos para maestros (limitados) 
										</Typography>
										<Typography>
											(No considerados para premios LIA) 
										</Typography>

									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="inherit" className={clsx(classes.backColButton,"w-full")}
									onClick={ev => handleSubmit('gratis')}
									>
										<Typography className={clsx(classes.textButton)}>
											<div className={"grobold"}>
												REGISTRARME
											</div>
										</Typography>
									</Button>
								</div>
							</Card>
						</div>

						{/* -----------------------------MENSUAL------------------------------- */}
						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="relative rounded-8" raised>
								<div className="p-32 text-center">
									<Typography className={clsx(classes.textRegistro)}>
											Membresía
									</Typography>
									<Typography className={clsx(classes.textTitle,"text-32")}>
										<div className={"grobold"}>
											MENSUAL
										</div>
									</Typography>
								</div>

								<CardContent className=" p-0">
									<div className={clsx(classes.price, 'text-center flex items-end justify-center py-16 px-32')}>
										<Typography color="inherit" className={clsx(classes.priceText)}>
											$ {price2} m.n. mensual
										</Typography>
									</div>

									<div className="flex flex-col p-10">
                                        <Typography className="mb-16">
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades CL+
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Canal LIA 
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast LIA 
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo LIA
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Webinars
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Entrevistas
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Presenciar Experiencias LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de acreditación como Maestro LIA Creador
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Mundo LIA: Videojuegos completo
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Panel de control maestro
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de registro de sus alumnos
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Dashboard / panel de control para sus alumnos
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Premios LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación en eventos experiencias y todas las convocatorias LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de participar como Mentor LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Tres cursos mensuales
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos, masterclass con costo y eventos no incluidos en membresía con 25% descuento de su precio
										</Typography>
									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="inherit" className={clsx(classes.backColButton,"w-full")}
									onClick={ev => handleSubmit('mensual')}
									>
										<Typography className={clsx(classes.textButton)}>
											<div className={"grobold"}>
												QUIERO SER MIEMBRO
											</div>
										</Typography>
									</Button>
								</div>
							</Card>
						</div>

						{/* -----------------------------ANUAL------------------------------- */}

						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="relative rounded-8">
								<div className="p-32 text-center">
									<Typography className={clsx(classes.textRegistro)}>
											Membresía
									</Typography>
									<Typography className={clsx(classes.textTitle,"text-32")}>
										<div className={"grobold"}>
											ANUAL
										</div>
									</Typography>
								</div>

								<CardContent className="p-0">
									<div className={clsx(classes.price, 'text-center flex justify-center flex-col py-16 px-32')}>
										<Typography color="inherit" className={clsx(classes.priceText)}>
											$ {(price3/12).toFixed(2)} m.n. mensual
										</Typography>
										<Typography color="inherit">
											(Pago anual ${price3} m.n.)
										</Typography>
									</div>

									<div className="flex flex-col p-10">
                                        <Typography className="mb-16">
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades CL+
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Canal LIA 
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast LIA 
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo LIA
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Webinars
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Entrevistas
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Presenciar Experiencias LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de acreditación como Maestro LIA Creador
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Mundo LIA: Videojuegos completo
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Panel de control maestro
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de registro de sus alumnos
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Dashboard / panel de control para sus alumnos
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Premios LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación en eventos experiencias y todas las convocatorias LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de participar como Mentor LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Experiencia LIA con costo y eventos no incluidos en membresía con 50% descuento de su precio
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos ilimitados al mes
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos, masterclass con costo y eventos no incluidos en membresía con 50% descuento de su precio
										</Typography>
									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="inherit" className={clsx(classes.backColButton,"w-full")}
										onClick={ev => handleSubmit('anual')}>
										<Typography className={clsx(classes.textButton)}>
											<div className={"grobold"}>
												QUIERO SER MIEMBRO
											</div>
										</Typography>
									</Button>
								</div>
							</Card>
						</div>
					</FuseAnimateGroup>
					
				</div>
			</div>
		</div>
	);
}

export default PricingMaestros;
