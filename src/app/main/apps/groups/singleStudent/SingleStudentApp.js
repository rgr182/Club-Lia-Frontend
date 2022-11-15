import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import List from './List';
import '../../../../../styles/newdesign.css';
import {
	getStudentAverage,
	getStudentGroups,
	openAddToGroupsDialog,
	removeStudentGroups,
	resetRemoveStudent,
} from '../store/studentSlice';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate/FuseAnimate';
import {
	Typography,
	Card,
	Button,
	Icon,
	IconButton,
	CircularProgress
} from '@material-ui/core';
import clsx from 'clsx';
import Download from './Download';
import AddToGroupsDialog from './AddToGroupsDialog';
import DeleteButtonDialog from '../../components/DeleteButtonDialog';
import GroupsTable from './GroupsTable';
import Avatar from '@material-ui/core/Avatar';
import { showMessage } from "../../../../store/fuse/messageSlice";
import BackLink from 'app/ui/BackLink';

const useStyles = makeStyles({
	card: {
		color: '#353535',
		minHeight: '100%',
		flexWrap: "wrap",
		display: "flex",
		justifyContent: "center",
		width: "100%",
		padding: "20px",
		margin: "5px 5px 25px 5px",
		fontFamily: "Poppins",
		fontStyle: "normal",
		"-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
		boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)",
		borderRadius: '10px'
	},
	title: {
		color: "#00B1FF",
		fontFamily: `'grobold', 'rager'`,
		fontSize: "20px",
	},
	button: {
		alignContent: "center",
		textAlign: "center",
		width: "100%",
		borderRadius: "45px",
		background: "transparent",
		color: "#00B1FF",
		height: "35px",
		marginTop: "8px",
		marginRight: "7px",
		border: "solid #00B1FF 3px",
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		fontSize: '13px',
		'&:hover': {
			background: "#60CEFF",
			color: "#fff",
			borderColor: "#60CEFF",

		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
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
});

function SingleStudentApp(props) {

	const dispatch = useDispatch();
	const routeParams = useParams();
	const classes = useStyles(props);
	const history = useHistory();

	const averageStudent = useSelector(({ GroupsApp }) => GroupsApp.student.student);
	const studentGroups = useSelector(({ GroupsApp }) => GroupsApp.student.studentGroups);
	const removeStudent = useSelector(({ GroupsApp }) => GroupsApp.student.removeStudent);

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [groupsToDelete, setGroupsToDelete] = useState([]);
	const [loading, setLoading] = useState(false);

	useDeepCompareEffect(() => {
		if (routeParams.id && !isNaN(parseInt(routeParams.id))) {
			dispatch(getStudentAverage(routeParams.id));
			dispatch(getStudentGroups(routeParams.id));
		} else {
			history.push("/apps/alumnos");
		}
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (removeStudent.status == 'Success') {
			dispatch(showMessage({ message: 'Operación Exitosa.', variant: 'success' }));
			dispatch(resetRemoveStudent());
			dispatch(getStudentGroups(routeParams.id));
			dispatch(getStudentAverage(routeParams.id));
			setLoading(false);
		} else if (removeStudent.status == 'Error') {
			dispatch(showMessage({ message: 'Algo salió mal.', variant: 'error' }));
			setLoading(false);
			dispatch(resetRemoveStudent());
		}
	}, [removeStudent.status]);

	function handleRemove() {
		setLoading(true);
		const selectedRowIds = groupsToDelete.map(row => row.original.id);
		dispatch(removeStudentGroups({ groupIds: selectedRowIds, studentId: routeParams.id }));
		setOpenDeleteDialog(false);
	}

	const columnsGroups = React.useMemo(
		() => [
			{
				Header: 'Grupo',
				accessor: 'name',
				sortable: true
			},
			{
				Header: 'Grado asignado',
				accessor: 'grade',
				sortable: true,
				Cell: ({ row }) => {
					return row.original.grade + '°';
				},
			},
			{
				Header: ({ selectedFlatRows }) => {
					return (
						selectedFlatRows.length > 0 && (
							<IconButton
								className="p-0"
								onClick={ev => {
									setOpenDeleteDialog(true);
									setGroupsToDelete(selectedFlatRows);
								}}
							>
								<Icon className="text-left text-white">delete</Icon>
							</IconButton>
						)
					);
				},
				id: 'Delete',
				width: 128,
				Cell: ({ row }) => {
					return <div />;
				},
				className: 'justify-center',
				sortable: false
			}
		],
		[dispatch]
	);

	const columnsAverage = React.useMemo(
		() => [
			{
				Header: 'Grupo asignado',
				accessor: 'group',
				sortable: true
			},
			{
				Header: 'Materia',
				accessor: 'subject',
				sortable: true,
				Cell: ({ row }) => {
					return <>
						<div style={{ backgroundColor: row.original.color, borderRadius: '10px', width: 'fit-content', color: '#fff' }} className='p-6'>
							{row.original.subject}
						</div></>;
				},
			},
			{
				Header: 'Promedio',
				accessor: 'average',
				sortable: true,
				Cell: ({ row }) => {
					return parseFloat(row.original.average).toFixed(2);
				},
			}
		],
		[dispatch]
	);

	const groupsList = (
		studentGroups ?
			studentGroups.length > 0 && studentGroups[0].name ?
				<GroupsTable
					columns={columnsGroups}
					data={studentGroups}
					onRowClick={(ev, row) => {
						if (row) {
						}
					}}
				/>
				:
				<div className="h-full">
					<div className="text-20 mb-16" style={{ color: '#BEBEBE', height: '400px' }}>
						El alumno no ha sido asignado a ningún grupo
					</div>
				</div>
			:
			<>
				<div className="text-20 mb-16">
					Consultando información...
				</div>
				<CircularProgress color="primary" />
			</>
	);

	const averageList = (
		averageStudent ?
			averageStudent.length > 0 && averageStudent[0].average ?
				<List
					columns={columnsAverage}
					data={averageStudent.slice(0, -1)}
					onRowClick={(ev, row) => {
						if (row) {
						}
					}}
				/>
				:
				<>
					<div className="text-20 mb-16" style={{ color: '#BEBEBE' }}>
						No se encontró información sobre el alumno
					</div>
				</>
			:
			<>
				<div className="text-20 mb-16">
					Consultando información...
				</div>
				<CircularProgress color="primary" />
			</>
	);

	const onBack = env => { 
		env.preventDefault(); 
		props.history.goBack(); 
	}

	return (
		<>
			<FuseAnimate animation="transition.slideUpIn" delay={300} className="flex flex-wrap justify-center">
				<div className="p-24">
					<Card elevation={1} className={classes.card}>
						<>
							{loading ?
								<div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
									<div className="text-20 mb-16">
										Eliminando...
									</div>
									<CircularProgress color="primary" />
								</div>
								:
								!studentGroups ?
									<div style={{ height: "600px" }} className="flex flex-1 flex-col items-center justify-center">
										<div className="text-20 mb-16">
											Consultando información...
										</div>
										<CircularProgress color="primary" />
									</div>
									:
									<>
										<BackLink onBack={onBack} />
										<div className="flex w-full sm:w-1 md:w-1/3 text-center p-12 px-40">
											<div>
												<Avatar
													src={averageStudent && averageStudent[averageStudent.length - 1].avatar ?
														averageStudent[averageStudent.length - 1].avatar
														:
														'assets/images/avatars/bootFace.png'
													}
												/>
											</div>
											<div>
												<Typography className={classes.title}>
													{averageStudent && averageStudent[averageStudent.length - 1].name ?
														averageStudent[averageStudent.length - 1].name
														:
														'Nombre del alumno'
													}
												</Typography>
												<div>
													Fecha de ingreso:
													{averageStudent && averageStudent[averageStudent.length - 1].date ?
														' ' + averageStudent[averageStudent.length - 1].date
														:
														' 01/01/2021'
													}
												</div>
											</div>
										</div>
										<div className="w-full sm:w-1 md:w-1/3 text-center p-12 px-40">
											<div className="md:ml-160">
												<Typography style={{ fontSize: '25px' }}>
													{averageStudent && averageStudent[averageStudent.length - 1].average ?
														parseFloat(averageStudent[averageStudent.length - 1].average).toFixed(2)
														:
														'--.--'
													}
												</Typography>
												<div>Promedio general de tareas</div>
											</div>
										</div>
										<div className="w-full"></div>
										<div className="w-full sm:w-1 md:w-2/3 text-left p-12 pt-40 px-40">
											<Typography className={classes.title}>
												Grupos asignados
											</Typography>
										</div>
										<div className="w-full flex sm:w-1 md:w-1/3 text-right p-12 pt-40 px-40">
											<div className='w-1/2'></div>
											<div className='w-1/2'>
												<Button
													className={clsx(classes.button, classes.buttonFill)}
													onClick={event => dispatch(openAddToGroupsDialog())}
												>
													+ Añadir a grupo
												</Button>
											</div>
										</div>
										<div className="w-full text-center p-12 px-40">
											{groupsList}
										</div>
										<div className="w-full"></div>
										{(studentGroups && studentGroups.length > 0 && studentGroups[0].name) &&
											<>
												<div className="w-full sm:w-1 md:w-2/3 text-left p-12 pt-40 px-40">
													<Typography className={classes.title}>
														Promedio general por materia
													</Typography>
												</div>
												<div className="w-full flex sm:w-1 md:w-1/3 text-right p-12 pt-40 px-40">
													<div className='w-1/2'></div>
													<div className='w-1/2'>
														{(averageStudent && averageStudent.length > 0 && averageStudent[0].average) &&
															<Download />
														}
													</div>
												</div>
												<div className="w-full text-center p-12 px-40">
													{averageList}
												</div>
											</>
										}
									</>
							}
						</>
					</Card>
				</div>

			</FuseAnimate>
			<AddToGroupsDialog />
			<DeleteButtonDialog
				openDeleteDialog={openDeleteDialog}
				setOpenDeleteDialog={setOpenDeleteDialog}
				handleRemove={handleRemove}
				texto={'al alumno de los grupos'}
			/>
		</>
	);
}

export default withReducer('GroupsApp', reducer)(SingleStudentApp);
