import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

// Modal
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { getGroupStudents } from './store/contactsSlice';
import { openEditGroupDialog, selectGroups } from './store/groupSlice';
import GroupsTable from './GroupsTable';
import '../../../../styles/newdesign.css';
import { useHistory } from 'react-router';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
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
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const usrRol = ['Maestro-A', 'Maestro-M', 'Maestro-I', 'maestro_secundaria', 'maestro_preescolar', 'maestro', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'];

const useStyles = makeStyles(theme => ({
	// List, tabs and modal
	react_responsive_modal_modal: {
		maxWidth: '800px',
		display: 'inline-block',
		textAlign: 'left',
		verticalAlign: 'middle',
		background: '#ffffff',
		boxShadow: '0 12px 15px 0 rgba(0, 0, 0, 0.25)',
		margin: '1.2rem',
		padding: '1.2rem',
		position: 'relative',
		overflowY: 'auto',
		borderRadius: 30
	},
	numberList: {
		display: 'inline-block',
		padding: '6px 15px',
		borderRadius: '50%',
		fontSize: '18px',
		textAlign: 'center',
		background: '#545AB7',
		color: '#fefefe'
	},
	title: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '20px'
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
	},
	buttonFill: {
		background: "#60CEFF",
		color: "#fff",
		border: "solid #60CEFF 3px",
		'&:hover': {
			backgroundColor: '#00B1FF',
			borderColor: '#00B1FF',
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	// List, tabs and modal
}));
// Modal

let dataList = [];
let idSelected = [];

function GroupsList(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const history = useHistory();

	const groups = useSelector(selectGroups);
	let searchText = useSelector(({ fuse }) => fuse.input.texto);
	const loading = useSelector(({ GroupsApp }) => GroupsApp.group.loading);
	searchText = searchText || '';
	const [filteredData, setFilteredData] = useState([]);
	const [helperDataList, setHelperDataList] = useState([]);
	const role = useSelector(({ auth }) => auth.user.role);
	const [checkValue, setCheckValue] = React.useState(false);
	let limited = false;
	let admin = false;
	if (
		role === 'Maestro-M' ||
		role === 'Maestro-I' ||
		role === 'Maestro-A' ||
		role === 'maestro_preescolar' ||
		role === 'maestro_secundaria' ||
		role === 'profesor_summit_2021' ||
		role === 'maestro' ||
		role == 'Maestro-I-preescolar' ||
		role == 'Maestro-M-preescolar' ||
		role == 'Maestro-A-preescolar' ||
		role == 'Maestro-I-secundaria' ||
		role == 'Maestro-M-secundaria' ||
		role == 'Maestro-A-secundaria' 
	) {
		limited = true;
	}
	if (role === 'admin') {
		admin = true;
	}

	function updateAllCheckboxes() {
		setCheckValue(!checkValue);
		dataList.forEach(function (item) {
			item.checkedVal = !checkValue;
		});
		idSelected = [];
		dataList.forEach(function (item) {
			if (item.checkedVal === true) {
				idSelected.push(item.id);
			}
		});
		dispatch(getGroupStudents(idSelected));
	}

	function handleCheck(id) {
		const indexList = dataList.findIndex(element => element.id === id);
		dataList[indexList].checkedVal = !dataList[indexList].checkedVal;
		idSelected = [];
		dataList.forEach(function (item) {
			if (item.checkedVal === true) {
				idSelected.push(item.id);
			}
		});
		dispatch(getGroupStudents(idSelected));
	}

	// Modal
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
			<path
				d="M34.9052 23L43.611 31.9589L51.8283 23L61.7779 30.488L51.2509 41.4525L62 52.4617L53.5162 61.5989L43.4334 48.896L35.3493 62L25.2221 53.4868L35.3493 42.0765L25 30.488L34.9052 23Z"
				fill="white"
			/>
		</svg>
	);
	const helpIconButton = (
		<svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0ZM22.3 31.8H15.2V26.9H22.3V31.8ZM28.7 17.4C28.4 18.1 27.9 18.8 27.4 19.3C26.9 19.8 26.4 20.2 25.8 20.6C25.2 21 24.6 21.4 24.1 21.8C23.6 22.2 23.2 22.7 22.8 23.3C22.5 23.9 22.3 24.6 22.3 25.5H15.1V23.9C15.1 23.1 15.2 22.3 15.5 21.7C15.8 21.1 16.1 20.6 16.5 20.1C16.9 19.7 17.4 19.3 17.8 19C18.3 18.7 18.7 18.3 19.2 18C19.6 17.7 20 17.4 20.2 17C20.5 16.7 20.6 16.3 20.6 15.8C20.6 15.5 20.5 15.2 20.2 15C19.9 14.8 19.5 14.6 18.8 14.6C18.2 14.6 17.6 14.7 17.1 14.8C16.5 14.9 16 15 15.4 15.2C14.9 15.4 14.3 15.5 13.8 15.8C13.3 16 12.9 16.2 12.5 16.4L11 10.3C11.5 10 12.1 9.8 12.8 9.5C13.5 9.2 14.2 9 15 8.8C15.8 8.6 16.7 8.4 17.6 8.3C18.5 8.1 19.5 8 20.5 8C21.8 8 23.1 8.2 24.1 8.5C25.2 8.8 26.1 9.3 26.8 9.9C27.6 10.5 28.1 11.2 28.5 12C28.9 12.8 29.1 13.6 29.1 14.5C29.2 15.7 29 16.7 28.7 17.4Z"
				fill="white"
			/>
		</svg>
	);
	// Modal

	useEffect(() => {
		if (filteredData.length > 0) {
			let helperElements = filteredData;
			helperElements = helperElements.map(obj => ({ ...obj, checkedVal: false }));
			dataList = helperElements;
			setHelperDataList(helperElements);
		}
	}, [filteredData]);

	const columns = React.useMemo(
		() => [
			/* {
				Header: ({ row }) => (
					<div>
						<Checkbox checked={checkValue} color="primary" onClick={() => updateAllCheckboxes()} />
					</div>
				),
				id: 'idRow',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<Checkbox
							checked={row.original.checkedVal}
							color="primary"
							onClick={() => handleCheck(row.original.id)}
							onChange={e => {
								thirdFunction2(row.original.id);
							}}
						/>
					</div>
				)
			}, */
			{
				Header: 'Grupo',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Grado asignado',
				accessor: 'grade',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Numero de alumnos',
				accessor: 'students_count',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Materias asignadas',
				accessor: 'subject_total',
				className: 'font-bold',
				sortable: true
			}
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(groups, _searchText) {
			if (_searchText.length === 0) {
				return groups;
			}
			return FuseUtils.filterArrayByString(groups, _searchText);
		}
		if (groups) {
			setFilteredData(getFilteredArray(groups, searchText));
		}
	}, [groups, searchText]);

	if (!filteredData) {
		return null;
	}

	function thirdFunction2(id) {}

	let res;
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
	} else if (filteredData.length === 0) {
		res = (
			<>
				<Card elevation={1} class="card2">
					<Grid container>
						<Grid item xs={5} />
						<Grid item xs={5}>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<h2 className={classes.title}>Mis grupos</h2>
							</FuseAnimate>
						</Grid>
						<Grid item xs={2}>
							{/* <Button variant="contained" className={classes.buttonFill}
							disableRipple to={'/apps/grupo/crear'} component={Link}>
								+ Crear grupo
							</Button> */}
							<Button variant="contained" color="primary" style={{ borderRadius: '40px', textTransform: 'none', background: '#60CEFF' }}
							disableRipple to={'/apps/grupo/crear'} component={Link}>
								+ Crear grupo
							</Button>
						</Grid>
					</Grid>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							No hay registros que mostrar!
						</Typography>
					</div>
				</Card>
			</>
		);
	} else {
		res = (
			<>
				<Card elevation={1} class="contenedor">
					<Grid container>
						<Grid item xs={5} />
						<Grid item xs={5}>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<h2 className={classes.title}>Mis grupos</h2>
							</FuseAnimate>
						</Grid>
						<Grid item xs={2}>
							<Button variant="contained" color="primary" style={{ borderRadius: '40px', textTransform: 'none', background: '#60CEFF' }}
							disableRipple to={'/apps/grupo/crear'} component={Link}>
								+ Crear grupo
							</Button>
						</Grid>
					</Grid>
					<br />
					<Modal
						open={open}
						onClose={onCloseModal}
						center
						classNames={{ modal: classes.react_responsive_modal_modal }}
						closeIcon={closeIconModal}
					>
						<br />
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
									centered
									style={{ borderBottom: 'solid 3px rgb(189, 190, 197' }}
								>
									<Tab
										label="Pre requisitos"
										{...a11yProps(0)}
										style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }}
									/>
									<Tab
										label="Crear clase"
										{...a11yProps(1)}
										style={{ fontSize: '1.4rem', fontFamily: 'grobold', color: '#545AB7' }}
									/>
								</Tabs>
							</Box>
							<TabPanel value={value} index={0}>
								<div className={classes.contentOfTabs}>
									<p className={classes.titleInsideTab}>
										Antes de crear una clase, debe seguir los siguientes pasos:
									</p>
									<br />
									<div className={classes.marginContainer}>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>1</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Iniciar sesión en el sistema LIA
												</p>
												<img className="logo-icon" src="assets/images/help/Pre1.png" />
											</div>

											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Iniciar sesión en el sistema LIA
												</p>
												<img className="logo-icon" src="assets/images/help/Pre1.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>2</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Navega hacia el módulo de "Clases"
												</p>
												<img className="logo-icon" src="assets/images/help/Pre2.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>3</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Iniciar sesión con Google y aceptar los permisos
												</p>
												<img className="logo-icon" src="assets/images/help/Pre3.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>4</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear un grupo</p>
												<img className="logo-icon" src="assets/images/help/Pre4.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>5</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear materias</p>
												<img className="logo-icon" src="assets/images/help/Pre5.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>6</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Seleccionar el calendario correspondiente al grupo
												</p>
												<img className="logo-icon" src="assets/images/help/Pre6.png" />
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<div className={classes.contentOfTabs}>
									<p className={classes.titleInsideTab}>Creación de clase:</p>
									<br />
									<div className={classes.marginContainer}>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>1</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>Crear clase</p>
												<img className="logo-icon" src="assets/images/help/clases1.png" />
											</div>
										</div>
										<div className={classes.containerList}>
											<div className={classes.sizeNumberList}>
												<span className={classes.numberList}>2</span>
											</div>
											<div className={classes.sizeDescriptioinList}>
												<p className={classes.descriptionList}>
													Completar información en campos requeridos (Materia, Recursos,
													Descripción, Horario y Fecha en que se impartirá la clase)
												</p>
												<img className="logo-icon" src="assets/images/help/clases2.png" />
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Box>
					</Modal>
					<GroupsTable
						columns={columns}
						data={filteredData}
						onRowClick={(ev, row) => {
							if (row) {
								history.push(`/apps/grupo/${row.original.id}`);
							}
						}}
					/>
				</Card>
			</>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>{res}</>
		</FuseAnimate>
	);
}

export default GroupsList;
