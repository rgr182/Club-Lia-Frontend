import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import '../../../../styles/newdesign.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tooltip, IconButton, Chip } from '@material-ui/core';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import { showMessage } from '../../../store/fuse/messageSlice';
import StudentDialog from './singleGroup/StudentDialog';
import { openNewSubjectDialog, getSubjectsList, resetSubjectsAdded, closeNewSubjectDialog } from './singleGroup/store/subjectSlice';
import SubjectDialog from './singleGroup/SubjectDialog';
import {
	openNewStudentDialog,
	setStudentsAdded,
	getStudents,
	setStudentsRemoved,
	closeNewStudentDialog,
	resetStudentsAdded,
	resetStudentsRemoved
} from './singleGroup/store/studentsSlice';
import StudentsList from './singleGroup/StudentsList';
import {
	getGroup,
	setEnableEditGroup,
	removedReset,
	removeSingleGroup,
	createSingleGroup,
	updateSingleGroup,
	resetEnableEditGroup,
	duplicateGroup
} from './singleGroup/store/singleGroupSlice';
import reducer from './singleGroup/store';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
	label: {
		fontFamily: 'Poppins',
		fontSize: '15px',
		color: '#353535'
	},
	textField: {
		maxWidth: '433px',
		minWidth: '350px',
		height: '35px',
		marginTop: '8px',
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
				border: 'solid #00B1FF 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
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
	textField2: {
		maxWidth: '433px',
		minWidth: '350px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'left',
		textAlign: 'left',
		'& .MuiInput-root': {
			fontFamily: 'Poppins',
			borderRadius: '10px',
			background: 'transparent',
			color: 'black',
			border: 'solid #BEBEBE 3px',
			padding: '0 3px',
			'&:focus, &:hover, &:focus-visible': {
				border: 'solid #00B1FF 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
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
	},
	textInput: {
		maxWidth: '40px',
		minWidth: '60px',
		height: '35px',
		marginTop: '8px',
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
				border: 'solid #00B1FF 3px'
			}
		},
		'& .Mui-focused': {
			borderColor: '#00B1FF'
		},
		/* '& .MuiInput-root.Mui-error': {
			borderColor: '#FF2F54',
			color: '#FF2F54',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#FF2F54'
			}
		}, */
		'& .MuiInput-root.Mui-disabled': {
			borderColor: '#F5F5F5',
			backgroundColor: '#F5F5F5',
			color: '#BEBEBE',
			'&:focus, &:hover, &:focus-visible, &:active': {
				borderColor: '#F5F5F5'
			}
		},
		/* '& .MuiFormHelperText-root.Mui-error': {
			color: '#FF2F54'
		}, */
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
	textFieldButton: {
		backgroundColor: 'transparent',
		width: '100%',
		borderRadius: '10px',
		background: 'transparent',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #BEBEBE 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		fontWeight: 'normal',
		textTransform: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		'&:before, &:after, &:focus, &:hover, &:focus-visible': {
			border: 'solid #00B1FF 3px',
			outlineColor: '#00B1FF',
			backgroundColor: 'transparent'
		},
		'& .MuiButton-label': {
			justifyContent: 'left'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE !important',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	title: {
		color: '#00B1FF',
		fontSize: '20px',
		fontWeight: 'bold',
		marginLeft: '4px'
	},
	divCursos: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	divImgCursos: {
		display: 'flex',
		height: '100px'
	},
	divPadding: {
		padding: '30px'
	},
	imgCursos: {
		height: '140px',
		width: '275px',
		backgroundSize: 'cover',
		borderRadius: '5px'
	},
	divComunidad: {
		width: '100%',
		height: '120px',
		marginBottom: '5px',
		overflow: 'hidden',
		marginTop: '25px'
		// border: "solid #00B1FF 4px"
	},
	divIconsComunidad: {
		width: '100%',
		height: '90px',
		marginBottom: '5px'
	},
	titleCourse: {
		paddingLeft: '10px',
		paddingTop: '5px',
		marginTop: '40px'
	},
	titleEvent: {
		paddingTop: '5px',
		marginTop: '40px'
	},
	tdLeftAll: {
		height: '30px',
		border: 'solid white 4px',
		background: '#F5F5F5',
		textAlign: 'start',
		paddingLeft: '10px',
		borderTopLeftRadius: '13px',
		borderBottomLeftRadius: '13px'
	},
	tdLeftAllB: {
		height: '30px',
		border: 'solid white 4px',
		background: 'white',
		textAlign: 'start',
		paddingLeft: '10px',
		borderTopLeftRadius: '13px',
		borderBottomLeftRadius: '13px'
	},
	tdRight: {
		height: '30px',
		border: 'solid white 4px',
		background: '#F5F5F5',
		borderTopRightRadius: '13px',
		borderBottomRightRadius: '13px'
	},
	tdRightB: {
		height: '30px',
		border: 'solid white 4px',
		background: 'white',
		borderTopRightRadius: '13px',
		borderBottomRightRadius: '13px'
	},
	divProgressBar: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center'
	},
	progressBar: {
		width: '75%',
		height: '8px',
		borderRadius: '15px',
		justifyContent: 'center',
		alignContent: 'center',
		display: 'flex',
		paddingTop: '6px'
	},
	icon: {
		height: '39px',
		width: '39px'
	},
	h2Div: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '59%',
		margin: '6px',
		background: '#F5F5F5',
		borderRadius: '15px'
	},
	mensajes: {
		marginBottom: '20px',
		marginStart: '10px'
	},
	iconComunidad: {
		height: '20px',
		marginBottom: '20px',
		width: '20px'
	},
	divCom: {
		display: 'flex',
		marginStart: '15px'
	},
	divMensajes: {
		width: '100%',
		overflow: 'auto',
		height: '105px'
	},
	iconRed: {
		fontSize: '80px',
		color: '#FF2F54'
	},
	iconGreen: {
		fontSize: '80px',
		color: '#1CD17A'
	},
	iconYellow: {
		fontSize: '80px',
		color: '#F4B335'
	},
	blueButton: {
		backgroundColor: '#00B1FF',
		'&:hover': {
			backgroundColor: '#00B1FFCC'
		}
	},
	yellowButton: {
		backgroundColor: '#F4B335',
		'&:hover': {
			backgroundColor: '#F4B335CC'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	redButton: {
		backgroundColor: '#FF2F54',
		'&:hover': {
			backgroundColor: '#FF2F54CC'
		}
	},
	button: {
		alignContent: 'center',
		textAlign: 'center',
		width: '100%',
		borderRadius: '45px',
		background: 'transparent',
		color: '#00B1FF',
		height: '35px',
		marginTop: '8px',
		marginRight: '7px',
		border: 'solid #00B1FF 3px',
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: '#60CEFF',
			color: '#fff',
			borderColor: '#60CEFF'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonCancel: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "124px",
        borderRadius: "45px",
        background: "transparent",
        color: "#FF2F54",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #FF2F54 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        textTransform: 'none',
        '&:hover': {
            background: "#FF2F54",
            color: "#fff",
            borderColor: "#FF2F54",

        },
        '& .MuiButton-root, &.Mui-disabled': {
            color: '#BEBEBE',
            backgroundColor: '#F5F5F5',
            borderColor: '#F5F5F5',
        }
    },
	buttonFill: {
		background: '#60CEFF',
		color: '#fff',
		border: 'solid #60CEFF 3px',
		'&:hover': {
			backgroundColor: '#00B1FF',
			borderColor: '#00B1FF'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	buttonAdd: {
		maxWidth: '150px',
		background: '# #60CEFF',
		color: '#00B1FF',
		border: 'solid # #60CEFF 3px',
        alignItems: 'center',
		'&:hover': {
			backgroundColor: '#00B1FF',
			borderColor: '#00B1FF'
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5'
		}
	},
	titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
    },
}));
let loading = true;

const defaultFormState = {
	id: '',
	name: '',
	subjects: [],
	description: '',
	students: []
};

function Group(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const classes = useStyles();
	const history = useHistory();
	const group = useSelector(({ GroupApp }) => GroupApp.singlegroup.data);
	const subjectsAdded = useSelector(({ GroupApp }) => GroupApp.subject.subjectsAdded);
	const studentsRemoved = useSelector(({ GroupApp }) => GroupApp.students.studentsRemoved);
	const studentsAdded = useSelector(({ GroupApp }) => GroupApp.students.studentsAdded);
	const removedGroup = useSelector(({ GroupApp }) => GroupApp.singlegroup.removedGroup);
    const groupRegister = useSelector(({ GroupApp }) => GroupApp.singlegroup.groupRegister);
	const userinfo = useSelector(({ auth }) => auth.user.data);
	const duplicated = useSelector(({ GroupApp }) => GroupApp.singlegroup.duplicated);

	const [newGroup, setNewGroup] = useState(false);
	const { form, setForm, handleChange } = useForm(defaultFormState);
	const [enableEdit, setEnableEdit] = useState(false);
	const formRef = useRef(null);
	const [subjectsToRemove, setSubjectsToRemove] = useState([]); // Aux hook to send values to Modal
	const [subjects, setSubjects] = useState([]);
	const [students, setStudents] = useState([]);
	const [deletedSubjects, setDeletedSubjects] = useState([]);
	const [deletedStudents, setDeletedStudents] = useState([]);
	const [newSubjects, setNewSubjects] = useState([]);
	const [newStudents, setNewStudents] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);
	const [values, setValues] = React.useState({
		loading: false,
		loadingDialog: false
	});
	const [open, setOpen] = React.useState(false);
	const [openD, setOpenD] = React.useState(false);
	const [openDS, setOpenDS] = React.useState(false);


	useDeepCompareEffect(() => {
		// resetForm();
		setNewGroup(routeParams.id == 'crear');
		loading = true;
		setEnableEdit(false);
		dispatch(getSubjectsList());
		dispatch(getStudents());

	}, [dispatch, routeParams]);

	useEffect(() => {
		if (removedGroup.success) {
			setValues({loadingDialog: false});
			dispatch(showMessage({ message: 'Grupo eliminado con éxito.', variant: 'info' }));
			setOpen(false);
			dispatch(removedReset());
			dispatch(resetEnableEditGroup());
			props.history.goBack();
		}
	}, [removedGroup]);

	useEffect(() => {
		if (duplicated.success) {
			goBack();

			// dispatch(showMessage({ message: 'Grupo eliminado con éxito.', variant: 'info' }));
		}
	}, [duplicated]);

    useEffect(() => {
		if (groupRegister.error) {

            console.log(groupRegister.error);

			if (group.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(resetEnableEditGroup());
				dispatch(showMessage({message: 'Ha ocurrido un error!', variant: 'error'}));
				setEnableEdit(true);
			} else {
				setValues({...values, loading: false});
				dispatch(resetEnableEditGroup());
				dispatch(showMessage({message: groupRegister.error.response.data.message, variant: 'error'}));
				setEnableEdit(true);
			}
		}

		if(groupRegister.success){
			setValues({ ...values, loading: false });
			dispatch(resetEnableEditGroup());
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));
            
			setTimeout(() => {
				props.history.goBack();
			}, 1000);
			
			loading = true;
		}
	}, [groupRegister.error,groupRegister.success]);

	useEffect(() => {
		if (group) {
			initDialog();
		}
	}, [group]);

	useEffect(() => {
		if (routeParams.id == 'crear') {
			resetForm();
			dispatch(setEnableEditGroup());
			
		} else {
			dispatch(getGroup(routeParams));
		}
	}, [newGroup]);

	useEffect(() => {
		if (subjectsAdded.status) {
			dispatch(closeNewSubjectDialog());

			setNewSubjects([...newSubjects, subjectsAdded]);
			setSubjects(subjects => [...subjects, subjectsAdded.data]);

			dispatch(resetSubjectsAdded());
		}
	}, [subjectsAdded]);

    useEffect(() => {
        if (studentsAdded.status) {
            dispatch(closeNewStudentDialog());

            let StudentsAddedAux = students;

            // ------------------Setting student values with same structure-------
            for (let i = 0; i < studentsAdded.data.length; i++) {
                const values = {
                    user_id: studentsAdded.data[i].id,
                    name: studentsAdded.data[i].name,
                    avatar: studentsAdded.data[i].avatar
                };
                StudentsAddedAux = [...StudentsAddedAux, values];
            }

            // ------------------Adding to array and removing duplicated values-------
            const uniq = {};
            setStudents(StudentsAddedAux.filter(obj => !uniq[obj.user_id] && (uniq[obj.user_id] = true)));

            // ---------------If already exist it will not be added--------------------

            let studentsToAdd = StudentsAddedAux;
            if (!newGroup) {
                for (let i = 0; i < group.students.length; i++) {
                    studentsToAdd = studentsToAdd.filter(item => item.user_id !== group.students[i].user_id);
                }
            }

            let studentsById = [];
            for (let i = 0; i < studentsToAdd.length; i++) {
                studentsById = [...studentsById, studentsToAdd[i].user_id];
            }
            setNewStudents(studentsById);

            // -------------------Adding students of removed array (deletedStudents)---------------

            let removingFromDelete = deletedStudents;
            if (!newGroup) {

                for (let i = 0; i < studentsAdded.data.length; i++) {
                    console.log(studentsAdded.data[i].id);

                    let studentExist = group.students.some(function (item) {
                        return item.user_id === studentsAdded.data[i].id
                    });
                    if (studentExist) {
                        removingFromDelete = removingFromDelete.filter(item => item !== studentsAdded.data[i].id);
                    }
                }
            }
            setDeletedStudents(removingFromDelete);

            dispatch(resetStudentsAdded());
        }
    }, [studentsAdded]);

    useEffect(() => {

        if (studentsRemoved.status) {

            // ** Using aux because hooks only set once per function **
            let studentRemovedAux = studentsRemoved;
            let studentsAux = students;

            for (let i = 0; i < studentRemovedAux.data.length; i++) {
                studentsAux = studentsAux.filter(item => item.user_id !== studentRemovedAux.data[i]);
            }
            setStudents(studentsAux);

            // -------------------Removing students previous added (studentRemoved)---------------
            let studentsToRemove = deletedStudents;
            if (!newGroup) {
                for (let i = 0; i < studentRemovedAux.data.length; i++) {
                    let studentExist = group.students.some(function (item) {
                        return item.user_id === studentRemovedAux.data[i]
                    });
                    if (studentExist) {
                        studentsToRemove = [...studentsToRemove, studentRemovedAux.data[i]];
                    }
                }
            }
            const uniq = {};
            setDeletedStudents(studentsToRemove.filter(obj => !uniq[obj] && (uniq[obj] = true)));  // --------Removing duplicates

            // -------------------Removing students of added array (newStudents)---------------

            let deleteNewStudents = newStudents;
            for (let i = 0; i < studentRemovedAux.data.length; i++) {
                deleteNewStudents = deleteNewStudents.filter(item => item !== studentRemovedAux.data[i]);
            }
            setNewStudents(deleteNewStudents);
            dispatch(resetStudentsRemoved());

        }
    }, [studentsRemoved]);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'new'
		 */
		 
		setForm({ ...group });
		setSubjects(group.subjects);
		setStudents(group.students);

	}, [group, setForm, setSubjects]);

	const resetForm = useCallback(() => {

			setForm({
				...defaultFormState,
			});
			setSubjects([]);
			setStudents([]);
			dispatch(setEnableEditGroup());

	}, []);

	useEffect(() => {
		loading = false;
	}, [group]);

	function removeSubject(row, index) {
		if (row.id) {
			setDeletedSubjects([...deletedSubjects, row.id]);
		}
		setSubjects(subjects.filter(item => item !== row));
		setSubjectsToRemove([]);
		setValues({loadingDialog: false});
		handleCloseDS();
	}

	function validateForm(values) {
		setForm(values);
	}

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleGroupChange(event) {
		handleChange(event);
		setSubjects([]);
		// setLiaSubjects([]);
	}

	const handleClickOpen = () => {
		// Modal of confirm Delete Resource Enabled
		setOpen(true);
	};

	const handleClose = () => {
		// Modal of confirm Delete Resource Disabled
		setOpen(false);
	};

	const handleClickOpenD = () => {
		// Modal of confirm duplicate gruop Enabled
		setOpenD(true);
	};

	const handleCloseD = () => {
		// Modal of confirm duplicate gruop Disabled
		setOpenD(false);
	};

	const handleClickOpenDS = () => {
		// Modal of confirm delete Subject Enabled
		setOpenDS(true);
	};

	const handleCloseDS = () => {
		// Modal of confirm delete Subject Disabled
		setOpenDS(false);
	};

	function enable() {
		setEnableEdit(!enableEdit);
		dispatch(setEnableEditGroup());
	}

	function goBack(){
		resetForm();
		loading = true;
		props.history.goBack();	
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();
		// Getting values from New Subjects
		let newSubjectsAux = [];
		for (let i = 0; i < newSubjects.length; i++) {
			newSubjectsAux = [...newSubjectsAux, newSubjects[i].data];
		}

		if (newGroup) {
			const newGroupData = {
				groupName: form.name,
				teacherId: userinfo.uuid,
				schoolId: userinfo.school_id,
				grade: form.grade,
				description: form.description ? form.description : '',
				newSubjects: newSubjectsAux,
				newStudents: newStudents,
			};
			dispatch(createSingleGroup(newGroupData));
		}
		else{
			const updateGroupData = {
				groupName: form.name,
				teacherId: userinfo.uuid,
				grade: form.grade,
				description: form.description ? form.description : '',
				newSubjects: newSubjectsAux,
				newStudents: newStudents,
				deletedSubjects: deletedSubjects,
				deletedStudents: deletedStudents,

			};
			dispatch(updateSingleGroup(updateGroupData, routeParams.id));
		}
	}

	return (
		<div>
			<FuseAnimateGroup
				className="flex flex-wrap justify-center"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<Card elevation={1} class="card">
					<div className="flex flex-wrap flex-row w-full">
						<div className=" flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col text-left">
							<Button
								disableRipple
								component={Link}
								onClick={goBack}
								uppercase="false"
								style={{
									backgroundColor: 'transparent',
									textTransform: 'none',
									justifyContent: 'left',
									fontFamily: 'poppins',
									fontStyle: 'normal'
								}}
								// variant="text"
							>
								{'< Regresar'}
							</Button>
						</div>
						<div className=" flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col text-center">
							<Typography class="title">
								{form ? form.name : null}
								{newGroup && !form.name ? 'Nombre del Grupo' : null}
							</Typography>
						</div>
						<div className=" flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-row text-right justify-end pr-12">
							{!loading && !newGroup ? (
								<>
									<Tooltip
										title={
											<div style={{ fontSize: '13px' }} placement="bottom">
												Copiar
											</div>
										}
									>
										<span>
											<IconButton
												className={clsx(classes.blueButton, 'mx-6')}
												onClick={() => dispatch(handleClickOpenD)}
											>
												<svg
													width="18"
													height="18"
													viewBox="0 0 18 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M15.4001 6.6001H8.2001C7.31644 6.6001 6.6001 7.31644 6.6001 8.2001V15.4001C6.6001 16.2838 7.31644 17.0001 8.2001 17.0001H15.4001C16.2838 17.0001 17.0001 16.2838 17.0001 15.4001V8.2001C17.0001 7.31644 16.2838 6.6001 15.4001 6.6001Z"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M3.4 11.4H2.6C2.17565 11.4 1.76869 11.2314 1.46863 10.9314C1.16857 10.6313 1 10.2243 1 9.8V2.6C1 2.17565 1.16857 1.76869 1.46863 1.46863C1.76869 1.16857 2.17565 1 2.6 1H9.8C10.2243 1 10.6313 1.16857 10.9314 1.46863C11.2314 1.76869 11.4 2.17565 11.4 2.6V3.4"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</IconButton>
										</span>
									</Tooltip>
									<Tooltip title={<div style={{ fontSize: '13px' }}>Editar</div>} placement="bottom">
										<span>
											<IconButton
												className={clsx(classes.yellowButton, 'mx-6')}
												disabled={enableEdit}
												onClick={enable}
											>
												<svg
													width="18"
													height="18"
													viewBox="0 0 18 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M8.15659 2.68652H2.59035C2.16857 2.68652 1.76405 2.85408 1.4658 3.15233C1.16755 3.45058 1 3.85509 1 4.27688V15.4093C1 15.8311 1.16755 16.2356 1.4658 16.5339C1.76405 16.8321 2.16857 16.9997 2.59035 16.9997H13.7228C14.1446 16.9997 14.5491 16.8321 14.8474 16.5339C15.1456 16.2356 15.3132 15.8311 15.3132 15.4093V9.84311"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M14.1203 1.49406C14.4367 1.17772 14.8657 1 15.3131 1C15.7605 1 16.1895 1.17772 16.5059 1.49406C16.8222 1.8104 16.9999 2.23945 16.9999 2.68682C16.9999 3.1342 16.8222 3.56325 16.5059 3.87959L8.9517 11.4338L5.771 12.2289L6.56617 9.04824L14.1203 1.49406Z"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</IconButton>
										</span>
									</Tooltip>
									<Tooltip title={<div style={{ fontSize: '13px' }}>Eliminar</div>}>
										<span>
											<IconButton
												className={clsx(classes.redButton, 'mx-6')}
												onClick={() => dispatch(handleClickOpen)}
											>
												<svg
													width="18"
													height="20"
													viewBox="0 0 18 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M1 4.55566H2.77778H17"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M5.4445 4.55556V2.77778C5.4445 2.30628 5.6318 1.8541 5.9652 1.5207C6.2986 1.1873 6.75078 1 7.22228 1H10.7778C11.2493 1 11.7015 1.1873 12.0349 1.5207C12.3683 1.8541 12.5556 2.30628 12.5556 2.77778V4.55556M15.2223 4.55556V17C15.2223 17.4715 15.035 17.9237 14.7016 18.2571C14.3682 18.5905 13.916 18.7778 13.4445 18.7778H4.55561C4.08411 18.7778 3.63193 18.5905 3.29853 18.2571C2.96513 17.9237 2.77783 17.4715 2.77783 17V4.55556H15.2223Z"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M7.22217 9V14.3333"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M10.7778 9V14.3333"
														stroke="white"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</IconButton>
										</span>
									</Tooltip>
								</>
							) : null}
						</div>
					</div>

					{loading ? (
						<div className="flex flex-1 items-center justify-center h-screen">
							<CircularProgress color="secondary" />
						</div>
					) : (
						<>
							{enableEdit || newGroup ? (
								<Formsy
									onValidSubmit={handleSubmit}
									onChange={validateForm}
									onValid={enableButton}
									onInvalid={disableButton}
									ref={formRef}
									class="section"
									className="flex flex-wrap w-full p-12 flex-row items-center justify-center"
								>
									<div className="w-full sm:w-1 md:w-1/2 pt-12 px-20">
										<Typography className={classes.label}>
											Nombre del Grupo <span className={classes.required}>*</span>
										</Typography>
										<TextFieldFormsy
											type="text"
											name="name"
											id="name"
											value={form.name}
											onChange={handleChange}
											validations={{
												minLength: 2,
												maxLength: 30
											}}
											validationErrors={{
												minLength: 'El minimo de caracteres permitidos es 4',
												maxLength: 'El máximo de caracteres permitidos es 30'
											}}
											className={(form.name.length > 0 ? classes.textField : classes.textField2)}
											required
										/>
									</div>

									<div className="w-full sm:w-1 md:w-1/2 pt-12 px-20">
									<Typography className={classes.label}>
											Grado <span className={classes.required}>*</span>
										</Typography>
										<SelectFormsy
											id="grade"
											name="grade"
											value={form.grade}
											onChange={handleChange}
											className={classes.textInput}
											required
										>
											<MenuItem key="grade1" value={1}>
												1
											</MenuItem>
											<MenuItem key="grade2" value={2}>
												2
											</MenuItem>
											<MenuItem key="grade3" value={3}>
												3
											</MenuItem>
											<MenuItem key="grade4" value={4}>
												4
											</MenuItem>
											<MenuItem key="grade5" value={5}>
												5
											</MenuItem>
											<MenuItem key="grade6" value={6}>
												6
											</MenuItem>
										</SelectFormsy>
										
									</div>

									<div className="w-full sm:w-1 md:w-1 pt-12 mt-16 px-20 justify-left text-left">
									<Typography className={classes.label}>Descripción</Typography>
										<TextFieldFormsy
											fullWidth
											multiline
											type="text"
											name="description"
											id="custom_name"
											value={form.description}
											rows={2}
											validations={{
												maxLength: 150
											}}
											validationErrors={{
												maxLength: 'El máximo de carácteres permitidos es 150'
											}}
											onChange={handleChange}
											className={classes.textField}
										/>
									</div>
								</Formsy>
							) : null}
							<div className="section">
								<div className="flex w-full flex-wrap flex-row pl-20 pr-20">
									<div className="flex w-full md:w-1/2 flex-wrap items-center">
										<Typography class="title">Materias Asignadas</Typography>
									</div>
									<div className="flex w-full md:w-1/2 flex-wrap text-right justify-end">
										{enableEdit || newGroup ? (
											<Button
												className={clsx(classes.button, classes.buttonAdd)}
												onClick={() => dispatch(openNewSubjectDialog())}
												// disabled={(values.loading || !isFormValid || disabledForm)}
											>
												+Añadir materias
											</Button>
										) : null}
									</div>
								</div>
								<div className="flex flex-wrap flex-row w-full mt-20 pr-80">
									{subjects && subjects.length > 0 ? (
										<>
											{subjects.map((row, index) => (
												<div
													key={row.id}
													onChange={ev => {
														handleGroupChange(ev);
													}}
													// onChange={(ev) => { handleGroupChange(ev) }}

													className="flex w-full md:w-1/4 sm:w-1/2 flex-wrap flex-row"
												>
													<div
														// key={row.id}
														// value={form.subjects}
														style={{
															margin: 16,
															padding: 10,
															backgroundColor: row.custom_color,
															color: '#FFFFFF',
															borderRadius: 4,
															fontWeight: 'bold',
															textAlign: 'center',
															minWidth: 180,
															display: 'inline'
														}}
													>
														{row.custom_name}
														{enableEdit || newGroup ? (
															<div
															style={{
																display: 'inline',
																float: 'right',
																marginRight: '16px'
															}}>
															<IconButton
																className="p-0 pl-4 align-right absolute text-white	"
																// value={row}
																onChange={handleChange}
																onClick={() => {

																	setSubjectsToRemove(row)
																	dispatch(handleClickOpenDS)
																}}
															>
																<Icon className="text-right text-white text-16 ">
																	clear
																</Icon>
															</IconButton>
															</div>
														) : null}
													</div>
												</div>
											))}
										</>
									) : (
										<div className="flex flex-1 items-center justify-center h-full px-20 mt-30 mb-80 pl-96">
											Aún no tienes materias asignadas
										</div>
									)}
								</div>
							</div>

							{/* ---------------Table Section------------------ */}
							<div className="flex w-full flex-wrap flex-row mt-60 pl-20 pr-16 items-center">
								<div className="flex w-full md:w-1/2  ">
									<Typography class="title">Alumnos Asignados</Typography>
								</div>
								<div className="flex w-full md:w-1/2 flex-wrap justify-end">
									{enableEdit || newGroup ? (
										<Button
											className={clsx(classes.button, classes.buttonAdd)}
											onClick={() => dispatch(openNewStudentDialog(students))}
										>
											+Añadir alumnos
										</Button>
									) : null}
								</div>
							</div>

							<div className="sectionTable">
								<StudentsList disabled={!enableEdit} data={students} />
							</div>
							{enableEdit || newGroup ? (
								<div className="w-full sm:w-1 md:w-1/2 md:px-160">
									<Button
										className={clsx(classes.button, classes.buttonFill)}
										onClick={handleSubmit}
										disabled={values.loading || !isFormValid}
									>
										Guardar
									</Button>
								</div>
							) : null}
							 {values.loading && 
							 <div className="w-full mt-12">
							 	<LinearProgress color="secondary" />
							 </div>}
						</>
					)}
				</Card>
			</FuseAnimateGroup>
			<SubjectDialog />
			<StudentDialog />

			{/* ------------- Confirm Delete Dialog -----------*/}
			<Dialog
				classes={{
					paper: 'm-24 rounded-12'
				}}
				open={open}
				onClose={handleClose}
			>
				<AppBar position="static" elevation={1}>
					<Toolbar className="flex w-full text-center items-center justify-center">
						<Typography className={classes.titleDialog} color="inherit">
							{'Eliminar grupo'}
                    	</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'pt-40 pl-24 pr-24' }}>¿Está seguro que desea eliminar éste Grupo?</DialogContent>
				<DialogActions className="justify-between p-16">
					<div className="flex w-full px-16 text-center items-center justify-center p-12">
						<Button
							className={classes.buttonCancel}
							disabled={values.loadingDialog}
							variant="contained"
							color="default"
							type="submit"
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							className={clsx(classes.button, classes.buttonFill)}
							disabled={values.loadingDialog}
							variant="contained"
							color="primary"
							type="submit"
							onClick={() => {
								setValues({loadingDialog: true})
								dispatch(removeSingleGroup(routeParams.id));
							}}
							autoFocus
						>
							Aceptar
						</Button>
					</div>
				</DialogActions>
				{ values.loadingDialog ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
			</Dialog>


			{/* ------------- Confirm Duplicate Dialog -----------*/}
			<Dialog
				classes={{
					paper: 'm-24 rounded-12'
				}}
				open={openD}
				onClose={handleCloseD}
			>
				<AppBar position="static" elevation={1}>
					<Toolbar className="flex w-full text-center items-center justify-center">
						<Typography className={classes.titleDialog} color="inherit">
							{'Duplicar grupo'}
                    	</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'pt-40 pl-24 pr-24' }}>¿Está seguro que desea duplicar éste Grupo?</DialogContent>
				<DialogActions className="justify-between p-16">
					<div className="flex w-full px-16 text-center items-center justify-center p-12">
						<Button
							className={classes.buttonCancel}
							disabled={values.loadingDialog}
							variant="contained"
							color="default"
							type="submit"
							onClick={handleCloseD}
						>
							Cancelar
						</Button>
						<Button
							className={clsx(classes.button, classes.buttonFill)}
							disabled={values.loadingDialog}
							variant="contained"
							color="primary"
							type="submit"
							onClick={() => {
								setValues({loadingDialog: true})
								dispatch(duplicateGroup(routeParams.id))
							}}
							autoFocus
						>
							Aceptar
						</Button>
					</div>
				</DialogActions>
				{ values.loadingDialog ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
			</Dialog>
			{/* ------------- Confirm Delete Subject Dialog ----------- */}
			<Dialog
				classes={{
					paper: 'm-24 rounded-12'
				}}
				open={openDS}
				onClose={handleClickOpenDS}
			>
				<AppBar position="static" elevation={1}>
					<Toolbar className="flex w-full text-center items-center justify-center">
						<Typography className={classes.titleDialog} color="inherit">
							{'Remover Materia'}
                    	</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'pt-40 pl-24 pr-24' }}>¿Está seguro que desea remover ésta materia?</DialogContent>
				<DialogActions className="justify-between p-16">
					<div className="flex w-full px-16 text-center items-center justify-center p-12">
						<Button
							className={classes.buttonCancel}
							disabled={values.loadingDialog}
							variant="contained"
							color="default"
							type="submit"
							onClick={() => {
								handleCloseDS()
								setSubjectsToRemove([])
							}}
						>
							Cancelar
						</Button>
						<Button
							className={clsx(classes.button, classes.buttonFill)}
							disabled={values.loadingDialog}
							variant="contained"
							color="primary"
							type="submit"
							onClick={() => {
								setValues({loadingDialog: true})
								removeSubject(subjectsToRemove)								
							}}
							autoFocus
						>
							Aceptar
						</Button>
					</div>
				</DialogActions>
				{ values.loadingDialog ?
					<DialogContent classes={{ root: 'p-8' }}>
						<div className="px-16">
							<LinearProgress color="secondary" />
						</div>
					</DialogContent>
					: null
				}
			</Dialog>
		</div>
	);
}
export default withReducer('GroupApp', reducer)(Group);
