import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { SelectFormsy } from '@fuse/core/formsy';

import moment from 'moment';
import Formsy from 'formsy-react';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/es';

import UsersTable from './UsersTable';
import StatusBadge from './components/StatusBadge';
import { IUserStatus } from 'app/main/apps/users/models/UserModel';
import LoadingGrid from './screens/components/LoadingGrid';

const useStyles = makeStyles(theme => ({
	textField: {
		width: '100%',
		height: '35px',
		marginTop: '4px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '10px',
			background: 'transparent',
			color: '#353535',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid  ' + theme.palette.primary.main + '  3px'
			}
		},
		'& .Mui-focused': {
			borderColor: theme.palette.primary.main
		},
		'& .MuiInput-root.Mui-error': {
			borderColor: '#FF2F54',
			color: '#FF2F54',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#FF2F54'
			}
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: '#FF2F54'
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover, &:focus-visible': {
				borderColor: 'transparent'
			}
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderColor: 'transparent'
		},
		'& ::-webkit-calendar-picker-indicator': {
			filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
		},
		'& .MuiInput-inputMultiline': {
			padding: '5px 3px'
		}
	},
	titleDialog: {
		fontFamily: 'Poppins',
		fontSize: '20px'
	},
	label: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#353535',
		textAlign: 'left'
	},
	button: {
		alignContent: 'center',
		textAlign: 'center',
		width: '100%',
		maxWidth: '124px',
		borderRadius: '45px',
		background: 'transparent',
		color: theme.palette.primary.main,
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid ' + theme.palette.primary.main + ' 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: theme.palette.primary.light,
			color: '#fff',
			borderColor: theme.palette.primary.light
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonCancel: {
		alignContent: 'center',
		textAlign: 'center',
		width: '100%',
		maxWidth: '124px',
		borderRadius: '45px',
		background: 'transparent',
		color: '#FF2F54',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #FF2F54 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: '#FF2F54',
			color: '#fff',
			borderColor: '#FF2F54'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonFill: {
		background: theme.palette.primary.light,
		color: '#fff',
		border: 'solid ' + theme.palette.primary.light + ' 3px',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	scroll: {
		width: '100%',
		overflow: 'auto',
		border: 1
	},
	input: {
		height: '40px',
		width: '98%',
		borderRadius: '25px',
		alignSelf: 'center'
	},
	textInput: {
		maxWidth: '290px',
		width: '100%',
		height: '35px',
		marginTop: '8px',
		alignContent: 'center',
		textAlign: 'left',
		alignSelf: 'center',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '5px',
			background: 'transparent',
			color: '#353535',
			border: 'solid #BEBEBE 2px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid ' + theme.palette.primary.main + ' 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: theme.palette.primary.main
		},
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		},
		'& .MuiInput-underline': {
			'&:before, &:after, &:focus, &:hover, &:focus-visible': {
				borderColor: 'transparent'
			}
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderColor: 'transparent'
		},
		'& ::-webkit-calendar-picker-indicator': {
			filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
		},
		'& .MuiInput-inputMultiline': {
			padding: '5px 3px'
		}
	}
}));

