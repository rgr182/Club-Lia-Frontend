import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubjectsTable from './SubjectsTable';
import { openEditSubjectDialog, removeSubject, selectSubjects } from './store/subjectSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

//Modal
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const usrRol = ['Maestro-A', 'Maestro-M', 'Maestro-I', 'maestro_secundaria', 'maestro_preescolar', 'maestro',  'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'];

const useStyles = makeStyles(theme => ({
	//List, tabs and modal
	react_responsive_modal_modal: {
		maxWidth: "800px",
		display: "inline-block",
		textAlign: "left",
		verticalAlign: "middle",
		background: "#ffffff",
		boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.25)",
		margin: "1.2rem",
		padding: "1.2rem",
		position: "relative",
		overflowY: "auto",
		borderRadius: 30
	},
	numberList: {
		display: "inline-block",
		padding: "6px 15px",
		borderRadius: "50%",
		fontSize: "18px",
		textAlign: "center",
		background: "#545AB7",
		color: "#fefefe"
	},
	contentOfTabs: {
		width: 650
	},
	titleInsideTab: {
		fontFamily: 'poppins',
		color: '#545AB7',
		textAlign: 'center'
	},
	marginContainer: {
		marginLeft: 50,
		marginRight: 50
	},
	containerList: {
		display: 'flex'
	},
	sizeNumberList: {
		width: '10%'
	},
	sizeDescriptioinList: {
		width: '90%'
	},
	descriptionList: {
		padding: 10,
		fontFamily: 'poppins',
		color: '#343434'
	},
	buttonOpenModal: {
		color: '#FFF',
		backgroundColor: '#5557BD',
		fontFamily: 'grobold'
	},
	buttonContainer: {
		display: 'flex'
	},
	buttonContainerLeft: {
		width: '50%'
	},
	buttonContainerRight: {
		width: '50%',
		textAlign: 'right'
	},
	tabBorderBotton: {
		borderBottom: 'solid 3px rgb(189, 190, 197'
	}
	//List, tabs and modal		
}));
//Modal

