import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords, getRecord, deleteRecord, setRecordsSearchText } from './store/recordSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from '@lodash';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	formControl: {
		width: '95%',
		margin: 5,
		height: 53,
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
	},
}));

const dias = { Dec: '12', Nov: '11', Oct: '10', Sep: '09', Aug: '08', Jul: '07', Jun: '06', May: '05', Apr: '04', Mar: '03', Fer: '02', Jan: '01' }

function RecordsTabs() {

	const dispatch = useDispatch();
	// let searchText = useSelector(({ RecordsApp }) => RecordsApp.record.searchText);

	let pathSchools = useSelector(({ RecordsApp }) => RecordsApp.record.pathSchools);
	let pathTeachers = useSelector(({ RecordsApp }) => RecordsApp.record.pathTeachers);
	let pathGroups = useSelector(({ RecordsApp }) => RecordsApp.record.pathGroups);
	let pathSubjects = useSelector(({ RecordsApp }) => RecordsApp.record.pathSubjects);
	let records = useSelector(({ RecordsApp }) => RecordsApp.record.records);

	let searchText = useSelector(({ fuse }) => fuse.input.texto);
	const [filteredRecords, setFilteredRecords] = useState(null);

	searchText = searchText ? searchText : '';
	const [gradeFilter, setGradeFilter] = useState('');
	const [fromFilter, setFromFilter] = useState('');
	const [untilFilter, setUntilFilter] = useState('');

	const classes = useStyles();

	var permisos = '3';
	const role = useSelector(({ auth }) => auth.user.role);
	if (role === 'admin') {
		permisos = '1';
	} else if (role === 'admin_escuela' || role === 'director_escuela') {
		permisos = '2';
	} else if (role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021'
		|| role === 'maestro' || role === 'maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Escuela-I'
		|| role === 'Escuela-M' || role === 'Escuela-A' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A'
		|| role == 'Maestro-I-preescolar' || role == 'Maestro-M-preescolar' || role == 'Maestro-A-preescolar' || role == 'Maestro-I-secundaria' || role == 'Maestro-M-secundaria' || role == 'Maestro-A-secundaria') {
		permisos = '3';
	}

	const [value, setValue] = React.useState(permisos);

	const handleChange = (ev, newValue) => {
		setValue(newValue);
	};

	function getPath(path, newValue) {
		dispatch(getRecords(path.replace('Documents/classes/', '') + '/')).then(() => {
			setValue(newValue);
		});
	}

	function filterGrade(event) {
		setGradeFilter(event.target.value);
	}
	function filterFrom(event) {
		setFromFilter(event.target.value);
	}
	function filterUntil(event) {
		setUntilFilter(event.target.value);
	}

	function compareDates(recordDate) {
		if (fromFilter != '' || untilFilter != ''){
			var subCadena = recordDate.substr(recordDate.length - 33).split(' ', 4);
			subCadena = subCadena[2] + '-' + dias[subCadena[0]] + '-' + subCadena[1] + 'T' + subCadena[3].split('-',1)[0] + ':' + subCadena[3].split('-',2)[1];
			console.log(subCadena);
			if (fromFilter != '' && untilFilter != ''){
				return (fromFilter <  subCadena && subCadena < untilFilter);
			} else if (fromFilter != '') {
				return fromFilter < subCadena;
			} else {
				return subCadena < untilFilter;
			}
		} else {
			return true;
		}
	}

	useEffect(() => {
		function getFilteredArray() {
			if (fromFilter == '' && untilFilter == ''){
				return records;
			}
			return _.filter(records, item => {
				const recordDate = item.substring(item.lastIndexOf("/") + 1, item.length);
				var subCadena = recordDate.substr(recordDate.length - 33).split(' ', 4);
				subCadena = subCadena[2] + '-' + dias[subCadena[0]] + '-' + subCadena[1] + 'T' + subCadena[3].split('-',1)[0] + ':' + subCadena[3].split('-',2)[1];
				
				if (fromFilter != '' && untilFilter != ''){
					if (fromFilter <=  subCadena && subCadena <= untilFilter)
						return item;
					else 
						return false;
				} else if (fromFilter != '') {
					if (fromFilter <= subCadena)
						return item;
					else 
						return false;
				} else {
					if (subCadena <= untilFilter)
						return item;
					else 
						return false;
				}
			});
		}

		setFilteredRecords(getFilteredArray());
	}, [records, untilFilter, fromFilter]);

	function handleFilterClean(ev) {
		dispatch(setRecordsSearchText(ev));
		setGradeFilter('');
		setFromFilter('');
		setUntilFilter('');
	}

	let spiner = (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				Se está consultando la información...
			</Typography>
			<CircularProgress color="secondary" />
		</div>
	);

	let noRegistros = (
		<div className="flex flex-1 items-center justify-center h-full">
			<Typography color="textSecondary" variant="h5">
				No hay registros que mostrar!
			</Typography>
		</div>
	);

	let res
	if (!pathSchools && !pathTeachers && !pathGroups) {
		res = (
			spiner
		)
	} else {
		if ((pathSchools && pathSchools.dir) || (pathTeachers && pathTeachers.dir) || (pathGroups && pathGroups.dir)) {
			res = (
				<div className={classes.root}>
					<TabContext value={value}>
						<AppBar position="static" >
							<TabList onChange={handleChange} aria-label="simple tabs example">
								<Tab label="Escuela" value="1" style={{ display: permisos == 1 ? 'inline-flex' : 'none' }} />
								<Tab label="Maestro" value="2" style={{ display: permisos <= 2 ? 'inline-flex' : 'none' }} disabled={pathTeachers ? false : true} />
								<Tab label="Grupo" value="3" disabled={pathGroups ? false : true} />
								<Tab label="Materia" value="4" disabled={pathSubjects ? false : true} />
								<Tab label="Clases" value="5" disabled={records ? false : true} />
							</TabList>
						</AppBar>
						<TabPanel value="1">
							<List >
								{pathSchools ?
									pathSchools.dir && pathSchools.dir.length > 0 && JSON.stringify(pathSchools.dir).toLowerCase().includes(searchText.toLowerCase()) ?
										pathSchools.dir.map(school => (
											(searchText == '' || school.name.toLowerCase().includes(searchText.toLowerCase())) &&
											<ListItem key={school.name} dense button onClick={ev => getPath(pathSchools.relativePath + school.id, '2')} >
												<ListItemIcon>
													<Icon>school</Icon>
												</ListItemIcon>
												<ListItemText primary={school.name} />
											</ListItem>
										))
										:
										noRegistros
									:
									spiner
								}
							</List>
						</TabPanel>
						<TabPanel value="2">
							<List >
								{pathTeachers ?
									pathTeachers.dir && pathTeachers.dir.length > 0 && JSON.stringify(pathTeachers.dir).toLowerCase().includes(searchText.toLowerCase()) ?
										pathTeachers.dir.map(teacher => (
											(searchText == '' || teacher.name.toLowerCase().includes(searchText.toLowerCase())) &&
											<ListItem key={teacher.name} dense button onClick={ev => getPath(pathTeachers.relativePath + teacher.id, '3')} >
												<ListItemIcon>
													<Icon>account_circle</Icon>
												</ListItemIcon>
												<ListItemText primary={teacher.name} />
											</ListItem>
										))
										:
										noRegistros
									:
									spiner
								}
							</List>
						</TabPanel>
						<TabPanel value="3">
							<List >
								{pathGroups ?
									pathGroups.dir && pathGroups.dir.length > 0 && JSON.stringify(pathGroups.dir).toLowerCase().includes(searchText.toLowerCase())
										&& JSON.stringify(pathGroups.dir).includes(`"grade":${gradeFilter}`) ?
										pathGroups.dir.map(group => (
											((searchText == '' || group.name.toLowerCase().includes(searchText.toLowerCase()))
												&& (gradeFilter == '' || group.grade == gradeFilter)) &&
											<ListItem key={group.name} dense button onClick={ev => getPath(pathGroups.relativePath + group.id, '4')} >
												<ListItemIcon>
													<Icon>group</Icon>
												</ListItemIcon>
												<ListItemText primary={group.name} />
											</ListItem>
										))
										:
										noRegistros
									:
									spiner
								}
							</List>
						</TabPanel>
						<TabPanel value="4">
							<List >
								{pathSubjects ?
									pathSubjects.dir && pathSubjects.dir.length > 0 && JSON.stringify(pathSubjects.dir).toLowerCase().includes(searchText.toLowerCase()) ?
										pathSubjects.dir.map(subject => (
											(searchText == '' || subject.name.toLowerCase().includes(searchText.toLowerCase())) &&
											<ListItem key={subject.name} dense button onClick={ev => getPath(pathSubjects.relativePath + subject.id, '5')} >
												<ListItemIcon>
													<Icon>subject</Icon>
												</ListItemIcon>
												<ListItemText primary={subject.name} />
											</ListItem>
										))
										:
										noRegistros
									:
									spiner
								}
							</List>
						</TabPanel>
						<TabPanel value="5">
							<List >
								{filteredRecords ?
									filteredRecords.length > 0 && JSON.stringify(filteredRecords).toLowerCase().includes(searchText.toLowerCase()) ?
										filteredRecords.map(record => (
											(searchText == '' || record.name.substring(record, record.name.length).toLowerCase().includes(searchText.toLowerCase()) ) &&
											<ListItem key={record.name} dense button onClick={ev => dispatch(getRecord(record))} >
												<ListItemIcon>
													<Icon>ondemand_video</Icon>
												</ListItemIcon>
												<ListItemText primary={record.name} />
												{role === 'admin' &&
													<ListItemSecondaryAction>
														<IconButton onClick={() => dispatch(deleteRecord(record.path))}>
															<Icon>delete</Icon>
														</IconButton>
													</ListItemSecondaryAction>
												}
											</ListItem>
										))
										:
										noRegistros
									:
									spiner
								}
							</List>
						</TabPanel>
					</TabContext>
				</div>
			)
		} else {
			res = (
				noRegistros
			);
		}
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				<div className="flex flex-col sm:flex sm:flex-row justify-between pb-10 sm:p-1">
					<div className="flex flex w-full sm:w-1/3"></div>
					{value == '5' ?
						<div className="flex flex w-full sm:w-2/3">
							<FormControl variant="outlined" className={classes.formControl}>
								<TextField
									className="mb-24 MuiInputBase-fullWidth"
									name="from"
									label="Desde"
									id="from"
									type="datetime-local"
									value={fromFilter}
									onChange={filterFrom}
									InputLabelProps={{ shrink: true, }}
									inputProps={{ max: untilFilter }}
									variant="outlined"
								/>
							</FormControl>
							<FormControl variant="outlined" className={classes.formControl}>
								<TextField
									className="mb-24 MuiInputBase-fullWidth"
									name="until"
									label="Hasta"
									id="until"
									type="datetime-local"
									value={untilFilter}
									onChange={filterUntil}
									InputLabelProps={{shrink: true }}
									inputProps={{ min: fromFilter }}
									variant="outlined"
								/>
							</FormControl>
							<Button variant="contained" color="primary" onClick={handleFilterClean} >
								Quitar Filtros
							</Button>
						</div>
						:
						<>
							<div className="flex flex w-full sm:w-2/3"></div>
							<div className="flex flex w-full sm:w-1/3">
								<FormControl variant="outlined" className={classes.formControl}>
									{value == '3' &&
										<>
											<InputLabel id="role_id">Grado</InputLabel>
											<Select id="grade" name="grade" width="100%" value={gradeFilter} onChange={filterGrade} label="Grado" fullWidth variant="outlined" className="mb-24 MuiInputBase-fullWidth">
												<MenuItem key={'grade1'} value={1}>1</MenuItem>
												<MenuItem key={'grade2'} value={2}>2</MenuItem>
												<MenuItem key={'grade3'} value={3}>3</MenuItem>
												{(role != 'maestro_preescolar' && role != 'maestro_secundaria' && role != 'Maestro-I-preescolar' && role != 'Maestro-M-preescolar' && role != 'Maestro-A-preescolar' && role != 'Maestro-I-secundaria' && role != 'Maestro-M-secundaria' && role != 'Maestro-A-secundaria') && <MenuItem key={'grade4'} value={4}>4</MenuItem>}
												{(role != 'maestro_preescolar' && role != 'maestro_secundaria' && role != 'Maestro-I-preescolar' && role != 'Maestro-M-preescolar' && role != 'Maestro-A-preescolar' && role != 'Maestro-I-secundaria' && role != 'Maestro-M-secundaria' && role != 'Maestro-A-secundaria') && <MenuItem key={'grade5'} value={5}>5</MenuItem>}
												{(role != 'maestro_preescolar' && role != 'maestro_secundaria' && role != 'Maestro-I-preescolar' && role != 'Maestro-M-preescolar' && role != 'Maestro-A-preescolar' && role != 'Maestro-I-secundaria' && role != 'Maestro-M-secundaria' && role != 'Maestro-A-secundaria') && <MenuItem key={'grade6'} value={6}>6</MenuItem>}
											</Select>
										</>
									}

								</FormControl>
								<Button variant="contained" color="primary" onClick={handleFilterClean} >
									Quitar Filtros
								</Button>
							</div>
						</>
					}
				</div>
				{res}
			</>
		</FuseAnimate>
	);
}

export default RecordsTabs;
