import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords, getRecord } from '../store/recordSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
        height: '100%',
        '& .MuiTab-wrapper':{
            fontWeight: 'normal',
            fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		    fontSize: ({ nivel }) => (nivel == 2 ? '20px' : '14px'),
        },
        '& .MuiTypography-displayBlock': {
            fontWeight: 'normal',
            fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		    fontSize: ({ nivel }) => (nivel == 2 ? '22px' : '16px'),
        }

	},
	formControl: {
		width: '95%',
		margin: 5,
		height: 53,
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
	},
    Text: {
		fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '26px' : '16px'),
		marginLeft: 25
	},
    tabsFont: {
        fontFamily: ({ nivel }) => (nivel == 2 ? 'haettenschweilerRegular' : `'grobold', 'rager'`),
		fontSize: ({ nivel }) => (nivel == 2 ? '26px' : '16px'),
    }
}));

const dias = { Dec: '12', Nov: '11', Oct: '10', Sep: '09', Aug: '08', Jul: '07', Jun: '06', May: '05', Apr: '04', Mar: '03', Fer: '02', Jan: '01' }

function RecordsTabs() {
    
	const dispatch = useDispatch();

    const groups = useSelector(({ MisTareasApp }) => MisTareasApp.subjectCalendarSlice.groups.data);
	const pathSubjects = useSelector(({ MisTareasApp }) => MisTareasApp.record.pathSubjects);
	const records = useSelector(({ MisTareasApp }) => MisTareasApp.record.records);
    var role = useSelector(({ auth }) => auth.user.role);
    const info = useSelector(({ auth }) => auth.user);
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role == 'alumno' && info.grade > 3) || role == 'alumno_secundaria' ? 2 : role == 'preescolar' ? 0 : 1;

    const classes = useStyles({ nivel });

	const [value, setValue] = React.useState('3');

	const handleChange = (ev, newValue) => {
		setValue(newValue);
	};

	function getPath(path, newValue) {
		dispatch(getRecords(path.replace('Documents/classes/', '') + '/')).then(() => {
			setValue(newValue);
		});
	}

	let spiner = (
		<div className="flex flex-1 flex-col items-center justify-center h-160">
			<Typography className="text-20 mb-16" color="textSecondary" className={classes.Text}>
				Se está consultando la información...
			</Typography>
			<CircularProgress color="secondary" />
		</div>
	);

	let noRegistros = (
		<div className="flex flex-1 items-center justify-center h-160">
			<Typography color="textSecondary" variant="h5" className={classes.Text} >
				No hay registros que mostrar!
			</Typography>
		</div>
	);

	let res
	if (!groups) {
		res = (
			spiner
		)
	} else {
		if (groups && groups.length > 0) {
			res = (
				<div className={classes.root}>
					<TabContext value={value}>
						<AppBar position="static" >
							<TabList onChange={handleChange} aria-label="simple tabs example">
								<Tab label="Grupo" value="3" disabled={groups ? false : true} />
								<Tab label="Materia" value="4" disabled={pathSubjects ? false : true} />
								<Tab label="Clases" value="5" disabled={records ? false : true} />
							</TabList>
						</AppBar>
						<TabPanel value="3">
							<List >
								{groups ?
									groups.length > 0 ?
                                        groups.map(group => (
											<ListItem key={group.name} dense button onClick={ev => getPath(info.data.school_id + '/'+ group.teacher_id + '/' + group.id, '4')} >
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
									pathSubjects.dir && pathSubjects.dir.length > 0 ?
										pathSubjects.dir.map(subject => (
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
								{records ?
									records.length > 0 ?
                                        records.map(record => (
											<ListItem key={record.name} dense button onClick={ev => dispatch(getRecord(record))} >
												<ListItemIcon>
													<Icon>ondemand_video</Icon>
												</ListItemIcon>
												<ListItemText primary={record.name} />
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
		<FuseAnimate animation="transition.slideUpIn" delay={300} >
			<>
				{res}
			</>
		</FuseAnimate>
	);
}

export default RecordsTabs;