function UsersList(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);

	const history = useHistory();

	const loading = useSelector(({ usersApp }) => usersApp.users.loading);
	const role = useSelector(({ auth }) => auth.user.role);

	const [membershipFilter, setMembershipFilter] = useState(0);
	const [levelFilter, setLevelFilter] = useState(0);
	const [gradeFilter, setGradeFilter] = useState(0);
	const [statusFilter, setStatusFilter] = useState(0);
	const [dateStartFilter, setDateStartFilter] = useState(0);
	const [dateEndFilter, setDateEndFilter] = useState(0);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const users = props.data;
	const today = new Date();
	var limited = false;
	if (
		role === 'Maestro-M' ||
		role === 'Maestro-I' ||
		role === 'Maestro-A' ||
		role === 'maestro_preescolar' ||
		role === 'maestro_secundaria' ||
		role === 'profesor_summit_2021' ||
		role === 'maestro'
	) {
		limited = true;
	}

	function filterMembership(event) {
		setMembershipFilter(event.target.value);
	}
	function filterLevel(event) {
		setLevelFilter(event.target.value);
	}
	function filterGrade(event) {
		setGradeFilter(event.target.value);
	}
	function filterStatus(event) {
		setStatusFilter(event.target.value);
	}
	function handleDateStart(date) {
		setDateStartFilter(date);
	}
	function handleDateEnd(date) {
		setDateEndFilter(date);
	}

	useEffect(() => {
		if (membershipFilter == 0) {
			setFilteredUsers(users);
		}
	}, [users]);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Nombre(s)',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Apellido(s)',
				accessor: 'last_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Correo',
				accessor: 'email',
				sortable: true
			},
			{
				Header: 'Tipo de Membresía',
				accessor: 'membership',
				sortable: true
			},
			{
				Header: 'Nivel',
				accessor: 'level_id',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<div className={'justify-center text-center'}>
							{row.original.level_id == 1
								? 'Preescolar'
								: row.original.level_id == 2
								? 'Primaria'
								: 'Secundaria'}
						</div>
					);
				}
			},
			{
				Header: 'Grado',
				accessor: 'grade',
				sortable: true,
				Cell: ({ row }) => {
					let grades = row.original.grade ?? [];
					if (grades.length) {
						grades = JSON.parse(grades);
						return (
							<>
								{grades.length === 1 ? (
									<div className={'justify-center text-center'}>{grades[0].nombre}</div>
								) : (
									<div>Mas de una opcion</div>
								)}
							</>
						);
					}
					return <>N/A</>;
				}
			},
			{
				Header: 'Fecha',
				accessor: 'created_at',
				sortable: true,
				Cell: ({ row }) => {
					return row.original.created_at ? (
						<div className={'justify-center text-center'}>
							{moment(row.original.created_at).format('YYYY-MM-DD')}
						</div>
					) : (
						<>N/A</>
					);
				}
			},
			{
				Header: 'Estatus',
				accessor: 'status',
				sortable: true,
				Cell: ({ row }) => <StatusBadge status={row.original.status} />
			}
		],
		[dispatch]
	);

	useEffect(() => {
		//Filters and search function
		let studentsWithFilters = users;

		if (membershipFilter) {
			studentsWithFilters = studentsWithFilters.filter(data => data.membership == membershipFilter);
		}
		if (levelFilter) {
			studentsWithFilters = studentsWithFilters.filter(data => data.level_id === levelFilter);
		}
		const gradeId = gradeFilter - 1;
		if (gradeId !== -1) {
			studentsWithFilters = studentsWithFilters.filter(data => {
				let grades = data.grade ?? [];
				if (grades.length) {
					grades = JSON.parse(grades);
					return grades.some(grade => grade.id === gradeId);
				}
				return false;
			});
		}
		if (statusFilter) {
			studentsWithFilters = studentsWithFilters.filter(data => data.status.toLowerCase() === statusFilter);
		}
		if (dateStartFilter) {
			studentsWithFilters = studentsWithFilters.filter(
				data => moment(data.created_at, 'YYYY-MM-DD').toDate() >= moment(dateStartFilter, 'YYYY-MM-DD').toDate()
			);
		}
		if (dateEndFilter) {
			studentsWithFilters = studentsWithFilters.filter(
				data => moment(data.created_at, 'YYYY-MM-DD').toDate() <= moment(dateEndFilter, 'YYYY-MM-DD').toDate()
			);
		}

		setFilteredUsers(studentsWithFilters);
	}, [membershipFilter, levelFilter, gradeFilter, statusFilter, dateStartFilter, dateEndFilter]);

	if (!filteredUsers && !loading) {
		return null;
	}
	let res;
	if (loading) {
		res = (
			<>
				<LoadingGrid />
			</>
		);
	} else {
		if (filteredUsers && filteredUsers.length === 0) {
			res = (
				<>
					<div className="flex flex-1 items-center justify-center mt-80 mb-80">
						<Typography color="textSecondary" variant="h5">
							No hay usuarios que mostrar!
						</Typography>
					</div>
				</>
			);
		} else {
			res = (
				<UsersTable
					columns={columns}
					data={filteredUsers}
					onRowClick={(ev, row) => {
						if (row) {
							history.push(`/pages/profile/${row.original.id}`);
						}
					}}
				/>
			);
		}
	}
	const statusItems = Object.values(IUserStatus).map(status => (
		<MenuItem className="poppins" key={status.value} value={status.value}>
			{status.displayValue}
		</MenuItem>
	));

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				{users ? (
					<Formsy className="flex flex-wrap w-full flex-row items-center justify-center pt-12 inline-block">
						<div className="flex flex-wrap w-full flex-row align-left justify-left py-12 mb-24">
							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pr-20">
								<Typography className={classes.label}>Tipo de Membresía</Typography>
								<SelectFormsy
									className={classes.textInput}
									id="membership"
									name="membership"
									value={membershipFilter}
									onChange={filterMembership}
								>
									<MenuItem className="poppins" key={'padreI'} value={0}>
										Todas las Membresías
									</MenuItem>
									<MenuItem className="poppins" key={'padreI'} value={'Maestro invitado'}>
										Maestro Invitado
									</MenuItem>
									<MenuItem className="poppins" key={'padreM'} value={'Maestro Acreditado'}>
										Maestro Acreditado
									</MenuItem>
									<MenuItem className="poppins" key={'padreA'} value={'Maestro Certificado'}>
										Maestro Certificado
									</MenuItem>
								</SelectFormsy>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:px-20">
								<Typography className={classes.label}>Por niveles</Typography>
								<SelectFormsy
									className={classes.textInput}
									id="level"
									name="level"
									value={levelFilter}
									onChange={filterLevel}
								>
									<MenuItem className="poppins" key={'padreI'} value={0}>
										Todos los niveles
									</MenuItem>
									<MenuItem className="poppins" key={'padreI'} value={1}>
										Preescolar
									</MenuItem>
									<MenuItem className="poppins" key={'padreM'} value={2}>
										Primaria
									</MenuItem>
									<MenuItem className="poppins" key={'padreA'} value={3}>
										Secundaria
									</MenuItem>
								</SelectFormsy>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pl-20">
								<Typography className={classes.label}>Por grados</Typography>
								<SelectFormsy
									className={classes.textInput}
									id="grade"
									name="grade"
									value={gradeFilter}
									onChange={filterGrade}
								>
									<MenuItem className="poppins" key={'grade'} value={0}>
										Todos los grados
									</MenuItem>
									<MenuItem className="poppins" key={'grade1'} value={1}>
										1°
									</MenuItem>
									<MenuItem className="poppins" key={'grade2'} value={2}>
										2°
									</MenuItem>
									<MenuItem className="poppins" key={'grade3'} value={3}>
										3°
									</MenuItem>
									{levelFilter == 1 ? null : (
										<MenuItem className="poppins" key={'grade4'} value={4}>
											4°
										</MenuItem>
									)}
									{levelFilter == 1 ? null : (
										<MenuItem className="poppins" key={'grade5'} value={5}>
											5°
										</MenuItem>
									)}
									{levelFilter == 1 ? null : (
										<MenuItem className="poppins" key={'grade6'} value={6}>
											6°
										</MenuItem>
									)}
								</SelectFormsy>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pr-20">
								<Typography className={classes.label}>Estatus</Typography>
								<SelectFormsy
									className={classes.textInput}
									id="status"
									name="status"
									value={statusFilter}
									onChange={filterStatus}
								>
									<MenuItem className="poppins" key={'padreI'} value={0}>
										Todos los Estatus
									</MenuItem>
									{statusItems}
								</SelectFormsy>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:px-20">
								<Typography className={classes.label}>Desde</Typography>
								<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
									<KeyboardDatePicker
										className={classes.textInput}
										disableFuture
										disableToolbar
										format="yyyy-MM-dd"
										name="start"
										id="start"
										maxDate={dateEndFilter ? dateEndFilter : null}
										initialFocusedDate={today}
										value={dateStartFilter}
										onChange={handleDateStart}
										invalidDateMessage={'Fecha inválida'}
									/>
								</MuiPickersUtilsProvider>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/3 py-4 md:pl-20">
								<Typography className={classes.label}>Hasta</Typography>
								<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
									<KeyboardDatePicker
										disableFuture
										className={classes.textInput}
										minDate={dateEndFilter ? dateEndFilter : null}
										disableToolbar
										format="yyyy-MM-dd"
										name="end"
										id="end"
										value={dateEndFilter ? dateEndFilter : today}
										onChange={handleDateEnd}
										invalidDateMessage={'Fecha inválida'}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
					</Formsy>
				) : null}
				{res}
			</>
		</FuseAnimate>
	);
}

export default UsersList;
