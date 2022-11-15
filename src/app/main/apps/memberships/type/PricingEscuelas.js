import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
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
		color: "#0071e7",
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
		backgroundColor: "#0071e7",
		color: theme.palette.getContrastText(theme.palette.primary[600])
	},
	backColButton: {
		backgroundColor: "#0071e7",
	},
	textButton: {
		color: "#FFF",
		fontSize:"16px"
	},
	img: {
		width:"100%"
	}
}));



function PricingEscuelas(props) {
	const price1 = props.price1;
	const price2 = props.price2;
	const price3 = props.price3;

	const classes = useStyles();

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if(token){
			console.log("token_exists::");
		}else{
			console.log("token_exists::no");
		}
	}
	

	return (
		<div>
			<div className={clsx(classes.header, 'flex')}>
				<div className="w-full">
					<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
						<img  src="assets/images/pricing/fondo_azul.png" className={clsx(classes.img)} alt="circle"/>
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
											Acceso como visitante a Grupos LIA
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Acceso a Recursos Digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Visualizar Experiencias LIA en vivo
										</Typography>
                                        <Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Posibilidad de participación en experiencias LIA con pago por evento
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Webinars
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Cursos abiertos para escuelas y directores
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
											Acceso total a toda su comunidad educativa. Para sus alumnos, maestros y padres (preescolar, primaria y secundaria)
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso personalizado a su propio grupo escolar: Comunicación, interacción y colaboración con su comunidad educativa
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Grupos de trabajo personalizados y colaboración
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Panel de control del colegio (admin. de usuarios)
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades LIA para sus maestros
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Mundo LIA (videojuegos y actividades digitales para alumnos)
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Tablero de información de sus alumnos y maestros en base a sus actividades
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación en Experiencias LIA para sus alumnos, maestros y padres
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Actividades especiales con costo de 25% descuento de su precio
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos mensuales para el total de sus maestros
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos a elegir para papás por ciclo
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Prioridad en actividades no incluidas
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Preventa preferencial, 25% para miembros LIA
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
											Acceso total a toda su comunidad educativa. Para sus alumnos, maestros y padres (preescolar, primaria y secundaria)
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso personalizado a su propio grupo escolar: Comunicación, interacción y colaboración con su comunidad educativa
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Grupos de trabajo personalizados y colaboración
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Panel de control del colegio (admin. de usuarios)
										</Typography>
                                        <Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos digitales
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades LIA para sus maestros
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Mundo LIA (videojuegos y actividades digitales para alumnos)
										</Typography>
										<Typography>
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Tablero de información de sus alumnos y maestros en base a sus actividades
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación en Experiencias LIA para sus alumnos, maestros y padres
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación incluida en Premios LIA, incluido posibilidad de nominación como colegio Líder Innovador en aprendizaje
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Participación en Experiencias LIA de Comunidad
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Experiencias y eventos con costo al 50%
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Cursos mensuales para el total de sus maestros
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Cursos a elegir para papas por ciclo (Prioridad en actividades no incluidas)
										</Typography>
										<Typography>
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
										Preventa preferencial (50% para miembros LIA)
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

export default PricingEscuelas;
