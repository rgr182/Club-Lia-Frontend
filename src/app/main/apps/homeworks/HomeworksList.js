import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeworksTable from './HomeworksTable';
import { openEditHomeworkDialog, selectHomeworks, downloadHomework } from './store/homeworkSlice';
import {showMessage} from "../../../store/fuse/messageSlice";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import  Paper  from '@material-ui/core/paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setHomeworksSearchText } from './store/homeworkSlice';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import '../../../../styles/newdesign.css';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Download from './Download';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 180,
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
	select: {        
        width: "200px",
        borderRadius: "10px",
        background: "transparent",
        color: "#353535",
        height: "35px",
        marginTop: "8px",
        marginRight: "7px",
        border: "solid #60CEFF 3px",
        fontFamily: 'Poppins',
        padding: '3px',
        '&:before, &:after, &:focus': {
            border: 'solid transparent 0px',
            content: 'none'
        }
    },  
	title: {
        color: "#00B1FF",
        marginTop: "15px",
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        marginLeft: "4px"        
    },
	title1: {
		color: '#00B1FF',
		fontFamily: `'grobold', 'rager'`,
		fontSize: '20px'
	},
	card: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
        margin: "5px 5px 25px 5px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)"
    },
	card2: {
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        width: "100%",
		height: '330px',
        padding: "20px",
        margin: "5px 5px 25px 5px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        "-webkit-box-shadow": "0px 0px 15px 3px rgba(96,206,255,0.71)",
        boxShadow: "0px 0px 15px 3px rgba(96,206,255,0.71)"
    },
  }));

