import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, {useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentsTableDialog from './StudentsTableDialog';
import { openEditGroupDialog, selectGroups } from '../store/groupSlice';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { useForm } from '@fuse/hooks';

//Modal
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { getStudents, selectStudents, setStudentsAdded, closeNewStudentDialog } from './store/studentsSlice';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { showMessage } from "../../../../store/fuse/messageSlice";

import { ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';

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
    textField: {
        width: "100%",
        height: "35px",
        marginTop: "4px",
        alignContent: "left",
        textAlign: "left",
        '& .MuiInput-root': {
            fontFamily: 'Poppins',
            borderRadius: "10px",
            background: "transparent",
            color: "#353535",
            border: "solid #BEBEBE 3px",
            padding: '0 3px',
            '&:focus, &:hover, &:focus-visible': {
                border: "solid #00B1FF 3px",
            },
        },
        '& .Mui-focused': {
            borderColor: "#00B1FF"
        },
        '& .MuiInput-root.Mui-error': {
            borderColor: '#FF2F54',
            color: '#FF2F54',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#FF2F54',
            },
        },
        '& .MuiInput-root.Mui-disabled': {
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            color: '#BEBEBE',
            '&:focus, &:hover, &:focus-visible, &:active': {
                borderColor: '#F5F5F5',
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#FF2F54',
        },
        '& .MuiInput-underline': {
            '&:before, &:after, &:focus, &:hover, &:focus-visible': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'transparent'
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
        },
        '& .MuiInput-inputMultiline': {
            padding: '5px 3px',
        }
    },
    titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
    },
    label: {
        fontFamily: "Poppins",
        fontSize: "15px",
        color: '#353535'
    },
    button: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "124px",
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
    scroll: {
        width: '100%',
		// position: 'relative',
		overflow: 'auto',
		// maxHeight: 300,
		// height: 300,
		border: 1
    },
    input: {
        height: '40px',
        width: '98%',
        borderRadius: '25px',
        alignSelf: "center"
    },
    textInput: {
		maxWidth: '120px',
		minWidth: '120px',
		height: '35px',
		marginTop: '8px',
		alignContent: 'center',
		textAlign: 'center',
        alignSelf: "center",
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

}));


var dataList = [];
var idSelected = [];
var studentsAux = [];

