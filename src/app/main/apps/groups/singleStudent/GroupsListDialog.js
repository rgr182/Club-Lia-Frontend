import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupsTableDialog from './GroupsTableDialog';
import Checkbox from '@material-ui/core/Checkbox';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { closeAddToGroupsDialog, addToGroup, resetGroupsAdded, getStudentGroups } from '../store/studentSlice';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { showMessage } from "../../../../store/fuse/messageSlice";
import { ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

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
        overflow: 'auto',
        border: 1
    },
    input: {
        height: '40px',
        width: '98%',
        borderRadius: '25px',
        alignSelf: "center"
    },
}));


var dataList = [];
var idSelected = [];

function GroupsListDialog(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const routeParams = useParams();
    const mainTheme = useSelector(selectMainTheme);
    const studentGroupsIsNotIn = useSelector(({ GroupsApp }) => GroupsApp.student.studentGroupsIsNotIn);
    const groupsAdded = useSelector(({ GroupsApp }) => GroupsApp.student.groupsAdded);

    const [filteredData, setFilteredData] = useState([]);
    const [searchedText, setSearchedText] = useState([]);
    const [helperDataList, setHelperDataList] = useState([]);
    const [groupsChecked, setGroupsChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    function handleCheck(id) {
        const indexList = dataList.findIndex(element => element.id == id);
        dataList[indexList].checkedVal = !dataList[indexList].checkedVal;
        idSelected = [];
        dataList.forEach(function (item) {
            if (item.checkedVal == true) {
                idSelected.push(item.id);
            }
        });
        setGroupsChecked(idSelected);
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
        let value = event.target.value.toLowerCase();
        setSearchedText( helperDataList.filter((data) => data.name.toLowerCase().search(value) != -1 ));
    }

    function handleSubmit(event) {
        setLoading(true);
        dispatch(addToGroup({ group_ids: groupsChecked, student_id: routeParams.id }));
    }

    useEffect(() => {
        if (groupsAdded.status == 'Success') {
            dispatch(showMessage({ message: 'Operación Exitosa.', variant: 'success' }));
            setLoading(false);
            dispatch(resetGroupsAdded());
            dispatch(getStudentGroups(routeParams.id));
            dispatch(closeAddToGroupsDialog());
        } else if (groupsAdded.status == 'Error') {
            dispatch(showMessage({ message: 'Algo salió mal.', variant: 'error' }));
            setLoading(false);
            dispatch(resetGroupsAdded());
        }
    }, [groupsAdded.status]);

    const columns = React.useMemo(
        () => [
            {
                Header: ({ row }) => (
                    <div>
                    </div>
                ),
                id: 'idRow',
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
                Header: 'Grupos',
                accessor: 'name',
                sortable: true,
            },
        ],
        [dispatch]
    );

    useEffect(() => {
        function getFilteredArray(studentGroupsIsNotIn, _searchText) {
            if (_searchText.length === 0) {
                return studentGroupsIsNotIn;
            }
            return FuseUtils.filterArrayByString(studentGroupsIsNotIn, _searchText);
        }
        if (studentGroupsIsNotIn) {
            setFilteredData(getFilteredArray(studentGroupsIsNotIn, props.searchText));
        }
    }, [studentGroupsIsNotIn, props.searchText]);

    if (!searchedText) {
        return null;
    }

    function thirdFunction2(id) { }

    let res

    if (searchedText.length === 0) {
        res = (
            <>
                <div className="flex flex-1 items-center justify-center h-full px-20">
                    <Typography color="textSecondary">
                        No hay grupos que mostrar!
                    </Typography>
                </div>
            </>
        );
    } else {

        res = (
            <>
                <List className={classes.scroll} >
                    <GroupsTableDialog
                        columns={columns}
                        data={searchedText}
                        pagination={false}
                        onRowClick={(ev, row) => {
                            if (row) {
                            }
                        }}
                    />
                </List>

                <div className="flex w-full px-16 text-center items-center justify-center p-12">
                    <Button className={classes.buttonCancel}
                        onClick={() => dispatch(closeAddToGroupsDialog())}
                    >Cancelar</Button>
                    <Button
                        className={clsx(classes.button, classes.buttonFill)}
                        onClick={handleSubmit}
                        disabled={groupsChecked.length > 0 && !loading ? false : true}
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
                                        onChange={(event) =>handleSearch(event)}
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
                                </FormControl>
                            </FuseAnimate>
                        </ThemeProvider>
                    </div>
                {res}
            </>
        </FuseAnimate>
    );
}

export default GroupsListDialog;