function HomeworksList(props) {

	const dispatch = useDispatch();
	const history = useHistory();
	const homeworks = useSelector(selectHomeworks);
	let searchText = useSelector(({ HomeworksApp }) => HomeworksApp.homework.searchText);
	let loading = useSelector(({ HomeworksApp }) => HomeworksApp.homework.loading);
	searchText =searchText? searchText : '';
	const [filteredData, setFilteredData] = useState(null);
	const [filteredInfo, setFilteredInfo] = useState(null);


	const classes = useStyles();
	const [age, setAge] = useState("");

	const toTask = (name, row) =>{
		history.push(`/apps/tareasCalificar?activity=${row.activity_id}&name=${name}&id=${row.id}`);
	}

	useEffect(() => {
		function getFilteredArray(homeworks, _searchText) {
			if (_searchText.length === 0) {
				return homeworks;
			}
			return FuseUtils.filterArrayByString(homeworks, _searchText);
		}
		if (homeworks) {
			setFilteredData(getFilteredArray(homeworks, searchText));
			setFilteredInfo(getFilteredArray(homeworks, searchText));
		}
	}, [homeworks, searchText]);

	const handleChange = (event) => {
		var array = [];
		switch(event.target.value){
			case 'No entregado': 
				filteredInfo.filter(data => {
					if(data.status.includes('No entregado')){
						array.push(data);
						console.log(data);
					}
				});
				setFilteredData(array);
				break;
			case 'Entregado': 
				filteredInfo.filter(data => {
					if(data.status.includes('Entregado')){
						array.push(data);
						console.log(data);
					}
				});
				setFilteredData(array);
				break;
			case 'Calificado': 
				filteredInfo.filter(data => {
					if(data.status.includes('Calificado')){
						array.push(data);
						console.log(data);
					}
				});
				setFilteredData(array);
				break;
			case 'Todos los estados':
				setFilteredData(filteredInfo);
				break;
		}
		setAge(event.target.value);
	  };

	const columns = React.useMemo(
		() => [
			{
				Header: 'Alumnos',
                accessor: 'user_name',
                sortable: true,
                className: 'justify-center flex-row',
                width: 400,
                Cell: ({ row }) => {
                    // return <div />;
                    return <>
                     <div className="flex flex-row mx-8 items-center">
                        <Avatar className="mx-8 pl-4" src={row.original.avatar ? row.original.avatar : 'assets/images/avatars/bootFace.png'} style={{ width: '28px', height: '28px' }} />
                        {row.original.user_name}
                    </div>
                </>;
                },  
            },
			{
				Header: 'Estado',
				sortable: true,
				accessor: d => (
					d.status == 'No entregado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5,  borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status == 'Entregado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ff9c24', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status == 'Calificado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: 'green', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status
				)
			},
			{
				Header: 'Calificación',
				accessor: 'score',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Fecha de entrega',
				accessor: d => (
					d.due ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ff4d40', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.delivery_date}</p>
						</div>
					:
						d.delivery_date
				),
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Fecha de calificación',
				accessor: 'scored_date',
				className: 'font-bold',
				sortable: true
			},
		],
		[dispatch]
	);

	  const StyledTableCell = withStyles((theme) => ({
		head: {
		  backgroundColor: '#60CEFF',
		  color: theme.palette.common.white,
		},
		body: {
		  fontSize: 14,
		},
	  }))(TableCell);
	  
	  const StyledTableRow = withStyles((theme) => ({
		root: {
		  '&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		  },
		},
	  }))(TableRow);

	if (!filteredData) {
		return null;
	}


	let res
	if (loading){
		res =  (
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					Se está consultando la información...
				</Typography>
				<CircularProgress color="secondary" />
			</div>
		)
	} else {
		if (filteredData.length > 0) {
			res =  (
				<div>
				<FuseAnimateGroup
                className="flex flex-wrap justify-center"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >  
				<Card elevation={1} className={classes.card}>
				<Grid container style={{ width: '95%', marginTop: '20px', marginBottom: '20px' }}>
					<Grid item className="flex flex-wrap sm:w-1/3 md:w-1/3">
						<Icon>{'chevron_left'}</Icon><Link className='centerItems' style={{height:'24px'}} onClick={() => window.history.back()}>Regresar</Link>
					</Grid>
					<Grid item className="sm:w-1/3 md:w-1/3" style={{ display: 'flex', justifyContent: 'center' }}>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<h2 className={classes.title1}>
							Calificar tarea
                        </h2>
					</FuseAnimate>
					</Grid>
					<Grid item className="sm:w-1/3 md:w-1/3" style={{ display: 'flex', justifyContent: 'right', paddingRight: '6px' }}>
						<Download data={filteredData}/>
					</Grid>
				</Grid>
				<Grid container style={{ width: '95%' }}>
					<div className="sm:w-1/2 md:w-1/2">					
						<h2 className={classes.title}>
							{props.name}
						</h2>
					</div>
					<div className="sm:w-1/2 md:w-1/2" style={{ display: 'flex', justifyContent: 'right' }}>						
						<Select
							value={age}
							onChange={handleChange}
							className="selectDashbord"
							displayEmpty  
						>
							<MenuItem value='' disabled>Todos los estados</MenuItem>
							<MenuItem value={'No entregado'}>No entregado</MenuItem>
							<MenuItem value={'Entregado'}>Entregado</MenuItem>
							<MenuItem value={'Calificado'}>Calificado</MenuItem>
						</Select>						
					</div>
				</Grid>
				<HomeworksTable
					columns={columns}
					data={filteredData}
					onRowClick={(ev, row) => {
						if (row) {
							toTask(props.name, row.original);
						}
					}}
				/>
			</Card>
			</FuseAnimateGroup>
			</div>
			)
		}else{
			res = (
				<div>
					<FuseAnimateGroup
						className="flex flex-wrap justify-center"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>  
						<Card elevation={1} className={classes.card2}>
							<Grid container style={{ width: '95%', marginTop: '20px', marginBottom: '20px' }}>
								<Grid item className="flex flex-wrap sm:w-1/3 md:w-1/3">
									<Icon>{'chevron_left'}</Icon><Link className='centerItems' style={{ height: '24px' }} onClick={() => window.history.back()}>Regresar</Link>
								</Grid>
								<Grid item className="sm:w-1/3 md:w-1/3" style={{ display: 'flex', justifyContent: 'center' }}>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<h2 className={classes.title1}>
											Calificar tarea
										</h2>
									</FuseAnimate>
								</Grid>
								<Grid item className="sm:w-1/3 md:w-1/3" style={{ display: 'flex', justifyContent: 'right', paddingRight: '6px' }}>
									{/* <Download data={filteredData} /> */}
								</Grid>
							</Grid>
							<Grid container style={{ width: '95%' }}>
								<div className="sm:w-1/2 md:w-1/2">
									<h2 className={classes.title}>
										{props.name}
									</h2>
								</div>
								<div className="sm:w-1/2 md:w-1/2" style={{ display: 'flex', justifyContent: 'right' }}>
									<Select
										value={age}
										onChange={handleChange}
										className="selectDashbord"
										displayEmpty
									>
										<MenuItem value='' disabled>Todos los estados</MenuItem>
										<MenuItem value={'No entregado'}>No entregado</MenuItem>
										<MenuItem value={'Entregado'}>Entregado</MenuItem>
										<MenuItem value={'Calificado'}>Calificado</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid className="flex flex-1 items-center justify-center" style={{height: '170px'}}>
								<Typography color="textSecondary" variant="h5">
									No hay registros que mostrar!
								</Typography>
							</Grid>
						</Card> 
					</FuseAnimateGroup>
				</div>
			);
		}
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				{res}
			</>
		</FuseAnimate>
	);
}

export default HomeworksList;