function StudentsListDialog(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
    const mainTheme = useSelector(selectMainTheme);
	const students = useSelector(({ GroupApp }) => GroupApp.students.data);
    let searchText = useSelector(({ GroupApp }) => GroupApp.students.searchText);
    const studentsAdded = useSelector(({ GroupApp }) => GroupApp.students.studentsAdded);
    const studentsPrevious = useSelector(({ GroupApp }) => GroupApp.students.studentDialog);
    const [handleSearchText, setHandleSearchText] = useState('');
    const [gradeFilter, setGradeFilter] = useState(0);
    const [levelFilter, setLevelFilter] = useState(0);
	searchText =searchText? searchText : '';
    // const students = useSelector(selectStudents);
    const [filteredData, setFilteredData] = useState([]);
    const [searchedText, setSearchedText] = useState([]);
	const [helperDataList, setHelperDataList] = useState([]);
	const role = useSelector(({ auth }) => auth.user.role);
	const [checkValue, setCheckValue] = React.useState(false);
    const [studentsChecked, setStudentsChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

	function handleCheck(id) {
		const indexList = dataList.findIndex(element => element.id == id);
		dataList[indexList].checkedVal = !dataList[indexList].checkedVal;
		idSelected = [];
		dataList.forEach(function (item) {
			if (item.checkedVal == true) {
				idSelected.push(item);
			}
		});
        setStudentsChecked(idSelected);
	}

	useEffect(() => {
		if (filteredData.length > 0) {
			let helperElements = filteredData;
			helperElements = helperElements.map(obj => ({ ...obj, checkedVal: false }));
			dataList = helperElements;
			setHelperDataList(helperElements);
		}
	}, [filteredData]);

    useEffect(() => {
		setSearchedText(helperDataList);
	}, [helperDataList]);


    const handleSearch = (event) => {
        // let value = event.target.value.toLowerCase();
        setHandleSearchText(event.target.value.toLowerCase());
    }

    useEffect(() => {
        //Filters and search function 
        let studentsWithFilters = helperDataList;

        if(handleSearchText){
            studentsWithFilters = studentsWithFilters.filter((data) => data.name.toLowerCase().search(handleSearchText) != -1 );
        }
        if (gradeFilter>0){
            studentsWithFilters = studentsWithFilters.filter((data) => data.grade == gradeFilter);
        }
        if (levelFilter>0){// Preescolar 13, Primaria 5, Secundaria 6
            if (levelFilter == 1){
                studentsWithFilters = studentsWithFilters.filter((data) => data.role_id == 13);
            }
            if (levelFilter == 2){
                studentsWithFilters = studentsWithFilters.filter((data) => data.role_id == 5);
            }
            if (levelFilter == 3){
                studentsWithFilters = studentsWithFilters.filter((data) => data.role_id == 6);
            }
        }
        setSearchedText(studentsWithFilters);

	}, [handleSearchText, gradeFilter, levelFilter]);

    function handleSubmit(event) {
        setLoading(true);
        dispatch(setStudentsAdded(studentsChecked));
 
    }

    useEffect(() => {
        if (studentsAdded.status == true) {
            dispatch(showMessage({ message: 'Operación Exitosa.', variant: 'info' }));
            setLoading(false);
            dispatch(closeNewStudentDialog());
        }
    }, [studentsAdded.status]);

	const columns = React.useMemo(
		() => [
            {
				Header: ({ row }) => (
					<div>
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
			},
			{
				Header: 'Alumnos',
				accessor: 'name',
				sortable: true,
				className: 'justify-center flex-row',
				Cell: ({ row }) => {
					// return <div />;
					return <>
					 <div className="flex flex-row mx-8 items-center">
						<Avatar className="mx-8 pl-4" style={{width: '30px', height: '30px'}} src={row.original.avatar.length > 0 ? row.original.avatar[0].avatar_path : 'assets/images/avatars/bootFace.png'} />
						{row.original.name}
					</div>
				</>;
				},	
			},
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(students, _searchText) {
            let studentsAux= students;
            for (let i = 0; i < studentsPrevious.data.length; i++) {
                let id =
                studentsAux = studentsAux.filter(item => item.id !== studentsPrevious.data[i].user_id );
            }
			if (_searchText.length === 0) {
				return studentsAux;
			}
			return FuseUtils.filterArrayByString(studentsAux, _searchText);
		}
		if (students) {
			setFilteredData(getFilteredArray(students, searchText));
		}
	}, [students, searchText]);

    function filterGrade(event) {
		setGradeFilter(event.target.value);
    }

    function filterLevel(event) {
		setLevelFilter(event.target.value);
    }

	if (!searchedText) {
		return null;
	}
	
    function thirdFunction2(id) {}

	let res

    if (searchedText.length === 0) {
        res = (
            <>
                <div className="flex flex-1 items-center justify-center h-full px-20">
                    <Typography color="textSecondary">
                        No hay usuarios que mostrar!
                    </Typography>
                </div>
            </>
        );
    } else {

        res = (
            <>
                <List className={classes.scroll} >
                    <StudentsTableDialog
                        columns={columns}
                        data={searchedText}
                        pagination={false} 
                        onRowClick={(ev, row) => {
                            if (row) {
                                // dispatch(openEditResourceDialog(row.original));
                            }
                        }}
                    />
                </List>

                <div className="flex w-full px-16 text-center items-center justify-center p-12">
                    <Button className={classes.buttonCancel}
                        onClick={() => dispatch(closeNewStudentDialog())}
                    >Cancelar</Button>
                    <Button
                        type="submit"
                        className={clsx(classes.button, classes.buttonFill)}
                        onClick={handleSubmit}
                        disabled={studentsChecked.length > 0 && !loading ? false : true}
                    >
                        Agregar 
                    </Button>
                </div>
                {loading && <LinearProgress />}
            </>
        )
    }

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
                <div className="flex flex-1 items-center justify-center text-center px-8 sm:px-12 m-12">
                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <OutlinedInput
                                    className={classes.input}
                                    id="outlined-adornment-amount"
                                    onChange={(event) => handleSearch(event)}
                                    placeholder='Buscar...'
                                    startAdornment={
                                        <SearchIcon
                                            position="start"
                                            style={{
                                                paddingRight: '5px'
                                            }}
                                        >
                                            Icon
                                        </SearchIcon>
                                    }
                                />
                                <div className="flex flex-wrap flex-row w-full">
                                    <div className="w-1/2 pt-12 px-20 mb-10">
                                        <Typography className={classes.label}>
                                            Grado
                                        </Typography>
                                        <FormControl variant="outlined">
                                            <Select id="bloque" name="bloque" InputLabelProps={{ shrink: false }}
                                                value={gradeFilter}
                                                onChange={filterGrade}
                                                className={classes.textInput}
                                            >
                                                <MenuItem className={clsx(classes.item)} key={'grade0'} value={0}>Todos</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade1'} value={1}>1°</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade2'} value={2}>2°</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade3'} value={3}>3°</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade4'} value={4}>4°</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade5'} value={5}>5°</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'grade6'} value={6}>6°</MenuItem>
                                            </Select>
                                        </FormControl >
                                    </div>
                                    <div className="md:w-1/2 pt-12 px-20 mb-10">
                                        <Typography className={classes.label}>
                                            Nivel
                                        </Typography>
                                        <FormControl variant="outlined">
                                            <Select id="level" name="level" InputLabelProps={{ shrink: false }}
                                                value={levelFilter}
                                                onChange={filterLevel}
                                                className={classes.textInput}
                                            >
                                                <MenuItem className={clsx(classes.item)} key={'0'} value={0}>Todos</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'1'} value={1}>Preescolar</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'2'} value={2}>Primaria</MenuItem>
                                                <MenuItem className={clsx(classes.item)} key={'3'} value={3}>Secundaria</MenuItem>
                                            </Select>
                                        </FormControl >
                                    </div>
                                </div>
                            </FormControl>
                        </FuseAnimate>
                    </ThemeProvider>
                </div>
				{res}
			</>
		</FuseAnimate>
	);
}

export default StudentsListDialog;
