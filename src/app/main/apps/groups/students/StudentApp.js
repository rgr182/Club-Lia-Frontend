import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';

import Avatar from '@material-ui/core/Avatar';
import { CircularProgress, Grid, IconButton, Icon } from '@material-ui/core';
import reducer from '../store';
import StudentList from './StudentList';

import '../../../../../styles/newdesign.css';
import { getStudentInfo } from '../store/teacherSlice';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate/FuseAnimate';
import { showMessage } from '../../../../store/fuse/messageSlice';
import DeleteButtonDialog from '../../components/DeleteButtonDialog';
import { removeStudentsGroups, resetRemoveStudents } from '../store/studentSlice';
import { getTeacherGroups } from '../store/groupSlice';

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	}
});

function StudentApp(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const history = useHistory();

	useDeepCompareEffect(() => {
		dispatch(getStudentInfo());
		dispatch(getTeacherGroups());
	}, [dispatch, routeParams]);

	const infoStudent = useSelector(({ GroupsApp }) => GroupsApp.teachers.data);
	const removeStudents = useSelector(({ GroupsApp }) => GroupsApp.student.removeStudents);
	const filter = useSelector(({ GroupsApp }) => GroupsApp.filter.filter);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [userstoDelete, setUserstoDelete] = useState([]);
	const [loading, setLoading] = useState(false);
	const [infoStudentData, setInfoStudentData] = useState([]);
    const [infoStudentDataSearch, setInfoStudentDataSearch] = useState([]);
    const input = useSelector(({ fuse }) => fuse.input.texto);
	
    useEffect(() => {
        setInfoStudentData(infoStudent);
        setInfoStudentDataSearch(infoStudent);
    }, [infoStudent]);

    useEffect(() => {
        const array = [];
        if (infoStudentDataSearch.length > 0) {
            infoStudentDataSearch.filter(elemento => {
				const groups_id = elemento.groups_id && elemento.groups_id.length > 0 ? elemento.groups_id.toString() : '';
                if ((filter.group == '' || (','+ groups_id +',').includes(','+filter.group+',')) && 
					(filter.level == '' || elemento.level == filter.level ) && 
					(filter.grade == '' || elemento.grade == filter.grade) && 
					(elemento.name.toString().toLowerCase().includes(input.toLowerCase()) ||
					elemento.groups.toString().toLowerCase().includes(input.toLowerCase()) || 
					elemento.promedio.toString().toLowerCase().includes(input.toLowerCase()))
				) {
                    array.push(elemento);
                }
            });
        }
		
        if (array) {
            setInfoStudentData(array);
        }
    }, [input, filter]);

	useEffect(() => {
		if (removeStudents.status == 'Success') {
			dispatch(showMessage({ message: 'Operación Exitosa.', variant: 'success' }));
			dispatch(resetRemoveStudents());
			dispatch(getStudentInfo());
			setLoading(false);
			setUserstoDelete([]);
		} else if (removeStudents.status == 'Error') {
			dispatch(showMessage({ message: 'Algo salió mal.', variant: 'error' }));
			setLoading(false);
			dispatch(resetRemoveStudents());
		}
	}, [removeStudents.status]);

	function handleRemove() {
		
		if (userstoDelete && userstoDelete.length > 0) {
			setLoading(true);
			const students = [];
			userstoDelete.forEach(user => {
				students.push({
					id: user.original.id,
					groups: user.original.groups_id.split(',')
				});
			});
			console.log(students);
			dispatch(removeStudentsGroups({ students: students }));
		}
		setOpenDeleteDialog(false);
	}

	const columns = React.useMemo(
		() => [
			{
				Header: '',
				className: 'row',
				width: '20px',
				accessor: 'row',
				sortable: false,
				Cell: row => {
					return <div className="w-12">{`${Number(row.row.index) + 1}.`}</div>;
				}
			},
			{
				Header: 'Alumnos',
				accessor: 'name',
				sortable: true,
				className: 'justify-center flex-row',
				width: 400,
				Cell: ({ row }) => {
					return (
						<>
							<div className="flex flex-row mx-8" style={{ justifyContent: 'space-between' }}>
								<div className="flex items-center">
									<Avatar
										className="mx-8 pl-4"
										style={{ height: '28px', width: '28px' }}
										src={
											row && row.original && row.original.avatar && row.original.avatar.length > 0
												? row.original.avatar
												: 'assets/images/avatars/bootFace.png'
										}
									/>
									{row.original.name}
								</div>
								{/*row.original.groups_id && 
									<a
										className="items-center"
										style={{ color: '#FF2F54', zIndex: '999' }}
										href="#"
										onClick={env => {
											env.stopPropagation();
											env.preventDefault();
											setOpenDeleteDialog(true);
											setGroupsToDelete(row.original.groups_id);
											setIdUsertoDelete(row.original.id);
										}}
									>
										Quitar
									</a>
									*/}
							</div>
						</>
					);
				}
			},
			{
				Header: 'Grupos',
				accessor: 'groups',
				sortable: 'true'
			},
			{
				Header: 'Promedio',
				accessor: 'promedio',
				sortable: 'true',
				Cell: ({ row }) => {
					return parseFloat(row.original.promedio).toFixed(2);
				},
			},
			{
				Header: ({ selectedFlatRows }) => {
					return (
						selectedFlatRows.length > 0 && (
							<IconButton
								className="p-0"
								onClick={env => {
									env.stopPropagation();
									env.preventDefault();
									setOpenDeleteDialog(true);
									setUserstoDelete(selectedFlatRows);
								}}
							>
								<Icon className="text-left text-white">delete</Icon>
							</IconButton>
						)
					);
				},
				id: 'Delete',
				//width: 128,
				Cell: ({ row }) => {
					return <div />;
				},
				className: 'justify-center',
				sortable: false
			}
		],
		[dispatch]
	);

	const res = (
		<StudentList
			columns={columns}
			data={infoStudentData}
			onRowClick={(ev, row) => {
				if (row) {
					history.push(`/apps/alumno/${row.original.id}`);
				}
			}}
		/>
	);

	return (
		<>
			{infoStudent ? (
				<Grid style={{ padding: '25px 25px 0px 25px' }}>
					<FuseAnimate animation="transition.slideUpIn" delay={300}>
						<>
							{loading ? (
								<div
									style={{ height: '600px' }}
									className="flex flex-1 flex-col items-center justify-center"
								>
									<div className="text-20 mb-16">Eliminando...</div>
									<CircularProgress color="primary" />
								</div>
							) : (
								res
							)}
						</>
					</FuseAnimate>
					<DeleteButtonDialog
						openDeleteDialog={openDeleteDialog}
						setOpenDeleteDialog={setOpenDeleteDialog}
						handleRemove={handleRemove}
						texto="a los alumnos de todos los grupos asignados"
					/>
				</Grid>
			) : (
				<></>
			)}
		</>
	);
}

export default withReducer('GroupsApp', reducer)(StudentApp);