function SubjectsList(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const subjects = useSelector(selectSubjects);
	let searchText = useSelector(({ SubjectsApp }) => SubjectsApp.subject.searchText);
	let loading = useSelector(({ SubjectsApp }) => SubjectsApp.subject.loading);
	searchText = searchText ? searchText : '';
	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Color',
				accessor: d => (
					<div style={{ backgroundColor: d.custom_color, height: 22, width: 22, borderRadius: '50%', borderWidth: 2, borderColor: '#FFFFFF', boxShadow: "2px 4px 2px #9E9E9E" }}></div>
				),
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Nombre de la Materia',
				accessor: 'custom_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Materia Base',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Editar',
				id: 'edit',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(openEditSubjectDialog(row.original));
							}}
						>
							<Icon>edit</Icon>
						</IconButton>
					</div>
				)
			},
			{
				Header: 'Borrar',
				id: 'delete',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(removeSubject({ "id": row.original.id, "group": props.params }));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch]
	);

	//Modal
	const role = useSelector(({ auth }) => auth.user.role);
	const [open, setOpen] = useState(false);
	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const closeIconModal = (
		<svg width="32" height="32" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="43" cy="43" r="43" fill="#545AB7" />
			<path d="M34.9052 23L43.611 31.9589L51.8283 23L61.7779 30.488L51.2509 41.4525L62 52.4617L53.5162 61.5989L43.4334 48.896L35.3493 62L25.2221 53.4868L35.3493 42.0765L25 30.488L34.9052 23Z" fill="white" />
		</svg>
	);
	const helpIconButton = (
		<svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0ZM22.3 31.8H15.2V26.9H22.3V31.8ZM28.7 17.4C28.4 18.1 27.9 18.8 27.4 19.3C26.9 19.8 26.4 20.2 25.8 20.6C25.2 21 24.6 21.4 24.1 21.8C23.6 22.2 23.2 22.7 22.8 23.3C22.5 23.9 22.3 24.6 22.3 25.5H15.1V23.9C15.1 23.1 15.2 22.3 15.5 21.7C15.8 21.1 16.1 20.6 16.5 20.1C16.9 19.7 17.4 19.3 17.8 19C18.3 18.7 18.7 18.3 19.2 18C19.6 17.7 20 17.4 20.2 17C20.5 16.7 20.6 16.3 20.6 15.8C20.6 15.5 20.5 15.2 20.2 15C19.9 14.8 19.5 14.6 18.8 14.6C18.2 14.6 17.6 14.7 17.1 14.8C16.5 14.9 16 15 15.4 15.2C14.9 15.4 14.3 15.5 13.8 15.8C13.3 16 12.9 16.2 12.5 16.4L11 10.3C11.5 10 12.1 9.8 12.8 9.5C13.5 9.2 14.2 9 15 8.8C15.8 8.6 16.7 8.4 17.6 8.3C18.5 8.1 19.5 8 20.5 8C21.8 8 23.1 8.2 24.1 8.5C25.2 8.8 26.1 9.3 26.8 9.9C27.6 10.5 28.1 11.2 28.5 12C28.9 12.8 29.1 13.6 29.1 14.5C29.2 15.7 29 16.7 28.7 17.4Z" fill="white" />
		</svg>
	);
	//Modal	

	useEffect(() => {
		function getFilteredArray(subjects, _searchText) {
			if (_searchText.length === 0) {
				return subjects;
			}
			return FuseUtils.filterArrayByString(subjects, _searchText);
		}
		if (subjects) {
			setFilteredData(getFilteredArray(subjects, searchText));
		}
	}, [subjects, searchText]);

	if (!filteredData) {
		return null;
	}


	let res
	if (loading) {
		res = (
			<>
				<div className="flex flex-1 flex-col items-center justify-center">
					<Typography className="text-20 mb-16" color="textSecondary">
						Se está consultando la información...
					</Typography>
					<CircularProgress color="secondary" />
				</div>
			</>
		);
	} else {
		if (filteredData.length > 0) {
			res = (
				<>
					<div className={classes.buttonContainer}>
						<div className={classes.buttonContainerLeft}>
						</div>
						<div className={classes.buttonContainerRight} style={{display:usrRol.includes(role) == true ? 'block' : 'none' }}>
							<Button variant="contained" endIcon={helpIconButton} className={classes.buttonOpenModal} onClick={onOpenModal}>
								Ayuda
							</Button>
						</div>
					</div>
					<br></br>
					<Modal open={open} onClose={onCloseModal} center classNames={{ modal: classes.react_responsive_modal_modal }} closeIcon={closeIconModal}>
						<br></br>
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
								<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered style={{ borderBottom: 'solid 3px rgb(189, 190, 197' }}>
									<Tab label="Pre requisitos" {...a11yProps(0)} style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }} />
									<Tab label="Crear clase" {...a11yProps(1)} style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }} />
								</Tabs>
							</Box>
							<TabPanel value={value} index={0}>
								<div className={classes.contentOfTabs}>
									<p className={classes.titleInsideTab}>Antes de crear una clase, debe seguir los siguientes pasos:</p>
									<br></br>
									<div className={classes.marginContainer}>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>1</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Iniciar sesión en el sistema LIA</p>
												<img class="logo-icon" src="assets/images/help/Pre1.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>2</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Navega hacia el módulo de "Clases"</p>
												<img class="logo-icon" src="assets/images/help/Pre2.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>3</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Iniciar sesión con Google y aceptar los permisos</p>
												<img class="logo-icon" src="assets/images/help/Pre3.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>4</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear un grupo</p>
												<img class="logo-icon" src="assets/images/help/Pre4.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>5</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear materias</p>
												<img class="logo-icon" src="assets/images/help/Pre5.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>6</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Seleccionar el calendario correspondiente al grupo</p>
												<img class="logo-icon" src="assets/images/help/Pre6.png" />
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<div className={classes.contentOfTabs}>
									<p className={classes.titleInsideTab}>Creación de clase:</p>
									<br></br>
									<div className={classes.marginContainer}>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>1</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear clase</p>
												<img class="logo-icon" src="assets/images/help/clases1.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}><span className={classes.numberList}>2</span></div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Completar información en campos requeridos (Materia, Recursos, Descripción, Horario y Fecha en que se impartirá la clase)</p>
												<img class="logo-icon" src="assets/images/help/clases2.png" />
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Box>
					</Modal>
					<SubjectsTable
						columns={columns}
						data={filteredData}
						onRowClick={(ev, row) => {
							if (row) {
								dispatch(openEditSubjectDialog(row.original));
							}
						}}
					/>
				</>
			)
		} else {
			res = (
				<>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							No hay registros que mostrar!
						</Typography>
					</div>
				</>
			);
		}
	}
	

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				{res}
			</>
		</FuseAnimate>
	);
}

export default SubjectsList;
