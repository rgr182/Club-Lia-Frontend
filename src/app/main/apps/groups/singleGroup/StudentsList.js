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
import Avatar from '@material-ui/core/Avatar';

// Modal
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { getGroupStudents } from '../store/contactsSlice';
import { openEditGroupDialog, selectGroups } from '../store/groupSlice';
import StudentsTable from './StudentsTable';
import { getStudents, setStudentsRemoved } from './store/studentsSlice';

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

const usrRol = ['Maestro-A', 'Maestro-M', 'Maestro-I', 'maestro_secundaria', 'maestro_preescolar', 'maestro',  'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'];

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
	// List, tabs and modal
}));
// Modal

const dataList = [];
const idSelected = [];

function StudentsList(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	// const students = useSelector(({ GroupApp }) => GroupApp.singlegroup.data.students);
	const students = props.data;
	// console.log(students);

	// const resources = useSelector(selectResources);

	const [filteredData, setFilteredData] = useState(null);
	const role = useSelector(({ auth }) => auth.user.role);

	const columns = React.useMemo(
		() => [
			{
				Header: '',
				id: 'row',
				width: '20px',
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
							<div className="flex flex-row mx-8 items-center">
								<Avatar
									className="mx-8 pl-4"
									src={
										row.original.avatar.length > 0
											? row.original.avatar[0].avatar_path
											: 'assets/images/avatars/bootFace.png'
									}
									style={{ width: '28px', height: '28px' }}
								/>
								{row.original.name}
							</div>
						</>
					);
				}
			},
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.user_id);
					return (
						selectedFlatRows.length > 0 && (
							<IconButton
								className="p-0"
								onClick={ev => {
									// ev.stopPropagation();
									dispatch(setStudentsRemoved(selectedRowIds));
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
					// return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar.length > 0 ? row.original.avatar[0].avatar_path : 'assets/images/avatars/bootFace.png'} />;
					return <div />;
				},
				className: 'justify-center',
				sortable: false
			}
		],
		[dispatch]
	);

	let res;

	if (students.length === 0) {
		res = (
			<>
				<div className="flex flex-1 items-center justify-center h-full px-20 mt-30 mb-80">
					Aún no tienes alumnos asignados
				</div>
			</>
		);
	} else {
		res = (
			<StudentsTable
				columns={columns}
				data={students}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditResourceDialog(row.original));
					}
				}}
			/>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>{res}</>
		</FuseAnimate>
	);
}

export default StudentsList;
